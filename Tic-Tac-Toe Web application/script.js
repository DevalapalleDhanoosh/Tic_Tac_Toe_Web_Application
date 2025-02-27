const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Add class for animation

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        updateScore(currentPlayer);
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.innerHTML = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXDisplay.innerHTML = scoreX;
    } else {
        scoreO++;
        scoreODisplay.innerHTML = scoreO;
    }
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('X', 'O'); // Remove classes for animation
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize the game status
statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;