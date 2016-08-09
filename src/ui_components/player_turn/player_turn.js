const Vue = require("vue");

const messages = [
    "time to shine!",
    "ready to roll!",
    "knock em' dead!",
    "jetzt gehts los!",
    "Vamanos! Rapido!",
    "Get ready for the pin-apocalypse!"
];

require("./player_turn.scss");

Vue.component("component-player-turn", {
    template: require("./player_turn.html"),
    props: [{name: 'player-index', required: true}],
    data: function() {
        return {
            motivationalMessage: messages[(Math.random() * messages.length) | 0]
        }
    }
});