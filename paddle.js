function Paddle(length, width) {
    this.length = length;
    this.width = width;
    this.positionX = 0;
    this.positionY = 0;
    this.color = "white";

    this.setup = function() {

        this.positionY = canvas.height - 20;
        this.positionX = 0;
        this.color = "red";

    }
    this.draw = function(canvas) {

        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.positionX, this.positionY, this.width, this.length);
    }
}