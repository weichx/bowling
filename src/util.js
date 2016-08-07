const RadConstant = Math.PI / 180;
const DegreeConstant = 180 / Math.PI;

module.exports = {

    degToRad(degrees) {
        return degrees * RadConstant;
    },

    radToDeg(radians) {
        return radians * DegreeConstant;
    },

    clamp(input, min, max) {
        if (input < min) input = min;
        if (input > max) input = max;
        return input;
    }

};