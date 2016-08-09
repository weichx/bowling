const Vue = require("vue");

//this is the opening scene with the splash ui and animation
module.exports = Vue.component('component-splash', {
    template: require("./splash.html"),

    props: [
        {name: 'game-manager',  required: true}
    ],

    data: function () {
        return {
            showingPlayerSelection: false
        }
    },

    methods: {

        showPlayerSelection() {
            this.showingPlayerSelection = true;
        },

        setPlayerCount(count) {
            //toggle animations when we select player count
            //2 animations on one element makes things weird
            //so remove the old one
            this.$el.classList.remove('slideInDown');
            this.$el.classList.add('slideOutUp');

            setTimeout(() => {
                //after one second, start the game and end scene
                this.gameManager.start(count);
                this.gameManager.endScene();
            }, 1000);

        }
    },

});