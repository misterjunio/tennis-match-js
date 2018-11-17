// Entry file to simulate a match

const Match = require("./Match");

const match = new Match("player 1", "player 2");
console.log(match.pointWonBy("player 1"));
console.log(match.pointWonBy("player 2"));

// this will return "0-0, 15-15"
console.log(match.score());

console.log(match.pointWonBy("player 1"));
console.log(match.pointWonBy("player 1"));

// this will return "0-0, 40-15"
console.log(match.score());

console.log(match.pointWonBy("player 2"));
console.log(match.pointWonBy("player 2"));

// this will return "0-0, Deuce"
console.log(match.score());

console.log(match.pointWonBy("player 1"));

// this will return "0-0, Advantage player 1"
console.log(match.score());

console.log(match.pointWonBy("player 1"));

// this will return "1-0"
console.log(match.score());