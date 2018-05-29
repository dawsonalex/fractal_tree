var Random = (function () {
    function Random(seed) {
        this.setSeed(seed);
    }
    Random.prototype.getNext = function () {
        var x = Math.sin(this.seed += 1) * 1000;
        return x - Math.floor(x);
    };
    Random.prototype.getNextBetween = function (min, max) {
        return Math.floor(this.getNext() * (max - min + 1) + min);
    };
    Random.prototype.setSeed = function (seed) {
        this.seed = seed;
    };
    return Random;
}());