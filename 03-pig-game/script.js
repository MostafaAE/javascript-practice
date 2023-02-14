'use strict';

let currentPlayer = 0;
let currentScore = 0;
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// STARTING GAME CONDITIONS
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// ROLL DICE LOGIC

// Generate a random number between 1 : 6
const generateNumber = () => Math.trunc(Math.random() * 6) + 1;

const setCurrentScore = player =>
  (document.querySelector(`#current--${player}`).textContent = currentScore);

const switchPlayer = function () {
  // reset current score
  currentScore = 0;
  setCurrentScore(currentPlayer);

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.toggle('player--active');

  // change player
  currentPlayer = Number(!currentPlayer);

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.toggle('player--active');
};

const rollDice = function () {
  // 1. Generate a random dice roll
  const diceResult = generateNumber();

  // 2. Display dice
  diceEl.src = `dice-${diceResult}.png`;
  diceEl.classList.remove('hidden');

  // 3. Check for rolled 1
  if (diceResult != 1) {
    // add dice to current score
    currentScore += diceResult;
    setCurrentScore(currentPlayer);
  } else {
    // switch to next player
    switchPlayer();
  }
};

btnRoll.addEventListener('click', rollDice);
