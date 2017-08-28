function showText(plainText, posX, posY, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillText(plainText, posX, posY);

} // end of showText

function drawRectangle(posX, posY, width, height, color, mode) {
    canvasContext.fillStyle = color;
    canvasContext.strokeStyle = color;
    if (mode == "fill") {
        canvasContext.fillRect(posX, posY, width, height);
    } else if (mode == "stroke") {
        canvasContext.strokeRect(posX, posY, width, height);
    }
} // end of drawRectangle

function drawCircle(posX, posY, radius, color, mode) {
    canvasContext.fillStyle = color;
    canvasContext.strokeStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(posX, posY, radius, 0, Math.PI * 2, true);
    if (mode == "fill") {
        canvasContext.fill();
    } else if (mode == "stroke") {
        canvasContext.stroke();
    }
}

function drawBitmapRotation(Pic, posx, posy, ang) {
    canvasContext.save();
    canvasContext.translate(posx, posy);
    canvasContext.rotate(ang);
    canvasContext.drawImage(Pic, -carPic.width / 2, -carPic.height / 2);
    canvasContext.restore();
}