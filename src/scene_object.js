const vec3 = require("gl-matrix").vec3;
const quat = require("gl-matrix").quat;
const mat4 = require("gl-matrix").mat4;
const mat3 = require("gl-matrix").mat3;
const GLUtil = require("./gl_util");

const forward = vec3.fromValues(0, 0, 1);
const right = vec3.fromValues(1, 0, 0);
const up = vec3.fromValues(0, 1, 0);

class SceneObject {

    constructor(parentNode, tag) {
        this.tag = tag || "SceneObject";
        this.setParent(parentNode);
        this.model = null;
        this.material = null;
        this.rigidBody = null;
        this.components = [];
        this.children = [];
        this.position = vec3.create();
        this.rotation = quat.create();
        quat.identity(this.rotation);
        this.scale = vec3.fromValues(1, 1, 1);
        this.__matrix = mat4.create();
    }

    initialize() {
        for (var i = 0; i < this.components.length; i++) {
            this.components[i].initialize();
        }
    }

    findChild(tag) {
        for(var i = 0; i < this.children.length; i++) {
            if (this.children[i].tag === tag) return this.children[i];
        }
        return null;
    }

    findChildren(tag) {
        var retn = [];
        for(var i = 0; i < this.children.length; i++) {
            if (this.children[i].tag === tag) retn.push(this.children[i]);
        }
        return retn;
    }

    render(parentWorldMatrix, viewMatrix, projectionMatrix) {
        const wvp = mat4.create();
        mat4.multiply(wvp, parentWorldMatrix, viewMatrix);
        mat4.multiply(wvp, wvp, projectionMatrix);

        this.renderSelf(parentWorldMatrix, viewMatrix, projectionMatrix);

        var worldMatrix = this.getMatrix();
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].render(worldMatrix, viewMatrix, projectionMatrix);
        }
    }

    renderSelf(parentWorld, viewMatrix, projectionMatrix) {
        if(!this.model) return;

        const gl = GLUtil.getGl();
        const material = this.material;
        const shaderPointers = material.shaderPointers;
        const vertexBuffer = this.model.vertexBuffer;
        const indexBuffer = this.model.indexBuffer;
        const uvBuffer = this.model.uvBuffer;

        gl.useProgram(material.program);

        var mvMatrix = mat4.create();
        var world = this.getMatrix();
        mat4.multiply(world, world, parentWorld);
        mat4.multiply(mvMatrix, viewMatrix, world);

        var normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, mvMatrix);
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
        if(this.rigidBody && !this.rigidBody.test) {
            var v = this.rigidBody.position;
            var q = this.rigidBody.quaternion;
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
        vec3.set(this.scale, x, y, z);
    }

    setRotation(x, y, z, w) {
        quat.set(this.rotation, x, y, z, w);
    }

    setPosition(x, y, z) {
        vec3.set(this.position, x, y, z);
    }

    getMatrix() {
        mat4.identity(this.__matrix);
        mat4.fromRotationTranslationScale(this.__matrix, this.rotation, this.position, this.scale);
        return this.__matrix;
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

    getForward() {
        var retn = vec3.create();
        vec3.transformQuat(retn, forward, this.rotation); //may need to include parent rotation
        return retn;
    }

    getRight() {
        var retn = vec3.create();
        vec3.transformQuat(retn, right, this.rotation);
        return retn;
    }

    getUp() {
        var retn = vec3.create();
        vec3.transformQuat(retn, up, this.rotation);
        return retn;
    }

}

module.exports = SceneObject;