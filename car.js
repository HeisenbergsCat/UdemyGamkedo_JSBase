function Car(radius) {
    this.pos = new Vector(100, 100);
    this.velocity = new Vector(0, 0);
    this.accelration = new Vector(0, 0);

    this.rot = 0;
    this.speed = 0;

    this.render = function() {
        if (carPicLoaded) {
            this.drawBitmapRotation(carPic, this.pos.X, this.pos.Y, this.rot);
        }
    }

    this.drawBitmapRotation = function(carPic, posx, posy, ang) {
        canvasContext.save();
        canvasContext.translate(posx, posy);
        canvasContext.rotate(ang);
        canvasContext.drawImage(carPic, -carPic.width / 2, -carPic.height / 2);
        canvasContext.restore();
    }

    this.applyForce = function(force) {
        this.accelration.add(force);
    }

    this.carController = function() {
        if (rightPressed == true) {
            this.rot += 0.1;
        }
        if (leftPressed) {
            this.rot -= 0.1;
        }
        if (gasPressed) {
            this.speed += 0.15;
        }
        if (reversePressed) {
            this.speed -= 0.15;
        }
        if (brakesPressed) {
            this.speed *= 0.8;
        }
    }

    this.calcSpeed = function() {
        speed = new Vector(Math.cos(this.rot), Math.sin(this.rot));
        speed.unit();
        return speed;
    }

    this.calcDrag = function() {
        drag = new Vector(this.accelration.X, this.accelration.Y);
        drag.unit();
        drag.mult(-1);
        drag.mult(0.9);
        return drag;
    }

    this.updatePosition = function() {
        this.speed *= 0.98;
        this.carController();
        this.pos.X += Math.cos(this.rot) * this.speed;
        this.pos.Y += Math.sin(this.rot) * this.speed;

        /*
        this.velocity.add(this.accelration);
        this.pos.add(this.velocity);
        this.accelration.mult(0);
        */
    }

    this.reset = function(posx, posy) {
        this.pos.X = Math.floor(posx * GBRICK_SIZE) + GBRICK_SIZE / 2;
        this.pos.Y = Math.floor(posy * GBRICK_SIZE) + GBRICK_SIZE / 2;
    }

    //collision check
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
} // end of constructor function Car