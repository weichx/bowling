const ScoreKeeper = require("../src/score_keeper");

describe("ScoreKeeper", function() {
    var scoreKeeper = null;

    beforeEach(function() {
        scoreKeeper = new ScoreKeeper(10);
        scoreKeeper.beginNewFrame();
    });

    it("is not complete when only 1 roll and not a strike", function () {
        scoreKeeper.recordScore(5);
        expect(scoreKeeper.isCurrentRollingCompleted).toBe(false);
        expect(scoreKeeper.isCurrentScoringCompleted).toBe(false);
    });

    it("is copmlete when getting an open", function () {
        scoreKeeper.recordScore(5);
        scoreKeeper.recordScore(4);
        expect(scoreKeeper.isCurrentRollingCompleted).toBe(true);
        expect(scoreKeeper.isCurrentScoringCompleted).toBe(true);
    });

    it("is complete when getting a spare", function() {
        scoreKeeper.recordScore(5);
        scoreKeeper.recordScore(5);
        expect(scoreKeeper.isCurrentRollingCompleted).toBe(true);
        expect(scoreKeeper.isCurrentScoringCompleted).toBe(false);
    });

    it("is complete when getting a strike", function () {
        scoreKeeper.recordScore(10);
        expect(scoreKeeper.isCurrentRollingCompleted).toBe(true);
        expect(scoreKeeper.isCurrentScoringCompleted).toBe(false);
    });

    it("clamps roll values to [0, 10]", function() {
        scoreKeeper.recordScore(15);
        expect(scoreKeeper.totalScore).toBe(10);
    });

    it("clamps roll values to [0, 10]", function() {
        scoreKeeper.recordScore(5);
        scoreKeeper.recordScore(-6);
        expect(scoreKeeper.totalScore).toBe(5);
    });

    it("handles spare roll scoring on next roll", function() {
        scoreKeeper.recordScore(5);
        scoreKeeper.recordScore(5);

        const spareFrame = scoreKeeper.currentFrame;
        expect(scoreKeeper.isCurrentRollingCompleted).toBe(true);
        expect(spareFrame.isScoringCompleted).toBe(false);

        scoreKeeper.beginNewFrame();
        scoreKeeper.recordScore(1);
        expect(spareFrame.isScoringCompleted).toBe(true);
        expect(spareFrame.score).toBe(11);
        expect(scoreKeeper.currentFrame.score).toBe(1);

        scoreKeeper.recordScore(5);
        expect(scoreKeeper.totalScore).toBe(17);
    });

    it("handles strike scoring on next 2 rolls", function() {
        scoreKeeper.recordScore(10);

        const strike = scoreKeeper.currentFrame;
        expect(scoreKeeper.isCurrentRollingCompleted).toBe(true);
        expect(strike.isScoringCompleted).toBe(false);

        scoreKeeper.beginNewFrame();
        scoreKeeper.recordScore(1);
        expect(strike.isScoringCompleted).toBe(false);
        expect(strike.score).toBe(11);
        expect(scoreKeeper.currentFrame.score).toBe(1);

        scoreKeeper.recordScore(5);
        expect(strike.isScoringCompleted).toBe(true);

        expect(scoreKeeper.totalScore).toBe(22);
    });

    it("properly keeps score of an entire game", function() {
        scoreKeeper.recordScore(10);
        scoreKeeper.beginNewFrame();

        scoreKeeper.recordScore(7);
        scoreKeeper.recordScore(3);
        scoreKeeper.beginNewFrame();

        scoreKeeper.recordScore(7);
        scoreKeeper.recordScore(2);
        scoreKeeper.beginNewFrame();

        scoreKeeper.recordScore(9);
        scoreKeeper.recordScore(1);
        scoreKeeper.beginNewFrame();

        scoreKeeper.recordScore(10);
        scoreKeeper.beginNewFrame();

        scoreKeeper.recordScore(10);
        scoreKeeper.beginNewFrame();

        scoreKeeper.recordScore(10);
        scoreKeeper.beginNewFrame();

        scoreKeeper.recordScore(2);
        scoreKeeper.recordScore(3);
        scoreKeeper.beginNewFrame();

        scoreKeeper.recordScore(6);
        scoreKeeper.recordScore(4);
        scoreKeeper.beginNewFrame();

        scoreKeeper.recordScore(7);
        scoreKeeper.recordScore(3);
        scoreKeeper.recordScore(3);

        expect(scoreKeeper.totalScore).toBe(168);

    });

});
