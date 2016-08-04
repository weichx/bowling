const TurnManager = require("../src/turn_manager");
const Player = require("../src/player");

describe("Turn Manager", function () {

    var turnManager;
    beforeEach(function () {
        var player1 = new Player("1");
        var player2 = new Player("2");
        turnManager = new TurnManager([player1, player2]);
        turnManager.startGame(10);
    });

    it("should move to next player when current turn is over", function () {
        expect(turnManager.currentPlayerIdx).toBe(0);
        expect(turnManager.totalFrames).toBe(10);
        turnManager.recordScore(10);
        expect(turnManager.currentPlayerIdx).toBe(1);
    });

    it("should move to a new frame when all players have finished", function () {
        turnManager.recordScore(10);
        turnManager.recordScore(10);
        expect(turnManager.currentFrameNumber).toBe(2);
    });

    it("should start new frames with player 1", function () {
        turnManager.recordScore(10);
        turnManager.recordScore(10);
        expect(turnManager.currentPlayerIdx).toBe(0);
    });

    it('should report when the game is over', function () {
        for (var i = 0; i < 24; i++) {
            turnManager.recordScore(10);
        }
        expect(turnManager.isGameOver).toBe(true);
        expect(turnManager.currentFrameNumber).toBe(10);
        expect(turnManager.players[0].scoreKeeper.totalScore).toBe(300);
        expect(turnManager.players[1].scoreKeeper.totalScore).toBe(300);
    });

});