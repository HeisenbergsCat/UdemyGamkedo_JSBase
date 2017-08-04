function showText(plainText, posX, posY, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillText(plainText, posX, posY);

} // end of showText

function drawRectangle(posX, posY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(posX, posY, width, height);

} // end of drawRectangle

function drawCircle(posX, posY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(posX, posY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}