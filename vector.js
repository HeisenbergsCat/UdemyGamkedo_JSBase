function Vector(x, y) {
    this.X = x;
    this.Y = y;

    this.vectorSum = function(input_vector) {
        this.X += input_vector.X;
        this.Y += input_vector.Y;
    }

    this.vectorDif = function(input_vector) {
        this.X -= input_vector.X;
        this.Y -= input_vector.Y;
    }
}