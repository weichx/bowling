const GameScene = require("./game_scene");

class FrameScene extends GameScene {

    constructor(gameManager) {
        super("FrameScene", gameManager);
    }

    //this just shows the score board for 1.5 seconds then moves on to the player turn
    enter() {
        this.gameManager.showScoreboard = true;
        setTimeout(() => {
            this.gameManager.showScoreboard = false;
            this.gameManager.endScene();
        }, 1500);
    }
}

module.exports = FrameScene;