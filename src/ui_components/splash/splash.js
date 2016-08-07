const Vue = require("vue");
const TurnManager = require("../../turn_manager");

Vue.component('component-splash', {
    template: require("./splash.html"),
    props: [{name: 'scene-manager', required: true}],

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
            //fade out then play
            this.$el.classList.remove('slideInDown');
            this.$el.classList.add('slideOutUp');
            setTimeout(() => {
                this.sceneManager.turnManager = new TurnManager(count);
                this.sceneManager.endScene();
            }, 1000);

        }
    },

});