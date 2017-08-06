function brickGrid(startposX, startposY, sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.world = new Array();

    /*
    for (var i = 0; i < this.sizeY - 1; i++) {
        this.world[i] = new Array();
    }
    */

    this.gnerateGrid = function() {
        var brickPos = new Vector(startposX, startposY);

        for (var row = 0; row < this.sizeY; row++) {
            this.world[row] = new Brick(brickPos.X, brickPos.Y, "rock");
            brickPos.X += this.world[row].getSize() + 10;
        }
    }

    this.renderGrid = function() {

        for (var row = 0; row < this.sizeY; row++) {
            this.world[row].render();
        }

    }
}