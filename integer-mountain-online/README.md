# พิชิตยอดเขาจำนวนเต็ม

Online Host เลือกแผนที่ 20/30/40/50 ช่องได้ (แนะนำ/default30); Single/Local และห้องเก่าใช้50 อ่าน architecture, distributions, schema และผล tests ใน [รายงานขนาดแผนที่](MAP_SIZE_REPORT.md) **ต้อง Publish/Deploy database.rules.json ชุดใหม่** เพื่อรองรับ boardSize

เกมการศึกษา HTML + CSS + Vanilla JavaScript รองรับโหมดท้าทาย 1 คน, หลายคนเครื่องเดียว และออนไลน์สูงสุด 10 ผู้เล่น + 20 ผู้ชมต่อห้อง ผ่าน Firebase Realtime Database + Anonymous Authentication

เปิด `index.html` ผ่าน GitHub Pages หรือ HTTP static server คำถาม เสียง และ asset เดิมใช้ relative paths ไม่ต้องมี runtime backend หรือ build step

ก่อนใช้โหมดออนไลน์ publish `database.rules.json` และตรวจ Firebase Authorized domains ตาม [คู่มือตั้งค่า](FIREBASE_SETUP.md) จากนั้น Host สร้างห้อง แชร์ QR/รหัส/ลิงก์ และเริ่มเกมเมื่อมีอย่างน้อย 2 คน Host ต้องอยู่ online ตลอดเกม

อ่าน [แผนทดสอบหลายอุปกรณ์](MULTIPLAYER_TEST_PLAN.md) และ [ผลตรวจสอบ](VERIFICATION.md) สำหรับรายละเอียดการทดสอบและข้อจำกัด การใช้ Host-authoritative บน static client ไม่ป้องกันการโกงด้วย DevTools หรือ Host ที่ดัดแปลงเกม

Local และ Online ใช้กติกาต้นฉบับ V11.23 ร่วมกันใน `game-rules.js` และใช้ presentation เดิมใน `scripts.js` รายการ regression ที่แก้และผล Golden Master parity อยู่ใน [รายงาน regression](REGRESSION_REPORT.md)

Host เลือกประเภทโจทย์ได้หลายประเภทและระดับความยากสูงสุดของห้อง (default ปานกลาง = ง่าย + ปานกลาง) ทุกคนเห็นโจทย์เดียวกันและคำตอบเมื่อ submit ผู้ชมเข้าระหว่างเกม/refresh ได้โดยไม่มีหมาก คะแนน หรือ turn อ่าน schema, filter/fallback, security และผล 4-browser tests ใน [รายงานฟีเจอร์ออนไลน์](ONLINE_FEATURES_REPORT.md)

**ต้อง Publish/Deploy `database.rules.json` ชุดใหม่ทั้งไฟล์ก่อนใช้ฟีเจอร์เหล่านี้กับ production** งานนี้ไม่ deploy production อัตโนมัติ Rules เก่าจะไม่รองรับ settings/boardSize/spectators

Dev checks: `npm test`, `npm run check`, `npm run test:browser`, `npm run test:local-parity`, `npm run test:visual`, `npm run test:rules`, `npm run test:multiplayer`, `npm run test:features-browser` Rules/SDK integration tests ใช้ local RTDB emulator เท่านั้นและต้องรันทีละ suite เพราะใช้ namespace ทดสอบร่วมกัน
