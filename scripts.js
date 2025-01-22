function Player(playerName, playerMarker) {
    const name = playerName;
    const marker = playerMarker;

    const getMarker = () => marker;
    const getName = () => name;

    return { getMarker, getName }
}

function Tile(tileRow, tileCol) {
    const row = tileRow;
    const col = tileCol;

    let value = null;

    const getRow = () => row;
    const getCol = () => col;

    const setValue = (newValue) => {
        if (value !== null) {
            console.log(`Tile is already occupied: ${value}`);
            return;
        }
        value = newValue;
    }

    const getValue = () => value;

    return { getRow, getCol, setValue, getValue };
}

function GameBoard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    // Create 2D array, 3x3 size to represent the board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = Tile(i, j);
        }
    }

    const getPosition = (row, col) => board[row][col];

    const getEmptyPositions = () => {
        let emptyPosition = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].getValue() === null) {
                    emptyPosition.push(board[i][j])
                }
            }
        }
        return emptyPosition;
    }

    const getBoard = () => board;

    // For displaying board on console
    const printBoard = () => {
        let stringBoard = "";
        for (let i = 0; i < rows; i++) {
            stringBoard += "[";
            for (let j = 0; j < cols; j++) {
                stringBoard += " " + (board[i][j].getValue() !== null ? `[${board[i][j].getValue()}]` : "[ ]") + " ";
            }
            stringBoard += "]\n\n";
        }
        console.log(stringBoard);
    }

    const placeMarker = function (row, col, marker) {
        if (board[row][col].getValue() !== null) {
            console.log("Tile is already occupied");
            return false;
        }
        board[row][col].setValue(marker);
        return true;
    }

    return { getPosition, getBoard, getEmptyPositions, placeMarker, printBoard };
}

function GameController(playerOne = "Player One", playerTwo = "Player Two") {
    let players = [Player(`${playerOne}`, "X"), Player(`${playerTwo}`, "O")];
    let gameboard;
    let gameOverState;
    let winningTileSequence; // The tile sequence that triggered the win condition for a player (if it wasn't a tie)
    let currentPlayer;
    let tileWinCondition; // All winning tile-sequence combinations for game to end

    const playRound = (row, col, marker) => {
        if (!gameOverState) {
            let successfulTurn = gameboard.placeMarker(row, col, marker);
            if (successfulTurn) {
                gameboard.printBoard();
                gameOverState = isGameOver();
                if (gameOverState) {
                    console.log(gameOverState);
                } else {
                    changeCurrentPlayer();
                }
                return true;
            }
        }
        return false;
    }

    const checkTileSequence = () => {
        for (let i = 0; i < tileWinCondition.length; i++) {
            if (tileWinCondition[i].every(position => position.getValue() !== null)) {
                let sequence = tileWinCondition[i];
                if (sequence.every(tile => tile.getValue() === sequence[0].getValue())) {
                    winningTileSequence = [...sequence];
                    return true;
                }
            }
        }
        return false;
    }

    const isGameOver = () => {
        if (checkTileSequence()) {
            return `${currentPlayer.getName()} (${currentPlayer.getMarker()}) is the winner!`;
        }

        if (gameboard.getEmptyPositions().length === 0) {
            return `It's a tie!`;
        }

        return false;
    }

    const changeCurrentPlayer = () => {
        currentPlayer = currentPlayer !== players[0] ? players[0] : players[1];
    }

    const newGame = () => {
        gameboard = GameBoard();
        gameOverState = false;
        winningTileSequence = null;
        currentPlayer = players[0];
        tileWinCondition = [
            // Horizontal-sequence
            [gameboard.getPosition(0, 0), gameboard.getPosition(0, 1), gameboard.getPosition(0, 2)],
            [gameboard.getPosition(1, 0), gameboard.getPosition(1, 1), gameboard.getPosition(1, 2)],
            [gameboard.getPosition(2, 0), gameboard.getPosition(2, 1), gameboard.getPosition(2, 2)],

            // Vertical-sequence
            [gameboard.getPosition(0, 0), gameboard.getPosition(1, 0), gameboard.getPosition(2, 0)],
            [gameboard.getPosition(0, 1), gameboard.getPosition(1, 1), gameboard.getPosition(2, 1)],
            [gameboard.getPosition(0, 2), gameboard.getPosition(1, 2), gameboard.getPosition(2, 2)],

            // Diagonal-sequence
            [gameboard.getPosition(0, 0), gameboard.getPosition(1, 1), gameboard.getPosition(2, 2)],
            [gameboard.getPosition(2, 0), gameboard.getPosition(1, 1), gameboard.getPosition(0, 2)]
        ]
    }

    // To highlight the three-in-row sequence that ended the game onto the UI (if it wasn't a tie)
    const getWinningTileSequence = () => {
        if (gameOverState) {
            if (winningTileSequence) {
                return winningTileSequence;
            }
            return console.log("Game was tied, so there is no winning sequence.");
        }
        return console.log("Game has not finished.");
    }

    const getBoard = () => gameboard.getBoard();
    const getCurrentPlayer = () => currentPlayer
    const getGameOverState = () => gameOverState;

    newGame();

    return { newGame, playRound, getBoard, getCurrentPlayer, getGameOverState, getWinningTileSequence };
}