'use strict';

// Selecting elements
let newGame = document.querySelector('.btn--new');
let rollDice = document.querySelector('.btn--roll');
let holdScore = document.querySelector('.btn--hold');
let currentOne = document.getElementById('current--0');
let currentTwo = document.getElementById('current--1');
let scoreOne = document.getElementById('score--0');
let scoreTwo = document.getElementById('score--1');
let dice = document.querySelector('.dice');
let playerOne = document.querySelector('.player--0');
let playerTwo = document.querySelector('.player--1');

let currentScore, activePlayer;

const init = function () {
  currentScore = 0; // definisemo ovde, dakle izvan function, da se currentScor ne bi obnavljao svaki put kada kliknemo dugme roll dice
  activePlayer = 0;
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  rollDice.disabled = false;
  holdScore.disabled = false;

  currentOne.textContent = 0;
  currentTwo.textContent = 0;
  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;

  dice.style.display = 'none';
};

// Starting conditions
init();

const switchingThePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

// Roll Dice - Button
const onClickRollDice = function () {
  const randomNummber = Math.ceil(Math.random() * 6);
  dice.src = `dice-${randomNummber}.png`;
  dice.style.display = 'block';

  if (randomNummber > 1) {
    currentScore += randomNummber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else if (randomNummber === 1) {
    switchingThePlayer();
  }
};

// Disable the buttons
const buttonsDisabled = function () {
  rollDice.disabled = true;
  holdScore.disabled = true;
};

// Hold - Button
const onClickHold = function () {
  let sumScore =
    Number(document.getElementById(`score--${activePlayer}`).textContent) +
    Number(document.getElementById(`current--${activePlayer}`).textContent);
  console.log('sumScore', sumScore);

  if (sumScore < 20) {
    document.getElementById(`score--${activePlayer}`).textContent = sumScore;
    switchingThePlayer();
  } else if (sumScore >= 20) {
    document.getElementById(`score--${activePlayer}`).textContent = sumScore;
    dice.style.display = 'none';
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    currentScore = 0;

    buttonsDisabled();
  }
};

newGame.addEventListener('click', init);
rollDice.addEventListener('click', onClickRollDice);
holdScore.addEventListener('click', onClickHold);
