const Vue = require("vue");

module.exports = Vue.component('component-splash', {
    template: require("./splash.html"),

    props: [
        {name: 'game-manager',  required: true}
    ],

    data: function () {
        return {
            currentView: 'component-splash-scene',
            showingPlayerSelection: false
        }
    },

    methods: {

        showPlayerSelection() {
            this.showingPlayerSelection = true;
        },

        setPlayerCount(count) {

            this.$el.classList.remove('slideInDown');
            this.$el.classList.add('slideOutUp');

            setTimeout(() => {
                this.gameManager.start(count);
                this.gameManager.endScene();
            }, 1000);

        }
    },

});