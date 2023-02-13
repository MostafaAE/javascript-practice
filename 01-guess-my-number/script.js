'use strict';

const generateSecretNum = () => Math.trunc(Math.random() * 20) + 1;

let secretNumber = generateSecretNum();
let score = 20;
let highScore = 0;

const number = document.querySelector('.number');
const scoreMsg = document.querySelector('.score');
const message = document.querySelector('.message');
const guessEl = document.querySelector('.guess');
const highScoreEl = document.querySelector('.highscore');

const checkValue = function () {
  const guess = Number(guessEl.value);

  // no guess
  if (!guess) {
    message.textContent = '⛔ No Number!';
  }
  // right guess
  else if (guess === secretNumber) {
    message.textContent = '🎉 Correct Number';
    document.body.style.backgroundColor = '#60b347';
    number.textContent = secretNumber;
    number.style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      highScoreEl.textContent = highScore;
    }
  }
  // wrong guess
  else {
    if (score > 1) {
      message.textContent =
        guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
      scoreMsg.textContent = --score;
    } else {
      score = 0;
      message.textContent = '💥 You lost the game!';
      scoreMsg.textContent = score;
    }
  }
};
const check = document.querySelector('.check');
check.addEventListener('click', checkValue);

const resetGame = function () {
  message.textContent = 'Start guessing...';
  document.body.style.backgroundColor = '#222';
  number.textContent = '?';
  number.style.width = '15rem';
  secretNumber = generateSecretNum();
  score = 20;
  scoreMsg.textContent = score;
  guessEl.value = '';
};
const again = document.querySelector('.again');
again.addEventListener('click', resetGame);
