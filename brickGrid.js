//grid definitions
const WORLD_ROWS = 14
const WORLD_COLS = 20
const GBRICK_SIZE = 40

//BRICK GRID CONSTRUCTOR FUNCTION
function brickGrid(startposX, startposY, sizeX, sizeY, collider) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.world = new Array();
    this.currentLevel = new Array();
    this.brickSize = GBRICK_SIZE;

    this.levelCounter = 1;

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

    //generates grid of brick objects
    this.initTypeGrid = function() {
        var brickPos = new Vector(startposX, startposY);

        //generate main grid
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {
                this.currentLevel[row][col] = 0;
            }
        }
    }

    this.loadLevel = function(whichLevel) {
        disableInput();
        this.currentLevel = whichLevel.data;
        this.gnerateGrid();
        console.log(whichLevel.name + " LOADED")
        countDown(COUNT_DELAY);

    }

    this.cycleLevels = function() {
        var levelSet = [this.levelOne, this.levelTwo, this.levelThree];
        this.loadLevel(levelSet[this.levelCounter])
        this.levelCounter += 1;
        if (this.levelCounter >= levelSet.length) {
            this.levelCounter = 0;
        }
    }

    this.gnerateGrid = function() {
        var brickPos = new Vector(startposX, startposY);

        //generate main grid
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {

                var type = this.currentLevel[row][col];

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
                this.currentLevel[mouseGridY][mouseGridX] = activeType;
                currentBrick.brickType = this.currentLevel[mouseGridY][mouseGridX];;
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

    this.gridCollisionCheck = function(collider, mouseGridX, mouseGridY) {
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
                this.world[row][col].render();
                //debug
                //showText(row + ", " + col, this.world[row][col].pos.X + 5, this.world[row][col].pos.Y + 5, "white");
            }
        }
    }

    this.checkTileCollisions = function(collider, row, col) {
        var currentBrick = this.world[row][col];

        if (currentBrick.collisionCheck(collider)) {
            if (currentBrick.brickType == 14) {
                console.log("WINNER is Player " + collider.player)
                this.cycleLevels();
                CarA.reset(CAR_START.X, CAR_START.Y);
                CarB.reset(CAR_START.X, CAR_START.Y + 1);

            } else {
                collider.pos.X -= Math.cos(collider.rot) * collider.speed;
                collider.pos.Y -= Math.sin(collider.rot) * collider.speed;
                collider.speed *= -0.6;
            }

        }
    }

    this.displayPoints = function() {
        showText("POINTS: " + this.points, 15, 15, "white");
    }

    this.displayLevel = function() {
        showText("LEVEL: " + this.level, 200, 15, "white");
    }
}