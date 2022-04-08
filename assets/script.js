var startButtonEl = document.getElementById("startButton");
var option1El = document.getElementById("option1");
var option2El = document.getElementById("option2");
var option3El = document.getElementById("option3");
var option4El = document.getElementById("option4");
option1El.addEventListener("click", checkSelection);
option2El.addEventListener("click", checkSelection);
option3El.addEventListener("click", checkSelection);
option4El.addEventListener("click", checkSelection);
startButtonEl.addEventListener("click", timer);
let answer = "";
let index = 0;
var sec = '';
timerStart = '';


function timer() {
    sec = 60;
    startButtonEl.classList.add("d-none");
    timerStart = setInterval(function () {
        document.getElementById('timer').innerHTML = sec;
        sec--;
        if (sec < 0) {
            clearInterval(timerStart);
            endgame();
            startButtonEl.classList.remove("d-none");
        }
    }, 1000);
    playGame();
}

const QA = [
    {
        question: "Inside which HTML element do we put the JavaScript?", answers: [
            { option: "<script>", correct: true },
            { option: "<javascript>", correct: false },
            { option: "<scripting>", correct: false },
            { option: "<js>", correct: false }]
    },
    {
        question: "How do you write 'Hello World' in an alert box?", answers: [
            { option: 'msg("Hello World");', correct: false },
            { option: 'alert("Hello World");', correct: true },
            { option: 'msgBox("Hello World");', correct: false },
            { option: 'alertBox("Hello World");', correct: false }]
    },
    {
        question: "How to write an IF statement in JavaScript?", answers: [
            { option: "if i == 5 then", correct: false },
            { option: "if (i == 5)", correct: true },
            { option: "if i = 5", correct: false },
            { option: "if i = 5 then", correct: false }]
    },
    {
        question: "How does a FOR loop start?", answers: [
            { option: "for (i = 0; i <= 5)", correct: false },
            { option: "for (i = 0; i <= 5; i++)", correct: true },
            { option: "for i = 1 to 5", correct: false },
            { option: "for (i <= 5; i++)", correct: false }]
    },
    {
        question: "What is the correct way to write a JavaScript array?", answers: [
            { option: 'var colors = ["red", "green", "blue"]', correct: true },
            { option: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false },
            { option: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false },
            { option: 'var colors = "red", "green", "blue"', correct: false }]
    },
    {
        question: "How do you find the number with the highest value of x and y?", answers: [
            { option: "ceil(x, y)", correct: false },
            { option: "Math.ceil(x, y)", correct: false },
            { option: "top(x, y)", correct: false },
            { option: "Math.max(x, y)", correct: true }]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?", answers: [
            { option: "onmouseclick", correct: false },
            { option: "onchange", correct: false },
            { option: "onclick", correct: true },
            { option: "onmouseover", correct: false }]
    },
    {
        question: "Which operator is used to assign a value to a variable", answers: [
            { option: "=", correct: true },
            { option: "*", correct: false },
            { option: ">", correct: false },
            { option: "-", correct: false }]
    }
]

function playGame() {
    index = 0;
    document.getElementById("question").innerText = QA[index].question;
    document.getElementById("option2").innerText = QA[index].answers[1].option;
    document.getElementById("option3").innerText = QA[index].answers[2].option;
    document.getElementById("option4").innerText = QA[index].answers[3].option;
    document.getElementById("option1").innerText = QA[index].answers[0].option;

    // document.getElementById("question").classList.replace("h3, h1")
    document.getElementById("option1").classList.remove("d-none");
    document.getElementById("option2").classList.remove("d-none");
    document.getElementById("option3").classList.remove("d-none");
    document.getElementById("option4").classList.remove("d-none");
    checkAnswer()
}

function checkAnswer() {
    for (let i = 0; i < 4; i++) {
        if (QA[index].answers[i].correct) {
            answer = QA[index].answers[i].option
        }
    }
}

function endgame() {
    document.getElementById("option2").classList.add("d-none");
    document.getElementById("option1").classList.add("d-none");
    document.getElementById("option3").classList.add("d-none");
    document.getElementById("option4").classList.add("d-none");
    if (sec > 0) {
    document.getElementById("question").innerText = 'You Win';
    }
    else {
        document.getElementById("question").innerText = 'You Lose'
    }
}

function checkSelection() {
    if (answer == this.innerText) {
        this.classList.remove("btn-primary");
        this.classList.add("btn-success");
    }

    else {
        this.classList.remove("btn-primary");
        this.classList.add("btn-danger");
        sec -= 10;
    }
    const reset = setTimeout(resetOptions, 500);
}

function resetOptions() {
    document.getElementById("option1").classList.replace("btn-danger", "btn-primary");
    document.getElementById("option2").classList.replace("btn-danger", "btn-primary");
    document.getElementById("option3").classList.replace("btn-danger", "btn-primary");
    document.getElementById("option4").classList.replace("btn-danger", "btn-primary");
    document.getElementById("option1").classList.replace("btn-success", "btn-primary");
    document.getElementById("option2").classList.replace("btn-success", "btn-primary");
    document.getElementById("option3").classList.replace("btn-success", "btn-primary");
    document.getElementById("option4").classList.replace("btn-success", "btn-primary");
    document.getElementById("option1").classList.add("btn-primary");
    document.getElementById("option2").classList.add("btn-primary");
    document.getElementById("option3").classList.add("btn-primary");
    document.getElementById("option4").classList.add("btn-primary");
    if (index == (QA.length - 1)) {
        console.log("game done")
        clearInterval(timerStart)
        endgame();

    } if (sec <= 0) {
        endgame();
    } 
    else {
        nextQuestion();
    }
}

function nextQuestion() {
    index++;
    document.getElementById("question").innerText = QA[index].question;
    document.getElementById("option2").innerText = QA[index].answers[1].option;
    document.getElementById("option3").innerText = QA[index].answers[2].option;
    document.getElementById("option4").innerText = QA[index].answers[3].option;
    document.getElementById("option1").innerText = QA[index].answers[0].option;
    checkAnswer()
}