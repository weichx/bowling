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
    BallRolling: 1,
    Setup: 2
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
        this.state = TurnState.Setup;
        setTimeout(() => {
            this.gameManager.showPlayerTurnMessage = false;
            this.state = TurnState.RollSelect;
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
            pins[i].rigidBody.velocity = new Vec3();
            pins[i].rigidBody.angluarVelocity = new Vec3();
            pins[i].rigidBody.force = new Vec3();
            pins[i].rigidBody.torque = new Vec3();
            pins[i].isDown = false;
            this.gameManager.physics.addBody(pins[i].rigidBody);
        }
    }

    update() {
        const turnManager = this.gameManager.turnManager;

        switch (this.state) {
            case TurnState.Setup:
                //nothing to update here
                break;
            case TurnState.RollSelect:
                //move the ball back and forth until player clicks the mouse
                this.oscillateBall();
                if (this.gameManager.input.getMouseButton(MouseButton.Left)) {
                    this.launchBall();
                }
                break;
            case TurnState.BallRolling:
                //wait until the ball flies off the back of the alley
                //then assess pin locations for score. the physics engine
                //seems to make some pins stick to the bottom of the alley
                //which sucks but I didn't have time to investigate
                if (this.ball.rigidBody.position.y < -200) { //200 should give the pins enough time to settle
                    var score = 0;
                    var pins = this.gameManager.root.findChildren("pin");
                    for(var i = 0; i < pins.length; i++) {
                        var original = PinPositions[i];
                        //score a pin if it was knocked down
                        if(!pins[i].isDown && original.distanceSquared(pins[i].rigidBody.position) > 1.25) {
                            score++;
                            pins[i].isDown = true;
                        }
                    }
                    //record the score and end the scene if we're done rolling
                    if(turnManager.recordScore(score)) {
                        this.gameManager.endScene();
                    }
                    else {
                        //otherwise setup the next role
                        this.initRoll();
                    }
                }
                break;
        }
    }

    exit() {
        //physics is super slow... remove the bodies here to help during transition scenes
        var pins = this.gameManager.root.findChildren("pin");
        for(var i = 0; i < pins.length; i++) {
            this.gameManager.physics.removeBody(pins[i].rigidBody);
        }
    }

    //send the ball flying
    launchBall() {
        //update state so update() works properly
        this.state = TurnState.BallRolling;
        //re-create the rigidbody because I was having weird physics issues when I re-used the existing one
        this.ball.rigidBody = new Physics.Body({
            mass: 10, // kg
            position: this.ball.position.clone(),
            shape: new Physics.Sphere(0.5)
        });
        //zero out all force vectors
        this.ball.rigidBody.velocity = new Vec3(0, 0, 0);
        this.ball.rigidBody.force = new Vec3(0, 0, 0);
        this.ball.rigidBody.torque = new Vec3(0, 0, 0);
        this.ball.rigidBody.angluarVelocity = new Vec3(0, 0, 0);
        this.gameManager.physics.addBody(this.ball.rigidBody);
        //send the ball flying by applying an impulse directly behind it
        this.ball.rigidBody.applyImpulse(new Vec3(0, 0, -500), new Vec3(0, 0.5, 12.5));
    }

    //move the ball left and right while player is rolling
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