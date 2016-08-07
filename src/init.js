 require("./gl_util").initGL("render-surface");

// const Time = require("./time");
// const Camera = require("./camera");
// const mat4 = require("gl-matrix").mat4;
// const vec3 = require("gl-matrix").vec3;
// const quat = require("gl-matrix").quat;
// const degToRad = require("./util").degToRad;
// const ResourceManager = require("./resource_manager");
// const Scene = require("./test_scene");
//
// const canvas = GLUtil.getCanvas();
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
//
// ResourceManager.readyPromise.then(() => {
//
//     const scene = Scene.load();
//     const sceneRoot = scene.root;
//     const scenePhysics = scene.physicsWorld;
//
//     const identityMatrix = mat4.create();
//     const camera = new Camera();
//     const gl = GLUtil.getGl();
//     resize(GLUtil.getGl(), camera);
//
//     gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
//     gl.clearColor(0.2, 0.2, 0.2, 1.0);
//
//     (function tick(timestamp) {
//         Time.update(timestamp);
//         requestAnimationFrame(tick);
//         scenePhysics.step(1.0 / 60.0, Time.deltaTime, 3);
//         sceneRoot.update();
//         camera.update();
//         render();
//     })();
//
//     function render() {
//         gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//         gl.enable(gl.DEPTH_TEST);
//         gl.enable(gl.CULL_FACE); //material dependent
//
//         var inv = camera.getMatrix();
//         mat4.invert(inv, inv);
//         sceneRoot.render(identityMatrix, inv, camera.projectionMatrix);
//     }
//
//     const scratch = vec3.create();
//     window.cameraSpeed = 15;
//     const canvas = GLUtil.getCanvas();
//     document.addEventListener("keypress", keyFn);
//     document.addEventListener("keydown", keyFn);
//
//     function keyFn(evt) {
//         vec3.set(scratch, 0, 0, 0);
//         if (evt.keyCode === 87) { //w
//             vec3.scale(scratch, camera.getForward(), -window.cameraSpeed * Time.deltaTime);
//             //position = position + forward * delta
//             vec3.add(camera.position, camera.position, scratch);
//         }
//         else if (evt.keyCode === 83) { //s
//             vec3.scale(scratch, camera.getForward(), window.cameraSpeed * Time.deltaTime);
//             vec3.add(camera.position, camera.position, scratch);
//         }
//         if (evt.keyCode === 65) { //a
//             vec3.scale(scratch, camera.getRight(), -window.cameraSpeed * Time.deltaTime);
//             vec3.add(camera.position, camera.position, scratch);
//         }
//         else if (evt.keyCode === 68) {//d
//             vec3.scale(scratch, camera.getRight(), window.cameraSpeed * Time.deltaTime);
//             vec3.add(camera.position, camera.position, scratch);
//         }
//
//         if (evt.keyCode === 81) { //q
//             quat.rotateY(camera.rotation, camera.rotation, degToRad(5));
//         }
//         else if (evt.keyCode === 69) { //e
//             quat.rotateY(camera.rotation, camera.rotation, -degToRad(5));
//         }
//     }
//
//     window.addEventListener("resize", function () {
//         resize(GLUtil.getGl(), camera);
//     });
//
//
// });
//
//
