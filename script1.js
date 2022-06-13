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

// Starting conditions
scoreOne.textContent = '0';
scoreTwo.textContent = '0';
dice.style.display = 'none';

// New Game - Button
const onClickNewGame = function () {
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  rollDice.disabled = false;
  holdScore.disabled = false;

  currentOne.textContent = '0';
  currentTwo.textContent = '0';
  scoreOne.textContent = '0';
  scoreTwo.textContent = '0';
  dice.style.display = 'none';
};

// Roll Dice - Button
const onClickRollDice = function () {
  const randomNummber = Math.ceil(Math.random() * 6);
  dice.src = `dice-${randomNummber}.png`;
  dice.style.display = 'block';

  if (playerOne.classList.contains('player--active')) {
    if (currentOne.textContent === '0' && randomNummber !== 1) {
      currentOne.textContent = randomNummber;
    } else if (randomNummber === 1) {
      currentOne.textContent = '0';
      playerOne.classList.toggle('player--active');
      playerTwo.classList.toggle('player--active');
    } else if (randomNummber > 1 && currentOne.textContent !== '0') {
      currentOne.textContent = Number(currentOne.textContent) + randomNummber;
    }
  } else if (playerTwo.classList.contains('player--active')) {
    if (currentTwo.textContent === '0' && randomNummber !== 1) {
      currentTwo.textContent = randomNummber;
    } else if (randomNummber === 1) {
      currentTwo.textContent = '0';
      playerOne.classList.toggle('player--active');
      playerTwo.classList.toggle('player--active');
    } else if (randomNummber > 1 && currentTwo.textContent !== '0') {
      currentTwo.textContent = Number(currentTwo.textContent) + randomNummber;
    }
  }
};

// Disable the buttons

const buttonsDisabled = function () {
  rollDice.disabled = true;
  holdScore.disabled = true;
};

// Hold - Button
const onClickHold = function () {
  let sumScoreOne =
    Number(scoreOne.textContent) + Number(currentOne.textContent);
  console.log('sumScore', sumScoreOne);
  let sumScoreTwo =
    Number(scoreTwo.textContent) + Number(currentTwo.textContent);

  if (playerOne.classList.contains('player--active')) {
    if (sumScoreOne < 100) {
      scoreOne.textContent = sumScoreOne;
      playerOne.classList.toggle('player--active');
      playerTwo.classList.toggle('player--active');
      currentOne.textContent = '0';
    } else if (sumScoreOne >= 100) {
      scoreOne.textContent = sumScoreOne;
      dice.style.display = 'none';
      playerOne.classList.add('player--winner');
      currentOne.textContent = '0';
      buttonsDisabled();
    }
  } else if (playerTwo.classList.contains('player--active')) {
    if (sumScoreTwo < 100) {
      scoreTwo.textContent = sumScoreTwo;
      playerOne.classList.toggle('player--active');
      playerTwo.classList.toggle('player--active');
      currentTwo.textContent = '0';
    } else if (sumScoreTwo >= 100) {
      scoreTwo.textContent = sumScoreTwo;
      dice.style.display = 'none';
      playerTwo.classList.add('player--winner');
      currentTwo.textContent = '0';
      buttonsDisabled();
    }
  }
};

newGame.addEventListener('click', onClickNewGame);
rollDice.addEventListener('click', onClickRollDice);
holdScore.addEventListener('click', onClickHold);
