/*global Vector*/
var Matrix = (function () {
    function Matrix(x1, x2, x3, y1, y2, y3, z1, z2, z3) {
        this.elements = [
            [x1, x2, x3],
            [y1, y2, y3],
            [z1, z2, z3]
        ];
    }
    Matrix.prototype.getElement = function (row, column) {
        return this.elements[row][column];
    };
    Matrix.prototype.setElement = function (row, column, value) {
        this.elements[row][column] = value;
    };
    Matrix.createIdentity = function () {
        return new Matrix(1, 0, 0,
                          0, 1, 0,
                          0, 0, 1);
    };
    Matrix.createTranslation = function (pVector) {
        return new Matrix(1, 0, pVector.getX(),
                          0, 1, pVector.getY(),
                          0, 0, 1);
    };
    Matrix.createScale = function (pVector) {
        return new Matrix(pVector.getX(), 0, 0,
                          0, pVector.getY(), 0,
                          0, 0, 1);
    };
    Matrix.createRotation = function (pScalar) {
        return new Matrix(Math.cos(pScalar), -Math.sin(pScalar), 0,
                          Math.sin(pScalar), Math.cos(pScalar), 0,
                          0, 0, 1);
    };
    Matrix.prototype.multiply = function (pMatrix) {
        var newMatrix = Matrix.createIdentity(),
            newElement = 0;

        newElement = (this.getElement(0, 0) * pMatrix.getElement(0, 0)) +
                     (this.getElement(0, 1) * pMatrix.getElement(1, 0)) +
                     (this.getElement(0, 2) * pMatrix.getElement(2, 0));
        newMatrix.setElement(0, 0, newElement);

        newElement = (this.getElement(0, 0) * pMatrix.getElement(0, 1)) +
                     (this.getElement(0, 1) * pMatrix.getElement(1, 1)) +
                     (this.getElement(0, 2) * pMatrix.getElement(2, 1));
        newMatrix.setElement(0, 1, newElement);

        newElement = (this.getElement(0, 0) * pMatrix.getElement(0, 2)) +
                     (this.getElement(0, 1) * pMatrix.getElement(1, 2)) +
                     (this.getElement(0, 2) * pMatrix.getElement(2, 2));
        newMatrix.setElement(0, 2, newElement);

        newElement = (this.getElement(1, 0) * pMatrix.getElement(0, 0)) +
                     (this.getElement(1, 1) * pMatrix.getElement(1, 0)) +
                     (this.getElement(1, 2) * pMatrix.getElement(2, 0));
        newMatrix.setElement(1, 0, newElement);

        newElement = (this.getElement(1, 0) * pMatrix.getElement(0, 1)) +
                     (this.getElement(1, 1) * pMatrix.getElement(1, 1)) +
                     (this.getElement(1, 2) * pMatrix.getElement(2, 1));
        newMatrix.setElement(1, 1, newElement);

        newElement = (this.getElement(1, 0) * pMatrix.getElement(0, 2)) +
                     (this.getElement(1, 1) * pMatrix.getElement(1, 2)) +
                     (this.getElement(1, 2) * pMatrix.getElement(2, 2));
        newMatrix.setElement(1, 2, newElement);

        newElement = (this.getElement(2, 0) * pMatrix.getElement(0, 0)) +
                     (this.getElement(2, 1) * pMatrix.getElement(1, 0)) +
                     (this.getElement(2, 2) * pMatrix.getElement(2, 0));
        newMatrix.setElement(2, 0, newElement);

        newElement = (this.getElement(2, 0) * pMatrix.getElement(0, 1)) +
                     (this.getElement(2, 1) * pMatrix.getElement(1, 1)) +
                     (this.getElement(2, 2) * pMatrix.getElement(2, 1));
        newMatrix.setElement(2, 1, newElement);

        newElement = (this.getElement(2, 0) * pMatrix.getElement(0, 2)) +
                     (this.getElement(2, 1) * pMatrix.getElement(1, 2)) +
                     (this.getElement(2, 2) * pMatrix.getElement(2, 2));
        newMatrix.setElement(2, 2, newElement);

        return newMatrix;
    };
    Matrix.prototype.multiplyVector = function (pVector) {
        var x = ((this.getElement(0, 0) * pVector.getX()) +
                 (this.getElement(0, 1) * pVector.getY()) +
                 (this.getElement(0, 2) * pVector.getZ())),
            y = ((this.getElement(1, 0) * pVector.getX()) +
                 (this.getElement(1, 1) * pVector.getY()) +
                 (this.getElement(1, 2) * pVector.getZ())),
            resultVector = new Vector(x, y, 1);
        return resultVector;
    };
    Matrix.prototype.setTransform = function (pContext) {
        pContext.setTransform(this.getElement(0, 0),
                              this.getElement(1, 0),
                              this.getElement(0, 1),
                              this.getElement(1, 1),
                              this.getElement(0, 2),
                              this.getElement(1, 2));
    };
    Matrix.prototype.transform = function (pContext) {
        pContext.transform(this.getElement(0, 0),
                           this.getElement(1, 0),
                           this.getElement(0, 1),
                           this.getElement(1, 1),
                           this.getElement(0, 2),
                           this.getElement(1, 2));
    };
    return Matrix;
}());