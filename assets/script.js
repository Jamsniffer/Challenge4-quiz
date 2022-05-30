var questionCount = 0;
var timer = 600000;
var quizQuestions= [
    //question 1
    {
        "question": "What is the proper syntax of a for loop?",

        "a1" : "for {i = 0; i < 7; i++}",

        "a2" : "for (var i = 0; i < 7; i++)",

        "a3" : "for {i = 0; i < 7; i+=}",

        "a4" : "for (int i = 0; i < 7; i++)",

        "ca" : "a2"
    },
    //question 2
    {
        "question": "What is the correct definition of hoisting?",

        "a1" : "The program physically lifts your computer",

        "a2" : "Hoisting is a default behaviour of javascript where all the conditional statements are moved on top of their functions.",

        "a3" : "Hoisting in JavaScript refers to the current context of code, which determines the accessibility of variables to JavaScript",

        "a4" : "Hoisting is a default behaviour of javascript where all the variable and function declarations are moved on top.",

        "ca" : "a4"
    },
    //question 3
    {
        "question": "",

        "a1" : "",

        "a2" : "",

        "a3" : "",

        "a4" : "",

        "ca" : ""
    },
    //question 4
    {
        "question": "",

        "a1" : "",

        "a2" : "",

        "a3" : "",

        "a4" : "",

        "ca" : ""
    },
    //question 5
    {
        "question": "",

        "a1" : "",

        "a2" : "",

        "a3" : "",

        "a4" : "",

        "ca" : ""
    },
    //question6
    {
        "question": "",

        "a1" : "",

        "a2" : "",

        "a3" : "",

        "a4" : "",

        "ca" : ""
    },
    //question 7
    {
        "question": "",

        "a1" : "",

        "a2" : "",

        "a3" : "",

        "a4" : "",

        "ca" : ""
    },
    //question 8
    {
        "question": "",

        "a1" : "",

        "a2" : "",

        "a3" : "",

        "a4" : "",

        "ca" : ""
    },
    //question 9
    {
        "question": "",

        "a1" : "",

        "a2" : "",

        "a3" : "",

        "a4" : "",

        "ca" : ""
    },
    //question 10
    {
        "question": "",

        "a1" : "",

        "a2" : "",

        "a3" : "",

        "a4" : "",

        "ca" : ""
    },

];

function createQuizPage() {

    while (document.body.firstChild && document.body.children.length > 1) {
        if (document.body.firstChild.tagName == "SCRIPT") {
            var scriptElement = document.body.firstChild;
            scriptElement.remove;
            document.body.appendChild(scriptElement);
            continue;
        }
        document.body.firstChild.remove();
    }

    createQuestions();

}

function createQuestions() {
    var messageAppended = false;
    var qcIncremented=false;
    var questionActual = document.createElement("h2");
    questionActual.setAttribute("id", "question-title");
    var minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timer % (1000 * 60)) / 1000);

    if (questionCount>=10 ) {
        var highScore= timer;
        createEndPage();
    }

    if (questionCount < 10) {
        questionActual.innerHTML= quizQuestions[questionCount].question + "   Timer: " + minutes+":"+ ((seconds < 10 ? "0"+seconds : seconds));
        document.body.appendChild(questionActual);

        var countDown = setInterval(function(){
            timer-=1000;
            minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((timer % (1000 * 60)) / 1000);
            questionActual.innerHTML= quizQuestions[questionCount].question + "   Timer: " + minutes+":"+ ((seconds < 10 ? "0"+seconds : seconds));
        }, 1000);


        var questionsContainer = document.createElement("div");
        questionsContainer.setAttribute("id", "answers-container");
        questionsContainer.innerHTML= "<input type=radio name=answers id=a1 value=a1><span>" + quizQuestions[questionCount].a1
        + "</span></br><input type=radio name=answers id=a2 value=a2><span>" + quizQuestions[questionCount].a2
        + "</span></br><input type=radio name=answers id=a3 value=a3><span>" + quizQuestions[questionCount].a3
        + "</span></br><input type=radio name=answers id=a4 value=a4><span>" + quizQuestions[questionCount].a4 + "</span>";
        document.body.appendChild(questionsContainer);

        var submitArea = document.createElement("h3");
        submitArea.setAttribute("id", "submit-area");
        submitArea.innerHTML= "<button id=submit>Submit Answer</button>";
        document.body.appendChild(submitArea);

        var submit = document.querySelector("#submit");
        var radioButtons = document.querySelectorAll('input[name="answers"]');
        submit.addEventListener("click", function() {

            let selectedAnswer;
            for (var radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedAnswer =radioButton.value;
                    break;
                }

            }
            
            if (selectedAnswer === quizQuestions[questionCount].ca){
                var correct = document.createElement("div");
                correct.setAttribute("id", "question-correct");
                correct.innerHTML= "Your Answer is Correct!";
                if (!messageAppended) {
                    document.body.appendChild(correct);
                    messageAppended=true;
                }
                setTimeout(function() {
                    if (!qcIncremented){
                        questionCount++;
                        timer+=30000;
                        createQuizPage();
                        clearInterval(countDown);
                        qcIncremented=true;
                    }
                }, 2000);
            }else {
                var wrong = document.createElement("div");
                wrong.setAttribute("id", "question-wrong");
                wrong.innerHTML= "Your Answer is wrong!";
                if (!messageAppended) {
                document.body.appendChild(wrong);
                messageAppended=true;
            }
            setTimeout(function() {
                if (!qcIncremented){
                    questionCount++;
                    timer-=60000;
                    createQuizPage();
                    clearInterval(countDown);
                    qcIncremented=true;
                }
            }, 2000);
            }

        });

    }
   

    //document.getElementById("submit").addEventListener("click",createQuizPage);
    

}
function createEndPage() {
    var endPage = document.createElement("div");
    endPage.setAttribute("id", "end-page");
    endPage.innerHTML = "it worked!";
    document.body.appendChild(endPage);

}

document.getElementById("submit").addEventListener("click",createQuizPage);
