const GameScene = require("./game_scene");

class FrameScene extends GameScene {

    constructor(gameManager) {
        super("FrameScene", gameManager);
    }

    enter() {
        this.gameManager.showScoreboard = true;
        setTimeout(() => {
            this.gameManager.showScoreboard = false;
            this.gameManager.endScene();
        }, 1500);
    }
}

module.exports = FrameScene;