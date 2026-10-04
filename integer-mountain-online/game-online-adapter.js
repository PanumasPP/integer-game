/* The legacy globals remain intact. This adapter renders snapshots and sends intents only. */
(function () {
    'use strict';
    let catalog, renderKey = '', lastDiceId = '', lastMoveId = '', won = '', animationGeneration = 0;
    let rosterKey = '', lastPresentationId = '', lastClockSecond = null, movingId = '';
    const timers = new Set();
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; };
    const el = id => document.getElementById(id);
    const send = (type, payload) => window.OnlineGame.send(type, payload);
    function hideInteractions() {
        [modal, cardSelectionModal, prankModal, explanationModal].forEach(node => { node.style.display = 'none'; });
        el('onlineObserverStatus').hidden=true;
    }
    function cleanup() {
        animationGeneration++; timers.forEach(clearTimeout); timers.clear();
        activeOnlineBoardSize = 50;
        stopQuestionTimer(); hideInteractions(); diceAnimationOverlay.style.display = 'none';
        modalAnswerInput.disabled=false;
        modal.querySelectorAll('button').forEach(button=>button.disabled=false);
        el('diceCube').classList.remove('spinning'); centralMessageOverlay.style.display = 'none';
        heartbeatOverlay.style.display = 'none';
        renderKey = ''; lastDiceId = ''; lastMoveId = ''; won = ''; rosterKey = ''; lastPresentationId = ''; lastClockSecond = null; movingId = '';
        victoryOverlay.style.display = 'none'; reportModal.style.display = 'none';
        fireworksContainer.replaceChildren(); gameActive = false;
        backgroundMusicElement.pause();
        el('onlineAnswerObservation').textContent='';
    }
    function enter() {
        cleanup(); gameMode = 'online'; isSinglePlayerMode = false;
        document.body.classList.add('online-mode');
        mainMenuModal.style.display = 'none'; gameSetupScreen.classList.add('hidden');
    }
    function exit() {
        cleanup(); gameMode = 'local'; isSinglePlayerMode = false;
        document.body.classList.remove('online-mode');
        boardContainer.classList.add('hidden'); mainMenuModal.style.display = 'flex';
    }
    function renderInteraction(s, uid, enabled, role) {
        const it = s.interaction;
        const observation=s.answerObservation;
        const observingAnswer=observation && observation.selectedBy!==uid && !(it?.actorId===uid && s.phase!=='EXPLANATION') && !(role==='spectator' && s.phase==='WAITING_FOR_PUNISHMENT') && ['TURN_END','EXPLANATION','WAITING_FOR_PUNISHMENT','APPLYING_EFFECT'].includes(s.phase);
        const key = `${s.phase}:${it?.id || ''}:${enabled}:${uid}:${role}:${observingAnswer?observation.id:''}`;
        if (renderKey === key) return;
        renderKey = key; hideInteractions(); stopQuestionTimer();
        if(s.phase==='PAUSED' || s.phase==='GAME_OVER')return;
        const questionInteraction=s.phase==='ANSWERING_QUESTION'?it:observingAnswer?{...observation,actorId:observation.selectedBy}:null;
        const owner=enabled && role!=='spectator' && it?.actorId===uid;
        if(questionInteraction){
            const q=catalog.byId[questionInteraction.questionId];
            currentCardData = q;
            const title = ({final:'คำถามสุดท้ายเพื่อพิชิตยอดเขา!',setback:'ตอบให้ถูกเพื่อรอดจากอุปสรรค!'})[questionInteraction.purpose]
                || (questionInteraction.questionId.startsWith('puzzle_') ? 'การ์ดปริศนา' : 'การ์ดภารกิจ');
            showQuestionModal(title,q.question,null,{onAnswer:answer=>{if(owner && s.phase==='ANSWERING_QUESTION')send('SUBMIT_ANSWER',{answer:String(answer)});}});
            if(!owner || observingAnswer){
                el('onlineObserverStatus').hidden=false;
                el('onlineObserverStatus').textContent=`กำลังชมการตอบของ ${s.players[questionInteraction.actorId]?.name || ''}`;
                modalAnswerInput.disabled=true;
            }
            if(observingAnswer){
                modalFeedback.textContent=`${s.players[observation.selectedBy]?.name || ''} ตอบ: ${observation.timedOut?'หมดเวลา':observation.selectedAnswer} · ${observation.correct?'ตอบถูก':'ตอบผิด'}`;
                if(q.choices)el('modalChoicesContainer').querySelectorAll('button').forEach(button=>button.classList.toggle('online-observed-choice',button.textContent===observation.selectedAnswer));
                else modalAnswerInput.value=observation.selectedAnswer;
                questionTimerDisplay.textContent='';
            }
            return;
        }
        if(!it || (!owner && role!=='spectator'))return;
        const q = catalog.byId[it.questionId];
        if (s.phase === 'EXPLANATION' && owner) {
            currentCardData = q;
            showExplanationModal(()=>send('ACK_EXPLANATION'));
            closeExplanationBtn.focus();
        } else if (s.phase === 'WAITING_FOR_CARD') {
            const title = ({powerUp:'เลือกการ์ดพลังเสริม',bonus:'เลือกการ์ดโบนัส'})[it.deck]
                || (['powerUp','bonus'].includes(it.purpose) ? 'คำถามชิงรางวัล (กลาง/ยาก)!' : it.deck==='puzzle'?'เลือกการ์ดปริศนา':'เลือกการ์ดภารกิจ');
            const cards = OnlineState.list(it.options).map(value=>catalog.byId[value] || getBoardEffects(getBoardSize())[it.deck][Number(value.split('_')[1])]);
            displayCardSelection(it.deck,title,null,{cards,onSelect:index=>{if(owner)send('SELECT_CARD',{index});}});
            if(owner)cardSelectionGrid.firstChild?.focus();
        } else if (s.phase === 'WAITING_FOR_TARGET') {
            offerPrankChoice({onTarget:targetId=>{if(owner)send('SELECT_TARGET',{targetId});},onSkip:()=>{if(owner)send('SKIP_PRANK');}});
        } else if (s.phase === 'WAITING_FOR_PRANK_EFFECT') {
            const targetIndex=players.findIndex(p=>p.uid===it.targetId);
            selectPrankEffect(targetIndex,{onEffect:index=>{if(owner)send('SELECT_PRANK_EFFECT',{index});},onSkip:()=>{if(owner)send('SKIP_PRANK');}});
            prankModal.style.display='flex';
        } else if (s.phase === 'WAITING_FOR_SETBACK') {
            initiateSetbackSelectionByOpponents({onSelect:index=>{if(owner)send('SELECT_SETBACK',{index});}});
        } else if (s.phase === 'WAITING_FOR_PUNISHMENT') {
            initiatePunishment({onSelect:index=>{if(owner)send('SELECT_PUNISHMENT',{index});}});
        }
    }

    function animateMove(move, serverNow) {
        const generation = ++animationGeneration;
        movingId = move.playerId;
        function step() {
            if (generation !== animationGeneration || gameMode !== 'online') return;
            const player = players.find(p=>p.uid===move.playerId);
            if (!player) { movingId=''; return; }
            if (player.onBoardPosition !== move.to) {
                player.onBoardPosition += Math.sign(move.to-player.onBoardPosition);
                renderPlayerPieces(); later(step,350);
            } else movingId='';
        }
        later(step,Math.max(0,(move.startedAt || serverNow)-serverNow));
    }
    function render(s, uid, hostId, presence, connected, pending, serverNow = Date.now(), role = 'player') {
        if (!s) return;
        const size = OnlineRoom.boardSize(s.questionSettings);
        const changedBoard = activeOnlineBoardSize !== size;
        activeOnlineBoardSize = size;
        const oldPlayers = players;
        const order = OnlineState.list(s.turnOrder);
        players = order.map((id, index) => ({ ...s.players[id], id: index + 1,
            onBoardPosition: movingId===id ? oldPlayers.find(p=>p.uid===id)?.onBoardPosition ?? s.players[id].position : s.players[id].position,
            performanceLog: OnlineState.list(s.players[id].performanceLog) }));
        currentPlayerIndex = order.indexOf(s.currentPlayerId); currentRound = s.currentRound;
        gameActive = false; // Original mutations run through shared rules on the host; render callbacks only send intents.
        const firstBoard = boardContainer.classList.contains('hidden');
        boardContainer.classList.remove('hidden');
        if (firstBoard || changedBoard) {
            initializeBoard();
            if (isSoundEnabled && backgroundMusicElement.paused) {
                backgroundMusicElement.volume=.1; backgroundMusicElement.play().catch(()=>{});
            }
        }
        if (rosterKey !== order.join(',')) { rosterKey=order.join(','); initializePlayersInfoPanel(); }
        else updatePlayerInfo();
        players.forEach(p => {
            const panel = el(`player${p.id}InfoDisplay`);
            panel.classList.add('online-player-info');
            let badge=panel.querySelector('.online-player-status');
            if (!badge) { badge=document.createElement('small'); badge.className='online-player-status'; panel.appendChild(badge); }
            badge.textContent = `${p.uid === hostId ? '👑 ' : ''}${p.uid === uid ? 'คุณ ' : ''}${presence[p.uid]?.online ? '🟢' : '⚪'}`;
            badge.title = `${p.uid===hostId?'Host · ':''}${p.uid===uid?'คุณ · ':''}${presence[p.uid]?.online?'Online':'Offline'}`;
        });
        const hostOnline = presence[hostId]?.online === true;
        const enabled = connected && hostOnline && s.phase !== 'PAUSED' && s.phase !== 'GAME_OVER';
        rollDiceButton.disabled = role==='spectator' || pending || !enabled || uid !== s.currentPlayerId || s.phase !== 'WAITING_FOR_ROLL';
        const active = s.players[s.interaction?.actorId || s.currentPlayerId];
        const status = ({ ANSWERING_QUESTION: 'กำลังตอบคำถาม', WAITING_FOR_CARD: 'กำลังเลือกการ์ด', EXPLANATION: 'กำลังอ่านเฉลย', WAITING_FOR_SETBACK: 'กำลังเลือกอุปสรรค', WAITING_FOR_PUNISHMENT: 'กำลังเลือกบทลงโทษ' })[s.phase] || 'กำลังเล่น';
        messageArea.className = 'mt-6 p-5 bg-blue-100 text-blue-800 rounded-xl shadow-lg text-center text-lg min-h-[60px]';
        messageArea.textContent = s.phase==='WAITING_FOR_ROLL' ? s.message || `ตาของ ${active?.name || ''}` : `ตาของ ${s.players[s.currentPlayerId]?.name || ''}`;
        const onlineNotice=el('onlineGameNotice');
        onlineNotice.textContent += !connected ? ' · การเชื่อมต่อขาด กำลังเชื่อมต่อใหม่…' : !hostOnline ? ' · รอ Host กลับมา' : s.phase==='PAUSED' ? ' · ⏸ เกมหยุดชั่วคราว' : s.interaction && s.interaction.actorId!==uid ? ` · รอ ${active?.name || ''} ${status}` : '';
        movementDieValueDisplay.textContent = s.diceValue || '-';
        if (s.presentation && lastPresentationId!==s.presentation.id && !firstBoard) {
            lastPresentationId=s.presentation.id;
            if (s.presentation.sound) playSound(s.presentation.sound);
            showMessage(s.presentation.html,s.presentation.type,s.presentation.duration);
        } else if (firstBoard) lastPresentationId=s.presentation?.id || '';
        if (s.diceEvent && lastDiceId !== s.diceEvent.actionId) {
            const fresh = !!lastDiceId || (!firstBoard && s.phase === 'ROLLING');
            lastDiceId = s.diceEvent.actionId;
            if (fresh && s.phase === 'ROLLING') {
                playSound('diceRoll'); diceAnimationOverlay.style.display = 'flex';
                el('diceCube').classList.add('spinning'); diceAnimationText.textContent = 'กำลังทอยลูกเต๋า…';
                later(() => { el('diceCube').classList.remove('spinning');
                    const rotations = ['rotateY(0deg)', 'rotateY(-90deg)', 'rotateY(-180deg)', 'rotateY(90deg)', 'rotateX(-90deg)', 'rotateX(90deg)'];
                    el('diceCube').style.transform = rotations[s.diceValue - 1];
                    diceAnimationText.innerHTML = `คุณทอยได้: <span class="text-yellow-300 text-5xl">${s.diceValue}</span>`;
                    later(() => { diceAnimationOverlay.style.display = 'none'; }, 1500);
                }, 2000);
            }
        }
        if (!firstBoard && s.lastMove && lastMoveId !== s.lastMove.actionId) {
            lastMoveId = s.lastMove.actionId;
            if (s.phase==='MOVING') animateMove(s.lastMove, serverNow);
        } else if (!movingId && (firstBoard || players.some(p=>p.position !== oldPlayers.find(old=>old.uid===p.uid)?.onBoardPosition))) renderPlayerPieces();
        renderInteraction(s, uid, enabled, role);
        updateClock(s, serverNow);
        const canInteract=enabled && role!=='spectator' && s.interaction?.actorId===uid;
        document.querySelectorAll('#questionModal button, #prankModal button, #closeExplanationBtn').forEach(btn => { btn.disabled = pending || !canInteract; });
        modalAnswerInput.disabled=pending || !canInteract;
        cardSelectionGrid.querySelectorAll('.card-back').forEach(card=>{card.setAttribute('aria-disabled',String(pending||!canInteract)); card.style.pointerEvents=pending||!canInteract?'none':''; card.tabIndex=pending||!canInteract?-1:0;});
        const observation=s.answerObservation;
        el('onlineAnswerObservation').textContent=observation?`${s.players[observation.selectedBy]?.name || ''} ตอบ: ${observation.timedOut?'หมดเวลา':observation.selectedAnswer}\n${observation.correct?'ตอบถูก':'ตอบผิด'}`:'';
        // Restore cost validation after the generic pending guard.
        if (s.phase === 'WAITING_FOR_PRANK_EFFECT' && s.interaction?.actorId === uid) {
            Array.from(prankOptionsContainer.children).forEach((btn, i) => { btn.disabled ||= s.players[uid].score < (prankEffects[i].cost || 0); });
        }
        if (s.phase === 'GAME_OVER' && won !== `end:${s.winnerId || 'report'}`) {
            won = `end:${s.winnerId || 'report'}`;
            if (s.winnerId && s.players[s.winnerId]) displayVictory(s.players[s.winnerId]);
            else { generateAndShowReport(); }
        }
    }
    function updateClock(state, now) {
        const remaining = state?.deadlineAt ? Math.max(0, Math.ceil((state.deadlineAt - now) / 1000)) : null;
        if (state?.phase==='ANSWERING_QUESTION') {
            timeLeft=remaining; updateTimerDisplay();
            if (modal.style.display==='flex' && remaining<=10 && remaining>0) {
                heartbeatOverlay.style.display='block';
                if (lastClockSecond!==remaining) playSound('countdownTick');
            }
            lastClockSecond=remaining;
        } else { stopQuestionTimer(); lastClockSecond=null; }
        el('onlineTimer').textContent = '';
    }
    window.GameCore = {
        enter, exit, render, cleanup, updateClock, schedule: later,
        getCatalog() { if (!catalog) catalog = OnlineState.makeQuestionCatalog(allCards); return catalog; },
        context() { return { catalog: this.getCatalog(), board: boardConfig, getBoardConfig, getBoardEffects, effects: effectCards, pranks: prankEffects, punishments: punishmentEffects,
            events: groupEvents }; }
    };
})();
