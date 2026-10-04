/* Game mutations extracted from the V11.23 golden master.
 * Local presentation and the host synchronization adapter share these functions.
 * Keep legacy quirks here: setback failures use the normal punishment selector,
 * final/save questions are not consumed, and rounds depend on the final next index.
 */
(function (root) {
    'use strict';
    const GROUP_EVENTS = Object.freeze([
        {id:'solar_storm',action:'ODD_PLAYERS_BACK',text:'พายุสุริยะ! คลื่นแม่เหล็กปั่นป่วน ทำให้ผู้เล่นทุกคนที่อยู่บนช่องเลขคี่ต้องถอยหลัง 1 ช่อง'},
        {id:'meteor_shower',action:'ALL_SCORE',value:15,text:'ฝนดาวตก! ผู้เล่นทุกคนได้รับคะแนนโบนัส 15 คะแนน!'},
        {id:'gravity',action:'SWAP_LEADER_LAST',text:'แรงโน้มถ่วงผิดปกติ! ผู้เล่นที่อยู่นำหน้าสุด (ยกเว้นคนปัจจุบัน) ต้องสลับตำแหน่งกับผู้เล่นที่อยู่ท้ายสุด'}
    ]);
    const difficulty = position => position < 10 ? 'easy' : position < 28 ? 'medium' : 'hard';
    const selectCards = (pool, count, random = Math.random) => [...pool].sort(() => 0.5 - random()).slice(0, count);
    const randomCard = (pool, random = Math.random) => pool[Math.floor(random() * pool.length)];
    const answerMatches = (value, card) => (card.choices ? String(value) : String(value).trim()).toLowerCase() === String(card.answer).toLowerCase();
    const challengePool = mission => [...mission.medium,...mission.hard];
    function squareAction(type, single = false) {
        if (type === 'power-up' || type === 'bonus') return {kind:'cards',deck:'mission',title:'คำถามชิงรางวัล (กลาง/ยาก)!',pendingDeck:type==='bonus'?'bonus':'powerUp',challenge:true};
        if (type === 'normal' || type === 'puzzle') return {kind:'cards',deck:type==='normal'?'mission':'puzzle',title:type==='normal'?'เลือกการ์ดภารกิจ':'เลือกการ์ดปริศนา'};
        if (type === 'setback') return {kind:single?'singleSetback':'setback'};
        if (type === 'event') return {kind:'event'};
        if (type === 'finish') return {kind:'final'};
        return {kind:'turn'};
    }
    function consumeQuestion(pool, card) {
        const index = pool.findIndex(q => q.question === card.question);
        return index > -1 ? pool.splice(index, 1)[0] : null;
    }
    function planMovement(player, steps, bonus, board) {
        const target = Math.max(0, Math.min(board.length - 1, player.position + steps));
        const from = player.onBoardPosition ?? player.position;
        const blocked = steps < 0 && player.hasShield;
        if (blocked) player.hasShield = false;
        const moved = from !== target;
        return { from, target, blocked: !!blocked, moved,
            resolveSquare: !bonus || (moved && ['normal', 'puzzle', 'finish'].includes(board[target].type)),
            bonusQuestion: !!bonus && moved && ['normal', 'puzzle', 'finish'].includes(board[target].type) };
    }
    function commitMovement(player, target) { player.position = target; player.onBoardPosition = target; }
    function advanceTurn(players, index, round, single = false, force = false) {
        const oldIndex = index, played = players[index], skipped = [];
        let extra = false;
        if (!force && played.extraTurnsToTake > 0) { played.extraTurnsToTake--; extra = true; }
        else {
            index = (index + 1) % players.length;
            while (players[index].extraTurnsToTake < 0) {
                skipped.push(players[index].name);
                players[index].extraTurnsToTake++;
                index = (index + 1) % players.length;
            }
        }
        players[index].hasBeenPrankedThisRound = false;
        let newRound = false;
        if (index < oldIndex || (players.length > 1 && oldIndex === players.length - 1 && index === 0) || single) {
            if (single && oldIndex === index) { if (played.extraTurnsToTake === 0) { round++; newRound = true; } }
            else if (!single) { round++; newRound = true; }
        }
        return { index, round, extra, skipped, newRound };
    }
    function resolveEvent(players, index, single, event) {
        if (event.action === 'ODD_PLAYERS_BACK') {
            players.forEach(p => { if ((p.position + 1) % 2 !== 0) commitMovement(p, Math.max(0, p.position - 1)); });
            return { text: 'ผู้เล่นบนช่องเลขคี่ถอยหลัง 1 ช่อง!', type: 'info' };
        }
        if (event.action === 'ALL_SCORE') {
            players.forEach(p => p.score += event.value);
            return { text: 'ทุกคนได้รับ 15 คะแนน!', type: 'success' };
        }
        if (single || players.length < 3) {
            players[index].extraTurnsToTake++;
            return { text: 'ลมส่งปริศนา! คุณได้รับสิทธิ์ทอยลูกเต๋าอีกครั้ง!', type: 'info' };
        }
        const sorted = [...players].sort((a, b) => b.position - a.position);
        let leader = sorted[0]; const last = sorted[sorted.length - 1];
        if (leader === players[index] && sorted.length > 1) leader = sorted[1];
        if (leader && last && leader !== last) {
            const temp = leader.position; commitMovement(leader, last.position); commitMovement(last, temp);
            return { text: `${leader.name} สลับตำแหน่งกับ ${last.name}!`, type: 'info', duration: 4000 };
        }
        return { text: 'ไม่สามารถสลับตำแหน่งได้ในตอนนี้', type: 'info' };
    }
    function validTargets(players, index) { return players.filter((p, i) => i !== index && !p.hasBeenPrankedThisRound); }
    function canOfferPrank(players, index, round) { return !(round === 1 && index < players.length - 1) && validTargets(players, index).length > 0; }
    function beginPrank(players, index, targetIndex, effect) {
        const actor = players[index], target = players[targetIndex];
        target.hasBeenPrankedThisRound = true;
        if (effect.cost) actor.score -= effect.cost;
    }
    function finishPrank(target, effect) {
        if (effect.action === 'prank_move_backward') commitMovement(target, Math.max(0, target.position - effect.value));
        else if (effect.action === 'prank_skip_turn') target.extraTurnsToTake = (target.extraTurnsToTake || 0) - effect.value;
    }
    function applyPrank(players, index, targetIndex, effect) { beginPrank(players,index,targetIndex,effect); finishPrank(players[targetIndex],effect); }
    function applyAnswer(player, card, correct, flags) {
        if (card?.question) {
            player.performanceLog ||= [];
            player.performanceLog.push({ category: card.category || 'uncategorized', difficulty: card.difficulty, correct });
        }
        let kind, points = 0;
        if (flags.isAnsweringFinalQuestion) { kind = 'final'; flags.isAnsweringFinalQuestion = false; if (correct) points = 50; }
        else if (flags.isAnsweringSetbackSave) {
            kind = 'setback'; flags.isAnsweringSetbackSave = false;
            if (correct) { points = 10; flags.pendingSetbackCard = null; }
        } else if (flags.pendingAction) {
            kind = 'special'; flags.pendingAction = null; if (correct) points = 5;
        } else if (flags.isHandlingBonusMoveQuestion) { kind = 'bonusMove'; flags.isHandlingBonusMoveQuestion = false; }
        else { kind = 'normal'; if (correct) points = ({easy:10,medium:20,hard:30})[card.difficulty] || 15; }
        player.score += points;
        return { kind, points, correct };
    }
    function effectPlan(player, card) {
        switch (card.action) {
            case 'move_forward': return { kind:'move', steps:card.value };
            case 'move_backward': return { kind:'move', steps:-card.value };
            case 'go_to_square': return { kind:'move', steps:card.value - player.position };
            case 'get_shield': player.hasShield = true; return { kind:'turn' };
            case 'roll_again': return { kind:'roll' };
            case 'go_to_start': {
                const blocked = player.hasShield; player.hasShield = false;
                if (!blocked) commitMovement(player, 0);
                return { kind:'turn', blocked:!!blocked };
            }
            default: return { kind:'turn' }; // V11.23 does not apply prank_skip_turn in this deck.
        }
    }
    const api = {GROUP_EVENTS,difficulty,selectCards,randomCard,answerMatches,challengePool,squareAction,consumeQuestion,planMovement,commitMovement,advanceTurn,
        resolveEvent,validTargets,canOfferPrank,beginPrank,finishPrank,applyPrank,applyAnswer,effectPlan};
    root.OriginalGameRules = api;
    if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
