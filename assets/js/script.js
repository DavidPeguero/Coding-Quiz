//Current question index
qIndex = 0; 

var mainContent = document.querySelector(".main-content");

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

const qArray = [question1, question2];

function swapContent(newinnerHTML){
    mainContent.innerHTML = newinnerHTML;
}

swapContent(playContent);

var playButton = document.querySelector("#play");
playButton.addEventListener("click", playGame);


//Function that starts the game
function playGame(){
    swapContent(questionFormat)
    var answers = document.querySelectorAll('.answer');
    var question = document.querySelector('.question')

    while(qIndex < qArray.length){
        let currentQuestion = qArray[qIndex];
        
    }
}