const Vue = require("vue");
const ResourceManager = require("./resource_manager");
const GameManager = require("./game_manager");
const SceneObject = require("./scene_object");
const Physics = require("cannon");
const Constants = require("./constants");
const PinPositions = Constants.PinPositions;
const GetBallResetPosition = Constants.GetBallResetPosition;
const Vec3 = require("cannon").Vec3;
const Quaternion = require("cannon").Quaternion;

ResourceManager.readyPromise.then(() => {

    const gameManager = new GameManager();

    var alley = new SceneObject(gameManager.root, "alley");
    alley.model = ResourceManager.getModel("cube.json");
    alley.material = ResourceManager.getMaterial("default");
    alley.scale = new Vec3(5, 0.2, 24);
    alley.rigidBody = new Physics.Body({
        mass: 0,// mass == 0 makes the body static
        shape: new Physics.Box(new Physics.Vec3(2.5, 0.1, 12)), //half extents
        position: new Physics.Vec3(0, 0, 0)
    });

    var ball = new SceneObject(gameManager.root, "ball");
    ball.model = ResourceManager.getModel("sphere.json");
    ball.scale = new Vec3(0.5, 0.5, 0.5);
    ball.material = ResourceManager.getMaterial("ball.mat");
    ball.rigidBody = new Physics.Body({
        mass: 10, // kg
        position: GetBallResetPosition(),
        shape: new Physics.Sphere(0.5)
    });

    gameManager.physics.addBody(ball.rigidBody);
    gameManager.physics.addBody(alley.rigidBody);

    for (var i = 0; i < 10; i++) {
        var pin = new SceneObject(gameManager.root, "pin");
        pin.model = ResourceManager.getModel("pin.json");
        pin.material = ResourceManager.getMaterial("pin.mat");
        pin.setPosition(PinPositions[i].x, PinPositions[i].y, PinPositions[i].z);
        pin.scale = new Vec3(0.5, 0.5, 0.5);
        pin.rigidBody = new Physics.Body({
            mass: 5,
            position: PinPositions[i].clone()
        });

        pin.rigidBody.linearDamping = 0.3;
        pin.rigidBody.angularDamping = 0.3;
        var shape = new Physics.Cylinder(0.21, 0.21, 0.8, 10);
        var quat = new Quaternion();
        quat.setFromAxisAngle(new Vec3(1, 0, 0), -Math.PI / 2);
        var translation = new Vec3(0, 0, 0);
        shape.transformAllPoints(translation, quat);
        pin.rigidBody.addShape(shape);
        pin.isPin = true;

        gameManager.physics.addBody(pin.rigidBody);
    }


    new Vue({
        el: "#app-root",
        data: function () {
            return {gameManager}
        }
    });

});