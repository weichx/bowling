const GLUtil = require("./gl_util");
const GLBuffer = require("./buffer");

class Model {

    constructor(modelJSON) {

        const vertices = modelJSON.meshes[0].vertices;
        const indices = modelJSON.meshes[0].indices;
        const uvs = modelJSON.meshes[0].uvs;

        const gl = GLUtil.getGl();

        this.vertexBuffer = new GLBuffer();
        this.indexBuffer = new GLBuffer();
        this.uvBuffer = new GLBuffer();
        //this.normalBuffer = new GLBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer.glBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.vertexBuffer.itemSize = 3;
        this.vertexBuffer.numItems = vertices.length;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer.glBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
        this.uvBuffer.itemSize = 2;
        this.uvBuffer.itemCount = uvs.length;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer.glBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        this.indexBuffer.itemSize = 1;
        this.indexBuffer.itemCount = indices.length;

    }


}

module.exports = Model;