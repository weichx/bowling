const GLUtil = require("./gl_util");

class GLBuffer {

    constructor(arrayType, fixedArray, itemSize) {
        const gl = GLUtil.getGl();
        this.glBuffer = gl.createBuffer();
        // gl.bindBuffer(arrayType, this.glBuffer);
        // gl.bufferData(arrayType, fixedArray, gl.STATIC_DRAW);
        this.itemCount = 0;//fixedArray.length;
        this.itemSize = 0;//itemSize;
    }

}

module.exports = GLBuffer;