function Ball(radius) {
    this.positionX = 100;
    this.positionY = 100;
    this.radius = radius;
    this.speedX = 15;
    this.speedY = 6;

    this.setup = function() {
        this.positionX = canvas.width / 2;
        this.positionY = canvas.height / 2;
    }

    this.draw = function() {
        canvasContext.fillStyle = "white";
        canvasContext.beginPath();
        canvasContext.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

    this.updatePosition = function() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;
    }

    this.reset = function() {

        this.positionX = canvas.width / 2;
        this.positionY = canvas.height / 2;

        this.speedX = -this.speedX;
        this.speedY = -this.speedY;
    }

    this.boundsCheck = function() {
        if (this.positionX + this.radius > canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.positionY + this.radius > canvas.height) {
            //this.speedY = -this.speedY;
            this.reset();
        }
        if (this.positionX < 0) {
            this.speedX = -this.speedX;
        }
        if (this.positionY < 0) {
            this.speedY = -this.speedY;
        }
    }

    this.collisionCheckPaddle = function(collisionObject) {
        if (this.positionY + 10 > collisionObject.positionY &&
            this.positionX > collisionObject.positionX &&
            this.positionX < collisionObject.positionX + collisionObject.width) {

            this.speedY = -this.speedY;
            var collisionCenter = collisionObject.positionX + (collisionObject.width / 2);
            this.speedX = (this.positionX - collisionCenter) * 0.7;
            console.log(this.speedX);

        }
    }
}

8048