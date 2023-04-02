//Variable Required
var qIndex = 0; 
var mainContent = document.querySelector(".main-content");
var timerElement = document.querySelector(".timer")
var currentQuestion = {}
var timer = 60;
let timeInterval; 
let highScores = [];

var viewScore = document.querySelector(".view-scores")




//Formats for changing layout 
const playContent = 
'<h1 class="play-game">Coding Quiz</h1><p class="subheader">Test your wits in a quiz to determine your Javascript knowledge! Be careful of choosing wrong; there will be consequences!</p> <button class="styled-button" type="submit" id="play">Play</button>'

const questionFormat = 
'<h1 class="question"></h1><ol class="answers"><li class="answer"></li><li class="answer"></li><li class="answer"></li><li class="answer"></li><p class="result-text"></p></ol>'

const initialFormat = '<h1 class="ask-initials">Save Score!<h1><p class="subheader align-center"></p><label for="initials"></label><input class="initials" name="initials" placeholder="Initials Here"></input><button class="submit-score styled-button">Submit</button>'

const viewScoreFormat = '<h1 class="score-list">Highscores</h1><ol class="highscores"></ol><div class="button-flex"><button class="styled-button inline go-back">Go Back</button><button class="styled-button inline clear-highscores">Clear Highscores</button></div>'
// Question Objects --------------------------------------------------------------
const question1 = {
    question : "What is method used to add an event listener?",
    answers : ["addEventLister","removeEventListener", "appendChild", "addEventListener"],
    correctAnswer : "addEventListener"
}

const question2 = {
    question : "What does clearInterval(intervalID) do?",
    answers : ["Cancels the repeated action corresponding to intervalID",
                "Stop the timer corresponding to intervalID"
                ,"Restarts the timer corresponding to intervalID"
                ,"None of the Above"],
    correctAnswer : "Cancels the repeated action corresponding to intervalID"
}

const question3 = {
    question : "What is a boolean?",
    answers : ["A variable that stores true or false",
    "A value that is either true or false",
     "A Mario enemy who is leaning when you're not looking at it",
      "A value that is undefined"],
    correctAnswer : "A value that is either true or false"
}

const question4 = {
    question : "What does DOM stand for",
    answers : ["Document Object Model","Domain Of Man", "Document Object Methods", "None of the Above"],
    correctAnswer : "Document Object Model"
}

const question5 = {
    question : "Which of the following is true concerning localStorage",
    answers : ["Can store objects","Can only store strings", "When using setItem on an item that doesn't exist it returns 0", "None of the Above"],
    correctAnswer : "Can only store strings"
}

const qArray = [question1, question2, question3, question4, question5];

// --------------------------------------------------------------------------

//Function that starts the timer and returns the interval to clear it elsewhere
function startTimer(){

    timer = 60;
    timerElement.innerHTML = "Time: " + timer;
    timeInterval = setInterval(function(){
        timer--;
        timerElement.innerHTML = "Time: " + timer;

        //When timer is done do this
        if(timer === 0){
            clearInterval(timeInterval);
        }
    },1000)

    return timeInterval;
}

//Function that swaps the maincontent section with another html preset
function swapContent(newinnerHTML){
    mainContent.innerHTML = newinnerHTML;
    if(newinnerHTML === viewScoreFormat){
        viewScore.textContent = "Return to game";
        viewScore.removeEventListener("click", viewScores);
        viewScore.addEventListener("click", returnToGame)
        clearInterval(timeInterval);
    }
    else if(newinnerHTML === playContent){
        viewScore.textContent = "View Highscores";
        viewScore.removeEventListener("click", returnToGame);
        viewScore.addEventListener("click", viewScores)

    }
}
 
function returnToGame(){
    swapContent(playContent);
    addPlayButtonEventListener();
}


//Function that starts the game
function playGame(){
    startTimer();
    swapContent(questionFormat);
    presentQuestion();
}

function addPlayButtonEventListener(){
    var playButton = document.querySelector("#play");
    playButton.addEventListener("click", playGame);
}

//Adds event listener to and the save score function to the submit button in the highscore context
function addInitialEventListener(){
    var submitScoreBtn = document.querySelector(".submit-score");
    var initialsElement = document.querySelector(".initials")
    submitScoreBtn.addEventListener("click", saveScore = function(){
        if(initialsElement.value !== ""){
            highScores.push({
                initials : initialsElement.value,
                score : timer
            })  
            localStorage.setItem("userScores" ,JSON.stringify(highScores));
            submitScoreBtn.removeEventListener("click", saveScore);
            viewScores();   
        }
    })
}

function submitInitialInit(){
    qIndex = 0;
    swapContent(initialFormat);
    var results = document.querySelector(".subheader");
    results.innerHTML = `You score is ${timer}`;
    clearInterval(timeInterval);
    addInitialEventListener()
}


//Presents the next question until no more questions are left
function presentQuestion(){
    
    if(qIndex === qArray.length){ 
        submitInitialInit();       
        return;
    }
    //Question we are currently displaying
    let answers = document.querySelectorAll('.answer');
    let question = document.querySelector('.question');
    var answerList = document.querySelector(".answers");
    currentQuestion = qArray[qIndex];
    question.innerHTML = currentQuestion.question;
    for(var i = 0; i < answers.length; i++){
        answers[i].innerHTML = currentQuestion.answers[i];
    }

    
    answerList.addEventListener("click", giveAnswer = function(e){
        var element = e.target;
        var resultText = document.querySelector(".result-text");
        if(element.matches(".answer")){
            console.log(element.innerHTML);
            console.log(currentQuestion.correctAnswer)
            console.log(element.innerHTML === currentQuestion.correctAnswer)
            if(element.innerHTML === currentQuestion.correctAnswer){
                answerList.removeEventListener("click", giveAnswer);
                qIndex++;
                resultText.style.display = "block";
                resultText.innerHTML = "Correct!"
                setTimeout(function(){
                    presentQuestion();
                    resultText.style.display = "none";
                }, 1000);
                
                
            }
            else{
                timer -= 10;
                if(timer <= 0){
                    clearInterval(timeInterval);
                    timerElement.innerHTML = "Time: " + 0;
                    resultText.style.display = "block";
                    resultText.innerHTML = "Sorry you lost";
                    answerList.removeEventListener("click", giveAnswer);
                    setTimeout(function(){
                        resultText.style.display = "none";
                        mainMenuInit();
                    }, 1000)
                }
                else{
                    timerElement.innerHTML = "Time: " + timer;
                    resultText.style.display = "block";
                    resultText.innerHTML = "Wrong!"
                    setTimeout(function(){
                        resultText.innerHTML = "";
                        resultText.style.display = "none";
                    }, 1000)
                }
            }
        }
    })
}

//Sorting functions for user scores
function compareScores(u1, u2) {
    if (u1.score > u2.score) return -1;
    if (u2.score > u1.score) return 1;
  
    return 0;
  }

//Initializes the scores array
function initScores(){
    if(localStorage.getItem("userScores") === null){
        highScores = [];
    }
    else{
        highScores = JSON.parse(localStorage.getItem("userScores"));
        highScores = highScores.sort(compareScores);
        console.log(highScores);
    }  
}

function populateHighscores(){
    var scores = document.querySelector(".highscores");
    scores.innerHTML = ""
    for(var i = 0; i < highScores.length; i++){
        tempLi = document.createElement('li');
        tempLi.textContent = highScores[i].initials + ": " + highScores[i].score;
        scores.appendChild(tempLi);
    }

    
}

function viewScores(){
    qIndex = 0;
    swapContent(viewScoreFormat);
    var goBack = document.querySelector(".go-back");
    var clearHighscores = document.querySelector(".clear-highscores");
    populateHighscores()

    goBack.addEventListener("click", back = function(){
        mainMenuInit();
        goBack.removeEventListener("click", back)
    })
    clearHighscores.addEventListener("click", clear = function(){
        localStorage.removeItem("userScores");
        highScores = localStorage.getItem("userScores");
        populateHighscores();
    })
}

function mainMenuInit(){
    swapContent(playContent);
    addPlayButtonEventListener();
}

//Swap to the do you want to play initially
mainMenuInit()

//Play button to add event listener to and add it 

viewScore.addEventListener("click", viewScores)


initScores();


