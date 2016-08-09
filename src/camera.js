const GLUtil = require("./gl_util");
const Util = require("./util");
const SceneObject = require("./scene_object");

class Camera extends SceneObject {

    constructor(parent) {
        super(parent);
        this.fov = 45.0;
        this.nearClipPlane = 0.01;
        this.farClipPlane = 1000.0;
        this.projectionMatrix = Util.createMatrix4x4();
        this.setPosition(0, 1, 0);
    }

    updatePerspectiveMatrix() {
        Util.perspectiveMatrix(this.projectionMatrix, this.fov, this.aspectRatio, this.nearClipPlane, this.farClipPlane);
    }

    get aspectRatio() {
        const gl = GLUtil.getGl();
        return gl.drawingBufferWidth / gl.drawingBufferHeight;
    }

}

module.exports = Camera;