function Player(playerName, playerMarker) {
    const name = playerName;
    const marker = playerMarker;

    const getMarker = () => marker;
    const getName = () => name;

    return { getMarker, getName }
}