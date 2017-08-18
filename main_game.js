/*
 * JS BRICK GAME - GAMEKEDO UDEMY TUTORIAL
 */
var canvas;
var canvasContext;
var Ball = new Ball(10);
var mouseX;
var mouseY;

var mouseGridX;
var mouseGridY;
var World;

//MOUSE MOVEMENT
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

window.onload = function() {

    // CANVAS SETUP
    canvas = document.getElementById("GameCanvas");
    canvasContext = canvas.getContext("2d");
    var frameRate = 1000 / 30;
    setInterval(drawFrame, frameRate);

    //GAME OBJECT INITAL SETUP
    Ball.reset();

    // INPUT HANDLING
    canvas.addEventListener('mousemove',
        function(evt) {
            calculateMousePos(evt);
            //Paddle.pos.X = mouseX - (Paddle.width / 2);
        });

    World = new brickGrid(0, 0, 16, 12);
    World.gnerateGrid();

}

//MAIN DRAWING LOOP
function drawFrame() {

    drawBackground();
    drawObjects();
    updateMovement();

    mouseGridX = Math.floor(mouseX / 50);
    mouseGridY = Math.floor(mouseY / 50);

    if (mouseY < 10) {
        showText(mouseX + "," + mouseY, mouseX, mouseY + 30, "white");
    } else if (mouseX > canvas.width - 10) {
        showText(mouseX + "," + mouseY, mouseX - 40, mouseY, "white");
    } else {
        showText(mouseGridX + "," + mouseGridY, mouseX, mouseY, "white");
    }
}

function drawObjects() {

    Ball.render();
}

function updateMovement() {

    //handles brick grid collision check, rendering, mousehover etc. in one loop
    World.mainGridLoop(Ball, mouseGridX, mouseGridY);
    World.worldReset(Ball);

    //checks if the ball is colliding with the edges of the screen
    Ball.boundsCheck();

    //updates position of the ball
    Ball.updatePosition();

}

function drawBackground() {

    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}