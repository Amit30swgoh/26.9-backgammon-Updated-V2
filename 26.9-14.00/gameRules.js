// gameRules.js - Enforcing the rules of Backgammon

const gameRules = {
    // Validate if the move is allowed based on the piece's current position and dice roll
    isMoveValid: function (piece, startPos, diceRoll) {
        const targetPos = this.calculateTargetPosition(startPos, diceRoll);

        // Ensure the target position is within bounds
        if (!this.isWithinBounds(targetPos)) return false;

        // Check if the target position is blocked by the opponent's pieces
        const targetSpot = board.children[targetPos];
        return !this.isBlocked(targetSpot);
    },

    // Calculate the target position based on the dice roll and current player's color
    calculateTargetPosition: function (startPos, diceRoll) {
        return currentPlayer === "yellow" ? startPos + diceRoll : startPos - diceRoll;
    },

    // Check if the target position is within the valid bounds of the board
    isWithinBounds: function (position) {
        return position >= 0 && position < board.children.length;
    },

    // Check if a target position is blocked by two or more of the opponent's pieces
    isBlocked: function (spot) {
        const opponentColor = this.getOpponentColor();
        const piecesInSpot = spot.querySelectorAll(`.${opponentColor}-piece`);
        return piecesInSpot.length >= 2;
    },

    // Get the opponent player's color
    getOpponentColor: function () {
        return currentPlayer === "yellow" ? "white" : "yellow";
    },

    // Capture an opponent's piece if there is only one on the target spot
    capturePiece: function (targetSpot) {
        const opponentColor = this.getOpponentColor();
        const opponentPiece = targetSpot.querySelector(`.${opponentColor}-piece`);

        if (opponentPiece) {
            // Move the captured piece to the bar (prison)
            document.getElementById(`${opponentColor}-bar`).appendChild(opponentPiece);
        }
    },

    // Check if the player can bear off pieces (all pieces must be in the home quadrant)
    canBearOff: function () {
        const homeRange = this.getHomeRange();

        // Verify all pieces are within the home range
        const pieces = document.querySelectorAll(`.${currentPlayer}-piece`);
        for (const piece of pieces) {
            const pos = Array.from(board.children).indexOf(piece.parentElement);
            if (pos < homeRange.start || pos > homeRange.end) {
                return false;
            }
        }
        return true;
    },

    // Get the home range for bearing off pieces, depending on the player's color
    getHomeRange: function () {
        return currentPlayer === "yellow"
            ? { start: 18, end: 23 }
            : { start: 0, end: 5 };
    }
};
