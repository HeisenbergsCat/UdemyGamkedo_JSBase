const PLAYER_START = new Vector(1, 1);

//PLAYER CONSTRUCTOR FUNCTION
function Player(player) {
    this.pos = new Vector(100, 100);
    this.accel = 3;
    this.player = player;
    this.upPressed = false;
    this.downPressed = false;
    this.rightPressed = false;
    this.leftPressed = false;
    this.triggerPressed = false;
    this.colboxSize = 7;

    this.colBOX = {
        A: new Vector(this.pos.X - this.colboxSize, this.pos.Y - this.colboxSize),
        B: new Vector(this.pos.X + this.colboxSize, this.pos.Y + this.colboxSize),
        C: new Vector(this.pos.X - this.colboxSize, this.pos.Y + this.colboxSize),
        D: new Vector(this.pos.X + this.colboxSize, this.pos.Y - this.colboxSize)
    };

    this.render = function() {

        //drawBitmapRotation(carPic, this.pos.X, this.pos.Y, this.rot);
        this.renderBox();
    };

    this.carController = function() {
        if (this.rightPressed) {
            this.pos.X += this.accel;
        }
        if (this.leftPressed) {
            this.pos.X -= this.accel;
        }
        if (this.upPressed) {
            this.pos.Y -= this.accel;
        }
        if (this.downPressed) {
            this.pos.Y += this.accel;
        }
        if (this.triggerPressed) {
            console.log("fire!");
        }
    };

    this.updateColBOX = function() {
        this.colBOX.A.X = this.pos.X - this.colboxSize;
        this.colBOX.A.Y = this.pos.Y - this.colboxSize;

        this.colBOX.B.X = this.pos.X + this.colboxSize;
        this.colBOX.B.Y = this.pos.Y + this.colboxSize;

        this.colBOX.C.X = this.pos.X - this.colboxSize;
        this.colBOX.C.Y = this.pos.Y + this.colboxSize;

        this.colBOX.D.X = this.pos.X + this.colboxSize;
        this.colBOX.D.Y = this.pos.Y - this.colboxSize;
    };

    this.updatePosition = function() {
        this.carController();
        this.updateColBOX();
        this.collide();
        this.wrapEdges();
    };

    this.reset = function(posx, posy) {
        this.pos.X = Math.floor(posx * GTILE_SIZE) + GTILE_SIZE / 2;
        this.pos.Y = Math.floor(posy * GTILE_SIZE) + GTILE_SIZE / 2;
    };

    this.collide = function() {
        var playerGridPos = this.getPlayerGridPosition();
        var collisionTile = World.world[playerGridPos.Y][playerGridPos.X];
        switch (this.collisionCheck()) {
            case "west":
                this.pos.X = collisionTile.colBOX.A.X;
                break;
            case "east":
                this.pos.X = collisionTile.colBOX.D.X;
                break;
            case "north":
                this.pos.Y = collisionTile.colBOX.A.Y;
                break;
            case "south":
                this.pos.Y = collisionTile.colBOX.C.Y;
                break;
            default:
                break;
        }
    }

    //collision check
    this.collisionCheck = function() {
        var playerGridPos = this.getPlayerGridPosition();
        var collisionTile = World.world[playerGridPos.Y][playerGridPos.X];
        if (collisionTile != undefined) {
            if (collisionTile.collider == true) {
                if (this.pos.Y > collisionTile.colBOX.A.Y &&
                    this.pos.Y < collisionTile.colBOX.C.Y) {
                    if (this.pos.X < collisionTile.colBOX.B.X && this.pos.X > collisionTile.colBOX.B.X - (this.accel + 1)) {
                        console.log("east");
                        return "east";
                    }
                    if (this.colBOX.D.X > collisionTile.colBOX.A.X && this.colBOX.D.X < collisionTile.colBOX.A.X + (this.accel + 1)) {
                        console.log("west");
                        return "west";
                    }
                }
                if (this.pos.X > collisionTile.colBOX.A.X &&
                    this.pos.X < collisionTile.colBOX.D.X) {
                    if (this.pos.Y > collisionTile.colBOX.A.Y && this.pos.Y < collisionTile.colBOX.A.Y + (this.accel + 1)) {
                        console.log("north");
                        return "north";
                    }
                    if (this.pos.Y < collisionTile.colBOX.C.Y && this.pos.Y > collisionTile.colBOX.C.Y - (this.accel + 1)) {
                        console.log("south");
                        return "south";
                    }

                }

            } else return false;
        }
    };

    this.getPlayerGridPosition = function() {
        var playerGridPos = new Vector();
        playerGridPos.X = Math.floor(this.pos.X / GTILE_SIZE);
        playerGridPos.Y = Math.floor(this.pos.Y / GTILE_SIZE);
        return playerGridPos;
    };

    this.renderBox = function() {
        drawCircle(this.pos.X, this.pos.Y, 1, "red", "stroke")
        drawCircle(this.colBOX.A.X, this.colBOX.A.Y, 1, "yellow", "stroke")
        drawCircle(this.colBOX.B.X, this.colBOX.B.Y, 1, "blue", "stroke")
        drawCircle(this.colBOX.C.X, this.colBOX.C.Y, 1, "green", "stroke")
        drawCircle(this.colBOX.D.X, this.colBOX.D.Y, 1, "white", "stroke")
    };

    this.wrapEdges = function() {
        if (this.pos.Y < 0) { this.pos.Y = canvas.height - GTILE_SIZE; }
        if (this.pos.Y > canvas.height - GTILE_SIZE) { this.pos.Y = 0; }
        if (this.pos.X < 0) { this.pos.X = canvas.width; }
        if (this.pos.X > canvas.width) { this.pos.X = 0 }
    };
} // end of constructor function Car