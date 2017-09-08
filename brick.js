function Brick(posx, posy, type) {
    this.BRICK_SIDE = GBRICK_SIZE;
    this.pos = new Vector(posx, posy);
    this.brickType = type;
    this.image = asphA;

    this.switchType = function() {
        switch (this.brickType) {
            case 0:
                this.image = asphA;
                break;
            case 1:
                this.image = curb_R;
                break;
            case 2:
                this.image = curb_L;
                break;
            case 3:
                this.image = curb_T;
                break;
            case 4:
                this.image = curb_B;
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
    }

    //refactored from collisionCheck for clarity
    this.collisionY = function(collider) {
        if (collider.pos.Y > this.pos.Y &&
            collider.pos.Y < this.pos.Y + this.BRICK_SIDE) {
            return true;
        } else {
            return false;
        }
    }

    //refactored from collisionCheck for clarity
    this.collisionX = function(collider) {
        if (collider.pos.X > this.pos.X &&
            collider.pos.X < this.pos.X + this.BRICK_SIDE) {
            return true;
        } else {
            return false;
        }
    }

    //checks if objects is colliding with self
    this.collisionCheck = function(collider) {
        if (this.brickType != 0) {
            if (this.collisionX(collider) && this.collisionY(collider)) {
                return true;
            } else {
                return false;
            }
        }
    }
}