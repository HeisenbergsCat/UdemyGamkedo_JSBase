function Ball(radius) {
    this.pos = new Vector(100, 100);
    this.speed = new Vector(-5, 6);
    this.radius = radius;
    this.color = "white"

    this.render = function() {
        drawCircle(this.pos.X, this.pos.Y, this.radius, this.color, "fill");
        //showText(Math.floor(this.pos.X / 50) + ", " + Math.floor(this.pos.Y / 50), this.pos.X + 20, this.pos.Y + 20, "yellow");
    }

    this.updatePosition = function() {
        this.pos.vectorSum(this.speed);
    }

    //gets position form previous frame by subtracting current speed of current position
    //QUESTION: Is this works only if the speed is constant ?
    this.getPrevPosition = function() {
        var returnVec = new Vector(this.pos.X, this.pos.Y);
        returnVec.vectorDif(this.speed);

        return returnVec;
    }

    this.reset = function() {
        this.pos.X = canvas.width / 2;
        this.pos.Y = (canvas.height / 2) + 80;

        this.speed.X = -this.speed.X;
        this.speed.Y = -this.speed.Y;
    }

    //checks collisions with screen edges
    this.boundsCheck = function() {
        if (this.pos.X + this.radius > canvas.width && this.speed.X > 0.0) {
            this.speed.X = -this.speed.X;
        }
        if (this.pos.Y + this.radius > canvas.height && this.speed.Y > 0.0) {
            this.speed.Y = -this.speed.Y;
        }
        if (this.pos.X < 0) {
            this.speed.X = -this.speed.X;
        }
        if (this.pos.Y < 0) {
            this.speed.Y = -this.speed.Y;
        }
    }

    //collision check
    //TODO: Refctor as in brick, maybe do this as universal helper function ?
    this.collisionCheck = function(collisionObject) {
        if (this.pos.Y > collisionObject.pos.Y - this.radius &&
            this.pos.X > collisionObject.pos.X &&
            this.pos.X < collisionObject.pos.X + collisionObject.width &&
            this.pos.Y < collisionObject.pos.Y + collisionObject.height) {
            return true;
        } else {
            return false;
        }
    }
} // end of constructor function Ball