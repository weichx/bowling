const Vue = require("vue");
const ResourceManager = require("./resource_manager");
const SceneManager = require("./scene_manager");
const SceneObject = require("./scene_object");
const Physics = require("cannon");
const vec3 = require("gl-matrix").vec3;

ResourceManager.readyPromise.then(() => {

    const sceneManager = new SceneManager();

    var alley = new SceneObject(sceneManager.root);
    alley.model = ResourceManager.getModel("cube.json");
    alley.material = ResourceManager.getMaterial("default");
    alley.scale = vec3.fromValues(5, 0.2, 25);
    alley.rigidBody = new Physics.Body({
        mass: 0,// mass == 0 makes the body static
        shape: new Physics.Box(new Physics.Vec3(2.5, 0.1, 12)),
        position: new Physics.Vec3(0, -0.5, 0) //need this collider lower than its mesh
    });

    var ball = new SceneObject(sceneManager.root);
    ball.setPosition(0, 1.5, 12);
    ball.model = ResourceManager.getModel("sphere.json");
    ball.material = ResourceManager.getMaterial("ball.mat");
    ball.rigidBody = new Physics.Body({
        mass: 5, // kg
        position: new Physics.Vec3(ball.position[0], ball.position[1], ball.position[2]),
        shape: new Physics.Sphere(0.5)
    });

    sceneManager.physics.addBody(ball.rigidBody);
    sceneManager.physics.addBody(alley.rigidBody);

    window.push = function() {
        var world = new Physics.Vec3(ball.position[0], ball.position[1], ball.position[2]);
        ball.rigidBody.applyImpulse(new Physics.Vec3(0, 0, -100), world);//new Physics.Vec3(0, 0.5, 15));
    };

    var pinPositions = [
        [-0.4, -0.5, -10.5],
        [0.4, -0.5, -10.5],
        [1.2, -0.5, -10.5],
        [-1.2, -0.5, -10.5],
        [0, -0.5, -9.5],
        [-0.9, -0.5, -9.5],
        [0.9, -0.5, -9.5],
        [0.5, -0.5, -8.5],
        [-0.5, -0.5, -8.5],
        [0, -0.5, -7.5]
    ];

    for (var i = 0; i < 10; i++) {
        var pin = new SceneObject(sceneManager.root);
        pin.model = ResourceManager.getModel("pin.json");
        pin.material = ResourceManager.getMaterial("pin.mat");
        pin.setPosition(pinPositions[i][0], pinPositions[i][1], pinPositions[i][2]);
        pin.scale = vec3.fromValues(0.5, 0.5, 0.5);
        var cylinderBody = new Physics.Box(new Physics.Vec3(0.2, 0.2, 0.2));//(0.1, 0.1, 2, 5) //todo this aint right, cant visualize it

        pin.rigidBody = new Physics.Body({
            mass: 1,
            position: new Physics.Vec3(pinPositions[i][0], pinPositions[i][1], pinPositions[i][2]),
            shape: cylinderBody
        });

        sceneManager.physics.addBody(pin.rigidBody);
    }

    sceneManager.start();

    new Vue({
        el: "#app-root",
        data: function () {
           return { sceneManager }
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