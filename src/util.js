module.exports = {
    clamp: function clamp(input, min, max) {
        if (input < min) input = min;
        if (input > max) input = max;
        return input;
    }
};