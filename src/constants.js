const Physics = require("cannon");

module.exports = {
    GetBallResetPosition: function() { return new Physics.Vec3(0, 1.5, 12) },
    PinPositions: [
        [-0.4, -0.5, -10.5],
        [0.4, -0.5, -10.5],
        [1.2, -0.5, -10.5],
        [-1.2, -0.5, -10.5],
        [0, -0.5, -9.5],
        [-0.9, -0.5, -9.5],
        [0.9, -0.5, -9.5],
        [0.5, -0.5, -8.5],
        [-0.5, -0.5, -8.5],
        [0, -0.5, -7.5]
    ]
};