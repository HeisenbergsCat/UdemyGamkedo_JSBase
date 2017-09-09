function Brick(posx, posy, type) {
    this.BRICK_SIDE = GBRICK_SIZE;
    this.pos = new Vector(posx, posy);
    this.colModifier = new Vector(0, 0);
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
                this.colModifier.X = (0, this.BRICK_SIDE / 2);
                break;
            case 2:
                this.image = curb_L;
                this.colModifier.X = (0, -this.BRICK_SIDE / 2);
                break;
            case 3:
                this.image = curb_T;
                this.colModifier.Y = (0, -this.BRICK_SIDE / 2);
                break;
            case 4:
                this.image = curb_B;
                this.colModifier.Y = (0, this.BRICK_SIDE / 2);
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
                break;
            case 10:
                this.image = cornerB_TL;
                break;
            case 11:
                this.image = cornerB_BR;
                break;
            case 12:
                this.image = cornerB_BL;
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
        if (collider.pos.Y > this.pos.Y + this.colModifier.Y &&
            collider.pos.Y < this.pos.Y + this.BRICK_SIDE + this.colModifier.Y) {
            return true;
        } else {
            return false;
        }
    }

    //refactored from collisionCheck for clarity
    this.collisionX = function(collider) {
        if (collider.pos.X > this.pos.X + this.colModifier.X &&
            collider.pos.X < this.pos.X + this.BRICK_SIDE + this.colModifier.X) {
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