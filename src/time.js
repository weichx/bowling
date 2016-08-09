//simple class for storing time values
module.exports = {

    totalTime: 0,
    deltaTime: 0,
    lastTime: 0,

    update(timestamp) {
        this.deltaTime = (timestamp - this.lastTime) / 1000.0;
        this.totalTime += this.deltaTime;
        this.lastTime = timestamp;
    }
};