const ScoreKeeper = require("./score_keeper");
//basic player class, originally intended to hold more data
//but removed that due to time constraints
class Player {

    constructor(name) {
        this.scoreKeeper = new ScoreKeeper();
    }

}

module.exports = Player;