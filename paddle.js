function Paddle(height, width) {
    this.height = height;
    this.width = width;
    this.posX = 0;
    this.posY = 0;
    this.color = "white";

    this.setup = function() {

        this.posY = canvas.height - this.height - 10;
        this.posX = 0;
        this.color = "red";

    }
    this.render = function(canvas) {
        drawRectangle(this.posX, this.posY, this.width, this.height, this.color);
    }

} // end of constructor function Paddle