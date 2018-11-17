const Player = require("../Player");
const assert = require("chai").assert;

describe("Player", function() {

    let player = new Player("player 1");

    describe("creation", () => {

        it("should create the player with correct name", () => {
            assert.equal(player.name, "player 1", "player has the wrong name");
        });
        
        it("should begin with a score of 0 games and 0 points", () => {
            assert.equal(player.games, 0, "games won does not begin at 0");
            assert.equal(player.points, 0, "points won does not begin at 0");
        })
    });

    describe("points tracking", () => {

        beforeEach(function() {
            player.points = 3;
          });
        
        it("should increase the points correctly", () => {
            const currentPoints = player.points;
            player.winPoint();
            assert.equal(player.points, currentPoints + 1, "did not increment points by 1");
        })
        
        it("should decrease the points correctly", () => {
            const currentPoints = player.points;
            player.losePoint();
            assert.equal(player.points, currentPoints - 1, "did not decrement points by 1");
        })
    });

    describe("games tracking", () => {

        beforeEach(function() {
            player.games = 3;
          });
        
        it("should increase the games correctly", () => {
            const currentGames = player.games;
            player.winGame();
            assert.equal(player.games, currentGames + 1, "did not increment games by 1");
            assert.equal(player.points, 0, "did not reset points");
        })
        
        it("should decrease the games correctly", () => {
            const currentGames = player.games;
            player.loseGame();
            assert.equal(player.games, currentGames, "did not maintain number of games");
            assert.equal(player.points, 0, "did not reset points");
        })
    });
});
