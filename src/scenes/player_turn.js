const GameScene = require("./game_scene");
const Constants = require("../constants");
const MouseButton = require("../e_mouse_button");
const Vec3 = require("cannon").Vec3;
const Time = require("../time");

var pt1 = new Vec3(2, 0.5, 12);
var pt2 = new Vec3(-2, 0.5, 12);

const TurnState = {
    RollSelect: 0,
    BallRolling: 1
};

class PlayerTurnScene extends GameScene {

    constructor(gameManager) {
        super("PlayerTurn", gameManager);
        this.ball = null;
        this.oscilationPoint = pt1;
        this.state = TurnState.RollSelect;
    }

    enter() {
        this.initRoll();
        this.gameManager.showPlayerTurnMessage = true;
        setTimeout(() => {
            this.gameManager.showPlayerTurnMessage = false;
        }, 1000);
    }

    initRoll() {
        this.state = TurnState.RollSelect;
        this.gameManager.root.findChildren("pin");
        this.ball = this.gameManager.root.findChild("ball");
        this.ball.position = [0, 0.5, 12];
        this.ball.rigidBody.position = Constants.GetBallResetPosition();
        this.ball.rigidBody.velocity = new Vec3(0, 0, 0);
        this.ball.rigidBody.force = new Vec3(0, 0, 0);
        this.gameManager.physics.removeBody(this.ball.rigidBody);
        //todo reset pins
    }

    update() {
        const turnManager = this.gameManager.turnManager;

        switch (this.state) {
            case TurnState.RollSelect:
                this.oscillateBall();
                if (this.gameManager.input.getMouseButton(MouseButton.Left)) {
                    this.launchBall();
                }
                break;
            case TurnState.BallRolling:
                if (this.ball.rigidBody.position.y < -5) {
                    var randomPins = Math.random() * 11;
                    randomPins = randomPins | 0;
                    console.log("got ", randomPins);
                    turnManager.recordScore(randomPins);
                    if (turnManager.currentPlayer.scoreKeeper.isCurrentRollingCompleted) {
                        console.log("Done rolling");
                        this.gameManager.endScene();
                    }
                    else {
                        this.initRoll();
                    }
                }
                break;
        }
    }

    exit() {
    }

    launchBall() {
        this.state = TurnState.BallRolling;
        this.gameManager.physics.addBody(this.ball.rigidBody);
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