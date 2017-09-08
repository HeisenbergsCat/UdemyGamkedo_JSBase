//html
var canvas, canvasContext;

//game elements
var Car, World, Pal;

window.onload = function() {
    canvas = document.getElementById("GameCanvas");
    canvasContext = canvas.getContext("2d");

    drawRectangle(0, 0, canvas.width, canvas.height, "black", "fill")
    showText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, "white");

    imagesLoad();
    // CANVAS SETUP
}

function gameSetup() {

    var frameRate = 1000 / 30;
    setInterval(drawFrame, frameRate);

    inputSetup();

    //GAME OBJECT INITAL SETUP
    Car = new Car();
    Car.reset(CAR_START.X, CAR_START.Y);

    //PALETTE GRID GENERATION
    Pal = new Palette(0, 600 - GBRICK_SIZE);
    Pal.generatePalGrid();

    //WORLD GRID GENERATION
    World = new brickGrid(0, 0, WORLD_COLS, WORLD_ROWS);
    World.initTypeGrid();
    World.loadLevel();
    World.gnerateGrid();
}


function updateMovement() {
    World.gridCollisionCheck(Car, mouseGridX, mouseGridY, mouseClicked);
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