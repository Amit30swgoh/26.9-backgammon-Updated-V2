// sounds.js - Adding sound effects to the game

const sounds = {
    diceRoll: new Audio('assets/sounds/dice-roll.mp3'),
    pieceMove: new Audio('assets/sounds/piece-move.mp3'),
    invalidMove: new Audio('assets/sounds/invalid-move.mp3'),
    win: new Audio('assets/sounds/win.mp3'),

    // Play the sound corresponding to the given type
    playSound: function (type) {
        const soundMap = {
            'dice': this.diceRoll,
            'move': this.pieceMove,
            'invalid': this.invalidMove,
            'win': this.win
        };

        // Play the appropriate sound if the type exists
        if (soundMap[type]) {
            soundMap[type].play();
        }
    }
};
