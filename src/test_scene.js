const SceneObject = require("./scene_object");
const ResourceManager = require("./resource_manager");
const vec3 = require("gl-matrix").vec3;

module.exports = {
    load: function () {

        var root = new SceneObject();

        var alley = new SceneObject(root);
        alley.model = ResourceManager.getModel("cube.json");
        alley.material = ResourceManager.getMaterial("default");
        alley.scale = vec3.fromValues(2, 0.2, 12);
        window.alley = alley;
        window.vec3 = vec3;

        var ball = new SceneObject(root);
        // ball.model = ResourceManager.getModel("sphere.json");
        var pinPositions = [
            [-0.4, 0.14, -10.5],
            [0.4, 0.14, -10.5],
            [1.2, 0.14, -10.5],
            [-1.2, 0.14, -10.5],
            [0, 0.14, -9.5],
            [-0.9, 0.14, -9.5],
            [0.9, 0.14, -9.5],
            [0.5, 0.14, -8.5],
            [-0.5, 0.14, -8.5],
            [0, 0.14, -7.5]
        ];

        for (var i = 0; i < 10; i++) {
            var pin = new SceneObject(root);
            pin.model = ResourceManager.getModel("pin.json");
            pin.material = ResourceManager.getMaterial("pin.mat");
            pin.setPosition(pinPositions[i][0], pinPositions[i][1], pinPositions[i][2]);
            pin.scale = vec3.fromValues(0.5, 0.5, 0.5);
            window.pin = pin;
        }

        // var ground = new SceneObject(root);
        // // ground.transform.setRotation();
        // for (var i = 0; i < 10; i++) {
        //     var groundElement = new SceneObject(ground);
        //     groundElement.model = ResourceManager.getModel("quad.json");
        //     groundElement.transform.setPosition(0, 0, i);
        // }
        //
        // var ball = new SceneObject(root);
        // var ballModel = ResourceManager.getModel("ball.json");
        // ball.model = new Model(ballModel);
        //
        // var pinRoot = new SceneObject(root);
        // for(i = 0; i < 10; i++) {
        //     var pin = new SceneObject(pinRoot);
        //     pin.model = ResourceManager.getModel("pin.json");
        //     pin.transform.setPosition(0, 0, i);
        // }

        return root;
    }
};

