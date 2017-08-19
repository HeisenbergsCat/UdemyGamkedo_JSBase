function Brick(posx, posy, type) {
    this.BRICK_SIDE = 50;
    this.pos = new Vector(posx, posy);
    this.brickType = type;
    this.alive = true;
    this.col = "black"


    //gets brick's side length
    this.getSize = function() {
        return this.BRICK_SIDE;
    }

    //draws brick on the screen
    this.render = function() {
        const GAP = 1
        if (this.alive) {
            this.col = typeSwitch(this.brickType);
            drawRectangle(this.pos.X, this.pos.Y, this.BRICK_SIDE - GAP, this.BRICK_SIDE - GAP, this.col, "fill");
        }
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
        if (this.alive && this.brickType != 0) {
            if (this.collisionX(collider) && this.collisionY(collider)) {
                return true;
            } else {
                return false;
            }
        }
    }
}