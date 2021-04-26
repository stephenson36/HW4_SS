let questionSpace = document.querySelector(".question");
let choiceButtons = document.querySelector(".choices");
//let submitButtons  = document.querySelector(".submit-button");
let timerEl = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");
let correctCount = 0;
let incorrectCount = 0;
let quizDone = false;
let timer;
let timerCount;
let questionNumber;

let question1 = {
    q: "What is the starting idex number for an array in javascript?",
    qChoices:['1. 1','2. 5','3. 0','4. 10'],
    qAnswer: 2,
}

let question2 = {
    q: "Which of the following is an example of a javascript comparison operator?",
    qChoices:['1.  =','2.  !==','3.  !','4.  /'],
    qAnswer: 1,
}

let question3 = {
    q: "What is the acronym used to describe the different data types used in javascript?",
    qChoices:['1. rollo','2. bread','3. hotdog','4. bunso'],
    qAnswer: 3,
}

let question4 = {
    q: "What type of event listener is triggered when you select your answer to this question?",
    qChoices:['1. click','2. submit','3. key down','4. key up'],
    qAnswer: 0,
}

let questionList = [question1, question2, question3, question4];

function startGame() {
    quizDone = false;
    timerCount = 75;
    questionNumber = 0;
    showQuestion();
    startTimer();
}

function correctAnswer() {
  correctCount++;
  setCorrectAnswers();
}

function wrongAnswer() {
  incorrectCount++;
  setWrongAnswer()
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount >= 0) {
            if (quizDone && timerCount > 0) {
                clearInterval(timer);
            }
        }
    // TODO: if time runs out, clear the timer and call the loseGame function
    if (timerCount === 0) {
        clearInterval(timer);
        quizEnd();
    }
  }, 1000);
}

function showQuestion() {
    questionSpace.textContent = questionList[questionNumber].q;

    let unorderedList = document.querySelector(".choices");

    if(questionNumber !== 0){
        unorderedList.textContent="";
    }

    for (let i = 0; i<questionList[questionNumber].qChoices.length; i++) {
        let newListItem = document.createElement("button");
        unorderedList.appendChild(newListItem);
        newListItem.classList.add('choice-button');
        newListItem.textContent = questionList[questionNumber].qChoices[i];
    }    
}

function userChoice(event) {

    if(questionNumber === questionList.length){
        quizDone = true;
        quizEnd();
        return;
    } else{
        
        let userClick = event.target.innerHTML;
        for (let i = 0; i<questionList[questionNumber].qChoices.length;i++) {
            if (questionList[questionNumber].qChoices[i] === userClick){
                if(questionList[questionNumber].qAnswer === i){
                    correctAnswer();
                    questionNumber++; 
                    showQuestion();
                    return;
                }
            }
        }
        wrongAnswer();
        questionNumber++;
        showQuestion();    
    }
}

function setCorrectAnswers() {
  // TODO: set win count to local storage
  localStorage.setItem("correctTotal",correctCount);
}

function setWrongAnswer() {
  // TODO: set lose count to local storage
  localStorage.setItem("incorrectTotal",incorrectCount);
}

function quizEnd() {

    let userTotal = correctCount*5;

    let unorderedList = document.querySelector(".choices");
    unorderedList.textContent="";

    questionSpace.textContent = 'All Done!';
    
    let doneParagraph = document.createElement("p");
    questionSpace.appendChild(doneParagraph);
    doneParagraph.textContent = `Your final score is ${userTotal}.`;

    let highScoreForm = document.createElement("form");
    questionSpace.appendChild(highScoreForm);

    let highScoreLabel = document.createElement("label");
    highScoreForm.appendChild(highScoreLabel);
    highScoreLabel.textContent = "Enter initials: ";

    let highScoreInput = document.createElement("input");
    highScoreForm.appendChild(highScoreInput);
    
    let highScoreSubmit = document.createElement("button");
    highScoreForm.appendChild(highScoreSubmit);
    highScoreSubmit.classList.add('submit-button');
    highScoreSubmit.textContent = "Submit";

    let submitButtons = document.querySelector(".submit-button");
    submitButtons.addEventListener('submit',setHighScores);

}

function setHighScores(event) {
    
    let newHighScore = event.target.innerHTML;
    questionSpace.textContent = newHighScore;
}

function getHighScores() {
   
}

startButton.addEventListener("click", startGame);
choiceButtons.addEventListener('click',userChoice);

