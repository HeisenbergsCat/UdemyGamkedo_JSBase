function Palette(posx, posy) {
    this.startposX = posx;
    this.startposY = posy;
    this.paletteSet = new Array();
    this.brickSize = 50;

    //generates grid of brick objects
    this.generatePalGrid = function() {
        var brickPos = new Vector(this.startposX, this.startposY);

        this.paletteSet[0] = new Brick(brickPos.X, brickPos.Y, 0);
        this.paletteSet[1] = new Brick(brickPos.X + 50, brickPos.Y, 1);
        this.paletteSet[2] = new Brick(brickPos.X + 100, brickPos.Y, 2);
        this.paletteSet[3] = new Brick(brickPos.X + 150, brickPos.Y, 3);
    }

    this.renderPalCursor = function(mouseGridX, mouseGridY) {
        var currentBrick = this.paletteSet[mouseGridX];
        if (mouseGridY == 11 && mouseGridX < 4) {
            var currentBrick = this.paletteSet[mouseGridX];
            drawRectangle(currentBrick.pos.X, currentBrick.pos.Y,
                currentBrick.BRICK_SIDE, currentBrick.BRICK_SIDE, "white", "stroke");
        }
    }

    this.switchType = function(clicked, mouseGridX, mouseGridY) {
        if (mouseGridY == 11 && mouseGridX < 4) {
            var currentBrick = this.paletteSet[mouseGridX];
            if (clicked == 1) {
                activeType = currentBrick.brickType;
            }
        }
    }

    this.mouseHoverCheckPal = function(mouseGridX, mouseGridY, row, col) {
        return (mouseGridX == col && mouseGridY == row);
    }

    //render single brick
    this.renderPalGrid = function() {
        for (var i = 0; i < this.paletteSet.length; i++) {
            this.paletteSet[i].render();
            if (this.paletteSet[i].brickType == activeType) {
                drawCircle(this.paletteSet[i].pos.X + 25, this.paletteSet[i].pos.Y + 25, 10, "white", "stroke")
            }
        }
    }
}