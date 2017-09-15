//CAR STEERING VARIABLES
const ACCELERATION = 0.15;
const REVERSE = 0.15;
const TURN_RATE = 0.15;
const BRAKE_RATE = 0.8;
const SPEED_DECAY = 0.98;
const TURN_MULT = 6;

const CAR_START = new Vector(1, 1);



//CAR CONSTRUCTOR FUNCTION
function Car(player) {
    this.pos = new Vector(100, 100);
    this.rot = 0;
    this.speed = 0;
    this.player = player;

    this.gasPressed = false;
    this.reversePressed = false;
    this.rightPressed = false;
    this.leftPressed = false;
    this.brakesPressed = false;

    this.key_up;
    this.key_down;
    this.key_right;
    this.key_left;
    this.brake;


    this.render = function() {
        switch (this.player) {
            case 1:
                drawBitmapRotation(carPic, this.pos.X, this.pos.Y, this.rot);
                this.key_up = KEY_UP_ARROW;
                this.key_down = KEY_DOWN_ARROW;
                this.key_right = KEY_RIGHT_ARROW;
                this.key_left = KEY_LEFT_ARROW;
                this.brake = SPACE;
                break;
            case 2:
                drawBitmapRotation(carPicRed, this.pos.X, this.pos.Y, this.rot);
                this.key_up = 87;
                this.key_down = 83;
                this.key_right = 68;
                this.key_left = 65;
                this.brake = 16;
                break;
            default:
                drawBitmapRotation(carPic, this.pos.X, this.pos.Y, this.rot);
        }

        this.renderVector();
    }

    this.getSpeedVector = function() {
        var returnSpeed = new Vector(Math.cos(this.rot), Math.sin(this.rot));
        returnSpeed.unit();
        returnSpeed.X *= this.speed;
        returnSpeed.Y *= this.speed;
        return returnSpeed;
    }

    this.renderVector = function() {
        var speedVector = this.getSpeedVector();
        drawLine(this.pos.X, this.pos.Y,
            this.pos.X + (speedVector.X * 2.5),
            this.pos.Y + (speedVector.Y * 2.5),
            "white");
    }

    this.carController = function() {
        if (inputEnabled) {
            if (this.rightPressed) {
                this.rot += TURN_RATE * (this.speed / TURN_MULT);
            }
            if (this.leftPressed) {
                this.rot -= TURN_RATE * (this.speed / TURN_MULT);
            }
            if (this.gasPressed) {
                this.speed += ACCELERATION;
            }
            if (this.reversePressed) {
                this.speed -= ACCELERATION;
            }
            if (this.brakesPressed) {
                this.speed *= BRAKE_RATE;
            }
        }
    }

    this.updatePosition = function() {
        //decrement speed little bit each frame
        this.speed *= SPEED_DECAY;
        //update speed and rotation based on input
        this.carController();
        //move the car: calculate move vector based on eucledian coordinates (rotation) and speed, add to position
        this.pos.X += Math.cos(this.rot) * this.speed;
        this.pos.Y += Math.sin(this.rot) * this.speed;
        //let the car wrap around canvas edges
        this.wrapEdges();
    }

    this.reset = function(posx, posy) {
        this.pos.X = Math.floor(posx * GBRICK_SIZE) + GBRICK_SIZE / 2;
        this.pos.Y = Math.floor(posy * GBRICK_SIZE) + GBRICK_SIZE / 2;
        this.speed = 0;
        this.rot = 0;
    }

    //collision check
    this.collisionCheck = function(collisionObject) {
        if (collisionPoint.Y > collisionObject.pos.Y &&
            collisionPoint.X > collisionObject.pos.X &&
            collisionPoint.X < collisionObject.pos.X + collisionObject.width &&
            collisionPoint.Y < collisionObject.pos.Y + collisionObject.height) {
            return true;
        } else return false;
    }

    this.wrapEdges = function() {
        if (this.pos.Y < 0) { this.pos.Y = canvas.height - GBRICK_SIZE; }
        if (this.pos.Y > canvas.height - GBRICK_SIZE) { this.pos.Y = 0; }
        if (this.pos.X < 0) { this.pos.X = canvas.width; }
        if (this.pos.X > canvas.width) { this.pos.X = 0 }
    }
} // end of constructor function Car