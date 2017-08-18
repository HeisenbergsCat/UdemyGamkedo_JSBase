function brickGrid(startposX, startposY, sizeX, sizeY, collider) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.world = new Array();
    this.bricksLeft = 0;
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

                //generate random brick type
                var randomType = getRandomInt(0, 3);

                //sets next brick positions in columns and rows
                brickPos.Y = startposY + (this.brickSize * row);
                brickPos.X = startposX + (this.brickSize * col);

                //creates brick object at current column and row
                this.world[row][col] = new Brick(brickPos.X, brickPos.Y, randomType);
                this.bricksLeft++;
            }
            //sets back column index to 0
            brickPos.X = startposX;
        }
    }

    this.mainGridLoop = function(collider, mouseX, mouseY) {
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {

                //check if there's valid brick
                if (this.world[row][col]) {

                    //check collisions
                    this.checkGridCollisions(collider, row, col);

                    //bricks removed when mouse over them
                    //this.mouseHoverCheck(mouseX, mouseY, row, col);

                    //brickGrid rendering
                    this.renderGrid(row, col);
                }
            }
        }
    }

    //kills brick if hitpoints are 0, decrements number of total bricks
    this.killBrick = function(currentBrick) {
        if (currentBrick.hitpoints <= 0) {
            currentBrick.alive = false;
            this.points += 10 * (currentBrick.type + 1)
            if (currentBrick.alive == false) {
                this.bricksLeft--;
            }
        }
    }

    //goes to next "level"
    this.worldReset = function(collider) {
        if (this.bricksLeft == 0) {
            collider.reset();
            this.gnerateGrid();
            this.level++;
        }
    }

    //checks if the ball hit the brick
    //TODO: If moved to a ball object it could be much more effiecient
    this.checkGridCollisions = function(collider, row, col) {
        var currentBrick = this.world[row][col];

        //TODO: Make the collisions more realistic
        if (currentBrick.collisionCheck(collider)) {

            //DAMAGE
            currentBrick.takeDamage();
            this.killBrick(currentBrick);
            //BALL BOUNCING

            //computes current ball position expressed in columns and rows
            var ballCol = Math.floor(collider.pos.X / this.brickSize);
            var ballRow = Math.floor(collider.pos.Y / this.brickSize);

            //gets previous ball position in pixels (returns vector)
            var prevBall = collider.getPrevPosition();

            //compute previous ball position in columns and rows
            var prevBallCol = Math.floor(prevBall.X / this.brickSize);
            var prevBallRow = Math.floor(prevBall.Y / this.brickSize);

            //if the ball stays in the same row it means it comes from the side, so bounce X
            if (ballCol != prevBallCol) {
                collider.speed.X = -collider.speed.X;
            }
            //if the ball stays in the same column it means it comes from the top or bottom, so bounce Y
            if (ballRow != prevBallRow) {
                collider.speed.Y = -collider.speed.Y;
            }
        }
    }

    //hit the brick with mouse cursor, for testing purposes
    this.mouseHoverCheck = function(mouseX, mouseY, row, col) {
        var currentBrick = this.world[row][col];

        if (currentBrick.alive == true) {

            if (mouseX == col && mouseY == row) {
                currentBrick.takeDamage();
                this.killBrick(currentBrick);
            }
        }
    }

    //render single brick
    this.renderGrid = function(row, col) {
        this.world[row][col].render();
        //debug
        //showText(row + ", " + col, this.world[row][col].pos.X + 5, this.world[row][col].pos.Y + 5, "white");
    }

    this.displayPoints = function() {
        showText("POINTS: " + this.points, 15, 15, "white");
    }

    this.displayLevel = function() {
        showText("LEVEL: " + this.level, 200, 15, "white");
    }
}