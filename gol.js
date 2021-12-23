const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");
const canvasHeight = 400;
const canvasWidth = 400;

function drawRect(context, x,y, width, height, color="#0F0") {
  context.fillStyle = color;
  context.fillRect(x,y,width, height);
}

function fillScreen(context, color) {
  context.fillStyle = color;
  context.fillRect(0,0,canvasWidth, canvasHeight);
}

let x = 0;
let y = 0;

for(let i = 0; i < 5; i++) {
  drawRect(context, x,y,10,10);
  x += 15;
}

function draw() {
  // clear the screen
  // redraw the objects
}