let questionSpace = document.querySelector(".question");
let choiceButtons = document.querySelector(".choices");
let timerEl = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");
let highScoreStorage = [];
let correctCount = 0;
let incorrectCount = 0;
let highScoreCount = 1;
let quizDone = false;
let timer;
let timerCount;
let questionNumber;

let question1 = {
    q: "What is the starting index number for an array in javascript?",
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
}

function wrongAnswer() {
    incorrectCount++;
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
    let userClick = event.target.innerHTML;
    if(questionNumber === questionList.length-1){
        for (let i = 0; i<questionList[questionNumber].qChoices.length;i++) {
            if (questionList[questionNumber].qChoices[i] === userClick){
                if(questionList[questionNumber].qAnswer === i){
                    correctAnswer();
                }
            }
        }
        quizDone = true;
        quizEnd();
        return;
    } else{
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

function setHighScores(storeCount,storeInitials,storeScore) {
    let newHighScore = `${storeCount}. ${storeInitials} - ${storeScore}`;
    highScoreStorage.push(newHighScore);
    localStorage.setItem("highScores",highScoreStorage);
    console.log(highScoreStorage);

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
    highScoreSubmit.setAttribute('type','button');
    highScoreSubmit.textContent = "Submit";

}

startButton.addEventListener("click", startGame);
choiceButtons.addEventListener('click',userChoice);

document.addEventListener('click',function(event) {
    if (event.target && event.target.matches(".submit-button")){
        let userInitials = document.querySelector('input').value;
        let storedScores = localStorage.getItem("correctTotal")*5;
        setHighScores(highScoreCount,userInitials,storedScores);
        highScoreCount++;
        questionSpace.textContent = localStorage.getItem("highScores");
    }
});