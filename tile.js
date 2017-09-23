function Brick(posx, posy, type) {
    this.BRICK_SIDE = GTILE_SIZE;
    this.pos = new Vector(posx, posy);
    this.tileType = type;
    this.image = asphA;
    this.collider = false;
    this.colboxSize = GTILE_SIZE;


    this.colBOX = {
        A: new Vector(0, 0),
        B: new Vector(0, 0),
        C: new Vector(0, 0),
        D: new Vector(0, 0)
    };

    this.switchType = function() {
        switch (this.tileType) {
            case 0:
                this.image = asphA;
                this.updateColBOX();
                this.collider = false;
                break;
            case 1:
                this.image = curb_R;
                this.updateColBOX();
                this.collider = true;
                break;
            case 2:
                this.image = curb_L;
                this.updateColBOX();
                this.collider = true;
                break;
            case 3:
                this.image = curb_T;
                this.updateColBOX();
                this.collider = true;
                break;
            case 4:
                this.image = curb_B;
                this.updateColBOX();
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
                this.collider = true;
                break;
            case 10:
                this.image = cornerB_TL;
                this.collider = true;
                break;
            case 11:
                this.image = cornerB_BR;
                this.updateColBOX();
                this.collider = true;
                break;
            case 12:
                this.image = cornerB_BL;
                this.updateColBOX();
                this.collider = true;
                break;
            case 13:
                this.image = grassA;
                this.updateColBOX();
                this.collider = true;
                break;
            case 14:
                this.image = finish;
                this.updateColBOX();
                this.collider = true;
                break;
            default:
                this.image = grassA;
                this.collider = true;
        }
    }

    this.updateColBOX = function() {
        this.colBOX.A.X = this.pos.X;
        this.colBOX.A.Y = this.pos.Y;

        this.colBOX.B.X = this.pos.X + this.colboxSize;
        this.colBOX.B.Y = this.pos.Y + this.colboxSize;

        this.colBOX.C.X = this.pos.X;
        this.colBOX.C.Y = this.pos.Y + this.colboxSize;

        this.colBOX.D.X = this.pos.X + this.colboxSize;
        this.colBOX.D.Y = this.pos.Y;
    };

    this.renderBox = function() {
        showText("A", this.colBOX.A.X, this.colBOX.A.Y + 7, 1, "yellow");
        showText("B", this.colBOX.B.X - 7, this.colBOX.B.Y, 1, "blue");
        showText("C", this.colBOX.C.X, this.colBOX.C.Y, 1, "green");
        showText("D", this.colBOX.D.X - 7, this.colBOX.D.Y + 7, 1, "white");

    };

    //draws brick on the screen
    this.render = function() {
        canvasContext.drawImage(this.image, this.pos.X, this.pos.Y);
        if (this.collider) {
            this.renderBox();
        }
    }


    /*
    this.renderBox = function() {
        if (this.collider) {
            drawRectangle(
                this.colBox.X,
                this.colBox.Y,
                this.colBoxTrueEnd.X - this.pos.X,
                this.colBoxTrueEnd.Y - this.pos.Y,
                "yellow", "stroke");
        }
    }*/
}