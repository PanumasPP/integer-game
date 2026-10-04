# รายงาน restore Golden Master — 4 ตุลาคม 2026

แก้ source แล้ว: Local และ Online ใช้ mutation จากกติกา V11.23 ชุดเดียวกันผ่าน `game-rules.js`; Firebase รับผิดชอบ room, action, revision และ synchronization ส่วน Online แสดงกระดานและ modal ผ่าน presentation เดิมใน `scripts.js` ไม่มีการ deploy หรือเขียน production ในงานรอบนี้

## หลักฐานต้นฉบับและรายการก่อนแก้

โฟลเดอร์นี้และ parent ไม่มี Git repository จึงไม่มี git history/diff ให้ใช้ พบไฟล์เกมก่อนเพิ่ม Online ใน `D:\Best\เกมพิชิตยอดเขาจำนวนเต็ม\` ได้แก่ `scripts.js`, `styles.css`, `questions.js` และ `เกมพิชิตยอดเขาจำนวนเต็ม V11.23.html` เก็บสำเนา HTML/scripts/styles โดยไม่แก้ไว้ที่ `tests/golden/` เป็น oracle ของการทดสอบ ไม่ใช้ shared engine ใหม่สร้าง expected result

| ไฟล์ | SHA-256 |
|---|---|
| Golden scripts.js | `dba3c8e110b7455695781d3cee0b0c48b1a2157c2a609714e1f970254a2c83da` |
| questions.js เดิมและปัจจุบัน | `2cb16004cad00cf21a80d24bb1ee9147b2c1c3c526e80f90954ba5fcee1bcd36` |
| styles.css เดิมและปัจจุบัน | `46f05b8bc7cb457df7545d3fcaa015ee545a61766553905936953a34aad05ace` |
| Database Rules ไม่เปลี่ยนในรอบนี้ | `31a378a154dc11abae9b8ca340f38266e4416b502a4b2ba4f3235902eb1a5d4e` |

### 1. Logic regression ที่พบและแก้

| จุดที่ต่างก่อนแก้ | พฤติกรรมที่คืนตามต้นฉบับ |
|---|---|
| Online มีการคำนวณ gameplay แยกจาก Local | ดึง mutation จากต้นฉบับมาใช้ร่วมกัน: movement, square dispatch, answer/score, turn, event, prank, card effect และ randomness |
| สุ่มการ์ดแบบ Fisher–Yates | ใช้ `[...pool].sort(() => 0.5 - random()).slice(...)` เดิม พร้อมจำนวนการ์ดและ pool เดิม |
| ลบคำถามด้วย ID อย่างเดียว / ใช้ save/final แล้วตัดออกจาก pool | `onCardSelected` ลบข้อแรกที่ข้อความ question เท่ากัน; save/final ไม่ consume ตามต้นฉบับ |
| คะแนน/flag ของ special, bonus movement และ performance log ไม่ครบ | รักษาลำดับ branch: final 50, setback save 10, pending special 5, bonus-move question 0, easy/medium/hard 10/20/30 และ fallback 15; log เก็บ category/difficulty/correct |
| Setback save ผิดแล้วใช้การ์ดที่เลือกไว้ | คืน explanation → ordinary punishment selector; การ์ด setback ที่เลือกไว้ไม่ได้ถูก apply ในต้นฉบับ จึงคงพฤติกรรมนี้ |
| เพิ่มผล self-skip ให้ setback card ที่ action เป็น prank_skip_turn | คืน default ของ `applyEffectCard` เดิม: เปลี่ยนตา โดยไม่เพิ่ม self-skip |
| การเดินและ resolve square เร็วกว่าต้นฉบับ / canonical position เปลี่ยนก่อน animation | รักษา bounds 0–49, onBoardPosition, shield consume เมื่อถอย, step 350ms, commit เมื่อเดินครบ, arrival 500ms และ square announcement 2100ms |
| Bonus movement resolve ช่องพิเศษหรือจุดเดิมต่างไป | เฉพาะการเดินไป normal/puzzle/finish เปิดคำถาม; ช่องอื่นหรือไม่เปลี่ยนตำแหน่งจบตาตามเดิม |
| go_to_start ใช้ movement flow | คืน teleport ไป 0 หรือ consume shield แล้วเปลี่ยนตา ตาม effect เดิม |
| Round/skip/reset prank flag นับ wrap ต่างจาก `switchTurn` | ใช้ final next index เดิม, extra > 0 ลดหนึ่งและเล่นซ้ำ, extra < 0 ข้ามจนพบคนเล่นได้, reset flag เฉพาะคนที่จะเล่น; กรณีข้ามครบรอบคง legacy result |
| Event retreat/swap/extra และข้อความต่างไป | คืนทั้งสาม event รวม shield bypass ของ event retreat, +15 ทุกคน, leader/last rule และกรณีมีน้อยกว่า 3 คน |
| Prank eligibility, timing และ score cost ต่างไป | คืนข้อจำกัดรอบแรก, validTargets, mark/debit ทันที, effect หลัง 1500ms และ reset ตามตาเดิม |
| Feedback/continuation/timer บางส่วนถูกย่อ | คืน popup, sound key, explanation, effect delay, 2600ms special selection, 3100ms save, 1000ms offer prank, 2500ms bonus turn และ 4100ms event |
| Bonus ตอบผิดยกเลิก callback เดิมเมื่อเปลี่ยนตา | คง timer 2500ms ของต้นฉบับ รวมการอ่านเฉลยหลังเปลี่ยนตาและการลงโทษที่กำลังเดินอยู่; มี oracle tests ทั้ง ACK ช้าและเร็ว |
| Final/pool-empty continuation ต่างไป | คืน direct hard question, ถูก +50 และชัยชนะเดิม, hard pool หมดชนะหลัง delay โดยไม่บวก 50, ผิดอ่านเฉลยแล้ว ordinary punishment |

### 2. UI regression ที่พบและแก้

- CSS Online ทับ global/modal/board/control selectors และเปลี่ยนขนาด/spacing/font: คืน `styles.css` ทั้งไฟล์ แล้วแยกส่วนเพิ่มเป็น `online.css`
- เปลี่ยนการจัดหมากเป็นกริดใหม่เพื่อรองรับ 10 คน: คืนหมากขนาด 24px และการจัดวางเดิม รวมสี/animation ของช่องทั้ง 50 ช่อง
- ผู้เล่นออนไลน์มี highlight/status ใน normal flow ทำให้ panel สูงขึ้นและดัน message: คืน panel เดิม ใช้ badge เล็กแบบ absolute ที่ไม่เปลี่ยน geometry
- ข้อความเกมถูกแทนด้วยสถานะ sync: คืน turn/dice/message เดิม ย้าย connection/room/waiting เป็นกล่อง Online แยก
- Question/card/prank/explanation มี markup, ปุ่ม, icon, title และเนื้อหาแบบย่อ: เรียก presentation functions และ DOM เดิมโดยส่ง callback ของ Online
- Dice animation/sounds/countdown feedback ขาดหาย: คืน spin 2000ms + result 1500ms, face orientation, background music, sound keys และ timer pulse/heartbeat
- Presence หรือ pending snapshot render ทำให้การเดินเริ่มใหม่/หยุด: เก็บ rendered roster และ animation action ID; ไม่สร้าง panel/หมากใหม่ทุก notification
- เลือก target แล้ว Prank Effect modal ไม่ปรากฏ: เปิด modal เดิมอีกครั้งใน adapter

### 3. สิ่งที่ restore และสิ่งที่คงไว้

Board DOM เดิม, 50 ช่อง 5×10 snake, header, player panel, dice panel, message, modal ทุกชนิด, victory/fireworks/report และข้อความเดิมกลับมาใช้ร่วมกันทั้งสองโหมด เมนูเดิมสี่ปุ่มยังคงชื่อ/style/ลำดับสัมพันธ์เดิม เพิ่มปุ่มเล่นออนไลน์ `index.html` และ HTML ชื่อไทยตรงกัน

คง Firebase Auth, RTDB, room/lobby/QR, host authority, immutable requests, revision, receipts, reconnect, presence และ Rules เดิม ไม่เปิด public `.read/.write` ไม่มีการแก้ `questions.js`, ภาพหรือไฟล์เสียง

### 4. ความต่าง Online ที่จำเป็นและเหตุผล

- Host ใช้ shared original rules เพื่อ resolve action แล้ว commit transaction; ผู้เล่นส่ง intent เพราะหลายเครื่องต้องมี canonical state เดียวกัน
- มี phase/interaction ID/deadline/replay ledger แทน local closure เพื่อ resume หลัง refresh และป้องกัน action ซ้ำ; ไม่ส่ง function เข้า Firebase
- Host สุ่มด้วย random stream ที่คงเดิมเมื่อ transaction retry; pool, eligible cards/events และวิธีเลือกเดิม
- ผู้เป็นเจ้าของ interaction เท่านั้นกดได้ คนอื่นเห็น waiting; บทลงโทษ/Setback เลือกโดยผู้เล่นถัดไป เพื่อกำหนดผู้มีสิทธิ์กดในหลายเครื่อง
- Clock ใช้ server offset และ Host resolve timeout; presentation/animation ใช้ delay เดิม แต่ network latency และเวลา Host กลับออนไลน์เพิ่มเวลาที่ผู้เล่นรับผลได้
- เพิ่ม room/connection/waiting, คุณ/Host/online dot และ Host controls แบบ additive; mobile Online เลื่อน board ใน container ได้
- Escape ชื่อผู้เล่นใน panel/report/victory เพื่อให้ชื่อจากเครือข่ายเป็นข้อความ; card selection เพิ่ม keyboard role/tabindex โดยคงรูปเดิม

### 5. CSS selectors และ HTML

`styles.css` ตรง Golden Master ทั้งไฟล์ ไม่เหลือ Online override ในไฟล์นี้ `online.css` ใช้ `.online-screen ...`, `.online-menu-button`, `.online-room-code`, `.online-code-input`, `#onlineQr`, `.online-players`, `.online-player-row`, `.online-buttons`, `.online-choice`, `.online-player-info`, `.online-player-status`, `.online-board-controls`, `.online-host-controls`, `.online-error` และ scoped disabled/focus/hidden selectors

`.online-player-info` เพิ่มเฉพาะ `position:relative`; badge เป็น absolute ส่วน connection/Host controls เป็น fixed จึงไม่ดัน board/header/message ข้อยกเว้น responsive อยู่เฉพาะ `max-width:600px`: `.online-mode #gameBoardOuterContainer` และ `.online-mode .board-container` เพื่อ scroll/padding บนมือถือ ไม่มี desktop override ของ body, modal, board-square, player-piece หรือ main-action-button

HTML เพิ่ม Online entry/lobby/menu/control elements และ script/style loading ที่จำเป็น ไม่สร้าง board หรือ modal ชุดใหม่ ตรวจ duplicate IDs และ matching entrypoints ผ่าน

### 6. Game functions ที่ refactor

`scripts.js`: `getCurrentDifficulty`, `movePlayer`, `displayCardSelection`, `onCardSelected`, `applyEffectCard`, `handleQuestionAnswer`, `offerPrankChoice`, `selectPrankEffect`, `applyPrankToTarget`, `initiatePunishment`, `initiateSetbackSelectionByOpponents`, `askSetbackSaveQuestion`, `askFinalQuestion`, `handleSquareAction`, `showQuestionModal`, `showExplanationModal`, `switchTurn` และ event callbacks ใช้ original mutations/shared metadata หรือรับ optional presentation callback; Local ยังคง side effects และ callbacks เดิม

`game-rules.js`: `difficulty`, `selectCards`, `randomCard`, `answerMatches`, `consumeQuestion`, `challengePool`, `squareAction`, `planMovement`, `commitMovement`, `advanceTurn`, `resolveEvent`, `validTargets`, `canOfferPrank`, `beginPrank`, `finishPrank`, `applyPrank`, `applyAnswer`, `effectPlan`

`online-state.js` เหลือ synchronization phases/serialization รอบกติกาที่ใช้ร่วมกัน; `game-online-adapter.js` เรียก original presentation, tracks animation/timer และ bind intents

Realtime fix ใน `online.js`: prime game transaction ด้วย read snapshot เพื่อไม่ reject จาก null initial cache; ล้าง mailbox ที่ process แล้วก่อนส่ง receipt; ไม่ปลด pending ก่อน mailbox clear; resolve host timers รวม bonus timer; transient disconnect กลับไป retry ได้; Host timer/drain callbacks ตรวจ generation และ room close/kick ก่อนรายงาน เพื่อไม่แสดง stale permission error หลังออกจากห้อง

### 7. Parity และ visual tests

- `tests/legacy-harness.cjs` รัน Golden scripts เดิมจริงใน VM ด้วย deterministic random/time; รัน refactored Local และ Host ด้วย state/action sequence เดียวกัน เปรียบเทียบ position/onBoardPosition/score/shield/extra/prank flag/log/current player/round
- `tests/parity.test.cjs`: **41 ผ่าน** ครอบคลุมทั้ง 17 กลุ่มที่ขอและ legacy edge cases: Normal, Puzzle, Power-up ถูก/ผิด, Bonus, Setback ถูก/ผิด, Shield/bounds, Event ทั้งสาม, Prank ถอย/skip/cost/first round, extra/skip/round, bonus landing 5 แบบ, final ถูก/ผิด/pool empty, pool reuse, original shuffle, effect cards และ overlapping timer
- Unit + static + parity รวม **69 ผ่าน**; syntax runtime JS และ JSON ผ่าน
- `tests/local-browser-parity.cjs`: **ผ่าน** คลิก Local สองคนใน Golden และปัจจุบันจริง Roll → Move → Mission → Answer → Prank backward → Next turn/round แล้ว deep-compare state
- `tests/visual-parity.cjs`: **ผ่าน** Golden/Local/Online ที่ 1366×768 เปรียบเทียบ x/y/width/height/font/padding/background ของ board/header/panels/dice/message/square/piece; question innerHTML/size ตรงกัน; card/explanation/prank/report modal และ Victory size/text ตรงกัน Badge ไม่เปลี่ยน geometry
- ภาพและ measurements อยู่ใน `test-results/parity-{golden,local,online}-{board,question,cards,explanation,prank,report,victory}.png` และ `visual-parity.json`; screenshot ใช้ fonts/finite animations loaded ก่อนวัด ไม่ใช้ pixel equality กับ fireworks/random animations

### 8. Multiplayer integration และ security tests

`tests/multiplayer-browser.cjs`: **ผ่าน** Chrome 3 contexts ใช้ Firebase Database browser SDK จริงต่อ RTDB Emulator ที่ localhost เท่านั้น แต่ละ UID ทอย/เลือก/ตอบเอง, last player Prank skip → round 2; ตรวจ canonical snapshots ของทั้งสาม client ตรงกัน รวมเร็วต่อเนื่องผ่าน mailbox/receipt

Feature flows ผ่าน: Power-up ถูก → shield; Power-up ผิด → explanation/opponent punishment/bonus question; Bonus → square 35; Setback ผิด → ordinary punishment เดิม; Shield consumed; Group Events ทั้งสาม; extra turn; final → victory/report ทุก client จากนั้น pause, refresh/reconnect Host+guest, Host offline/online, skip, kick, Host สองแท็บ dedup, close และกลับ single-player ไม่มี console/page error ที่ค้าง

Feature fixtures เขียนด้วย emulator admin เฉพาะ `127.0.0.1`/`demo-integer-mountain` เพื่อเข้าถึง rare squares อย่างทำซ้ำได้ การตอบ/เลือก/resolve/sync ใช้ UI และ SDK จริง ไม่มี admin write ไป production

`tests/rules.test.cjs`: **8 ผ่าน** รวม create-room schema, impersonation deny, root/nonmember deny, collision, slot ownership/duplicates/10 limit, host canonical authority, own immutable mailbox/presence, kick/close โดย Rules ไม่มีการเปลี่ยนในรอบนี้

`tests/browser-smoke.cjs`: **ผ่าน** Local/Single/Learning Hub/Settings, active/observer, explanation/punishment, victory/report, XSS และ viewport 375×667, 390×844, 768×1024, 1366×768

### 9. ความต่างและข้อจำกัดที่ยังมี

ไม่พบ gameplay state mismatch ใน parity scenarios ที่รัน ชุดทดสอบไม่ได้พิสูจน์ทุก possible interleaving โดยเฉพาะผู้เล่น Local กดทอยอีกตาขณะ callback เก่ายังอยู่; Online serialize action ตาม phase และสิทธิ์ผู้มี interaction เพื่อให้ทุกเครื่องตรงกัน เกมยังคงผลของ original overlapping bonus/punishment callbacks ที่ทดสอบ ไม่เปลี่ยน legacy quirks ของต้นฉบับ

Online ยังมีความต่างด้านสิทธิ์กด/waiting, network latency, reconnect/pause และ host controls ตามข้อ 4 ไม่มี host migration ระบบเสียงเรียก asset/key เดิมและ animation timing เดิม แต่การทดสอบ headless ไม่แทนการฟังเสียงจริงหรือเล่นบนโทรศัพท์/หลายเครือข่าย

ไม่ได้ทดสอบ production ใหม่ในรอบนี้ ยังไม่มี Firebase CLI/login สำหรับ deploy ตามผลตรวจรอบก่อน ดู `FIREBASE_SETUP.md` สำหรับ Rules ที่ต้อง publish ไป `integer-mountain-game-default-rtdb` ไม่มีการ deploy Hosting เปลี่ยน billing หรือลบข้อมูล production


