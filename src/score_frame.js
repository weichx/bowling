//responsible for holding roll and score data for a single game frame for a single player
const clamp = require("./util").clamp;
const FrameResult = require("./e_frame_result");

class ScoreFrame {

    constructor(isLastFrame) {
        this.isLastFrame = isLastFrame; //special case the final frame
        this.frameResult = FrameResult.Pending; //start out pending, results are not known yet
        this.totalRolls = 0;
        this.score = 0;
    }

    //to score a role, add 1 to total rolls, clamp the pin count
    //and figure out if we are a strike, spare, or open (< 10 pins in a turn)
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

    //scoring for a frame is completed when it is no longer pending
    //or a spare or strike happened and 3 total rolls have gone by.
    //this can happen on a different turn than the frame we are scoring
    //occured on
    get isScoringCompleted() {
        if(this.isSpare || this.isStrike) return this.totalRolls === 3;
        return !this.isPending;
    }

    //rolling is completed when we are no longer pending or reached our target role count
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