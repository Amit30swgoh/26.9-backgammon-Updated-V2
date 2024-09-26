// bg1.js - Enhancing UI with animations and 3D effects

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("backgammon-board");
    const leftBar = document.getElementById("left-bar");
    const rightBar = document.getElementById("right-bar");
    const dice1 = document.getElementById("dice1");
    const dice2 = document.getElementById("dice2");
    const rollBtn = document.getElementById("roll-btn");
    let currentPlayer = "yellow";

    // 3D Rotating Board Animation
    function addBoardRotation() {
        board.style.transition = "transform 1s ease-in-out";
        board.style.transformStyle = "preserve-3d";
        board.style.transform = "rotateX(15deg) rotateY(15deg)";
    }

    function resetBoardRotation() {
        board.style.transform = "rotateX(0deg) rotateY(0deg)";
    }

    // Event listeners for board rotation
    board.addEventListener("mouseenter", addBoardRotation);
    board.addEventListener("mouseleave", resetBoardRotation);

    // Highlight the active player's side
    function highlightActivePlayer() {
        const yellowShadow = "0px 0px 20px 10px rgba(255, 204, 0, 0.8)";
        const whiteShadow = "0px 0px 20px 10px rgba(255, 255, 255, 0.8)";
        if (currentPlayer === "yellow") {
            leftBar.style.boxShadow = yellowShadow;
            rightBar.style.boxShadow = "none";
        } else {
            rightBar.style.boxShadow = whiteShadow;
            leftBar.style.boxShadow = "none";
        }
    }

    // Animate dice roll
    function animateDiceRoll(diceElement) {
        diceElement.style.transition = "transform 0.5s ease";
        diceElement.style.transform = "rotateX(360deg)";
        setTimeout(() => {
            diceElement.style.transform = "rotateX(0)";
        }, 500);
    }

    // Event listeners for dice roll animations
    dice1.addEventListener("click", () => animateDiceRoll(dice1));
    dice2.addEventListener("click", () => animateDiceRoll(dice2));

    // Pieces Animation - Interactive hover effects
    function animatePieces() {
        const pieces = document.querySelectorAll(".piece");
        pieces.forEach((piece) => {
            piece.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
            piece.addEventListener("mouseenter", () => {
                piece.style.transform = "scale(1.1)";
                piece.style.boxShadow = "0px 5px 10px rgba(0, 0, 0, 0.5)";
            });
            piece.addEventListener("mouseleave", () => {
                piece.style.transform = "scale(1)";
                piece.style.boxShadow = "none";
            });
        });
    }

    // Call to animate pieces (run when pieces are initialized)
    animatePieces();

    // Roll button 3D bounce effect
    rollBtn.style.transition = "transform 0.5s ease";
    rollBtn.addEventListener("mousedown", () => {
        rollBtn.style.transform = "scale(0.9)";
    });
    rollBtn.addEventListener("mouseup", () => {
        rollBtn.style.transform = "scale(1)";
    });

    // Board background color change on click
    function changeBoardColor() {
        const colors = ["#2f2f2f", "#3e3e3e", "#4d4d4d"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        board.style.backgroundColor = randomColor;
    }

    board.addEventListener("click", changeBoardColor);

    // Toggle the active player and highlight the respective side
    function togglePlayer() {
        currentPlayer = currentPlayer === "yellow" ? "white" : "yellow";
        highlightActivePlayer();
    }

    // Initial highlight of active player
    highlightActivePlayer();
});
