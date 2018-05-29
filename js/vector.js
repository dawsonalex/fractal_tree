var  Vector = (function () {
    function Vector(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }
    Vector.prototype.add = function (pVector) {
        var newVector = new Vector(pVector.getX() + this.mX, pVector.getY() + this.mY);
        return newVector;
    };
    Vector.prototype.subtract = function (pVector) {
        var newVector = new Vector(this.mX - pVector.getX(), this.mY - pVector.getY());
        return newVector;
    };
    Vector.prototype.multiply = function (pScalar) {
        var newVector = new Vector(this.mX * pScalar, this.mY * pScalar);
        return newVector;
    };
    Vector.prototype.divide = function (pScalar) {
        var newVector = new Vector(this.mX / pScalar, this.mY / pScalar);
        return newVector;
    };
    Vector.prototype.magnitude = function () {
        return Math.sqrt(Math.pow(this.mX, 2) + Math.pow(this.mY, 2));
    };
    Vector.prototype.normalise = function () {
        var normal = new Vector(this.mX / this.magnitude(), this.mY / this.magnitude());
        return normal;
    };
    Vector.prototype.limitTo = function (pScalar) {
        var x, y, ratio;
        if (pScalar < this.magnitude()) {
            ratio = pScalar / this.magnitude();
            x = this.mX * ratio;
            y = this.mY * ratio;
        } else {
            x = this.mX;
            y = this.mY;
        }
        return new Vector(x, y);
    };
    Vector.prototype.dotProduct = function (pVector) {
        return (this.mX * pVector.getX()) + (this.mY * pVector.getY());
    };
    Vector.prototype.interpolate = function (pVector, pScalar) {
        var newVector, x, y;
        x = pVector.getX() - this.getX();
        y = pVector.getY() - this.getY();
        x = x + pVector.getX();
        y = y + pVector.getY();
        x = x * pScalar;
        y = y * pScalar;
        newVector = new Vector(x, y);
        return newVector;
    };
    Vector.prototype.rotate = function (pScalar) {
        var x, y, newVector;
        x = Math.cos(pScalar) * this.getX() - Math.sin(pScalar) * this.getY();
        y = Math.sin(pScalar) * this.getX() + Math.cos(pScalar) * this.getY();
        newVector = new Vector(x, y);
        return newVector;
    };
    Vector.prototype.angleBetween = function (pVector) {
        var thisNormal, pVectorNormal, angle;
        thisNormal = this.normalise();
        pVectorNormal = pVector.normalise();
        angle = Math.acos(thisNormal.dotProduct(pVectorNormal));
        return angle;
    };
    Vector.prototype.getX = function () {
        return this.mX;
    };
    Vector.prototype.setX = function (pX) {
        this.mX = pX;
    };
    Vector.prototype.getY = function () {
        return this.mY;
    };
    Vector.prototype.setY = function (pY) {
        this.mY = pY;
    };
    Vector.prototype.getZ = function () {
        return this.mZ;
    };
    Vector.prototype.setZ = function (pZ) {
        this.mZ = pZ;
    };
    return Vector;
}());