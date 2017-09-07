//grid definitions
const WORLD_ROWS = 14
const WORLD_COLS = 20
const GBRICK_SIZE = 40

//BRICK GRID CONSTRUCTOR FUNCTION
function brickGrid(startposX, startposY, sizeX, sizeY, collider) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.world = new Array();
    this.tileTypes = new Array();
    this.brickSize = GBRICK_SIZE;

    //initialization of two dimensional array
    for (var i = 0; i < this.sizeY; i++) {
        this.world[i] = new Array();
        this.tileTypes[i] = new Array();
    }

    //generates grid of brick objects
    this.initTypeGrid = function() {
        var brickPos = new Vector(startposX, startposY);

        //generate main grid
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {
                this.tileTypes[row][col] = 0;
            }
        }
    }

    this.loadLevel = function() {
        this.tileTypes = [
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }

    this.gnerateGrid = function() {
        var brickPos = new Vector(startposX, startposY);

        //generate main grid
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {

                var type = this.tileTypes[row][col];

                //sets next brick positions in columns and rows
                brickPos.Y = startposY + (this.brickSize * row);
                brickPos.X = startposX + (this.brickSize * col);

                //creates brick object at current column and row
                this.world[row][col] = new Brick(brickPos.X, brickPos.Y, type);
                this.world[row][col].switchType(type);
            }
            //sets back column index to 0
            brickPos.X = startposX;
        }
    }

    this.paintBricks = function(activeType, clicked, mouseGridX, mouseGridY, yBound) {
        if (mouseGridY < yBound) {
            var currentBrick = this.world[mouseGridY][mouseGridX];
            if (clicked == 1) {
                this.tileTypes[mouseGridY][mouseGridX] = activeType;
                currentBrick.brickType = this.tileTypes[mouseGridY][mouseGridX];;
                currentBrick.switchType();
            }
        }
    }

    this.renderCursor = function(mouseGridX, mouseGridY, yBound) {
        if (mouseGridY < yBound) {
            var currentBrick = this.world[mouseGridY][mouseGridX];
            drawRectangle(currentBrick.pos.X, currentBrick.pos.Y,
                currentBrick.BRICK_SIDE, currentBrick.BRICK_SIDE, "white", "stroke");
        }
    }

    this.gridCollisionCheck = function(collider, mouseGridX, mouseGridY, clicked) {
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {
                //check collisions
                this.checkTileCollisions(collider, row, col);
            }
        }
    }

    //hit the brick with mouse cursor, for testing purposes
    this.mouseHoverCheck = function(mouseGridX, mouseGridY, row, col) {
        return (mouseGridX == col && mouseGridY == row);
    }

    //render single brick
    this.renderGrid = function(row, col) {
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {
                this.world[row][col].render(1);
                //debug
                //showText(row + ", " + col, this.world[row][col].pos.X + 5, this.world[row][col].pos.Y + 5, "white");
            }
        }
    }

    this.checkTileCollisions = function(collider, row, col) {
        var currentBrick = this.world[row][col];

        if (currentBrick.collisionCheck(collider)) {
            //if the car hits the wall, stop the car
            collider.pos.X -= Math.cos(collider.rot) * collider.speed;
            collider.pos.Y -= Math.sin(collider.rot) * collider.speed;
            collider.speed *= -0.4;
        }
    }

    this.displayPoints = function() {
        showText("POINTS: " + this.points, 15, 15, "white");
    }

    this.displayLevel = function() {
        showText("LEVEL: " + this.level, 200, 15, "white");
    }
}