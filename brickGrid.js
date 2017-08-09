function brickGrid(startposX, startposY, sizeX, sizeY, collider) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.world = new Array();
    this.brickSize = 50;


    //initialization of two dimensional array
    for (var i = 0; i < this.sizeY; i++) {
        this.world[i] = new Array();
    }

    //generates grid of brick objects
    this.gnerateGrid = function() {

        var brickPos = new Vector(startposX, startposY);

        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {

                //generate random brick type
                var randomType = getRandomInt(0, 3);

                brickPos.Y = startposY + (this.brickSize * row);
                brickPos.X = startposX + (this.brickSize * col);
                this.world[row][col] = new Brick(brickPos.X, brickPos.Y, randomType);
            }
            brickPos.X = startposX;
        }
    }

    this.mainGridLoop = function(collider, mouseX, mouseY) {
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {

                //basic collisions
                this.checkGridCollisions(collider, row, col);

                //bricks removed when mouse over them
                //this.mouseHoverCheck(mouseX, mouseY, row, col);

                //brickGrid rendering
                this.renderGrid(row, col);
            }
        }
    }

    this.checkGridCollisions = function(collider, row, col) {
        var currentBrick = this.world[row][col];

        //TODO: Make the ball bounce of sides of bricks
        if (currentBrick.collisionCheck(collider)) {
            collider.speed.Y = -collider.speed.Y;
            currentBrick.takeDamage();
        }
    }

    this.mouseHoverCheck = function(mouseX, mouseY, row, col) {
        var currentBrick = this.world[row][col];

        if (mouseX == col && mouseY == row) {
            currentBrick.takeDamage();

        }
    }

    this.renderGrid = function(row, col) {
        this.world[row][col].render();
        //debug
        //showText(row + ", " + col, this.world[row][col].pos.X + 5, this.world[row][col].pos.Y + 5, "white");

    }
}