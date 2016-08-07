const GameScene = require("./game_scene");
const Constants = require("../constants");
const MouseButton = require("../e_mouse_button");
const Vec3 = require("cannon").Vec3;
const Time = require("../time");

var pt1 = new Vec3(2, 1.5, 12);
var pt2 = new Vec3(-2, 1.5, 12);

const TurnState = {
    RollSelect: 0,
    BallRolling: 1
};

class PlayerTurnScene extends GameScene {

    constructor(sceneManager) {
        super("PlayerTurn", sceneManager);
        this.ball = null;
        this.isCameraPositioned = false;
        this.oscilationPoint = pt1;
        this.state = TurnState.RollSelect;
    }

    enter() {
        this.sceneManager.gameManager.root.findChildren("pin");
        this.ball = this.sceneManager.gameManager.root.findChild("ball");
        this.ball.rigidBody.position = Constants.GetBallResetPosition();
        this.sceneManager.gameManager.physics.removeBody(this.ball.rigidBody);
        //todo reset pins
    }

    update() {
        switch (this.state) {
            case TurnState.RollSelect:
                this.oscillateBall();
                if (this.sceneManager.gameManager.input.getMouseButton(MouseButton.Left)) {
                    this.launchBall();
                    this.state = TurnState.BallRolling;
                }
                return;
            case TurnState.BallRolling:
                if(this.ball.rigidBody.position.y < -5) {
                    this.sceneManager.endScene();
                }
                break;
        }
    }

    exit() {}

    launchBall() {
        this.sceneManager.gameManager.physics.addBody(this.ball.rigidBody);

        this.ball.rigidBody.applyImpulse(new Vec3(0, 0, -100), this.ball.rigidBody.position.vsub({
            x: 0, y: 0, z: 0.25
        }));
    }

    oscillateBall() {
        if (this.oscilationPoint === pt1) {
            this.ball.rigidBody.position.x += Time.deltaTime * 2;
            if (this.ball.rigidBody.position.x >= pt1.x) {
                this.oscilationPoint = pt2;
            }
        }
        else if (this.oscilationPoint === pt2) {
            this.ball.rigidBody.position.x -= Time.deltaTime * 2;
            if (this.ball.rigidBody.position.x <= pt2.x) {
                this.oscilationPoint = pt1;
            }
        }
    }
}

module.exports = PlayerTurnScene;