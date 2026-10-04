# ผลตรวจสอบล่าสุด — Online map sizes

รอบล่าสุดเพิ่ม map20/30/40/50 และแก้ renderer ใน scripts.js; game-rules.js/styles.css/questions.js ยังเดิม Unit/static/parity/features/boards106 PASS, Rules16 PASS, Golden visual/Local parity/Single smoke PASS, map SDK matrix ทุกsize/viewport/refresh PASS และ existing features/multiplayer browser suites PASS อ่าน matrix และ Rules ที่ต้อง Publish ใน [MAP_SIZE_REPORT.md](MAP_SIZE_REPORT.md) บันทึกด้านล่างเป็นผลรอบ Question Settings/Spectator ก่อนเพิ่ม maps

วันที่ 4 ตุลาคม 2026 แก้ gameplay/UI parity กับต้นฉบับ V11.23 ที่พบใน parent folder แล้ว รายงาน 9 ข้อพร้อม inventory, shared functions, CSS selectors, realtime fix และข้อจำกัดอยู่ใน [REGRESSION_REPORT.md](REGRESSION_REPORT.md)

เพิ่ม Room Question Settings, Question Observer และ Spectator ต่อจาก baseline ดังกล่าวแล้ว รายงาน schema/filter/fallback/Rules/answer synchronization/ข้อจำกัดอยู่ใน [ONLINE_FEATURES_REPORT.md](ONLINE_FEATURES_REPORT.md) รอบนี้ไม่เปลี่ยน `game-rules.js`, `scripts.js`, `styles.css` หรือ `questions.js`

ไม่มี Git repository/remote ในโฟลเดอร์นี้ จึงใช้ original copied files และ SHA-256 เป็นหลักฐาน ไม่ได้ deploy Firebase Rules/Hosting เปลี่ยน billing หรือลบ/เขียนข้อมูล production ในรอบนี้

## การตรวจที่รันจริง

| รายการ | ผล |
|---|---|
| Runtime JS syntax + JSON config | ผ่าน |
| Golden Master parity | 41 ผ่าน: รัน untouched Golden, refactored Local และ Online Host ด้วย state/actions เดียวกัน |
| Unit/static รวม parity/features | 88 ผ่าน, 0 fail/skip; feature tests ใหม่ 19 กรณี |
| Local สองคนใน browser เทียบ Golden | ผ่าน Roll → Move → Mission → Answer → Prank backward → Next turn/round |
| Visual parity 1366×768 | ผ่าน Golden/Local/Online board/header/panels/dice/message/square/pawn geometry/font/spacing และ question/card/explanation/prank/report modal และ Victory sizes/text; question innerHTML ตรงกัน |
| Chrome smoke | ผ่าน Local/Single/Learning Hub/Settings, adapter active/observer, explanation/punishment, victory/report, XSS และ 4 viewport ไม่มี page error |
| RTDB Rules Emulator | 11 ผ่าน รวม schema/UID ของ create room, settings freeze/enum/deletion/status rollback, spectator 20 fixed slots/exclusive roles/profile/presence, question privacy/active answer และ original security cases |
| Feature SDK integration: 4 primary contexts + midgame viewer | ผ่าน 3 players + spectator, addition/subtraction maximum medium, same question/disabled observers, choice highlight ทั้งถูก/ผิด, text answer ไม่มี typing writes, forged UI/SDK answers denied, refresh, 2 turns, late join, event/final/report exclusion |
| Firebase Database browser SDK จริง → RTDB Emulator, 3 contexts | ผ่าน player actions ของทั้งสาม UID และ Prank/next round; Power-up ถูก/ผิด, Bonus, Setback, Shield, Event 3 ชนิด, extra turn, final/victory/report; canonical snapshots ตรงทุก client |
| Reliability integration | ผ่าน lobby/QR/deep link/mobile, pause, Host+player refresh/reconnect, offline/online presence, skip, kick, Host สองแท็บ dedup, close, กลับ Single; ไม่มี console/page error ที่ค้าง |

Runtime ใช้ Node/Playwright ที่มีใน environment, Chrome, RTDB Emulator 4.11.2 และ portable Java 21 ที่ `127.0.0.1:9001` namespace `demo-integer-mountain` Auth เป็น test identity ผ่าน mockUserToken ไม่มี production anonymous user/write จากชุดนี้

## คำสั่งรันซ้ำ

```sh
node tools/check-syntax.cjs
node --test tests/state.test.cjs tests/static.test.cjs tests/parity.test.cjs tests/online-features.test.cjs
node tests/local-browser-parity.cjs
node tests/visual-parity.cjs
node tests/browser-smoke.cjs
node --test tests/rules.test.cjs
node tests/multiplayer-browser.cjs
node tests/features-browser.cjs
```

ตั้ง `NODE_PATH` เป็น bundled Playwright, `BROWSER_EXECUTABLE` เป็น Chrome และ `FIREBASE_DATABASE_EMULATOR_HOST=127.0.0.1:9001` ใน environment นี้ บนเครื่องทั่วไปใช้ `npm install` และ emulator port 9000 ตามคู่มือ Rules/integration tests guard localhost เท่านั้น; admin fixtures ล้างเฉพาะข้อมูล emulator

Rules และ browser SDK integration ใช้ namespace เดียวกัน ต้องรันทีละ suite ไม่รันพร้อมกัน Visual เพิ่ม grid comparison ที่ 390×844 และ 375×667; หลักฐาน features ใน `test-results/features-integration.json`, `spectator-choice-result.png`, `spectator-lobby-390.png`, `settings-{375,390}.png`

หลักฐานภาพและ metrics: `test-results/parity-{golden,local,online}-{board,question,cards,explanation,prank,report,victory}.png`, `visual-parity.json`, `local-browser-parity.json` (gitignored) สำเนา source Golden ใน `tests/golden/` ไม่แก้ไฟล์ oracle

## Realtime fixes

Host game transaction prime ด้วย read snapshot แก้ null initial cache ที่ทำให้ reject action; หลัง commit ล้าง mailbox ก่อนส่ง receipt เพื่อให้กดต่อทันทีไม่ค้าง; pending รอ acknowledgment ที่ถูกต้อง; Prank effect เปิด modal เดิมหลังเลือก target; movement animation ไม่ถูก presence/pending render ยกเลิก; timer ของ bonus ผิดคง callbacks เดิมแม้เปลี่ยนตา; Host timer/drain ตรวจ generation/close/kick เพื่อไม่รายงาน permission error ของ callback เก่าหลังออกจากห้อง แต่ยังรายงาน denied operation ในห้องที่ใช้งาน

Local/Online ใช้ mutation เดียวกันใน `game-rules.js` และใช้ presentation ใน `scripts.js` `styles.css` ตรง Golden ทั้งไฟล์ `online.css` เพิ่มเฉพาะ Online status/forms/controls และ responsive scope บนมือถือ `questions.js` และ assets เดิมไม่เปลี่ยน

## Production และข้อจำกัด

**ต้อง Publish/Deploy `database.rules.json` ชุดใหม่ทั้งไฟล์** ก่อนใช้ settings/spectators ใน production ไป project `integer-mountain-game` / instance `integer-mountain-game-default-rtdb` SHA-256 `a8adf1e9b5225b4c361b1a984d24982adb32fc3151f536ede2066a1a4fa43f58` ไม่มี automatic production deployment ในงานนี้

ผล read-only จากรอบก่อน: transaction ล้มที่ `directory/189768`, Anonymous UID/token/project/databaseURL ถูกต้อง แต่ production ปฏิเสธ path ที่ local Rules อนุญาต ไม่พบ create-room schema mismatch ใน emulator ยังไม่ได้อ่าน Rules production ด้วยสิทธิ์ผู้ดูแลหรือ deploy เพราะไม่มี Firebase CLI/login รายละเอียดไฟล์ Rules, project/instance และคำสั่ง deploy เฉพาะ Database Rules อยู่ใน [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

ยังต้องตรวจ Anonymous Auth จริงหลัง publish Rules, QR scan บนโทรศัพท์, เสียงจริง และหลายเครือข่าย Headless browser/emulator ไม่ทดแทนการตรวจเหล่านั้น Host ต้องออนไลน์ ไม่มี host migration; Online serialize actions ตาม phase จึงไม่ได้เปิดให้ผู้เล่นถัดไปทอยซ้อน callback เก่าแบบ Local ทุก possible interleaving ดูข้อ 9 ในรายงาน

