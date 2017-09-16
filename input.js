//mouse position
var mouseX;
var mouseY;

//mouse position in grid space
var mouseGridX;
var mouseGridY;

//mouse click handling
var mouseClicked = 0;

//keyboard input handling
var currentKeyPressed;

const SPACE = 32;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

var inputEnabled = true;

function inputSetup() {

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
    canvas.addEventListener('mousemove',
        function(evt) {
            calculateMousePos(evt);
        });
    canvas.addEventListener('mousedown', function(evt) {
        mouseClicked = 1;
    });
    canvas.addEventListener('mouseup', function(evt) {
        mouseClicked = 0;
    });
}

//MOUSE MOVEMENT
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    mouseGridX = Math.floor(mouseX / GBRICK_SIZE);
    mouseGridY = Math.floor(mouseY / GBRICK_SIZE);
}

//KEYBOARD INPUT

function setKeys(whichPlayer, setState, cKey) {

    if (currentKey == KEY_UP_ARROW) {
        whichPlayer.upPressed = setState;
    }
    if (currentKey == KEY_DOWN_ARROW) {
        whichPlayer.downPressed = setState;
    }
    if (currentKey == KEY_RIGHT_ARROW) {
        whichPlayer.rightPressed = setState;
    }
    if (currentKey == KEY_LEFT_ARROW) {
        whichPlayer.leftPressed = setState;
    }
    if (currentKey == SPACE) {
        whichPlayer.triggerPressed = setState;
    }

}

function keyPressed(evt) {
    currentKey = evt.keyCode;
    setKeys(PlayerA, true, currentKey)
}

function keyReleased(evt) {
    currentKey = evt.keyCode;
    setKeys(PlayerA, false, currentKey)
}