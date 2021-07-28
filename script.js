const quizSections = document.querySelectorAll(".quiz-section");
const start_section = document.querySelector("#start");
const startBtn = document.querySelector("#start-button");
const quiz_section = document.querySelector("#quiz-questions");
const time_remaining = document.querySelector("#time-remaining");
const QUESTION = document.querySelector("#question");
const choices = document.querySelector("#choices");
const choice_statuses = document.querySelectorAll(".choice-status");
const correct = document.querySelector("#correct");
const wrong = document.querySelector("#wrong");
const end_section = document.querySelector("#end");
const end_title = document.querySelector("#end-title");
const score = document.querySelector("#score");
const initials_input = document.querySelector("#Initials");
const submitScore = document.querySelector("#submit-score");
const error_message = document.querySelector("#error-message");

class Question {
  constructor(question, choices, indexCorrect) {
    this.question = question;
    this.choices = choices;
    this.indexCorrect = indexCorrect;
  }
}
const Q1 = new Question("Inside which element do you put JavaScript?", 
  ["<var>", "<script>", "<section>", "<code>"], 1);
const Q2 = new Question("How do you write 'Hello!' in an alert box?", 
  ["alertBox('Hello!');", "alert('Hello!');", "msg('Hello!');", "modal('Hello!');"], 1);
const Q3 = new Question("Arrays in JavaScript can be used to store ____.", 
  ["Other Arrays", "Numbers and Strings", "Booleans", "All of the above"], 3);
const Q4 = new Question("Where is the JavaScript placed inside an HTML document or page?", 
  ["<footer>", "<body> and <head>", "<meta>", "<title>"], 1);
const Q5 = new Question("What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?", 
  ["Loop", "Clone", "Repeater", "Debugger"], 0);
const question_list = [Q1, Q2, Q3, Q4, Q5];

let currentQuestion = 0;

let totalTime = 60;
let totalTimeInterval;
let timeout; 

startBtn.addEventListener('click', startGame);
choices.addEventListener('click', processChoice);
submitScore.addEventListener('submit', processInput);

function startGame() {
  showElement(quizSections, quiz_section);
  
  displayTime();  
  showQuestion();

  startTimer();
}

function showElement(siblingList, showElement) {
  for (element of siblingList) {
    hideElement(element);
  }
  showElement.classList.remove("hidden");
} 

function hideElement(element) {
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
}

function displayTime() {
  time_remaining.textContent = totalTime;
}

function startTimer() {
  totalTimeInterval = setInterval(function() {
    totalTime--;
    displayTime();
    checkTime();

  }, 1000);
}

function checkTime() {
  if (totalTime <= 0) {
    totalTime = 0;
    endGame();
  }
}

function showQuestion() {
  QUESTION.textContent = question_list[currentQuestion].question;

  showChoices();
}

function showChoices() {
  choices.innerHTML = "";

  question_list[currentQuestion].choices.forEach(function(answer, index) {
    const li = document.createElement("li");
    li.dataset.index = index;
    const button = document.createElement("button");
    button.textContent = (index + 1) + ". " + answer;
    li.appendChild(button);
    choices.appendChild(li);
  });
}

function processChoice(event) {
  const userChoice = parseInt(event.target.parentElement.dataset.index);

  reset();
  checkChoice(userChoice);
  nextQuestion();
}

function reset() {
  clearTimeout(timeout);
  timeRemainDefault();
}

function timeRemainDefault() {
  time_remaining.style.color = "blue";
}

function incorrectTimeLeft() {
  time_remaining.style.color = "red";
}

function checkChoice(userChoice) {
  if (isChoicecorrect(userChoice)) {
    correctChoice();
  } else {
    incorrectChoice();
  }
}

function isChoicecorrect(choice) {
  return choice === question_list[currentQuestion].indexCorrect;
}

function incorrectChoice() {
  deductTimeBy(10);

  incorrectTimeLeft();
  showElement(choice_statuses, wrong);

  timeout = setTimeout(function() {
    hideElement(wrong);
    timeRemainDefault();
  }, 1000);
}

function deductTimeBy(seconds) {
  totalTime -= seconds;
  checkTime();
  displayTime();
}

function correctChoice() {
  showElement(choice_statuses, correct);

  timeout = setTimeout(function() {
    hideElement(correct);
  }, 1000);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= question_list.length) {
    endGame();
  } else {
    showQuestion();
  }
}

function endGame() {
  clearInterval(totalTimeInterval);
  
  showElement(quizSections, end_section);
  displayscore();
  endText();
}

function displayscore() {
  score.textContent = totalTime;
}

function endText() {
  if (totalTime === 0) {
    end_title.textContent = "Too bad!  Keep studying JavaScript.";
  } else {
    end_title.textContent = "Awesome job!  You are a JavaScript master!";
  }
}

