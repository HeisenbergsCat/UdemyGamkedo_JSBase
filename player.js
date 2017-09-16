const PLAYER_START = new Vector(1, 1);

//PLAYER CONSTRUCTOR FUNCTION
function Player(player) {
    this.pos = new Vector(100, 100);
    this.speed = 4;
    this.accel = 0;
    this.player = player;

    this.upPressed = false;
    this.downPressed = false;
    this.rightPressed = false;
    this.leftPressed = false;
    this.triggerPressed = false;

    this.render = function() {
        drawBitmapRotation(carPic, this.pos.X, this.pos.Y, this.rot);
    }

    this.carController = function() {
        if (this.rightPressed) {
            this.accel += this.speed;
            this.pos.X += this.accel;
            this.accel *= 0;
        }
        if (this.leftPressed) {
            this.accel += this.speed;
            this.pos.X -= this.accel;
            this.accel *= 0;
        }
        if (this.upPressed) {
            this.pos.Y -= this.accel;
        }
        if (this.downPressed) {
            this.pos.Y += this.accel;
        }
        if (this.triggerPressed) {
            console.log("fire!");
            this.stopped();
        }
    }
    this.stopped = function() {
        this.accel = 0;
    }

    this.updatePosition = function() {
        this.carController();
        this.wrapEdges();


        if (this.collisionCheck()) {
            this.accel = 0;
            console.log("collision");
        }
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
                if (this.pos.Y > collisionTile.colBox.Y &&
                    this.pos.X > collisionTile.colBox.X &&
                    this.pos.X < collisionTile.colBox.X + collisionTile.colBoxEnd.X &&
                    this.pos.Y < collisionTile.colBox.Y + collisionTile.colBoxEnd.Y) {
                    return true;
                } else return false;
            }
        }

    }

    this.getPlayerGridPosition = function() {
        var playerGridPos = new Vector();
        playerGridPos.X = Math.floor(this.pos.X / GTILE_SIZE);
        playerGridPos.Y = Math.floor(this.pos.Y / GTILE_SIZE);

        showText(playerGridPos.X + ", " + playerGridPos.Y, this.pos.X, this.pos.Y, "white")
        return playerGridPos;
    }

    this.wrapEdges = function() {
        if (this.pos.Y < 0) { this.pos.Y = canvas.height - GTILE_SIZE; }
        if (this.pos.Y > canvas.height - GTILE_SIZE) { this.pos.Y = 0; }
        if (this.pos.X < 0) { this.pos.X = canvas.width; }
        if (this.pos.X > canvas.width) { this.pos.X = 0 }
    }
} // end of constructor function Car