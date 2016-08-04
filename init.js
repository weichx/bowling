const GameState = {
    Menu: 0,
    FrameStart: 1,
    FrameUpdate: 2,
    FrameCleanup: 3,
    GameSummary: 4
};

//frame structure not related to game, ie data only
//each player has a list of

class GameFrame {

    constructor() {
        this.playerFrames = [];
    }

    update(deltaTime) {
        if (this.currentPlayerFrame) {
            this.currentPlayerFrame.update();
        }
    }
}

class PlayerFrame {

    constructor() {
        this.points = 0;
        this.rollsRemaining = 2;
    }

    score(pins) {
        this.rollsRemaining -= 1;
        this.points += pins;
    }
}

class Game {

    constructor() {
        this.turns = 0;
        this.totalFrames = 10;
        this.players = [];
    }

    update() {
        switch (this.gameState) {
            case GameState.Menu:
                menu.update();
                break;
            case GameState.FrameStart:
                break;
            case GameState.FrameUpdate:
                break;
            case GameState.FrameCleanup:
                break;

        }
        //doPlayerTurn
        //stepPhysics
        //render
    }

    updateFrame() {

    }

    endFrame() {

    }
}

class Player {

    constructor(name) {
        this.name = name;
        this.frames = [];
    }

    roll(pinCount) {

    }

}


/*
 *
 * var pendingFrames = []
 * currentFrame.score += 10
 * if(strike || spare) {
 *   pendingFrames.push(currentFrame);
 *   if(frame.isCompleted()) pendingFrames.pop();
 * }
 * strike | spare | 6 | spare | 9
 *
 * 10 + 10 + 6 | 10 + 6 | 6
 *
 * push(strike) push(strike) push(spare)
 *
 *
 *
 *
 * roll() {
 *   currentFrame.score += score
 *   pendingFrame[0].score += score
 *   pendingFrame[1].score += score
 * }
 *
 * */

