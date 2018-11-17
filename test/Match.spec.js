const Match = require("../Match");
const assert = require("chai").assert;

describe("Match", function() {

    let match = new Match("player 1", "player 2");

    describe("start", () => {

        it("should create the two players with correct names", () => {
            assert.isDefined(match.players, "players do not exist");
            assert.equal(match.players[0].name, "player 1", "player 1 has the wrong name");
            assert.equal(match.players[1].name, "player 2", "player 2 has the wrong name");
        });
        
        it("should begin 0-0", () => {
            assert.equal(match.score(), "0-0", "score does not begin 0-0");
        })
    });

    describe("regular games", () => {
        
        it("should increase the score correctly", () => {
            match.restart();
            match.pointWonBy("player 1");
            assert.equal(match.score(), "0-0, 15-0", "score is not correct");
            match.pointWonBy("player 1");
            assert.equal(match.score(), "0-0, 30-0", "score is not correct");
            match.pointWonBy("player 2");
            assert.equal(match.score(), "0-0, 30-15", "score is not correct");
            match.pointWonBy("player 2");
            assert.equal(match.score(), "0-0, 30-30", "score is not correct");
            match.pointWonBy("player 1");
            assert.equal(match.score(), "0-0, 40-30", "score is not correct");
            match.pointWonBy("player 1");
            assert.equal(match.score(), "1-0", "score is not correct");
        })
    });

    describe("advantage games", () => {

        beforeEach(function() {
            match.restart();
            [0, 1, 2].forEach(function() {
                match.pointWonBy("player 1");
                match.pointWonBy("player 2");
            });
          });
        
        it("should identify deuces", () => {
            assert.equal(match.score(), "0-0, Deuce", "score is not correct");
        });
        
        it("should give an advantage to a player after deuce", () => {
            match.pointWonBy("player 1");
            assert.equal(match.score(), "0-0, Advantage player 1", "score is not correct");
        });
        
        it("should cancel an advantage to the player after he loses it", () => {
            match.pointWonBy("player 1");
            match.pointWonBy("player 2");
            assert.equal(match.score(), "0-0, Deuce", "score is not correct");
        });
        
        it("should make the player win a game after advantage", () => {
            match.pointWonBy("player 2");
            match.pointWonBy("player 2");
            assert.equal(match.score(), "0-1", "score is not correct");
        });
    });

    describe("tie break", () => {

        beforeEach(function() {
            match.restart();
            for(let i = 0; i < 6; i++) {
                for(let j = 0; j < 4; j++) {
                    match.pointWonBy("player 1");
                }
                for(let j = 0; j < 4; j++) {
                    match.pointWonBy("player 2");
                }
            }
            assert.equal(match.score(), "6-6", "score is not correct");
          });
        
        it("should increase the tie-break score correctly", () => {
            for(let i = 0; i < 6; i++) {
                match.pointWonBy("player 1");
                assert.equal(match.score(), "6-6, " + (i+1) + "-" + i, "score is not correct");
                match.pointWonBy("player 2");
                assert.equal(match.score(), "6-6, " + (i+1) + "-" + (i+1), "score is not correct");
            }
            console.log("tie-break score correct up to " + match.pointsScore());
        });
        
        it("should not win the game without tie-break advantage of 2 points", () => {
            for(let i = 0; i < 6; i++) {
                match.pointWonBy("player 1");
                match.pointWonBy("player 2");
            }
            match.pointWonBy("player 1");
            assert.notEqual(match.score(), "7-6", "score is not correct");
            console.log("tie-break should not be won with score " + match.pointsScore());
        });
        
        it("should win the game with tie-break advantage of 2 points", () => {
            for(let i = 0; i < 7; i++) {
                match.pointWonBy("player 1");
                match.pointWonBy("player 2");
            }
            match.pointWonBy("player 1");
            match.pointWonBy("player 1");
            assert.equal(match.score(), "7-6", "score is not correct");
        });
    });

    describe("end", () => {

        beforeEach(function() {
            match.restart();
            for(let i = 0; i < 5; i++) {
                for(let j = 0; j < 4; j++) {
                    match.pointWonBy("player 1");
                }
                for(let j = 0; j < 4; j++) {
                    match.pointWonBy("player 2");
                }
            }
            assert.equal(match.score(), "5-5", "score is not correct");
          });

        it("should not win the game without advantage of 2 games", () => {
            for(let i = 0; i < 4; i++) {
                match.pointWonBy("player 1");
            }
            assert.notEqual(match.gameOver, true, "game is wrongly over with score of " + match.score());
            console.log("match should not be won with score " + match.score());
        });
        
        it("should win the game with advantage of 2 games", () => {
            for(let i = 0; i < 4; i++) {
                match.pointWonBy("player 1");
            }
            for(let i = 0; i < 4; i++) {
                match.pointWonBy("player 1");
            }
            assert.equal(match.gameOver, true, "game is correctly over with score of " + match.score());
        })
    });
});
