let canvas;
let context;

const blockSize = 25;
const canvasTotalRow = 20;
const canvasTatalCol = 20;
const snakeBody = [];

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let speedX = 0;
let speedY = 0;
let foodX;
let foodY;
let score = 0;

let gameover = false;

const GameStart = function () {
  canvas = document.getElementById("canvas");
  canvas.width = canvasTotalRow * blockSize;
  canvas.height = canvasTatalCol * blockSize;
  context = canvas.getContext("2d");

  generateFood();

  document.addEventListener("keyup", setDirection);

  setInterval(update, 1000 / 10);
};

window.onload = GameStart();

function update() {
  if (gameover) {
    return;
  }

  context.fillStyle = "green";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    score++;
    document.getElementById("scoreCount").innerText = score;

    generateFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "white";
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX > canvasTotalRow * blockSize - 1 ||
    snakeY < 0 ||
    snakeY > canvasTatalCol * blockSize - 1
  ) {
    gameover = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameover = true;
      alert("Game Over!....Snake eat itself");
    }
  }
}

function generateFood() {
  foodX = Math.floor(Math.random() * canvasTotalRow) * blockSize;
  foodY = Math.floor(Math.random() * canvasTatalCol) * blockSize;
}

function setDirection(event) {
  if ((event.code == "ArrowUp" || event.code == "KeyW") && speedY != 1) {
    speedX = 0;
    speedY = -1;
  } else if (
    (event.code == "ArrowDown" || event.code == "KeyS") &&
    speedY != -1
  ) {
    speedX = 0;
    speedY = 1;
  } else if (
    (event.code == "ArrowLeft" || event.code == "KeyA") &&
    speedX != 1
  ) {
    speedX = -1;
    speedY = 0;
  } else if (
    (event.code == "ArrowRight" || event.code == "KeyD") &&
    speedX != -1
  ) {
    speedX = 1;
    speedY = 0;
  }
}
