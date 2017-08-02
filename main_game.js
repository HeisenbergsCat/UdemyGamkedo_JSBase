/*
 * JS BRICK GAME - GAMEKEDO UDEMY TUTORIAL
 */

var canvas;
var canvasContext;
var Ball = new Ball(10);
var Paddle = new Paddle(10, 100);


//MOUSE MOVEMENT
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
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
            var mousePos = calculateMousePos(evt);
            Paddle.positionX = mousePos.x - (Paddle.width / 2);
        });
}

//MAIN DRAWING LOOP
function drawFrame() {

    drawBackground();
    drawObjects();
    updateMovement();

}

function drawObjects() {

    Ball.draw();
    Paddle.draw();
}

function updateMovement() {

    //checks if the ball is colliding with the edges of the screen
    Ball.boundsCheck();

    //checks if the ball collides with a paddle
    Ball.collisionCheckPaddle(Paddle);

    //updates position of the ball
    Ball.updatePosition();

}

function drawBackground() {

    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}