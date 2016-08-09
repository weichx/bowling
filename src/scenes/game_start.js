const GameScene = require("./game_scene");
const Time = require("../time");
const Vec3 = require("cannon").Vec3;

class GameStartScene extends GameScene {

    constructor(gameManager) {
        super("GameStart", gameManager);
        this.destPoint = new Vec3(0, 2, 15);
    }


    enter() {
        this.gameManager.showSplashScreen = false;
    }

    update() {
        const camera = this.gameManager.camera;
        camera.position.lerp(this.destPoint, Time.deltaTime * 5, camera.position);
        if (camera.position.almostEquals(this.destPoint)) {
            this.gameManager.endScene();
        }
    }

}

module.exports = GameStartScene;