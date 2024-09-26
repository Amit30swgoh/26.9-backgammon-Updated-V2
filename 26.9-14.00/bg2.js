// bg2.js - Enhancing gameplay mechanics and dynamic interactions

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    let currentPlayer = "yellow";
    let diceRolls = [];

    // Dice Roll Functionality
    function rollDice() {
        const dice1 = getRandomDiceRoll();
        const dice2 = getRandomDiceRoll();
        diceRolls = [dice1, dice2];

        displayDiceRolls(dice1, dice2);
        animateDiceRolls();
        togglePlayer();
        showPlayerTooltip();
    }

    // Generate random dice roll
    function getRandomDiceRoll() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Display dice roll values
    function displayDiceRolls(dice1, dice2) {
        document.getElementById("dice1").textContent = dice1;
        document.getElementById("dice2").textContent = dice2;
    }

    // Animate dice after rolling
    function animateDiceRolls() {
        const diceElements = [document.getElementById("dice1"), document.getElementById("dice2")];

        diceElements.forEach((dice) => {
            dice.style.transform = "rotateX(360deg) rotateY(360deg)";
            setTimeout(() => {
                dice.style.transform = "rotateX(0deg) rotateY(0deg)";
            }, 500);
        });
    }

    // Move pieces based on dice roll
    function movePiece(piece, diceValue) {
        const currentPosition = Array.from(board.children).indexOf(piece.parentElement);
        let newPosition = currentPosition + (currentPlayer === "yellow" ? diceValue : -diceValue);

        if (newPosition < 0 || newPosition >= board.children.length) {
            newPosition = currentPosition; // Invalid move, stay in place
        }

        const targetSpot = board.children[newPosition];
        if (targetSpot) {
            piece.style.transition = "transform 0.3s ease";
            targetSpot.appendChild(piece);
        }
    }

    // Add drag & drop functionality for pieces
    let draggedPiece = null;

    board.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("piece")) {
            draggedPiece = e.target;
            setTimeout(() => (e.target.style.opacity = "0.5"), 0);
        }
    });

    board.addEventListener("dragend", (e) => {
        e.target.style.opacity = "1";
    });

    board.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    board.addEventListener("drop", (e) => {
        if (draggedPiece && e.target.classList.contains("triangle")) {
            movePiece(draggedPiece, diceRolls[0]); // Move based on the first dice roll
            diceRolls.shift(); // Remove the used dice roll
        }
    });

    // Display a tooltip guiding the player
    function showPlayerTooltip() {
        const tooltip = createTooltip(
            `${currentPlayer === "yellow" ? "Yellow" : "White"}'s Turn! Roll the dice to continue.`,
            currentPlayer === "yellow" ? "#ffcc00" : "#ffffff",
            currentPlayer === "yellow" ? "#333" : "#000"
        );
        document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.remove();
        }, 3000);
    }

    // Create tooltip element
    function createTooltip(text, bgColor, textColor) {
        const tooltip = document.createElement("div");
        tooltip.style.position = "absolute";
        tooltip.style.bottom = "20px";
        tooltip.style.left = "50%";
        tooltip.style.transform = "translateX(-50%)";
        tooltip.style.padding = "10px";
        tooltip.style.backgroundColor = bgColor;
        tooltip.style.color = textColor;
        tooltip.style.borderRadius = "5px";
        tooltip.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
        tooltip.style.fontSize = "1.2rem";
        tooltip.textContent = text;

        return tooltip;
    }

    // Toggle active player
    function togglePlayer() {
        currentPlayer = currentPlayer === "yellow" ? "white" : "yellow";
    }

    // Display tooltips for invalid moves
    function showInvalidMoveMessage() {
        const invalidMoveTooltip = createTooltip(
            "Invalid Move! Try Again.",
            "#ff4444",
            "#fff"
        );
        invalidMoveTooltip.style.top = "50%";
        invalidMoveTooltip.style.left = "50%";
        invalidMoveTooltip.style.transform = "translate(-50%, -50%)";

        document.body.appendChild(invalidMoveTooltip);

        setTimeout(() => {
            invalidMoveTooltip.remove();
        }, 2000);
    }

    // Handle piece movements and check for validity
    function handlePieceMove(diceRoll) {
        const valid = Math.random() < 0.5; // Simulate move validation (to be implemented)

        if (valid) {
            movePiece(draggedPiece, diceRoll);
        } else {
            showInvalidMoveMessage();
        }
    }

    // Add event listener for dice roll button
    document.getElementById("roll-btn").addEventListener("click", rollDice);

    // Initial player guidance
    showPlayerTooltip();
});
