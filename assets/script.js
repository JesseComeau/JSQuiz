var startButtonEl = document.getElementById("startButton");
var questionEl = document.getElementById("question");
var option1El = document.getElementById("option1");
var option2El = document.getElementById("option2");
var option3El = document.getElementById("option3");
var option4El = document.getElementById("option4");
var infoEl = document.getElementById("info");
var savedScores = JSON.parse(localStorage.getItem("scores"))
var saveButtonEl = document.getElementById("saveButton");
var initialsEl = document.getElementById("initials");
var clearButtonEl = document.getElementById("clearButton");

var answer = '';
var index = '';
var sec = '';
var timerStart = '';
var score = ''
var initials = '';

clearButtonEl.addEventListener("click", clearLocalStorage)
saveButtonEl.addEventListener("click", localStorageSave);
option1El.addEventListener("click", checkSelection);
option2El.addEventListener("click", checkSelection);
option3El.addEventListener("click", checkSelection);
option4El.addEventListener("click", checkSelection);
startButtonEl.addEventListener("click", timer);

// Questions array
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

// Function to set and siplay the timer
function timer() {
    document.getElementById('timer').classList.remove('d-none')
    clearButtonEl.classList.add('d-none')
    sec = 10;
    startButtonEl.classList.add("d-none");
    timerStart = setInterval(() => {
        document.getElementById('timer').innerHTML = sec;
        sec--;
        if (sec < 0) {
            clearInterval(timerStart);
            endgame();
            startButtonEl.classList.remove("d-none");
        }
    }, 1000);
    playGame()
}

// Function to start the game -- Adding buttons for answers with predefined questions text
function playGame() {
    index = 0;
    questionEl.innerText = QA[index].question;
    option1El.innerText = QA[index].answers[0].option;
    option2El.innerText = QA[index].answers[1].option;
    option3El.innerText = QA[index].answers[2].option;
    option4El.innerText = QA[index].answers[3].option;

    document.getElementById("info").classList.add("d-none")

    document.getElementById("scoreTable").classList.add("d-none");

    questionEl.classList.remove("d-none");
    option1El.classList.remove("d-none");
    option2El.classList.remove("d-none");
    option3El.classList.remove("d-none");
    option4El.classList.remove("d-none");
    checkAnswer()
    
}

// Function to set the correct answer button.
function checkAnswer() {
    for (let i = 0; i < 4; i++) {
        if (QA[index].answers[i].correct) {
            answer = QA[index].answers[i].option
        }
    }
}

// Function to end the game based on no more questions or timer => 0 -- hides answer buttons
function endgame() {
    questionEl.classList.add("d-none");
    option1El.classList.add("d-none");
    option2El.classList.add("d-none");
    option3El.classList.add("d-none");
    option4El.classList.add("d-none");
    infoEl.classList.remove("d-none");
    if (sec > 0) {
        infoEl.innerHTML = `You win with a score of <span class="text-danger">${sec + 1}</span>.
<br>
<br>
<p class="h4">Enter your initials to save your score.</p>`;
        document.getElementById("timer").classList.add("d-none")
        document.getElementById("timer").classList.add("d-none")
        saveScore()
    }
    else {
        document.getElementById("info").innerText = 'You Lose, try again?'
    }
}

// Function to check onclick input = answer -- remove 10 seconds if it is not the correct answer -- add class to change color of button
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

// Function to reset classes when new question appears
function resetOptions() {
    option1El.classList.replace("btn-danger", "btn-primary");
    option2El.classList.replace("btn-danger", "btn-primary");
    option3El.classList.replace("btn-danger", "btn-primary");
    option4El.classList.replace("btn-danger", "btn-primary");
    option1El.classList.replace("btn-success", "btn-primary");
    option2El.classList.replace("btn-success", "btn-primary");
    option3El.classList.replace("btn-success", "btn-primary");
    option4El.classList.replace("btn-success", "btn-primary");

    if (index == (QA.length - 1)) {
        clearInterval(timerStart)
        endgame();
        return;

    } if (sec <= 0) {
        endgame();
    }
    else {
        nextQuestion();
    }
}

// Function to call the next question
function nextQuestion() {
    index++;
    questionEl.innerText = QA[index].question;
    option1El.innerText = QA[index].answers[0].option;
    option2El.innerText = QA[index].answers[1].option;
    option3El.innerText = QA[index].answers[2].option;
    option4El.innerText = QA[index].answers[3].option;
    checkAnswer()
}


// Function to save score with initials
function saveScore() {
    console.log("savedScore");
    saveButtonEl.classList.remove("d-none");
    initialsEl.classList.remove("d-none");
    initialsEl.value = "";

    let scoreString = JSON.stringify(savedScores)
    localStorage.setItem("scores", scoreString)

}

function checkStorage() {
    initials = initialsEl.value.toUpperCase()
    score = {
        time: (sec + 1),
        initials: initials
    }

    if (savedScores == null) {
        savedScores = []
        savedScores.push(score);
        console.log("null", savedScores);
        saveScore();
        retry();
        return;
    } else {
        savedScores.push(score);
        console.log("not-null", savedScores);
        saveScore();
        retry();
        return;
    }
}


function localStorageSave(event) {
    event.preventDefault
    console.log(score)
    checkStorage()
}

function retry() {
    document.getElementById("info").innerText = "Try Again?";
    displayScores()

}

function displayScores() {
    saveButtonEl.classList.add("d-none");
    initialsEl.classList.add("d-none");
    document.getElementById("info").classList.add("d-none");
    startButtonEl.classList.remove("d-none");
    document.getElementById("scoreTable").classList.remove("d-none");
    document.getElementById("scores").innerHTML = '';
    clearButtonEl.classList.remove("d-none");
    if (savedScores != null) {
        for (let i = 0; i < savedScores.length; i++) {
            document.getElementById("scores").innerHTML += `<div class="row">
        <div class="col">
            ${savedScores[i].initials}
        </div>
        <div class="col">
            ${savedScores[i].time}
        </div>`
        }
    }
}

function clearDisplay() {
    document.getElementById('timer').classList.add("d-none");
    questionEl.classList.add("d-none");
    option1El.classList.add("d-none");
    option2El.classList.add("d-none");
    option3El.classList.add("d-none");
    option4El.classList.add("d-none");
    infoEl.classList.remove("d-none");
    clearInterval(timerStart)
    displayScores()
}

function home() {
    window.location.reload(true)
}

function clearLocalStorage() {
    localStorage.removeItem("scores");
    savedScores = []
    displayScores();
}
