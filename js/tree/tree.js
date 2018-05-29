/*global Matrix, Branch, SceneGraphNode, Vector, alert, Foliage*/
var Tree = (function () {
    function Tree(pTranslateVector, pRotateScalar, pScaleVector, random, depth) {
        this.random = random;
        this.initialBranchAngle = this.random.getNextBetween(-20, 20);
        this.depth = depth;
        this.positionVector = pTranslateVector;
        this.setTranslation(pTranslateVector);
        this.rotationScalar = pRotateScalar;
        this.setRotation(pRotateScalar);
        this.scaleVector = pScaleVector;
        this.setScale(pScaleVector);
        this.setUpChildren();
    }
    //setup initial scene graph for tree and begin to add branches
    Tree.prototype.setUpChildren = function () {
        var rotationValue = this.initialBranchAngle * Math.PI / 180,
            endX = this.random.getNextBetween(-5, 5),
            endY = this.random.getNextBetween(15, 30),
            trunkBranch = new Branch(endX, endY, this.depth, "#442508"),
            trunkEnd = trunkBranch.getEndPointVector(),
            trunkEndTranslate = new SceneGraphNode(Matrix.createTranslation(trunkEnd));
        this.rootNode = new SceneGraphNode(Matrix.createIdentity());
        this.translationNode = new SceneGraphNode(this.translation);
        this.rotationNode = new SceneGraphNode(this.rotation);
        this.scaleNode = new SceneGraphNode(this.scale);
        this.rootNode.addChild(this.translationNode);
        this.translationNode.addChild(this.rotationNode);
        this.rotationNode.addChild(this.scaleNode);

        this.scaleNode.addChild(trunkEndTranslate);
        this.scaleNode.addChild(trunkBranch);
        this.populateTree(trunkEndTranslate, 0, 0, rotationValue, this.depth);
    };
    //add a single branch to a specific scenegraph node 
    //include a branchwidth, maximum length that the branch should be, 
    //and a colour for the branch
    Tree.prototype.addBranchTo = function (node, branchWidth, maxLength, colour) {
        var endX = 0,
            endY = this.random.getNextBetween(maxLength * 0.65, maxLength),
            branch = new Branch(endX, endY, branchWidth, colour);
        node.addChild(branch);
        return new Vector(endX, endY);
    };
    //The recursive function that adds branches to the tree for some depth.
    //each call requires a new node to add itself to, start position, 
    //rotation in radians, and a branch depth
    Tree.prototype.populateTree = function (node, startX, startY, rotation, depth) {
        var nextVectorCoords,
            translate,
            rotate,
            nextRotationLeft,
            nextRotationRight,
            branchColour;
        if (depth > 0) {
            translate = new SceneGraphNode(Matrix.createTranslation(new Vector(startX,
                                                                               startY)));
            rotate = new SceneGraphNode(Matrix.createRotation(rotation));
            node.addChild(translate);
            translate.addChild(rotate);
            if (depth < this.depth / 2) {
                branchColour = "#339933"; // green for outer branches (foliage)
            } else {
                branchColour = "#442508"; //brown for branches with least depth
            }
            nextVectorCoords = this.addBranchTo(rotate, depth * 0.8,
                                                depth * 5, branchColour);

            //The addition here stops the branch from curling back on itself too much
            nextRotationLeft = (rotation - 0.5) + (depth * 2) * Math.PI / 180;
            //the subtraciton here stop the branch curling back on itself too much
            nextRotationRight = (rotation + 0.5) - (depth * 2) * Math.PI / 180;
            this.populateTree(rotate, nextVectorCoords.getX(),
                              nextVectorCoords.getY(),
                              nextRotationLeft, depth - 1);

            this.populateTree(rotate, nextVectorCoords.getX(),
                              nextVectorCoords.getY(),
                              nextRotationRight, depth - 1);
        }
    };
    Tree.prototype.draw = function (pContext) {
        pContext.save();
        this.rootNode.draw(pContext, Matrix.createIdentity());
        pContext.restore();
    };
    //scale the root scale node up by a small step
    Tree.prototype.grow = function (deltaTime) {
        if (this.scaleVector.getX() < 1 && this.scaleVector.getY() < 1) {
            this.scaleVector.setX(this.scaleVector.getX() + (0.1 * deltaTime));
            this.scaleVector.setY(this.scaleVector.getY() + (0.1 * deltaTime));
            this.setScale(this.scaleVector);
            this.scaleNode.setTransformationMatrix(this.scale);
        }
    };
    Tree.prototype.update = function (deltaTime) {
        this.grow(deltaTime);
    };
    Tree.prototype.setTranslation = function (pVector) {
        this.translation = Matrix.createTranslation(pVector);
    };
    Tree.prototype.setRotation = function (pScalar) {
        this.rotation = Matrix.createRotation(pScalar);
    };
    Tree.prototype.setScale = function (pVector) {
        this.scale = Matrix.createScale(pVector);
    };
    return Tree;
}());