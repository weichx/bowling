const SceneManager = require("../scene_manager");
const FrameScene = require("./frame_scene");

class GamePlayScene extends SceneManager {

    constructor(gameManager) {
        super();
        this.name = "GamePlayScene";
        this.gameManager = gameManager;
    }

    enter(){
        for(var i = 0; i < 10; i++) {
            this.sceneFlow.push(new FrameScene(this, this.gameManager));
        }
        this.beginScene();
    }

    exit() {
        this.endScene();
    }
}

module.exports = GamePlayScene;