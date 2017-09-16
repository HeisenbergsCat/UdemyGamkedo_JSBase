function Brick(posx, posy, type) {
    this.BRICK_SIDE = GTILE_SIZE;
    this.pos = new Vector(posx, posy);
    this.tileType = type;
    this.image = asphA;
    this.collider = false;

    this.colBox = new Vector(this.pos.X, this.pos.Y);
    this.colBoxTrueEnd = new Vector(0, 0);

    this.switchType = function() {
        switch (this.tileType) {
            case 0:
                this.image = asphA;
                this.collider = false;
                break;
            case 1:
                this.image = curb_R;
                this.colBox.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxTrueEnd.Y = this.pos.Y + this.BRICK_SIDE - 1;
                this.collider = true;
                break;
            case 2:
                this.image = curb_L;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxTrueEnd.Y = this.pos.Y + this.BRICK_SIDE - 1;
                this.collider = true;
                break;
            case 3:
                this.image = curb_T;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + this.BRICK_SIDE - 1;
                this.colBoxTrueEnd.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.collider = true;
                break;
            case 4:
                this.image = curb_B;
                this.colBox.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.colBox.X = this.pos.X;
                this.colBoxTrueEnd.X = this.pos.X + this.BRICK_SIDE - 1;
                this.colBoxTrueEnd.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.collider = true;
                break;
            case 5:
                this.image = corner_TR;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + this.BRICK_SIDE - 1;
                this.colBoxTrueEnd.Y = this.pos.Y + this.BRICK_SIDE - 1;
                this.collider = true;
                break;
            case 6:
                this.image = corner_TL;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + this.BRICK_SIDE - 1;
                this.colBoxTrueEnd.Y = this.pos.Y + this.BRICK_SIDE - 1;
                this.collider = true;
                break;
            case 7:
                this.image = corner_BR;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + this.BRICK_SIDE - 1;
                this.colBoxTrueEnd.Y = this.pos.Y + this.BRICK_SIDE - 1;
                this.collider = true;
                break;
            case 8:
                this.image = corner_BL;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + this.BRICK_SIDE - 1;
                this.colBoxTrueEnd.Y = this.pos.Y + this.BRICK_SIDE - 1;
                this.collider = true;
                break;
            case 9:
                this.image = cornerB_TR;
                this.colBox.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.colBox.X = this.pos.X;
                this.colBoxTrueEnd.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxTrueEnd.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.collider = true;
                break;
            case 10:
                this.image = cornerB_TL;
                this.colBox.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBox.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.colBoxTrueEnd.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxTrueEnd.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.collider = true;
                break;
            case 11:
                this.image = cornerB_BR;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxTrueEnd.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.collider = true;
                break;
            case 12:
                this.image = cornerB_BL;
                this.colBox.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxTrueEnd.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.collider = true;
                break;
            case 13:
                this.image = grassA;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + this.BRICK_SIDE - 1;
                this.colBoxTrueEnd.Y = this.pos.Y + this.BRICK_SIDE - 1;
                this.collider = true;
                break;
            case 14:
                this.image = finish;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
                this.colBoxTrueEnd.X = this.pos.X + this.BRICK_SIDE - 1;
                this.colBoxTrueEnd.Y = this.pos.Y + this.BRICK_SIDE - 1;
                this.collider = true;
                break;
            default:
                this.image = grassA;
                this.colBox.X = this.pos.X;
                this.colBox.Y = this.pos.Y;
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
                this.colBoxTrueEnd.X - this.pos.X,
                this.colBoxTrueEnd.Y - this.pos.Y,
                "yellow", "stroke");
        }
    }
}