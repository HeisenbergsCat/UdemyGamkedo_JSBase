function Brick(posx, posy, type) {
    this.BRICK_SIDE = GBRICK_SIZE;
    this.pos = new Vector(posx, posy);
    this.brickType = type;
    this.image = asphA;

    this.colBox = new Vector(this.pos.X, this.pos.Y);
    this.colBoxEnd = new Vector(this.BRICK_SIDE, this.BRICK_SIDE);


    this.switchType = function() {
        switch (this.brickType) {
            case 0:
                this.image = asphA;
                break;
            case 1:
                this.image = curb_R;
                this.colBox.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                break;
            case 2:
                this.image = curb_L;
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                break;
            case 3:
                this.image = curb_T;
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                break;
            case 4:
                this.image = curb_B;
                this.colBox.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                break;
            case 5:
                this.image = corner_TR;
                break;
            case 6:
                this.image = corner_TL;
                break;
            case 7:
                this.image = corner_BR;
                break;
            case 8:
                this.image = corner_BL;
                break;
            case 9:
                this.image = cornerB_TR;
                this.colBox.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                this.colBox.X = this.pos.X;
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                break;
            case 10:
                this.image = cornerB_TL;
                this.colBox.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                this.colBox.Y = this.pos.Y + (this.BRICK_SIDE / 2);
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                break;
            case 11:
                this.image = cornerB_BR;
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                break;
            case 12:
                this.image = cornerB_BL;
                this.colBox.X = this.pos.X + (this.BRICK_SIDE / 2);
                this.colBoxEnd.X = this.BRICK_SIDE / 2;
                this.colBoxEnd.Y = this.BRICK_SIDE / 2;
                break;
            case 13:
                this.image = grassA;
                break;
            default:
                this.image = grassA;
        }
    }

    //gets brick's side length
    this.getSize = function() {
        return this.BRICK_SIDE;
    }

    //draws brick on the screen
    this.render = function() {
        canvasContext.drawImage(this.image, this.pos.X, this.pos.Y);
        if (this.brickType != 0) {
            this.drawCollisionBox();
        }
    }

    //refactored from collisionCheck for clarity
    this.collisionY = function(collider) {
        if (collider.pos.Y > this.colBox.Y &&
            collider.pos.Y < this.colBox.Y + this.colBoxEnd.Y) {
            return true;
        } else {
            return false;
        }
    }

    //refactored from collisionCheck for clarity
    this.collisionX = function(collider) {
        if (collider.pos.X > this.colBox.X &&
            collider.pos.X < this.colBox.X + this.colBoxEnd.X) {
            return true;
        } else {
            return false;
        }
    }

    //checks if objects is colliding with self
    this.collisionCheck = function(collider) {
        if (this.brickType != 0) {
            if (this.collisionY(collider) && this.collisionX(collider)) {
                return true;
            } else {
                return false;
            }
        }
    }

    this.drawCollisionBox = function() {
        drawRectangle(
            this.colBox.X,
            this.colBox.Y,
            this.colBoxEnd.X,
            this.colBoxEnd.Y,
            "yellow", "stroke");
    }
}