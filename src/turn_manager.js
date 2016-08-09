const GameEvent = require("./e_game_event");
const EventEmitter = require("./event_emitter");

class TurnManager extends EventEmitter {

    constructor(players) {
        super();
        this.players = players;
        this.currentPlayerIdx = 0;
        this.currentFrameNumber = 0;
        this.totalFrames = 10;
    }

    startGame(frameCount) {
        this.totalFrames = frameCount || 10;
        this.currentPlayerIdx = 0;
        this.currentFrameNumber = 0;
        for(var i = 0; i < this.players.length; i++) {
            this.players[i].scoreKeeper.beginNewGame(this.totalFrames);
        }
        this.beginFrame();
    }

    beginFrame() {
        this.currentFrameNumber++;
        this.emit(GameEvent.BeginFrame, this.currentFrameNumber);
        this.beginTurn();
    }

    beginTurn() {
        this.emit(GameEvent.BeginTurn, this.currentPlayer, this.currentFrameNumber);
        this.currentPlayer.scoreKeeper.beginNewFrame();
    }

    recordScore(pins) {
        //dont record points if the game is over
        if(this.isGameOver) return true;
        const scoreKeeper = this.currentPlayer.scoreKeeper;
        scoreKeeper.recordScore(pins);
        //if we are done rolling, end the turn. Note for the last frame
        //this could be up to 3 rolls.
        if (scoreKeeper.isCurrentRollingCompleted) {
            this.endTurn();
            return true;
        }
        return false;
    }

    endTurn() {
        this.emit(GameEvent.EndTurn, this.currentPlayer, this.currentFrameNumber);
        this.currentPlayerIdx = ++this.currentPlayerIdx % this.players.length;
        //when we wrap around to the first player again we know the frame is over.
        //if the frame isn't completed, start the next player's turn
        if (this.currentPlayerIdx === 0) {
            this.endFrame();
        }
        else {
            this.beginTurn();
        }
    }

    endFrame() {
        this.emit(GameEvent.EndFrame, this.currentFrameNumber);
        if (!this.isGameOver) {
            this.beginFrame();
        }
    }

    get isGameOver() {
        return this.currentFrameNumber >= this.totalFrames
            && this.players.every(function (player) {
                return player.scoreKeeper.isCurrentRollingCompleted;
            });
    }

    get currentPlayer() {
        return this.players[this.currentPlayerIdx];
    }
}

module.exports = TurnManager;