//VARIABLES
var carPic = document.createElement("img");

var asphA = document.createElement("img");
var grassA = document.createElement("img");

var curb_R = document.createElement("img");
var curb_L = document.createElement("img");
var curb_T = document.createElement("img");
var curb_B = document.createElement("img");

var corner_TR = document.createElement("img");
var corner_TL = document.createElement("img");
var corner_BR = document.createElement("img");
var corner_BL = document.createElement("img");

var cornerB_TR = document.createElement("img");
var cornerB_TL = document.createElement("img");
var cornerB_BR = document.createElement("img");
var cornerB_BL = document.createElement("img");

var allImages = [
    { varName: carPic, path: "images/player1car.png" },
    { varName: asphA, path: "images/asphA.png" },
    { varName: grassA, path: "images/grassA.png" },
    { varName: curb_R, path: "images/curb_R.png" },
    { varName: curb_L, path: "images/curb_L.png" },
    { varName: curb_T, path: "images/curb_T.png" },
    { varName: curb_B, path: "images/curb_B.png" },
    { varName: corner_TR, path: "images/corner_TR.png" },
    { varName: corner_TL, path: "images/corner_TL.png" },
    { varName: corner_BL, path: "images/corner_BL.png" },
    { varName: cornerB_TR, path: "images/cornerB_TR.png" },
    { varName: cornerB_TL, path: "images/cornerB_TL.png" },
    { varName: cornerB_BR, path: "images/cornerB_BR.png" },
    { varName: cornerB_BL, path: "images/cornerB_BL.png" }
];

var imagesToLoad = allImages.length;

function ImageOnLoad() {
    imagesToLoad--;
    if (imagesToLoad == 0) {
        gameSetup();
    }
}

function loadImage(imgVar, path) {
    imgVar.onload = ImageOnLoad();
    imgVar.src = path;
}

function imagesLoad() {
    for (var i = 0; i < allImages.length; i++) {
        var element = allImages[i];
        loadImage(element.varName, element.path);

    }
}