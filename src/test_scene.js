const SceneObject = require("./scene_object");
const ResourceManager = require("./resource_manager");
const vec3 = require("gl-matrix").vec3;
const Physics = require("cannon");

module.exports = {
    load: function () {

        const physicsWorld = new Physics.World();
        physicsWorld.gravity.set(0, -9.82, 0);

        // physicsWorld.broadphase = new Physics.NaiveBroadphase();
        // physicsWorld.solver.iterations = 5;
        // physicsWorld.defaultContactMaterial.contactEquationStiffness = 1e6;
        // physicsWorld.defaultContactMaterial.contactEquationRelaxation = 10;

        var root = new SceneObject();

        var alley = new SceneObject(root);
        alley.model = ResourceManager.getModel("cube.json");
        alley.material = ResourceManager.getMaterial("default");
        alley.scale = vec3.fromValues(5, 0.2, 25);
        alley.rigidBody = new Physics.Body({
            mass: 0,// mass == 0 makes the body static
            shape: new Physics.Box(new Physics.Vec3(2.5, 0.1, 12)),
            position: new Physics.Vec3(0, -0.5, 0) //need this collider lower than its mesh
        });
        alley.rigidBody.test = true;

        var ball = new SceneObject(root);
        ball.setPosition(0, 1.5, 12);
        ball.model = ResourceManager.getModel("sphere.json");
        ball.material = ResourceManager.getMaterial("ball.mat");
        ball.rigidBody = new Physics.Body({
            mass: 2.5, // kg
            position: new Physics.Vec3(ball.position[0], ball.position[1], ball.position[2]),
            shape: new Physics.Sphere(1)
        });

        physicsWorld.addBody(ball.rigidBody);
        physicsWorld.addBody(alley.rigidBody);
        ball.rigidBody.linearDamping = 0.25;

        window.push = function() {
            var world = new Physics.Vec3(ball.position[0], ball.position[1], ball.position[2]);
            ball.rigidBody.applyImpulse(new Physics.Vec3(0, 0, -100), world);//new Physics.Vec3(0, 0.5, 15));
        };
        var pinPositions = [
            [-0.4, 0.15, -10.5],
            [0.4, 0.15, -10.5],
            [1.2, 0.15, -10.5],
            [-1.2, 0.15, -10.5],
            [0, 0.15, -9.5],
            [-0.9, 0.15, -9.5],
            [0.9, 0.15, -9.5],
            [0.5, 0.15, -8.5],
            [-0.5, 0.15, -8.5],
            [0, 1, -7.5]
        ];

        for (var i = 0; i < 10; i++) {
            var pin = new SceneObject(root);
            pin.model = ResourceManager.getModel("pin.json");
            pin.material = ResourceManager.getMaterial("pin.mat");
            pin.setPosition(pinPositions[i][0], pinPositions[i][1], pinPositions[i][2]);
            pin.scale = vec3.fromValues(0.5, 0.5, 0.5);
            pin.rigidBody = new Physics.Body({
                mass: 1,
                position: new Physics.Vec3(pinPositions[i][0], pinPositions[i][1], pinPositions[i][2]),
                shape: new Physics.Cylinder(0.4, 0.4, 2, 5) //todo this aint right, cant visualize it
            });
            physicsWorld.addBody(pin.rigidBody);
        }


        return {root, physicsWorld };
    }
};

