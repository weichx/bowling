const GameScene = require("./game_scene");
const Time = require("../time");
const vec3 = require("gl-matrix").vec3;

class GameStartScene extends GameScene {

    constructor(sceneManager) {
        super("GameStart", sceneManager);
        this.destPoint = vec3.fromValues(0, 2, 16);
    }


    update() {
        const camera = this.sceneManager.camera;
        vec3.lerp(camera.position, camera.position, this.destPoint, Time.deltaTime * 5);
        if(vec3.equals(camera.position, this.destPoint)) {
            this.sceneManager.endScene();
        }
    }

}

module.exports = GameStartScene;