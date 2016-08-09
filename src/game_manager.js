const GLUtil = require("./gl_util");
const Util = require("./util");
const SceneObject = require('./scene_object');
const SplashScene = require("./scenes/splash_scene");
const GameStartScene = require("./scenes/game_start");
const GameSummaryScene = require("./scenes/game_summary");
const PlayerTurnScene = require("./scenes/player_turn");
const FrameScene = require("./scenes/frame_scene");
const TurnManager = require("./turn_manager");
const SceneManager = require("./scene_manager");
const Player = require("./player");
const Physics = require("cannon");
const Camera = require("./camera");
const Time = require("./time");
const Input = require("./input");

const IdentityMatrix = Util.createMatrix4x4();
const PhysicsFixedRate = 1.0 / 60.0;

class GameManager extends SceneManager {

    constructor() {
        super();
        this.showScoreboard = false;
        this.showSplashScreen = true;
        this.showPlayerTurnMessage = false;
        this.paused = false;
        this.camera = new Camera();
        this.root = new SceneObject();
        this.turnManager = null;
        this.input = new Input();
        this.physics = new Physics.World();
        this.physics.solver.iterations = 10;
        this.physics.gravity.set(0, -30, 0);
        this.physics.broadphase = new Physics.NaiveBroadphase();
        this.boundTick = (timestamp) => this.tick(timestamp);

        this.sceneFlow = [
            new SplashScene(this),
        ];

        const gl = GLUtil.getGl();
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(0.2, 0.2, 0.2, 1.0);
        this.tick(0);
    }

    start(playerCount) {

        this.sceneFlow.push(new GameStartScene(this));

        for(var i = 0; i < 10; i++) {
            this.sceneFlow.push(new FrameScene(this));
            for(var j = 0; j < playerCount; j++) {
                this.sceneFlow.push(new PlayerTurnScene(this));
            }
        }

        this.sceneFlow.push(new GameSummaryScene(this));

        var playerList = [];
        for(i = 0; i < playerCount; i++) {
            playerList.push(new Player("Player " + (i + 1)));
        }
        this.turnManager = new TurnManager(playerList);
        this.turnManager.startGame();
        this.beginScene();
    }

    tick(timestamp) {
        Time.update(timestamp);
        requestAnimationFrame(this.boundTick);
        this.input.processInput();
        if (this.paused) return;
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
        inv = Util.invertMatrix4x4(inv);
        this.root.render(IdentityMatrix, inv, this.camera.projectionMatrix);
    }

    checkForResize(gl) {

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (gl.canvas.width !== windowWidth || gl.canvas.height !== windowHeight) {

            gl.canvas.width = Math.floor(window.innerWidth);
            gl.canvas.height = Math.floor(window.innerHeight);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            this.camera.updatePerspectiveMatrix();
        }
    }

}

module.exports = GameManager;