function brickGrid(startposX, startposY, sizeX, sizeY, collider) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.world = new Array();
    this.brickSize = 50;

    this.points = 0;
    this.level = 1;


    //initialization of two dimensional array
    for (var i = 0; i < this.sizeY; i++) {
        this.world[i] = new Array();
    }

    //generates grid of brick objects
    this.gnerateGrid = function() {
        var brickPos = new Vector(startposX, startposY);

        //generate main grid
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {

                //sets next brick positions in columns and rows
                brickPos.Y = startposY + (this.brickSize * row);
                brickPos.X = startposX + (this.brickSize * col);

                //creates brick object at current column and row
                this.world[row][col] = new Brick(brickPos.X, brickPos.Y, 1);
                this.world[row][col].alive = true;
            }
            //sets back column index to 0
            brickPos.X = startposX;
        }
    }

    this.paintBricks = function(activeType, clicked, mouseGridX, mouseGridY, yBound) {
        if (mouseGridY < yBound) {
            var currentBrick = this.world[mouseGridY][mouseGridX];
            if (clicked == 1) {
                currentBrick.brickType = activeType;
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

    this.mainGridLoop = function(collider, mouseGridX, mouseGridY, clicked) {
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {

                //check if there's valid brick
                if (this.world[row][col]) {
                    //check collisions
                    this.checkGridCollisions(collider, row, col);
                }
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

    //TODO: Figure out better way to handle collisions
    //checks if the ball hit the brick
    this.checkGridCollisions = function(collider, row, col) {
        var currentBrick = this.world[row][col];

        if (currentBrick.collisionCheck(collider)) {
            //if the car hits the wall, stop the car
            collider.speed.X = 0;
            collider.speed.Y = 0;
        }
    }

    this.displayPoints = function() {
        showText("POINTS: " + this.points, 15, 15, "white");
    }

    this.displayLevel = function() {
        showText("LEVEL: " + this.level, 200, 15, "white");
    }
}