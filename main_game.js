var canvas;
var canvasContext;
//game elements
var Car = new Car(10);
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
//keyboard input handling
var currentKeyPressed;

const WORLD_ROWS = 14
const WORLD_COLS = 20

const SPACE = 32;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

var gasPressed = false;
var reversePressed = false;
var rightPressed = false;
var leftPressed = false;
var brakesPressed = false;

//IMAGES
var carPic = document.createElement("img");
var carPicLoaded = false;

//MOUSE MOVEMENT
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    mouseGridX = Math.floor(mouseX / 40);
    mouseGridY = Math.floor(mouseY / 40);
}

function keyPressed(evt) {
    currentKey = evt.keyCode;
    if (currentKey == KEY_UP_ARROW) {
        gasPressed = true;
    }
    if (currentKey == KEY_DOWN_ARROW) {
        reversePressed = true;
    }
    if (currentKey == KEY_RIGHT_ARROW) {
        rightPressed = true;
    }
    if (currentKey == KEY_LEFT_ARROW) {
        leftPressed = true;
    }
    if (currentKey == SPACE) {
        brakesPressed = true;
    }
}

function keyReleased(evt) {
    currentKey = evt.keyCode;
    if (currentKey == KEY_UP_ARROW) {
        gasPressed = false;
    }
    if (currentKey == KEY_DOWN_ARROW) {
        reversePressed = false;
    }
    if (currentKey == KEY_RIGHT_ARROW) {
        rightPressed = false;
    }
    if (currentKey == KEY_LEFT_ARROW) {
        leftPressed = false;
    }
    if (currentKey == SPACE) {
        brakesPressed = false;
    }
}

window.onload = function() {

    // CANVAS SETUP
    canvas = document.getElementById("GameCanvas");
    canvasContext = canvas.getContext("2d");
    var frameRate = 1000 / 30;
    setInterval(drawFrame, frameRate);

    // INPUT HANDLING

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

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

    carPic.onload = function() {
        carPicLoaded = true;
    }
    carPic.src = "images/player1car.png";

    //GAME OBJECT INITAL SETUP
    Car.reset(2, 4);
    //PALETTE GRID GENERATION
    Pal = new Palette(0, 600 - 40);
    Pal.generatePalGrid();
    //WORLD GRID GENERATION
    World = new brickGrid(0, 0, WORLD_COLS, WORLD_ROWS);
    World.gnerateGrid();
}

function updateMovement() {

    //handles brick grid collision
    World.mainGridLoop(Car, mouseGridX, mouseGridY, mouseClicked);

    //updates position of the ball
    Car.updatePosition();
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

    Car.render();
    renderMousePos();
}

function drawBackground() {

    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function renderMousePos() {
    showText(mouseGridX + ", " + mouseGridY, mouseX, mouseY, "white")
}