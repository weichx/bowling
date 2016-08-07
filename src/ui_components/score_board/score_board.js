const Vue = require("vue");
require("./score_board.scss");

module.exports = Vue.component('component-score-board', {
    template: require("./score_board.html"),
    props: [{name: 'game-manager', required: true}],
    data: function () {
        return {}
    }
});