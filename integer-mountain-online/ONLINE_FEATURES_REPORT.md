# Additive Online features — 4 ตุลาคม 2026

ฟีเจอร์เพิ่มเติมล่าสุด: **Online Host เลือกขนาด20/30/40/50** (default30; 20เกมสั้น/30ปานกลาง/40ยาว/50เต็มรูปแบบ) Single/Local และ legacy rooms ยัง50 Schemaเพิ่ม settings.boardSize และ game.questionSettings.boardSize ตาม [MAP_SIZE_REPORT.md](MAP_SIZE_REPORT.md) ต้อง Publish/Deploy Rules ใหม่; รายละเอียดด้านล่างบันทึก baseline ก่อนเพิ่มขนาดแผนที่

เพิ่ม Room Question Settings, Question Observer และ Spectator ลง source แล้ว ไม่เปลี่ยน `game-rules.js`, `scripts.js`, `styles.css`, `questions.js` หรือ assets ของเกมเดิม ไม่มีการ deploy production อัตโนมัติ

## Room settings schema

```json
{
  "rooms": {
    "527314": {
      "settings": {
        "questionCategories": ["addition", "subtraction"],
        "difficultyLevel": "medium"
      },
      "slots": { "s0": { "uid": "host", "name": "ครู", "emoji": "🚀", "joinedAt": 0 } },
      "spectators": { "t0": { "uid": "viewer", "name": "ต้น", "emoji": "🌟", "joinedAt": 0 } }
    }
  }
}
```

ตัวเลขเวลาในตัวอย่างเป็น placeholder; production writes ใช้ server timestamp ข้อมูล presence ยังคงอยู่ที่ `presence/{uid}/sessions/{sessionId}` เหมือนเดิม

ก่อนสร้างห้องมี checkbox 6 ประเภท (การบวก/ลบ/คูณ/หาร/ลำดับการดำเนินการ/โจทย์ปัญหา), เลือกทั้งหมด/ล้างการเลือก และระดับความยากสูงสุด Default เลือกทุกประเภทและ `medium` ถ้าไม่มี category แสดง “กรุณาเลือกประเภทโจทย์อย่างน้อย 1 ประเภท” และไม่จองรหัสห้อง

ตั้งค่าถูกเก็บใน `rooms/{code}/settings` เมื่อสร้างห้อง ผู้เล่น/ผู้ชมอ่านได้ คนนอกห้องอ่านไม่ได้ Host เท่านั้นเขียนก่อนเริ่มได้ UI รุ่นนี้ตั้งค่าก่อน Create; ไม่มี editor เปลี่ยน settings ใน Lobby หลังเริ่มเกม Rules ล็อก settings รวม deletion และตรวจ snapshot `game/questionSettings` ให้ตรงกับ room settings การเปลี่ยน status กลับ waiting ไม่ปลด lock เพราะ canonical game มีอยู่แล้ว

Lobby แสดง categories ภาษาไทยและความหมายของระดับให้ทุกคนเหมือนกัน ไม่ใช้ settings ของผู้ Join มาแทนค่าของ Host ห้องเก่าที่ไม่มี settings ยังคงใช้ original full bank/selection behavior

## Category/difficulty filter และ fallback

`online-room.js` สร้าง filtered catalog จาก master question IDs เดิม ไม่แก้คำถาม/คำตอบ/เฉลย ใช้ `category อยู่ในรายการ AND difficulty ไม่เกินระดับห้อง`

| ระดับห้อง | difficulty ที่อนุญาต |
|---|---|
| easy | easy |
| medium | easy, medium |
| hard | easy, medium, hard |

Host synchronization adapter ใช้ filtered pool กับ original selection/mutations: Normal/Puzzle ขอ difficulty ตามตำแหน่งเดิม, Power-up/Bonus/Setback save ขอ medium+hard เดิม, Final ขอ hard เดิม วิธีสุ่ม, score branch, timer, consumption, movement, turn และ legacy quirks ยังใช้ original rules

หาก pool ที่ action ขอว่าง ให้เลือกตามลำดับ deterministic:

1. ใช้ requested pool เดิมที่ยังไม่ consume ถ้ามี
2. ใช้ difficulty ที่ระยะใกล้กับ requested มากที่สุดใน deck เดิม; tie เลือก difficulty สูงกว่าที่อยู่ภายใน cap
3. หาก deck เดิมไม่มี allowed question ที่ยังใช้ได้ จึงลองอีก original question deck ตามลำดับ difficulty เดียวกัน
4. หาก allowed bank ถูก consume หมดทั้งสอง deck ใช้ nearest allowed pool ซ้ำ เพื่อให้ห้องดำเนินต่อได้

ทุกขั้นอยู่ภายใน categories/cap เดิม ไม่เพิ่ม difficulty ของคำถามหรือแก้ educational content ตัวอย่าง Easy Power-up/Final ใช้คำถาม easy แต่คงผลคะแนนของ action เดิม (special ถูก 5, final ถูก 50) ห้อง all categories + hard มี selection/ผลเดิมก่อนเกิด fallback ไม่มีการเพิ่ม engine ใหม่

## Spectator schema และ admission

Player ใช้ `slots/s0–s9` เดิม Spectator ใช้ `spectators/t0–t19` แยกกัน โดย **สูงสุด 10 players + 20 spectators ต่อห้อง** UID ซ้ำใน role เดิม reconnect โดยไม่เพิ่ม slot และ Rules ปฏิเสธ UID ที่อยู่ทั้งสอง role

Spectator ใช้ Anonymous Auth, ชื่อ/Emoji/presence เดิม; อยู่ได้ใน waiting/playing/finished เมื่อห้องยังไม่ closed และไม่ถูก kick การ refresh คืน role เดิมด้วย UID + membership และ `lastRoomRole` ผู้เล่นใหม่หลังเริ่มยังเข้าแข่งขันไม่ได้

`startGame` ใช้เฉพาะ player slots สร้าง `game.players/turnOrder` ไม่ส่ง spectator เข้า original engine เลย ผู้ชมไม่มีหมาก/position/score/extra/skip/prank target/event participant/winner/performance log จึงไม่อยู่ใน competitor report Host นำผู้ชมออกได้ โดยไม่แก้ canonical game ของผู้เล่น

Slot limit นับ profile ที่ยังอยู่ในห้อง รวม offline profiles เพื่อให้ reconnect ได้ ไม่ใช่จำนวน tab/connections Host นำ profile ที่ไม่ต้องการออกได้ ไม่มี automatic cleanup/host migration และ 20 เป็น application limit ไม่ใช่การรับรองจำนวนห้องพร้อมกันตาม quota ของ Firebase

## Question observer และ selected answer

ทุก Player/Spectator ใช้ `showQuestionModal` และ DOM/style เดิม เมื่อไม่ใช่ผู้ตอบแสดง “กำลังชมการตอบของ …” ปิด input, choices, submit, close และ callbacks ห้ามส่ง intent ฝั่ง Host ตรวจ actor/member/phase/interaction/revision อีกครั้ง Rules ปฏิเสธ spectator requests และ non-current `SUBMIT_ANSWER` ด้วย

Choice ของ Golden Master submit ทันทีเมื่อคลิก จึงคงหนึ่งคลิกไว้ ไม่เพิ่ม confirmation หรือ selection action พิเศษ Host commit คำตอบที่เลือกและผลตรวจใน transaction/revision เดียวกัน:

```json
{
  "answerObservation": {
    "id": "request-id:revision",
    "questionId": "puzzle_easy_0001",
    "purpose": "normal",
    "selectedBy": "host",
    "selectedAnswer": "-8",
    "selectionRevision": 9,
    "correct": true,
    "timedOut": false,
    "submittedAt": 0
  }
}
```

Observer เห็น selected choice highlight ใน modal เดิมและผลถูก/ผิดตาม canonical state คำตอบ text ส่งเมื่อ submit เท่านั้น ไม่มี keypress listener เขียน Firebase ผู้ชมเห็น “ชื่อ ตอบ: …” และผลใน Online status; detailed explanation เปิดเฉพาะผู้ตอบตาม flow เดิม ไม่มีการแสดง correct answer ล่วงหน้าใน UI

ผู้ชมดู card/target/prank/setback/punishment presentation เดิมแบบ disabled ได้ รวม dice, event popup, scores, victory และ report เฉพาะผู้เล่น Controls Online เป็น fixed elements แยกจาก board stacking context เพื่อให้ Host controls ยังใช้ได้เหนือ observer modal โดยไม่ดัน layout

## Security Rules changes และสิ่งที่ต้อง Publish

ต้อง Publish/Deploy **`database.rules.json` ปัจจุบันทั้งไฟล์** ไป project **`integer-mountain-game`**, instance **`integer-mountain-game-default-rtdb`** ก่อนใช้ production รูปแบบ schema รุ่นก่อนจะปฏิเสธ settings/spectator writes

SHA-256 ของ Rules ชุดใหม่: `a8adf1e9b5225b4c361b1a984d24982adb32fc3151f536ede2066a1a4fa43f58`

เพิ่ม enum/nonempty/unique/contiguous category validation, cap enum, host-only settings/immutable lock และ game settings snapshot; fixed spectator slots/UID uniqueness/exclusive roles/own profile invariants; room viewer read (players หรือ spectators ที่ไม่ถูก kick) สำหรับ game/settings/presence; spectator presence เฉพาะ UID ตัวเอง; player-only requests และ active-answer validation คง root `.read/.write = false` และ Host canonical authority

งานนี้ไม่ deploy ไม่เปลี่ยน billing ไม่ deploy Hosting และไม่แตะข้อมูล production ผู้ดูแล Publish ใน Firebase Console หรือใช้ CLI ที่ authenticated แล้ว:

```sh
npx firebase deploy --only database --project integer-mountain-game
```

ตรวจ instance ก่อนรันตาม `FIREBASE_SETUP.md` คำสั่งนี้เฉพาะ Database Rules ห้ามใช้ emulator test suite กับ production

## ผลทดสอบ

| ชุด | ผล |
|---|---|
| Golden Master parity | 41 ผ่านทั้งหมด |
| Local browser parity | ผ่าน Local 2 คนเทียบ Golden: Roll → Move → Mission → Answer → Prank → Next turn/round หลังเพิ่ม features |
| New feature unit tests | 19 ผ่าน: filters ทั้ง 4 policy, invalid settings, Firebase arrays, action fallbacks, depletion/reuse/cross-deck, all-hard parity, spectator admission/engine exclusion/authority และ answer observation |
| Unit/static/parity/features รวม | 88 ผ่าน, 0 fail/skip |
| Rules Emulator | 11 ผ่าน รวม settings lock/deletion/status rollback, spectator 20 slots/roles/profile/presence, running-game join/read, forged answer/request deny และ original security cases |
| 4-browser feature integration | ผ่าน A=Host/Player, B/C=Players, D=Spectator; addition+subtraction สูงสุด medium; same question/disabled controls, choice highlight, submitted text/result, forged UI/SDK request rejection, D refresh, อย่างน้อย 2 turns |
| Midgame viewer | เพิ่ม anonymous identity อีก context หลังเริ่ม รับ current snapshot ไม่มี player slot/piece; event/final/report exclude viewers |
| Original 3-player SDK integration | ผ่าน Power-up/Bonus/Setback/Shield/Events/Prank/skip/extra/final และ reconnect/pause/kick/dedup/close หลังเพิ่ม features |
| Visual parity | ผ่าน Golden/Local/Online 1366×768 board/panels/font/spacing/modal/victory; original grid dimensions/50 squares/10 columns ที่ 390×844 และ 375×667 |
| Smoke/syntax | ผ่าน Local/Single/Learning Hub/Settings/Online observer/XSS/4 viewports และ runtime JS/JSON |

Tests ใช้ Chrome headless, real Firebase Database browser SDK ต่อ **localhost RTDB Emulator** และ mockUserToken เท่านั้น ไม่สร้าง production anonymous account การ seed event/final ทำเฉพาะ emulator เพื่อทดสอบ rare states; คำตอบ/selection/resolve/propagation ผ่าน UI/SDK จริง Tests ที่ใช้ namespace `demo-integer-mountain` ต้องรันทีละ suite ไม่รัน Rules และ browser integration พร้อมกัน

ไฟล์ tests: `tests/online-features.test.cjs`, `tests/features-browser.cjs` และ parity/security/browser suites เดิม คำสั่งใหม่ `npm run test:features`, `npm run test:features-browser`; screenshots/metrics ใน `test-results/settings-{375,390}.png`, `spectator-lobby-390.png`, `spectator-choice-result.png`, `features-integration.json`, `visual-parity.json` และ `parity-*-board-{375,390}.png`

## Known limitations

- Correct choice ไม่มีช่วง “เลือกแต่ยังไม่ submit” เพราะ Golden Master ส่งทันที Highlight ปรากฏพร้อมผลและอยู่ตามเวลาต่อของ flow เดิม; wrong answer อยู่จนผ่าน explanation/ขั้นต่อไป และข้อความ latest answer ยังคงใน Online status
- Fallback/reuse เป็นส่วนเพิ่มที่จำเป็นสำหรับ filtered rooms เมื่อ action pool ว่าง ห้องเก่าไม่เปลี่ยน behavior หมด pool เดิม
- UI ไม่เผย correct answer ก่อน submit แต่ static question bank มีคำตอบเดิมใน client อยู่แล้ว ไม่ใช่ระบบข้อสอบลับ Host ยังเป็น trusted authority ที่ดัดแปลง client ได้
- Headless/emulator ไม่แทน Anonymous Auth production, การฟังเสียง, QR scan ด้วยโทรศัพท์ และหลายเครือข่าย ต้องตรวจหลังผู้ดูแล Publish Rules ใหม่
- Network latency, Host offline, phase serialization, host migration ที่ไม่มี และข้อจำกัดเดิมยังคงอยู่ ไม่เปลี่ยน original gameplay เพื่อแก้ข้อจำกัดเหล่านี้
