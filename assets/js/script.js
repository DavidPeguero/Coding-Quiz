var mainContent = document.querySelector(".main-content");

const playContent = 
'<div>Would you like to play a game</div> <button type="submit" id="play">Play</button>'

const questionFormat = 
'<ol class="answers"><li class="answer"></li><li class="answer"></li><li class="answer"></li><li class="answer"></li></ol>'

const question1 = {
    question : "What is a number?",
    answers : ["0","word", "true", "undefined"],
    correctAnswer : "0"
}

function swapContent(newinnerHTML){
    mainContent.innerHTML = newinnerHTML;
}

swapContent(playContent);

var playButton = document.querySelector("#play");
playButton.addEventListener("click", playGame);


function playGame(){
    swapContent(questionFormat)
    var answers = document.querySelectorAll('.answer');
    
    for(const answer of answers){
        console.log(answer)
        answer.addEventListener("click", function(){
            if(answer.dataset.correct === "true"){
                console.log(answer.dataset.correct);
                mainContent.innerHTML = "CORRECT";
            }
            else{
                console.log(answer.dataset.correct);
                mainContent.innerHTML = "INCORRECT"
            }
        })
    }
}