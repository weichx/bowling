const GLUtil = require("./gl_util");
GLUtil.initGL("render-surface");
const Time = require("./time");
const Camera = require("./camera");
const mat4 = require("gl-matrix").mat4;
const vec3 = require("gl-matrix").vec3;
const quat = require("gl-matrix").quat;
const degToRad = require("./util").degToRad;
const ResourceManager = require("./resource_manager");
const Scene = require("./test_scene");


ResourceManager.readyPromise.then(() => {

    const sceneRoot = Scene.load();
    const world = mat4.create();
    const camera = new Camera();
    const gl = GLUtil.getGl();
    camera.updatePerspectiveMatrix();


    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.2, 0.2, 0.2, 1.0);

    (function tick(timestamp) {
        Time.update(timestamp);
        requestAnimationFrame(tick);
        sceneRoot.update();
        camera.update();
        render();
    })();

    function render() {
        const gl = GLUtil.getGl();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        // gl.enable(gl.CULL_FACE); //material dependent

        var inv = camera.getMatrix();
        mat4.invert(inv, inv);
        sceneRoot.render(world, inv, camera.projectionMatrix);
        //sorted by material
        //foreach material group
        //foreach rendered item
        //material.setup();
        //material.render();
        //material.cleanup();
    }

    const scratch = vec3.create();
    window.cameraSpeed = 5;
    const canvas = GLUtil.getCanvas();
    document.addEventListener("keypress", keyFn);
    document.addEventListener("keydown", keyFn);

    function keyFn(evt) {
        vec3.set(scratch, 0, 0, 0);
        if (evt.keyCode === 87) { //w
            vec3.scale(scratch, camera.getForward(), -window.cameraSpeed * Time.deltaTime);
            //position = position + forward * delta
            vec3.add(camera.position, camera.position, scratch);
        }
        else if (evt.keyCode === 83) { //s
            vec3.scale(scratch, camera.getForward(), window.cameraSpeed * Time.deltaTime);
            vec3.add(camera.position, camera.position, scratch);
        }
        if (evt.keyCode === 65) { //a
            vec3.scale(scratch, camera.getRight(), -window.cameraSpeed * Time.deltaTime);
            vec3.add(camera.position, camera.position, scratch);
        }
        else if (evt.keyCode === 68) {//d
            vec3.scale(scratch, camera.getRight(), window.cameraSpeed * Time.deltaTime);
            vec3.add(camera.position, camera.position, scratch);
        }

        if (evt.keyCode === 81) { //q
            quat.rotateY(camera.rotation, camera.rotation, degToRad(5));
        }
        else if (evt.keyCode === 69) { //e
            quat.rotateY(camera.rotation, camera.rotation, -degToRad(5));
        }
    }

    // var mouseDown = false;
    // var lastMouseX = null;
    // var lastMouseY = null;
    //
    // var moonRotationMatrix = mat4.create();
    // mat4.identity(moonRotationMatrix);
    //
    // document.addEventListener("mouseup", handleMouseUp);
    // document.addEventListener("mousedown", handleMouseDown);
    // document.addEventListener("mousemove", handleMouseMove);
    //
    // function handleMouseDown(event) {
    //     mouseDown = true;
    //     lastMouseX = event.clientX;
    //     lastMouseY = event.clientY;
    // }
    //
    // function handleMouseUp(event) {
    //     mouseDown = false;
    // }
    //
    // function handleMouseMove(event) {
    //     if (!mouseDown) {
    //         return;
    //     }
    //     var newX = event.clientX;
    //     var newY = event.clientY;
    //
    //     var deltaX = newX - lastMouseX;
    //     var deltaY = newY - lastMouseY;
    //
    //     var xQuat = quat.create();
    //     var yQuat = quat.create();
    //     var outQuat = quat.create();
    //     quat.setAxisAngle(xQuat, [1, 0, 0], degToRad(deltaX / 10));
    //     quat.setAxisAngle(yQuat, [0, 1, 0], degToRad(deltaY / 10));
    //
    //
    //     lastMouseX = newX;
    //     lastMouseY = newY;
    // }


});
