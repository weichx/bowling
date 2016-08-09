const Time = require("../time");
const GameScene = require("./game_scene");

class SplashScene extends GameScene {

    constructor(gameManager) {
        super("SplashScene", gameManager);
    }

    enter() {

    }

    update() {
        // const camera = this.sceneManager.camera;
        //
        // const angle = degToRad(1);
        // const sinA = Math.sin(angle);
        // const cosA = Math.cos(angle);

       // vec3.rotate(camera.position, )
        // var p = vec3.create();
        // vec3.subtract(p, [0, 0, 0], camera.position);
        //
        // var x = p[0] * cosA - p[2] * sinA;
        // var z = p[0] * sinA + p[2] * cosA;
        //
        // vec3.add(camera.position, camera.position, [x, 0, z]);
        //
        // // var x = camera.position[0] * cosA - camera.position[2] * sinA;
        // // var z = camera.position[0] * sinA + camera.position[2] * cosA;
        //
        // // camera.position[0] = x;
        // // camera.position[2] = z;
        //
        // var lookAt = mat4.create();
        // mat4.lookAt(lookAt, camera.position, [0, 0, 0], [0, 1, 0]);
        // mat4.getRotation(camera.rotation, lookAt);

    }

    exit() {

    }

}

module.exports = SplashScene;