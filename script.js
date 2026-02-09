'use strict';

// Buttons
const resetBtn = document.getElementById('reset-btn');
const numbers = document.querySelectorAll('.num');

// Elements
const x = document.getElementById('x');
const leftHint = document.getElementById('left-hint');
const rightHint = document.getElementById('right-hint');
const Player1 = document.getElementById('player1-name');
const p1Last = document.getElementById('p1-last');
const Player2 = document.getElementById('player2-name');
const p2Last = document.getElementById('p2-last');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const winnerTxt = document.getElementById('winner-txt');

// Create random number (1 - 50)
let randomNumber = Math.floor(Math.random() * 50) + 1;
console.log('Random number:', randomNumber);

let currentPlayer = 1;

// Click on numbers
numbers.forEach((num) => {
  num.addEventListener('click', () => {
    const playerNum = Number(num.innerText);
    checkChoice(randomNumber, playerNum);
  });
});

// Check choice
function checkChoice(randomNumber, playerNum) {
  console.log('Random:', randomNumber);
  console.log('Player:', playerNum);
  console.log('Current Player:', currentPlayer);

  switchPlayer(playerNum);

  if (randomNumber === playerNum) {
    x.textContent = randomNumber;
    const winner = currentPlayer === 1 ? 2 : 1;
    openModal(winner);

  } else if (playerNum < randomNumber) {
    leftHint.textContent = playerNum + '<';

  } else {
    rightHint.textContent = '<' + playerNum;
    console.log('📈 too high');
  }
}

// Reset game
function resetGame() {
  randomNumber = Math.floor(Math.random() * 50) + 1;
  console.log('New random number:', randomNumber);
  x.textContent = 'x';
  leftHint.textContent = '<';
  rightHint.textContent = '<';
  p1Last.textContent = '-';
  p2Last.textContent = '-';
  currentPlayer = 1;
  winnerTxt.textContent = '';
  updateTurnUI();
}

// Switch player and update UI
function switchPlayer(playerNum) {
  if (currentPlayer === 1) {
    p1Last.textContent = playerNum;
  } else {
    p2Last.textContent = playerNum;
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnUI();
  console.log(`Now it's Player ${currentPlayer}'s turn`);
}

// Update UI for current player's turn
function updateTurnUI() {
  if (currentPlayer === 1) {
    Player1.style.fontSize = '1.5rem';
    Player1.style.color = '#2ecc71'; 

    Player2.style.fontSize = '1rem';
    Player2.style.color = '#aaa'; 
  } else {
    Player2.style.fontSize = '1.5rem';
    Player2.style.color = '#2ecc71';

    Player1.style.fontSize = '1rem';
    Player1.style.color = '#aaa';
  }
}

function openModal(winner) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  winnerTxt.textContent = 'player' + winner;
}

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  resetGame();
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Reset button
resetBtn.addEventListener('click', resetGame);

// Initialize UI
updateTurnUI();
