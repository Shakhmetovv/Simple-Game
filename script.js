class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.createBoard();
        this.addEventListeners();
    }

    createBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';

        this.board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('game-cell');
            cellElement.dataset.index = index;
            gameBoard.appendChild(cellElement);
        });
    }

    addEventListeners() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.addEventListener('click', (e) => {
            if (this.gameOver) return;
            const cell = e.target;
            const index = cell.dataset.index;
            if (this.board[index] === null) {
                this.board[index] = this.currentPlayer;
                cell.textContent = this.currentPlayer;
                cell.classList.add('taken');

                if (this.checkWin()) {
                    this.gameOver = true;
                    this.highlightWinningCells();
                    // Подсветка и сообщение о победе после того, как все отображено
                    setTimeout(() => {
                        alert(`${this.currentPlayer} wins!`);
                    }, 300);
                } else if (this.board.every(cell => cell !== null)) {
                    this.gameOver = true;
                    alert('It\'s a draw!');
                } else {
                    // Смена игрока
                    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });

        const resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', () => {
            this.resetGame();
        });
    }

    checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные линии
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные линии
            [0, 4, 8], [2, 4, 6]            // Диагональные линии
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningCombination = combination;
                return true;
            }
        }
        return false;
    }

    highlightWinningCells() {
        if (!this.winningCombination) return;

        this.winningCombination.forEach(index => {
            document.querySelector(`.game-cell[data-index='${index}']`).classList.add('winning');
        });
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.winningCombination = null;
        this.createBoard();
    }
}

// Создаем экземпляр игры
new TicTacToe();
