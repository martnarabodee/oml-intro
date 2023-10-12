const problemImage = document.getElementById('problemImage');
const choiceButtons = document.querySelectorAll('.choices button');
const feedbackMessage = document.getElementById('feedbackMessage');
const difficultyElement = document.getElementById('difficulty');
const contentElement = document.getElementById('content');
const commentElement = document.getElementById('comment');
const totalViewedElement = document.getElementById('totalViewed');
const totalCorrectElement = document.getElementById('totalCorrect');
const nextButton = document.getElementById('nextButton');

let backend_url = "localhost"; //for code release

let currentProblemIndex = Math.floor(Math.random() * 3181) + 1;

let totalViewed = localStorage.getItem('totalViewed');
let totalCorrect = localStorage.getItem('totalCorrect');
let checkAnswerOnce = true;

if (totalViewed === null) {
    totalViewed = 0;
}
if (totalCorrect === null) {
    totalCorrect = 0;
}

async function fetchProblem(problemId) {
    try {
        feedbackMessage.textContent = 'กำลังโหลดข้อถัดไป';
        const response = await fetch(`http://${backend_url}:3222/api/problem/${problemId}`);

        if (response.status !== 200) {
            throw new Error('Problem not found');
        }

        const problem = await response.json();

        problemImage.src = `intro_data/${problem.dir}.jpg`;
        
        difficultyElement.textContent = problem.difficulty;

        problem.content = problem.content.map(x => oml_content[x]);
        contentElement.textContent = problem.content.join(', ');
        commentElement.textContent = problem.comment;

        totalViewed++;

        totalViewedElement.textContent = totalViewed;
        totalCorrectElement.textContent = totalCorrect;
        
        checkAnswerOnce = true;

        localStorage.setItem('totalViewed', totalViewed);
        localStorage.setItem('totalCorrect', totalCorrect);

        feedbackMessage.textContent = 'เลือกคำตอบเพื่อตรวจสอบ';
        
        choiceButtons.forEach((button, index) => {
            button.addEventListener('click', () => checkAnswer(index, problem.answer));
        });

    } catch (error) {
        console.error('Error fetching problem:', error);
    }
}

feedbackMessage.textContent = 'เลือกคำตอบเพื่อตรวจสอบ';

function checkAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === (correctIndex - 1)) {
        localStorage.setItem('totalCorrect', totalCorrect);
        if (checkAnswerOnce) {
            checkAnswerOnce = false;
            totalCorrect++;
        }
        feedbackMessage.textContent = 'คำตอบถูกต้อง!';
        totalCorrectElement.textContent = totalCorrect;
    } else {
        feedbackMessage.textContent = 'ไม่ถูกต้อง ลองใหม่อีกครั้ง';
    }
}

nextButton.addEventListener('click', () => {
    feedbackMessage.textContent = 'เลือกคำตอบเพื่อตรวจสอบ';
    totalViewedElement.textContent = totalViewed;
    currentProblemIndex = Math.floor(Math.random() * 3181) + 1;
    fetchProblem(currentProblemIndex);
});

fetchProblem(currentProblemIndex);

oml_content = {
    1: 'จำนวนเต็ม',
    2: 'การสร้างทางเรขาคณิต',
    3: 'เลขยกกำลัง',
    4: 'ทศนิยมและเศษส่วน',
    5: 'รูปเรขาคณิตสองมิติและสามมิติ',
    6: 'สมการเชิงเส้นตัวแปรเดียว',
    7: 'อัตราส่วน สัดส่วน และร้อยละ',
    8: 'กราฟและความสัมพันธ์เชิงเส้น',
    9: 'สถิติ 1',
    10: 'ทฤษฎีบทพีทาโกรัส',
    11: 'ความรู้เบื้องต้นเกี่ยวกับจำนวนจริง',
    12: 'ปริซึมและทรงกระบอก',
    13: 'การแปลงทางเรขาคณิต',
    14: 'สมบัติของเลขยกกำลัง',
    15: 'พหุนาม',
    16: 'สถิติ 2',
    17: 'ความเท่ากันทุกประการ',
    18: 'เส้นขนาน',
    19: 'การให้เหตุผลทางเรขาคณิต',
    20: 'การแยกตัวประกอบของพหุนามดีกรีสอง',
    21: 'อสมการเชิงเส้นตัวแปรเดียว',
    22: 'การแยกตัวประกอบของพหุนามที่มีดีกรีสูงกว่าสอง',
    23: 'สมการกำลังสองตัวแปรเดียว',
    24: 'ความคล้าย',
    25: 'กราฟของฟังก์ชันกำลังสอง',
    26: 'สถิติ 3',
    27: 'ระบบสมการเชิงเส้นสองตัวแปร',
    28: 'วงกลม',
    29: 'พีระมิด กรวย และทรงกลม',
    30: 'ความน่าจะเป็น',
    31: 'อัตราส่วนตรีโกณมิติ'
}