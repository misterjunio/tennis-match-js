// import necessary Player class
const Player = require("./Player");

// match class to hold match information
class Match {

    // initialize match with two players
    constructor(player1, player2) {

        // two players
        this.players = [new Player(player1), new Player(player2)];

        // 0 - no advantage; 1 - advantage first player; 2 - advantage second player; 3 - deuce
        this.advantage = 0;

        // tie-break flag
        this.tieBreak = false;

        // game over flag
        this.gameOver = false;

        // key to points in a game
        this.pointsKey = {
            0: "0",
            1: "15",
            2: "30",
            3: "40"
        }
    }

    // player wins a point
    pointWonBy(pointWinnerName) {

        // game is over
        if(this.gameOver) {
            return "Game over with score " + this.gamesScore();
        }

        // get point winner and loser
        let pointWinnerIndex = this.players.findIndex(player => player.name === pointWinnerName);
        let pointWinner = this.players[pointWinnerIndex];
        let pointLoser = this.players[1-pointWinnerIndex];

        // tie-break
        if(this.tieBreak) {
    
            // end of tie break
            if((pointWinner.points >= 6) && (pointWinner.points - pointLoser.points >= 1)) {
    
                // player wins game
                this.gameWon(pointWinner, pointLoser);
    
                return "Point won by " + pointWinnerName + " - wins the match by " + this.gamesScore();
            }
    
            // player wins "regular" tie-break point
            pointWinner.winPoint();

            return "Point won by " + pointWinnerName + " - " + this.pointsScore();
        }

        // "regular" point
        if(pointWinner.points < 3) {

            // player wins point
            pointWinner.winPoint();

            if(pointWinner.points === 3 && pointLoser.points === 3) {
                this.advantage = 3;
                return "Point won by " + pointWinnerName + ", deuce";
            }

            return "Point won by " + pointWinnerName + " - " + this.pointsScore();
        }

        // reached 40, check for advantages
        if(pointWinner.points === 3) {

            // game won
            if(pointLoser.points < 3) {

                // player wins game, the other one loses
                this.gameWon(pointWinner, pointLoser);
                return "Point won by " + pointWinnerName + " - wins the game, score is now " + this.gamesScore();
            }

            // advantage to the point winner
            if(pointLoser.points === 3) {

                // player wins point
                pointWinner.winPoint();
                this.advantage = pointWinnerIndex + 1;

                return "Point won by " + pointWinnerName + ", advantage";
            }

            // point winner cancels advantage
            pointLoser.losePoint();
            this.advantage = 3;
            
            return "Point won by " + pointWinnerName + ", deuce";
        }

        // point winner wins the game after advantages
        this.gameWon(pointWinner, pointLoser);
        return "Point won by " + pointWinnerName + " - wins the game, score is now " + this.gamesScore();
    }

    // player wins a game
    gameWon(pointWinner, pointLoser) {
        pointWinner.winGame();
        pointLoser.loseGame();
        this.advantage = 0;

        if(pointWinner.games === 6) {

            // check for tie-break
            if(pointLoser.games === 6) {
                this.tieBreak = true;
            }

            // game over
            else if(pointLoser.games < 5) {
                this.gameOver = true;
            }
        }

        // check for game over
        else if(pointWinner.games === 7) {
            this.gameOver = true;
        }
    }

    // display full score
    score() {
        let pointsScore = this.pointsScore();
        return pointsScore === "0-0" ? this.gamesScore() : this.gamesScore() + ", " + this.pointsScore();
    }

    // display score of games
    gamesScore() {
        return this.players[0].games + "-" + this.players[1].games;
    }

    // display score of points
    pointsScore() {
        if(this.tieBreak) {
            return this.players[0].points + "-" + this.players[1].points;
        }

        if(this.advantage == 1)
        {
            return "Advantage " + this.players[0].name;
        }

        if(this.advantage == 2)
        {
            return "Advantage " + this.players[1].name;
        }

        if(this.advantage == 3)
        {
            return "Deuce";
        }

        return this.pointsKey[this.players[0].points] + "-" + this.pointsKey[this.players[1].points];
    }

    // restart game
    restart() {
        this.players[0].games = this.players[1].games = this.players[0].points = this.players[1].points = 0;
        this.tieBreak = false;
        this.gameOver = false;

        return "Game restarted";
    }
}

module.exports = Match;