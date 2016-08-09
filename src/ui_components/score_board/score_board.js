const Vue = require("vue");
require("./score_board.scss");

module.exports = Vue.component('component-score-board', {
    template: require("./score_board.html"),
    props: [{name: 'game-manager', required: true}],
    data: function () {
        return {
            scoreKeepers: [],
            scoreStrings: []
        }
    },

    ready() {
        //compute the scores when the ui is ready
        //this is done here because I dont want to call
        //methods in the template to assess the score
        //because the UI framework caches some values
        const players = this.gameManager.turnManager.players;
        const scoreStrings = [];
        for(var i = 0; i < players.length; i++) {
            const scores = [];
            const scoreKeeper = players[i].scoreKeeper;
            this.scoreKeepers.push(scoreKeeper);
            for(var j = 0; j < 10; j++) {
                scores.push(this.getScoreString(scoreKeeper.frames[j]));
            }
            scores.push(scoreKeeper.totalScore);
            scoreStrings.push(scores);
        }
        this.$set("scoreStrings", scoreStrings);
    },

    methods: {
        getScoreString(frame) {
            if(frame.totalRolls === 0) {
                return "";
            }
            if(frame.isStrike) {
                return "Strike";
            }
            if(frame.isSpare) {
                return "Spare";
            }
            return frame.score;
        }
    }
});