'use strict';

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

const number = document.querySelector('.number');
const scoreMsg = document.querySelector('.score');
const message = document.querySelector('.message');

const checkValue = function () {
  const guess = Number(document.querySelector('.guess').value);

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
