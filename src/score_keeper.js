const ScoreFrame = require("./score_frame");
const FrameResult = require("./e_frame_result");

class ScoreKeeper {

    constructor(totalFrames) {
        this.currentFrameIndex = -1;
        this.frames = new Array(totalFrames);
        this.pendingList = [];
        for (var i = 0; i < totalFrames; i++) {
            this.frames[i] = new ScoreFrame(i === totalFrames - 1);
        }
    }

    beginNewFrame() {
        this.currentFrameIndex++;
        this.pendingList.push(this.frames[this.currentFrameIndex]);
    }

    recordScore(pins) {
        for(var i = 0; i < this.pendingList.length; i++) {

            const pendingFrame = this.pendingList[i];
            pendingFrame.scoreRoll(pins);

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