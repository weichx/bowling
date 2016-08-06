const mat4 = require("gl-matrix").mat4;
const GLUtil = require("./gl_util");
const SceneObject = require("./scene_object");

class Camera extends SceneObject {

    constructor(parent) {
        super(parent);
        this.fov = 45.0;
        this.nearClipPlane = 0.01;
        this.farClipPlane = 1000.0;
        this.projectionMatrix = mat4.create();
        mat4.identity(this.projectionMatrix);
        this.setPosition(0, 2, -3);
    }

    updatePerspectiveMatrix() {
        mat4.perspective(this.projectionMatrix, this.fov, this.aspectRatio, this.nearClipPlane, this.farClipPlane);
    }

    get aspectRatio() {
        const gl = GLUtil.getGl();
        return gl.drawingBufferWidth / gl.drawingBufferHeight;
    }

}

module.exports = Camera;