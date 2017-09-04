//html
var canvas, canvasContext;

//game elements
var Car, World, Pal;

var carPicLoaded = false;

//TEXTURES
//TODO - make it more reasonable
var carPic = document.createElement("img");

var asphA = document.createElement("img");
var grassA = document.createElement("img");

var curb_R = document.createElement("img");
var curb_L = document.createElement("img");
var curb_T = document.createElement("img");
var curb_B = document.createElement("img");

var corner_TR = document.createElement("img");
var corner_TL = document.createElement("img");
var corner_BR = document.createElement("img");
var corner_BL = document.createElement("img");

var cornerB_TR = document.createElement("img");
var cornerB_TL = document.createElement("img");
var cornerB_BR = document.createElement("img");
var cornerB_BL = document.createElement("img");

window.onload = function() {

    // CANVAS SETUP
    canvas = document.getElementById("GameCanvas");
    canvasContext = canvas.getContext("2d");
    var frameRate = 1000 / 30;
    setInterval(drawFrame, frameRate);

    //DATA LOAD
    carPic.src = "images/player1car.png";

    asphA.src = "images/aspha.png"
    grassA.src = "images/grassA.png"

    curb_R.src = "images/curb_R.png"
    curb_L.src = "images/curb_L.png"
    curb_B.src = "images/curb_B.png"
    curb_T.src = "images/curb_T.png"

    corner_TR.src = "images/corner_TR.png"
    corner_TL.src = "images/corner_TL.png"
    corner_BR.src = "images/corner_BR.png"
    corner_BL.src = "images/corner_BL.png"

    cornerB_TR.src = "images/cornerB_TR.png"
    cornerB_TL.src = "images/cornerB_TL.png"
    cornerB_BR.src = "images/cornerB_BR.png"
    cornerB_BL.src = "images/cornerB_BL.png"

    carPic.onload = function() {
        carPicLoaded = true;
    }

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

    //GAME OBJECT INITAL SETUP
    Car = new Car();
    Car.reset(CAR_START.X, CAR_START.Y);

    //PALETTE GRID GENERATION
    Pal = new Palette(0, 600 - GBRICK_SIZE);
    Pal.generatePalGrid();

    //WORLD GRID GENERATION
    World = new brickGrid(0, 0, WORLD_COLS, WORLD_ROWS);
    World.gnerateGrid();
}

function updateMovement() {
    World.mainGridLoop(Car, mouseGridX, mouseGridY, mouseClicked);
    Car.updatePosition();
}

//MAIN DRAWING LOOP
function drawFrame() {
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