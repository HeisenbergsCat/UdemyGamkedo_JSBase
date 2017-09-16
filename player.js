const PLAYER_START = new Vector(1, 1);

//PLAYER CONSTRUCTOR FUNCTION
function Player(player) {
    this.pos = new Vector(100, 100);
    this.accel = 8;
    this.player = player;

    this.upPressed = false;
    this.downPressed = false;
    this.rightPressed = false;
    this.leftPressed = false;
    this.triggerPressed = false;

    this.render = function() {

        drawBitmapRotation(carPic, this.pos.X, this.pos.Y, this.rot);
        this.renderBox();
    }

    this.carController = function() {


        if (this.rightPressed) {
            this.pos.X += this.accel;
            if (this.collisionCheck()) {
                var playerGridPos = this.getPlayerGridPosition();
                var collisionTile = World.world[playerGridPos.Y][playerGridPos.X];
                this.pos.X = collisionTile.colBox.X - 5;
            }
        }
        if (this.leftPressed) {
            this.pos.X -= this.accel;
            if (this.collisionCheck()) {
                var playerGridPos = this.getPlayerGridPosition();
                var collisionTile = World.world[playerGridPos.Y][playerGridPos.X];
                this.pos.X = collisionTile.colBoxTrueEnd.X + 5;
            }
        }
        if (this.upPressed) {
            this.pos.Y -= this.accel;
            if (this.collisionCheck()) {
                var playerGridPos = this.getPlayerGridPosition();
                var collisionTile = World.world[playerGridPos.Y][playerGridPos.X];
                this.pos.Y = collisionTile.colBoxTrueEnd.Y + 5;
            }
        }
        if (this.downPressed) {
            this.pos.Y += this.accel;
            if (this.collisionCheck()) {
                var playerGridPos = this.getPlayerGridPosition();
                var collisionTile = World.world[playerGridPos.Y][playerGridPos.X];
                this.pos.Y = collisionTile.colBox.Y - 5;
            }
        }
        if (this.triggerPressed) {
            console.log("fire!");
        }
    }

    this.updatePosition = function() {
        this.wrapEdges();
        this.carController();
    }

    this.reset = function(posx, posy) {
        this.pos.X = Math.floor(posx * GTILE_SIZE) + GTILE_SIZE / 2;
        this.pos.Y = Math.floor(posy * GTILE_SIZE) + GTILE_SIZE / 2;
    }

    //collision check
    this.collisionCheck = function() {
        var playerGridPos = this.getPlayerGridPosition();
        var collisionTile = World.world[playerGridPos.Y][playerGridPos.X];
        if (collisionTile != undefined) {
            if (collisionTile.collider == true) {
                if (this.pos.Y + 5 > collisionTile.colBox.Y &&
                    this.pos.X + 5 > collisionTile.colBox.X &&
                    this.pos.X - 5 < collisionTile.colBox.X + (collisionTile.colBoxTrueEnd.X - collisionTile.pos.X) &&
                    this.pos.Y - 5 < collisionTile.colBox.Y + (collisionTile.colBoxTrueEnd.Y - collisionTile.pos.Y)) {
                    return true;
                } else return false;
            }
        }

    }

    this.getPlayerGridPosition = function() {
        var playerGridPos = new Vector();
        playerGridPos.X = Math.floor(this.pos.X / GTILE_SIZE);
        playerGridPos.Y = Math.floor(this.pos.Y / GTILE_SIZE);
        return playerGridPos;
    }

    this.renderBox = function() {
        drawRectangle(
            this.pos.X - 5,
            this.pos.Y - 5,
            10,
            10,
            "red", "stroke");
    }

    this.wrapEdges = function() {
        if (this.pos.Y < 0) { this.pos.Y = canvas.height - GTILE_SIZE; }
        if (this.pos.Y > canvas.height - GTILE_SIZE) { this.pos.Y = 0; }
        if (this.pos.X < 0) { this.pos.X = canvas.width; }
        if (this.pos.X > canvas.width) { this.pos.X = 0 }
    }
} // end of constructor function Car