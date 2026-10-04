# แผนทดสอบ Multiplayer

ใช้ GitHub Pages HTTPS หลัง publish `database.rules.json` แล้ว มีอย่างน้อย 2–3 อุปกรณ์หรือ browser profile คนละ UID โหมดปกติสอง tab ของ browser เดียวกันใช้ anonymous UID เดียวกัน

## ผล automated tests

- `npm test`: 69 ผ่าน รวม Golden Master parity 41 กรณีและ state/static 28 กรณี ดู `REGRESSION_REPORT.md`
- `node tests/local-browser-parity.cjs`: Local สองคน Roll → Move → Mission → Answer → Prank → Next turn ตรง Golden Master
- `node tests/visual-parity.cjs`: Golden/Local/Online ที่ 1366×768; board/panels/header/dice/message/font/spacing และ question/card/explanation/prank/report modals และ Victory ผ่าน
- `node tools/check-syntax.cjs`: JS และ JSON ผ่าน
- `node tests/browser-smoke.cjs`: Chrome headless ผ่าน local/single/Learning Hub/Settings, online adapter, active/observer, explanation/punishment, XSS และ viewport 375×667, 390×844, 768×1024, 1366×768 ไม่มี page error
- `node --test tests/rules.test.cjs`: RTDB Emulator 4.11.2 + portable Java 21 ผ่าน 8 ชุด รวม create-room schema, Rules compile, unauthenticated/nonmember deny, room reservation collision, slot ownership/duplicates, 10-slot limit, host state authority, immutable requests/revision/payload, presence ownership, kick/close
- ครั้งแรก Emulator บน IBM Java 8 ของเครื่องเกิด `com.sun.management.ThreadMXBean` และ tests timeout; rerun ด้วย Java 21 แล้วผ่าน ไม่ใช่ความล้มเหลวของ production code
- `node tests/multiplayer-browser.cjs`: ดูผลล่าสุดใน `VERIFICATION.md` ทดสอบ Firebase Database SDK จริงต่อ local RTDB emulator; Auth เป็น test identity ไม่มี production write

## Checklist บน 2–3 อุปกรณ์จริง

- [ ] Host เปิด Pages → ออนไลน์ → กรอกชื่อ Emoji → สร้างห้อง ได้รหัส 100000–999999
- [ ] QR แสดง/สแกนได้ Copy Link มี pathname `/REPO/` ถูกต้อง ทดสอบ QR CDN ใช้ไม่ได้แล้วยัง join ด้วยรหัสได้
- [ ] เครื่อง 2 Join ด้วยรหัส เครื่อง 3 เปิด deep link เห็นรหัสเติมเอง แต่ยังกรอกชื่อก่อน join
- [ ] Lobby ทุกเครื่อง sync จำนวน/ชื่อ/Emoji/👑/Online-Offline สมาชิกทั่วไปไม่มี Start/Remove/Close
- [ ] เข้าจนเต็ม 10 คน เครื่องที่ 11 ถูกปฏิเสธ; เปิด UID เดิมซ้ำไม่เพิ่มคนใหม่
- [ ] Host Start กดซ้ำไม่เริ่มใหม่ ทุกเครื่องเห็น board 50 ช่องและผู้เล่นเดียวกัน
- [ ] ทอยได้เฉพาะตาปัจจุบัน ผลเต๋าและตำแหน่งตรงกัน กดซ้ำ/refresh ระหว่าง rolling ไม่สุ่มใหม่
- [ ] ภารกิจและปริศนา: active เห็นคำถามที่เลือก คนอื่นเห็นสถานะ/timer; ทดสอบ text answer และ multiple choice
- [ ] ตอบถูก score/log ตรงกัน ตอบผิดเห็น explanation เฉพาะผู้ตอบ แล้วฝ่ายตรงข้ามเลือก punishment
- [ ] Power-up: ตอบ medium/hard ก่อนเลือก effect; ทดสอบ forward 2/3, shield, roll again
- [ ] Setback: ผู้เล่นถัดไปเลือกอุปสรรค; save ถูกได้ 10, save ผิดอ่านเฉลยแล้วเลือก ordinary punishment ตามต้นฉบับ (ไม่ apply setback card ที่เลือก); shield ถูก consume ครั้งเดียว
- [ ] Bonus: question แล้วเลือกไปช่อง 35 หรือ roll again; bonus movement เฉพาะ normal/puzzle/finish เปิดคำถามซ้ำ
- [ ] Prank: target!=actor, target valid, เลือกถอย/skip, cost 10 ถูกหักจริง, คะแนนไม่พอ disabled; skip prank ได้
- [ ] Extra/skip turn และ round increment ตรงทุกเครื่อง; reset prank flag ตามตาของผู้เล่น
- [ ] Group events: odd-square retreat / +15 ทุกคน / swap ผู้นำกับท้าย / extra turn เมื่อมี 2 คน
- [ ] ถึงช่อง 50 → final hard question → ถูกได้ 50 และ winner UID เดียวกันทุกเครื่อง → fireworks/report
- [ ] Report accuracy, addition/subtraction/multiplication/division/order/word problem ตรง canonical log; user name ไม่กลายเป็น HTML
- [ ] Host End ก่อนชนะ แสดง report โดยไม่มี winner ปลอม

## Reliability และ security

- [ ] Refresh active player ระหว่างเลือกการ์ด/คำถาม/เฉลย คืน interaction เดิม UID เดิม ไม่มี duplicate
- [ ] ตัด Wi-Fi ของ active player แล้วคืน connection; Offline เปลี่ยน realtime; question deadline ไม่เริ่มใหม่
- [ ] Host offline ทุกเครื่องแจ้งรอ Host ปุ่ม disabled เกมไม่เดินเอง; Host กลับมา processor resume และ timeout ค้างทำครั้งเดียว
- [ ] Pause ทุก phase แล้ว Resume กลับ phase เดิม timer คง remaining; กด host controls ด้วย guest ถูกปฏิเสธ
- [ ] Skip current ปลอดภัยทั้ง question/card/target และระหว่าง pause
- [ ] Remove ผู้เล่นปัจจุบัน/target/opponent selector/offline ใน game; turnOrder ไม่มี UID ที่ลบ ถ้าเหลือคนเดียวจบรายงาน
- [ ] ถูก kick แล้ว refresh/deep link ไม่กลับเอง
- [ ] Close ทุกเครื่องเห็นห้องปิดแล้วกลับ online entry; pointer/listeners/timers ถูก clear
- [ ] เข้า/ออกหลายห้องและกลับไปเล่น local/single ไม่มี listener หรือตาออนไลน์ตกค้าง
- [ ] Browser เดียว UID เดียวหลาย tab: ปิดหนึ่ง tab อีก tab ยังคง Online
- [ ] Guest DevTools SDK พยายาม set canonical position/score/phase/dice/hostId ถูก Rules reject
- [ ] Request actor ปลอม, payload เกินขนาด, expectedRevision เก่า, pending mailbox overwrite ถูก reject
- [ ] สอง request revision เดียวกันถูก apply ได้เพียงครั้งเดียว; host สอง tab ไม่ทำให้คะแนน/เต๋าซ้ำ
- [ ] Timer หมดและคำตอบเข้าใกล้ deadline: log เดียว ผล host/server-time policy consistent
- [ ] ดู browser Console/Network ไม่มี errors ยกเว้น failure ที่จำลองไว้; auth initialize ครั้งเดียว

ตรวจแต่ละ viewport: 375×667, 390×844, 768×1024, 1366×768 หน้าห้องไม่ล้นแนวนอน กระดานบนมือถือเลื่อนใน container ได้ ปุ่ม keyboard/focus ทำงาน

Production anonymous Auth, Rules deploy, QR scan บนโทรศัพท์ และหลายเครือข่ายเป็น manual verification ที่ยังต้องทำหลัง publish ไม่ถือว่า emulator test แทนการตรวจนั้นได้



## Additive features verification

- `npm test`: ล่าสุด 88 ผ่าน รวม original parity 41 + feature tests 19 + state/static 28
- `npm run test:rules`: ล่าสุด 11 ผ่าน รวม settings immutable/nonempty/enums, role exclusivity, spectator 20 fixed slots, presence/read privacy และ active answer authority
- `npm run test:features-browser`: 4 primary contexts Host + 2 players + spectator; addition/subtraction maximum medium; ทุกคนเห็น question/choices/timer, non-active controls disabled และ forged answer rejected; selected choice highlight/result, text submit without typing writes, spectator refresh, 2 turns
- เพิ่ม fifth context เพื่อยืนยัน new spectator join กลางเกม, event/final/report ไม่รวมผู้ชมเป็นผู้แข่งขัน
- Visual Golden/Local/Online: desktop 1366×768 และ original 50-square grid ที่ 390×844 / 375×667; settings/lobby mobile ไม่ล้น
- [ ] ผู้ดูแล Publish Rules ใหม่ทั้งไฟล์ก่อน production smoke; ห้ามใช้ Rules เก่ากับ runtime ใหม่
- [ ] Production: room filter categories/cap, spectator UID/reconnect, non-current answer deny และมือถือจริงหลัง Publish

รายละเอียดทั้งหมดอยู่ใน `ONLINE_FEATURES_REPORT.md` งานนี้ไม่ deploy production อัตโนมัติ
## Map-size regression matrix

รัน `npm run test:boards` (18cases รวม Golden50 exact config) และ `npm run test:boards-browser` กับ localhost Emulator ชุด browser ตรวจ Host/B/C/Spectator D ที่20/30/40/50, 2 full turns, filtered questions/answer observer, late spectator, refresh20Player/30Spectator/40Host/50Player, Final/winner และกลับ Local50 Screenshotsทุกsizeที่375×667/390×844/768×1024/1366×768 ผลอยู่ [MAP_SIZE_REPORT.md](MAP_SIZE_REPORT.md) รัน Rules/SDK suites ทีละชุดเพราะ reset namespace ร่วมกัน ห้ามชี้ test Admin setup ไป production
