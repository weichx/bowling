const Vec3 = require("cannon").Vec3;

module.exports = {
    GetBallResetPosition: function () {
        return new Vec3(0, 0.5, 12)
    },
    PinPositions: [
        new Vec3(-0.4, 0.5, -10.5),
        new Vec3(0.4, 0.5, -10.5),
        new Vec3(1.2, 0.5, -10.5),
        new Vec3(-1.2, 0.5, -10.5),
        new Vec3(0, 0.5, -9.5),
        new Vec3(-0.9, 0.5, -9.5),
        new Vec3(0.9, 0.5, -9.5),
        new Vec3(0.5, 0.5, -8.5),
        new Vec3(-0.5, 0.5, -8.5),
        new Vec3(0, 0.5, -7.5)
    ]
};