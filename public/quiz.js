document.addEventListener('DOMContentLoaded', () => {
  console.log('Quiz script loaded');
  const startBtn = document.getElementById('start-quiz');
  const quizContent = document.getElementById('quiz-content');
  const questionEl = document.getElementById('question');
  const answerButtons = document.querySelectorAll('.answer');
  const resultEl = document.getElementById('result');

  console.log('Start button:', startBtn);
  console.log('Quiz content:', quizContent);

  const quizQuestions = [
    {
      question: "What is the minimum legal age for marriage?",
      answers: ["18 years", "21 years"],
      correct: 0
    },
    {
      question: "Is workplace harassment legally punishable?",
      answers: ["Yes", "No"],
      correct: 0
    },
    {
      question: "Can a woman claim property rights after marriage?",
      answers: ["Yes", "No"],
      correct: 0
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answerButtons.forEach((btn, index) => {
      btn.textContent = currentQuestion.answers[index];
      btn.disabled = false;
      btn.style.backgroundColor = '';
    });
    resultEl.textContent = '';
  }

  function selectAnswer(index) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (index === currentQuestion.correct) {
      score++;
      resultEl.textContent = 'Correct!';
      answerButtons[index].style.backgroundColor = 'green';
    } else {
      resultEl.textContent = 'Wrong!';
      answerButtons[index].style.backgroundColor = 'red';
      answerButtons[currentQuestion.correct].style.backgroundColor = 'green';
    }
    answerButtons.forEach(btn => btn.disabled = true);
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      questionEl.textContent = `Quiz completed! Your score: ${score} / ${quizQuestions.length}`;
      answerButtons.forEach(btn => btn.style.display = 'none');
      resultEl.textContent = '';
      startBtn.textContent = 'Restart Quiz';
      startBtn.style.display = 'inline-block';
      startBtn.disabled = false;
    }
  }

  startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    answerButtons.forEach(btn => {
      btn.style.display = 'inline-block';
      btn.disabled = false;
      btn.style.backgroundColor = '';
    });
    quizContent.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  });

  answerButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      selectAnswer(index);
      setTimeout(nextQuestion, 1000);
    });
  });
});
