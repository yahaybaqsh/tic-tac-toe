
        // Gameboard Module
        const Gameboard = (function() {
            let board = Array(9).fill(null);
            
            const getBoard = () => [...board];
            
            const setCell = (index, value) => {
                if (index >= 0 && index < 9 && board[index] === null) {
                    board[index] = value;
                    return true;
                }
                return false;
            };
            
            const reset = () => {
                board = Array(9).fill(null);
            };
            
            const checkWinner = () => {
                const winPatterns = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                    [0, 4, 8], [2, 4, 6]             // diagonals
                ];
                
                for (const pattern of winPatterns) {
                    const [a, b, c] = pattern;
                    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                        return { winner: board[a], pattern };
                    }
                }
                
                if (board.every(cell => cell !== null)) {
                    return { tie: true };
                }
                
                return null;
            };
            
            return { getBoard, setCell, reset, checkWinner };
        })();

        // Player Factory
        const Player = (name, marker) => {
            return { name, marker };
        };

        // Game Controller Module
        const GameController = (function() {
            let players = [];
            let currentPlayerIndex = 0;
            let gameActive = false;
            
            const startGame = (player1Name, player2Name) => {
                players = [
                    Player(player1Name, 'X'),
                    Player(player2Name, 'O')
                ];
                currentPlayerIndex = 0;
                gameActive = true;
                Gameboard.reset();
                DisplayController.updateDisplay();
            };
            
            const getCurrentPlayer = () => players[currentPlayerIndex];
            
            const makeMove = (index) => {
                if (!gameActive) return;
                
                const currentPlayer = getCurrentPlayer();
                if (Gameboard.setCell(index, currentPlayer.marker)) {
                    const result = Gameboard.checkWinner();
                    if (result) {
                        gameActive = false;
                        DisplayController.gameEnd(result);
                    } else {
                        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
                        DisplayController.updateDisplay();
                    }
                }
            };
            
            const restartGame = () => {
                gameActive = true;
                Gameboard.reset();
                currentPlayerIndex = 0;
                DisplayController.updateDisplay();
            };
            
            const isGameActive = () => gameActive;
            
            return { startGame, getCurrentPlayer, makeMove, restartGame, isGameActive };
        })();

        // Display Controller Module
        const DisplayController = (function() {
            const setupSection = document.getElementById('setupSection');
            const gameSection = document.getElementById('gameSection');
            const gameboardElement = document.getElementById('gameboard');
            const statusElement = document.getElementById('status');
            const currentPlayerElement = document.getElementById('currentPlayer');
            const startBtn = document.getElementById('startBtn');
            const restartBtn = document.getElementById('restartBtn');
            const newGameBtn = document.getElementById('newGameBtn');
            const player1Input = document.getElementById('player1');
            const player2Input = document.getElementById('player2');
            
            const renderBoard = () => {
                gameboardElement.innerHTML = '';
                const board = Gameboard.getBoard();
                
                board.forEach((cell, index) => {
                    const cellElement = document.createElement('div');
                    cellElement.className = 'cell';
                    if (cell === 'X') {
                        cellElement.classList.add('x');
                        cellElement.textContent = 'X';
                    } else if (cell === 'O') {
                        cellElement.classList.add('o');
                        cellElement.textContent = 'O';
                    }
                    cellElement.addEventListener('click', () => GameController.makeMove(index));
                    gameboardElement.appendChild(cellElement);
                });
            };
            
            const updateDisplay = () => {
                renderBoard();
                if (GameController.isGameActive()) {
                    currentPlayerElement.textContent = GameController.getCurrentPlayer().name;
                }
            };
            
            const gameEnd = (result) => {
                renderBoard();
                if (result.tie) {
                    statusElement.innerHTML = '<div class="tie-message">It\'s a Tie!</div>';
                } else {
                    const winner = result.winner === 'X' ? 
                        document.getElementById('player1').value : 
                        document.getElementById('player2').value;
                    statusElement.innerHTML = `<div class="winner-message">${winner} Wins!</div>`;
                }
            };
            
            const init = () => {
                startBtn.addEventListener('click', () => {
                    const player1Name = player1Input.value.trim() || 'Player X';
                    const player2Name = player2Input.value.trim() || 'Player O';
                    GameController.startGame(player1Name, player2Name);
                    setupSection.style.display = 'none';
                    gameSection.style.display = 'block';
                });
                
                restartBtn.addEventListener('click', () => {
                    GameController.restartGame();
                });
                
                newGameBtn.addEventListener('click', () => {
                    setupSection.style.display = 'block';
                    gameSection.style.display = 'none';
                    player1Input.value = 'Player X';
                    player2Input.value = 'Player O';
                });
            };
            
            return { updateDisplay, gameEnd, init };
        })();

        // Initialize the game
        DisplayController.init();
    