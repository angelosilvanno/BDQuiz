import { quizData } from './quizData.js';
import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
<div class="container py-4">
  <main style="display:none;">
    <header class="mb-4 text-center">
      <h1 class="fw-bold text-primary">BDQuiz</h1>
      <p class="text-muted">Demonstre sua expertise em funções agregadas e subconsultas SQL</p>
    </header>
    
    <div id="quiz-container" class="position-relative mb-3"></div>

    <div id="nav-buttons" class="d-flex justify-content-between mb-3">
      <button id="prev-btn" type="button" class="btn btn-outline-primary" disabled>Anterior</button>
      <button id="next-btn" type="button" class="btn btn-primary">Próximo</button>
    </div>

    <button id="submit-btn" type="button" class="btn btn-success w-100" style="display:none;">
      Enviar Respostas
    </button>

    <div id="result" class="alert mt-3" role="alert" aria-live="polite" style="display:none;"></div>

    <button id="restart-btn" type="button" class="btn btn-primary w-100 mt-3" style="display:none;">
      Reiniciar Quiz
    </button>
  </main>
</div>
`;

const main = app.querySelector('main');
const quizContainer = document.getElementById('quiz-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const navButtons = document.getElementById('nav-buttons');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

const startModal = new bootstrap.Modal(document.getElementById('startModal'));
const startBtn = document.getElementById('start-btn');

let currentQuestion = 0;
let totalTimeInterval = null;
let questionTimerInterval = null;
let totalSecondsElapsed = 0;
const TIME_PER_QUESTION = 60; // 60 segundos por questão

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function startTotalTimer() {
  totalSecondsElapsed = 0;
  totalTimeInterval = setInterval(() => {
    totalSecondsElapsed++;
  }, 1000);
}

function stopAllTimers() {
  clearInterval(totalTimeInterval);
  clearInterval(questionTimerInterval);
}

function moveToNextQuestion(isTimeout = false) {
  clearInterval(questionTimerInterval);

  if (isTimeout) {
    sessionStorage.setItem(`bdquiz-answer-${currentQuestion}`, 'Tempo esgotado');
  } else {
    if (!isAnswerSelected()) return;
    saveAnswer(currentQuestion);
  }

  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  } else {
    calculateAndShowResults();
  }
}

function showQuestion(index) {
  const q = quizData[index];
  
  quizContainer.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Pergunta ${index + 1} de ${quizData.length}</span>
        <span id="question-timer-text" class="fw-bold"></span>
      </div>
      <div class="progress" style="height: 5px; border-radius: 0;">
        <div id="question-timer-bar" class="progress-bar" role="progressbar" style="width: 100%;"></div>
      </div>
      <div class="card-body">
        <h2 class="card-title text-primary fw-semibold">${index + 1}. ${q.question}</h2>
        <form>
          ${q.options.map((opt, i) => `
            <div class="form-check my-2">
              <input class="form-check-input" type="radio" name="q${index}" id="q${index}-opt${i}" value="${opt}" />
              <label class="form-check-label" for="q${index}-opt${i}">${opt}</label>
            </div>
          `).join('')}
          <div class="invalid-feedback">Por favor, selecione uma alternativa.</div>
        </form>
      </div>
    </div>
  `;
  
  startQuestionTimer();
  restoreAnswer(index);
  updateButtons();
  resultDiv.style.display = 'none';
}

function startQuestionTimer() {
  clearInterval(questionTimerInterval);
  let timeRemaining = TIME_PER_QUESTION;

  const timerText = document.getElementById('question-timer-text');
  const timerBar = document.getElementById('question-timer-bar');

  const updateDisplay = () => {
    timerText.textContent = `Tempo: 00:${String(timeRemaining).padStart(2, '0')}`;
    const percentage = (timeRemaining / TIME_PER_QUESTION) * 100;
    timerBar.style.width = `${percentage}%`;

    timerBar.classList.remove('bg-success', 'bg-warning', 'bg-danger');
    if (percentage <= 25) {
      timerBar.classList.add('bg-danger');
    } else if (percentage <= 50) {
      timerBar.classList.add('bg-warning');
    } else {
      timerBar.classList.add('bg-success');
    }
  };

  updateDisplay();

  questionTimerInterval = setInterval(() => {
    timeRemaining--;
    updateDisplay();
    if (timeRemaining <= 0) {
      moveToNextQuestion(true); // Avança automaticamente por timeout
    }
  }, 1000);
}

function isAnswerSelected() {
  const feedback = quizContainer.querySelector('.invalid-feedback');
  const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
  if (!selected) {
    feedback.style.display = 'block';
    return false;
  }
  feedback.style.display = 'none';
  return true;
}

function saveAnswer(index) {
  const selected = document.querySelector(`input[name="q${index}"]:checked`);
  if (selected) {
    sessionStorage.setItem(`bdquiz-answer-${index}`, selected.value);
  }
}

function restoreAnswer(index) {
  const saved = sessionStorage.getItem(`bdquiz-answer-${index}`);
  if (saved && saved !== 'Tempo esgotado') {
    const inputToCheck = document.querySelector(`input[name="q${index}"][value="${saved}"]`);
    if (inputToCheck) inputToCheck.checked = true;
  }
}

function updateButtons() {
  prevBtn.disabled = currentQuestion === 0;
  navButtons.style.display = 'flex';
  nextBtn.style.display = currentQuestion === quizData.length - 1 ? 'none' : 'inline-block';
  submitBtn.style.display = currentQuestion === quizData.length - 1 ? 'block' : 'none';
  restartBtn.style.display = 'none';
}

function calculateAndShowResults() {
  stopAllTimers();

  let score = 0;
  for (let i = 0; i < quizData.length; i++) {
    const userAnswer = sessionStorage.getItem(`bdquiz-answer-${i}`);
    if (userAnswer === quizData[i].answer) {
      score++;
    }
  }

  const percentage = (score / quizData.length) * 100;
  const timeTaken = formatTime(totalSecondsElapsed);

  resultDiv.innerHTML = `
    <h4 class="alert-heading">Resultado Final!</h4>
    <p>Você acertou <strong>${score} de ${quizData.length}</strong> questões (${percentage.toFixed(0)}%).</p>
    <p class="mb-0"><strong>Tempo total:</strong> ${timeTaken}</p>
  `;
  resultDiv.classList.remove('alert-success', 'alert-warning');
  resultDiv.classList.add(percentage >= 70 ? 'alert-success' : 'alert-warning');
  resultDiv.style.display = 'block';

  showAnswersReview();
  navButtons.style.display = 'none';
  submitBtn.style.display = 'none';
  restartBtn.style.display = 'block';
}

function showAnswersReview() {
  const correctAnswersHtml = [];
  const incorrectAnswersHtml = [];

  quizData.forEach((q, index) => {
    const userAnswer = sessionStorage.getItem(`bdquiz-answer-${index}`);
    const isCorrect = userAnswer === q.answer;

    if (isCorrect) {
      correctAnswersHtml.push(`
        <li class="list-group-item">
          <p class="mb-1"><strong>Questão ${index + 1}:</strong> ${q.question}</p>
          <p class="mb-0 text-muted small">Sua resposta: <span class="text-success fw-bold">${userAnswer}</span></p>
        </li>
      `);
    } else {
      let feedbackHtml;
      if (userAnswer === 'Tempo esgotado') {
        feedbackHtml = `<p class="mb-1 text-warning small"><strong>Sua resposta:</strong> Tempo esgotado</p>`;
      } else {
        feedbackHtml = `<p class="mb-1 text-danger small"><strong>Sua resposta:</strong> ${userAnswer || "Não respondida"}</p>`;
      }

      incorrectAnswersHtml.push(`
        <li class="list-group-item">
          <p class="mb-2"><strong>Questão ${index + 1}:</strong> ${q.question}</p>
          <div class="ps-2">
            ${feedbackHtml}
            <p class="mb-2 text-success small"><strong>Resposta correta:</strong> ${q.answer}</p>
            <div class="alert alert-info small p-2">
              <strong>Por quê?</strong> ${q.explanation}
            </div>
          </div>
        </li>
      `);
    }
  });

  const hasErrors = incorrectAnswersHtml.length > 0;
  const reviewHtml = `
    <ul class="nav nav-tabs nav-fill mb-3" id="resultTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link ${hasErrors ? 'active' : ''}" id="errors-tab" data-bs-toggle="tab" data-bs-target="#errors-pane" type="button" role="tab">
          Erros ❌ <span class="badge rounded-pill text-bg-danger">${incorrectAnswersHtml.length}</span>
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link ${!hasErrors ? 'active' : ''}" id="correct-tab" data-bs-toggle="tab" data-bs-target="#correct-pane" type="button" role="tab">
          Acertos ✅ <span class="badge rounded-pill text-bg-success">${correctAnswersHtml.length}</span>
        </button>
      </li>
    </ul>
    <div class="tab-content" id="resultTabsContent">
      <div class="tab-pane fade ${hasErrors ? 'show active' : ''}" id="errors-pane" role="tabpanel">
        ${hasErrors ? `<ul class="list-group shadow-sm">${incorrectAnswersHtml.join('')}</ul>` : '<div class="card p-4 text-center text-muted">Parabéns, nenhum erro!</div>'}
      </div>
      <div class="tab-pane fade ${!hasErrors ? 'show active' : ''}" id="correct-pane" role="tabpanel">
        ${correctAnswersHtml.length > 0 ? `<ul class="list-group shadow-sm">${correctAnswersHtml.join('')}</ul>` : '<div class="card p-4 text-center text-muted">Nenhum acerto.</div>'}
      </div>
    </div>
  `;
  quizContainer.innerHTML = reviewHtml;
}

function resetQuiz() {
  for (let i = 0; i < quizData.length; i++) {
    sessionStorage.removeItem(`bdquiz-answer-${i}`);
  }
  currentQuestion = 0;
  stopAllTimers();
  resultDiv.style.display = 'none';
  restartBtn.style.display = 'none';
  navButtons.style.display = 'flex';
  startTotalTimer();
  showQuestion(currentQuestion);
}

startBtn.addEventListener('click', () => {
  startModal.hide();
  main.style.display = 'block';
  startTotalTimer();
  showQuestion(currentQuestion);
});

prevBtn.addEventListener('click', () => {
  clearInterval(questionTimerInterval);
  saveAnswer(currentQuestion);
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

nextBtn.addEventListener('click', () => moveToNextQuestion(false));

submitBtn.addEventListener('click', () => {
  if (!isAnswerSelected()) return;
  clearInterval(questionTimerInterval);
  saveAnswer(currentQuestion);
  calculateAndShowResults();
});

restartBtn.addEventListener('click', resetQuiz);

startModal.show();