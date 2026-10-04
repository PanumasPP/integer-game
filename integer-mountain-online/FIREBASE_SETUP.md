# ตั้งค่าเกมพิชิตยอดเขาจำนวนเต็มออนไลน์

Responsive update5ตุลาคม2026เพิ่ม `mobile.css` และ `mobile-ui.js` ให้เผยแพร่พร้อมHTML/scripts.js/game-online-adapter.js ส่วนFirebase schema/Rules/configไม่เปลี่ยน รายละเอียดใน [MOBILE_RESPONSIVE_REPORT.md](MOBILE_RESPONSIVE_REPORT.md)

เว็บไซต์เป็น HTML + CSS + Vanilla JavaScript เปิดจาก GitHub Pages ได้โดยไม่ต้อง build หรือมี runtime server โหมดท้าทายและหลายคนเครื่องเดียวยังใช้เกมเดิม ระบบออนไลน์ใช้ Firebase Realtime Database และ Anonymous Authentication เท่านั้น ไม่มี Cloud Functions, Firestore, Analytics, Firebase Hosting หรือข้อบังคับ App Check

## โปรเจกต์ที่มีอยู่แล้ว

- Project ID: `integer-mountain-game`
- Anonymous Authentication: Enabled ตามข้อมูลที่ผู้ใช้ให้
- Realtime Database: Created ตามข้อมูลที่ผู้ใช้ให้
- URL: `https://integer-mountain-game-default-rtdb.asia-southeast1.firebasedatabase.app`
- Web config อยู่ใน `firebase-config.js` เป็นค่าที่เผยแพร่ใน browser ได้ ไม่ต้องมี `.env` หรือ server secret
- Firebase browser SDK pin ที่ `10.14.1` โหลดเมื่อเข้าโหมดออนไลน์ครั้งแรก; QRCode.js pin ที่ `1.0.0` หาก QR โหลดไม่ได้ยังใช้รหัสและลิงก์ได้

## เผยแพร่ Security Rules ก่อนเปิดให้เล่นออนไลน์

เปิด Firebase Console → โปรเจกต์นี้ → Realtime Database → Rules คัดลอก `database.rules.json` ทั้งไฟล์ แล้วกด Publish ห้ามตั้ง `.read` หรือ `.write` ที่ root เป็น `true`

หรือใช้ Firebase CLI แบบ optional (Node 20/22 และ Java 21 สำหรับ Emulator):

```sh
npm install
npx firebase login
npx firebase use integer-mountain-game
npx firebase deploy --only database --project integer-mountain-game
```

`firebase.json` ชี้ Rules และ `.firebaserc` เลือกโปรเจกต์นี้ ไม่มี hosting configuration คำสั่งนี้ deploy เฉพาะ Database Rules ไม่เปลี่ยน billing หรือ Auth provider และไม่ deploy Firebase Hosting ดู [Firebase CLI reference](https://firebase.google.com/docs/cli)

Rules ที่แนบมาเป็น schema ของระบบใหม่นี้ หากมีข้อมูลแอปอื่นใน RTDB เดียวกันให้ตรวจเส้นทางก่อนแทน Rules เพราะ root ปฏิเสธเส้นทางที่ไม่ระบุไว้

## ผลตรวจ production permission_denied วันที่ 4 ตุลาคม 2026

ตรวจ Console ของหน้า Online จริงพบ `transaction at /directory/189768 failed: permission_denied` ซึ่งเกิดที่การจองรหัส ก่อนสร้าง `rooms/{code}` แล้วตรวจแบบอ่านอย่างเดียวด้วย SDK เวอร์ชันเดียวกันและ Anonymous session เดิม: มี UID, `isAnonymous=true`, token audience เป็น `integer-mountain-game`, token subject ตรงกับ UID และ databaseURL ตรงกับ URL ข้างต้น แต่ `get(directory/189768)` ถูกปฏิเสธ ไม่มีการเขียนหรือลบข้อมูล production ในการตรวจครั้งนี้

ใน `database.rules.json` ที่ต้องเผยแพร่ `directory/$code/.read` เป็น `auth != null` และ `.write` อนุญาตจองรหัส 6 หลักที่ยังว่างเมื่อ `hostId === auth.uid` เท่านั้น จากนั้นการสร้าง `rooms/{code}` ต้องใช้ Host ที่จองรหัสนั้นและ `meta.hostId` ตรงกัน โค้ดปัจจุบันทำตามลำดับนี้ ไม่มี schema/path mismatch ที่พบในขั้นตอนสร้างห้อง Rules tests เพิ่มกรณี payload จริงพร้อม server timestamps, UID ปลอม, รหัสผิดรูปแบบ, การสร้างก่อนจอง, ผู้ใช้อื่นเขียนห้อง, field เกิน และการลบห้อง แล้วผ่านเดิม 8 กรณี; ชุดล่าสุดรวม settings/spectators ผ่าน 11 กรณี

ผล production แสดงว่าสิทธิ์ที่ใช้จริงไม่ตรงกับการอนุญาตอ่านใน Rules local แต่ยังยืนยันเนื้อหา/เวอร์ชัน Rules production ไม่ได้ เพราะเครื่องนี้ไม่มี Firebase CLI และไม่พบ CLI login หรือ deploy credential การล็อกอิน Anonymous ในเว็บไม่ให้สิทธิ์ deploy Rules ของผู้ดูแล จึงยังไม่ได้ deploy และยังไม่ได้ทดสอบสร้างห้อง production หลัง deploy

ต้องเผยแพร่ **`database.rules.json` ทั้งไฟล์** ไปที่ instance **`integer-mountain-game-default-rtdb`** ของ project **`integer-mountain-game`** เท่านั้น SHA-256 ของ Rules ชุดนี้คือ `a8adf1e9b5225b4c361b1a984d24982adb32fc3151f536ede2066a1a4fa43f58`

เมื่อมี CLI ที่ login ด้วยบัญชีผู้ดูแลแล้ว ให้ตรวจ project/instance และ deploy เฉพาะ Database Rules:

```sh
npx firebase login:list
npx firebase projects:list
npx firebase database:instances:list --project integer-mountain-game
npx firebase deploy --only database --project integer-mountain-game
```

หรือเปิด Firebase Console → project `integer-mountain-game` → Realtime Database → เลือก instance `integer-mountain-game-default-rtdb` → Rules → วางไฟล์ทั้งชุด → Publish ไม่ต้องใช้ Firebase Hosting หรือเปลี่ยน billing plan คำสั่ง deploy Rules ไม่ลบข้อมูล database

หลัง deploy ให้ refresh เว็บ กรอกชื่อ/Emoji และสร้างห้อง 1 ห้อง ต้องได้รหัสและ Lobby แล้วตรวจว่า `directory/{code}.hostId`, `rooms/{code}/meta.hostId`, `rooms/{code}/slots/s0.uid` ตรงกับ Anonymous UID ของ Host ทดสอบผู้เล่นอีก browser profile เข้าห้องได้ แต่แก้ Host/canonical game ไม่ได้ หลีกเลี่ยงการรัน tests ของ emulator กับ production; ห้องทดสอบจริงให้คงข้อมูลไว้ตามข้อกำหนดไม่ลบ production

ถ้ายังถูกปฏิเสธ ตรวจว่า log ล้มที่ transaction `directory/{code}` หรือ update `rooms/{code}` และอ่าน Rules ที่เผยแพร่จริงของ instance นี้เทียบไฟล์ก่อนแก้ schema หาก Rules ตรงกันจริง ให้ตรวจว่า RTDB ได้รับ Auth token ของ UID/project เดียวกัน และดู App Check enforcement ใน Console เพราะผล Auth ที่ถูกต้องอย่างเดียวไม่ยืนยันว่าทุกชั้นของ production อนุญาตคำขอ

## Authorized domains และ GitHub Pages

ใน Firebase Console → Authentication → Settings → Authorized domains ตรวจว่ามีโดเมน GitHub Pages ของคุณ เช่น `USERNAME.github.io` และเพิ่มหากจำเป็น สำหรับทดสอบเครื่องตัวเองตรวจ `localhost` และ `127.0.0.1` ตาม URL ที่ใช้

โฟลเดอร์ที่ได้รับมายังไม่มี `.git` หรือ remote จึงยังไม่ได้ push/deploy ให้สร้างหรือใช้ GitHub repository ของคุณ แล้วอัปโหลดไฟล์ runtime ที่ root ของ repository:

- `index.html` และไฟล์ HTML ชื่อเดิม (เนื้อหาเหมือนกัน)
- `questions.js`, `game-rules.js`, `scripts.js`, `styles.css`, `online.css`, `BG.png`, `sounds/`
- `firebase-config.js`, `online-room.js`, `online-state.js`, `game-online-adapter.js`, `online.js`

จาก GitHub → Settings → Pages → Deploy from a branch → เลือก branch และ `/ (root)` แล้ว Save หาก repository มี workflow ของ Pages อยู่แล้วใช้ workflow เดิม ไม่มี SPA route และทุก asset ใช้ relative path รองรับ `/REPO/` URL ต้องเป็น HTTPS เพื่อ clipboard และ API ของ browser

ตัวอย่างเมื่อมี Git repository/remote พร้อมแล้ว:

```sh
git add index.html "เกมพิชิตยอดเขาจำนวนเต็ม V11.23.html" scripts.js game-rules.js styles.css online.css firebase-config.js online-room.js online-state.js game-online-adapter.js online.js database.rules.json firebase.json .firebaserc FIREBASE_SETUP.md MULTIPLAYER_TEST_PLAN.md REGRESSION_REPORT.md ONLINE_FEATURES_REPORT.md VERIFICATION.md README.md package.json tools tests .gitignore
git commit -m "Add Firebase realtime multiplayer"
git push
```

เก็บ `questions.js`, `sounds/` และ `BG.png` เดิมไว้ใน repository ด้วย ไม่ต้องอัปโหลด `node_modules/`, `test-results/` หรือไฟล์ debug log

## วิธีเล่น

1. เปิด URL ของ GitHub Pages กด **🌐 เล่นออนไลน์** browser จะ sign in แบบ anonymous และเก็บ session ตาม Firebase persistence
2. Host กรอกชื่อ เลือก Emoji, category อย่างน้อย 1 ประเภท และระดับสูงสุด (default medium) แล้วกด **สร้างห้อง** Host เป็นผู้เล่นด้วยในรุ่นนี้
3. Lobby แสดงรหัสตัวเลข 6 หลัก, QR และ **คัดลอกลิงก์** ลิงก์ derive จาก pathname จริง จึงใช้ได้ทั้ง root และ GitHub Pages subpath
4. นักเรียนใช้ browser/โทรศัพท์อีกเครื่อง กรอกชื่อ Emoji และรหัส หรือสแกน QR เปิด `?room=527314` ซึ่งเติมรหัสให้เอง
5. รองรับสูงสุด 10 คน มีรายชื่อ 👑 Host และ Online/Offline แบบ realtime Host กดเริ่มเมื่อมีอย่างน้อย 2 คน
6. ทอยได้เฉพาะผู้เล่นปัจจุบัน คำถาม/การ์ดแสดงให้ผู้มีสิทธิ์ตอบหรือเลือก คนอื่นเห็นสถานะและ timer ผู้เล่นถัดไปเป็นตัวแทนฝ่ายตรงข้ามในการเลือกอุปสรรค/บทลงโทษ
7. Host มี Pause/Resume, Skip, Remove, End และ Close; เมื่อไม่มีผู้ชนะ End แสดงรายงาน ไม่สร้างผู้ชนะขึ้นเอง
8. ชนะด้วยคำถามสุดท้าย ทุกเครื่องแสดงผู้ชนะและรายงานจากสถิติเดียวกัน

## Schema และ authority

```text
directory/{code}                 hostId, createdAt (จองรหัสด้วย transaction)
rooms/{code}/meta                hostId, status, createdAt, closedAt
rooms/{code}/slots/s0..s9         uid, name, emoji, joinedAt (profile/admission)
rooms/{code}/spectators/t0..t19   uid, name, emoji, joinedAt (ผู้ชมแยกจาก engine)
rooms/{code}/settings            questionCategories, difficultyLevel (maximum)
rooms/{code}/presence/{uid}/sessions/{sessionId}
                                online, lastSeen
rooms/{code}/game                canonical state (Host เท่านั้น)
rooms/{code}/requests/{uid}      1 pending mailbox ต่อ UID
rooms/{code}/receipts/{uid}      ผลการรับ/ปฏิเสธคำขอล่าสุด
rooms/{code}/kicked/{uid}        at
```

Canonical game เก็บ `revision`, `phase`, `phaseStartedAt`, `deadlineAt`, `pausedFromPhase`, `turnOrder`, `currentPlayerId`, `currentRound`, `players`, `interaction`, `questionId`, `questionSettings`, `answerObservation`, `usedQuestionIds`, `diceEvent`, `lastMove`, `lastAction`, `processed`, `processedRequestIds`, `winnerId`, `status` ผู้เล่นมี position, score, shield, extra/skip turns, round prank flag และ compact performanceLog (`questionId`, `category`, `difficulty`, `correct`, `timestamp`) ไม่ส่งเนื้อหาคำถามหรือเฉลยจาก bank, function, เสียง หรือภาพขึ้น RTDB `answerObservation` เก็บเฉพาะคำตอบที่ผู้เล่นส่งเมื่อ submit และผลตรวจ ไม่มี per-keystroke writes

Player → เขียน request ของ UID ตัวเอง → Host ตรวจ actor/member/kicked/phase/interaction/revision/requestId → ใช้กติกาต้นฉบับร่วมกับ Local ใน `game-rules.js` → transaction commit game พร้อม revision และ processed ledger → Host ล้างเฉพาะ mailbox เดิมก่อนส่ง receipt → ทุก client render snapshot ผ่าน adapter ที่เรียก presentation เดิมใน `scripts.js` Observers ส่ง mutation ไม่ได้

การจองรหัส collision-safe ที่ `directory/{code}` การ join ใช้ transaction กับสิบ slots ที่ Rules กำหนดแน่นอน ป้องกันเขียน slot ที่ 11 และเปลี่ยน/ลบข้อมูลคนอื่น การเริ่มและนำคนออกใช้ room transaction เพื่อไม่แข่งกับการ join การคำนวณ state ใช้ game transaction; random stream คงเดิมระหว่าง transaction retry

Authenticated user อ่าน metadata ของรหัสห้องที่รู้และรายชื่อ lobby ตอน waiting ได้เพื่อเข้าห้อง การอ่าน canonical game และ presence จำกัดสมาชิกที่ไม่ถูก kick ไม่เปิดการอ่าน room list/root นักเรียนเขียนได้เฉพาะ admission/profile ของตนตอน waiting, presence ของตน และ mailbox ของตน Host เป็น security principal ที่ควบคุมเกม

## Reconnect, presence และ timer

- Anonymous UID เดิม + `lastRoomCode` จะพยายามกลับเข้าผู้เล่นเดิมเมื่อ refresh รวมถึง URL deep link ของห้องเดิม ไม่ใช้ localStorage เก็บ canonical game
- `.info/connected` และ `onDisconnect` ลงทะเบียนก่อน mark online แยก session ต่อ tab ป้องกัน tab หนึ่งปิดแล้วทำให้อีก tab ถูกมองว่า offline
- ขาดการเชื่อมต่อไม่ลบผู้เล่น Host นำ offline player ออกได้ Refresh คืน phase, interaction และสถิติจาก RTDB
- Host ต้องเปิด browser และออนไลน์ตลอดเกม ไม่มี automatic host migration เมื่อ Host offline ทุก action ถูกระงับและแสดง “รอ Host กลับมา” คำขอค้างจะตรวจ revision อีกครั้งหลังกลับมา
- Timer ใช้ server time offset + absolute deadline; Host เป็นคน resolve timeout เท่านั้น การ disconnect ไม่หยุด deadline เมื่อ Host กลับมา timeout ที่ค้างจะ resolve ครั้งเดียว
- Pause โดย Host เก็บ phase และเวลาคงเหลือ Resume เลื่อน deadline ตามเวลา pause รวมถึง dice/movement deadline
- สมาชิกที่ออกจากห้องคง profile ไว้และเป็น Offline เพื่อให้กลับเข้า UID เดิมได้ Host ใช้ Remove เพื่อคืน slot การปิดห้องทำ `status=closed` ทุกเครื่องออกหน้าห้อง ถ้าปิด browser กะทันหันห้องเก่าอาจค้าง เพราะไม่มี backend cleanup
- ไม่เก็บ animation frame ใน Firebase ปัญหา animation ไม่เปลี่ยนผลลัพธ์เกม

## ทดสอบและ debug

```sh
npm test
npm run check
npm run test:browser
npx firebase emulators:start --only database --project demo-integer-mountain
```

เปิด terminal อีกหน้าต่าง:

```sh
npm run test:rules
node tests/multiplayer-browser.cjs
```

ถ้าไม่มี Playwright browser ให้ `npx playwright install chromium` หรือกำหนด `BROWSER_EXECUTABLE` เป็น path ของ Chrome เดิม `tests/rules.test.cjs` และ `tests/multiplayer-browser.cjs` รับ `FIREBASE_DATABASE_EMULATOR_HOST` แต่จำกัด localhost เท่านั้น ใช้ namespace `demo-integer-mountain` และล้างข้อมูลเฉพาะ emulator นี้ ไม่แตะ production Tests integration ใช้ Firebase Database browser SDK จริงและ test auth identity ผ่าน mockUserToken; Anonymous Auth จริงยังต้อง manual smoke test

เปิด `npm run serve` แล้วใช้ `http://127.0.0.1:8080` สำหรับ local UI สอง browser ใช้คนละ browser profile หรือ Incognito เพื่อให้ได้ UID ต่างกัน browser เดียวกันสอง tab ปกติเป็นผู้เล่น UID เดียวกัน สำหรับอุปกรณ์อื่นทดสอบ GitHub Pages HTTPS ตาม `MULTIPLAYER_TEST_PLAN.md`

เมื่อเชื่อมต่อไม่ได้ตรวจ Console และ Network ของ browser: anonymous auth เปิดหรือไม่, API key restrictions, URL ของ RTDB, Rules ถูก publish หรือไม่, โดเมน, CDN, อินเทอร์เน็ต และข้อจำกัด storage ของ browser ไม่ต้องส่ง token/credential ให้ผู้อื่น ไม่มี Firebase CLI login ใน environment ที่ทำงานนี้ จึงยังไม่ได้ deploy Rules production

## ข้อจำกัดของรุ่นนี้

Host-authoritative บน static client ป้องกันการเขียนโดย client ปกติ คำขอซ้ำ และ state race; ไม่ใช่ระบบป้องกันโกงเต็มรูปแบบ Host ที่ดัดแปลง source สามารถแก้ผลลัพธ์ และนักเรียนเปิด DevTools อ่าน question bank ได้ ไม่เหมาะกับการสอบที่ต้องรักษาความลับคำตอบ

ไม่มี trusted server, host migration, Cloud Functions cleanup หรือผู้ควบคุมที่ไม่เล่น โครงสร้างแยก hostId และ turnOrder ไว้สำหรับเพิ่ม controller-only ภายหลัง Rooms/session records เก่าอาจค้าง ผู้ดูแลล้างได้ใน Console หลังเลิกใช้งาน อย่าลบห้องที่กำลังเล่น

Spark มีข้อจำกัด connection/storage/download ตาม [Realtime Database limits](https://firebase.google.com/docs/database/usage/limits) หลายห้องพร้อมกันหรือ session เก่าอาจใช้งบฟรีหมด ตรวจ Usage ใน Console ตัว client subscribe เฉพาะห้องปัจจุบันและ listener จำเป็น ไม่ subscribe root ไม่มี service ที่บังคับ Blaze

โหมดออนไลน์คงพฤติกรรมต้นฉบับ V11.23: Setback save ผิดเปิดเฉลยแล้ว ordinary punishment selector; การ์ด setback ที่เลือกไว้ไม่ได้ apply ตามเกมเดิม ไม่เปลี่ยนเนื้อหา `questions.js` และไม่แก้ legacy quirks เพื่อให้ง่ายต่อ Online ดู [รายงาน Golden Master parity](REGRESSION_REPORT.md) และรัน `npm run test:parity`, `npm run test:local-parity`, `npm run test:visual`


## Room settings / Spectators / Observer — Rules รุ่นใหม่

ฟีเจอร์ปัจจุบันต้อง Publish `database.rules.json` ชุดใหม่ทั้งไฟล์ก่อนทดสอบ production Rules เดิมไม่รองรับ `settings`/`spectators` ไม่ได้ deploy อัตโนมัติในงานนี้ ดู schema, fallback, Rules security และผล 4-browser tests ใน [ONLINE_FEATURES_REPORT.md](ONLINE_FEATURES_REPORT.md)

Room settings อยู่ที่ `rooms/{code}/settings` และ immutable หลังเริ่ม; snapshot อยู่ใน `game/questionSettings` Categories เลือกได้ 6 ประเภท ระดับ easy/medium/hard หมายถึงระดับสูงสุด (ง่าย; ง่าย+ปานกลาง; ทั้งหมด) Filter ไม่แก้ master question bank และใช้ fallback ภายใน cap สำหรับ action pool ที่ว่าง

Spectator เลือกตอน Join ใช้ `spectators/t0–t19` แยกจาก `slots/s0–s9` สูงสุด 20 ผู้ชม + 10 ผู้เล่นต่อห้อง รวม profile Offline; refresh ไม่เพิ่ม slot ผู้ชมเข้า playing/finished ได้ถ้าห้องไม่ closed ไม่มี role switching ใน UI ของ membership เดิม Spectator ดู question/cards/prank/result/victory/report ได้ แต่ไม่มีหมาก/turn/score และเขียนได้เฉพาะ profile/presence ของตน

game/settings/presence อ่านได้เฉพาะ players หรือ spectators ที่ไม่ถูก kick (และ Host); metadata/lobby admission profiles ของรหัสห้องที่รู้ยัง readable สำหรับ join ดังเดิม คนนอกอ่าน active question ไม่ได้ Requests ยังคง player-only และ SUBMIT_ANSWER ต้องเป็น current player ใน ANSWERING_QUESTION ตรง interaction actor; Host ตรวจอีกครั้ง

Choice ของต้นฉบับ submit ทันที จึง broadcast selectedAnswer + result ใน canonical `answerObservation` revision เดียว ไม่เพิ่ม confirmation Text answer ส่งเฉพาะ submit ไม่มี per-keystroke writes ผู้ชมใช้ modal เดิมแบบ disabled ไม่มี correct answer ที่แสดงก่อน submit

คำสั่งตรวจเพิ่มเติม:

```sh
npm run test:features
npm run test:features-browser
npm run test:visual
```

รัน Rules/SDK browser suites ทีละรายการ เพราะแต่ละชุด reset เฉพาะ namespace emulator เดียวกัน อย่าชี้ tests ไป production
## Map-size Rules update

เมื่อใช้ Online map20/30/40/50 ต้อง Publish/Deploy database.rules.json รุ่นใหม่ทั้งไฟล์ SHA-256 `3b16ff6787567fb0b5afeb1476581dbf9fa6ac70823b589d106f89c7e32581a6` ไป integer-mountain-game / integer-mountain-game-default-rtdb (asia-southeast1) เก็บ settings.boardSize และ canonical game.questionSettings.boardSize เป็น number; ไม่เก็บ board array อ่าน [รายงาน map sizes](MAP_SIZE_REPORT.md) Deploy เฉพาะ `firebase deploy --only database --project integer-mountain-game` ไม่ deploy Firebase Hosting งานนี้ไม่ได้ deploy production
