/*global window, document, alert, Vector, SceneGraphNode, Random, Tree*/
/*jslint bitwise: true*/

//submit button event handler
function beginTreeGeneration(seed, depth) {
    var mainCanvas, mainContext, lastTimeMillis = 0, currentTimeMillis, tree, random;

    function initialiseCanvasContext() {
        mainCanvas = document.getElementById('canvas');
        if (!mainCanvas) { //alert the user if the canvas cannot be found
            alert('Error: I cannot find the canvas element!');
            return;
        }
        mainContext = mainCanvas.getContext('2d');
        if (!mainContext) {
            alert('Error: failed to get canvas context!');
            return;
        }
        mainContext.fillStyle = "#000000";
        mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
    }
    function setUpTree() {
        random = new Random(seed);
        tree = new Tree(new Vector(mainCanvas.width / 2, mainCanvas.height),
                        Math.PI, new Vector(0, 0, 1), random, depth);
        lastTimeMillis = Date.now();
    }
    function update(deltaTime) {
        tree.update(deltaTime);
    }
    function draw() {
        mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        mainContext.fillStyle = "#000000";
        mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
        mainContext.save();
        tree.draw(mainContext);
        mainContext.restore();
    }
    function animationLoop() {
        var deltaTimeSeconds;
        currentTimeMillis = Date.now();
        deltaTimeSeconds = (currentTimeMillis - lastTimeMillis) / 1000.0;
        update(deltaTimeSeconds);
        draw();
        lastTimeMillis = currentTimeMillis;
        window.requestAnimationFrame(animationLoop);
    }
    initialiseCanvasContext();
    setUpTree();
    animationLoop();
}

function onLoad() {
    function generateSeed() {
        var textBox = document.getElementById("seedInput"),
            seedString = textBox.value,
            slider = document.getElementById("depthSlider"),
            depth = slider.value,
            i = 0,
            seed = 0,
            char = 0;
        for (i; i < seedString.length; i += 1) {
            char = seedString.charCodeAt(i);
            seed = ((seed << 5) - seed) + char;
            seed = seed & seed;
        }
        beginTreeGeneration(seed, depth);
    }
    document.getElementById("seedButton").addEventListener("click", generateSeed, false);
}

window.addEventListener('load', onLoad, false);