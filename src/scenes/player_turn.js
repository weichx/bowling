const GameScene = require("./game_scene");
const Constants = require("../constants");
const MouseButton = require("../e_mouse_button");
const Vec3 = require("cannon").Vec3;
const Time = require("../time");
const Physics = require("cannon");
const PinPositions = require("../constants").PinPositions;

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
        this.resetPins();
        this.gameManager.showPlayerTurnMessage = true;
        setTimeout(() => {
            this.gameManager.showPlayerTurnMessage = false;
        }, 2000);
    }

    initRoll() {
        this.state = TurnState.RollSelect;
        this.ball = this.gameManager.root.findChild("ball");
        this.ball.position = new Vec3(0, 0.5, 12);
        this.ball.rigidBody.position = Constants.GetBallResetPosition();
        this.ball.rigidBody.velocity = new Vec3(0, 0, 0);
        this.ball.rigidBody.force = new Vec3(0, 0, 0);
        this.ball.rigidBody.torque = new Vec3(0, 0, 0);
        this.gameManager.physics.removeBody(this.ball.rigidBody);
    }

    resetPins() {
        var pins = this.gameManager.root.findChildren("pin");
        for(var i = 0; i < pins.length; i++) {
            pins[i].rigidBody.position = PinPositions[i].clone();
            pins[i].rigidBody.quaternion = new Physics.Quaternion();
            pins[i].velocity = new Vec3();
            pins[i].angluarVelocity = new Vec3();
            pins[i].force = new Vec3();
            pins[i].isDown = false;
        }
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
                    var score = 0;
                    var pins = this.gameManager.root.findChildren("pin");
                    for(var i = 0; i < pins.length; i++) {
                        var original = PinPositions[i];
                        if(!pins[i].isDown && original.distanceSquared(pins[i].rigidBody.position) > 2) {
                            score++;
                            pins[i].isDown = true;
                        }
                    }
                    var randomPins = Math.random() * 11;
                    randomPins = randomPins | 0;
                    console.log("got ", score);
                    if(turnManager.recordScore(randomPins)) {
                        this.gameManager.endScene();
                    }
                    else {
                        this.initRoll();
                    }
                }
                break;
        }
    }

    exit() { }

    launchBall() {
        this.state = TurnState.BallRolling;
        this.ball.rigidBody = new Physics.Body({
            mass: 10, // kg
            position: new Vec3(this.ball.position[0], this.ball.position[1], this.ball.position[2]),
            shape: new Physics.Sphere(0.5)
        });
        this.gameManager.physics.addBody(this.ball.rigidBody);
        this.ball.rigidBody.applyImpulse(new Vec3(0, 0, -500), new Vec3(0, 0.5, 12.5));
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