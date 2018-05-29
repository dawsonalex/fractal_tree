var SceneGraphNode = (function () {
    function SceneGraphNode(pMatrix) {
        this.setTransformationMatrix(pMatrix);
        this.children = [];
    }
    SceneGraphNode.prototype.draw = function (pContext, pLastModifiedMatrix) {
        var multipliedMatrix = pLastModifiedMatrix.multiply(this.transform),
            i = 0;
        multipliedMatrix.setTransform(pContext);
        for (i; i < this.getNumberOfChildren(); i += 1) {
            pContext.save();
            this.getChildAt(i).draw(pContext, multipliedMatrix);
            pContext.restore();
        }
    };
    SceneGraphNode.prototype.setContext = function (pContext) {
        this.context = pContext;
    };
    SceneGraphNode.prototype.setTransformationMatrix = function (pMatrix) {
        this.transform = pMatrix;
    };
    SceneGraphNode.prototype.getNumberOfChildren = function () {
        return this.children.length;
    };
    SceneGraphNode.prototype.addChild = function (nodeChild) {
        this.children.push(nodeChild);
    };
    SceneGraphNode.prototype.getChildAt = function (index) {
        return this.children[index];
    };
    return SceneGraphNode;
}());