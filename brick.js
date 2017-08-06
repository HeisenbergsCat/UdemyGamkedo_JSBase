function Brick(posx, posy, type) {
    this.BRICK_SIDE = 50;
    this.type = type;
    this.pos = new Vector(posx, posy);
    this.width = this.BRICK_SIDE;
    this.height = this.BRICK_SIDE;
    this.alive = true;

    switch (type) {
        case "rock":
            this.col = "DimGray";
            this.hitpoints = 3;
            break;

        case "lava":
            this.col = "Red";
            this.hitpoints = 4;
            break;


        case "ice":
            this.col = "DarTurquoise";
            this.hitpoints = 1;
            break;


        default:
            this.col = "White"
            this.hitpoints = 1;
    }

    this.getSize = function() {
        return this.BRICK_SIDE;
    }

    this.render = function() {
        drawRectangle(this.pos.X, this.pos.Y, this.width, this.height, this.col);
    }

}