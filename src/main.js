import { quizData } from './quizData.js';
import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <main style="display:none;">
    <header class="mb-4 text-center">
      <h1 class="fw-bold text-primary">BDQuiz</h1>
      <p class="text-muted">Demonstre sua expertise em funções agregadas e subconsultas SQL</p>
    </header>

    <div id="progress"></div>
    <div id="quiz-container" class="position-relative mb-3"></div>

    <div class="d-flex justify-content-between mb-3">
      <button id="prev-btn" type="button" class="btn btn-outline-primary" disabled>Anterior</button>
      <button id="next-btn" type="button" class="btn btn-primary">Próximo</button>
    </div>

    <button id="submit-btn" type="button" class="btn btn-success w-100" style="display:none;">
      Enviar Respostas
    </button>

    <div id="result" role="alert" aria-live="polite"></div>
  </main>
`;

const main = app.querySelector('main');
const quizContainer = document.getElementById('quiz-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');
const progressDiv = document.getElementById('progress');

// Modal bootstrap
const startModal = new bootstrap.Modal(document.getElementById('startModal'));
const startBtn = document.getElementById('start-btn');

startModal.show();  // Abre o modal automaticamente ao carregar

startBtn.addEventListener('click', () => {
  startModal.hide();
  main.style.display = 'block';
  showQuestion(currentQuestion);
});

let currentQuestion = 0;

function showQuestion(index) {
  progressDiv.textContent = `Pergunta ${index + 1} de ${quizData.length}`;

  const q = quizData[index];
  quizContainer.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-primary fw-semibold">${index + 1}. ${q.question}</h2>
        <form>
          ${q.options
            .map(
              (opt, i) => `
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                name="q${index}"
                id="q${index}-opt${i}"
                value="${opt}"
              />
              <label class="form-check-label" for="q${index}-opt${i}">
                ${opt}
              </label>
            </div>
          `
            )
            .join('')}
          <div class="invalid-feedback">Por favor, selecione uma alternativa antes de continuar.</div>
        </form>
      </div>
    </div>
  `;

  restoreAnswer(index);
  updateButtons();
  clearResult();
}

function saveAnswer(index) {
  const selected = document.querySelector(`input[name="q${index}"]:checked`);
  if (selected) {
    sessionStorage.setItem(`bdquiz-answer-${index}`, selected.value);
  }
}

function restoreAnswer(index) {
  const saved = sessionStorage.getItem(`bdquiz-answer-${index}`);
  if (saved) {
    const inputToCheck = document.querySelector(`input[name="q${index}"][value="${saved}"]`);
    if (inputToCheck) inputToCheck.checked = true;
  }
}

function updateButtons() {
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.style.display = currentQuestion === quizData.length - 1 ? 'none' : 'inline-block';
  submitBtn.style.display = currentQuestion === quizData.length - 1 ? 'block' : 'none';
}

function clearResult() {
  resultDiv.textContent = '';
  resultDiv.classList.remove('show');
}

prevBtn.addEventListener('click', () => {
  saveAnswer(currentQuestion);
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

nextBtn.addEventListener('click', () => {
  const feedback = quizContainer.querySelector('.invalid-feedback');
  const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

  if (!selected) {
    feedback.style.display = 'block';
    return;
  } else {
    feedback.style.display = 'none';
  }

  saveAnswer(currentQuestion);

  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  }
});

submitBtn.addEventListener('click', () => {
  const feedback = quizContainer.querySelector('.invalid-feedback');
  const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

  if (!selected) {
    feedback.style.display = 'block';
    return;
  } else {
    feedback.style.display = 'none';
  }

  saveAnswer(currentQuestion);

  let score = 0;
  let allAnswered = true;

  for (let i = 0; i < quizData.length; i++) {
    const ans = sessionStorage.getItem(`bdquiz-answer-${i}`);
    if (!ans) {
      allAnswered = false;
      break;
    }
    if (ans === quizData[i].answer) score++;
  }

  if (!allAnswered) {
    resultDiv.textContent = 'Por favor, responda todas as perguntas.';
    resultDiv.classList.remove('show');
  } else {
    resultDiv.textContent = `Você acertou ${score} de ${quizData.length} questões.`;
    resultDiv.classList.add('show');
  }
});
// Inicializa a primeira pergunta
showQuestion(currentQuestion);