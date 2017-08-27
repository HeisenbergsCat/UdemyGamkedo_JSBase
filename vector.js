function Vector(x, y) {
    this.X = x;
    this.Y = y;

    this.add = function(input_vector) {
        this.X += input_vector.X;
        this.Y += input_vector.Y;
    }

    this.modify = function(x, y) {
        this.X = x;
        this.Y = y;
    }

    this.sub = function(input_vector) {
        this.X -= input_vector.X;
        this.Y -= input_vector.Y;
    }

    this.mult = function(scalar) {
        this.X *= scalar;
        this.Y *= scalar;
    }

    this.mag = function() {
        return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
    }

    this.unit = function() {
        this.X = this.X / this.mag();
        this.Y = this.Y / this.mag();
    }
}