(function () {
    'use strict';
    const S = window.OnlineState, el = id => document.getElementById(id);
    const Room = window.OnlineRoom;
    let sdkPromise, sdk, auth, db, uid, roomCode = '', meta = null, slots = {}, presence = {}, game = null;
    let connected = false, pending = null, processing = false, generation = 0, clockTimer;
    let requests = {}, kicked = {}, sessionId = '', disconnectHandle;
    let entryBusy = false, hostNeedsDrain = false;
    let spectators = {}, settings = null, role = 'player';
    const unsubscribers = [];
    const now = () => Date.now() + serverOffset;
    let serverOffset = 0;
    const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key, value) { try { localStorage.setItem(key, value); } catch {} }, remove(key) { try { localStorage.removeItem(key); } catch {} } };
    const isHost = () => !!uid && meta?.hostId === uid;
    const ref = path => sdk.ref(db, path);
    const roomPath = suffix => `rooms/${roomCode}/${suffix}`;
    function message(text, error = false) {
        el('onlineNotice').textContent = text; el('onlineNotice').classList.toggle('online-error', error);
        el('onlineGameNotice').textContent = text;
    }
    function reportError(error) {
        const code = String(error?.code || error?.message || '').toLowerCase();
        if (code === 'disconnect' || code === 'database/disconnected') {
            hostNeedsDrain = true;
            message('การเชื่อมต่อขาด กำลังเชื่อมต่อใหม่…');
            return;
        }
        console.error('Online:', error);
        message(code.includes('permission') ? 'ไม่มีสิทธิ์เข้าถึงห้อง กรุณาตรวจ Database Rules หรือสถานะการนำออกจากห้อง' : code.includes('network') || /fetch|import/i.test(error.message || '') ? 'เชื่อมต่อ Firebase ไม่ได้ กรุณาตรวจอินเทอร์เน็ตแล้วลองใหม่' : error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ', true);
    }
    async function ensureFirebase() {
        if (!sdkPromise) sdkPromise = (async () => {
            // Pinned modular browser SDK; loaded only when online mode is requested.
            const base = 'https://www.gstatic.com/firebasejs/10.14.1/';
            const [appSDK, authSDK, databaseSDK] = await Promise.all([
                import(base + 'firebase-app.js'), import(base + 'firebase-auth.js'), import(base + 'firebase-database.js')
            ]);
            sdk = { ...appSDK, ...authSDK, ...databaseSDK };
            const app = sdk.getApps().length ? sdk.getApp() : sdk.initializeApp(window.FIREBASE_CONFIG);
            auth = sdk.getAuth(app); db = sdk.getDatabase(app);
            await sdk.setPersistence(auth, sdk.browserLocalPersistence);
            await auth.authStateReady();
            if (!auth.currentUser) await sdk.signInAnonymously(auth);
            uid = auth.currentUser.uid;
            return sdk;
        })().catch(e => { sdkPromise = null; throw e; });
        return sdkPromise;
    }
    function listen(path, callback, token) {
        unsubscribers.push(sdk.onValue(ref(path), snap => { if (token === generation) callback(snap.val()); }, error => {
            if (token === generation) handleListenerError(error, token);
        }));
    }
    async function handleListenerError(error, token) {
        // Membership revocation can reach game listeners before the kicked marker.
        // Treat that expected transition as a room exit, while surfacing real rule errors.
        if (/permission/i.test(error.code || error.message || '') && roomCode) {
            const code = roomCode;
            try {
                // Allow the independent kicked/meta listener to deliver its matching
                // update; RTDB can revoke a read earlier in the same server message batch.
                await new Promise(resolve => setTimeout(resolve, 150));
                if (token !== generation) return;
                const marker = (await sdk.get(ref(`rooms/${code}/kicked/${uid}`))).val();
                if (token !== generation) return;
                if (marker) { message('คุณถูกนำออกจากห้องนี้'); leave(false); return; }
                const roomMeta = (await sdk.get(ref(`rooms/${code}/meta`))).val();
                if (token !== generation) return;
                if (!roomMeta || roomMeta.status === 'closed') { message('ห้องถูกปิดแล้ว'); leave(false); return; }
            } catch { /* Surface the original denied operation below. */ }
        }
        if (token === generation) reportError(error);
    }
    function unsubscribeRoom() {
        generation++; unsubscribers.splice(0).forEach(off => off());
        clearInterval(clockTimer); clockTimer = null;
        requests = {}; kicked = {}; pending = null; processing = false; hostNeedsDrain = false;
        connected = false; game = null; slots = {}; presence = {}; meta = null;
        spectators = {}; settings = null;
        window.GameCore.cleanup();
    }
    function profile() {
        const name = S.sanitizePlayerName(el('onlineName').value);
        if (!name) throw Error('กรุณากรอกชื่อผู้เล่น 1–24 ตัวอักษร');
        const emoji = el('onlineEmoji').value;
        storage.set('lastPlayerName', name); storage.set('lastEmoji', emoji);
        return { uid, name, emoji, joinedAt: sdk.serverTimestamp() };
    }
    function renderLobby() {
        const profiles = Object.values(slots);
        el('onlineRoomCodeDisplay').textContent = roomCode;
        el('onlinePlayerCount').textContent = `ผู้เล่น ${profiles.length}/10 คน`;
        const policy=settings || {questionCategories:Object.keys(Room.CATEGORIES),difficultyLevel:'hard'};
        const labels={easy:'ง่าย (เฉพาะง่าย)',medium:'ปานกลาง (ง่าย + ปานกลาง)',hard:'ยาก (ง่าย + ปานกลาง + ยาก)'};
        el('onlineLobbySettings').textContent=`แผนที่: ${Room.BOARD_LABELS[Room.boardSize(policy)]}\nประเภทโจทย์:\n${S.list(policy.questionCategories).map(c=>Room.CATEGORIES[c]).join('\n')}\nระดับ: ${labels[policy.difficultyLevel]}`;
        el('onlineSpectatorCount').textContent=`👀 ผู้ชม ${Object.keys(spectators).length}/20 คน`;
        el('onlineSpectators').replaceChildren();
        Object.values(spectators).forEach(p=>{
            const row=document.createElement('li');row.className='online-player-row';
            const label=document.createElement('span');label.textContent=`👀 ${p.name}${p.uid===uid?' (คุณ)':''} · ${presence[p.uid]?.online?'🟢 Online':'⚪ Offline'}`;row.appendChild(label);
            if(isHost()){const remove=document.createElement('button');remove.className='modal-button';remove.textContent='นำออก';remove.onclick=()=>removePlayer(p.uid);row.appendChild(remove);}
            el('onlineSpectators').appendChild(row);
        });
        el('onlinePlayers').replaceChildren();
        profiles.forEach(p => {
            const row = document.createElement('li'); row.className = 'online-player-row';
            const label = document.createElement('span'); label.textContent = `${p.uid === meta?.hostId ? '👑 ' : ''}${p.emoji} ${p.name}${p.uid === uid ? ' (คุณ)' : ''} · ${presence[p.uid]?.online ? '🟢 Online' : '⚪ Offline'}`; row.appendChild(label);
            if (isHost() && p.uid !== uid) {
                const remove = document.createElement('button'); remove.className = 'modal-button'; remove.textContent = 'นำออก';
                remove.onclick = () => removePlayer(p.uid); row.appendChild(remove);
            }
            el('onlinePlayers').appendChild(row);
        });
        el('onlineStartBtn').hidden = !isHost(); el('onlineCloseBtn').hidden = !isHost();
        el('onlineStartBtn').disabled = !connected || profiles.length < 2 || meta?.status !== 'waiting';
        el('onlineWaiting').textContent = isHost() ? 'Host เป็นผู้เล่นด้วย · ต้องมีผู้เล่นอย่างน้อย 2 คน' : role==='spectator'?'👀 คุณเป็นผู้ชม · กำลังรอ Host เริ่มเกม…':'กำลังรอ Host เริ่มเกม…';
        el('onlineConnection').textContent = connected ? '🟢 เชื่อมต่อแล้ว' : '🟡 กำลังเชื่อมต่อใหม่…';
    }
    function render() {
        renderLobby();
        el('onlineBoardControls').hidden = !game;
        el('onlineHostControls').hidden = !isHost();
        el('onlinePauseBtn').textContent = game?.phase === 'PAUSED' ? '▶ เล่นต่อ' : '⏸ หยุดชั่วคราว';
        const controlsEnabled = connected && presence[meta?.hostId]?.online && game?.phase !== 'GAME_OVER';
        el('onlineHostControls').querySelectorAll('button').forEach(btn => { btn.disabled = !controlsEnabled || !!pending; });
        el('onlineBoardCloseBtn').disabled = !connected || !!pending;
        el('onlineKickSelect').replaceChildren();
        [...Object.values(slots),...Object.values(spectators)].filter(p => p.uid !== uid).forEach(p => {
            const option = document.createElement('option'); option.value = p.uid; option.textContent = p.name; el('onlineKickSelect').appendChild(option);
        });
        if (game) {
            el('onlineScreen').hidden = true;
            el('onlineGameNotice').textContent = `ห้อง ${roomCode}${role==='spectator'?' · 👀 ผู้ชม':''} · ${connected ? '🟢 เชื่อมต่อแล้ว' : '🟡 กำลังเชื่อมต่อใหม่…'}`;
            window.GameCore.render(game, uid, meta?.hostId, presence, connected, !!pending, now(),role);
        } else { el('onlineLobby').hidden = false; el('onlineEntry').hidden = true; }
    }
    async function subscribeRoom(code,memberRole='player') {
        unsubscribeRoom(); roomCode = code; const token = generation;
        role=memberRole; storage.set('lastRoomRole',role);
        window.GameCore.enter(); window.GameCore.getCatalog();
        storage.set('lastRoomCode', code);
        el('onlineScreen').hidden = false; el('onlineEntry').hidden = true; el('onlineLobby').hidden = false;
        sessionId = sdk.push(ref(roomPath(`presence/${uid}/sessions`))).key;
        listen(roomPath('meta'), value => {
            if (!value || value.status === 'closed') { message('ห้องถูกปิดแล้ว'); leave(false); return; }
            meta = value; render(); drain();
        }, token);
        listen(roomPath(`kicked/${uid}`), value => { if (value) { message('คุณถูกนำออกจากห้องนี้', true); leave(false); } }, token);
        listen(roomPath('slots'), value => { slots = value || {}; render(); }, token);
        listen(roomPath('spectators'),value=>{spectators=value || {};render();},token);
        listen(roomPath('settings'),value=>{settings=value;render();},token);
        listen(roomPath('presence'), value => {
            presence = {};
            Object.entries(value || {}).forEach(([id, p]) => {
                const sessions = Object.values(p.sessions || {});
                presence[id] = { online: sessions.some(x => x.online), lastSeen: Math.max(0, ...sessions.map(x => Number(x.lastSeen) || 0)) };
            }); render(); drain();
        }, token);
        listen(roomPath('game'), value => {
            game = value;
            render(); drain();
        }, token);
        if(role==='player')listen(roomPath(`receipts/${uid}`), receipt => {
            if (receipt && pending?.id === receipt.requestId) {
                pending = null;
                if (receipt.error) message(({ STALE_REVISION: 'สถานะเกมเปลี่ยนแล้ว กรุณาลองอีกครั้ง', HOST_OFFLINE: 'รอ Host กลับมา', WRONG_PHASE: 'คำขอนี้ใช้ไม่ได้ในช่วงปัจจุบัน', NOT_YOUR_TURN: 'ยังไม่ใช่ตาของคุณ' })[receipt.error] || `คำขอไม่สำเร็จ: ${receipt.error}`, true);
                render();
            }
        }, token);
        // Subscribe to mailboxes only on the host, never to the database root.
        const initialMeta = (await sdk.get(ref(roomPath('meta')))).val();
        if (token !== generation) return;
        meta = initialMeta;
        if (isHost()) {
            listen(roomPath('requests'), value => { requests = value || {}; hostNeedsDrain = true; drain(); }, token);
            listen(roomPath('kicked'), value => { kicked = value || {}; }, token);
        }
        listen('.info/serverTimeOffset', offset => { serverOffset = Number(offset) || 0; }, token);
        listen('.info/connected', async value => {
            connected = !!value; render();
            if (!value) return;
            try {
                const sessionRef = ref(roomPath(`presence/${uid}/sessions/${sessionId}`));
                const handle = sdk.onDisconnect(sessionRef);
                disconnectHandle = handle;
                // Register the disconnect operation BEFORE marking a session online.
                await handle.set({ online: false, lastSeen: sdk.serverTimestamp() });
                if (token !== generation) { await handle.cancel(); return; }
                await sdk.set(sessionRef, { online: true, lastSeen: sdk.serverTimestamp() });
                if (token !== generation) { await sdk.set(sessionRef, { online: false, lastSeen: sdk.serverTimestamp() }); return; }
                // Clear a pending intent when its mailbox was removed before a lost acknowledgement.
                const mailbox = role==='player'?(await sdk.get(ref(roomPath(`requests/${uid}`)))).val():null;
                if (token !== generation) return;
                if (mailbox) pending = { id: mailbox.requestId }; else pending = null;
                render(); drain();
            } catch (e) { if (token === generation) reportError(e); }
        }, token);
        clockTimer = setInterval(() => {
            if (token !== generation) return;
            window.GameCore.updateClock(game, now());
            if (isHost() && connected && presence[uid]?.online && !processing && game && S.nextDeadline(game) && now() >= S.nextDeadline(game)) {
                hostTick(token).catch(error => { if (token === generation) handleListenerError(error, token); });
            }
        }, 250);
        const link = makeLink(code); el('onlineShareLink').value = link;
        el('onlineQr').replaceChildren();
        try {
            if (window.QRCode) new window.QRCode(el('onlineQr'), { text: link, width: 180, height: 180, correctLevel: window.QRCode.CorrectLevel.M });
            else el('onlineQr').textContent = 'QR โหลดไม่ได้ ใช้รหัสห้องหรือลิงก์ด้านล่าง';
        } catch { el('onlineQr').textContent = 'ใช้รหัสห้องหรือลิงก์ด้านล่าง'; }
        render();
    }
    function makeLink(code) {
        const url = new URL(window.location.href); url.hash = ''; url.search = ''; url.searchParams.set('room', code); return url.href;
    }
    async function createRoom() {
        if (entryBusy) return;
        entryBusy = true;
        try {
        let roomSettings;
        try {roomSettings=Room.normalizeSettings({questionCategories:Array.from(el('onlineCategoryOptions').querySelectorAll('input:checked'),n=>n.value),difficultyLevel:el('onlineDifficulty').value,boardSize:Number(el('onlineBoardSizes').querySelector('input:checked').value)});}
        catch(e){message(e.message,true);return;}
        await ensureFirebase(); const p = profile();
        for (let attempt = 0; attempt < 20; attempt++) {
            const values = new Uint32Array(1); crypto.getRandomValues(values);
            const code = S.generateRoomCode(() => values[0] / 4294967296);
            const reservation = await sdk.runTransaction(ref(`directory/${code}`), existing => existing ? undefined : { hostId: uid, createdAt: sdk.serverTimestamp() }, { applyLocally: false });
            if (!reservation.committed) continue;
            try {
                await sdk.update(ref(`rooms/${code}`), { meta: { hostId: uid, status: 'waiting', createdAt: sdk.serverTimestamp() }, settings:roomSettings, slots: { s0: p } });
            } catch (e) { await sdk.remove(ref(`directory/${code}`)).catch(() => {}); throw e; }
            message('สร้างห้องแล้ว'); await subscribeRoom(code); return;
        }
        throw Error('สร้างรหัสห้องไม่ได้ กรุณาลองอีกครั้ง');
        } finally { entryBusy = false; }
    }
    async function joinRoom(code = el('onlineRoomCode').value.trim(), reconnectOnly = false) {
        if (entryBusy) return;
        entryBusy = true;
        try {
        if (!/^[1-9][0-9]{5}$/.test(code)) throw Error('รหัสห้องต้องเป็นตัวเลข 6 หลัก');
        await ensureFirebase();
        const m = (await sdk.get(ref(`rooms/${code}/meta`))).val();
        if (!m || m.status === 'closed') throw Error('ไม่พบห้อง หรือห้องถูกปิดแล้ว');
        const ban = (await sdk.get(ref(`rooms/${code}/kicked/${uid}`))).val();
        if (ban) throw Error('คุณถูกนำออกจากห้องนี้');
        const wantedRole=reconnectOnly?(storage.get('lastRoomRole') || 'player'):el('onlineJoinRole').value;
        const viewers=(await sdk.get(ref(`rooms/${code}/spectators`))).val() || {};
        if(Object.values(viewers).some(p=>p.uid===uid)) {message('เชื่อมต่อผู้ชมเดิมแล้ว');await subscribeRoom(code,'spectator');return;}
        let roster={};
        if(m.status==='waiting' || wantedRole==='player'){
            try {roster=(await sdk.get(ref(`rooms/${code}/slots`))).val() || {};}
            catch(e){if(m.status!=='waiting' && /permission/i.test(e.code || e.message || ''))throw Error('เกมเริ่มแล้ว ไม่เปิดรับผู้เล่นใหม่ กรุณาเลือกผู้ชม');throw e;}
        }
        const existing = Object.values(roster).some(p => p.uid === uid);
        if(!existing && wantedRole==='spectator'){
            if(reconnectOnly)throw Error('ไม่มีผู้ชมเดิมให้เชื่อมต่อ กรุณาเข้าห้องใหม่');
            const p=profile();
            const result=await sdk.runTransaction(ref(`rooms/${code}/spectators`),current=>Room.joinSpectators(current,p,m.status,{}),{applyLocally:false});
            if(!result.committed)throw Error('เข้าชมห้องไม่ได้ กรุณาลองใหม่');
            message('เข้าร่วมเป็นผู้ชมแล้ว');await subscribeRoom(code,'spectator');return;
        }
        if (reconnectOnly && !existing) throw Error('ไม่มีผู้เล่นเดิมให้เชื่อมต่อ กรุณาเข้าห้องใหม่');
        if (!existing) {
            const p = profile();
            const result = await sdk.runTransaction(ref(`rooms/${code}/slots`), current => S.joinSlots(current, p, m.status, {}), { applyLocally: false });
            if (!result.committed) throw Error('เข้าห้องไม่ได้ กรุณาลองใหม่');
        }
        message(existing ? 'เชื่อมต่อผู้เล่นเดิมแล้ว' : 'เข้าร่วมห้องแล้ว'); await subscribeRoom(code);
        } finally { entryBusy = false; }
    }
    async function startGame() {
        if (!isHost() || !connected) return;
        const code = roomCode;
        const roomRef = ref(`rooms/${code}`);
        // Child listeners do not guarantee a complete parent cache. Prime the room
        // before a room-level transaction; the transaction still validates every retry.
        const initialRoom = (await sdk.get(roomRef)).val();
        const result = await sdk.runTransaction(roomRef, room => {
            // RTDB may still call this first with null when no parent listener is active.
            // Propose from the read snapshot; the server comparison then supplies current
            // data on conflict, so admissions/start remain atomic rather than aborting early.
            room ||= initialRoom ? JSON.parse(JSON.stringify(initialRoom)) : null;
            if (!room || room.meta.hostId !== uid || room.meta.status !== 'waiting') return;
            const profiles = Object.values(room.slots || {}).filter(p => !room.kicked?.[p.uid]);
            if (profiles.length < 2) return;
            // Room-level transaction makes start and admission mutually exclusive.
            room.game = S.createGame(profiles, now(),room.settings); room.meta.status = 'playing'; return room;
        }, { applyLocally: false });
        if (!result.committed) message('เริ่มเกมไม่ได้ ต้องมีผู้เล่นอย่างน้อย 2 คน', true);
    }
    function requestId() { return crypto.randomUUID ? crypto.randomUUID() : sdk.push(ref(roomPath('requests'))).key; }
    async function send(type, payload = {}) {
        if (!game || pending || !connected || !presence[meta?.hostId]?.online) return;
        const id = requestId(), token = generation;
        const request = { requestId: id, type, actorId: uid, expectedRevision: game.revision,
            payload: { ...payload, interactionId: game.interaction?.id || '' }, createdAt: sdk.serverTimestamp() };
        const err = S.validateRequest(game, request, { actorId: uid, hostId: meta.hostId, hostOnline: true, kicked, now: now() });
        if (err) { message(`คำขอใช้ไม่ได้: ${err}`, true); return; }
        pending = { id }; render();
        try {
            const result = await sdk.runTransaction(ref(roomPath(`requests/${uid}`)), current => current ? undefined : request, { applyLocally: false });
            if (!result.committed && token === generation) { pending = { id: result.snapshot.val().requestId }; message('มีคำขอเดิมกำลังประมวลผล'); }
        } catch (e) { if (token === generation) { pending = null; render(); reportError(e); } }
    }
    async function processRequest(request, actorId, token, acknowledge = true) {
        const code = roomCode, requestRef = ref(`rooms/${code}/requests/${actorId}`);
        let error = 'STALE_REVISION';
        const seed = new Uint32Array(1); crypto.getRandomValues(seed);
        const time = now();
        const context = { ...window.GameCore.context(), actorId, hostId: meta.hostId, hostOnline: connected && presence[meta.hostId]?.online, kicked, now: time };
        const gameRef = ref(`rooms/${code}/game`);
        const initialGame = (await sdk.get(gameRef)).val();
        if (token !== generation || !initialGame) return;
        const result = await sdk.runTransaction(gameRef, current => {
            current ||= JSON.parse(JSON.stringify(initialGame));
            if (token !== generation || !connected) return;
            // Transaction retries use the same random stream, never re-roll an already committed action.
            let n = seed[0]; context.random = () => { n = (Math.imul(n, 1664525) + 1013904223) >>> 0; return n / 4294967296; };
            const resolved = S.applyGameAction(current, request, context); error = resolved.error;
            if (error) return;
            const next = resolved.state; next.lastAction.committedAt = sdk.serverTimestamp();
            return next;
        }, { applyLocally: false });
        if (token !== generation) return;
        if (result.committed && result.snapshot.val().status === 'finished') await sdk.update(ref(`rooms/${code}/meta`), { status: 'finished' });
        if (acknowledge) {
            // Delete only the processed mailbox; a new intent must never be erased by an old callback.
            await sdk.runTransaction(requestRef, current => current?.requestId === request.requestId ? null : undefined, { applyLocally: false });
            // Acknowledge only after the mailbox is clear. Otherwise a fast next click
            // finds the old mailbox and waits for a receipt that was already delivered.
            await sdk.set(ref(`rooms/${code}/receipts/${actorId}`), { requestId: request.requestId, error: error === 'DUPLICATE' ? '' : error || '', revision: result.snapshot.val()?.revision || 0, createdAt: sdk.serverTimestamp() });
        }
    }
    async function drain() {
        if (processing || !isHost() || !connected || !presence[uid]?.online || !game) return;
        processing = true; const token = generation;
        hostNeedsDrain = false;
        try {
            const batch = Object.entries(requests).sort((a, b) => (a[1].createdAt || 0) - (b[1].createdAt || 0));
            for (const [actorId, request] of batch) {
                if (token !== generation || !connected) break;
                await processRequest(request, actorId, token);
            }
        } catch (e) { if (token === generation) await handleListenerError(e, token); }
        finally { if (token === generation) { processing = false; if (hostNeedsDrain && connected) queueMicrotask(drain); } }
    }
    async function hostTick(token) {
        if (processing) return;
        processing = true;
        try {
            const current = (await sdk.get(ref(roomPath('game')))).val();
            if (token !== generation || !S.nextDeadline(current) || now() < S.nextDeadline(current)) return;
            await processRequest({ requestId: `tick:${current.revision}`, type: 'TICK', actorId: uid, expectedRevision: current.revision, payload: {} }, uid, token, false);
        } finally { if (token === generation) { processing = false; drain(); } }
    }
    async function removePlayer(targetUid) {
        if (!isHost() || targetUid === uid || !targetUid || !connected) return;
        const viewerKey=Object.keys(spectators).find(key=>spectators[key].uid===targetUid);
        if(viewerKey){await sdk.update(ref(`rooms/${roomCode}`),{[`spectators/${viewerKey}`]:null,[`kicked/${targetUid}`]:{at:sdk.serverTimestamp()},[`presence/${targetUid}`]:null});return;}
        const roomRef = ref(`rooms/${roomCode}`);
        const initialRoom = (await sdk.get(roomRef)).val();
        await sdk.runTransaction(roomRef, room => {
            room ||= initialRoom ? JSON.parse(JSON.stringify(initialRoom)) : null;
            if (!room || room.meta.hostId !== uid) return;
            room.kicked ||= {}; room.kicked[targetUid] = { at: sdk.serverTimestamp() };
            Object.keys(room.slots || {}).forEach(slot => { if (room.slots[slot].uid === targetUid) delete room.slots[slot]; });
            if (room.game) { room.game = S.removePlayer(room.game, targetUid, now()); room.meta.status = room.game.status; }
            if (room.requests) delete room.requests[targetUid];
            if (room.presence) delete room.presence[targetUid];
            return room;
        }, { applyLocally: false });
    }
    async function closeRoom() {
        if (!isHost() || !connected) return;
        await sdk.update(ref(roomPath('meta')), { status: 'closed', closedAt: sdk.serverTimestamp() });
    }
    function leave(markOffline = true) {
        const code = roomCode, session = sessionId, handle = disconnectHandle, wasConnected = connected;
        // Detach first: a stalled offline write must never trap the user in the room.
        unsubscribeRoom(); roomCode = ''; sessionId = ''; disconnectHandle = null;
        storage.remove('lastRoomCode');
        window.GameCore.exit(); el('onlineBoardControls').hidden = true;
        el('onlineScreen').hidden = false; mainMenuModal.style.display = 'none';
        el('onlineEntry').hidden = false; el('onlineLobby').hidden = true;
        if (markOffline && code && sdk && wasConnected) {
            sdk.set(ref(`rooms/${code}/presence/${uid}/sessions/${session}`), { online: false, lastSeen: sdk.serverTimestamp() }).then(() => handle?.cancel()).catch(reportError);
        }
    }
    function guarded(action) { return async () => { try { await action(); } catch (e) { reportError(e); } }; }
    async function open(code) {
        window.GameCore.enter(); el('onlineScreen').hidden = false; el('onlineEntry').hidden = false; el('onlineLobby').hidden = true;
        if (code) el('onlineRoomCode').value = code;
        el('onlineName').focus(); message('กำลังเชื่อมต่อ Firebase…');
        await ensureFirebase();
        if(!roomCode && el('onlineNotice').textContent==='กำลังเชื่อมต่อ Firebase…')message('พร้อมสร้างห้องหรือเข้าร่วมห้อง');
    }
    window.OnlineGame = { send, leave, open, makeLink };
    window.addEventListener('DOMContentLoaded', () => {
        for(const [size,title] of Object.entries(Room.BOARD_LABELS)){
            const label=document.createElement('label'),input=document.createElement('input');
            input.type='radio';input.name='onlineBoardSize';input.value=size;input.id=`onlineBoardSize_${size}`;input.checked=Number(size)===30;
            label.append(input,document.createTextNode(title+(Number(size)===30?' (แนะนำ)':'')));el('onlineBoardSizes').appendChild(label);
        }
        // Fixed online controls must escape the board's stacking context to stay
        // available over observer modals; this adds no space to the golden board.
        document.body.appendChild(el('onlineBoardControls'));
        defaultPlayerEmojis.forEach(emoji => { const option = document.createElement('option'); option.value = emoji; option.textContent = emoji; el('onlineEmoji').appendChild(option); });
        el('onlineName').value = storage.get('lastPlayerName') || '';
        el('onlineEmoji').value = storage.get('lastEmoji') || '🚀';
        Object.entries(Room.CATEGORIES).forEach(([category,title])=>{
            const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=category;input.checked=true;input.id=`onlineCategory_${category}`;
            label.append(input,document.createTextNode(title));el('onlineCategoryOptions').appendChild(label);
        });
        el('onlineSelectAllCategories').onclick=()=>el('onlineCategoryOptions').querySelectorAll('input').forEach(n=>n.checked=true);
        el('onlineClearCategories').onclick=()=>el('onlineCategoryOptions').querySelectorAll('input').forEach(n=>n.checked=false);
        el('mainMenuOnlineBtn').onclick = guarded(() => open());
        el('onlineCreateBtn').onclick = guarded(createRoom);
        el('onlineJoinBtn').onclick = guarded(() => joinRoom());
        el('onlineBackBtn').onclick = () => { unsubscribeRoom(); window.GameCore.exit(); el('onlineScreen').hidden = true; };
        el('onlineLeaveBtn').onclick = () => leave(); el('onlineBoardLeaveBtn').onclick = () => leave();
        el('onlineStartBtn').onclick = guarded(startGame);
        el('onlineCloseBtn').onclick = guarded(closeRoom); el('onlineBoardCloseBtn').onclick = guarded(closeRoom);
        el('onlinePauseBtn').onclick = () => send(game?.phase === 'PAUSED' ? 'RESUME' : 'PAUSE');
        el('onlineSkipBtn').onclick = () => send('SKIP_PLAYER'); el('onlineEndBtn').onclick = () => send('END_GAME');
        el('onlineKickBtn').onclick = guarded(() => removePlayer(el('onlineKickSelect').value));
        el('onlineCopyBtn').onclick = guarded(async () => {
            try { await navigator.clipboard.writeText(el('onlineShareLink').value); }
            catch { el('onlineShareLink').select(); if (!document.execCommand('copy')) { message('เลือกลิงก์แล้ว กรุณาคัดลอกด้วยตนเอง'); return; } }
            message('คัดลอกลิงก์แล้ว');
        });
        el('onlineRoomCode').addEventListener('input', event => { event.target.value = event.target.value.replace(/\D/g, '').slice(0, 6); });
        el('onlineName').addEventListener('keydown', event => { if (event.key === 'Enter') guarded(() => joinRoom())(); });
        modalAnswerInput.addEventListener('keydown', event => { if (gameMode === 'online' && event.key === 'Enter' && !modalSubmitButton.disabled) modalSubmitButton.click(); });
        const deepLink = new URL(window.location.href).searchParams.get('room');
        const previous = storage.get('lastRoomCode');
        if (deepLink && /^[1-9][0-9]{5}$/.test(deepLink)) guarded(async () => {
            await open(deepLink);
            if (previous === deepLink) {
                try { await joinRoom(previous, true); } catch (e) { storage.remove('lastRoomCode'); reportError(e); }
            }
        })();
        else if (previous) guarded(async () => {
            await open(previous);
            try { await joinRoom(previous, true); } catch (e) { storage.remove('lastRoomCode'); reportError(e); }
        })();
    });
})();
