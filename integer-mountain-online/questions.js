// --- Master Question Bank (Augmented with 'category' and 'explanation') ---
const allCards = {
    mission: { easy: [], medium: [], hard: [] },
    puzzle: { easy: [], medium: [], hard: [] }
};

function populateAllCards() {
allCards.mission.easy = [
    {
        question: "5 + 11 = ?",
        answer: "16",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>เป็นการบวกจำนวนเต็มบวกกับจำนวนเต็มบวก ผลลัพธ์ที่ได้จะเป็นจำนวนเต็มบวก</p><p class='pl-4 font-mono text-blue-700'>5 + 11 = 16</p>"
    },
    {
        question: "18 - 7 = ?",
        answer: "11",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>เป็นการลบจำนวนเต็มบวกสองจำนวน</p><p class='pl-4 font-mono text-blue-700'>18 - 7 = 11</p>"
    },
    {
        question: "4 × 8 = ?",
        answer: "32",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>เป็นการคูณจำนวนเต็มบวกสองจำนวน ผลลัพธ์เป็นจำนวนเต็มบวก</p><p class='pl-4 font-mono text-blue-700'>4 × 8 = 32</p>"
    },
    {
        question: "20 ÷ 5 = ?",
        answer: "4",
        difficulty: "easy",
        category: "division",
        explanation: "<p>เป็นการหารจำนวนเต็มบวกสองจำนวน ผลลัพธ์เป็นจำนวนเต็มบวก</p><p class='pl-4 font-mono text-blue-700'>20 ÷ 5 = 4</p>"
    },
    {
        question: "(-3) + 9 = ?",
        answer: "6",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>เป็นการบวกระหว่างจำนวนเต็มลบและจำนวนเต็มบวก ให้นำค่าสัมบูรณ์มาลบกัน (9 - 3 = 6) และใช้เครื่องหมายตามจำนวนที่มีค่าสัมบูรณ์มากกว่า (คือ 9 ซึ่งเป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>(-3) + 9 = 6</p>"
    },
    {
        question: "10 + (-4) = ?",
        answer: "6",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>เป็นการบวกระหว่างจำนวนเต็มบวกและจำนวนเต็มลบ ให้นำค่าสัมบูรณ์มาลบกัน (10 - 4 = 6) และใช้เครื่องหมายตามจำนวนที่มีค่าสัมบูรณ์มากกว่า (คือ 10 ซึ่งเป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>10 + (-4) = 6</p>"
    },
    {
        question: "7 - 12 = ?",
        answer: "-5",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบที่ตัวตั้งน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p><p class='pl-4 font-mono text-blue-700'>7 - 12 = -5</p>"
    },
    {
        question: "(-5) - 3 = ?",
        answer: "-8",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบสามารถเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-5) - 3 = (-5) + (-3) = -8</p>"
    },
    {
        question: "6 × (-3) = ?",
        answer: "-18",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนเต็มบวกกับจำนวนเต็มลบ (เครื่องหมายต่างกัน) ผลลัพธ์จะเป็นจำนวนเต็มลบ</p><p class='pl-4 font-mono text-blue-700'>6 × (-3) = -18</p>"
    },
    {
        question: "(-2) × 10 = ?",
        answer: "-20",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนเต็มลบกับจำนวนเต็มบวก (เครื่องหมายต่างกัน) ผลลัพธ์จะเป็นจำนวนเต็มลบ</p><p class='pl-4 font-mono text-blue-700'>(-2) × 10 = -20</p>"
    },
    {
        question: "15 ÷ (-3) = ?",
        answer: "-5",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนเต็มบวกด้วยจำนวนเต็มลบ (เครื่องหมายต่างกัน) ผลลัพธ์จะเป็นจำนวนเต็มลบ</p><p class='pl-4 font-mono text-blue-700'>15 ÷ (-3) = -5</p>"
    },
    {
        question: "(-14) ÷ 2 = ?",
        answer: "-7",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนเต็มลบด้วยจำนวนเต็มบวก (เครื่องหมายต่างกัน) ผลลัพธ์จะเป็นจำนวนเต็มลบ</p><p class='pl-4 font-mono text-blue-700'>(-14) ÷ 2 = -7</p>"
    },
    {
        question: "(-8) + (-5) = ?",
        answer: "-13",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>การบวกจำนวนเต็มลบกับจำนวนเต็มลบ ให้นำค่าสัมบูรณ์มาบวกกันแล้วใส่เครื่องหมายลบ</p><p class='pl-4 font-mono text-blue-700'>8 + 5 = 13  ดังนั้นคำตอบคือ -13</p>"
    },
    {
        question: "(-1) × (-13) = ?",
        answer: "13",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนเต็มลบกับจำนวนเต็มลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์จะเป็นจำนวนเต็มบวก</p><p class='pl-4 font-mono text-blue-700'>(-1) × (-13) = 13</p>"
    },
    {
        question: "(-25) ÷ (-5) = ?",
        answer: "5",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนเต็มลบด้วยจำนวนเต็มลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์จะเป็นจำนวนเต็มบวก</p><p class='pl-4 font-mono text-blue-700'>(-25) ÷ (-5) = 5</p>"
    },
    {
        question: "19 - 9 = ?",
        answer: "10",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>เป็นการลบเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>19 - 9 = 10</p>"
    },
    {
        question: "2 + 15 = ?",
        answer: "17",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>เป็นการบวกเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>2 + 15 = 17</p>"
    },
    {
        question: "6 × 6 = ?",
        answer: "36",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>เป็นการคูณเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>6 × 6 = 36</p>"
    },
    {
        question: "30 ÷ 3 = ?",
        answer: "10",
        difficulty: "easy",
        category: "division",
        explanation: "<p>เป็นการหารเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>30 ÷ 3 = 10</p>"
    },
    {
        question: "14 + (-14) = ?",
        answer: "0",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>การบวกจำนวนที่เท่ากันแต่มีเครื่องหมายตรงข้ามกัน ผลลัพธ์จะเป็น 0 เสมอ</p><p class='pl-4 font-mono text-blue-700'>14 + (-14) = 0</p>"
    },
    {
        question: "8 - (-2) = ?",
        answer: "10",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>8 - (-2) = 8 + 2 = 10</p>"
    },
    {
        question: "15 + (-8) = ?",
        answer: "7",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>บวกด้วยจำนวนลบ คือการนำค่าสัมบูรณ์มาลบกัน (15 - 8 = 7) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (15 เป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>15 + (-8) = 7</p>"
    },
    {
        question: "12 + 13 = ?",
        answer: "25",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>เป็นการบวกเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>12 + 13 = 25</p>"
    },
    {
        question: "(-10) + 5 = ?",
        answer: "-5",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (10 - 5 = 5) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (-10 เป็นลบ)</p><p class='pl-4 font-mono text-blue-700'>(-10) + 5 = -5</p>"
    },
    {
        question: "(-7) + (-11) = ?",
        answer: "-18",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>การบวกจำนวนลบกับจำนวนลบ ให้นำค่าสัมบูรณ์มาบวกกัน (7 + 11 = 18) แล้วใส่เครื่องหมายลบ</p><p class='pl-4 font-mono text-blue-700'>(-7) + (-11) = -18</p>"
    },
    {
        question: "20 + (-20) = ?",
        answer: "0",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>การบวกจำนวนที่เท่ากันแต่มีเครื่องหมายตรงข้ามกัน ผลลัพธ์จะเป็น 0</p><p class='pl-4 font-mono text-blue-700'>20 + (-20) = 0</p>"
    },
    {
        question: "8 + 9 = ?",
        answer: "17",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>เป็นการบวกเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>8 + 9 = 17</p>"
    },
    {
        question: "(-14) + 6 = ?",
        answer: "-8",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (14 - 6 = 8) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (-14 เป็นลบ)</p><p class='pl-4 font-mono text-blue-700'>(-14) + 6 = -8</p>"
    },
    {
        question: "19 + (-5) = ?",
        answer: "14",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (19 - 5 = 14) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (19 เป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>19 + (-5) = 14</p>"
    },
    {
        question: "(-22) + 12 = ?",
        answer: "-10",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (22 - 12 = 10) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (-22 เป็นลบ)</p><p class='pl-4 font-mono text-blue-700'>(-22) + 12 = -10</p>"
    },
    {
        question: "16 + (-16) = ?",
        answer: "0",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>การบวกจำนวนที่เท่ากันแต่มีเครื่องหมายตรงข้ามกัน ผลลัพธ์จะเป็น 0</p><p class='pl-4 font-mono text-blue-700'>16 + (-16) = 0</p>"
    },
    {
        question: "(-3) + 18 = ?",
        answer: "15",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (18 - 3 = 15) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (18 เป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>(-3) + 18 = 15</p>"
    },
    {
        question: "11 + 14 = ?",
        answer: "25",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>เป็นการบวกเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>11 + 14 = 25</p>"
    },
    {
        question: "(-1) + (-15) = ?",
        answer: "-16",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>การบวกจำนวนลบกับจำนวนลบ ให้นำค่าสัมบูรณ์มาบวกกัน (1 + 15 = 16) แล้วใส่เครื่องหมายลบ</p><p class='pl-4 font-mono text-blue-700'>(-1) + (-15) = -16</p>"
    },
    {
        question: "30 + (-10) = ?",
        answer: "20",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (30 - 10 = 20) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (30 เป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>30 + (-10) = 20</p>"
    },
    {
        question: "(-25) + 15 = ?",
        answer: "-10",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (25 - 15 = 10) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (-25 เป็นลบ)</p><p class='pl-4 font-mono text-blue-700'>(-25) + 15 = -10</p>"
    },
    {
        question: "6 + 17 = ?",
        answer: "23",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>เป็นการบวกเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>6 + 17 = 23</p>"
    },
    {
        question: "(-13) + 13 = ?",
        answer: "0",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>การบวกจำนวนที่เท่ากันแต่มีเครื่องหมายตรงข้ามกัน ผลลัพธ์จะเป็น 0</p><p class='pl-4 font-mono text-blue-700'>(-13) + 13 = 0</p>"
    },
    {
        question: "10 + (-21) = ?",
        answer: "-11",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (21 - 10 = 11) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (-21 เป็นลบ)</p><p class='pl-4 font-mono text-blue-700'>10 + (-21) = -11</p>"
    },
    {
        question: "(-19) + 9 = ?",
        answer: "-10",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (19 - 9 = 10) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (-19 เป็นลบ)</p><p class='pl-4 font-mono text-blue-700'>(-19) + 9 = -10</p>"
    },
    {
        question: "22 + (-7) = ?",
        answer: "15",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (22 - 7 = 15) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (22 เป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>22 + (-7) = 15</p>"
    },
    {
        question: "4 + (-12) = ?",
        answer: "-8",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (12 - 4 = 8) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (-12 เป็นลบ)</p><p class='pl-4 font-mono text-blue-700'>4 + (-12) = -8</p>"
    },
    {
        question: "(-6) + (-13) = ?",
        answer: "-19",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>การบวกจำนวนลบกับจำนวนลบ ให้นำค่าสัมบูรณ์มาบวกกัน (6 + 13 = 19) แล้วใส่เครื่องหมายลบ</p><p class='pl-4 font-mono text-blue-700'>(-6) + (-13) = -19</p>"
    },
    {
        question: "21 + 9 = ?",
        answer: "30",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>เป็นการบวกเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>21 + 9 = 30</p>"
    },
    {
        question: "18 + (-25) = ?",
        answer: "-7",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (25 - 18 = 7) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (-25 เป็นลบ)</p><p class='pl-4 font-mono text-blue-700'>18 + (-25) = -7</p>"
    },
    {
        question: "(-20) + 11 = ?",
        answer: "-9",
        difficulty: "easy",
        category: "addition",
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (20 - 11 = 9) และใช้เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า (-20 เป็นลบ)</p><p class='pl-4 font-mono text-blue-700'>(-20) + 11 = -9</p>"
    },
    {
        question: "20 - 5 = ?",
        answer: "15",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>เป็นการลบเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>20 - 5 = 15</p>"
    },
    {
        question: "10 - 15 = ?",
        answer: "-5",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบที่ตัวตั้งน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p><p class='pl-4 font-mono text-blue-700'>10 - 15 = -5</p>"
    },
    {
        question: "8 - (-7) = ?",
        answer: "15",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>8 - (-7) = 8 + 7 = 15</p>"
    },
    {
        question: "(-12) - 3 = ?",
        answer: "-15",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบสามารถเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-12) - 3 = (-12) + (-3) = -15</p>"
    },
    {
        question: "(-15) - (-5) = ?",
        answer: "-10",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-15) - (-5) = (-15) + 5 = -10</p>"
    },
    {
        question: "25 - 10 = ?",
        answer: "15",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>เป็นการลบเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>25 - 10 = 15</p>"
    },
    {
        question: "9 - 19 = ?",
        answer: "-10",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบที่ตัวตั้งน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p><p class='pl-4 font-mono text-blue-700'>9 - 19 = -10</p>"
    },
    {
        question: "14 - (-6) = ?",
        answer: "20",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>14 - (-6) = 14 + 6 = 20</p>"
    },
    {
        question: "(-20) - 5 = ?",
        answer: "-25",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบสามารถเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-20) - 5 = (-20) + (-5) = -25</p>"
    },
    {
        question: "(-8) - (-10) = ?",
        answer: "2",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-8) - (-10) = (-8) + 10 = 2</p>"
    },
    {
        question: "30 - 18 = ?",
        answer: "12",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>เป็นการลบเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>30 - 18 = 12</p>"
    },
    {
        question: "7 - 17 = ?",
        answer: "-10",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบที่ตัวตั้งน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p><p class='pl-4 font-mono text-blue-700'>7 - 17 = -10</p>"
    },
    {
        question: "19 - (-1) = ?",
        answer: "20",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>19 - (-1) = 19 + 1 = 20</p>"
    },
    {
        question: "(-22) - 8 = ?",
        answer: "-30",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบสามารถเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-22) - 8 = (-22) + (-8) = -30</p>"
    },
    {
        question: "(-11) - (-11) = ?",
        answer: "0",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเดียวกัน ผลลัพธ์เป็น 0</p><p class='pl-4 font-mono text-blue-700'>(-11) - (-11) = (-11) + 11 = 0</p>"
    },
    {
        question: "13 - 20 = ?",
        answer: "-7",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบที่ตัวตั้งน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p><p class='pl-4 font-mono text-blue-700'>13 - 20 = -7</p>"
    },
    {
        question: "28 - 14 = ?",
        answer: "14",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>เป็นการลบเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>28 - 14 = 14</p>"
    },
    {
        question: "6 - (-14) = ?",
        answer: "20",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>6 - (-14) = 6 + 14 = 20</p>"
    },
    {
        question: "(-16) - 4 = ?",
        answer: "-20",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบสามารถเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-16) - 4 = (-16) + (-4) = -20</p>"
    },
    {
        question: "(-9) - (-18) = ?",
        answer: "9",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-9) - (-18) = (-9) + 18 = 9</p>"
    },
    {
        question: "1 - 10 = ?",
        answer: "-9",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบที่ตัวตั้งน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p><p class='pl-4 font-mono text-blue-700'>1 - 10 = -9</p>"
    },
    {
        question: "23 - (-7) = ?",
        answer: "30",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>23 - (-7) = 23 + 7 = 30</p>"
    },
    {
        question: "(-30) - (-10) = ?",
        answer: "-20",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบด้วยจำนวนเต็มลบ จะเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-30) - (-10) = (-30) + 10 = -20</p>"
    },
    {
        question: "17 - 8 = ?",
        answer: "9",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>เป็นการลบเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>17 - 8 = 9</p>"
    },
    {
        question: "(-5) - 15 = ?",
        answer: "-20",
        difficulty: "easy",
        category: "subtraction",
        explanation: "<p>การลบสามารถเปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-5) - 15 = (-5) + (-15) = -20</p>"
    },
    {
        question: "5 * (-6) = ?",
        answer: "-30",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนบวกกับจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>5 × (-6) = -30</p>"
    },
    {
        question: "(-7) * 4 = ?",
        answer: "-28",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-7) × 4 = -28</p>"
    },
    {
        question: "(-8) * (-3) = ?",
        answer: "24",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-8) × (-3) = 24</p>"
    },
    {
        question: "9 * 5 = ?",
        answer: "45",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>เป็นการคูณเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>9 × 5 = 45</p>"
    },
    {
        question: "10 * (-4) = ?",
        answer: "-40",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนบวกกับจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>10 × (-4) = -40</p>"
    },
    {
        question: "(-11) * 3 = ?",
        answer: "-33",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-11) × 3 = -33</p>"
    },
    {
        question: "(-6) * (-6) = ?",
        answer: "36",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-6) × (-6) = 36</p>"
    },
    {
        question: "12 * 2 = ?",
        answer: "24",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>เป็นการคูณเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>12 × 2 = 24</p>"
    },
    {
        question: "15 * (-1) = ?",
        answer: "-15",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนบวกกับจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>15 × (-1) = -15</p>"
    },
    {
        question: "(-9) * 0 = ?",
        answer: "0",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>จำนวนใดๆ คูณด้วย 0 จะได้ผลลัพธ์เป็น 0 เสมอ</p><p class='pl-4 font-mono text-blue-700'>(-9) × 0 = 0</p>"
    },
    {
        question: "7 * (-5) = ?",
        answer: "-35",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนบวกกับจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>7 × (-5) = -35</p>"
    },
    {
        question: "(-4) * 9 = ?",
        answer: "-36",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-4) × 9 = -36</p>"
    },
    {
        question: "(-5) * (-7) = ?",
        answer: "35",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-5) × (-7) = 35</p>"
    },
    {
        question: "8 * 6 = ?",
        answer: "48",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>เป็นการคูณเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>8 × 6 = 48</p>"
    },
    {
        question: "(-1) * 25 = ?",
        answer: "-25",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-1) × 25 = -25</p>"
    },
    {
        question: "11 * (-5) = ?",
        answer: "-55",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนบวกกับจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>11 × (-5) = -55</p>"
    },
    {
        question: "(-3) * (-12) = ?",
        answer: "36",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-3) × (-12) = 36</p>"
    },
    {
        question: "6 * 9 = ?",
        answer: "54",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>เป็นการคูณเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>6 × 9 = 54</p>"
    },
    {
        question: "(-10) * 10 = ?",
        answer: "-100",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-10) × 10 = -100</p>"
    },
    {
        question: "4 * (-12) = ?",
        answer: "-48",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนบวกกับจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>4 × (-12) = -48</p>"
    },
    {
        question: "(-2) * 20 = ?",
        answer: "-40",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-2) × 20 = -40</p>"
    },
    {
        question: "(-8) * (-5) = ?",
        answer: "40",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-8) × (-5) = 40</p>"
    },
    {
        question: "7 * 7 = ?",
        answer: "49",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>เป็นการคูณเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>7 × 7 = 49</p>"
    },
    {
        question: "13 * (-3) = ?",
        answer: "-39",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนบวกกับจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>13 × (-3) = -39</p>"
    },
    {
        question: "(-12) * (-4) = ?",
        answer: "48",
        difficulty: "easy",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนลบกับจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-12) × (-4) = 48</p>"
    },
    {
        question: "(-30) / 6 = ?",
        answer: "-5",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-30) ÷ 6 = -5</p>"
    },
    {
        question: "28 / (-4) = ?",
        answer: "-7",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>28 ÷ (-4) = -7</p>"
    },
    {
        question: "(-24) / (-3) = ?",
        answer: "8",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-24) ÷ (-3) = 8</p>"
    },
    {
        question: "45 / 9 = ?",
        answer: "5",
        difficulty: "easy",
        category: "division",
        explanation: "<p>เป็นการหารเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>45 ÷ 9 = 5</p>"
    },
    {
        question: "(-40) / 10 = ?",
        answer: "-4",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-40) ÷ 10 = -4</p>"
    },
    {
        question: "(-33) / 11 = ?",
        answer: "-3",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-33) ÷ 11 = -3</p>"
    },
    {
        question: "36 / (-6) = ?",
        answer: "-6",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>36 ÷ (-6) = -6</p>"
    },
    {
        question: "24 / 12 = ?",
        answer: "2",
        difficulty: "easy",
        category: "division",
        explanation: "<p>เป็นการหารเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>24 ÷ 12 = 2</p>"
    },
    {
        question: "(-15) / (-1) = ?",
        answer: "15",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-15) ÷ (-1) = 15</p>"
    },
    {
        question: "0 / (-9) = ?",
        answer: "0",
        difficulty: "easy",
        category: "division",
        explanation: "<p>0 หารด้วยจำนวนใดๆ (ที่ไม่ใช่ 0) จะได้ผลลัพธ์เป็น 0 เสมอ</p><p class='pl-4 font-mono text-blue-700'>0 ÷ (-9) = 0</p>"
    },
    {
        question: "(-35) / 5 = ?",
        answer: "-7",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-35) ÷ 5 = -7</p>"
    },
    {
        question: "36 / (-9) = ?",
        answer: "-4",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>36 ÷ (-9) = -4</p>"
    },
    {
        question: "(-35) / (-7) = ?",
        answer: "5",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-35) ÷ (-7) = 5</p>"
    },
    {
        question: "48 / 8 = ?",
        answer: "6",
        difficulty: "easy",
        category: "division",
        explanation: "<p>เป็นการหารเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>48 ÷ 8 = 6</p>"
    },
    {
        question: "(-25) / 5 = ?",
        answer: "-5",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-25) ÷ 5 = -5</p>"
    },
    {
        question: "(-55) / (-11) = ?",
        answer: "5",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-55) ÷ (-11) = 5</p>"
    },
    {
        question: "36 / (-12) = ?",
        answer: "-3",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>36 ÷ (-12) = -3</p>"
    },
    {
        question: "54 / 6 = ?",
        answer: "9",
        difficulty: "easy",
        category: "division",
        explanation: "<p>เป็นการหารเลขธรรมดา</p><p class='pl-4 font-mono text-blue-700'>54 ÷ 6 = 9</p>"
    },
    {
        question: "(-100) / 10 = ?",
        answer: "-10",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-100) ÷ 10 = -10</p>"
    },
    {
        question: "(-48) / (-4) = ?",
        answer: "12",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ (เครื่องหมายเหมือนกัน) ผลลัพธ์เป็นบวก</p><p class='pl-4 font-mono text-blue-700'>(-48) ÷ (-4) = 12</p>"
    },
    {
        question: "(-40) / 20 = ?",
        answer: "-2",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-40) ÷ 20 = -2</p>"
    },
    {
        question: "40 / (-8) = ?",
        answer: "-5",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>40 ÷ (-8) = -5</p>"
    },
    {
        question: "49 / (-7) = ?",
        answer: "-7",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>49 ÷ (-7) = -7</p>"
    },
    {
        question: "(-39) / 13 = ?",
        answer: "-3",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>(-39) ÷ 13 = -3</p>"
    },
    {
        question: "48 / (-12) = ?",
        answer: "-4",
        difficulty: "easy",
        category: "division",
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ (เครื่องหมายต่างกัน) ผลลัพธ์เป็นลบ</p><p class='pl-4 font-mono text-blue-700'>48 ÷ (-12) = -4</p>"
    }
];
allCards.mission.medium =[
    {
        question: "45 + (10 * (-3)) = ?",
        answer: "15",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 * (-3) = -30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>45 + (-30) = 15</p>"
    },
    {
        question: "70 - (60 / 3) = ?",
        answer: "50",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>60 / 3 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>70 - 20 = 50</p>"
    },
    {
        question: "8 * (5 - 12) = ?",
        answer: "-56",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>5 - 12 = -7</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>8 * (-7) = -56</p>"
    },
    {
        question: "(-50) / (2 * 5) = ?",
        answer: "-5",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>2 * 5 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-50) / 10 = -5</p>"
    },
    {
        question: "15 + 20 / (-4) = ?",
        answer: "10",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>20 / (-4) = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>15 + (-5) = 10</p>"
    },
    {
        question: "60 - 8 * 8 = ?",
        answer: "-4",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>8 * 8 = 64</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>60 - 64 = -4</p>"
    },
    {
        question: "(14 - 20) * 10 = ?",
        answer: "-60",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>14 - 20 = -6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-6) * 10 = -60</p>"
    },
    {
        question: "22 + (-45) / 9 = ?",
        answer: "17",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>(-45) / 9 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>22 + (-5) = 17</p>"
    },
    {
        question: "100 / (10 - 30) = ?",
        answer: "-5",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 - 30 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>100 / (-20) = -5</p>"
    },
    {
        question: "(-7) * 7 + 50 = ?",
        answer: "1",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>(-7) * 7 = -49</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-49 + 50 = 1</p>"
    },
    {
        question: "(3 + 9) * (-5) = ?",
        answer: "-60",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>3 + 9 = 12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>12 * (-5) = -60</p>"
    },
    {
        question: "80 - (9 * 10) = ?",
        answer: "-10",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>9 * 10 = 90</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>80 - 90 = -10</p>"
    },
    {
        question: "(-20 - 16) / 4 = ?",
        answer: "-9",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-20 - 16 = -36</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-36) / 4 = -9</p>"
    },
    {
        question: "50 + 6 * (-6) = ?",
        answer: "14",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>6 * (-6) = -36</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>50 + (-36) = 14</p>"
    },
    {
        question: "33 / (1 - 12) = ?",
        answer: "-3",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>1 - 12 = -11</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>33 / (-11) = -3</p>"
    },
    {
        question: "(10 - (-5)) * 2 = ?",
        answer: "30",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 - (-5) = 15</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>15 * 2 = 30</p>"
    },
    {
        question: "48 / (-8) + 10 = ?",
        answer: "4",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>48 / (-8) = -6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-6 + 10 = 4</p>"
    },
    {
        question: "(-9) * 5 - 15 = ?",
        answer: "-60",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>(-9) * 5 = -45</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-45 - 15 = -60</p>"
    },
    {
        question: "(25 - 50) / 5 = ?",
        answer: "-5",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>25 - 50 = -25</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-25) / 5 = -5</p>"
    },
    {
        question: "12 - 3 * 7 = ?",
        answer: "-9",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>3 * 7 = 21</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>12 - 21 = -9</p>"
    },
    {
        question: "6 * (-4 - 6) = ?",
        answer: "-60",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-4 - 6 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>6 * (-10) = -60</p>"
    },
    {
        question: "70 / (-7) - 7 = ?",
        answer: "-17",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>70 / (-7) = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-10 - 7 = -17</p>"
    },
    {
        question: "(-5 - 10) * 3 = ?",
        answer: "-45",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-5 - 10 = -15</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-15) * 3 = -45</p>"
    },
    {
        question: "21 + 24 / (-3) = ?",
        answer: "13",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>24 / (-3) = -8</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>21 + (-8) = 13</p>"
    },
    {
        question: "(-60 / 10) + 15 = ?",
        answer: "9",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-60 / 10 = -6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-6 + 15 = 9</p>"
    },
    {
        question: "9 * 3 - 30 = ?",
        answer: "-3",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>9 * 3 = 27</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>27 - 30 = -3</p>"
    },
    {
        question: "(18 - (-12)) / (-3) = ?",
        answer: "-10",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>18 - (-12) = 30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>30 / (-3) = -10</p>"
    },
    {
        question: "11 * (-5) + 60 = ?",
        answer: "5",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>11 * (-5) = -55</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-55 + 60 = 5</p>"
    },
    {
        question: "44 - (5 * 10) = ?",
        answer: "-6",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>5 * 10 = 50</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>44 - 50 = -6</p>"
    },
    {
        question: "81 / (-9) + 20 = ?",
        answer: "11",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>81 / (-9) = -9</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-9 + 20 = 11</p>"
    },
    {
        question: "4 * (-10 - 2) = ?",
        answer: "-48",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-10 - 2 = -12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>4 * (-12) = -48</p>"
    },
    {
        question: "35 - (80 / (-8)) = ?",
        answer: "45",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>80 / (-8) = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>35 - (-10) = 45</p>"
    },
    {
        question: "(-15 + 3) * 4 = ?",
        answer: "-48",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-15 + 3 = -12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-12) * 4 = -48</p>"
    },
    {
        question: "16 * 2 - 40 = ?",
        answer: "-8",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>16 * 2 = 32</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>32 - 40 = -8</p>"
    },
    {
        question: "50 / (25 - 15) = ?",
        answer: "5",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>25 - 15 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>50 / 10 = 5</p>"
    },
    {
        question: "-100 + (10 * 12) = ?",
        answer: "20",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 * 12 = 120</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-100 + 120 = 20</p>"
    },
    {
        question: "(30 - 90) / 6 = ?",
        answer: "-10",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>30 - 90 = -60</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-60) / 6 = -10</p>"
    },
    {
        question: "13 * 3 - 50 = ?",
        answer: "-11",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>13 * 3 = 39</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>39 - 50 = -11</p>"
    },
    {
        question: "20 + (100 / (-5)) = ?",
        answer: "0",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>100 / (-5) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>20 + (-20) = 0</p>"
    },
    {
        question: "(-8) * (15 - 5) = ?",
        answer: "-80",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>15 - 5 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-8) * 10 = -80</p>"
    },
    {
        question: "72 / (-9) - 2 = ?",
        answer: "-10",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>72 / (-9) = -8</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-8 - 2 = -10</p>"
    },
    {
        question: "(-20 + 5) * 5 = ?",
        answer: "-75",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-20 + 5 = -15</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-15) * 5 = -75</p>"
    },
    {
        question: "144 / (10 + 2) = ?",
        answer: "12",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 + 2 = 12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>144 / 12 = 12</p>"
    },
    {
        question: "10 * (-2) - 30 = ?",
        answer: "-50",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>10 * (-2) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-20 - 30 = -50</p>"
    },
    {
        question: "64 / (2 - 10) = ?",
        answer: "-8",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>2 - 10 = -8</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>64 / (-8) = -8</p>"
    },
    {
        question: "42 - 7 * 7 = ?",
        answer: "-7",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>7 * 7 = 49</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>42 - 49 = -7</p>"
    },
    {
        question: "(-50 / 10) * 8 = ?",
        answer: "-40",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-50 / 10 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-5) * 8 = -40</p>"
    },
    {
        question: "25 + (3 * (-10)) = ?",
        answer: "-5",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>3 * (-10) = -30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>25 + (-30) = -5</p>"
    },
    {
        question: "(-100 + 50) / 2 = ?",
        answer: "-25",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-100 + 50 = -50</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-50) / 2 = -25</p>"
    },
    {
        question: "36 / (-3) + 3 = ?",
        answer: "-9",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>36 / (-3) = -12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-12 + 3 = -9</p>"
    },
    {
        question: "12 * (-3 + 1) = ?",
        answer: "-24",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-3 + 1 = -2</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>12 * (-2) = -24</p>"
    },
    {
        question: "(-50 + 20) * (-2) = ?",
        answer: "60",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-50 + 20 = -30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-30) * (-2) = 60</p>"
    },
    {
        question: "80 - 12 * 5 = ?",
        answer: "20",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>12 * 5 = 60</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>80 - 60 = 20</p>"
    },
    {
        question: "99 / (2 - 13) = ?",
        answer: "-9",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>2 - 13 = -11</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>99 / (-11) = -9</p>"
    },
    {
        question: "(-11) * 3 - 7 = ?",
        answer: "-40",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>(-11) * 3 = -33</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-33 - 7 = -40</p>"
    },
    {
        question: "56 / (-4 - 4) = ?",
        answer: "-7",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-4 - 4 = -8</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>56 / (-8) = -7</p>"
    },
    {
        question: "(-10 - 10) / 10 = ?",
        answer: "-2",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-10 - 10 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-20) / 10 = -2</p>"
    },
    {
        question: "30 * (-1) + 40 = ?",
        answer: "10",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>30 * (-1) = -30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-30 + 40 = 10</p>"
    },
    {
        question: "(-12 * 3) + 50 = ?",
        answer: "14",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-12 * 3 = -36</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-36 + 50 = 14</p>"
    },
    {
        question: "7 * (-10 + 3) = ?",
        answer: "-49",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-10 + 3 = -7</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>7 * (-7) = -49</p>"
    },
    {
        question: "28 - 72 / 8 = ?",
        answer: "19",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>72 / 8 = 9</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>28 - 9 = 19</p>"
    },
    {
        question: "(-50 - 50) / (-10) = ?",
        answer: "10",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-50 - 50 = -100</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-100) / (-10) = 10</p>"
    },
    {
        question: "9 + 9 * (-9) = ?",
        answer: "-72",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>9 * (-9) = -81</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>9 + (-81) = -72</p>"
    },
    {
        question: "(-2 + 12) * 6 = ?",
        answer: "60",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-2 + 12 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>10 * 6 = 60</p>"
    },
    {
        question: "40 / (-5) - 12 = ?",
        answer: "-20",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>40 / (-5) = -8</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-8 - 12 = -20</p>"
    },
    {
        question: "(-10 * 10) + 10 = ?",
        answer: "-90",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-10 * 10 = -100</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-100 + 10 = -90</p>"
    },
    {
        question: "15 * (4 - 7) = ?",
        answer: "-45",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>4 - 7 = -3</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>15 * (-3) = -45</p>"
    },
    {
        question: "30 - (-60 / 6) = ?",
        answer: "40",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-60 / 6 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>30 - (-10) = 40</p>"
    },
    {
        question: "(19 - 9) * 9 = ?",
        answer: "90",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>19 - 9 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>10 * 9 = 90</p>"
    },
    {
        question: "1 - 20 / 2 = ?",
        answer: "-9",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>20 / 2 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>1 - 10 = -9</p>"
    },
    {
        question: "(-8 + 2) * (-8) = ?",
        answer: "48",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-8 + 2 = -6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-6) * (-8) = 48</p>"
    },
    {
        question: "12 + 12 * (-2) = ?",
        answer: "-12",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>12 * (-2) = -24</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>12 + (-24) = -12</p>"
    },
    {
        question: "(60 / (-10)) + 6 = ?",
        answer: "0",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>60 / (-10) = -6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-6 + 6 = 0</p>"
    },
    {
        question: "(-3 - 4) * 11 = ?",
        answer: "-77",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-3 - 4 = -7</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-7) * 11 = -77</p>"
    },
    {
        question: "55 / (-5) + 5 = ?",
        answer: "-6",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>55 / (-5) = -11</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-11 + 5 = -6</p>"
    },
    {
        question: "7 * (-2 - 8) = ?",
        answer: "-70",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-2 - 8 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>7 * (-10) = -70</p>"
    },
    {
        question: "20 * 4 - 100 = ?",
        answer: "-20",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>20 * 4 = 80</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>80 - 100 = -20</p>"
    },
    {
        question: "27 / (3 - 12) = ?",
        answer: "-3",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>3 - 12 = -9</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>27 / (-9) = -3</p>"
    },
    {
        question: "(-25) + 50 = ?",
        answer: "25",
        difficulty: "medium",
        category: "addition",
        explanation: "<p>เป็นการบวกระหว่างจำนวนเต็มลบและบวก ให้นำค่าสัมบูรณ์มาลบกัน (50 - 25 = 25) และใช้เครื่องหมายตามจำนวนที่มีค่าสัมบูรณ์มากกว่า (คือ 50 ซึ่งเป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>(-25) + 50 = 25</p>"
    },
    {
        question: "30 - (-15) = ?",
        answer: "45",
        difficulty: "medium",
        category: "subtraction",
        explanation: "<p><strong>หลักการ:</strong> การลบด้วยจำนวนเต็มลบ ให้เปลี่ยนเป็นการบวกด้วยจำนวนตรงข้าม</p><p><strong>ขั้นตอนที่ 1:</strong> เปลี่ยนโจทย์จาก <code class='text-red-600'>30 - (-15)</code> เป็นการบวก</p><p class='pl-4 font-mono text-blue-700'>30 + 15</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณผลบวก</p><p class='pl-4 font-mono text-blue-700'>30 + 15 = 45</p>"
    },
    {
        question: "(-12) × 11 = ?",
        answer: "-132",
        difficulty: "medium",
        category: "multiplication",
        explanation: "<p>การคูณจำนวนเต็มลบกับจำนวนเต็มบวก (เครื่องหมายต่างกัน) ผลลัพธ์จะเป็นจำนวนเต็มลบ</p><p class='pl-4 font-mono text-blue-700'>(-12) × 11 = -132</p>"
    },
    {
        question: "50 + (10 × (-2)) = ?",
        answer: "30",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> ตามลำดับการดำเนินการ ต้องคำนวณในวงเล็บ <strong>()</strong> ก่อน</p><p class='pl-4 font-mono text-blue-700'>10 × (-2) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์จากขั้นตอนแรกมาบวกกับจำนวนที่เหลือ</p><p class='pl-4 font-mono text-blue-700'>50 + (-20) = 30</p>"
    },
    {
        question: "100 - (40 ÷ 5) = ?",
        answer: "92",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บ <strong>()</strong> ก่อน</p><p class='pl-4 font-mono text-blue-700'>40 ÷ 5 = 8</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคำนวณต่อ</p><p class='pl-4 font-mono text-blue-700'>100 - 8 = 92</p>"
    },
    {
        question: "35 - 5 × 4 = ?",
        answer: "15",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>หลักการ:</strong> ต้องทำคูณ (×) และหาร (÷) ก่อน บวก (+) และลบ (-)</p><p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>5 × 4 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบออกจากตัวตั้ง</p><p class='pl-4 font-mono text-blue-700'>35 - 20 = 15</p>"
    },
    {
        question: "80 - 30 ÷ (-3) = ?",
        answer: "90",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>หลักการ:</strong> ต้องทำคูณ (×) และหาร (÷) ก่อน บวก (+) และลบ (-)</p><p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>30 ÷ (-3) = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคำนวณต่อ (ลบด้วยจำนวนลบจะกลายเป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>80 - (-10) = 80 + 10 = 90</p>"
    },
    {
        question: "12 × (10 - 15) = ?",
        answer: "-60",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บ <strong>()</strong> ก่อน</p><p class='pl-4 font-mono text-blue-700'>10 - 15 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณกับจำนวนข้างหน้า</p><p class='pl-4 font-mono text-blue-700'>12 × (-5) = -60</p>"
    },
    {
        question: "5 * (9 - 4) = ?",
        answer: "25",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>9 - 4 = 5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>5 * 5 = 25</p>"
    },
    {
        question: "(8 + (-12)) * 3 = ?",
        answer: "-12",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>8 + (-12) = -4</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-4) * 3 = -12</p>"
    },
    {
        question: "20 / (2 - 7) = ?",
        answer: "-4",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>2 - 7 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>20 / (-5) = -4</p>"
    },
    {
        question: "(-30) / (8 + 7) = ?",
        answer: "-2",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>8 + 7 = 15</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-30) / 15 = -2</p>"
    },
    {
        question: "10 + (4 * 5) = ?",
        answer: "30",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>4 * 5 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>10 + 20 = 30</p>"
    },
    {
        question: "18 - (6 * 3) = ?",
        answer: "0",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>6 * 3 = 18</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>18 - 18 = 0</p>"
    },
    {
        question: "(-7) * 2 + 10 = ?",
        answer: "-4",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>(-7) * 2 = -14</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-14 + 10 = -4</p>"
    },
    {
        question: "40 / 5 - 2 = ?",
        answer: "6",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>40 / 5 = 8</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>8 - 2 = 6</p>"
    },
    {
        question: "(5 - 15) * (-2) = ?",
        answer: "20",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>5 - 15 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-10) * (-2) = 20</p>"
    },
    {
        question: "50 + (30 / (-6)) = ?",
        answer: "45",
        difficulty: "medium",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>30 / (-6) = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>50 + (-5) = 45</p>"
    }
];
allCards.mission.hard = [
    {
        question: "50 - (8 * (2 + 3)) = ?",
        answer: "10",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>2 + 3 = 5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>8 * 5 = 40</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>50 - 40 = 10</p>"
    },
    {
        question: "(60 / (-10)) + (4 * 8) = ?",
        answer: "26",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>60 / (-10) = -6</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>4 * 8 = 32</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-6 + 32 = 26</p>"
    },
    {
        question: "((-3) * 6) - (40 / 5) = ?",
        answer: "-26",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-3) * 6 = -18</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>40 / 5 = 8</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-18 - 8 = -26</p>"
    },
    {
        question: "10 * ((-20) / 4 + 2) = ?",
        answer: "-30",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>(-20) / 4 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการบวกในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>-5 + 2 = -3</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>10 * (-3) = -30</p>"
    },
    {
        question: "(8 - 15) * (2 + 3) = ?",
        answer: "-35",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>8 - 15 = -7</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>2 + 3 = 5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>(-7) * 5 = -35</p>"
    },
    {
        question: "150 / (5 * (-1 - 4)) = ?",
        answer: "-6",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>-1 - 4 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>5 * (-5) = -25</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>150 / (-25) = -6</p>"
    },
    {
        question: "(-10 + 7) * (100 / (-10)) = ?",
        answer: "30",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-10 + 7 = -3</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>100 / (-10) = -10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>(-3) * (-10) = 30</p>"
    },
    {
        question: "30 + (15 * (-2)) - 10 = ?",
        answer: "-10",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>15 * (-2) = -30</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณจากซ้ายไปขวา</p><p class='pl-4 font-mono text-blue-700'>30 + (-30) = 0</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณต่อ</p><p class='pl-4 font-mono text-blue-700'>0 - 10 = -10</p>"
    },
    {
        question: "(200 / 10) - (5 * 5) = ?",
        answer: "-5",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>200 / 10 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>5 * 5 = 25</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>20 - 25 = -5</p>"
    },
    {
        question: "(-7 + (-8)) / 3 + 10 = ?",
        answer: "5",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-7 + (-8) = -15</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหาร</p><p class='pl-4 font-mono text-blue-700'>(-15) / 3 = -5</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>-5 + 10 = 5</p>"
    },
    {
        question: "(5 * 6) - (80 / (-8)) = ?",
        answer: "40",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>5 * 6 = 30</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>80 / (-8) = -10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>30 - (-10) = 40</p>"
    },
    {
        question: "20 * (4 - (10 / 2)) = ?",
        answer: "-20",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>10 / 2 = 5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการลบในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>4 - 5 = -1</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>20 * (-1) = -20</p>"
    },
    {
        question: "((-9) * (-5)) + (10 - 20) = ?",
        answer: "35",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-9) * (-5) = 45</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>10 - 20 = -10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>45 + (-10) = 35</p>"
    },
    {
        question: "(100 - 25) / (-3) + 5 = ?",
        answer: "-20",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>100 - 25 = 75</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหาร</p><p class='pl-4 font-mono text-blue-700'>75 / (-3) = -25</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>-25 + 5 = -20</p>"
    },
    {
        question: "7 + (48 / (2 - 8)) = ?",
        answer: "-1",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>2 - 8 = -6</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหารในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>48 / (-6) = -8</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>7 + (-8) = -1</p>"
    },
    {
        question: "(-4 * 5) + (-6 * 7) = ?",
        answer: "-62",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-4 * 5 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>-6 * 7 = -42</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-20 + (-42) = -62</p>"
    },
    {
        question: "(50 - 110) / (2 * 3) = ?",
        answer: "-10",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>50 - 110 = -60</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>2 * 3 = 6</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>-60 / 6 = -10</p>"
    },
    {
        question: "8 * (3 + (-8)) + 10 = ?",
        answer: "-30",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>3 + (-8) = -5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณ</p><p class='pl-4 font-mono text-blue-700'>8 * (-5) = -40</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>-40 + 10 = -30</p>"
    },
    {
        question: "(7 - 17) * (-1 - 1) = ?",
        answer: "20",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>7 - 17 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>-1 - 1 = -2</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>(-10) * (-2) = 20</p>"
    },
    {
        question: "90 - (100 / (4 * 5)) = ?",
        answer: "85",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>4 * 5 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหารในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>100 / 20 = 5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>90 - 5 = 85</p>"
    },
    {
        question: "(-25 * 4) + (100 - 50) = ?",
        answer: "-50",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-25 * 4 = -100</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>100 - 50 = 50</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-100 + 50 = -50</p>"
    },
    {
        question: "(12 * 5) / (2 - 5) = ?",
        answer: "-20",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>12 * 5 = 60</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>2 - 5 = -3</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>60 / (-3) = -20</p>"
    },
    {
        question: "-50 + (81 / (-9)) + 10 = ?",
        answer: "-49",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>81 / (-9) = -9</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณจากซ้ายไปขวา</p><p class='pl-4 font-mono text-blue-700'>-50 + (-9) = -59</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณต่อ</p><p class='pl-4 font-mono text-blue-700'>-59 + 10 = -49</p>"
    },
    {
        question: "(36 / (-6)) * (10 - 15) = ?",
        answer: "30",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>36 / (-6) = -6</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>10 - 15 = -5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>(-6) * (-5) = 30</p>"
    },
    {
        question: "40 * (1 - (12 / 6)) = ?",
        answer: "-40",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>12 / 6 = 2</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการลบในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>1 - 2 = -1</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>40 * (-1) = -40</p>"
    },
    {
        question: "(8 * (-4)) - (6 * (-5)) = ?",
        answer: "-2",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>8 * (-4) = -32</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>6 * (-5) = -30</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-32 - (-30) = -2</p>"
    },
    {
        question: "(49 / (-7)) + (16 * 2) = ?",
        answer: "25",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>49 / (-7) = -7</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>16 * 2 = 32</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-7 + 32 = 25</p>"
    },
    {
        question: "100 / (-5) - (20 * 3) = ?",
        answer: "-80",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>100 / (-5) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>20 * 3 = 60</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-20 - 60 = -80</p>"
    },
    {
        question: "(10 * 10) - (200 / 2) = ?",
        answer: "0",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>10 * 10 = 100</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>200 / 2 = 100</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>100 - 100 = 0</p>"
    },
    {
        question: "(-6 - 9) / (5 - 2) = ?",
        answer: "-5",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-6 - 9 = -15</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>5 - 2 = 3</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>-15 / 3 = -5</p>"
    },
    {
        question: "300 - (10 * (10 + 10)) = ?",
        answer: "100",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>10 + 10 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>10 * 20 = 200</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>300 - 200 = 100</p>"
    },
    {
        question: "((-8) * 10) / (4 * (-5)) = ?",
        answer: "4",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-8) * 10 = -80</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>4 * (-5) = -20</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>-80 / (-20) = 4</p>"
    },
    {
        question: "25 + ((-100) / 5) * 2 = ?",
        answer: "-15",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>(-100) / 5 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณ</p><p class='pl-4 font-mono text-blue-700'>-20 * 2 = -40</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>25 + (-40) = -15</p>"
    },
    {
        question: "(7 * (-7)) + (60 - 1) = ?",
        answer: "10",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>7 * (-7) = -49</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>60 - 1 = 59</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-49 + 59 = 10</p>"
    },
    {
        question: "100 / (100 / (-2) + 60) = ?",
        answer: "10",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>100 / (-2) = -50</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการบวกในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>-50 + 60 = 10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>100 / 10 = 10</p>"
    },
    {
        question: "(3 * (-3)) * (20 - 30) = ?",
        answer: "90",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>3 * (-3) = -9</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>20 - 30 = -10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>(-9) * (-10) = 90</p>"
    },
    {
        question: "500 - (20 * (10 + 5)) = ?",
        answer: "200",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>10 + 5 = 15</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>20 * 15 = 300</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>500 - 300 = 200</p>"
    },
    {
        question: "(-90 / 9) + (11 * 5) = ?",
        answer: "45",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-90 / 9 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>11 * 5 = 55</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-10 + 55 = 45</p>"
    },
    {
        question: "1 - (100 / (20 - 10)) = ?",
        answer: "-9",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>20 - 10 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหารในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>100 / 10 = 10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>1 - 10 = -9</p>"
    },
    {
        question: "((-4) * (-4)) - (10 + 10) = ?",
        answer: "-4",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-4) * (-4) = 16</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>10 + 10 = 20</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>16 - 20 = -4</p>"
    },
    {
        question: "30 / (10 - 15) * 5 = ?",
        answer: "-30",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 - 15 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหาร</p><p class='pl-4 font-mono text-blue-700'>30 / (-5) = -6</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการคูณ</p><p class='pl-4 font-mono text-blue-700'>-6 * 5 = -30</p>"
    },
    {
        question: "(21 / (-3)) + (56 / (-7)) = ?",
        answer: "-15",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>21 / (-3) = -7</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>56 / (-7) = -8</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-7 + (-8) = -15</p>"
    },
    {
        question: "4 * (50 / (-10) + 10) = ?",
        answer: "20",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>50 / (-10) = -5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการบวกในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>-5 + 10 = 5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>4 * 5 = 20</p>"
    },
    {
        question: "(10 * (-10)) / (5 * (-5)) = ?",
        answer: "4",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>10 * (-10) = -100</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>5 * (-5) = -25</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>-100 / (-25) = 4</p>"
    },
    {
        question: "(-50 * 3) + (200 - 10) = ?",
        answer: "40",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-50 * 3 = -150</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>200 - 10 = 190</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-150 + 190 = 40</p>"
    },
    {
        question: "1000 / (20 * (3 - 8)) = ?",
        answer: "-10",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>3 - 8 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>20 * (-5) = -100</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>1000 / (-100) = -10</p>"
    },
    {
        question: "(13 * (-1)) - (25 - 50) = ?",
        answer: "12",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>13 * (-1) = -13</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>25 - 50 = -25</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-13 - (-25) = 12</p>"
    },
    {
        question: "50 + (-10 * 3) / 2 = ?",
        answer: "35",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>-10 * 3 = -30</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหาร</p><p class='pl-4 font-mono text-blue-700'>-30 / 2 = -15</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>50 + (-15) = 35</p>"
    },
    {
        question: "((-7) * 9) + (36 / (-4)) = ?",
        answer: "-72",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-7) * 9 = -63</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>36 / (-4) = -9</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-63 + (-9) = -72</p>"
    },
    {
        question: "18 / (3 * (-1 - 1)) = ?",
        answer: "-3",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>-1 - 1 = -2</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>3 * (-2) = -6</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>18 / (-6) = -3</p>"
    },
    {
        question: "(22 + 23) * (2 - 4) = ?",
        answer: "-90",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>22 + 23 = 45</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>2 - 4 = -2</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>45 * (-2) = -90</p>"
    },
    {
        question: "(-11 - 9) * (8 - 3) = ?",
        answer: "-100",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-11 - 9 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>8 - 3 = 5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>(-20) * 5 = -100</p>"
    },
    {
        question: "50 - (200 / 10) + 5 = ?",
        answer: "35",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>200 / 10 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณจากซ้ายไปขวา</p><p class='pl-4 font-mono text-blue-700'>50 - 20 = 30</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณต่อ</p><p class='pl-4 font-mono text-blue-700'>30 + 5 = 35</p>"
    },
    {
        question: "(-8 - 12) / (-10 + 5) = ?",
        answer: "4",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-8 - 12 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>-10 + 5 = -5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>(-20) / (-5) = 4</p>"
    },
    {
        question: "(30 * 4) + (100 / (-5)) = ?",
        answer: "100",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>30 * 4 = 120</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>100 / (-5) = -20</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>120 + (-20) = 100</p>"
    },
    {
        question: "6 * (10 - (4 * 5)) = ?",
        answer: "-60",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>4 * 5 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการลบในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>10 - 20 = -10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>6 * (-10) = -60</p>"
    },
    {
        question: "((-70) / 10) - ((-20) / 4) = ?",
        answer: "-2",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-70) / 10 = -7</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>(-20) / 4 = -5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-7 - (-5) = -2</p>"
    },
    {
        question: "(1 + 2 + 3) * (-10) = ?",
        answer: "-60",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>1 + 2 + 3 = 6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>6 * (-10) = -60</p><p><strong>ขั้นตอนที่ 3:</strong> ไม่มี</p>"
    },
    {
        question: "100 - (10 - 20) * 5 = ?",
        answer: "150",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 - 20 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณ</p><p class='pl-4 font-mono text-blue-700'>(-10) * 5 = -50</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการลบ</p><p class='pl-4 font-mono text-blue-700'>100 - (-50) = 150</p>"
    },
    {
        question: "((-6) * 5) / (2 - 17) = ?",
        answer: "2",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-6) * 5 = -30</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>2 - 17 = -15</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>-30 / (-15) = 2</p>"
    },
    {
        question: "20 + (30 / (-15)) * 10 = ?",
        answer: "0",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>30 / (-15) = -2</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณ</p><p class='pl-4 font-mono text-blue-700'>(-2) * 10 = -20</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>20 + (-20) = 0</p>"
    },
    {
        question: "((40 - 50) * 5) - 10 = ?",
        answer: "-60",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>40 - 50 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณ</p><p class='pl-4 font-mono text-blue-700'>(-10) * 5 = -50</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการลบ</p><p class='pl-4 font-mono text-blue-700'>-50 - 10 = -60</p>"
    },
    {
        question: "(-12 / 3) + (-12 * 3) = ?",
        answer: "-40",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-12 / 3 = -4</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>-12 * 3 = -36</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-4 + (-36) = -40</p>"
    },
    {
        question: "5 * (20 - (40 / (-2))) = ?",
        answer: "200",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>40 / (-2) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการลบในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>20 - (-20) = 40</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>5 * 40 = 200</p>"
    },
    {
        question: "(100 - (-50)) / (25 - 10) = ?",
        answer: "10",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>100 - (-50) = 150</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>25 - 10 = 15</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>150 / 15 = 10</p>"
    },
    {
        question: "(-5 - 5 - 5) * 5 = ?",
        answer: "-75",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-5 - 5 - 5 = -15</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-15) * 5 = -75</p><p><strong>ขั้นตอนที่ 3:</strong> ไม่มี</p>"
    },
    {
        question: "30 - (3 * (20 - 15)) = ?",
        answer: "15",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>20 - 15 = 5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>3 * 5 = 15</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>30 - 15 = 15</p>"
    },
    {
        question: "(7 * 8) + (100 / (-25)) = ?",
        answer: "52",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>7 * 8 = 56</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>100 / (-25) = -4</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>56 + (-4) = 52</p>"
    },
    {
        question: "(30 - (10 * 2)) * 4 = ?",
        answer: "40",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>10 * 2 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการลบในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>30 - 20 = 10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>10 * 4 = 40</p>"
    },
    {
        question: "(-50 / 5) - (-100 / 10) = ?",
        answer: "0",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-50 / 5 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>-100 / 10 = -10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-10 - (-10) = 0</p>"
    },
    {
        question: "10 * (-2 - 3 - 4) = ?",
        answer: "-90",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-2 - 3 - 4 = -9</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>10 * (-9) = -90</p><p><strong>ขั้นตอนที่ 3:</strong> ไม่มี</p>"
    },
    {
        question: "80 / (4 * (-2)) + 10 = ?",
        answer: "0",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>4 * (-2) = -8</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหาร</p><p class='pl-4 font-mono text-blue-700'>80 / (-8) = -10</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>-10 + 10 = 0</p>"
    },
    {
        question: "(14 * 2) - (14 / 2) = ?",
        answer: "21",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>14 * 2 = 28</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>14 / 2 = 7</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>28 - 7 = 21</p>"
    },
    {
        question: "9 * (1 + (20 / (-4))) = ?",
        answer: "-36",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>20 / (-4) = -5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการบวกในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>1 + (-5) = -4</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>9 * (-4) = -36</p>"
    },
    {
        question: "(-8 - 7) * (-10 / 5) = ?",
        answer: "30",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-8 - 7 = -15</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>-10 / 5 = -2</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>(-15) * (-2) = 30</p>"
    },
    {
        question: "300 + (10 * (-20)) - 50 = ?",
        answer: "50",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>10 * (-20) = -200</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณจากซ้ายไปขวา</p><p class='pl-4 font-mono text-blue-700'>300 + (-200) = 100</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณต่อ</p><p class='pl-4 font-mono text-blue-700'>100 - 50 = 50</p>"
    },
    {
        question: "(-5) × (12 - 7) + 30 = ?",
        answer: "5",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>(12 - 7) = 5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณ</p><p class='pl-4 font-mono text-blue-700'>(-5) × 5 = -25</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>-25 + 30 = 5</p>"
    },
    {
        question: "(100 ÷ (-5)) - (5 × 6) = ?",
        answer: "-50",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>100 ÷ (-5) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>5 × 6 = 30</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์ทั้งสองมาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-20 - 30 = -50</p>"
    },
    {
        question: "((-40) + 15) × (18 ÷ (-9)) = ?",
        answer: "50",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-40) + 15 = -25</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>18 ÷ (-9) = -2</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน (ลบคูณลบได้บวก)</p><p class='pl-4 font-mono text-blue-700'>(-25) × (-2) = 50</p>"
    },
    {
        question: "-200 ÷ (4 × (-5)) - 10 = ?",
        answer: "0",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>4 × (-5) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหาร</p><p class='pl-4 font-mono text-blue-700'>-200 ÷ (-20) = 10</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการลบ</p><p class='pl-4 font-mono text-blue-700'>10 - 10 = 0</p>"
    },
    {
        question: "(3 × (-15)) + (80 ÷ (-4)) = ?",
        answer: "-65",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>3 × (-15) = -45</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>80 ÷ (-4) = -20</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>(-45) + (-20) = -65</p>"
    },
    {
        question: "(5 * (-4)) + (6 * 3) = ?",
        answer: "-2",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บแรก</p><p class='pl-4 font-mono text-blue-700'>5 * (-4) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บที่สอง</p><p class='pl-4 font-mono text-blue-700'>6 * 3 = 18</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-20 + 18 = -2</p>"
    },
    {
        question: "(40 / -8) - (10 / 2) = ?",
        answer: "-10",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บแรก</p><p class='pl-4 font-mono text-blue-700'>40 / (-8) = -5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บที่สอง</p><p class='pl-4 font-mono text-blue-700'>10 / 2 = 5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-5 - 5 = -10</p>"
    },
    {
        question: "((-2) - 8) * (5 - 7) = ?",
        answer: "20",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บแรก</p><p class='pl-4 font-mono text-blue-700'>(-2) - 8 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บที่สอง</p><p class='pl-4 font-mono text-blue-700'>5 - 7 = -2</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>(-10) * (-2) = 20</p>"
    },
    {
        question: "100 - (5 * (10 + 2)) = ?",
        answer: "40",
        difficulty: "hard",
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>10 + 2 = 12</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>5 * 12 = 60</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>100 - 60 = 40</p>"
    }
];    
allCards.puzzle.easy = [
    {
        question: "15 + (-7) = ?",
        choices: [8, -8, 22, -22],
        answer: 8,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (15 - 7 = 8) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (15 เป็นบวก)</p>"
    },
    {
        question: "(-18) + 10 = ?",
        choices: [8, -8, 28, -28],
        answer: -8,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (18 - 10 = 8) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (-18 เป็นลบ)</p>"
    },
    {
        question: "(-9) + (-9) = ?",
        choices: [0, 18, -18, 1],
        answer: -18,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>การบวกจำนวนลบกับจำนวนลบ ให้นำค่าสัมบูรณ์มาบวกกัน (9 + 9 = 18) แล้วใส่เครื่องหมายลบ</p>"
    },
    {
        question: "25 + (-5) = ?",
        choices: [20, -20, 30, -30],
        answer: 20,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (25 - 5 = 20) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (25 เป็นบวก)</p>"
    },
    {
        question: "17 + (-17) = ?",
        choices: [0, 34, -34, 1],
        answer: 0,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>การบวกจำนวนที่เท่ากันแต่เครื่องหมายตรงข้ามกันจะได้ 0</p>"
    },
    {
        question: "11 + (-20) = ?",
        choices: [9, -9, 31, -31],
        answer: -9,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (20 - 11 = 9) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (-20 เป็นลบ)</p>"
    },
    {
        question: "15 - 20 = ?",
        choices: [5, -5, 35, -35],
        answer: -5,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบที่ตัวตั้งมีค่าน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p>"
    },
    {
        question: "13 - (-7) = ?",
        choices: [20, -20, 6, -6],
        answer: 20,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบด้วยจำนวนลบ คือการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>13 - (-7) = 13 + 7 = 20</p>"
    },
    {
        question: "(-10) - 5 = ?",
        choices: [15, -15, 5, -5],
        answer: -15,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-10) - 5 = (-10) + (-5) = -15</p>"
    },
    {
        question: "(-20) - (-10) = ?",
        choices: [10, -10, 30, -30],
        answer: -10,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-20) - (-10) = (-20) + 10 = -10</p>"
    },
    {
        question: "8 * (-4) = ?",
        choices: [32, -32, 4, 12],
        answer: -32,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนบวกกับลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-6) * (-6) = ?",
        choices: [36, -36, -12, 0],
        answer: 36,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนลบกับลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "12 * (-3) = ?",
        choices: [36, -36, 9, 15],
        answer: -36,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนบวกกับลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-10) * 1 = ?",
        choices: [10, -10, -9, 11],
        answer: -10,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>จำนวนใดๆ คูณด้วย 1 จะได้จำนวนนั้น</p>"
    },
    {
        question: "(-30) / 6 = ?",
        choices: [5, -5, 24, 36],
        answer: -5,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "25 / (-5) = ?",
        choices: [5, -5, 30, 20],
        answer: -5,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-40) / (-8) = ?",
        choices: [5, -5, 32, 48],
        answer: 5,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "(-10) / 10 = ?",
        choices: [1, -1, 0, 100],
        answer: -1,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "30 + (-15) = ?",
        choices: [15, -15, 45, -45],
        answer: 15,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (30 - 15 = 15) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (30 เป็นบวก)</p>"
    },
    {
        question: "(-22) + 12 = ?",
        choices: [10, -10, 34, -34],
        answer: -10,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (22 - 12 = 10) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (-22 เป็นลบ)</p>"
    },
    {
        question: "2 - 15 = ?",
        choices: [13, -13, 17, -17],
        answer: -13,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบที่ตัวตั้งมีค่าน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p>"
    },
    {
        question: "18 - (-2) = ?",
        choices: [20, -20, 16, -16],
        answer: 20,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบด้วยจำนวนลบ คือการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>18 - (-2) = 18 + 2 = 20</p>"
    },
    {
        question: "(-7) * 5 = ?",
        choices: [35, -35, -2, 12],
        answer: -35,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนลบกับบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-9) * (-3) = ?",
        choices: [27, -27, -12, -6],
        answer: 27,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนลบกับลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "(-36) / 4 = ?",
        choices: [9, -9, 40, 32],
        answer: -9,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "48 / (-6) = ?",
        choices: [8, -8, 54, 42],
        answer: -8,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "4 + (-11) = ?",
        choices: [7, -7, 15, -15],
        answer: -7,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (11 - 4 = 7) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (-11 เป็นลบ)</p>"
    },
    {
        question: "(-16) + 6 = ?",
        choices: [10, -10, 22, -22],
        answer: -10,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (16 - 6 = 10) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (-16 เป็นลบ)</p>"
    },
    {
        question: "(-13) + (-5) = ?",
        choices: [8, -8, 18, -18],
        answer: -18,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>การบวกจำนวนลบกับจำนวนลบ ให้นำค่าสัมบูรณ์มาบวกกัน (13 + 5 = 18) แล้วใส่เครื่องหมายลบ</p>"
    },
    {
        question: "5 - (-15) = ?",
        choices: [20, -20, 10, -10],
        answer: 20,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบด้วยจำนวนลบ คือการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>5 - (-15) = 5 + 15 = 20</p>"
    },
    {
        question: "(-8) - 8 = ?",
        choices: [0, 16, -16, 1],
        answer: -16,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-8) - 8 = (-8) + (-8) = -16</p>"
    },
    {
        question: "(-25) - (-5) = ?",
        choices: [20, -20, 30, -30],
        answer: -20,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-25) - (-5) = (-25) + 5 = -20</p>"
    },
    {
        question: "7 * (-7) = ?",
        choices: [49, -49, 0, 14],
        answer: -49,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนบวกกับลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-8) * (-5) = ?",
        choices: [40, -40, -13, 3],
        answer: 40,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนลบกับลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "11 * (-2) = ?",
        choices: [22, -22, 9, 13],
        answer: -22,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนบวกกับลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-49) / 7 = ?",
        choices: [7, -7, 56, 42],
        answer: -7,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "60 / (-10) = ?",
        choices: [6, -6, 70, 50],
        answer: -6,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-50) / (-2) = ?",
        choices: [25, -25, 52, 48],
        answer: 25,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "(-2) + 20 = ?",
        choices: [18, -18, 22, -22],
        answer: 18,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (20 - 2 = 18) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (20 เป็นบวก)</p>"
    },
    {
        question: "9 - 19 = ?",
        choices: [10, -10, 28, -28],
        answer: -10,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบที่ตัวตั้งมีค่าน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p>"
    },
    {
        question: "1 * (-19) = ?",
        choices: [19, -19, -18, 20],
        answer: -19,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนบวกกับลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-21) / 3 = ?",
        choices: [7, -7, 24, 18],
        answer: -7,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-14) + (-3) = ?",
        choices: [11, -11, 17, -17],
        answer: -17,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>การบวกจำนวนลบกับจำนวนลบ ให้นำค่าสัมบูรณ์มาบวกกัน (14 + 3 = 17) แล้วใส่เครื่องหมายลบ</p>"
    },
    {
        question: "7 - (-11) = ?",
        choices: [18, -18, 4, -4],
        answer: 18,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบด้วยจำนวนลบ คือการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>7 - (-11) = 7 + 11 = 18</p>"
    },
    {
        question: "(-12) * 2 = ?",
        choices: [24, -24, -10, -14],
        answer: -24,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนลบกับบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "33 / (-3) = ?",
        choices: [11, -11, 30, 36],
        answer: -11,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "30 + (-30) = ?",
        choices: [0, 60, -60, 1],
        answer: 0,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>การบวกจำนวนที่เท่ากันแต่เครื่องหมายตรงข้ามกันจะได้ 0</p>"
    },
    {
        question: "(-1) - 10 = ?",
        choices: [9, -9, 11, -11],
        answer: -11,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-1) - 10 = (-1) + (-10) = -11</p>"
    },
    {
        question: "(-5) * (-10) = ?",
        choices: [50, -50, -15, 5],
        answer: 50,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนลบกับลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "(-100) / (-10) = ?",
        choices: [10, -10, 110, 90],
        answer: 10,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "22 + (-8) = ?",
        choices: [14, -14, 30, -30],
        answer: 14,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (22 - 8 = 14) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (22 เป็นบวก)</p>"
    },
    {
        question: "6 - 16 = ?",
        choices: [10, -10, 22, -22],
        answer: -10,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบที่ตัวตั้งมีค่าน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p>"
    },
    {
        question: "13 * (-1) = ?",
        choices: [13, -13, 12, 14],
        answer: -13,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนใดๆ ด้วย -1 จะได้จำนวนตรงข้าม</p>"
    },
    {
        question: "0 / (-15) = ?",
        choices: [0, 15, -15, 1],
        answer: 0,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>0 หารด้วยจำนวนใดๆ (ที่ไม่ใช่ 0) ได้ 0</p>"
    },
    {
        question: "(-25) + 15 = ?",
        choices: [10, -10, 40, -40],
        answer: -10,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (25 - 15 = 10) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (-25 เป็นลบ)</p>"
    },
    {
        question: "(-12) - (-12) = ?",
        choices: [0, 24, -24, 1],
        answer: 0,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบด้วยจำนวนเดียวกัน ผลลัพธ์เป็น 0</p>"
    },
    {
        question: "(-9) * 2 = ?",
        choices: [18, -18, -7, -11],
        answer: -18,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนลบกับบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-16) / 2 = ?",
        choices: [8, -8, 18, 14],
        answer: -8,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "19 + (-2) = ?",
        choices: [17, -17, 21, -21],
        answer: 17,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (19 - 2 = 17) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (19 เป็นบวก)</p>"
    },
    {
        question: "3 - (-3) = ?",
        choices: [0, 6, -6, 9],
        answer: 6,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบด้วยจำนวนลบ คือการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>3 - (-3) = 3 + 3 = 6</p>"
    },
    {
        question: "(-11) * (-3) = ?",
        choices: [33, -33, -14, -8],
        answer: 33,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนลบกับลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "28 / (-7) = ?",
        choices: [4, -4, 35, 21],
        answer: -4,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-30) + 5 = ?",
        choices: [25, -25, 35, -35],
        answer: -25,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (30 - 5 = 25) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (-30 เป็นลบ)</p>"
    },
    {
        question: "(-2) - 18 = ?",
        choices: [16, -16, 20, -20],
        answer: -20,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-2) - 18 = (-2) + (-18) = -20</p>"
    },
    {
        question: "15 * (-2) = ?",
        choices: [30, -30, 13, 17],
        answer: -30,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนบวกกับลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-60) / (-6) = ?",
        choices: [10, -10, 66, 54],
        answer: 10,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "(-1) + (-19) = ?",
        choices: [20, -20, 18, -18],
        answer: -20,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>การบวกจำนวนลบกับจำนวนลบ ให้นำค่าสัมบูรณ์มาบวกกัน (1 + 19 = 20) แล้วใส่เครื่องหมายลบ</p>"
    },
    {
        question: "1 - (-1) = ?",
        choices: [0, 2, -2, 1],
        answer: 2,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบด้วยจำนวนลบ คือการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>1 - (-1) = 1 + 1 = 2</p>"
    },
    {
        question: "(-20) * 0 = ?",
        choices: [0, 20, -20, 1],
        answer: 0,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>จำนวนใดๆ คูณด้วย 0 ได้ 0</p>"
    },
    {
        question: "44 / (-11) = ?",
        choices: [4, -4, 55, 33],
        answer: -4,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-12) + 11 = ?",
        choices: [1, -1, 23, -23],
        answer: -1,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (12 - 11 = 1) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (-12 เป็นลบ)</p>"
    },
    {
        question: "(-4) - (-8) = ?",
        choices: [4, -4, 12, -12],
        answer: 4,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-4) - (-8) = (-4) + 8 = 4</p>"
    },
    {
        question: "6 * (-9) = ?",
        choices: [54, -54, -3, 15],
        answer: -54,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนบวกกับลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-32) / 8 = ?",
        choices: [4, -4, 40, 24],
        answer: -4,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-5) + 12 = ?",
        choices: [7, -7, 17, -17],
        answer: 7,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์ของทั้งสองจำนวนมาลบกัน (12 - 5 = 7) และใช้เครื่องหมายตามตัวที่มีค่าสัมบูรณ์มากกว่า (12 เป็นบวก)</p>"
    },
    {
        question: "10 - (-4) = ?",
        choices: [6, -6, 14, -14],
        answer: 14,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบด้วยจำนวนลบ คือการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>10 - (-4) = 10 + 4 = 14</p>"
    },
    {
        question: "(-8) × 3 = ?",
        choices: [-24, 24, -5, 11],
        answer: -24,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนที่มีเครื่องหมายต่างกัน (ลบ × บวก) ผลลัพธ์จะเป็นจำนวนลบ</p><p class='pl-4 font-mono text-blue-700'>8 × 3 = 24</p><p>ดังนั้นคำตอบคือ -24</p>"
    },
    {
        question: "(-20) ÷ (-5) = ?",
        choices: [4, -4, 25, -15],
        answer: 4,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนที่มีเครื่องหมายเหมือนกัน (ลบ ÷ ลบ) ผลลัพธ์จะเป็นจำนวนบวก</p><p class='pl-4 font-mono text-blue-700'>20 ÷ 5 = 4</p>"
    },
    {
        question: "12 + (-5) = ?",
        choices: [7, -7, 17, -17],
        answer: 7,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (12 - 5 = 7) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (12 เป็นบวก)</p>"
    },
    {
        question: "(-8) + 10 = ?",
        choices: [2, -2, 18, -18],
        answer: 2,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (10 - 8 = 2) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (10 เป็นบวก)</p>"
    },
    {
        question: "(-7) + (-6) = ?",
        choices: [13, -13, 1, -1],
        answer: -13,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>การบวกจำนวนลบกับจำนวนลบ ให้นำค่าสัมบูรณ์มาบวกกัน (7 + 6 = 13) แล้วใส่เครื่องหมายลบ</p>"
    },
    {
        question: "20 + (-10) = ?",
        choices: [10, -10, 30, -30],
        answer: 10,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (20 - 10 = 10) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (20 เป็นบวก)</p>"
    },
    {
        question: "(-14) + 14 = ?",
        choices: [0, 28, -28, 1],
        answer: 0,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>การบวกจำนวนที่เท่ากันแต่เครื่องหมายตรงข้ามกันจะได้ 0</p>"
    },
    {
        question: "9 + (-15) = ?",
        choices: [6, -6, 24, -24],
        answer: -6,
        difficulty: 'easy',
        category: 'addition',
        explanation: "<p>นำค่าสัมบูรณ์มาลบกัน (15 - 9 = 6) และใช้เครื่องหมายของตัวที่ค่าสัมบูรณ์มากกว่า (-15 เป็นลบ)</p>"
    },
    {
        question: "10 - 12 = ?",
        choices: [2, -2, 22, -22],
        answer: -2,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบที่ตัวตั้งมีค่าน้อยกว่าตัวลบ ผลลัพธ์จะติดลบ</p>"
    },
    {
        question: "9 - (-5) = ?",
        choices: [14, -14, 4, -4],
        answer: 14,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>การลบด้วยจำนวนลบ คือการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>9 - (-5) = 9 + 5 = 14</p>"
    },
    {
        question: "(-11) - 4 = ?",
        choices: [15, -15, 7, -7],
        answer: -15,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-11) - 4 = (-11) + (-4) = -15</p>"
    },
    {
        question: "(-14) - (-7) = ?",
        choices: [7, -7, 21, -21],
        answer: -7,
        difficulty: 'easy',
        category: 'subtraction',
        explanation: "<p>เปลี่ยนการลบเป็นการบวกด้วยจำนวนตรงข้าม</p><p class='pl-4 font-mono text-blue-700'>(-14) - (-7) = (-14) + 7 = -7</p>"
    },
    {
        question: "6 * (-5) = ?",
        choices: [30, -30, 1, -1],
        answer: -30,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนบวกกับลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-7) * (-4) = ?",
        choices: [28, -28, -11, 3],
        answer: 28,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนลบกับลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "10 * (-2) = ?",
        choices: [20, -20, 8, 12],
        answer: -20,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>การคูณจำนวนบวกกับลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-8) * 0 = ?",
        choices: [0, 8, -8, 1],
        answer: 0,
        difficulty: 'easy',
        category: 'multiplication',
        explanation: "<p>จำนวนใดๆ คูณด้วย 0 ได้ 0</p>"
    },
    {
        question: "(-20) / 5 = ?",
        choices: [4, -4, 25, 15],
        answer: -4,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนบวก ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "18 / (-3) = ?",
        choices: [6, -6, 21, 15],
        answer: -6,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนบวกด้วยจำนวนลบ ผลลัพธ์เป็นลบ</p>"
    },
    {
        question: "(-24) / (-6) = ?",
        choices: [4, -4, 18, 30],
        answer: 4,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>การหารจำนวนลบด้วยจำนวนลบ ผลลัพธ์เป็นบวก</p>"
    },
    {
        question: "0 / (-5) = ?",
        choices: [0, 5, -5, 1],
        answer: 0,
        difficulty: 'easy',
        category: 'division',
        explanation: "<p>0 หารด้วยจำนวนใดๆ (ที่ไม่ใช่ 0) ได้ 0</p>"
    }
];
allCards.puzzle.medium = [
    {
        question: "20 + 6 * (-2) = ?",
        choices: [8, -8, -28, 28],
        answer: 8,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>6 * (-2) = -12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>20 + (-12) = 8</p>"
    },
    {
        question: "(15 - 5) * 4 = ?",
        choices: [40, -40, 20, -20],
        answer: 40,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>15 - 5 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>10 * 4 = 40</p>"
    },
    {
        question: "(-40 / 8) + 10 = ?",
        choices: [5, -5, 15, -15],
        answer: 5,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>-40 / 8 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-5 + 10 = 5</p>"
    },
    {
        question: "16 - (20 / (-4)) = ?",
        choices: [21, 11, -1, 1],
        answer: 21,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>20 / (-4) = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>16 - (-5) = 21</p>"
    },
    {
        question: "7 * (2 - 9) = ?",
        choices: [49, -49, -7, 7],
        answer: -49,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>2 - 9 = -7</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>7 * (-7) = -49</p>"
    },
    {
        question: "(-10 + 4) * 6 = ?",
        choices: [36, -36, -24, 24],
        answer: -36,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-10 + 4 = -6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-6) * 6 = -36</p>"
    },
    {
        question: "42 / (1 - 8) = ?",
        choices: [6, -6, -7, 7],
        answer: -6,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>1 - 8 = -7</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>42 / (-7) = -6</p>"
    },
    {
        question: "25 - 5 * 6 = ?",
        choices: [120, -5, 5, -120],
        answer: -5,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>5 * 6 = 30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>25 - 30 = -5</p>"
    },
    {
        question: "18 + (36 / (-9)) = ?",
        choices: [14, -14, -6, 6],
        answer: 14,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>36 / (-9) = -4</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>18 + (-4) = 14</p>"
    },
    {
        question: "(-9 * 4) - 10 = ?",
        choices: [-46, 26, -26, 46],
        answer: -46,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>-9 * 4 = -36</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-36 - 10 = -46</p>"
    },
    {
        question: "(30 - 60) / 3 = ?",
        choices: [10, -10, -30, 30],
        answer: -10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>30 - 60 = -30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-30) / 3 = -10</p>"
    },
    {
        question: "100 / (20 + 5) = ?",
        choices: [4, -4, 25, -25],
        answer: 4,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>20 + 5 = 25</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>100 / 25 = 4</p>"
    },
    {
        question: "12 + (-2) * 8 = ?",
        choices: [-4, 4, 80, -80],
        answer: -4,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>(-2) * 8 = -16</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>12 + (-16) = -4</p>"
    },
    {
        question: "(22 - 2) * (-3) = ?",
        choices: [60, -60, -66, 66],
        answer: -60,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>22 - 2 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>20 * (-3) = -60</p>"
    },
    {
        question: "48 / (-6) + 2 = ?",
        choices: [6, -6, -10, 10],
        answer: -6,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>48 / (-6) = -8</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-8 + 2 = -6</p>"
    },
    {
        question: "50 - (10 * 6) = ?",
        choices: [10, -10, 240, -240],
        answer: -10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 * 6 = 60</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>50 - 60 = -10</p>"
    },
    {
        question: "(-5 - 15) / 4 = ?",
        choices: [5, -5, -80, 80],
        answer: -5,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-5 - 15 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-20) / 4 = -5</p>"
    },
    {
        question: "70 + (40 / (-2)) = ?",
        choices: [50, -50, -55, 55],
        answer: 50,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>40 / (-2) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>70 + (-20) = 50</p>"
    },
    {
        question: "3 * (10 - 20) = ?",
        choices: [30, -30, -10, 10],
        answer: -30,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 - 20 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>3 * (-10) = -30</p>"
    },
    {
        question: "80 / (-8) - 10 = ?",
        choices: [0, -20, 20, -8],
        answer: -20,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>80 / (-8) = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-10 - 10 = -20</p>"
    },
    {
        question: "(-20 + 5) * 2 = ?",
        choices: [30, -30, -10, 10],
        answer: -30,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-20 + 5 = -15</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-15) * 2 = -30</p>"
    },
    {
        question: "1 - 2 * 10 = ?",
        choices: [19, -19, -10, 10],
        answer: -19,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>2 * 10 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>1 - 20 = -19</p>"
    },
    {
        question: "35 / (2 + 3) = ?",
        choices: [7, -7, 5, -5],
        answer: 7,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>2 + 3 = 5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>35 / 5 = 7</p>"
    },
    {
        question: "9 + 21 / (-3) = ?",
        choices: [2, -2, -10, 10],
        answer: 2,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>21 / (-3) = -7</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>9 + (-7) = 2</p>"
    },
    {
        question: "(-11 + 1) * 5 = ?",
        choices: [50, -50, -4, 4],
        answer: -50,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-11 + 1 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-10) * 5 = -50</p>"
    },
    {
        question: "32 - 4 * 9 = ?",
        choices: [4, -4, 252, -252],
        answer: -4,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>4 * 9 = 36</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>32 - 36 = -4</p>"
    },
    {
        question: "(-50 / 10) - 5 = ?",
        choices: [10, -10, 0, -5],
        answer: -10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>-50 / 10 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-5 - 5 = -10</p>"
    },
    {
        question: "(14 - (-6)) * 2 = ?",
        choices: [40, 16, -40, -16],
        answer: 40,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>14 - (-6) = 20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>20 * 2 = 40</p>"
    },
    {
        question: "27 + (9 * (-3)) = ?",
        choices: [0, 54, -54, 18],
        answer: 0,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>9 * (-3) = -27</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>27 + (-27) = 0</p>"
    },
    {
        question: "81 / (3 - 12) = ?",
        choices: [9, -9, -27, 27],
        answer: -9,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>3 - 12 = -9</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>81 / (-9) = -9</p>"
    },
    {
        question: "13 - 3 * 5 = ?",
        choices: [2, -2, 50, -50],
        answer: -2,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>3 * 5 = 15</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>13 - 15 = -2</p>"
    },
    {
        question: "(-6 + 18) / 2 = ?",
        choices: [6, -6, 9, -9],
        answer: 6,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-6 + 18 = 12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>12 / 2 = 6</p>"
    },
    {
        question: "(-8 * 5) + 30 = ?",
        choices: [10, -10, -160, 160],
        answer: -10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>-8 * 5 = -40</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-40 + 30 = -10</p>"
    },
    {
        question: "100 - (100 / 2) = ?",
        choices: [50, 0, 150, 100],
        answer: 50,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>100 / 2 = 50</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>100 - 50 = 50</p>"
    },
    {
        question: "6 * (-5 - 5) = ?",
        choices: [60, -60, -25, 25],
        answer: -60,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-5 - 5 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>6 * (-10) = -60</p>"
    },
    {
        question: "49 / (-7) + 7 = ?",
        choices: [0, 14, -14, -49],
        answer: 0,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>49 / (-7) = -7</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-7 + 7 = 0</p>"
    },
    {
        question: "(-4 - 8) * 3 = ?",
        choices: [36, -36, -20, 20],
        answer: -36,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-4 - 8 = -12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-12) * 3 = -36</p>"
    },
    {
        question: "20 + 30 / (-5) = ?",
        choices: [14, -14, -10, 10],
        answer: 14,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>30 / (-5) = -6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>20 + (-6) = 14</p>"
    },
    {
        question: "(100 / (-5)) + 25 = ?",
        choices: [5, -5, 45, -45],
        answer: 5,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>100 / (-5) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-20 + 25 = 5</p>"
    },
    {
        question: "8 * 4 - 35 = ?",
        choices: [3, -3, -8, 8],
        answer: -3,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>8 * 4 = 32</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>32 - 35 = -3</p>"
    },
    {
        question: "(20 - (-10)) / (-3) = ?",
        choices: [10, -10, -3, 3],
        answer: -10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>20 - (-10) = 30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>30 / (-3) = -10</p>"
    },
    {
        question: "12 * (-5) + 70 = ?",
        choices: [10, -10, 60, -60],
        answer: 10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>12 * (-5) = -60</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-60 + 70 = 10</p>"
    },
    {
        question: "50 - (6 * 10) = ?",
        choices: [10, -10, 440, -440],
        answer: -10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>6 * 10 = 60</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>50 - 60 = -10</p>"
    },
    {
        question: "64 / (-8) + 16 = ?",
        choices: [8, -8, 24, -24],
        answer: 8,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>64 / (-8) = -8</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-8 + 16 = 8</p>"
    },
    {
        question: "5 * (-12 + 2) = ?",
        choices: [50, -50, -70, 70],
        answer: -50,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-12 + 2 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>5 * (-10) = -50</p>"
    },
    {
        question: "45 - (100 / (-10)) = ?",
        choices: [55, 35, -55, -35],
        answer: 55,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>100 / (-10) = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>45 - (-10) = 55</p>"
    },
    {
        question: "(-15 + 5) * 6 = ?",
        choices: [60, -60, -120, 120],
        answer: -60,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-15 + 5 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-10) * 6 = -60</p>"
    },
    {
        question: "14 * 2 - 30 = ?",
        choices: [2, -2, -28, 28],
        answer: -2,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>14 * 2 = 28</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>28 - 30 = -2</p>"
    },
    {
        question: "70 / (30 - 20) = ?",
        choices: [7, -7, 10, -10],
        answer: 7,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>30 - 20 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>70 / 10 = 7</p>"
    },
    {
        question: "-50 + (10 * 7) = ?",
        choices: [20, -20, 120, -120],
        answer: 20,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 * 7 = 70</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-50 + 70 = 20</p>"
    },
    {
        question: "(40 - 80) / 4 = ?",
        choices: [10, -10, 20, -20],
        answer: -10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>40 - 80 = -40</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-40) / 4 = -10</p>"
    },
    {
        question: "11 * 4 - 50 = ?",
        choices: [6, -6, 44, -44],
        answer: -6,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>11 * 4 = 44</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>44 - 50 = -6</p>"
    },
    {
        question: "30 + (80 / (-4)) = ?",
        choices: [10, -10, 50, -50],
        answer: 10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>80 / (-4) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>30 + (-20) = 10</p>"
    },
    {
        question: "(-9) * (20 - 10) = ?",
        choices: [90, -90, -270, 270],
        answer: -90,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>20 - 10 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-9) * 10 = -90</p>"
    },
    {
        question: "54 / (-9) - 1 = ?",
        choices: [7, -7, -5, 5],
        answer: -7,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>54 / (-9) = -6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-6 - 1 = -7</p>"
    },
    {
        question: "(-30 + 10) * 4 = ?",
        choices: [80, -80, -160, 160],
        answer: -80,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-30 + 10 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-20) * 4 = -80</p>"
    },
    {
        question: "121 / (5 + 6) = ?",
        choices: [11, -11, 21, -21],
        answer: 11,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>5 + 6 = 11</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>121 / 11 = 11</p>"
    },
    {
        question: "10 * (-3) - 20 = ?",
        choices: [50, -50, -10, 10],
        answer: -50,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>10 * (-3) = -30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-30 - 20 = -50</p>"
    },
    {
        question: "72 / (1 - 10) = ?",
        choices: [8, -8, 9, -9],
        answer: -8,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>1 - 10 = -9</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>72 / (-9) = -8</p>"
    },
    {
        question: "22 - 3 * 8 = ?",
        choices: [2, -2, 152, -152],
        answer: -2,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>3 * 8 = 24</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>22 - 24 = -2</p>"
    },
    {
        question: "(-60 / 12) * 5 = ?",
        choices: [25, -25, -1, 1],
        answer: -25,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-60 / 12 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-5) * 5 = -25</p>"
    },
    {
        question: "40 + (5 * (-10)) = ?",
        choices: [10, -10, -350, 350],
        answer: -10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>5 * (-10) = -50</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>40 + (-50) = -10</p>"
    },
    {
        question: "(-200 + 100) / 10 = ?",
        choices: [10, -10, -30, 30],
        answer: -10,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-200 + 100 = -100</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-100) / 10 = -10</p>"
    },
    {
        question: "28 / (-4) + 14 = ?",
        choices: [7, -7, 21, -21],
        answer: 7,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>28 / (-4) = -7</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-7 + 14 = 7</p>"
    },
    {
        question: "15 * (-2 + 1) = ?",
        choices: [15, -15, -28, 28],
        answer: -15,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-2 + 1 = -1</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>15 * (-1) = -15</p>"
    },
    {
        question: "(-60 + 30) * (-2) = ?",
        choices: [60, -60, -180, 180],
        answer: 60,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-60 + 30 = -30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-30) * (-2) = 60</p>"
    },
    {
        question: "90 - 15 * 4 = ?",
        choices: [30, -30, 300, -300],
        answer: 30,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>15 * 4 = 60</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>90 - 60 = 30</p>"
    },
    {
        question: "88 / (2 - 24) = ?",
        choices: [4, -4, 22, -22],
        answer: -4,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>2 - 24 = -22</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>88 / (-22) = -4</p>"
    },
    {
        question: "(-12) * 4 - 2 = ?",
        choices: [50, -50, 46, -46],
        answer: -50,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>(-12) * 4 = -48</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-48 - 2 = -50</p>"
    },
    {
        question: "63 / (-3 - 4) = ?",
        choices: [9, -9, -21, 21],
        answer: -9,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-3 - 4 = -7</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>63 / (-7) = -9</p>"
    },
    {
        question: "(-20 - 20) / 10 = ?",
        choices: [4, -4, 2, -2],
        answer: -4,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-20 - 20 = -40</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-40) / 10 = -4</p>"
    },
    {
        question: "50 * (-1) + 60 = ?",
        choices: [10, -10, 110, -110],
        answer: 10,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>50 * (-1) = -50</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-50 + 60 = 10</p>"
    },
    {
        question: "(-15 * 2) + 40 = ?",
        choices: [10, -10, 70, -70],
        answer: 10,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-15 * 2 = -30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-30 + 40 = 10</p>"
    },
    {
        question: "9 * (-10 + 5) = ?",
        choices: [45, -45, -135, 135],
        answer: -45,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-10 + 5 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>9 * (-5) = -45</p>"
    },
    {
        question: "33 - 54 / 6 = ?",
        choices: [24, -24, 3.5, -3.5],
        answer: 24,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>54 / 6 = 9</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>33 - 9 = 24</p>"
    },
    {
        question: "(-100 - 20) / (-12) = ?",
        choices: [10, -10, 12, -12],
        answer: 10,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-100 - 20 = -120</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-120) / (-12) = 10</p>"
    },
    {
        question: "8 + 8 * (-8) = ?",
        choices: [56, -56, -128, 128],
        answer: -56,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>8 * (-8) = -64</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>8 + (-64) = -56</p>"
    },
    {
        question: "(-3 + 15) * 4 = ?",
        choices: [48, -48, 12, -12],
        answer: 48,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-3 + 15 = 12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>12 * 4 = 48</p>"
    },
    {
        question: "50 / (-5) - 15 = ?",
        choices: [25, -25, 5, -5],
        answer: -25,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>50 / (-5) = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>-10 - 15 = -25</p>"
    },
    {
        question: "(-11 * 10) + 10 = ?",
        choices: [100, -100, 0, -120],
        answer: -100,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-11 * 10 = -110</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-110 + 10 = -100</p>"
    },
    {
        question: "16 * (2 - 6) = ?",
        choices: [64, -64, -32, 32],
        answer: -64,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>2 - 6 = -4</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>16 * (-4) = -64</p>"
    },
    {
        question: "40 - (-50 / 5) = ?",
        choices: [50, 30, -50, -30],
        answer: 50,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-50 / 5 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>40 - (-10) = 50</p>"
    },
    {
        question: "(18 - 8) * 8 = ?",
        choices: [80, -80, 10, -10],
        answer: 80,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>18 - 8 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>10 * 8 = 80</p>"
    },
    {
        question: "5 - 30 / 3 = ?",
        choices: [5, -5, -8.33, 8.33],
        answer: -5,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการหารก่อน</p><p class='pl-4 font-mono text-blue-700'>30 / 3 = 10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>5 - 10 = -5</p>"
    },
    {
        question: "(-9 + 3) * (-7) = ?",
        choices: [42, -42, 84, -84],
        answer: 42,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-9 + 3 = -6</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-6) * (-7) = 42</p>"
    },
    {
        question: "15 + 15 * (-2) = ?",
        choices: [15, -15, -60, 60],
        answer: -15,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>15 * (-2) = -30</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>15 + (-30) = -15</p>"
    },
    {
        question: "(50 / (-10)) + 5 = ?",
        choices: [0, 10, -10, -20],
        answer: 0,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>50 / (-10) = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-5 + 5 = 0</p>"
    },
    {
        question: "(-4 - 6) * 10 = ?",
        choices: [100, -100, 20, -20],
        answer: -100,
        difficulty: 'medium',
        category: "order_of_operations",
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>-4 - 6 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>(-10) * 10 = -100</p>"
    },
    {
        question: "(8 - 12) × 5 = ?",
        choices: [-20, 20, -16, -28],
        answer: -20,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>8 - 12 = -4</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>-4 × 5 = -20</p>"
    },
    {
        question: "30 ÷ ((-2) - 3) = ?",
        choices: [-6, 6, -10, 10],
        answer: -6,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>(-2) - 3 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>30 ÷ (-5) = -6</p>"
    },
    {
        question: "50 - 10 × 2 = ?",
        choices: [30, 80, 40, 60],
        answer: 30,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>หลักการ:</strong> ต้องคำนวณการคูณก่อนการลบ</p><p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณ</p><p class='pl-4 font-mono text-blue-700'>10 × 2 = 20</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>50 - 20 = 30</p>"
    },
    {
        question: "40 - (15 ÷ (-3)) = ?",
        choices: [45, 35, -25, 25],
        answer: 45,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>15 ÷ (-3) = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาลบ (ลบด้วยจำนวนลบกลายเป็นบวก)</p><p class='pl-4 font-mono text-blue-700'>40 - (-5) = 40 + 5 = 45</p>"
    },
    {
        question: "5 * (8 - 3) = ?",
        choices: [25, -25, 40, 13],
        answer: 25,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>8 - 3 = 5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>5 * 5 = 25</p>"
    },
    {
        question: "(10 + (-20)) * 2 = ?",
        choices: [20, -20, -10, 10],
        answer: -20,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 + (-20) = -10</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>-10 * 2 = -20</p>"
    },
    {
        question: "30 / (1 - 6) = ?",
        choices: [5, -5, -6, 6],
        answer: -6,
        difficulty: 'medium',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>1 - 6 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>30 / (-5) = -6</p>"
    }
];
allCards.puzzle.hard = [
    {
        question: "นักปีนเขาอยู่ที่สูง 500 เมตรเหนือระดับน้ำทะเล เขาปีนขึ้นไปอีก 250 เมตร แล้วโรยตัวลงมา 400 เมตร ตอนนี้นักปีนเขาอยู่ที่ระดับความสูงเท่าใด?",
        choices: ["350 เมตร", "1150 เมตร", "150 เมตร", "-150 เมตร"],
        answer: "350 เมตร",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณความสูงหลังจากปีนขึ้นไปอีก</p><p class='pl-4 font-mono text-blue-700'>500 + 250 = 750 เมตร</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณความสูงหลังจากโรยตัวลงมา</p><p class='pl-4 font-mono text-blue-700'>750 - 400 = 350 เมตร</p>"
    },
    {
        question: "(-10 * 5) + (80 / 4) = ?",
        choices: [-30, 30, -70, 70],
        answer: -30,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-10 * 5 = -50</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>80 / 4 = 20</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มารวมกัน</p><p class='pl-4 font-mono text-blue-700'>-50 + 20 = -30</p>"
    },
    {
        question: "ในหนึ่งสัปดาห์ ร้านค้ามีกำไร 3,500 บาท แต่ต้องจ่ายค่าเช่า 5,000 บาท และค่าพนักงาน 2,000 บาท สรุปแล้วสัปดาห์นี้ร้านค้ามีสถานะการเงินอย่างไร?",
        choices: ["ขาดทุน 3,500 บาท", "กำไร 3,500 บาท", "เสมอตัว", "ขาดทุน 1,500 บาท"],
        answer: "ขาดทุน 3,500 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณรายจ่ายทั้งหมด</p><p class='pl-4 font-mono text-blue-700'>5000 + 2000 = 7000 บาท</p><p><strong>ขั้นตอนที่ 2:</strong> นำกำไรหักลบด้วยรายจ่าย</p><p class='pl-4 font-mono text-blue-700'>3500 - 7000 = -3500 บาท (ขาดทุน)</p>"
    },
    {
        question: "150 - (10 * (5 + 10)) = ?",
        choices: [0, 300, -1350, 1350],
        answer: 0,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>5 + 10 = 15</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>10 * 15 = 150</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>150 - 150 = 0</p>"
    },
    {
        question: "ทีมฟุตบอล A มี 20 แต้ม แข่ง 3 นัดถัดมา ชนะได้ 3 แต้ม แพ้โดนหัก 1 แต้ม โดยทีม A ชนะ 1 นัด แพ้ 2 นัด ทีม A จะมีกี่แต้ม?",
        choices: ["21 แต้ม", "25 แต้ม", "19 แต้ม", "23 แต้ม"],
        answer: "21 แต้ม",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณแต้มที่ได้จากการชนะ</p><p class='pl-4 font-mono text-blue-700'>1 * 3 = 3 แต้ม</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณแต้มที่เสียจากการแพ้</p><p class='pl-4 font-mono text-blue-700'>2 * (-1) = -2 แต้ม</p><p><strong>ขั้นตอนที่ 3:</strong> รวมคะแนนกับแต้มเดิม</p><p class='pl-4 font-mono text-blue-700'>20 + 3 + (-2) = 21 แต้ม</p>"
    },
    {
        question: "((-8) + (-7)) / (10 - 13) = ?",
        choices: [5, -5, 1, -1],
        answer: 5,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-8) + (-7) = -15</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>10 - 13 = -3</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>(-15) / (-3) = 5</p>"
    },
    {
        question: "อุณหภูมิที่มอสโก -12°C ส่วนที่กรุงเทพ 30°C อุณหภูมิทั้งสองเมืองต่างกันกี่องศา?",
        choices: ["42°C", "18°C", "-42°C", "-18°C"],
        answer: "42°C",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p>การหาความแตกต่างคือการนำค่ามาลบกัน</p><p class='pl-4 font-mono text-blue-700'>30 - (-12) = 30 + 12 = 42°C</p>"
    },
    {
        question: "20 * (5 - (50 / 10)) = ?",
        choices: [0, 100, -100, 20],
        answer: 0,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>50 / 10 = 5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการลบในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>5 - 5 = 0</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>20 * 0 = 0</p>"
    },
    {
        question: "มานีมีหนี้อยู่ 1,200 บาท เธอทำงานได้เงินมา 3,000 บาท แล้วนำไปใช้หนี้ทั้งหมด และซื้อของขวัญให้แม่ 500 บาท มานีจะเหลือเงินเท่าไหร่?",
        choices: ["1,300 บาท", "1,800 บาท", "700 บาท", "2,300 บาท"],
        answer: "1,300 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณเงินหลังใช้หนี้</p><p class='pl-4 font-mono text-blue-700'>3000 - 1200 = 1800 บาท</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณเงินหลังซื้อของขวัญ</p><p class='pl-4 font-mono text-blue-700'>1800 - 500 = 1300 บาท</p>"
    },
    {
        question: "(10 * (-4)) + (10 - 40) = ?",
        choices: [-70, 10, -10, 70],
        answer: -70,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>10 * (-4) = -40</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>10 - 40 = -30</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-40 + (-30) = -70</p>"
    },
    {
        question: "ถังน้ำมีน้ำอยู่ 100 ลิตร เติมเข้าไป 30 ลิตรต่อนาที เป็นเวลา 3 นาที แล้วตักออกมาใช้ 50 ลิตร ตอนนี้มีน้ำในถังกี่ลิตร?",
        choices: ["140 ลิตร", "190 ลิตร", "80 ลิตร", "40 ลิตร"],
        answer: "140 ลิตร",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณปริมาณน้ำที่เติมเข้าไป</p><p class='pl-4 font-mono text-blue-700'>30 * 3 = 90 ลิตร</p><p><strong>ขั้นตอนที่ 2:</strong> รวมกับน้ำเดิม</p><p class='pl-4 font-mono text-blue-700'>100 + 90 = 190 ลิตร</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณหลังตักออก</p><p class='pl-4 font-mono text-blue-700'>190 - 50 = 140 ลิตร</p>"
    },
    {
        question: "(25 * (-2)) - (60 / (-3)) = ?",
        choices: [-30, 30, -70, 70],
        answer: -30,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>25 * (-2) = -50</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>60 / (-3) = -20</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-50 - (-20) = -30</p>"
    },
    {
        question: "ตึกมี 20 ชั้น นาย A อยู่ที่ชั้น 15 เขาขึ้นลิฟต์ไป 4 ชั้น แล้วลงมา 12 ชั้น ตอนนี้เขาอยู่ที่ชั้นใด?",
        choices: ["ชั้น 7", "ชั้น 19", "ชั้น 3", "ชั้น 9"],
        answer: "ชั้น 7",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณตำแหน่งหลังจากขึ้นลิฟต์</p><p class='pl-4 font-mono text-blue-700'>15 + 4 = 19</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณตำแหน่งหลังจากลงลิฟต์</p><p class='pl-4 font-mono text-blue-700'>19 - 12 = 7</p>"
    },
    {
        question: "-100 + (50 * 3) / 2 = ?",
        choices: [-25, 25, -175, 175],
        answer: -25,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณก่อน</p><p class='pl-4 font-mono text-blue-700'>50 * 3 = 150</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหาร</p><p class='pl-4 font-mono text-blue-700'>150 / 2 = 75</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>-100 + 75 = -25</p>"
    },
    {
        question: "คะแนนสอบของเด็กชาย B ตอนแรกมี 50 คะแนน ทำข้อสอบใหม่ 5 ข้อ ถูก 2 ข้อ (ข้อละ 5 คะแนน) ผิด 3 ข้อ (หักข้อละ 2 คะแนน) เขามีคะแนนใหม่เท่าไหร่?",
        choices: ["54 คะแนน", "60 คะแนน", "44 คะแนน", "56 คะแนน"],
        answer: "54 คะแนน",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คะแนนที่ได้เพิ่ม</p><p class='pl-4 font-mono text-blue-700'>2 * 5 = 10 คะแนน</p><p><strong>ขั้นตอนที่ 2:</strong> คะแนนที่ถูกหัก</p><p class='pl-4 font-mono text-blue-700'>3 * (-2) = -6 คะแนน</p><p><strong>ขั้นตอนที่ 3:</strong> รวมกับคะแนนเดิม</p><p class='pl-4 font-mono text-blue-700'>50 + 10 - 6 = 54 คะแนน</p>"
    },
    {
        question: "((10-20) * (3-5)) / (-4) = ?",
        choices: [5, -5, 20, -20],
        answer: -5,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บแรก</p><p class='pl-4 font-mono text-blue-700'>10 - 20 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บที่สอง</p><p class='pl-4 font-mono text-blue-700'>3 - 5 = -2</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณและหาร</p><p class='pl-4 font-mono text-blue-700'>(-10 * -2) / -4 = 20 / -4 = -5</p>"
    },
    {
        question: "เครื่องบิน บินสูง 10,000 ฟุต ลดระดับลง 2,500 ฟุต แล้วไต่ระดับขึ้นไปใหม่ 1,200 ฟุต ความสูงสุดท้ายคือเท่าใด?",
        choices: ["8,700 ฟุต", "11,300 ฟุต", "7,500 ฟุต", "6,300 ฟุต"],
        answer: "8,700 ฟุต",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> ความสูงหลังลดระดับ</p><p class='pl-4 font-mono text-blue-700'>10000 - 2500 = 7500 ฟุต</p><p><strong>ขั้นตอนที่ 2:</strong> ความสูงหลังไต่ระดับขึ้น</p><p class='pl-4 font-mono text-blue-700'>7500 + 1200 = 8700 ฟุต</p>"
    },
    {
        question: "50 - (100 / (10 - 30)) = ?",
        choices: [55, 45, -55, -45],
        answer: 55,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>10 - 30 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหารในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>100 / (-20) = -5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>50 - (-5) = 55</p>"
    },
    {
        question: "บัญชีธนาคารมีเงิน -500 บาท (ติดลบ) ฝากเงินเข้าไป 2,000 บาท และถอนออกมาใช้ 800 บาท จะเหลือเงินในบัญชีเท่าไหร่?",
        choices: ["700 บาท", "1,700 บาท", "300 บาท", "1,300 บาท"],
        answer: "700 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณเงินในบัญชีหลังฝากเงิน</p><p class='pl-4 font-mono text-blue-700'>-500 + 2000 = 1500 บาท</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณเงินหลังถอน</p><p class='pl-4 font-mono text-blue-700'>1500 - 800 = 700 บาท</p>"
    },
    {
        question: "(3 * (-20)) + (100 / 2) = ?",
        choices: [-10, 10, -110, 110],
        answer: -10,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>3 * (-20) = -60</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>100 / 2 = 50</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-60 + 50 = -10</p>"
    },
    {
        question: "ร้านค้าขายของได้เงิน 5 ชิ้น ชิ้นละ 150 บาท แต่ของ 2 ชิ้นในนั้นเป็นของฝากขายที่ต้องคืนเงินให้เพื่อนชิ้นละ 100 บาท ร้านค้าจะเหลือเงินจริงๆ เท่าไหร่?",
        choices: ["550 บาท", "750 บาท", "200 บาท", "950 บาท"],
        answer: "550 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณรายรับทั้งหมด</p><p class='pl-4 font-mono text-blue-700'>5 * 150 = 750 บาท</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณเงินที่ต้องคืนเพื่อน</p><p class='pl-4 font-mono text-blue-700'>2 * 100 = 200 บาท</p><p><strong>ขั้นตอนที่ 3:</strong> นำรายรับลบด้วยเงินที่ต้องคืน</p><p class='pl-4 font-mono text-blue-700'>750 - 200 = 550 บาท</p>"
    },
    {
        question: "(-8 * 10) / (2 - 6) = ?",
        choices: [20, -20, 16, -16],
        answer: 20,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>-8 * 10 = -80</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>2 - 6 = -4</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>-80 / (-4) = 20</p>"
    },
    {
        question: "อุณหภูมิห้องแช่แข็ง -18°C ถูกตั้งค่าให้เย็นลงชั่วโมงละ 3°C ผ่านไป 2 ชั่วโมง อุณหภูมิใหม่จะเป็นเท่าใด?",
        choices: ["-24°C", "-12°C", "-21°C", "-15°C"],
        answer: "-24°C",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณอุณหภูมิที่ลดลงทั้งหมด</p><p class='pl-4 font-mono text-blue-700'>3 * 2 = 6°C</p><p><strong>ขั้นตอนที่ 2:</strong> นำไปรวมกับอุณหภูมิเริ่มต้น (ค่าลบมากขึ้น)</p><p class='pl-4 font-mono text-blue-700'>-18 - 6 = -24°C</p>"
    },
    {
        question: "10 + (2 * (15 - 20)) = ?",
        choices: [0, 20, -10, -20],
        answer: 0,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>15 - 20 = -5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>2 * (-5) = -10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>10 + (-10) = 0</p>"
    },
    {
        question: "บริษัทมีกำไร 500,000 บาทในไตรมาสแรก แต่ขาดทุน 150,000 บาทในไตรมาสที่สอง และกลับมากำไร 200,000 บาทในไตรมาสที่สาม สรุปสามไตรมาสบริษัทมีกำไร/ขาดทุนเท่าไหร่?",
        choices: ["กำไร 550,000 บาท", "กำไร 850,000 บาท", "ขาดทุน 550,000 บาท", "กำไร 350,000 บาท"],
        answer: "กำไร 550,000 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p>นำกำไรและขาดทุนมารวมกันตามเครื่องหมาย</p><p class='pl-4 font-mono text-blue-700'>500000 - 150000 + 200000 = 550000 บาท</p>"
    },
    {
        question: "(144 / (-12)) + (5 * 5) = ?",
        choices: [13, -13, 37, -37],
        answer: 13,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>144 / (-12) = -12</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>5 * 5 = 25</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวกกัน</p><p class='pl-4 font-mono text-blue-700'>-12 + 25 = 13</p>"
    },
    {
        question: "เกมโชว์มีกติกา: ตอบถูกได้ 100, ตอบผิดติดลบ 50, ไม่ตอบได้ 0. ผู้เข้าแข่งขันตอบ 10 ข้อ ถูก 6 ข้อ ผิด 3 ข้อ ไม่ตอบ 1 ข้อ จะได้คะแนนเท่าไหร่?",
        choices: ["450 คะแนน", "600 คะแนน", "300 คะแนน", "550 คะแนน"],
        answer: "450 คะแนน",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คะแนนจากข้อที่ถูก</p><p class='pl-4 font-mono text-blue-700'>6 * 100 = 600</p><p><strong>ขั้นตอนที่ 2:</strong> คะแนนจากข้อที่ผิด</p><p class='pl-4 font-mono text-blue-700'>3 * (-50) = -150</p><p><strong>ขั้นตอนที่ 3:</strong> รวมคะแนนทั้งหมด</p><p class='pl-4 font-mono text-blue-700'>600 - 150 + 0 = 450 คะแนน</p>"
    },
    {
        question: "(30 - (5 * 8)) / (-2) = ?",
        choices: [5, -5, 10, -10],
        answer: 5,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณการคูณในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>5 * 8 = 40</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการลบในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>30 - 40 = -10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>(-10) / (-2) = 5</p>"
    },
    {
        question: "พ่อค้าซื้อผลไม้มา 1,000 บาท ขายได้เงิน 1,800 บาท แต่มีผลไม้เน่าเสียคิดเป็นต้นทุน 200 บาท สรุปแล้วพ่อค้าได้กำไรเท่าไหร่?",
        choices: ["600 บาท", "800 บาท", "1,600 บาท", "1,000 บาท"],
        answer: "600 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p>กำไร = รายรับ - ต้นทุนทั้งหมด</p><p><strong>ขั้นตอนที่ 1:</strong> ต้นทุนทั้งหมด = ทุนซื้อ + ทุนของที่เสีย</p><p class='pl-4 font-mono text-blue-700'>1000 + 200 = 1200 บาท</p><p><strong>ขั้นตอนที่ 2:</strong> กำไร = รายรับ - ต้นทุนทั้งหมด</p><p class='pl-4 font-mono text-blue-700'>1800 - 1200 = 600 บาท</p>"
    },
    {
        question: "((5 - 15) * 4) - 20 = ?",
        choices: [-60, 20, -20, 60],
        answer: -60,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>5 - 15 = -10</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณ</p><p class='pl-4 font-mono text-blue-700'>(-10) * 4 = -40</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการลบ</p><p class='pl-4 font-mono text-blue-700'>-40 - 20 = -60</p>"
    },
    {
        question: "นักประดาน้ำอยู่ที่ระดับ -15 เมตร เขาว่ายลงไปอีก 20 เมตร แล้วว่ายกลับขึ้นมา 10 เมตร เขาจะอยู่ที่ระดับใดเทียบกับผิวน้ำ?",
        choices: ["-25 เมตร", "-5 เมตร", "-35 เมตร", "15 เมตร"],
        answer: "-25 เมตร",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณระดับหลังว่ายลง</p><p class='pl-4 font-mono text-blue-700'>-15 - 20 = -35 เมตร</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณระดับหลังว่ายขึ้น</p><p class='pl-4 font-mono text-blue-700'>-35 + 10 = -25 เมตร</p>"
    },
    {
        question: "((-3) * (-10)) - (8 * 5) = ?",
        choices: [-10, 10, 70, -70],
        answer: -10,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>(-3) * (-10) = 30</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>8 * 5 = 40</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>30 - 40 = -10</p>"
    },
    {
        question: "ซื้อหุ้นมา 100 หุ้น ราคาหุ้นละ 50 บาท ต่อมาราคาตกเหลือหุ้นละ 45 บาท ถ้าขายทั้งหมดจะขาดทุนเท่าไหร่?",
        choices: ["500 บาท", "4,500 บาท", "5,000 บาท", "100 บาท"],
        answer: "500 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>วิธีที่ 1:</strong> หาผลต่างต่อหุ้นก่อน</p><p class='pl-4 font-mono text-blue-700'>(45 - 50) * 100 = (-5) * 100 = -500 (ขาดทุน 500 บาท)</p><p><strong>วิธีที่ 2:</strong> หาต้นทุนและราคาขาย</p><p class='pl-4 font-mono text-blue-700'>ต้นทุน: 100 * 50 = 5000</p><p class='pl-4 font-mono text-blue-700'>ราคาขาย: 100 * 45 = 4500</p><p class='pl-4 font-mono text-blue-700'>ผลต่าง: 4500 - 5000 = -500 (ขาดทุน 500 บาท)</p>"
    },
    {
        question: "100 / (20 - (5 * 6)) = ?",
        choices: [-10, 10, -20, 20],
        answer: -10,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>5 * 6 = 30</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการลบในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>20 - 30 = -10</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>100 / (-10) = -10</p>"
    },
    {
        question: "อุณหภูมิยอดดอยตอนเช้า -2°C ตอนสายเพิ่มขึ้น 8°C ตอนบ่ายลดลง 5°C และตอนกลางคืนลดลงอีก 4°C อุณหภูมิตอนกลางคืนเป็นเท่าใด?",
        choices: ["-3°C", "3°C", "-1°C", "1°C"],
        answer: "-3°C",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p>คำนวณตามลำดับเวลา</p><p class='pl-4 font-mono text-blue-700'>-2 + 8 - 5 - 4 = -3°C</p>"
    },
    {
        question: "(70 / (-10)) * (2 - 9) = ?",
        choices: [49, -49, 63, -63],
        answer: 49,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>70 / (-10) = -7</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>2 - 9 = -7</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณกัน</p><p class='pl-4 font-mono text-blue-700'>(-7) * (-7) = 49</p>"
    },
    {
        question: "โครงการก่อสร้างใช้งบไปแล้ว 2,500,000 บาท ได้รับงบเพิ่ม 1,200,000 บาท แต่ต้องจ่ายค่าอุปกรณ์เพิ่มอีก 400,000 บาท สรุปโครงการนี้ใช้งบไปเท่าไหร่จากงบที่ตั้งไว้ตอนแรก?",
        choices: ["ใช้งบเกิน 1,700,000 บาท", "ใช้งบเกิน 1,300,000 บาท", "ประหยัดงบ 1,700,000 บาท", "ใช้งบเกิน 2,100,000 บาท"],
        answer: "ใช้งบเกิน 1,700,000 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p>เราจะมองว่าการใช้งบคือค่าลบ และการได้งบเพิ่มคือค่าบวก</p><p class='pl-4 font-mono text-blue-700'>-2500000 + 1200000 - 400000 = -1700000</p><p>ดังนั้นใช้งบเกินไป 1,700,000 บาท</p>"
    },
    {
        question: "(-45 / (10 - 1)) + 15 = ?",
        choices: [10, -10, 20, -20],
        answer: 10,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>10 - 1 = 9</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหาร</p><p class='pl-4 font-mono text-blue-700'>-45 / 9 = -5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาบวก</p><p class='pl-4 font-mono text-blue-700'>-5 + 15 = 10</p>"
    },
    {
        question: "ค่าเฉลี่ย 3 วันของอุณหภูมิติดลบคือ (-4 + (-7) + (-1)) / 3 เท่ากับเท่าไหร่?",
        choices: ["-4°C", "-3°C", "-12°C", "4°C"],
        answer: "-4°C",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> รวมอุณหภูมิทั้งหมด</p><p class='pl-4 font-mono text-blue-700'>-4 + (-7) + (-1) = -12</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลรวมมาหารด้วยจำนวนวัน</p><p class='pl-4 font-mono text-blue-700'>-12 / 3 = -4°C</p>"
    },
    {
        question: "(200 / -10) - (30 * -2) = ?",
        choices: [40, -40, 80, -80],
        answer: 40,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>200 / -10 = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>30 * -2 = -60</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบกัน</p><p class='pl-4 font-mono text-blue-700'>-20 - (-60) = 40</p>"
    },
    {
        question: "แดงมีเงิน 200 บาท ซื้อขนม 3 ชิ้น ชิ้นละ 15 บาท และซื้อน้ำ 2 ขวด ขวดละ 20 บาท แดงจะเหลือเงินเท่าไหร่?",
        choices: ["115 บาท", "155 บาท", "85 บาท", "125 บาท"],
        answer: "115 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณค่าขนม</p><p class='pl-4 font-mono text-blue-700'>3 * 15 = 45 บาท</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณค่าน้ำ</p><p class='pl-4 font-mono text-blue-700'>2 * 20 = 40 บาท</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณเงินที่เหลือ</p><p class='pl-4 font-mono text-blue-700'>200 - 45 - 40 = 115 บาท</p>"
    },
    {
        question: "-5 * (10 - (-10) + 2) = ?",
        choices: [-110, 110, -90, 90],
        answer: -110,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บจากซ้ายไปขวา</p><p class='pl-4 font-mono text-blue-700'>10 - (-10) = 20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณต่อในวงเล็บ</p><p class='pl-4 font-mono text-blue-700'>20 + 2 = 22</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาคูณ</p><p class='pl-4 font-mono text-blue-700'>-5 * 22 = -110</p>"
    },
    {
        question: "ลิฟต์อยู่ที่ชั้นใต้ดิน 2 (-2) ขึ้นไป 10 ชั้น แล้วลงมา 5 ชั้น แล้วขึ้นไปอีก 3 ชั้น ลิฟต์จะอยู่ที่ชั้นใด?",
        choices: ["ชั้น 6", "ชั้น 8", "ชั้น 4", "ชั้น 10"],
        answer: "ชั้น 6",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p>คำนวณตำแหน่งตามลำดับ</p><p class='pl-4 font-mono text-blue-700'>-2 + 10 - 5 + 3 = 6</p><p>ดังนั้นลิฟต์อยู่ที่ชั้น 6</p>"
    },
    {
        question: "(6 * (-6)) / (3 * (-3)) = ?",
        choices: [4, -4, 9, -9],
        answer: 4,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>6 * (-6) = -36</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>3 * (-3) = -9</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาหารกัน</p><p class='pl-4 font-mono text-blue-700'>-36 / (-9) = 4</p>"
    },
    {
        question: "ดำรงมีเงิน 1,000 บาท ได้รับเงินเดือน 15,000 บาท มีรายจ่ายค่าเช่าบ้าน 4,000 บาท และค่ากิน 5,000 บาท สิ้นเดือนเขาจะเหลือเงินเท่าไหร่?",
        choices: ["7,000 บาท", "8,000 บาท", "6,000 บาท", "9,000 บาท"],
        answer: "7,000 บาท",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p>คำนวณ: เงินเริ่มต้น + รายรับ - รายจ่าย</p><p class='pl-4 font-mono text-blue-700'>1000 + 15000 - 4000 - 5000 = 7000 บาท</p>"
    },
    {
        question: "((8 - 20) / 4) + 10 = ?",
        choices: [7, -7, 13, -13],
        answer: 7,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>8 - 20 = -12</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการหาร</p><p class='pl-4 font-mono text-blue-700'>-12 / 4 = -3</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณการบวก</p><p class='pl-4 font-mono text-blue-700'>-3 + 10 = 7</p>"
    },
    {
        question: "บอลลูนอยู่ที่สูง 1,200 เมตรเหนือพื้นดิน ปล่อยลมออกทำให้ลดระดับลงนาทีละ 50 เมตร เป็นเวลา 10 นาที บอลลูนจะอยู่ที่ความสูงเท่าใด?",
        choices: ["700 เมตร", "1,150 เมตร", "1,250 เมตร", "1,700 เมตร"],
        answer: "700 เมตร",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณระยะทางที่ลดระดับลงทั้งหมด</p><p class='pl-4 font-mono text-blue-700'>50 * 10 = 500 เมตร</p><p><strong>ขั้นตอนที่ 2:</strong> นำความสูงเริ่มต้นมาลบด้วยระยะที่ลดลง</p><p class='pl-4 font-mono text-blue-700'>1200 - 500 = 700 เมตร</p>"
    },
    {
        question: "(10 + 20 + 30) / (-6) = ?",
        choices: [10, -10, 60, -60],
        answer: -10,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณในวงเล็บก่อน</p><p class='pl-4 font-mono text-blue-700'>10 + 20 + 30 = 60</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์มาหาร</p><p class='pl-4 font-mono text-blue-700'>60 / (-6) = -10</p>"
    },
    {
        question: "คะแนนเก็บวิชาคณิตศาสตร์ 4 ครั้งของสมหญิงคือ 15, 20, 18, 17 จากคะแนนเต็มครั้งละ 20 คะแนน รวมแล้วสมหญิงขาดอีกกี่คะแนนถึงจะได้คะแนนรวม 80?",
        choices: ["10 คะแนน", "70 คะแนน", "ขาด 10 คะแนน", "ได้ 10 คะแนน"],
        answer: "ขาด 10 คะแนน",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณคะแนนรวมที่สมหญิงทำได้</p><p class='pl-4 font-mono text-blue-700'>15 + 20 + 18 + 17 = 70 คะแนน</p><p><strong>ขั้นตอนที่ 2:</strong> หาผลต่างจากเป้าหมาย</p><p class='pl-4 font-mono text-blue-700'>70 - 80 = -10</p><p>นั่นคือยังขาดอีก 10 คะแนน</p>"
    },
    {
        question: "200 - (10 * 10) - (50 / -5) = ?",
        choices: [110, 90, 210, 190],
        answer: 110,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บแรก</p><p class='pl-4 font-mono text-blue-700'>10 * 10 = 100</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บที่สอง</p><p class='pl-4 font-mono text-blue-700'>50 / -5 = -10</p><p><strong>ขั้นตอนที่ 3:</strong> คำนวณทั้งหมด</p><p class='pl-4 font-mono text-blue-700'>200 - 100 - (-10) = 100 + 10 = 110</p>"
    },
    {
        question: "อุณหภูมิตอนเช้า 5°C ตอนเที่ยงเพิ่มขึ้น 10°C และตอนกลางคืนลดลง 18°C อุณหภูมิตอนกลางคืนเป็นเท่าใด?",
        choices: ["-3°C", "3°C", "33°C", "-13°C"],
        answer: "-3°C",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> นำอุณหภูมิตอนเช้าบวกกับอุณหภูมิที่เพิ่มขึ้นตอนเที่ยง</p><p class='pl-4 font-mono text-blue-700'>5 + 10 = 15°C</p><p><strong>ขั้นตอนที่ 2:</strong> นำผลลัพธ์ที่ได้ลบด้วยอุณหภูมิที่ลดลงตอนกลางคืน</p><p class='pl-4 font-mono text-blue-700'>15 - 18 = -3°C</p>"
    },
    {
        question: "เรือดำน้ำอยู่ลึก -80 เมตร ดำลงไปอีก 50 เมตร แล้วลอยขึ้นมา 60 เมตร ขณะนี้เรือดำน้ำอยู่ที่ระดับความลึกเท่าใด?",
        choices: ["-70 เมตร", "-90 เมตร", "-190 เมตร", "30 เมตร"],
        answer: "-70 เมตร",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณระดับความลึกหลังจากดำลงไปอีก (ค่าติดลบเพิ่มขึ้น)</p><p class='pl-4 font-mono text-blue-700'>(-80) - 50 = -130 เมตร</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณระดับหลังจากลอยขึ้นมา (ค่าเข้าใกล้ 0)</p><p class='pl-4 font-mono text-blue-700'>-130 + 60 = -70 เมตร</p>"
    },
    {
        question: "ในเกมๆหนึ่ง เริ่มต้นทุกคนมี 0 คะแนน ถ้าตอบถูกได้ 5 คะแนน ตอบผิดติดลบ 3 คะแนน สมศรีตอบถูก 4 ครั้ง ตอบผิด 5 ครั้ง สมศรีมีคะแนนรวมเท่าใด?",
        choices: ["5 คะแนน", "20 คะแนน", "15 คะแนน", "-5 คะแนน"],
        answer: "5 คะแนน",
        difficulty: 'hard',
        category: 'word_problem',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณคะแนนที่ได้จากการตอบถูก</p><p class='pl-4 font-mono text-blue-700'>4 ครั้ง × 5 คะแนน = 20 คะแนน</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณคะแนนที่เสียไปจากการตอบผิด</p><p class='pl-4 font-mono text-blue-700'>5 ครั้ง × (-3 คะแนน) = -15 คะแนน</p><p><strong>ขั้นตอนที่ 3:</strong> รวมคะแนนทั้งหมด</p><p class='pl-4 font-mono text-blue-700'>20 + (-15) = 5 คะแนน</p>"
    },
    {
        question: "(4 * (-5)) + (30 / 6) = ?",
        choices: [-15, 25, -25, 15],
        answer: -15,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บซ้าย</p><p class='pl-4 font-mono text-blue-700'>4 * (-5) = -20</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณวงเล็บขวา</p><p class='pl-4 font-mono text-blue-700'>30 / 6 = 5</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มารวมกัน</p><p class='pl-4 font-mono text-blue-700'>-20 + 5 = -15</p>"
    },
    {
        question: "100 - (10 * (2 + 3)) = ?",
        choices: [50, 450, -50, -450],
        answer: 50,
        difficulty: 'hard',
        category: 'order_of_operations',
        explanation: "<p><strong>ขั้นตอนที่ 1:</strong> คำนวณวงเล็บในสุด</p><p class='pl-4 font-mono text-blue-700'>2 + 3 = 5</p><p><strong>ขั้นตอนที่ 2:</strong> คำนวณการคูณในวงเล็บใหญ่</p><p class='pl-4 font-mono text-blue-700'>10 * 5 = 50</p><p><strong>ขั้นตอนที่ 3:</strong> นำผลลัพธ์มาลบ</p><p class='pl-4 font-mono text-blue-700'>100 - 50 = 50</p>"
    }
];
    console.log("Static question bank populated.");
}