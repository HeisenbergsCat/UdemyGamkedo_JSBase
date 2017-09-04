function Brick(posx, posy, type) {
    this.BRICK_SIDE = GBRICK_SIZE;
    this.pos = new Vector(posx, posy);
    this.brickType = type;
    this.alive = true;
    this.col = "black"


    //gets brick's side length
    this.getSize = function() {
        return this.BRICK_SIDE;
    }

    //draws brick on the screen
    this.render = function(gap) {
        const GAP = gap
        this.col = typeSwitch(this.brickType);
        if (this.brickType == 0) {
            canvasContext.drawImage(asphA, this.pos.X, this.pos.Y);
        } else if (this.brickType == 1) {
            canvasContext.drawImage(curb_R, this.pos.X, this.pos.Y);
        } else if (this.brickType == 2) {
            canvasContext.drawImage(curb_L, this.pos.X, this.pos.Y);
        } else if (this.brickType == 3) {
            canvasContext.drawImage(curb_T, this.pos.X, this.pos.Y);
        } else if (this.brickType == 4) {
            canvasContext.drawImage(curb_B, this.pos.X, this.pos.Y);
        } else if (this.brickType == 5) {
            canvasContext.drawImage(corner_TR, this.pos.X, this.pos.Y);
        } else if (this.brickType == 6) {
            canvasContext.drawImage(corner_TL, this.pos.X, this.pos.Y);
        } else if (this.brickType == 7) {
            canvasContext.drawImage(corner_BR, this.pos.X, this.pos.Y);
        } else if (this.brickType == 8) {
            canvasContext.drawImage(corner_BL, this.pos.X, this.pos.Y);
        } else if (this.brickType == 9) {
            canvasContext.drawImage(cornerB_TR, this.pos.X, this.pos.Y);
        } else if (this.brickType == 10) {
            canvasContext.drawImage(cornerB_TL, this.pos.X, this.pos.Y);
        } else if (this.brickType == 11) {
            canvasContext.drawImage(cornerB_BR, this.pos.X, this.pos.Y);
        } else if (this.brickType == 12) {
            canvasContext.drawImage(cornerB_BL, this.pos.X, this.pos.Y);
        } else if (this.brickType == 13) {
            canvasContext.drawImage(grassA, this.pos.X, this.pos.Y);
        } else {
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