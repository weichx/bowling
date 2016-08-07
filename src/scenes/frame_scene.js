const SceneManager = require("../scene_manager");
const PlayerTurnScene = require("./player_turn");

class ShowScoreScene {

    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    enter() {
        this.gameManager.showScore = true;
        setTimeout(() => {
            this.gameManager.showScore = false;
            //todo end scene
        }, 3000);
    }
}

class FrameScene extends SceneManager {

    constructor(parentSceneManager, gameManager) {
        super();
        this.name = "FrameScene";
        this.parentSceneManager = parentSceneManager;
        this.gameManager = gameManager;
    }

    enter() {
        var playerCount = this.gameManager.turnManager.players.length;
        for(var i = 0; i < playerCount; i++) {
            this.sceneFlow.push(new PlayerTurnScene(this));
        }
        this.sceneFlow.push(new ShowScoreScene());
        this.beginScene();
    }

}

module.exports = FrameScene;