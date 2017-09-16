function Brick(posx, posy, type) {
    this.BRICK_SIDE = GBRICK_SIZE;
    this.pos = new Vector(posx, posy);
    this.brickType = type;
    this.image = asphA;
    this.collider = false;

    this.colBox = new Vector(this.pos.X, this.pos.Y);
    this.colBoxEnd = new Vector(this.BRICK_SIDE, this.BRICK_SIDE);

    this.switchType = function() {
        switch (this.brickType) {
            case 0:
                this.image = asphA;
                this.collider = false;
                break;
            case 1:
                this.image = curb_R;
                this.colBox.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                this.collider = true;
                break;
            case 2:
                this.image = curb_L;
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                this.collider = true;
                break;
            case 3:
                this.image = curb_T;
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                this.collider = true;
                break;
            case 4:
                this.image = curb_B;
                this.colBox.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                this.collider = true;
                break;
            case 5:
                this.image = corner_TR;
                this.collider = true;
                break;
            case 6:
                this.image = corner_TL;
                this.collider = true;
                break;
            case 7:
                this.image = corner_BR;
                this.collider = true;
                break;
            case 8:
                this.image = corner_BL;
                this.collider = true;
                break;
            case 9:
                this.image = cornerB_TR;
                this.colBox.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                this.colBox.X = this.pos.X;
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                this.collider = true;
                break;
            case 10:
                this.image = cornerB_TL;
                this.colBox.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                this.colBox.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                this.collider = true;
                break;
            case 11:
                this.image = cornerB_BR;
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                this.collider = true;
                break;
            case 12:
                this.image = cornerB_BL;
                this.colBox.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                this.collider = true;
                break;
            case 13:
                this.image = grassA;
                this.collider = true;
                break;
            case 14:
                this.image = finish;
                this.collider = true;
                break;
            default:
                this.image = grassA;
                this.collider = true;
        }
    }

    //draws brick on the screen
    this.render = function() {
        canvasContext.drawImage(this.image, this.pos.X, this.pos.Y);
        this.renderBox();
    }

    this.renderBox = function() {
        if (this.collider) {
            drawRectangle(
                this.colBox.X,
                this.colBox.Y,
                this.colBoxEnd.X,
                this.colBoxEnd.Y,
                "yellow", "stroke");
        }
    }
}