/*
DUPLICATED CAR CONTROLL FOR COOL SPACE BOOST NAVIGATION 
*/

function Car(radius) {
    this.pos = new Vector(100, 100);
    this.velocity = new Vector(0, 0);
    this.accelration = new Vector(0, 0);
    this.rot = 0;
    this.radius = radius;
    this.color = "white"

    this.force = new Vector(0, 0);

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

    this.speedControl = function() {
        force = new Vector(0, 0);
        switch (currentKeyPressed) {
            case KEY_UP_ARROW:
                if (keyD) {
                    force.modify(Math.cos(this.rot), Math.sin(this.rot));
                    this.applyForce(force);
                }
                break;
            case KEY_DOWN_ARROW:
                if (keyD) {
                    force.modify(Math.cos(this.rot), Math.sin(this.rot));
                    this.applyForce(-force);
                }
                break;
            default:
                break;
        }
    }

    this.carController = function() {
        force = new Vector(0, 0);
        switch (currentKeyPressed) {
            case KEY_RIGHT_ARROW:
                if (keyD) {
                    this.rot += 0.1;
                }
                break;
            case KEY_LEFT_ARROW:
                if (keyD) {
                    this.rot -= 0.1;
                }
                break;
            case SPACE:
                this.velocity.mult(0.9);
                break;
            default:
                break;
        }
    }

    this.updatePosition = function() {

        //this.applyForce(this.force);
        this.carController();
        this.speedControl();
        //this.applyForce(speed);
        //this.rot = Math.atan(this.velocity.Y / this.velocity.X);

        this.velocity.add(this.accelration);
        this.pos.add(this.velocity);
        this.accelration.mult(0);
        //this.pos.add(this.speed);
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