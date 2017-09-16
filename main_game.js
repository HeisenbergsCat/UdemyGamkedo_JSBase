//html
var canvas, canvasContext;

//game elements
var PlayerA = new Player(1);
var World, Pal;
const COUNT_DELAY = 2600;

window.onload = function() {
    canvas = document.getElementById("GameCanvas");
    canvasContext = canvas.getContext("2d");

    drawRectangle(0, 0, canvas.width, canvas.height, "black", "fill")
    showText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, "white");

    imagesLoad();
}

function gameSetup() {

    var frameRate = 1000 / 30;
    setInterval(drawFrame, frameRate);

    inputSetup();
    PlayerA.reset(PLAYER_START.X, PLAYER_START.Y);

    //PALETTE GRID GENERATION
    Pal = new Palette(0, 600 - GBRICK_SIZE);
    Pal.generatePalGrid();

    //WORLD GRID GENERATION
    World = new Tilemap(0, 0, WORLD_COLS, WORLD_ROWS);
    World.loadLevel(World.levelOne);
}

function disableInput() {
    inputEnabled = false;
}

function drawBackground() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function renderMousePos() {
    showText(mouseGridX + ", " + mouseGridY, mouseX, mouseY, "white")
}

function updateMovement() {
    PlayerA.updatePosition();
}

//MAIN DRAWING LOOP
function drawFrame() {
    drawObjects();
    updateMovement();
}

function drawObjects() {
    drawBackground();
    Pal.switchType(mouseClicked, mouseGridX, mouseGridY);
    Pal.renderPalGrid();
    Pal.renderPalCursor(mouseGridX, mouseGridY);

    World.paintBricks(activeType, mouseClicked, mouseGridX, mouseGridY, WORLD_ROWS)
    World.renderGrid();
    World.renderCursor(mouseGridX, mouseGridY, WORLD_ROWS);

    PlayerA.render();
    renderMousePos();

}