//game elements
var Car = new Car(10);
var World;
var Pal;

//html
var canvas;
var canvasContext;

//IMAGES
var carPic = document.createElement("img");
var carPicLoaded = false;

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
    Pal = new Palette(0, 600 - GBRICK_SIZE);
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