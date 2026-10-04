/* Synchronization phases around the shared original game rules. Only hosts mutate state. */
(function (root) {
    'use strict';
    const R = root.OriginalGameRules || (typeof require !== 'undefined' ? require('./game-rules.js') : null);
    const Room = root.OnlineRoom || (typeof require !== 'undefined' ? require('./online-room.js') : null);
    const GAME_PHASE = Object.freeze(Object.fromEntries([
        'LOBBY', 'WAITING_FOR_ROLL', 'ROLLING', 'MOVING', 'RESOLVING_SQUARE',
        'WAITING_FOR_CARD', 'ANSWERING_QUESTION', 'WAITING_FOR_TARGET', 'WAITING_FOR_PRANK_EFFECT',
        'WAITING_FOR_PUNISHMENT', 'WAITING_FOR_SETBACK', 'EXPLANATION', 'APPLYING_EFFECT',
        'TURN_END', 'PAUSED', 'GAME_OVER'
    ].map(x => [x, x])));
    const ACTION_TYPE = Object.freeze(Object.fromEntries([
        'ROLL_DICE', 'SELECT_CARD', 'SUBMIT_ANSWER', 'SELECT_TARGET', 'SELECT_PRANK_EFFECT',
        'SKIP_PRANK', 'SELECT_PUNISHMENT', 'SELECT_SETBACK', 'ACK_EXPLANATION',
        'TICK', 'PAUSE', 'RESUME', 'SKIP_PLAYER', 'END_GAME'
    ].map(x => [x, x])));
    const ROOM_STATUS = Object.freeze({ WAITING: 'waiting', PLAYING: 'playing', FINISHED: 'finished', CLOSED: 'closed' });
    const GROUP_EVENTS = R.GROUP_EVENTS;
    const phasesFor = {
        ROLL_DICE: ['WAITING_FOR_ROLL'], SELECT_CARD: ['WAITING_FOR_CARD'],
        SUBMIT_ANSWER: ['ANSWERING_QUESTION'], SELECT_TARGET: ['WAITING_FOR_TARGET'],
        SELECT_PRANK_EFFECT: ['WAITING_FOR_PRANK_EFFECT'], SKIP_PRANK: ['WAITING_FOR_TARGET', 'WAITING_FOR_PRANK_EFFECT'],
        SELECT_PUNISHMENT: ['WAITING_FOR_PUNISHMENT'], SELECT_SETBACK: ['WAITING_FOR_SETBACK'],
        ACK_EXPLANATION: ['EXPLANATION']
    };
    const clone = x => JSON.parse(JSON.stringify(x));
    const list = x => Array.isArray(x) ? x : Object.values(x || {});
    function sanitizePlayerName(name) {
        return Array.from(String(name || '').replace(/[<>\u0000-\u001f\u007f]/g, '').trim()).slice(0, 24).join('');
    }
    function generateRoomCode(random = Math.random) { return String(100000 + Math.min(899999, Math.floor(random() * 900000))); }
    function makeQuestionCatalog(bank) {
        const byId = {}, pools = {};
        for (const type of ['mission', 'puzzle']) {
            pools[type] = {};
            for (const difficulty of ['easy', 'medium', 'hard']) {
                pools[type][difficulty] = (bank[type][difficulty] || []).map((q, i) => {
                    const id = `${type}_${difficulty}_${String(i + 1).padStart(4, '0')}`;
                    byId[id] = q; return id;
                });
            }
        }
        return { byId, pools };
    }
    function joinSlots(slots, profile, status, kicked = {}) {
        if (kicked[profile.uid]) throw Error('คุณถูกนำออกจากห้องนี้');
        const next = clone(slots || {});
        if (Object.values(next).some(p => p.uid === profile.uid)) return next;
        if (status !== ROOM_STATUS.WAITING) throw Error('ห้องนี้ไม่เปิดรับผู้เล่นแล้ว');
        const slot = Array.from({ length: 10 }, (_, i) => `s${i}`).find(i => !next[i]);
        if (slot === undefined) throw Error('ห้องนี้มีผู้เล่นครบ 10 คนแล้ว');
        next[slot] = profile; return next;
    }
    function createGame(profiles, now, settings) {
        if (profiles.length < 2 || profiles.length > 10) throw Error('ต้องมีผู้เล่น 2–10 คน');
        const questionSettings=settings?Room.normalizeSettings(settings):null;
        if(questionSettings)questionSettings.questionCategories=list(settings.questionCategories);
        const players = {};
        profiles.forEach(p => { players[p.uid] = { uid: p.uid, name: p.name, emoji: p.emoji,
            position: 0, score: 0, hasShield: false, extraTurnsToTake: 0,
            hasBeenPrankedThisRound: false, performanceLog: [] }; });
        return { schemaVersion: 1, revision: 1, status: 'playing', players,
            turnOrder: profiles.map(p => p.uid), currentPlayerId: profiles[0].uid,
            currentRound: 1, phase: 'WAITING_FOR_ROLL', phaseStartedAt: now,
            usedQuestionIds: {}, processed: {}, winnerId: null, message: `เกมเริ่มต้น! ตาของ ${profiles[0].name}`,
            ...(questionSettings?{questionSettings}:{}) };
    }
    function canWriteCanonical(uid, hostId) { return !!uid && uid === hostId; }
    function validateRequest(s, r, context) {
        if (!s || !r || !/^[A-Za-z0-9:_-]{1,128}$/.test(r.requestId || '') || r.actorId !== context.actorId) return 'INVALID_ACTOR';
        if (!s.players[r.actorId] || context.kicked?.[r.actorId]) return 'NOT_MEMBER';
        if (s.processedRequestIds?.[r.requestId] || s.processed?.[r.actorId]?.requestId === r.requestId) return 'DUPLICATE';
        if (r.expectedRevision !== s.revision) return 'STALE_REVISION';
        if (!context.hostOnline) return 'HOST_OFFLINE';
        if (['PAUSE', 'RESUME', 'SKIP_PLAYER', 'END_GAME', 'TICK'].includes(r.type)) {
            if (!canWriteCanonical(r.actorId, context.hostId)) return 'HOST_ONLY';
            if (s.phase === 'GAME_OVER') return 'GAME_OVER';
            if (r.type === 'RESUME' && s.phase !== 'PAUSED') return 'WRONG_PHASE';
            if (r.type === 'PAUSE' && s.phase === 'PAUSED') return 'WRONG_PHASE';
            if (r.type === 'TICK' && (!nextDeadline(s) || !(context.now >= nextDeadline(s)))) return 'NOT_DUE';
            return null;
        }
        if (!phasesFor[r.type]?.includes(s.phase)) return 'WRONG_PHASE';
        if (r.actorId !== (s.interaction?.actorId || s.currentPlayerId)) return 'NOT_YOUR_TURN';
        if (s.interaction && r.payload?.interactionId !== s.interaction.id) return 'STALE_INTERACTION';
        return null;
    }
    function nextDeadline(s) {
        if (s.phase === 'PAUSED' || s.phase === 'GAME_OVER') return null;
        const deadlines = [s.deadlineAt,s.bonusAutoTurnAt].filter(n=>Number.isFinite(n)&&n>0);
        return deadlines.length ? Math.min(...deadlines) : null;
    }
    function resolveNextTurn(s, force = false) {
        const order = list(s.turnOrder), ps = order.map(uid => s.players[uid]);
        if (!order.length) { s.phase = 'GAME_OVER'; s.status = 'finished'; s.winnerId = null; return; }
        const next = R.advanceTurn(ps, order.indexOf(s.currentPlayerId), s.currentRound, false, force);
        s.currentPlayerId = order[next.index]; s.currentRound = next.round;
        s.phase = 'WAITING_FOR_ROLL'; s.interaction = null; s.deadlineAt = null; s.questionId = null;
        s.diceValue = null; s.bonusMove = false; s.continuation = null; s.landingPosition = null;
        s.message = `ตาของ ${s.players[s.currentPlayerId].name}`;
        return next;
    }
    function resolveMovement(player, steps, boardSize = 50) {
        if(!Room.isValidBoardSize(boardSize))throw Error('INVALID_BOARD_SIZE');
        const plan = R.planMovement(player, steps, false, Array.from({length:boardSize},()=>({type:'normal'})));
        if (!plan.blocked) R.commitMovement(player, plan.target);
        return {blocked:plan.blocked,position:player.position};
    }
    function resolveGroupEvent(s, event) {
        const order = list(s.turnOrder);
        R.resolveEvent(order.map(uid => s.players[uid]), order.indexOf(s.currentPlayerId), false, event);
        return s;
    }
    function isValidTarget(s, actorId, targetId) {
        const order = list(s.turnOrder), ps = order.map(uid=>s.players[uid]);
        return R.validTargets(ps, order.indexOf(actorId)).some(p => p.uid === targetId);
    }
    function applyPrank(s, actorId, targetId, effect) {
        if (!isValidTarget(s,actorId,targetId) || s.players[actorId].score < (effect.cost || 0)) throw Error('INVALID_TARGET_OR_COST');
        const order = list(s.turnOrder);
        R.applyPrank(order.map(uid=>s.players[uid]), order.indexOf(actorId), order.indexOf(targetId), effect);
        return s;
    }
    function applyGameAction(state, request, ctx) {
        const size=Room.boardSize(state.questionSettings);
        ctx={...ctx,board:ctx.getBoardConfig?ctx.getBoardConfig(size):ctx.board,effects:ctx.getBoardEffects?ctx.getBoardEffects(size):ctx.effects};
        if(ctx.board.length!==size)return {error:'BOARD_CONFIG_MISMATCH',state};
        const error = validateRequest(state, request, ctx);
        if (error) return {error,state};
        const s = clone(state), p = s.players[s.currentPlayerId], now = ctx.now;
        const random = ctx.random || Math.random, order = list(s.turnOrder);
        const ps = order.map(uid => s.players[uid]), currentIndex = order.indexOf(s.currentPlayerId);
        const id = `${request.requestId}:${s.revision + 1}`;
        const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
        function phase(value, delay) { s.phase = value; s.phaseStartedAt = now; s.deadlineAt = delay ? now + delay : null; }
        function interaction(value, actorId = s.currentPlayerId) { s.interaction = {id,actorId,...value}; }
        function present(html, type = 'info', duration = 3500, sound) {
            s.presentation = {id,html,type,duration,...(sound?{sound}:{})};
        }
        function endTurn() {
            const previous = s.players[s.currentPlayerId];
            const next = resolveNextTurn(s); s.phaseStartedAt = now;
            if (next?.extra) present(`<p class="text-xl">${escape(previous.name)} ได้เล่นตาพิเศษ!</p>`,'info',3000);
            if (next?.skipped.length) present(`<p class="text-xl">${escape(next.skipped.at(-1))} โดนแกล้ง! ข้ามตานี้</p>`,'error',2000);
        }
        function later(kind, delay, details = {}) { s.interaction = null; s.continuation = {kind,...details}; phase('TURN_END',delay); }
        function opponent() { return order[(currentIndex + 1) % order.length]; }
        function pool(type, difficulty) {
            return s.questionSettings ? Room.availableQuestions(ctx.catalog,s.questionSettings,s.usedQuestionIds,type,[difficulty])
                : list(ctx.catalog.pools[type][difficulty]).filter(q => !s.usedQuestionIds?.[q]);
        }
        function challengePool() {
            return s.questionSettings ? Room.availableQuestions(ctx.catalog,s.questionSettings,s.usedQuestionIds,'mission',['medium','hard'])
                : R.challengePool({medium:pool('mission','medium'),hard:pool('mission','hard')});
        }
        function question(qid, purpose) {
            if (!qid) {
                if (purpose === 'final') {
                    present('<p class="text-xl">สุดยอด! การ์ดคำถามยากหมดแล้ว คุณชนะเลย!</p>','success',3000);
                    later('WIN',3100);
                } else if (purpose === 'setback') {
                    s.pendingSetbackCard = null; s.isAnsweringSetbackSave = false;
                    present('<p class="text-xl">การ์ดคำถามยากหมด! คุณโชคดี รอดตัวไป!</p>','success',3000);
                    later('NEXT_TURN',3100);
                } else later('NEXT_TURN',1500);
                return;
            }
            // Only onCardSelected consumes a question in V11.23. Direct saves/finals do not.
            s.questionId = qid;
            if (purpose === 'final') s.isAnsweringFinalQuestion = true;
            if (purpose === 'setback') s.isAnsweringSetbackSave = true;
            interaction({questionId:qid,purpose}); phase('ANSWERING_QUESTION',30000);
        }
        function cards(deck, purpose = 'normal', custom) {
            const source = custom || (['mission','puzzle'].includes(deck) ? pool(deck,R.difficulty(p.position)) : ctx.effects[deck].map((_,i)=>`${deck}_${i}`));
            const options = R.selectCards(source,['mission','puzzle'].includes(deck)?10:5,random);
            if (!options.length) {
                present('การ์ดหมด! ข้ามไปตานต่อไป','info',3000); later('NEXT_TURN',1500); return;
            }
            interaction({deck,options,purpose}); phase('WAITING_FOR_CARD');
        }
        function move(steps, bonus, initialDelay = 0) {
            const plan = R.planMovement(p,steps,bonus,ctx.board);
            if (plan.blocked) {
                present(`<p class="text-2xl font-semibold text-green-600">${escape(p.name)} มีเกราะป้องกัน! ไม่ต้องถอยหลังครั้งนี้</p>`,'success',3000);
                endTurn(); return;
            }
            s.lastMove = {playerId:p.uid,from:plan.from,to:plan.target,actionId:id,startedAt:now+100+initialDelay};
            s.movement = {...plan,playerId:p.uid}; s.bonusMove = bonus;
            phase('MOVING',100 + initialDelay + Math.abs(plan.target-plan.from)*350);
        }
        function effect(card) {
            s.selectedEffect = {...card,actionId:id}; s.queuedEffect = card;
            const sound = card.action.includes('move_forward') || ['get_shield','roll_again'].includes(card.action) ? 'powerUp' : card.action.includes('move_backward') || card.action === 'go_to_start' ? 'setback' : card.action === 'go_to_square' ? 'bonus' : null;
            present(`<p class="text-xl font-semibold">คุณได้รับการ์ด: ${escape(card.text)}!</p>`,'success',3000,sound);
            s.interaction = null; phase('APPLYING_EFFECT',1500);
        }
        function finishEffect() {
            const card = s.queuedEffect; s.queuedEffect = null;
            const result = R.effectPlan(p,card);
            if (result.kind === 'move') move(result.steps,true);
            else if (result.kind === 'roll') {
                present("<p class='text-xl'>ทอยลูกเต๋าอีกครั้ง!</p>",'info',2000);
                s.interaction = null; phase('WAITING_FOR_ROLL');
            } else {
                if (result.blocked) present(`<p class='text-xl'>${escape(p.name)} ใช้เกราะป้องกัน! ไม่ต้องกลับไปจุดเริ่มต้น</p>`,'success',3000);
                endTurn();
            }
        }
        function win() { s.winnerId=p.uid; s.status='finished'; s.interaction=null; phase('GAME_OVER'); }
        function square() {
            const plan = R.squareAction(ctx.board[s.landingPosition ?? p.position].type);
            if (plan.kind === 'cards') {
                if (plan.pendingDeck) s.pendingAction=plan.pendingDeck;
                cards(plan.deck,plan.pendingDeck || (s.isHandlingBonusMoveQuestion?'bonusMove':'normal'),plan.challenge?challengePool():null);
            } else if (plan.kind === 'setback') { interaction({options:ctx.effects.setback.map((_,i)=>i)},opponent()); phase('WAITING_FOR_SETBACK'); }
            else if (plan.kind === 'final') question(R.randomCard(pool('mission','hard'),random),'final');
            else if (plan.kind === 'event') {
                const event = R.randomCard(ctx.events || GROUP_EVENTS,random);
                s.event={...event,actionId:id}; present(`<p class="text-xl">เกิดอีเวนต์: ${escape(event.text)}</p>`,'info',4000);
                later('GROUP_EVENT',4100,{event});
            } else endTurn();
        }
        function answer(value, timedOut) {
            const q=ctx.catalog.byId[s.questionId], it=s.interaction;
            const correct=!timedOut && R.answerMatches(value,q);
            p.performanceLog=list(p.performanceLog);
            const specialDeck=s.pendingAction;
            const outcome=R.applyAnswer(p,q,correct,s);
            Object.assign(p.performanceLog.at(-1),{questionId:s.questionId,timestamp:now});
            s.answerResult={playerId:p.uid,questionId:s.questionId,correct,timedOut:!!timedOut,actionId:id};
            s.answerObservation={id,questionId:s.questionId,purpose:it.purpose,selectedBy:p.uid,
                selectedAnswer:String(value).slice(0,256),selectionRevision:s.revision+1,correct,timedOut:!!timedOut,submittedAt:now};
            s.message=correct?'ตอบถูก!':'ตอบไม่ถูก';
            if (!correct) {
                interaction({questionId:s.questionId,purpose:it.purpose}); phase('EXPLANATION');
                if (outcome.kind === 'bonusMove') s.bonusAutoTurnAt = now+2500;
                return;
            }
            if (outcome.kind === 'final') win();
            else if (outcome.kind === 'setback') {
                present('<p class="text-xl font-semibold">ตอบถูก! คุณรอดจากอุปสรรค!</p>','success',3000,'powerUp'); later('NEXT_TURN',3100);
            } else if (outcome.kind === 'special') {
                present('<p class="text-xl font-semibold">ตอบถูก! คุณได้รับสิทธิ์เปิดการ์ดพิเศษ!</p>','success',2500,'correctAnswer');
                later('SPECIAL_CARDS',2600,{deck:specialDeck});
            } else if (outcome.kind === 'bonusMove') {
                present('<p class="text-xl font-semibold">ตอบถูก!</p>','success',2000,'correctAnswer'); later('NEXT_TURN',2500);
            } else {
                present(`<p class="text-xl font-semibold">ตอบถูก! ได้รับ ${outcome.points} คะแนน!</p>`,'success',3000,'correctAnswer'); later('OFFER_PRANK',1000);
            }
        }
        try {
            switch (request.type) {
                case 'ROLL_DICE':
                    s.diceValue=1+Math.floor(random()*6); s.diceEvent={actionId:id,type:'DICE',playerId:p.uid,diceValue:s.diceValue,startedAt:now}; phase('ROLLING',3500); break;
                case 'TICK':
                    if (s.bonusAutoTurnAt && now >= s.bonusAutoTurnAt) {
                        s.bonusAutoTurnAt=null;
                        // switchTurn() does not cancel already queued local callbacks/modals.
                        const retained={phase:s.phase,deadlineAt:s.deadlineAt,phaseStartedAt:s.phaseStartedAt,
                            interaction:s.interaction,questionId:s.questionId,continuation:s.continuation,bonusMove:s.bonusMove,landingPosition:s.landingPosition};
                        endTurn();
                        if (!['WAITING_FOR_ROLL','GAME_OVER'].includes(retained.phase)) Object.assign(s,retained);
                    } else if (s.phase==='ROLLING') move(s.diceValue,false,100);
                    else if (s.phase==='MOVING') {
                        R.commitMovement(s.players[s.movement.playerId] || p,s.movement.target);
                        if (!s.movement.resolveSquare) {
                            if (s.movement.moved) later('NEXT_TURN',500); else endTurn();
                        }
                        else {
                            s.landingPosition=s.movement.target;
                            if (s.movement.bonusQuestion) s.isHandlingBonusMoveQuestion=true;
                            s.squareAnnounced=false;
                            phase('RESOLVING_SQUARE',s.movement.moved?500:1);
                        }
                    } else if (s.phase==='RESOLVING_SQUARE') {
                        if (!s.squareAnnounced) {
                            const squareData=ctx.board[s.landingPosition ?? p.position];
                            present(`<p class="text-xl">${escape(squareData.text)}: ${escape(squareData.instruction)}</p>`,'info',2000);
                            s.squareAnnounced=true; phase('RESOLVING_SQUARE',2100);
                        } else square();
                    } else if (s.phase==='ANSWERING_QUESTION') answer('',true);
                    else if (s.phase==='APPLYING_EFFECT') {
                        if (s.queuedPrank) {
                            if (s.players[s.queuedPrank.targetId]) R.finishPrank(s.players[s.queuedPrank.targetId],s.queuedPrank.effect); s.queuedPrank=null; endTurn();
                        } else if (s.queuedPunishment) {
                            const value=s.queuedPunishment.value; s.queuedPunishment=null; move(-value,true);
                        } else finishEffect();
                    } else if (s.phase==='TURN_END') {
                        const continuation=s.continuation; s.continuation=null;
                        if (continuation?.kind==='OFFER_PRANK') {
                            if (R.canOfferPrank(ps,currentIndex,s.currentRound)) { interaction({}); phase('WAITING_FOR_TARGET'); } else endTurn();
                        } else if (continuation?.kind==='SPECIAL_CARDS') cards(continuation.deck);
                        else if (continuation?.kind==='GROUP_EVENT') {
                            const result=R.resolveEvent(ps,currentIndex,false,continuation.event);
                            present(result.text,result.type,result.duration); endTurn();
                        } else if (continuation?.kind==='WIN') win();
                        else endTurn();
                    } else throw Error('WRONG_PHASE');
                    break;
                case 'SELECT_CARD': {
                    const it=s.interaction, index=request.payload.index;
                    if (!Number.isInteger(index) || !list(it.options)[index]) throw Error('INVALID_CARD');
                    const selected=list(it.options)[index];
                    if (['mission','puzzle'].includes(it.deck)) {
                        const q=ctx.catalog.byId[selected], source=pool(s.questionSettings?selected.split('_')[0]:it.deck,q.difficulty);
                        const consumed=R.consumeQuestion(source.map(qid=>({id:qid,...ctx.catalog.byId[qid]})),q);
                        if (consumed) { s.usedQuestionIds ||= {}; s.usedQuestionIds[consumed.id]=true; }
                        question(selected,it.purpose);
                    } else effect(ctx.effects[it.deck][Number(selected.split('_')[1])]);
                    break;
                }
                case 'SUBMIT_ANSWER': answer(request.payload.answer,now>=s.deadlineAt); break;
                case 'SELECT_SETBACK': {
                    const index=request.payload.index;
                    if (!Number.isInteger(index) || !ctx.effects.setback[index]) throw Error('INVALID_CARD');
                    s.pendingSetbackCard=index; question(R.randomCard(challengePool(),random),'setback'); break;
                }
                case 'ACK_EXPLANATION':
                    // Golden master: every wrong answer opens the ordinary punishment selector.
                    // The previously chosen setback card is deliberately not applied here.
                    interaction({options:ctx.punishments.map((e,i)=>(!e.for3plusPlayers||order.length>=3)?i:null).filter(i=>i!==null)},opponent());
                    phase('WAITING_FOR_PUNISHMENT'); break;
                case 'SELECT_PUNISHMENT': {
                    const index=request.payload.index;
                    if (!list(s.interaction.options).includes(index)) throw Error('INVALID_PUNISHMENT');
                    s.queuedPunishment=ctx.punishments[index]; s.interaction=null;
                    present(`<p class="text-xl">${escape(p.name)} โดนลงโทษให้... ${escape(s.queuedPunishment.text)}!</p>`,'error',3000,'setback'); phase('APPLYING_EFFECT',1500); break;
                }
                case 'SELECT_TARGET':
                    if (!isValidTarget(s,p.uid,request.payload.targetId)) throw Error('INVALID_TARGET');
                    interaction({targetId:request.payload.targetId}); phase('WAITING_FOR_PRANK_EFFECT'); break;
                case 'SELECT_PRANK_EFFECT': {
                    const index=request.payload.index, targetId=s.interaction.targetId, effect=ctx.pranks[index];
                    if (!Number.isInteger(index)||!effect) throw Error('INVALID_EFFECT');
                    if (!isValidTarget(s,p.uid,targetId)||p.score<(effect.cost||0)) throw Error('INVALID_TARGET_OR_COST');
                    R.beginPrank(ps,currentIndex,order.indexOf(targetId),effect);
                    const target=s.players[targetId];
                    present(effect.cost?`<p class="text-xl">${escape(p.name)} ใช้ ${effect.cost} คะแนนเพื่อแกล้ง ${escape(target.name)}!</p>`:`<p class="text-xl">${escape(p.name)} แกล้ง ${escape(target.name)} โดย ${escape(effect.text)}!</p>`,'info',3000,'prank');
                    s.queuedPrank={targetId,effect}; s.interaction=null; phase('APPLYING_EFFECT',1500); break;
                }
                case 'SKIP_PRANK': endTurn(); break;
                case 'PAUSE':
                    s.pausedFromPhase=s.phase; s.pausedAt=now;
                    s.pausedRemaining=s.deadlineAt?Math.max(0,s.deadlineAt-now):null;
                    s.pausedBonusRemaining=s.bonusAutoTurnAt?Math.max(0,s.bonusAutoTurnAt-now):null;
                    s.bonusAutoTurnAt=null; phase('PAUSED'); break;
                case 'RESUME':
                    s.phase=s.pausedFromPhase; s.phaseStartedAt=now;
                    s.deadlineAt=Number.isFinite(s.pausedRemaining)?now+s.pausedRemaining:null;
                    s.bonusAutoTurnAt=Number.isFinite(s.pausedBonusRemaining)?now+s.pausedBonusRemaining:null;
                    s.pausedFromPhase=null; break;
                case 'SKIP_PLAYER': {
                    const paused=s.phase==='PAUSED'; s.bonusAutoTurnAt=null;
                    s.players[s.currentPlayerId].extraTurnsToTake=Math.min(0,s.players[s.currentPlayerId].extraTurnsToTake);
                    resolveNextTurn(s,true);
                    if (paused) { s.pausedFromPhase=s.phase; s.pausedRemaining=null; s.phase='PAUSED'; }
                    break;
                }
                case 'END_GAME': s.status='finished'; s.winnerId=null; s.interaction=null; s.bonusAutoTurnAt=null; phase('GAME_OVER'); break;
                default: throw Error('UNKNOWN_ACTION');
            }
        } catch (e) { return {error:e.message,state}; }
        s.revision++; s.lastAction={requestId:request.requestId,type:request.type,actorId:request.actorId,startedAt:now,revision:s.revision};
        s.processed ||= {}; s.processed[request.actorId]={requestId:request.requestId,revision:s.revision};
        s.processedRequestIds ||= {}; s.processedRequestIds[request.requestId]=true;
        return {state:s,error:null};
    }

    function removePlayer(state, uid, now) {
        const s = clone(state), order = list(s.turnOrder), index = order.indexOf(uid);
        const wasPaused = s.phase === 'PAUSED';
        if (index < 0) return s;
        const active = s.currentPlayerId === uid, selecting = s.interaction?.actorId === uid;
        // Advance before removing to preserve round wrapping and skipped turns.
        if (active && order.length > 1) resolveNextTurn(s, true);
        delete s.players[uid]; s.turnOrder = order.filter(x => x !== uid);
        if (s.turnOrder.length < 2 && s.phase !== 'GAME_OVER') { s.status = 'finished'; s.phase = 'GAME_OVER'; s.winnerId = null; s.interaction = null; s.deadlineAt = null; }
        else if (selecting && !active && s.phase !== 'GAME_OVER') {
            const remaining = s.turnOrder;
            s.interaction.actorId = remaining[(remaining.indexOf(s.currentPlayerId) + 1) % remaining.length];
        }
        if (s.interaction?.targetId === uid) { s.phase = 'WAITING_FOR_TARGET'; s.interaction = { id: `remove:${s.revision + 1}`, actorId: s.currentPlayerId }; }
        if (wasPaused && s.phase !== 'GAME_OVER' && s.phase !== 'PAUSED') {
            s.pausedFromPhase = s.phase; s.pausedRemaining = null; s.phase = 'PAUSED';
        }
        s.revision++; s.phaseStartedAt = now; return s;
    }
    const api = { GAME_PHASE, ACTION_TYPE, ROOM_STATUS, GROUP_EVENTS, sanitizePlayerName, generateRoomCode,
        makeQuestionCatalog, joinSlots, createGame, canWriteCanonical, validateRequest, resolveNextTurn,
        resolveMovement, resolveGroupEvent, isValidTarget, applyPrank, applyGameAction, removePlayer, list, nextDeadline };
    root.OnlineState = api;
    if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
