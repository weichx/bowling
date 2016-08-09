const GLUtil = require("./gl_util");

class GLBuffer {

    constructor() {
        const gl = GLUtil.getGl();
        this.glBuffer = gl.createBuffer();
        this.itemCount = 0;
        this.itemSize = 0;
    }

}

module.exports = GLBuffer;