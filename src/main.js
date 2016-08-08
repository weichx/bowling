const Vue = require("vue");
const ResourceManager = require("./resource_manager");
const GameManager = require("./game_manager");
const SceneObject = require("./scene_object");
const Physics = require("cannon");
const Constants = require("./constants");
const vec3 = require("gl-matrix").vec3;
const PinPositions = Constants.PinPositions;
const GetBallResetPosition = Constants.GetBallResetPosition;

ResourceManager.readyPromise.then(() => {

    const gameManager = new GameManager();

    var alley = new SceneObject(gameManager.root, "alley");
    alley.model = ResourceManager.getModel("cube.json");
    alley.material = ResourceManager.getMaterial("default");
    alley.scale = vec3.fromValues(5, 0.2, 25);
    alley.rigidBody = new Physics.Body({
        mass: 0,// mass == 0 makes the body static
        shape: new Physics.Box(new Physics.Vec3(2.5, 0.1, 12)),
        position: new Physics.Vec3(0, -0.5, 0) //need this collider lower than its mesh
    });

    var ball = new SceneObject(gameManager.root, "ball");
    ball.model = ResourceManager.getModel("sphere.json");
    ball.scale = vec3.fromValues(0.5, 0.5, 0.5);
    ball.material = ResourceManager.getMaterial("ball.mat");
    ball.rigidBody = new Physics.Body({
        mass: 5, // kg
        position: GetBallResetPosition(),
        shape: new Physics.Sphere(0.5)
    });

    gameManager.physics.addBody(ball.rigidBody);
    gameManager.physics.addBody(alley.rigidBody);

    for (var i = 0; i < 10; i++) {
        var pin = new SceneObject(gameManager.root, "pin");
        pin.model = ResourceManager.getModel("pin.json");
        pin.material = ResourceManager.getMaterial("pin.mat");
        pin.setPosition(PinPositions[i][0], PinPositions[i][1], PinPositions[i][2]);
        pin.scale = vec3.fromValues(0.5, 0.5, 0.5);
        // var cylinderBody = new Physics.Box(new Physics.Vec3(0.2, 0.2, 0.2));//(0.1, 0.1, 2, 5) //todo this aint right, cant visualize it
        //
        // pin.rigidBody = new Physics.Body({
        //     mass: 1,
        //     position: new Physics.Vec3(pinPositions[i][0], pinPositions[i][1], pinPositions[i][2]),
        //     shape: cylinderBody
        // });
        //
        // gameManager.physics.addBody(pin.rigidBody);
    }

    new Vue({
        el: "#app-root",
        data: function () {
           return { gameManager }
        },
        components: {
            splash: require("./ui_components/splash/splash")
        }
    });
});


// splash
//     select players
//     camera orbit
//     occasional ball auto played
//
// game start
//     lerp back to alley
//     wait 2s
//
// frame start
//     turn start
//     turn update
//     turn end
// frame end
//
// game end

//load resources
//new scene manager
//sceneflow.start