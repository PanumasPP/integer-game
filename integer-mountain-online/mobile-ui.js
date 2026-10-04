/* Presentation only: no game reducer, Firebase writes, listeners or room settings. */
(function () {
    'use strict';
    let onlineView = null, resizeTimer, previousWidth = window.innerWidth;
    const scrolledMoves = new Set();
    const mobile = () => window.innerWidth < 900;
    const el = id => document.getElementById(id);
    function refresh(view) {
        if (view) onlineView = view;
        const status = el('mobileTurnStatus');
        if (!status) return;
        const active = players[currentPlayerIndex];
        el('mobileHostClose').disabled = false;
        if (gameMode === 'online' && onlineView) {
            const acting = players.find(p => p.uid === (onlineView.actorId || onlineView.currentPlayerId));
            status.textContent = onlineView.role === 'spectator' ? '👀 กำลังชมการแข่งขัน'
                : onlineView.phase === 'GAME_OVER' ? '🏁 จบการแข่งขัน'
                : onlineView.phase === 'PAUSED' ? '⏸ เกมหยุดชั่วคราว'
                : onlineView.currentPlayerId === onlineView.uid ? '🎯 ตาของคุณ'
                : `กำลังรอ ${acting?.name || active?.name || ''}`;
        } else status.textContent = isSinglePlayerMode ? '🎯 ตาของคุณ' : `🎯 ตาของ ${active?.name || ''}`;
        players.forEach(p => {
            const panel = el(`player${p.id}InfoDisplay`);
            if (!panel) return;
            panel.classList.toggle('mobile-current-player', p.id === active?.id);
            if (p.id === active?.id) panel.setAttribute('aria-current', 'true');
            else panel.removeAttribute('aria-current');
            panel.title = `${p.name} · ช่อง ${p.position + 1} · ${p.score} คะแนน`;
        });
        placeHostControls();
    }
    function placeHostControls() {
        const controls = el('onlineHostControls'), bar = el('onlineBoardControls');
        const modalOpen = document.querySelector('.modal[style*="flex"], .card-selection-modal[style*="flex"], .prank-modal[style*="flex"], #explanationModal[style*="flex"], .cai-modal[style*="flex"]');
        const overlay = mobile() && gameMode === 'online' && !!onlineView && onlineView.uid === onlineView.hostId && !!modalOpen;
        controls.classList.toggle('mobile-modal-controls', overlay);
        const parent = overlay ? document.body : bar;
        if (controls.parentElement !== parent) parent.appendChild(controls);
    }
    function placeRoomBar() {
        const bar = el('onlineBoardControls');
        if (!bar) return;
        const parent = mobile() ? boardContainer : document.body;
        el('mobileTurnStatus').hidden = !mobile();
        if (bar.parentElement !== parent) {
            if (mobile()) parent.insertBefore(bar, parent.firstChild);
            else parent.appendChild(bar);
        }
        if (!mobile()) el('onlineHostControls').open = false;
    }
    function resizePresentation() {
        placeRoomBar();
        placeHostControls();
        // Address-bar height changes need no grid work. Reposition existing nodes only on width changes.
        if (previousWidth !== window.innerWidth) {
            previousWidth = window.innerWidth;
            layoutBoardSquares();
        }
    }
    function movementFinished(actionId, position, playerId) {
        if (!mobile() || boardContainer.classList.contains('hidden')) return;
        if (actionId) {
            if (scrolledMoves.has(actionId)) return;
            scrolledMoves.add(actionId);
            if (scrolledMoves.size > 128) scrolledMoves.delete(scrolledMoves.values().next().value);
            // Observers and spectators keep their reading position; only follow your own online pawn.
            if (!onlineView || onlineView.role === 'spectator' || playerId !== onlineView.uid) return;
        }
        if (document.querySelector('.modal[style*="flex"], .card-selection-modal[style*="flex"], .prank-modal[style*="flex"], #explanationModal[style*="flex"], .central-message-overlay[style*="flex"], .victory-overlay[style*="flex"], .cai-modal[style*="flex"], .emoji-picker-modal[style*="flex"], .dice-animation-overlay[style*="flex"]') || el('onlineHostControls').open) return;
        const square = el(`square-${position}`);
        if (!square) return;
        const rect = square.getBoundingClientRect(), dock = el('rightControlPanel').getBoundingClientRect();
        if (rect.top < 16 || rect.bottom > dock.top - 12) square.scrollIntoView({behavior:'smooth', block:'center', inline:'nearest'});
    }
    window.MobileGameUI = {refresh, movementFinished, reset() {onlineView = null; scrolledMoves.clear(); el('onlineHostControls').open = false; placeHostControls();}};
    window.addEventListener('DOMContentLoaded', () => {
        const status = document.createElement('p');status.id = 'mobileTurnStatus';status.className = 'mobile-only';status.hidden = !mobile();status.setAttribute('aria-live', 'polite');
        el('rightControlPanel').prepend(status);
        const close = document.createElement('button');close.id = 'mobileHostClose';close.className = 'mobile-only modal-button modal-close-button';close.type = 'button';close.textContent = 'ปิดเมนู';close.onclick = () => {el('onlineHostControls').open = false;};
        el('onlineHostControls').querySelector('.online-buttons').appendChild(close);
        el('onlineHostControls').querySelector('summary').title = 'ควบคุมห้อง';
        const heading = boardContainer.querySelector('header h1');heading.dataset.mobileTitle = '🏔️ พิชิตยอดเขาจำนวนเต็ม';
        placeRoomBar();refresh();
        if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => {
            document.body.style.setProperty('--mobile-controls-height', `${Math.ceil(el('rightControlPanel').getBoundingClientRect().height)}px`);
        }).observe(el('rightControlPanel'));
    });
    for (const event of ['resize', 'orientationchange']) window.addEventListener(event, () => {
        clearTimeout(resizeTimer);resizeTimer = setTimeout(resizePresentation, 150);
    });
    document.addEventListener('keydown', event => {if (event.key === 'Escape') el('onlineHostControls').open = false;});
})();
