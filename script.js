const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const board = document.getElementById('board');
const status = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
let currentPlayer;
let gameActive;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    gameActive = true;
    currentPlayer = X_CLASS;
    status.innerHTML = `Player ${currentPlayer === X_CLASS ? "Red Spider" : "Black Spider"}'s turn`;
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(currentPlayer);
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.cellIndex = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }
}

function handleClick(e) {
    const cell = e.target;
    const cellIndex = cell.dataset.cellIndex;
    if (!gameActive || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
        return;
    }
    placeMark(cell, cellIndex);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, cellIndex) {
    cell.classList.add(currentPlayer);
}

function swapTurns() {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
    board.classList.toggle(X_CLASS);
    board.classList.toggle(O_CLASS);
    status.innerHTML = `Player ${currentPlayer === X_CLASS ? "Red Spider" : "Black Spider"}'s turn`;
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return board.children[index].classList.contains(player);
        });
    });
}

function isDraw() {
    return [...board.children].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    if (draw) {
        status.innerHTML = 'It\'s a draw!';
    } else {
        status.innerHTML = `Player ${currentPlayer === X_CLASS ? "Red Spider" : "Black Spider"} wins!`;
    }
    gameActive = false;
}