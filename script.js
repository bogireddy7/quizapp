const questions = {
    html: [
        {
            question: "What does HTML stand for?",
            answers: [
                { text: "Hyper Text Markup Language", correct: true },
                { text: "Home Tool Markup Language", correct: false },
                { text: "Hyperlinks Text Mark Language", correct: false },
                { text: "Hyper Tool Multi Language", correct: false }
            ]
        },
        {
            question: "Which tag creates a hyperlink?",
            answers: [
                { text: "<a>", correct: true },
                { text: "<link>", correct: false },
                { text: "<href>", correct: false },
                { text: "<h1>", correct: false }
            ]
        }
    ],
    css: [
        {
            question: "Which property changes text color?",
            answers: [
                { text: "font-style", correct: false },
                { text: "color", correct: true },
                { text: "background", correct: false },
                { text: "text-align", correct: false }
            ]
        },
        {
            question: "Which symbol selects class in CSS?",
            answers: [
                { text: "#", correct: false },
                { text: ".", correct: true },
                { text: "*", correct: false },
                { text: "&", correct: false }
            ]
        }
    ]
};

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const timerEl = document.getElementById("timer");
const scoreText = document.getElementById("score-text");

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

startBtn.addEventListener("click", () => {
    const category = document.getElementById("category").value;
    currentQuestions = questions[category];
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    currentIndex = 0;
    score = 0;
    showQuestion();
});

function showQuestion() {
    resetState();
    startTimer();

    let q = currentQuestions[currentIndex];
    questionEl.innerText = q.question;
    progressText.innerText = `Question ${currentIndex + 1} of ${currentQuestions.length}`;
    progressFill.style.width = ((currentIndex + 1) / currentQuestions.length) * 100 + "%";

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerText = answer.text;
        if (answer.correct) btn.dataset.correct = true;
        btn.addEventListener("click", selectAnswer);
        answersEl.appendChild(btn);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    answersEl.innerHTML = "";
}

function selectAnswer(e) {
    clearInterval(timer);
    const selected = e.target;
    const correct = selected.dataset.correct === "true";

    if (correct) score++;

    Array.from(answersEl.children).forEach(btn => {
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        } else {
            btn.classList.add("wrong");
        }
        btn.disabled = true;
    });

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    scoreText.innerText = `You scored ${score} out of ${currentQuestions.length}`;
}

restartBtn.addEventListener("click", () => {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
});

function startTimer() {
    timeLeft = 15;
    timerEl.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            selectAnswer({ target: {} });
        }
    }, 1000);
}
