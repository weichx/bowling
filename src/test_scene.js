const SceneObject = require("./scene_object");
const ResourceManager = require("./resource_manager");
const vec3 = require("gl-matrix").vec3;
const Physics = require("cannon");

module.exports = {

    load: function () {

        const physicsWorld = new Physics.World();
        physicsWorld.gravity.set(0, -9.82, 0);
        var root = new SceneObject();

        return {root, physicsWorld };
    }
};

