const GLUtil = require("./gl_util");
const SceneObject = require('./scene_object');
const SplashScene = require("./scenes/splash_scene");
const GameStartScene = require("./scenes/game_start");
const Physics = require("cannon");
const Camera = require("./camera");
const Time = require("./time");
const mat4 = require("gl-matrix").mat4;

const IdentityMatrix = mat4.create();
const PhysicsFixedRate = 1.0 / 60.0;

class SceneManager {

    constructor() {
        this.paused = false;
        this.camera = new Camera();
        this.root = new SceneObject();
        this.turnManager = null;
        this.currentSceneIndex = 0;
        this.physics = new Physics.World();
        this.physics.solver.iterations = 5;
        this.physics.gravity.set(0, -9.82, 0);
        this.physics.broadphase = new Physics.NaiveBroadphase();
        this.physics.defaultContactMaterial.contactEquationStiffness = 1e6;
        this.physics.defaultContactMaterial.contactEquationRelaxation = 10;

        this.sceneFlow = [
            new SplashScene(this),
             new GameStartScene(this),
            // new GamePlayScene(),
            // new GameSummaryScene()
        ];
        this.currentScene = this.sceneFlow[this.currentSceneIndex];
        this.boundTick = (timestamp) => this.tick(timestamp);
    }

    start() {
        const gl = GLUtil.getGl();
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(0.2, 0.2, 0.2, 1.0);
        this.tick(0);
    }

    beginScene() {
        this.currentScene.enter();
    }

    endScene() {
        this.currentScene.exit();
        this.currentSceneIndex = ++this.currentSceneIndex % this.sceneFlow.length;
        this.currentScene = this.sceneFlow[this.currentSceneIndex];
        this.beginScene();
    }

    tick(timestamp) {
        Time.update(timestamp);
        requestAnimationFrame(this.boundTick);
        if(this.paused) return;
        this.currentScene.update();
        this.physics.step(PhysicsFixedRate, Time.deltaTime, 3);
        this.root.update();
        this.render();
    }

    render() {
        const gl = GLUtil.getGl();
        this.checkForResize(gl);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE); //todo -- material dependent

        var inv = this.camera.getMatrix();
        mat4.invert(inv, inv);
        this.root.render(IdentityMatrix, inv, this.camera.projectionMatrix);
    }

    checkForResize(gl) {

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if(gl.canvas.width !== windowWidth || gl.canvas.height !== windowHeight) {

            gl.canvas.width = Math.floor(window.innerWidth);
            gl.canvas.height = Math.floor(window.innerHeight);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            this.camera.updatePerspectiveMatrix();

        }
    }
}

module.exports = SceneManager;


