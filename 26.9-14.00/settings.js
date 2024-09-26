// settings.js - Game Settings and Preferences

const gameSettings = {
    theme: "classic",
    soundEnabled: true,
    playerNames: { yellow: "Player 1", white: "Player 2" },

    // Toggle sound on or off
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.showAlert(`Sound ${this.soundEnabled ? 'enabled' : 'disabled'}`);
    },

    // Set player names for yellow and white
    setPlayerNames(yellowName, whiteName) {
        this.playerNames.yellow = yellowName;
        this.playerNames.white = whiteName;
        this.showAlert(`Player names updated: ${yellowName} (Yellow), ${whiteName} (White)`);
    },

    // Utility function to show alerts (can be extended)
    showAlert(message) {
        alert(message);
    }
};
