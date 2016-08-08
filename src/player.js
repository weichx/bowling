const ScoreKeeper = require("./score_keeper");

class Player {

    constructor(name) {
        this.scoreKeeper = new ScoreKeeper();
    }

}

module.exports = Player;