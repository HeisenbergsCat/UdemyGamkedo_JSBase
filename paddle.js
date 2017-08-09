function Paddle(height, width) {
    this.height = height;
    this.width = width;
    this.pos = new Vector(0, 0);
    this.color = "white";

    this.setup = function() {

        this.pos.Y = canvas.height - this.height - 5;
        this.pos.X = 0;
        this.color = "red";

    }
    this.render = function(canvas) {
        drawRectangle(this.pos.X, this.pos.Y, this.width, this.height, this.color);
    }

} // end of constructor function Paddle