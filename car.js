function Car(radius) {
    this.pos = new Vector(100, 100);
    this.velocity = new Vector(0, 0);
    this.accelration = new Vector(0, 0);
    this.rot = 0;

    this.render = function() {
        if (carPicLoaded) {
            this.drawBitmapRotation(carPic, this.pos.X, this.pos.Y, this.rot);
        }
        showText(Math.round(this.rot * 100) / 100, this.pos.X + 20, this.pos.Y + 20, "yellow");

        //drawCircle(this.pos.X, this.pos.Y, this.radius, this.color, "fill");
        //showText(Math.floor(this.pos.X / 50) + ", " + Math.floor(this.pos.Y / 50), this.pos.X + 20, this.pos.Y + 20, "yellow");
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
        if (keyD && currentKeyPressed == KEY_RIGHT_ARROW) {
            this.rot += 0.15;
        }
        if (keyD && currentKeyPressed == KEY_LEFT_ARROW) {
            this.rot -= 0.15;
        }
        if (keyD && currentKeyPressed == SPACE) {
            this.velocity.mult(0.9);
        }
    }

    this.calcSpeed = function() {
        speed = new Vector(Math.cos(this.rot), Math.sin(this.rot));
        speed.unit();
        console.log(this.velocity.mag());
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

        this.carController();
        this.applyForce(this.calcSpeed());
        this.applyForce(this.calcDrag());

        this.velocity.add(this.accelration);
        this.pos.add(this.velocity);
        this.accelration.mult(0);
    }

    this.reset = function(posx, posy) {
        this.pos.X = Math.floor(posx * 40) + 20;
        this.pos.Y = Math.floor(posy * 40) + 20;
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
} // end of constructor function Car