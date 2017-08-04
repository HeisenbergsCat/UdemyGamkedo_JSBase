function Ball(radius) {
    this.posX = 100;
    this.posY = 100;
    this.radius = radius;
    this.speedX = 15;
    this.speedY = 6;
    this.color = "white"

    this.setup = function() {
        this.posX = canvas.width / 2;
        this.posY = canvas.height / 2;
    }

    this.redner = function() {
        drawCircle(this.posX, this.posY, this.radius, this.color);
    }

    this.updatePosition = function() {
        this.posX += this.speedX;
        this.posY += this.speedY;
    }

    this.reset = function() {

        this.posX = canvas.width / 2;
        this.posY = canvas.height / 2;

        this.speedX = -this.speedX;
        this.speedY = -this.speedY;
    }

    this.boundsCheck = function() {
        if (this.posX + this.radius > canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.posY + this.radius > canvas.height) {
            //this.speedY = -this.speedY;
            this.reset();
        }
        if (this.posX < 0) {
            this.speedX = -this.speedX;
        }
        if (this.posY < 0) {
            this.speedY = -this.speedY;
        }
    }

    this.bouncePaddle = function(collisionObject) {

        if (this.collisionCheck(collisionObject)) {
            this.speedY = -this.speedY;
            var collisionCenter = collisionObject.posX + (collisionObject.width / 2);
            this.speedX = (this.posX - collisionCenter) * 0.5;
            console.log(this.speedX);
        }

    }

    this.collisionCheck = function(collisionObject) {
        if (this.posY > collisionObject.posY - this.radius &&
            this.posX > collisionObject.posX &&
            this.posX < collisionObject.posX + collisionObject.width &&
            this.posY < collisionObject.posY + collisionObject.height) {
            return true;
        } else {
            return false;
        }
    }

} // end of constructor function Ball