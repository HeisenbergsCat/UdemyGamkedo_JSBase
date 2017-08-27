//mouse position
var mouseX;
var mouseY;

//mouse position in grid space
var mouseGridX;
var mouseGridY;

//mouse click handling
var mouseClicked = 0;
var activeType = 1;

//keyboard input handling
var currentKeyPressed;

const SPACE = 32;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

var gasPressed = false;
var reversePressed = false;
var rightPressed = false;
var leftPressed = false;
var brakesPressed = false;

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
function keyPressed(evt) {
    currentKey = evt.keyCode;
    if (currentKey == KEY_UP_ARROW) {
        gasPressed = true;
    }
    if (currentKey == KEY_DOWN_ARROW) {
        reversePressed = true;
    }
    if (currentKey == KEY_RIGHT_ARROW) {
        rightPressed = true;
    }
    if (currentKey == KEY_LEFT_ARROW) {
        leftPressed = true;
    }
    if (currentKey == SPACE) {
        brakesPressed = true;
    }
}

function keyReleased(evt) {
    currentKey = evt.keyCode;
    if (currentKey == KEY_UP_ARROW) {
        gasPressed = false;
    }
    if (currentKey == KEY_DOWN_ARROW) {
        reversePressed = false;
    }
    if (currentKey == KEY_RIGHT_ARROW) {
        rightPressed = false;
    }
    if (currentKey == KEY_LEFT_ARROW) {
        leftPressed = false;
    }
    if (currentKey == SPACE) {
        brakesPressed = false;
    }
}