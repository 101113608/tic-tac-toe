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

    return { getPosition, getBoard, getEmptyPositions, placeMarker, printBoard};
}