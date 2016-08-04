const GameScene = require("./game_scene");

const SceneState = {
    Intro: 1 << 0,
    TurnBegin: 1 << 1,
    TurnAim: 1 << 2,
    TurnRoll: 1 << 3,
    TurnEnd: 1 << 4,
    Summary: 1 << 5
};

class IntroPlayScene extends GameScene {

}

class TurnBeginScene extends GameScene {

}

class TurnAimScene extends GameScene {

}

class TurnRollState {

}

class PlayScene extends GameScene {

    //states
    //splash 'its your turn' screen
    //aim + get input
    //roll ball and see what happens (repeat until done rolling)
    //record + report score
    //summarize turn
    //end

    constructor(players, frameCount) {
        this.players = players;
        this.sceneState = SceneState.Intro;
        this.currentPlayerIndex = 0;
        this.totalFrames = frameCount || 10;
        this.currentPlayer = this.players[this.currentPlayerIndex];
    }

    enter() {
        this.activeScene = new IntroPlayScene();
        this.activeScene.enter();
    }

    update() {
        this.handleInput();
        this.updateSceneObjects();
        this.renderSceneObjects();
    }

    exit() {
        this.activeScene.exit();
    }

    //true when all players have completed current frame #
    isFrameCompleted() {

    }

    //true when current player has completed current frame
    isTurnCompleted() {
    }

    //true when all players have finished the last frame
    isGameCompleted() {

    }

}

class TurnManager {

}

class InputManager {

}

class RenderEngine {

}

module.exports = PlayScene;