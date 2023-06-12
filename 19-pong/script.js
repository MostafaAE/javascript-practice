// Canvas
const { body } = document;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const width = 500;
const height = 700;
const screenWidth = window.screen.width;
const canvasPosition = screenWidth / 2 - width / 2;

// Paddle
const paddleHeight = 10;
const paddleWidth = 50;
const paddleDiff = 25;
let paddleBottomX = 225;
let paddleTopX = 225;
let playerMoved = false;
let paddleContact = false;

function renderCanvas() {
  // Canvas background
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);

  // Paddle color
  context.fillStyle = 'white';

  // Player paddle (bottom)
  context.fillRect(paddleBottomX, height - 20, paddleWidth, paddleHeight);

  // Computer paddle (top)
  context.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);

  // Dashed center line
  context.beginPath();
  context.setLineDash([4]);
  context.moveTo(0, 350);
  context.lineTo(500, 350);
  context.strokeStyle = 'grey';
  context.stroke();
}

// Create the canvas
function createCanvas() {
  canvas.width = width;
  canvas.height = height;
  body.append(canvas);
  renderCanvas();
}

createCanvas();
