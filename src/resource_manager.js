const GLUtil = require("./gl_util");
const Model = require("./model");
const Material = require("./material");

class ResourceManager {

    constructor() {
        this.shaders = {};
        this.models = {};
        this.materials = {};
        this.textures = {};
        this.textureRequests = {};
        this.promises = [];
        this.readyPromise = Promise.resolve();
    }

    init() {
        this.readyPromise = this.readyPromise.then(Promise.all(this.promises));
    }

    setShader(id, vertSrc, fragSrc) {
        this.shaders[id] = GLUtil.createShaderProgram(vertSrc, fragSrc);
    }

    setModel(id, src) {
        this.models[id] = new Model(src);
    }

    setTexture(id, texturePromise) {
        this.promises.push(texturePromise.then((texture) => {
            this.textures[id] = texture;
            if(this.textureRequests[id]) {
                for(var i = 0; i < this.textureRequests[id].length; i++) {
                    this.textureRequests[id][i](texture);
                }
                this.textureRequests[id] = null;
            }
        }));
    }

    setMaterial(id, materialSrc) {
        var material = new Material(this.getShader("default"));
         for(var i = 0; i < materialSrc.textures.length; i++) {
             var textData = materialSrc.textures[i];
             var textureId = textData.id;
             var texturePath = textData.path;
             this.setTexture(textureId, GLUtil.loadTexture(texturePath));
             this.textureRequests[textureId] = this.textureRequests[textureId] || [];
             this.textureRequests[textureId].push((texture) => {
                 material.mainTexture = texture; //todo support more texture
             });
         }
        this.materials[id] = material;
    }

    getModel(modelId) {
        return this.models[modelId];
    }

    getMaterial(materialId) {
        return this.materials[materialId];
    }

    getShader(shaderId) {
        return this.shaders[shaderId];
    }

    getTexture(textureId) {
        return this.textures[textureId];
    }

}

var manager = new ResourceManager();
manager.setShader("default", require("../shaders/vert.glsl"), require("../shaders/frag.glsl"));
manager.setModel("cube.json", require("../models/cube.json"));
manager.setModel("quad.json", require("../models/quad.json"));
manager.setModel("sphere.json", require("../models/sphere.json"));
manager.setModel("pin.json", require("../models/pin.json"));
manager.setMaterial("default", require("../materials/alley.json"));
manager.setMaterial("pin.mat", require("../materials/pin.json"));
manager.setMaterial("ball.mat", require("../materials/ball.json"));

manager.init();

module.exports = manager;