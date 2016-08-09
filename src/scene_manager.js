//base class for managing a scene flow
class SceneManager {

    constructor() {
        this.currentSceneIndex = 0;
        this.sceneFlow = [];
    }

    beginScene() {
        this.currentScene.enter();
    }

    update() {
        this.currentScene.update();
    }

    endScene() {
        this.currentScene.exit();
        this.currentSceneIndex = ++this.currentSceneIndex % this.sceneFlow.length;
        this.beginScene();
    }

    get currentScene() {
        return this.sceneFlow[this.currentSceneIndex];
    }
}

module.exports = SceneManager;


