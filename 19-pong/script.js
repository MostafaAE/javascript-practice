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

// Ball
let ballX = 250;
let ballY = 350;
const ballRadius = 5;

// Score
let playerScore = 0;
let computerScore = 0;
const winningScore = 7;

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

  // Ball
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();

  // Score
  context.font = '32px Courier New';
  context.fillText(playerScore, 20, canvas.height / 2 + 50);
  context.fillText(computerScore, 20, canvas.height / 2 - 30);
}

// Create the canvas
function createCanvas() {
  canvas.width = width;
  canvas.height = height;
  body.append(canvas);
  renderCanvas();
}

createCanvas();
