function brickGrid(startposX, startposY, sizeX, sizeY, collider) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.world = new Array();
    this.brickSize = 50;

    for (var i = 0; i < this.sizeY; i++) {
        this.world[i] = new Array();
    }

    this.gnerateGrid = function() {
        var brickPos = new Vector(startposX, startposY);

        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {

                brickPos.Y = startposY + (this.brickSize * row);
                brickPos.X = startposX + (this.brickSize * col);

                this.world[row][col] = new Brick(brickPos.X, brickPos.Y, "rock");
            }
            brickPos.X = startposX;
        }
    }

    this.checkGridCollisions = function(collider) {

        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {
                var currentBrick = this.world[row][col];

                //TODO: Make the ball bounce of sides of bricks
                if (currentBrick.collisionCheck(collider)) {
                    collider.speed.Y = -collider.speed.Y;
                    currentBrick.alive = false;
                }
            }
        }
    }

    this.mouseHoverCheck = function(mouseX, mouseY) {
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {
                if (mouseX == col && mouseY == row) {
                    this.world[row][col].alive = false;
                }
            }

        }
    }

    this.renderGrid = function() {
        for (var row = 0; row < this.sizeY; row++) {
            for (var col = 0; col < this.sizeX; col++) {

                this.world[row][col].render();
                showText(row + ", " + col, this.world[row][col].pos.X + 5, this.world[row][col].pos.Y + 5, "white");
            }
        }

    }
}