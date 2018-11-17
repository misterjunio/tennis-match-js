// player class for keeping each player's name and score
class Player {

    // initialize player
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.games = 0;
    }

    // player wins a point
    winPoint() {
        this.points++;
    }

    // player loses a point
    losePoint() {
        this.points--;
    }

    // player wins a game, restart points
    winGame() {
        this.games++;
        this.points = 0;
    }

    // player loses a game, restart points
    loseGame() {
        this.points = 0;
    }
}

module.exports = Player;