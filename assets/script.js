var questionCount = 0;
var timer = 600000;
var NO_OF_HIGH_SCORES = 10;
var HIGH_SCORES = "highScores";
var highScoreString = localStorage.getItem(HIGH_SCORES);
var highScores = JSON.parse(highScoreString) ?? [];
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
        "question": "what will the following method log? console.log(('b' + 'a' + + 'a' + 'a').to LowerCase());",

        "a1" : "banana",

        "a2" : "baaa",

        "a3" : "bananaa",

        "a4" : "ananas",

        "ca" : "a1"
    },
    //question 4
    {
        "question": "JavaScript is a ___ -side programming language.",

        "a1" : "Client",

        "a2" : "Server",

        "a3" : "Both",

        "a4" : "None",

        "ca" : "a3"
    },
    //question 5
    {
        "question": "What is the correct 'if' statement to execute certain code if 'x' is equal to 2?",

        "a1" : "if (x!=2)",

        "a2" : "if (x=2)",

        "a3" : "if (x==2)",

        "a4" : "if (x2)",

        "ca" : "a3"
    },
    //question6
    {
        "question": "Which of the following functions of Boolean objects, returns a string of either 'true' or 'false' depending upon the value of the object?",

        "a1" : "valueOf()",

        "a2" : "toSource()",

        "a3" : "toString()",

        "a4" : "None of the above.",

        "ca" : "a3"
    },
    //question 7
    {
        "question": "Which operator is used for comparing values and data types?",

        "a1" : "=",

        "a2" : "==",

        "a3" : "===",

        "a4" : "=+=",

        "ca" : "a3"
    },
    //question 8
    {
        "question": "Which of the following represent falsy values in javascript",

        "a1" : "false",

        "a2" : "undefined",

        "a3" : "''",

        "a4" : "All of the above",

        "ca" : "a4"
    },
    //question 9
    {
        "question": "What is the role of continue keyword inside a loop",

        "a1" : "Ignore the rest of the statements below it and continue the loop",

        "a2" : "Break out of the loop",

        "a3" : "Restart the loop",

        "a4" : "None of the above",

        "ca" : "a1"
    },
    //question 10
    {
        "question": "Where did JavaScript get its name?",

        "a1" : "It's a faster, lighter version of JAVA",

        "a2" : "It's a type of Coffee script",

        "a3" : "JAVA was cool at the time JavaScript was created",

        "a4" : "It follows some of JAVA's syntax",

        "ca" : "a4"
    },

];

//remove all html elements and run create questions function

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

//create quiz question and answers

function createQuestions() {
    var messageAppended = false;
    var qcIncremented=false;
    var questionActual = document.createElement("h2");
    questionActual.setAttribute("id", "question-title");
    var minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timer % (1000 * 60)) / 1000);

    //quiz end and highscore and initals save
    if (questionCount>=10 ) {
        score = timer;
        checkHighScore(score)
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
    

};

function createEndPage() {
    var highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    var endPage = document.createElement("div");
    endPage.setAttribute("id", "end-page");
    console.log(highScores)
    endPage.innerHTML = highScores.map((score) => '<li>Score: ' + score.score + " - " + score.name); 
    document.body.appendChild(endPage);

};

//check to see if score is good enough to be on highscore list

function checkHighScore(score) {
    var highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    var lowestScore = highScores[NO_OF_HIGH_SCORES-1]?.scores ?? 0;

    if (score > lowestScore) {

        saveHighScore(score, highScores);
        showHighScores();
    }
}

//save high score to highscore list

function saveHighScore() {
    var name = prompt('You got a highscore! Enter your name or initials:');
    var newScore = {score, name}
    //add to list
    highScores.push(newScore);
    //sort new list
    highScores.sort((a,b) => b.score - a.score);
    //select new list
    highScores.splice(NO_OF_HIGH_SCORES);
    //save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
};

function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    var highScoresList = document.createElement("div"); //document.getElementById(HIGH_SCORES);

    //document.createElement("div")
    highScoresList.innerHTML = highScores.map((score) => '${score.score} - ${score.name}').join("");
}

document.getElementById("submit").addEventListener("click",createQuizPage);
