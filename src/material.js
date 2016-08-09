//a helper class for managing pointers into the shader variables
//I wanted this to also handle things like lighting, texturing,
//and back face culling but didnt have time
const GLUtil = require("./gl_util");

class Material {

    constructor(shaderProgram) {
        const gl = GLUtil.getGl();
        this.program = shaderProgram;
        this.shaderPointers = {};
        this.mainTexture = null;

        this.shaderPointers.aVertexPosition = gl.getAttribLocation(this.program, "aVertexPosition");
        this.shaderPointers.aTextureCoord = gl.getAttribLocation(this.program, "aTextureCoord");
        this.shaderPointers.uPMatrix = gl.getUniformLocation(this.program, "uPMatrix");
        this.shaderPointers.uMVMatrix = gl.getUniformLocation(this.program, "uMVMatrix");
        this.shaderPointers.uSampler = gl.getUniformLocation(this.program, "uSampler");
        this.shaderPointers.uTextureTiling = gl.getUniformLocation(this.program, "uTextureTiling");
        this.shaderPointers.uNormalMatrix = gl.getUniformLocation(this.program, "uNormalMatrix");

    }

}

module.exports = Material;