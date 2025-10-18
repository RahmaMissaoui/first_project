const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const resetScoresButton = document.getElementById('reset-scores');
const toggleMusicButton = document.getElementById('toggle-music');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const backgroundMusic = document.getElementById('background-music');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { x: 0, o: 0, draw: 0 };
let isMusicPlaying = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Start background music automatically
backgroundMusic.play().catch(() => console.log('Background music playback failed'));

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
resetScoresButton.addEventListener('click', resetScores);
toggleMusicButton.addEventListener('click', toggleMusic);

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());
    clickSound.play().catch(() => console.log('Sound playback failed'));

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        scores[currentPlayer.toLowerCase()]++;
        updateScores();
        highlightWinningCells();
        gameActive = false;
        winSound.play().catch(() => console.log('Sound playback failed'));
        return;
    }

    if (board.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        scores.draw++;
        updateScores();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function highlightWinningCells() {
    const winningCombo = winningCombinations.find(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
    if (winningCombo) {
        winningCombo.forEach(index => {
            cells[index].classList.add('winner');
        });
    }
}

function updateScores() {
    scoreX.textContent = scores.x;
    scoreO.textContent = scores.o;
    scoreDraw.textContent = scores.draw;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
}

function resetScores() {
    scores = { x: 0, o: 0, draw: 0 };
    updateScores();
    resetGame();
}

function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        toggleMusicButton.textContent = 'Play Music';
        toggleMusicButton.classList.add('muted');
    } else {
        backgroundMusic.play().catch(() => console.log('Background music playback failed'));
        toggleMusicButton.textContent = 'Pause Music';
        toggleMusicButton.classList.remove('muted');
    }
    isMusicPlaying = !isMusicPlaying;
}

message.textContent = `Player ${currentPlayer}'s turn`;