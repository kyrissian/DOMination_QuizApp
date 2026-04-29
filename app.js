function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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

let shuffledQuiz = shuffle([...quizData]);
let currentQuestionIndex = 0;
let score = 0;

const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const choicesContainer = document.getElementById("choices-container");
const nextButton = document.getElementById("next");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");
const quizContainer = document.getElementById("quiz-container");
const restartButton = document.getElementById("restart");

// initial screen setup
startContainer.style.display = "block";
quizContainer.style.display = "none"; // hide completely
scoreContainer.style.display = "none";

function loadQuestion() {
  const currentQuestion = shuffledQuiz[currentQuestionIndex];

  questionEl.textContent = currentQuestion.question;

  choicesContainer.innerHTML = "";
  nextButton.disabled = true;

  // build answer objects with correctness
  let options = currentQuestion.options.map((option, index) => {
    return {
      text: option,
      isCorrect: index === currentQuestion.answer,
    };
  });

  // shuffle answers
  shuffle(options);

  options.forEach((optionObj) => {
    const button = document.createElement("button");
    button.textContent = optionObj.text;

    button.dataset.correct = optionObj.isCorrect;

    button.addEventListener("click", () =>
      selectAnswer(optionObj.isCorrect, button),
    );

    choicesContainer.appendChild(button);
  });

  clearInterval(timerInterval);
  startTimer();

  if (currentQuestionIndex === shuffledQuiz.length - 1) {
    nextButton.textContent = "Get Score";
  } else {
    nextButton.textContent = "Next Question";
  }
}

function selectAnswer(isCorrect, clickedButton) {
  const buttons = choicesContainer.children;

  clearInterval(timerInterval);

  for (let btn of buttons) {
    btn.disabled = true;
  }

  if (isCorrect) {
    clickedButton.style.backgroundColor = "lightgreen";
    score++;
  } else {
    clickedButton.style.backgroundColor = "lightcoral";
    for (let btn of buttons) {
      if (btn.dataset.correct === "true") {
        btn.style.backgroundColor = "lightgreen";
      }
    }
  }

  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  clearInterval(timerInterval);

  currentQuestionIndex++;

  if (currentQuestionIndex < shuffledQuiz.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").textContent = `Time: ${timeLeft}`;

  timerInterval = setInterval(() => {
    timeLeft--;

    document.getElementById("timer").textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoFailQuestion();
    }
  }, 1000);
}

function autoFailQuestion() {
  const buttons = choicesContainer.children;

  for (let btn of buttons) {
    btn.disabled = true;
  }

  // highlight correct answer
  for (let btn of buttons) {
    if (btn.dataset.correct === "true") {
      btn.style.backgroundColor = "lightgreen";
    }
  }

  nextButton.disabled = false;
}

function showScore() {
  // hide quiz completely
  quizContainer.style.display = "none";

  // show score container only
  scoreContainer.style.display = "block";

  // update score text
  scoreText.textContent = `${score} out of ${shuffledQuiz.length}`;
}

let timeLeft = 10; // seconds per question
let timerInterval = null;

startButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  shuffledQuiz = shuffle([...quizData]);

  startContainer.style.display = "none";
  quizContainer.style.display = "block"; // 👈 show now

  loadQuestion();
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;

  shuffledQuiz = shuffle([...quizData]);

  quizContainer.style.display = "none"; // 👈 hide again
  scoreContainer.style.display = "none";
  startContainer.style.display = "block";

  clearInterval(timerInterval);
});

clearInterval(timerInterval);
startTimer();
