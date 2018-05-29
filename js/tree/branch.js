/*global Matrix, Vector*/
var Branch = (function () {
    function Branch(endX, endY, branchWidth, colour) {
        this.endX = endX;
        this.endY = endY;
        this.branchWidth = branchWidth;
        this.colour = colour;
    }
    Branch.prototype.draw = function (pContext) {
        pContext.beginPath();
        pContext.moveTo(0, 0);
        pContext.lineWidth = this.branchWidth;
        pContext.strokeStyle = this.colour;
        pContext.lineTo(this.endX, this.endY);
        pContext.stroke();
    };
    //return a vector representing the end point for this branch
    Branch.prototype.getEndPointVector = function () {
        return new Vector(this.endX, this.endY, 1);
    };
    return Branch;
}());