const ScoreKeeper = require("./score_keeper");
const PlayerStats = require("./player_stats");

class Player {

    constructor(name) {
        this.name = name;
        this.stats = new PlayerStats();
        this.scoreKeeper = new ScoreKeeper();
    }

}

module.exports = Player;