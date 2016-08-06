// const vec3 = require("gl-matrix").vec3;
// const quat = require("gl-matrix").quat;
// const mat4 = require("gl-matrix").mat4;
//
// const forward = vec3.create(0, 0, -1);
// const right = vec3.create(1, 0, 0);
// const up = vec3.create(0, 1, 0);
//
// class Transform {
//
//     constructor(sceneObject) {
//         var parentTransform = sceneObject && sceneObject.transform;
//         this.setParent(parentTransform || null);
//         this.sceneObject = sceneObject;
//         this.position = vec3.create();
//         this.rotation = quat.create();
//         quat.identity(this.rotation);
//         this.scale = vec3.fromValues(1, 1, 1);
//         this.__matrix = mat4.create();
//         this.children = [];
//     }
//
//     setScale(x, y, z) {
//         vec3.set(this.scale, x, y, z);
//     }
//
//     setRotation(yaw, pitch, roll) {
//         throw Error("Not implemented");
//     }
//
//     setPosition(x, y, z) {
//         vec3.set(this.position, x, y, z);
//     }
//
//     getMatrix() {
//         mat4.identity(this.__matrix);
//         mat4.fromRotationTranslationScale(this.__matrix, this.rotation, this.position, this.scale);
//         return this.__matrix;
//     }
//
//     setParent(parent) {
//         if (this.parent) {
//             const idx = this.parent.children.indexOf(this);
//             if (idx !== -1) {
//                 this.parent.children.splice(idx, 1);
//             }
//         }
//         this.parent = parent;
//         if(this.parent) {
//             this.parent.children.push(this);
//         }
//     }
//
//     getForward() {
//         var retn = vec3.create();
//         vec3.transformQuat(retn, forward, this.rotation);
//         return retn;
//     }
//
//     getRight() {
//         var retn = vec3.create();
//         vec3.transformQuat(retn, right, this.rotation);
//         return retn;
//     }
//
//     getUp() {
//         var retn = vec3.create();
//         vec3.transformQuat(retn, up, this.rotation);
//         return retn;
//     }
//
//     getLocalRotation() {
//
//     }
//
//     getWorldMatrix() {
//
//     }
// }
//
//
// module.exports = Transform;