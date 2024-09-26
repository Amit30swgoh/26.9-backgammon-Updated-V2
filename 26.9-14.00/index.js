// index.js - Initialize the Game and Interactions

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById('board');
    const rollBtn = document.getElementById('roll-btn');
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    let turn = 'yellow';

    // Initialize Pieces
    const pieces = { yellow: [], white: [] };

    // Function to roll the dice
    const rollDice = () => {
        const diceRoll1 = getRandomDiceRoll();
        const diceRoll2 = getRandomDiceRoll();

        displayDice(dice1, diceRoll1);
        displayDice(dice2, diceRoll2);

        toggleTurn();
        alertTurn(turn, diceRoll1, diceRoll2);
    };

    // Generate a random dice roll
    const getRandomDiceRoll = () => Math.floor(Math.random() * 6) + 1;

    // Display dice value
    const displayDice = (diceElement, rollValue) => {
        diceElement.textContent = rollValue;
    };

    // Switch turns between yellow and white
    const toggleTurn = () => {
        turn = turn === 'yellow' ? 'white' : 'yellow';
    };

    // Alert the current turn and dice rolls
    const alertTurn = (turn, diceRoll1, diceRoll2) => {
        alert(`It's ${turn === 'yellow' ? 'Yellow' : 'White'}'s turn! Roll: ${diceRoll1}, ${diceRoll2}`);
    };

    // Function to add pieces to the board
    const addPiece = (color, position) => {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        if (color === 'white') piece.classList.add('white-piece');
        board.children[position].appendChild(piece);
        pieces[color].push(piece);
    };

    // Initialize the board with default pieces
    const initializeBoard = () => {
        addPiece('yellow', 0);
        addPiece('yellow', 0);
        addPiece('white', 23);
        addPiece('white', 23);
    };

    // Add event listener to the roll button
    rollBtn.addEventListener('click', rollDice);

    // Set up the board initially
    initializeBoard();
});
