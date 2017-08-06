/*
 * JS BRICK GAME - GAMEKEDO UDEMY TUTORIAL
 */
var canvas;
var canvasContext;
var Ball = new Ball(10);
var Paddle = new Paddle(20, 150);
var mouseX;
var mouseY;
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
    Paddle.setup();
    Ball.setup();

    // INPUT HANDLING
    canvas.addEventListener('mousemove',
        function(evt) {
            calculateMousePos(evt);
            Paddle.pos.X = mouseX - (Paddle.width / 2);
        });

    World = new brickGrid(20, 20, 10, 10);
    World.gnerateGrid();

}

//MAIN DRAWING LOOP
function drawFrame() {

    drawBackground();
    drawObjects();
    updateMovement();

    if (mouseY < 10) {
        showText(mouseX + "," + mouseY, mouseX, mouseY + 30, "white");
    } else if (mouseX > canvas.width - 10) {
        showText(mouseX + "," + mouseY, mouseX - 40, mouseY, "white");
    } else {
        showText(mouseX + "," + mouseY, mouseX, mouseY, "white");
    }
}

function drawObjects() {

    World.renderGrid();
    Ball.render();
    Paddle.render();
}

function updateMovement() {

    //checks if the ball is colliding with the edges of the screen
    Ball.boundsCheck();

    //checks if the ball collides with a paddle
    Ball.bouncePaddle(Paddle);

    //updates position of the ball
    Ball.updatePosition();

}

function drawBackground() {

    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}