const GameScene = require("./game_scene");
const Time = require("../time");
const Vec3 = require("cannon").Vec3;

//this shows after player selection and is mostly here for flair
class GameStartScene extends GameScene {

    constructor(gameManager) {
        super("GameStart", gameManager);
        this.destPoint = new Vec3(0, 2, 15);
    }


    enter() {
        //hide the splashScreen on entry
        this.gameManager.showSplashScreen = false;
    }

    update() {
        //lerp the camera back behind the ball then exit the scene
        const camera = this.gameManager.camera;
        camera.position.lerp(this.destPoint, Time.deltaTime * 5, camera.position);
        if (camera.position.almostEquals(this.destPoint)) {
            this.gameManager.endScene();
        }
    }

}

module.exports = GameStartScene;