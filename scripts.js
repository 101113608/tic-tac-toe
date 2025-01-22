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