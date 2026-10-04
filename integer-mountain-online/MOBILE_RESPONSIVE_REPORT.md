# Smartphone responsive UI — 5 ตุลาคม 2026

ปรับ presentation สำหรับมือถือครบ โดยไม่แก้ game rules, question/turn logic, board configs/boardSize, Firebase architecture/schema/Rules หรือ synchronization ไม่มีการ deploy production

## 1. Root cause

Grid เดิมกำหนด10คอลัมน์ track75px และช่อง78px ซึ่งรวม gap/padding แล้วกว้างกว่ามือถือ Headerใช้ขนาดdesktopและ panelผู้เล่นอยู่หลังboardตาม flex order ส่วน room/status และ Host controls เป็น fixed overlays ทำให้ทับพื้นที่เล่น Dice/result/button อยู่คนละ block ด้านล่าง ต้อง scroll ไปหา

## 2–3. Responsive และ visual columns

`getVisualBoardColumns()` คืน5เมื่อ viewportแคบกว่า700px และ10ตั้งแต่700px Tablet768/landscape844/915จึงใช้10คอลัมน์ ส่วน CSS presentation compact ใช้เฉพาะ `@media(max-width:899px)` Desktopตั้งแต่900pxยังใช้กฎ CSS และ square78px เดิม

`layoutBoardSquares()` ใช้ DOMเดิมเรียง snake จาก logical index ไม่เปลี่ยน config/type/finish/position เมื่อresizeหรือorientationเปลี่ยน debounce150ms แล้วปรับเฉพาะ style gridRow/gridColumn ของ nodesเดิม ไม่เรียกinitializeBoard ไม่สร้างpawnใหม่ ไม่มีFirebasecall/listener/write และไม่เพิ่มrevision Height-only resizeจากaddressbarไม่ต้องจัดgridใหม่

## 4. Files/CSS ที่เปลี่ยน

- ใหม่ `mobile.css`: responsive-only board, compact header/player strip/room bar, sticky action dock, Host sheet และ modal sizing
- ใหม่ `mobile-ui.js`: presentation lifecycle, placementของroom bar, local/observer/spectator status, current-player highlight, resize debounce และ guarded scroll
- `scripts.js`: เพิ่ม visual-column/layout helper และ presentation hooks หลัง updateInfo/movement completion
- `game-online-adapter.js`: ส่ง UID/role/phase ให้ presentation, reset UI และแจ้ง movement completion พร้อม actionId
- `index.html` และ `เกมพิชิตยอดเขาจำนวนเต็ม V11.23.html`: โหลดสองassetsใหม่และ `viewport-fit=cover` ใช้board/control DOMเดิม
- `tests/mobile-browser.cjs`, `tests/boards-browser.cjs`, `tests/visual-parity.cjs`, `package.json` และเอกสาร

ไม่แก้ `styles.css`, `online.css`, `game-rules.js`, `questions.js`, `online-state.js`, `online.js`, `online-room.js`, `database.rules.json`, Firebase config หรือ generator

## 5. Board layouts / mobile matrix ที่390×844

| Board size | Portrait | Desktop | ผล |
|---|---|---|---|
| 20 | 4×5 | 2×10 | PASS |
| 30 | 6×5 | 3×10 | PASS |
| 40 | 8×5 | 4×10 | PASS |
| 50 | 10×5 | 5×10 | PASS |

ทุกช่องใช้ index0…size−1 เดิม เริ่มล่างซ้าย สลับซ้าย→ขวา/ขวา→ซ้ายขึ้นแต่ละแถว Finishอยู่size−1 Layoutมือถือใช้ fluid columns/aspect ratio1 ไม่ scale/zoom ทั้งหน้า หมายเลข/label/iconปรับตามพื้นที่ Labelไม่ล้น ทุกคอลัมน์อยู่ภายในviewport First/start rowเลื่อนมาดูได้โดยไม่ถูกdockบัง Vertical scrollingเป็นธรรมชาติสำหรับ40/50

Player panelเดิมเป็น horizontal stripด้านบนboard Current playerมีกรอบสีม่วง Online userยังเห็น“คุณ”จากbadgeเดิม ชื่อยาวellipsisพร้อมtitle; stripเลื่อนได้โดยไม่สร้างpage overflow Pawn2–4ชิ้นใช้ flex offsets; กลุ่ม5–10ลดขนาดอย่างเป็นระเบียบ ทดสอบ10pawnในช่องเดียวแล้วไม่ล้นหรือขยายrow

## 6. Sticky controls / status / Host sheet

ใช้ `#rightControlPanel` และ roll buttonเดิมเป็น bottom dock Dice resultอยู่ข้างbutton44px พร้อมสถานะ“ตาของคุณ”/“กำลังรอ…”/“กำลังชมการแข่งขัน” การ enable/disable และ handlerทอยเดิมทั้งหมดไม่เปลี่ยน

ResizeObserverวัดความสูงdockเพื่อกันpadding-bottom content ใช้ safe-area-inset-bottom/top/left/right และ100dvh fallback100vh Room/statusbarย้ายเข้าflowเหนือheaderบนmobile จึงไม่ทับboard กลับเป็นpositionเดิมเมื่อdesktop

Hostกด⚙️เปิดsheetที่ reuse Pause/Resume/Skip/Kick/End/Close controlsเดิม มีปุ่มปิดเมนูและEscape โดยปุ่มปิดเมนูเป็นpresentationเท่านั้น ไม่มีสิทธิ์หรือactionใหม่ เมื่อquestion/card/prank/explanation modalเปิด ปุ่มHostเดิมย้ายไปportalเหนือmodalเพื่อให้pauseได้ แล้วกลับroombarเมื่อปิดmodal/cleanup ไม่สร้างcontrolsซ้ำ

หลังown pawnเดินเสร็จ ถ้าอยู่นอกviewportจึง smooth-scroll ไปช่องนั้น ใช้actionId guard128รายการ ไม่scrollซ้ำทุกsnapshot ไม่ตามpawnของผู้อื่น/ผู้ชม และไม่scrollขณะมีquestion/card/prank/explanation/dice/emoji/report/victory/message overlayหรือHost sheetเปิด

## 7. Modals

Question/observerใช้layoutเดียวกัน width94vw, max-height90dvh (fallback90vh), overflow-y:auto Title/timerไม่ชน Choice/submit/prank/punishment/setback/bonus controlsอย่างน้อย44px Explanationและreportเลื่อนภายในmodalได้ Card selectionใช้3 fluid columns และ aspect5:7 แทนการ์ดความกว้างคงที่

## 8. Viewports / screenshots / visual review

Presentation matrix **36 PASS** (4sizes×9viewports): 360×800,375×667,390×844,412×915,430×932,844×390,915×412,768×1024,1366×768 มีpage overflow0ในผลทั้งหมด ตรวจsnake/ทุกขอบช่อง/label bounds/aspect/pawn/header/strip/room/dock/44px targets; ตรวจquestion modalเพิ่มทั้งportrait/landscape/tablet

ตรวจภาพด้วยสายตาแล้ว: board20/30/40/50, question, spectator, explanation และHostsheet ไม่มีการ crop แนวนอนหรือ panelทับboard

ผลmachine-readable: `test-results/mobile-responsive.json`, `test-results/boards-integration.json`, `test-results/visual-parity.json`

| Screenshot | File |
|---|---|
| Lobby390 | [mobile-lobby-50-390.png](test-results/mobile-lobby-50-390.png) |
| Board20 | [mobile-board-20-390.png](test-results/mobile-board-20-390.png) |
| Board30 | [mobile-board-30-390.png](test-results/mobile-board-30-390.png) |
| Board40 | [mobile-board-40-390.png](test-results/mobile-board-40-390.png) |
| Board50 | [mobile-board-50-390.png](test-results/mobile-board-50-390.png) |
| Question | [mobile-question-390.png](test-results/mobile-question-390.png) |
| Spectator | [mobile-spectator-390.png](test-results/mobile-spectator-390.png) |
| Explanation | [mobile-explanation-390.png](test-results/mobile-explanation-390.png) |
| Host sheet | [mobile-host-sheet-390.png](test-results/mobile-host-sheet-390.png) |
| Desktop50 | [parity-online-board.png](test-results/parity-online-board.png) |

## 9–11. Golden Master / integration / desktop parity

| รายการ | ผล |
|---|---|
| Unit/static/state/features/boards | 106 PASS, 0FAIL/0SKIP |
| Golden Master gameplay | 41testsเดิม PASS; expectedเดิมไม่แก้ |
| Local browser gameplay parity | PASS Roll→Move→Mission→Answer→Prank→Turn/Round |
| Single/Local/Learning/Settings/XSS smoke | PASS |
| Desktop visual1366×768 | PASS exactGolden geometry/fonts/spacing/pawns/panels/dice/header และquestion/card/explanation/prank/report/victory |
| Mobile presentation | 36board/viewport pairs PASS; modals/touch targets/crowd/hostsheet PASS |
| Resize | PASS same square node, noinitializeBoard, samepositions/scores/turn/round และ canonical revision/gameเหมือนเดิม |
| Mobile/desktop Firebase SDK integration | PASS20/30/40/50: AHost390,BPlayer375,CPlayer1366,DSpectator390 |
| Observer/selected answer | PASS samequestion, disabledobserver controls, submittedanswer/resultทุกclient |
| Movement/turn/final | PASS dice2/two fullturns/score/log/current turn, nearfinishroll→Final→winner |
| Host sheet | PASS actual SDK Pause/Resumeทุกsize ทั้งก่อนทอยและระหว่างตอบquestion; ปุ่มเดิมอยู่เหนือmodalเพื่อควบคุมได้ |
| Refresh/late spectator | PASS Player20/50,Spectator30,Host40 และlate spectatorทุกsize |
| Firebase Rules | 16PASS; fileunchanged |

แก้เฉพาะส่วนmobile visual assertionsของtestเดิมซึ่งเดิมคาด10columnsบนmobile ให้ตรวจ5columnsตามข้อกำหนดใหม่ Desktop Golden assertionsและgameplay expectedทั้งหมดเดิม

Immutable SHA-256:

- Rules: `3b16ff6787567fb0b5afeb1476581dbf9fa6ac70823b589d106f89c7e32581a6`
- Shared game rules: `0a21448c00a574b1847a3e421c9accfbe62f7e760460ae6fedd6bd608aad53d4`
- Base CSS: `46f05b8bc7cb457df7545d3fcaa015ee545a61766553905936953a34aad05ace`
- Questions: `2cb16004cad00cf21a80d24bb1ee9147b2c1c3c526e80f90954ba5fcee1bcd36`
- Online state: `89dbb699eeae78a57f1839b54706efec95711d37a124262585e47c27c56028fa`
- Online controller: `688c4219167b5375530fe78cc604cffe9269708fbaac040f6e1dba572ae077a3`
- Room helpers: `3dc084fbf216f0d5ae047995efafc46a3117a726f3319ab451d78dafca120ff3`

## 12. Known limitations / publishing

ทดสอบด้วยChrome browser viewport emulation และlocal Firebase Emulator ไม่ใช่โทรศัพท์จริง/iOS Safari จึงยังต้องตรวจon-device safe area, addressbar และvirtual keyboard Input/modalใช้dvh/scrollและsafe-area CSSแล้ว แต่ emulatorไม่ได้จำลองnative keyboardจริง

ช่วงทดสอบreloadหลายครั้งพบFirebase SDK import/network failureก่อนตั้งauth.uid บนPlayer50 จึงcacheเนื้อหาSDK official version10.14.1แบบไม่ดัดแปลงในtest harnessเพียงครั้งเดียวต่อrun ยังคงใช้SDK/WebSocket/RulesจริงกับEmulatorและmockAuth UIDเดิม Matrixสุดท้ายผ่านครบ20/30/40/50พร้อมerrors=[] Runtime Firebase loading/controllerไม่แก้

Board40/50อนุญาตvertical scroll Player stripแสดงชื่อยาวแบบellipsis Reporttableอาจscrollแนวนอนภายในreportcontainer ไม่ใช่page/board

เผยแพร่ `mobile.css`, `mobile-ui.js`, HTMLทั้งสองไฟล์, `scripts.js` และ `game-online-adapter.js` พร้อมกันผ่านstatic-siteช่องทางเดิม แล้วreloadหน้า ไม่ต้องdeployRulesเพิ่มสำหรับงานUIนี้ ไม่มีการdeployproduction/Hosting เปลี่ยนbilling หรือลบข้อมูลproduction

รันตรวจซ้ำ: `npm test`, `npm run check`, `npm run test:mobile`, `npm run test:visual`, `npm run test:local-parity`, `npm run test:browser`; Emulator suites `npm run test:rules` และ `npm run test:boards-browser` ต้องรันทีละชุด ใช้localhostเท่านั้น
