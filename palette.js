//GLOBAL VAR INDICATING ACTIVE BRICK TYPE (FOR PAINTING)
var activeType = 1;

//PALETTE CONSTRUCTOR FUNCTION
function Palette(posx, posy) {
    this.startposX = posx;
    this.startposY = posy;
    this.paletteSet = new Array();
    this.brickSize = GBRICK_SIZE;
    this.totalTypes = 8;

    //generates grid of brick objects
    this.generatePalGrid = function() {
        var brickPos = new Vector(this.startposX, this.startposY);
        var offset = 0;
        for (var i = 0; i < this.totalTypes; i++) {
            this.paletteSet[i] = new Brick(brickPos.X + offset, brickPos.Y, i);
            offset += GBRICK_SIZE;
        }
    }

    this.renderPalCursor = function(mouseGridX, mouseGridY) {
        var currentBrick = this.paletteSet[mouseGridX];
        if (mouseGridY == 14 && mouseGridX < this.totalTypes) {
            var currentBrick = this.paletteSet[mouseGridX];
            drawRectangle(currentBrick.pos.X, currentBrick.pos.Y,
                currentBrick.BRICK_SIDE, currentBrick.BRICK_SIDE, "white", "stroke");
        }
    }

    this.switchType = function(clicked, mouseGridX, mouseGridY) {
        if (mouseGridY == 14 && mouseGridX < this.totalTypes) {
            var currentBrick = this.paletteSet[mouseGridX];
            if (clicked == 1) {
                activeType = currentBrick.brickType;
            }
        }
    }

    //render single brick
    this.renderPalGrid = function() {
        for (var i = 0; i < this.paletteSet.length; i++) {
            this.paletteSet[i].render(1);
            if (this.paletteSet[i].brickType == activeType) {
                drawCircle(this.paletteSet[i].pos.X + 20, this.paletteSet[i].pos.Y + 20, 10, "white", "stroke")
            }
        }
    }
}

function typeSwitch(type) {
    switch (type) {
        case 0:
            return "Grey";
            break;
        case 1:
            return "Red";
            break;
        case 2:
            return "Blue";
            break;
        case 3:
            return "green";
            break;
        case 4:
            return "purple";
            break;
        case 5:
            return "yellow";
            break;
        default:
            return "White"
    }
}