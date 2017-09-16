//grid definitions
const WORLD_ROWS = 14
const WORLD_COLS = 20
const GTILE_SIZE = 40

//BRICK GRID CONSTRUCTOR FUNCTION
function Tilemap(startposX, startposY, sizeX, sizeY, collider) {
    this.tileSize = GTILE_SIZE;
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    //world stores array of actual tile objects
    this.world = new Array();
    //currentLevel stores data for tile types
    this.currentLevel = new Array();
    //for level cycling
    this.levelCounter = 1;
    this.levelSet = [this.levelOne, this.levelTwo, this.levelThree];

    this.levelOne = {
        name: "Level One",
        data: [
            [6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 13, 13],
            [2, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 13, 13],
            [2, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 3, 5],
            [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 0, 0, 0, 0, 0, 1],
            [6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 6, 3, 11, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 10, 4, 4, 4, 4, 7],
            [2, 0, 0, 0, 10, 4, 9, 0, 0, 0, 1, 2, 0, 0, 12, 3, 3, 3, 3, 5],
            [2, 0, 0, 0, 12, 3, 11, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 12],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 8, 4, 4, 9, 0, 0, 0, 0, 0],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 13, 13, 13, 2, 0, 0, 0, 0, 10],
            [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 13, 13, 13, 8, 4, 4, 4, 4, 7]
        ]
    }

    this.levelTwo = {
        name: "Level Two",
        data: [
            [6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 13, 13],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 13, 13],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 3, 5],
            [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 0, 0, 0, 0, 0, 1],
            [6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 6, 3, 11, 0, 0, 0, 14, 14, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 10, 4, 4, 4, 4, 7],
            [2, 0, 0, 0, 10, 4, 9, 0, 0, 0, 1, 2, 0, 0, 12, 3, 3, 3, 3, 5],
            [2, 0, 0, 0, 12, 3, 11, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 12],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 8, 4, 4, 9, 0, 0, 0, 0, 0],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 13, 13, 13, 2, 0, 0, 0, 0, 10],
            [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 13, 13, 13, 8, 4, 4, 4, 4, 7]
        ]
    }

    this.levelThree = {
        name: "Level Three",
        data: [
            [6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 13, 13],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 13, 13],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 3, 5],
            [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 0, 0, 0, 0, 0, 1],
            [6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 6, 3, 11, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 10, 4, 4, 4, 4, 7],
            [2, 0, 0, 0, 10, 4, 9, 0, 0, 0, 1, 2, 0, 0, 12, 3, 3, 3, 3, 5],
            [2, 0, 0, 0, 12, 3, 11, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 12],
            [0, 0, 0, 0, 0, 0, 14, 14, 0, 0, 1, 8, 4, 4, 9, 0, 0, 0, 0, 0],
            [9, 0, 0, 0, 0, 0, 14, 14, 0, 0, 1, 13, 13, 13, 2, 0, 0, 0, 0, 10],
            [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 13, 13, 13, 8, 4, 4, 4, 4, 7]
        ]
    }

    //initialization of two dimensional array
    for (var i = 0; i < this.sizeY; i++) {
        this.world[i] = new Array();
        this.currentLevel[i] = new Array();
    }

    this.loadLevel = function(whichLevel) {
        this.currentLevel = whichLevel.data;
        this.gnerateGrid();
        console.log(whichLevel.name + " LOADED")
    }

    this.cycleLevels = function() {

        this.loadLevel(this.levelSet[this.levelCounter])
        this.levelCounter += 1;
        if (this.levelCounter >= this.levelSet.length) {
            this.levelCounter = 0;
        }
    }

    /*
     * MAIN TILEMAP GENERATION
     * Gets tile type from Current Level
     * Creates a tile (brick) object in position computed from row and column index
     * Sets the tile type
     */
    this.gnerateGrid = function() {
        var tilePos = new Vector(startposX, startposY);

        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {
                //gets tile type from current level loaded
                var type = this.currentLevel[row][col];
                //sets next brick positions in columns and rows
                tilePos.Y = startposY + (this.tileSize * row);
                tilePos.X = startposX + (this.tileSize * col);
                //creates brick object at current column and row
                this.world[row][col] = new Brick(tilePos.X, tilePos.Y, type);
                this.world[row][col].switchType(type);
            }
            //sets back column index to 0
            tilePos.X = startposX;
        }
    }

    /*
     * Main tile painting function
     * Switches type of a tile under mouse cursor when clicked
     * activeType set in pallete.js
     */
    this.paintBricks = function(activeType, clicked, mouseGridX, mouseGridY, yBound) {
        if (mouseGridY < yBound) {
            var currentTile = this.world[mouseGridY][mouseGridX];
            if (clicked == 1) {
                this.currentLevel[mouseGridY][mouseGridX] = activeType;
                currentTile.tileType = this.currentLevel[mouseGridY][mouseGridX];;
                currentTile.switchType();
            }
        }
    }

    this.renderCursor = function(mouseGridX, mouseGridY, yBound) {
        if (mouseGridY < yBound) {
            var currentTile = this.world[mouseGridY][mouseGridX];
            drawRectangle(currentTile.pos.X, currentTile.pos.Y,
                currentTile.BRICK_SIDE, currentTile.BRICK_SIDE, "white", "stroke");
        }
    }

    this.renderGrid = function(row, col) {
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {
                this.world[row][col].render();
                //debug
                //showText(row + ", " + col, this.world[row][col].pos.X + 5, this.world[row][col].pos.Y + 5, "white");
            }
        }
    }

    //helpers to be used later (or not)

    this.displayPoints = function() {
        showText("POINTS: " + this.points, 15, 15, "white");
    }

    this.displayLevel = function() {
        showText("LEVEL: " + this.level, 200, 15, "white");
    }

    //hit the brick with mouse cursor, for testing purposes
    this.mouseHoverCheck = function(mouseGridX, mouseGridY, row, col) {
        return (mouseGridX == col && mouseGridY == row);
    }

}