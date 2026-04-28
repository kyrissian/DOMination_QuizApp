const quizData = [
  {
    question: "What is the correct syntax to declare a variable in JavaScript?",
    options: [
      "let myVariable;",
      "let = myVariable;",
      "variable myVariable;",
      "myVariable let",
    ],
    answer: 1,
  },
  {
    question: "Which array method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question: "How do you write a conditional statement in JavaScript?",
    options: [
      "if (condition) {}",
      "if condition {}",
      "if condition then {}",
      "if {condition}",
    ],
    answer: 0,
  },
  {
    question:
      "Which loop will execute at least once, even if the condition is false?",
    options: ["for loop", "while loop", "do...while loop", "foreach loop"],
    answer: 2,
  },
  {
    question: "How do you create an array in JavaScript?",
    options: [
      "let arr = [];",
      "let arr = {};",
      "let arr = ();",
      "let arr = <>;",
    ],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesContainer = document.getElementById("choices-container");
const nextButton = document.getElementById("next");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");
const quizContainer = document.getElementById("quiz-container");
const restartButton = document.getElementById("restart");

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  questionEl.textContent = currentQuestion.question;

  choicesContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", () => selectAnswer(index));

    nextButton.disabled = true;

    choicesContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  const correctIndex = quizData[currentQuestionIndex].answer;

  const buttons = choicesContainer.children;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;

    if (i === correctIndex) {
      buttons[i].style.backgroundColor = "green";
    } else if (i === selectedIndex) {
      buttons[i].style.backgroundColor = "red";
    }
  }

  nextButton.disabled = false;

  if (selectedIndex === correctIndex) {
    score++;
  }
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  // hide quiz completely
  quizContainer.style.display = "none";

  // show score container only
  scoreContainer.style.display = "block";

  // update score text
  scoreText.textContent = `${score} out of ${quizData.length}`;
}

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;

  // show quiz again
  quizContainer.style.display = "block";
  scoreContainer.style.display = "none";

  choicesContainer.innerHTML = "";
  nextButton.disabled = true;

  loadQuestion();
});

loadQuestion();
