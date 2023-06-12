// Canvas
const { body } = document;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const width = 500;
const height = 700;
const screenWidth = window.screen.width;
const canvasPosition = screenWidth / 2 - width / 2;

function renderCanvas() {
  // Canvas background
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
}

// Create the canvas
function createCanvas() {
  canvas.width = width;
  canvas.height = height;
  body.append(canvas);
  renderCanvas();
}

createCanvas();
