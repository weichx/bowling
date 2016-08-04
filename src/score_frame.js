const clamp = require("./util").clamp;
const FrameResult = require("./e_frame_result");

class ScoreFrame {

    constructor(isLastFrame) {
        this.isLastFrame = isLastFrame;
        this.frameResult = FrameResult.Pending;
        this.totalRolls = 0;
        this.score = 0;
    }

    scoreRoll(pinCount) {
        this.totalRolls++;
        this.score += clamp(pinCount, 0, 10);
        if (this.frameResult === FrameResult.Pending) {

            if (this.score === 10 && this.totalRolls === 1) {
                this.frameResult = FrameResult.Strike;
            }
            else if (this.score === 10 && this.totalRolls === 2) {
                this.frameResult = FrameResult.Spare;
            }
            else if (this.totalRolls === 2) {
                this.frameResult = FrameResult.Open;
            }
        }
    }

    get isScoringCompleted() {
        if(this.isSpare || this.isStrike) return this.totalRolls === 3;
        return !this.isPending;
    }

    get isRollingCompleted() {
        if(this.isLastFrame) {
            var targetRolls = (this.isStrike || this.isSpare) ? 3 : 2;
            return targetRolls === this.totalRolls;
        }
        else {
            return !this.isPending;
        }
    }

    get isStrike() {
        return this.frameResult === FrameResult.Strike;
    }

    get isSpare() {
        return this.frameResult === FrameResult.Spare;
    }

    get isPending() {
        return this.frameResult === FrameResult.Pending;
    }

    get isOpen() {
        return this.frameResult === FrameResult.Open;
    }

}

module.exports = ScoreFrame;