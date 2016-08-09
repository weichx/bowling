//a class to hold scores for all frames
const ScoreFrame = require("./score_frame");

class ScoreKeeper {

    constructor() {
        this.currentFrameIndex = -1;
        this.frames = [];
        this.pendingList = [];
    }

    //create n frames when the game begins
    beginNewGame(frameCount) {
        this.currentFrameIndex = -1;
        this.frames = new Array(frameCount);
        for (var i = 0; i < frameCount; i++) {
            this.frames[i] = new ScoreFrame(i === frameCount - 1);
        }
    }

    //at the start of a new frame, that new frame is added to a pending list
    beginNewFrame() {
        this.currentFrameIndex++;
        this.pendingList.push(this.frames[this.currentFrameIndex]);
    }

    //when recording a score, run through all frames in the pending list
    //and score `pins` points. This handles strikes and spares in that
    //those frames are not removed from the pending list until the
    //proper number of rolls have gone by and those subsequent rolls
    //have been properly scored.
    recordScore(pins) {
        for(var i = 0; i < this.pendingList.length; i++) {
            const pendingFrame = this.pendingList[i];
            pendingFrame.scoreRoll(pins);

            //if we are done scoring, remove the frame from the list
            if(pendingFrame.isScoringCompleted) {
                this.pendingList.splice(i--, 1);
            }
        }
    }

    get totalScore() {
        return this.frames.reduce(function(prev, current, idx, array) {
            return prev + array[idx].score;
        }, 0);
    }

    get isCurrentRollingCompleted() {
        return this.frames[this.currentFrameIndex].isRollingCompleted;
    }

    get isCurrentScoringCompleted() {
        return this.frames[this.currentFrameIndex].isScoringCompleted;
    }

    get currentFrame() {
        return this.frames[this.currentFrameIndex];
    }

}

module.exports = ScoreKeeper;