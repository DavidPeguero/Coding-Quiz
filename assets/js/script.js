//Current question index
var qIndex = 0; 

var mainContent = document.querySelector(".main-content");
var currentQuestion = {}
const playContent = 
'<div>Would you like to play a game</div> <button type="submit" id="play">Play</button>'

const questionFormat = 
'<p class="question"></p><ol class="answers"><li class="answer"></li><li class="answer"></li><li class="answer"></li><li class="answer"></li></ol>'

// Question Objects
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

const qArray = [question1, question2, ];

function swapContent(newinnerHTML){
    mainContent.innerHTML = newinnerHTML;
}

swapContent(playContent);

var playButton = document.querySelector("#play");
playButton.addEventListener("click", playGame);


//Function that starts the game
function playGame(){
    swapContent(questionFormat)
    presentQuestion() 
       
}


function presentQuestion(){
    
    if(qIndex === qArray.length){
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
            console.log("same? " + element.innerHTML === currentQuestion.correctAnswer)
            if(element.innerHTML === currentQuestion.correctAnswer){
                answerList.removeEventListener("click", giveAnswer);
                qIndex++;
                presentQuestion();
            }
        }
    })
}




