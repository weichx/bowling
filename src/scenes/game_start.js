const GameScene = require("./game_scene");
const Time = require("../time");
const vec3 = require("gl-matrix").vec3;

class GameStartScene extends GameScene {

    constructor(gameManager) {
        super("GameStart", gameManager);
        this.destPoint = vec3.fromValues(0, 2, 16);
    }


    enter() {
        this.gameManager.showSplashScreen = false;
    }

    update() {
        const camera = this.gameManager.camera;
        vec3.lerp(camera.position, camera.position, this.destPoint, Time.deltaTime * 5);
        if (vec3.equals(camera.position, this.destPoint)) {
            this.gameManager.endScene();
        }
    }

}

module.exports = GameStartScene;