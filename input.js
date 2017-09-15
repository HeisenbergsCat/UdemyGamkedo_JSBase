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

var inputEnabled = false;

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

function setKeys(whichCar, setState, cKey) {

    if (currentKey == whichCar.key_up) {
        whichCar.gasPressed = setState;
    }
    if (currentKey == whichCar.key_down) {
        whichCar.reversePressed = setState;
    }
    if (currentKey == whichCar.key_right) {
        whichCar.rightPressed = setState;
    }
    if (currentKey == whichCar.key_left) {
        whichCar.leftPressed = setState;
    }
    if (currentKey == whichCar.brake) {
        whichCar.brakesPressed = setState;
    }

}

function keyPressed(evt) {
    currentKey = evt.keyCode;
    setKeys(CarA, true, currentKey)
    setKeys(CarB, true, currentKey)
}

function keyReleased(evt) {
    currentKey = evt.keyCode;
    setKeys(CarA, false, currentKey)
    setKeys(CarB, false, currentKey)
}