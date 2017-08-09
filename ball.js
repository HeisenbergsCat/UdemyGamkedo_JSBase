function Ball(radius) {
    this.pos = new Vector(100, 100);
    this.speed = new Vector(-7, 9);
    this.radius = radius;
    this.color = "white"

    this.setup = function() {
        this.pos.X = canvas.width / 2;
        this.pos.Y = canvas.height / 2;
    }

    this.render = function() {
        drawCircle(this.pos.X, this.pos.Y, this.radius, this.color);
    }

    this.updatePosition = function() {
        this.pos.vectorSum(this.speed);
    }

    this.reset = function() {

        this.pos.X = canvas.width / 2;
        this.pos.Y = canvas.height / 2;

        this.speed.X = -this.speed.X;
        this.speed.Y = -this.speed.Y;
    }

    this.boundsCheck = function() {
        if (this.pos.X + this.radius > canvas.width) {
            this.speed.X = -this.speed.X;
        }
        if (this.pos.Y + this.radius > canvas.height) {
            //this.speedY = -this.speedY;
            this.reset();
        }
        if (this.pos.X < 0) {
            this.speed.X = -this.speed.X;
        }
        if (this.pos.Y < 0) {
            this.speed.Y = -this.speed.Y;
        }
    }

    this.bouncePaddle = function(collisionObject) {

        if (this.collisionCheck(collisionObject)) {
            this.speed.Y = -this.speed.Y;
            const SPEED_MULT = 0.4;
            var collisionCenter = collisionObject.pos.X + (collisionObject.width / 2);
            var hitPlace = collisionCenter - this.pos.X;

            if (this.speed.X > 0 && hitPlace < 0) {
                this.speed.X = Math.abs(hitPlace) * SPEED_MULT;
            } else if (this.speed.X < 0 && hitPlace > 0) {
                this.speed.X = -hitPlace * SPEED_MULT;
            } else {
                this.speed.X = hitPlace * SPEED_MULT;
            }
        }

    }

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