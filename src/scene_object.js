//the core class for all 'things' in the scene
//its intended to be a heirarchy of items with
//their parent transforms being taken into account
//so all spacial calculations can be done locally
const GLUtil = require("./gl_util");
const Util = require("./util");
const Vec3 = require("cannon").Vec3;
const Quaternion = require("cannon").Quaternion;

class SceneObject {

    constructor(parentNode, tag) {
        this.tag = tag || "SceneObject";
        this.setParent(parentNode);
        this.model = null;
        this.material = null;
        this.rigidBody = null;
        this.children = [];
        this.position = new Vec3();
        this.rotation = new Quaternion();
        this.scale = new Vec3(1, 1, 1);
    }

    findChild(tag) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].tag === tag) return this.children[i];
        }
        return null;
    }

    findChildren(tag) {
        var retn = [];
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].tag === tag) retn.push(this.children[i]);
        }
        return retn;
    }

    render(parentWorldMatrix, viewMatrix, projectionMatrix) {
        //combine matrices to get the world-view-projection for this model
        const wvp = Util.createMatrix4x4();
        Util.multiplyMatrix(wvp, parentWorldMatrix, viewMatrix);
        Util.multiplyMatrix(wvp, wvp, projectionMatrix);

        this.renderSelf(parentWorldMatrix, viewMatrix, projectionMatrix);

        var worldMatrix = this.getMatrix();
        //render all the children providing them with our world matrix
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].render(worldMatrix, viewMatrix, projectionMatrix);
        }
    }

    //draw yourself, setup all the webgl buffers and textures then issue a draw command
    renderSelf(parentWorld, viewMatrix, projectionMatrix) {
        if (!this.model) return;

        const gl = GLUtil.getGl();
        const material = this.material;
        const shaderPointers = material.shaderPointers;
        const vertexBuffer = this.model.vertexBuffer;
        const indexBuffer = this.model.indexBuffer;
        const uvBuffer = this.model.uvBuffer;

        gl.useProgram(material.program);

        var mvMatrix = Util.createMatrix4x4();
        var world = this.getMatrix();
        Util.multiplyMatrix(world, world, parentWorld);
        Util.multiplyMatrix(mvMatrix, viewMatrix, world);

        var normalMatrix = Util.extractRotation(mvMatrix);
        gl.uniformMatrix3fv(shaderPointers.uNormalMatrix, false, normalMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.glBuffer);
        gl.vertexAttribPointer(shaderPointers.aVertexPosition, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(shaderPointers.aVertexPosition);

        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer.glBuffer);
        gl.vertexAttribPointer(shaderPointers.aTextureCoord, uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(shaderPointers.aTextureCoord);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.glBuffer);
        gl.uniformMatrix4fv(shaderPointers.uPMatrix, false, projectionMatrix);
        gl.uniformMatrix4fv(shaderPointers.uMVMatrix, false, mvMatrix);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, material.mainTexture);
        gl.uniform1i(shaderPointers.uSampler, 0);
        gl.uniform2fv(shaderPointers.uTextureTiling, [1, 1]);

        gl.drawElements(gl.TRIANGLES, indexBuffer.itemCount, gl.UNSIGNED_SHORT, 0);

    }

    update() {
        if (this.rigidBody) {
            var v = this.rigidBody.position;
            var q = this.rigidBody.quaternion;
            if (this.isPin) {
                v = {x: v.x, y: v.y - 0.5, z: v.z};
            }

            this.setPosition(v.x, v.y, v.z);
            this.setRotation(q.x, q.y, q.z, q.w);
        }

        for (var i = 0; i < this.children.length; i++) {
            this.children[i].update();
        }
    }

    destroy() {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].destroy();
        }
    }

    setScale(x, y, z) {
        this.scale.set(x, y, z)
    }

    setRotation(x, y, z, w) {
        this.rotation.set(x, y, z, w);
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    getMatrix() {
        return Util.matrixFromTRS(this.rotation, this.position, this.scale);
    }

    setParent(parent) {
        if (this.parent) {
            const idx = this.parent.children.indexOf(this);
            if (idx !== -1) {
                this.parent.children.splice(idx, 1);
            }
        }
        this.parent = parent;
        if (this.parent) {
            this.parent.children.push(this);
        }
    }

}

module.exports = SceneObject;