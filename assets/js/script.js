//Variable Required
var qIndex = 0; 
var mainContent = document.querySelector(".main-content");
var timerElement = document.querySelector(".timer")
var currentQuestion = {}
var timer = 60;
let timeInterval; 


//Formats for changing layout 
const playContent = 
'<div>Would you like to play a game</div> <button type="submit" id="play">Play</button>'

const questionFormat = 
'<p class="question"></p><ol class="answers"><li class="answer"></li><li class="answer"></li><li class="answer"></li><li class="answer"></li></ol>'

const initialFormat = '<label for="initials"></label><input name="initials" placeholder="Initials Here"></input><button>Submit</button>'


// Question Objects --------------------------------------------------------------
const question1 = {
    question : "What is a number?",
    answers : ["0","word", "true", "undefined"],
    correctAnswer : "0"
}

const question2 = {
    question : "What is a string?",
    answers : ["0","word", "true", "undefined"],
    correctAnswer : "word"
}

const question3 = {
    question : "What is a boolean?",
    answers : ["0","word", "true", "undefined"],
    correctAnswer : "true"
}

const question4 = {
    question : "What is undefined?",
    answers : ["0","undefined", "true", "undefined"],
    correctAnswer : "undefined"
}

const qArray = [question1, question2, question3, question4];

// --------------------------------------------------------------------------

//Function that starts the timer and returns the interval to clear it elsewhere
function startTimer(){

    timer = 60;
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
}




//Function that starts the game
function playGame(){
    startTimer();
    swapContent(questionFormat);
    presentQuestion();
}


function presentQuestion(){
    
    if(qIndex === qArray.length){
        swapContent(initialFormat);
        clearInterval(timeInterval);
        return;
    }
    //Question we are currently displaying
    let answers = document.querySelectorAll('.answer');
    let question = document.querySelector('.question');
    var answerList = document.querySelector(".answers");
    currentQuestion = qArray[qIndex];
    console.log(currentQuestion);
    question.innerHTML = currentQuestion.question;
    for(var i = 0; i < answers.length; i++){
        answers[i].innerHTML = currentQuestion.answers[i];
    }

    
    answerList.addEventListener("click", giveAnswer = function(e){
        var element = e.target;
        if(element.matches(".answer")){
            console.log(element.innerHTML);
            console.log(currentQuestion.correctAnswer)
            console.log(element.innerHTML === currentQuestion.correctAnswer)
            if(element.innerHTML === currentQuestion.correctAnswer){
                answerList.removeEventListener("click", giveAnswer);
                qIndex++;
                presentQuestion();
            }
        }
    })
}




//Swap to the do you want to play initially
swapContent(playContent);

//Play button to add event listener to and add it 
var playButton = document.querySelector("#play");
playButton.addEventListener("click", playGame);


