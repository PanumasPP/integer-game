# Online map sizes — 4 ตุลาคม 2026

เพิ่มขนาดแผนที่ Online 20/30/40/50 โดย default หน้าสร้างห้องเป็น 30 ช่อง Local/Single และห้องเก่าที่ไม่มี boardSize ใช้ 50 ช่อง ไม่มีการ deploy production, Firebase Hosting, เปลี่ยน billing หรือแก้/ลบข้อมูล production

## Architecture และ configs

`scripts.js` เก็บ original `boardConfig` โดยไม่แก้ข้อมูลใด ๆ และ `BOARD_CONFIGS[50]` อ้าง array เดิมโดยตรง 20/30/40 เป็นลำดับประเภทช่องที่ประกาศตายตัว แปลงประเภทเป็น metadata จากชนิดช่องเดิม ไม่ slice กระดาน ไม่สุ่ม layout และไม่เขียน config ทั้ง array ลง Firebase

`getBoardConfig(size)`, `getBoardSize()`, `getLastSquareIndex()`, `getActiveBoardConfig()` และ `getBoardEffects(size)` เป็น helpers จุดเดียว Local/Single ใช้ original 50 เสมอ Online renderer ใช้ `game.questionSettings.boardSize` ซึ่งเป็น snapshot ของ `room.settings.boardSize` และ Rules บังคับให้ตรงกัน Host action resolver เลือก config จาก canonical state ทุก action ไม่พึ่งค่า UI หรือ active board ของเครื่อง Host

| ขนาด | Start | Normal | Puzzle | Setback | Power-up | Event | Bonus | Finish | Grid |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 20 | 1 | 6 | 4 | 3 | 2 | 2 | 1 | 1 | 2×10 |
| 30 | 1 | 9 | 6 | 5 | 4 | 3 | 1 | 1 | 3×10 |
| 40 | 1 | 13 | 8 | 7 | 5 | 4 | 1 | 1 | 4×10 |
| 50 | 1 | 16 | 10 | 9 | 7 | 5 | 1 | 1 | 5×10 |

ลำดับใหม่ derive จาก Golden Master ratio กระจาย Event/Puzzle/Power-up/Setback และ Bonus อยู่กลางเกม ใช้ snake เดิม เริ่มล่างซ้าย index 0; แถวถัดไปขวา→ซ้าย Finish อยู่ size−1 เสมอ

## Files ที่เปลี่ยน

- `scripts.js`: configs/helpers, dynamic rows และ renderer bounds; original config/effect cards เดิมยังคงอยู่
- `online-room.js`: labels กลาง, strict numeric enum, default30 และ legacy fallback50
- `online.js`, `index.html`, `เกมพิชิตยอดเขาจำนวนเต็ม V11.23.html`, `online.css`: radio cards และ lobby label
- `online-state.js`: resolve config/effects จาก snapshot, movement helper รับขนาด และ reject context mismatch
- `game-online-adapter.js`: render canonical size, effect text ตามปลายทาง และ reset active size ใน cleanup
- `tools/generate-rules.cjs`, `database.rules.json`: board validation, lock, canonical bounds
- `tests/boards.test.cjs`, `tests/boards-browser.cjs`, `tests/rules.test.cjs`, `package.json`: coverage ใหม่
- Existing feature/multiplayer browser suites เลือก 50 ชัดเจนสำหรับ scenarios เดิม ไม่แก้ expected Golden Master
- README, setup/verification/test plan/features report และรายงานนี้

`game-rules.js`, `questions.js`, `styles.css` และ `tests/golden/*` ไม่เปลี่ยน Shared engine SHA-256 `0a21448c00a574b1847a3e421c9accfbe62f7e760460ae6fedd6bd608aad53d4`

## Firebase schema และ Rules

```json
{
  "settings": {
    "boardSize": 30,
    "questionCategories": ["addition", "subtraction"],
    "difficultyLevel": "medium"
  },
  "game": {
    "questionSettings": {
      "boardSize": 30,
      "questionCategories": ["addition", "subtraction"],
      "difficultyLevel": "medium"
    }
  }
}
```

ห้องใหม่ต้องมี boardSize เป็น number 20/30/40/50 เท่านั้น ไม่มี public read/write เพิ่ม Non-host เปลี่ยนไม่ได้ Settings เปลี่ยนหลังมี game ไม่ได้ แม้เปลี่ยน status กลับ waiting; field ที่มีอยู่แล้วลบไม่ได้ Canonical settings snapshot ต้องตรงกับ room ทุก field และ position ต้องเป็น integer 0…size−1 โดยอ่าน bounds จาก newData game snapshot ให้ initial transaction validate ถูกต้อง ห้องเก่าที่ไม่มี field ใช้ bounds50 ตามเดิม

Rules SHA-256: `3b16ff6787567fb0b5afeb1476581dbf9fa6ac70823b589d106f89c7e32581a6`

## Hard-coded values และ gameplay parity

พบ renderer fixed 5 rows/50 squares, bounds ของหมากที่ NUM_SQUARES, Online context ที่ส่ง original50 เสมอ, movement test helper สร้าง50 และ Rules position≤49 แก้เฉพาะจุด Online/dynamic rendering เหล่านี้ ไม่ blind replace ตัวเลข 50 ที่เป็นคะแนน Final หรือ 35 ที่เป็นโจทย์การศึกษา

การ์ด go_to_square ใช้ clamp: `min(34, size−1)` และข้อความปลายทางตรงกับค่าที่ resolve: 20→ช่อง20, 30→ช่อง30, 40/50→ช่อง35 Intent เดิมคือเดินไปปลายทางโดยตรง; board สั้นจึงสามารถพาไป Final ได้ ยังคงต้องตอบ Final ตาม flow เดิม และไม่เปลี่ยน behavior50

Movement ใช้ `OriginalGameRules.planMovement` เดิมซึ่ง clamp ด้วย board.length อยู่แล้ว ครอบคลุม dice/overshoot, forward/back, bonus, punishment และ shield Prank/event ใช้ resolver เดิม โดย odd/even ใช้ position+1, Event movement และ prank bypass shield เหมือนเดิม ไม่มีผู้ชมใน players/turnOrder/score/event/prank/winner/report Final ถูกยังได้ 50 คะแนน และ report คำนวณจาก performanceLog จริง

Question categories/cap/filter/fallback และ difficulty thresholds ของ engine เดิมไม่เปลี่ยน ขนาดแผนที่ไม่ได้ remap difficulty หรือเพิ่ม probability ใหม่

## Tests และ matrix

Unit/static/parity/features/boards: **106 PASS, 0 FAIL, 0 SKIP** โดย Golden Master parity 41 tests เดิมผ่านไม่แก้ expected Boards18 tests ตรวจ identity/metadata50, counts ทุกsize, snake, endpoints, shield, effects, punishment, prank, events, final และ question combinations

Firebase Emulator Rules: **16 PASS** รวม enum/type, new-room required field, legacy fallback, non-host writes, permanent lock, deletion/mismatched snapshot และ out-of-range/fractional positions; root public denial และ spectator/request security เดิมยังผ่าน

Golden/Local/Online visual parity: PASS ที่1366×768 ทั้ง board geometry/pawns/panels/fonts และ question/card/explanation/prank/report/victory Local browser parity และ Single/Local/Learning/Settings smoke: PASS

Existing `features-browser.cjs`: PASS 4 primary contexts + fifth midgame spectator, addition/subtraction capmedium, observer selected-choice highlight/submitted text/result, forged-answer denial, spectator refresh, two turns, event/Final/report และ mobile settings/lobby เลือก50ชัดเจนสำหรับ scenarios เดิม

Existing `multiplayer-browser.cjs`: PASS create/join/deep-link/QR, three-client dice/question/turn, pause/resume, Host/Player refresh, Host offline/online, skip/kick, duplicate Host tabs/requests, close และกลับ Single Player รวม original Power-up/Bonus/Setback/Shield, ทั้ง3 Events, extra turn, Final/victory/report

Browser matrix ผลล่าสุดอยู่ `test-results/boards-integration.json` และ screenshots `test-results/board-{size}-{width}.png` ใช้ Host/B/C/Spectator D จริง 4 browser identities กับ Firebase Database SDK + localhost Emulator ทุกขนาดตรวจ 2 full turns, answer observer/results, late spectator, refresh (20 Player/30 Spectator/40 Host/50 Player), overshoot→Final→winner และกลับ Local50 Canonical game/revision/turn/dice/positions เท่ากันทุก client

| รายการ | ผล |
|---|---|
| Board20 | PASS SDK/2 full turns/Final/Player refresh |
| Board30 | PASS SDK/2 full turns/Final/Spectator refresh |
| Board40 | PASS SDK/2 full turns/Final/Host refresh |
| Board50 | PASS SDK/2 full turns/Final/Player refresh |
| Golden Master50 | PASS |
| Question Settings | PASS unit/Rules/4 browser policy combinations |
| Spectator | PASS every size: no turn/piece/score; late join |
| Question Observer | PASS every size: same question, read-only observers, submitted answer/result |
| Realtime multiplayer | PASS every size: deep-equal canonical state/revision/turn/positions/dice |
| Reconnect | PASS20Player/30Spectator/40Host/50Player |
| Rules | PASS16 |
| Visual parity50 | PASS |
| Short-board visual375×667/390×844/768×1024/1366×768 | PASS all16 size/viewport combinations, original78px squares/10columns/actual rows; overflow no worse than Golden |

## ข้อจำกัด และการเผยแพร่

ใช้ schemaVersion1 เดิม ไม่เพิ่ม gameConfigVersion แยก จึงไม่ตรวจจับ client ที่ใช้ layout คนละ version โดยอัตโนมัติ Client รุ่นเก่าที่ cache scripts.js/online.js อาจ render50 หรือถูก Rules ปฏิเสธ ควรเผยแพร่ runtime files พร้อมกันและให้ผู้เล่น reload ก่อนเปิดห้องใหม่ ไม่รองรับ clients ต่าง board-config version ในห้องเดียว

Mobile reuse Golden Master horizontal overflow strategy; ไม่ได้ redesign/ย่อช่อง Side panels คง component เดิม ความสูง container auto ตาม content ที่สูงที่สุด ไม่มี grid rows เปล่าเพิ่ม Production ยังไม่ถูกทดสอบในรอบนี้; test identity เป็น mock Anonymous UID ผ่าน Emulator ไม่ใช่บัญชี production

ระหว่างทดสอบเคยพบ Player refresh50 timeout ภายใน20วินาทีหนึ่งครั้ง ยังไม่ได้ยืนยันสาเหตุ timeout นั้น การรันทวน50แยกและ matrix ทั้ง4ขนาดต่อเนื่องผ่านครบ พร้อม errors=[] ในผลสุดท้าย Browser integration ต้องโหลด Firebase SDK จาก CDN

**ต้อง Publish/Deploy `database.rules.json` ชุดใหม่ทั้งไฟล์** ไป project `integer-mountain-game`, instance `integer-mountain-game-default-rtdb` เพราะ boardSize เป็น field ใหม่ Deploy เฉพาะ Realtime Database Rules:

```powershell
firebase deploy --only database --project integer-mountain-game
```

`firebase.json` มีเฉพาะ database ไม่มี Hosting งานนี้ไม่ได้รันคำสั่ง deploy ผู้ใช้สามารถ Publish ผ่าน Realtime Database → Rules ใน Console ได้ Runtime HTML/JS/CSS ที่เปลี่ยนต้องเผยแพร่ผ่านช่องทาง static site เดิมแยกกัน โดยไม่ได้ deploy Firebase Hosting อัตโนมัติ
