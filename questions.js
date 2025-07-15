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
allCards.mission.medium = [
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