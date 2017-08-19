/*
 * JS BRICK GAME - GAMEKEDO UDEMY TUTORIAL
 */

var canvas;
var canvasContext;
//game elements
var Ball = new Ball(10);
var World;
var Pal;
//mouse position
var mouseX;
var mouseY;
//mose position in grid space
var mouseGridX;
var mouseGridY;
//mouse click handling
var mouseClicked = 0;
var activeType = 1;

var WORLD_ROWS = 14
var WORLD_COLS = 20

//MOUSE MOVEMENT
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    mouseGridX = Math.floor(mouseX / 40);
    mouseGridY = Math.floor(mouseY / 40);
}

window.onload = function() {

    // CANVAS SETUP
    canvas = document.getElementById("GameCanvas");
    canvasContext = canvas.getContext("2d");
    var frameRate = 1000 / 30;
    setInterval(drawFrame, frameRate);

    // INPUT HANDLING
    canvas.addEventListener('mousemove',
        function(evt) {
            calculateMousePos(evt);
        });

    canvas.addEventListener('mousedown', function(evt) {
        mouseClicked = 1;
    });

    canvas.addEventListener('mouseup', function(evt) {
        mouseClicked = 0;
    });

    //GAME OBJECT INITAL SETUP
    Ball.reset();
    //PALETTE GRID GENERATION
    Pal = new Palette(0, 600 - 40);
    Pal.generatePalGrid();
    //WORLD GRID GENERATION
    World = new brickGrid(0, 0, WORLD_COLS, WORLD_ROWS);
    World.gnerateGrid();
}

function updateMovement() {

    //handles brick grid collision
    World.mainGridLoop(Ball, mouseGridX, mouseGridY, mouseClicked);

    //checks if the ball is colliding with the edges of the screen
    Ball.boundsCheck();

    //updates position of the ball
    Ball.updatePosition();
}

//MAIN DRAWING LOOP
function drawFrame() {

    drawBackground();
    drawObjects();
    updateMovement();
}

function drawObjects() {

    Pal.switchType(mouseClicked, mouseGridX, mouseGridY);
    Pal.renderPalGrid();
    Pal.renderPalCursor(mouseGridX, mouseGridY);

    World.paintBricks(activeType, mouseClicked, mouseGridX, mouseGridY, WORLD_ROWS)
    World.renderGrid();
    World.renderCursor(mouseGridX, mouseGridY, WORLD_ROWS);

    Ball.render();
    renderMousePos();
}

function drawBackground() {

    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function renderMousePos() {
    showText(mouseGridX + ", " + mouseGridY, mouseX, mouseY, "white")
}