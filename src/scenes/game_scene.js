//generic base class for all scenes providing the enter/update/exit prototype
class GameScene {

    constructor(name, gameManager) {
        this.name = name;
        this.gameManager = gameManager;
    }

    enter() { }

    update() { }

    exit() { }

}

module.exports = GameScene;