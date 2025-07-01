import { quizData } from './quizData.js';
import './style.css';

const app = document.querySelector('#app');

// HTML principal agora envolvido por um <div class="container"> para garantir a responsividade.
app.innerHTML = `
<div class="container py-4">
  <main style="display:none;">
    <header class="mb-4 text-center">
      <h1 class="fw-bold text-primary">BDQuiz</h1>
      <p class="text-muted">Demonstre sua expertise em funções agregadas e subconsultas SQL</p>
    </header>

    <div class="d-flex justify-content-between align-items-center mb-2 text-muted">
      <div id="progress"></div>
      <div id="timer" class="fw-bold">Tempo: 00:00</div>
    </div>
    
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

// Seleção de todos os elementos do DOM
const main = app.querySelector('main');
const quizContainer = document.getElementById('quiz-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const navButtons = document.getElementById('nav-buttons');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');
const progressDiv = document.getElementById('progress');
const timerDiv = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');

// Modal do Bootstrap
const startModal = new bootstrap.Modal(document.getElementById('startModal'));
const startBtn = document.getElementById('start-btn');

// Estado da aplicação
let currentQuestion = 0;
let timerInterval = null;
let secondsElapsed = 0;

// --- FUNÇÕES DO CRONÔMETRO ---

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function startTimer() {
  secondsElapsed = 0;
  timerDiv.textContent = `Tempo: ${formatTime(secondsElapsed)}`;
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerDiv.textContent = `Tempo: ${formatTime(secondsElapsed)}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// --- FUNÇÕES DE LÓGICA DO QUIZ ---

function showQuestion(index) {
  progressDiv.textContent = `Pergunta ${index + 1} de ${quizData.length}`;
  const q = quizData[index];

  quizContainer.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-primary fw-semibold">${index + 1}. ${q.question}</h2>
        <form>
          ${q.options
            .map((opt, i) => `
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
            `).join('')}
          <div class="invalid-feedback">Por favor, selecione uma alternativa.</div>
        </form>
      </div>
    </div>
  `;

  restoreAnswer(index);
  updateButtons();
  resultDiv.style.display = 'none';
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
  if (saved) {
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
  stopTimer();

  let score = 0;
  for (let i = 0; i < quizData.length; i++) {
    const userAnswer = sessionStorage.getItem(`bdquiz-answer-${i}`);
    if (userAnswer === quizData[i].answer) {
      score++;
    }
  }

  const percentage = (score / quizData.length) * 100;
  const timeTaken = formatTime(secondsElapsed);

  // Exibe o resultado final
  resultDiv.innerHTML = `
    <h4 class="alert-heading">Resultado Final!</h4>
    <p>Você acertou <strong>${score} de ${quizData.length}</strong> questões (${percentage.toFixed(0)}%).</p>
    <p class="mb-0">Tempo total: <strong>${timeTaken}</strong>.</p>
  `;
  resultDiv.classList.remove('alert-success', 'alert-warning');
  resultDiv.classList.add(percentage >= 70 ? 'alert-success' : 'alert-warning');
  resultDiv.style.display = 'block';

  // Exibe a revisão das respostas
  showAnswersReview();

  // Esconde botões de navegação e mostra o de reiniciar
  navButtons.style.display = 'none';
  submitBtn.style.display = 'none';
  restartBtn.style.display = 'block';
}

function showAnswersReview() {
  const correctAnswersHtml = [];
  const incorrectAnswersHtml = [];

  quizData.forEach((q, index) => {
    const userAnswer = sessionStorage.getItem(`bdquiz-answer-${index}`);
    const correctAnswer = q.answer;
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      correctAnswersHtml.push(`
        <li class="list-group-item">
          <strong>Questão ${index + 1}:</strong> ${q.question}
        </li>
      `);
    } else {
      incorrectAnswersHtml.push(`
        <li class="list-group-item">
          <div class="fw-bold">Questão ${index + 1}: ${q.question}</div>
          <div class="ps-2 mt-1">
            <span class="text-danger">Sua resposta:</span> ${userAnswer || "Não respondida"}
            <br>
            <span class="text-success">Resposta correta:</span> ${correctAnswer}
          </div>
        </li>
      `);
    }
  });

  const reviewHtml = `
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <h5 class="text-success">Acertos ✅</h5>
        ${correctAnswersHtml.length > 0
          ? `<ul class="list-group">${correctAnswersHtml.join('')}</ul>`
          : '<p class="text-muted">Nenhum acerto.</p>'
        }
      </div>
      <div class="col-12 col-md-6">
        <h5 class="text-danger">Erros ❌</h5>
        ${incorrectAnswersHtml.length > 0
          ? `<ul class="list-group">${incorrectAnswersHtml.join('')}</ul>`
          : '<p class="text-muted">Parabéns, nenhum erro!</p>'
        }
      </div>
    </div>
  `;

  quizContainer.innerHTML = reviewHtml;
}


function resetQuiz() {
  // Limpa o armazenamento da sessão
  for (let i = 0; i < quizData.length; i++) {
    sessionStorage.removeItem(`bdquiz-answer-${i}`);
  }
  
  // Reseta o estado
  currentQuestion = 0;
  stopTimer();

  // Atualiza a UI para o estado inicial
  resultDiv.style.display = 'none';
  restartBtn.style.display = 'none';
  navButtons.style.display = 'flex';
  
  startTimer();
  showQuestion(currentQuestion);
}

// --- EVENT LISTENERS ---

startBtn.addEventListener('click', () => {
  startModal.hide();
  main.style.display = 'block';
  startTimer();
  showQuestion(currentQuestion);
});

prevBtn.addEventListener('click', () => {
  saveAnswer(currentQuestion);
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

nextBtn.addEventListener('click', () => {
  if (!isAnswerSelected()) return;
  saveAnswer(currentQuestion);
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  }
});

submitBtn.addEventListener('click', () => {
  if (!isAnswerSelected()) return;
  saveAnswer(currentQuestion);
  calculateAndShowResults();
});

restartBtn.addEventListener('click', resetQuiz);

// --- INICIALIZAÇÃO ---

// Abre o modal automaticamente ao carregar a página
startModal.show();