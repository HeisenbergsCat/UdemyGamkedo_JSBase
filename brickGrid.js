function brickGrid(startposX, startposY, sizeX, sizeY) {
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

                brickPos.Y = startposY + (this.brickSize + 10) * row;
                brickPos.X = startposX + (this.brickSize + 10) * col;

                this.world[row][col] = new Brick(brickPos.X, brickPos.Y, "rock");
                var currentBrick = this.world[row][col];

                console.log(brickPos.Y);
            }
            brickPos.X = startposX;
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