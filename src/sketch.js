let numballs = 3;
let balls = [];
let weightCap = 200
let weights = balls.map((item) => item.weight);
let values = balls.map((item) => item.value);
let castleLife = 0;
let selectedBalls = [];
let selectedBallsWeight = 0;

//Game State


let img;
let imgCastle;

function setup() {
  createCanvas(windowWidth, windowHeight * 0.90);
  generateBalls();
  castleLife = maxKnapsack(balls, 200);
}

function preload() {
  img = loadImage('assets/cannon.jpg');
  imgCastle = loadImage('assets/castle.png');
}

function draw() {
  background(255, 255, 255);
  stroke(0, 255, 0);
  strokeWeight(12);
  line(windowWidth * 0.6, windowHeight * 0.2, windowWidth * 0.9, windowHeight * 0.2);
  fill(0, 0, 0);
  strokeWeight(1);
  text("Castle HP: " + castleLife, windowWidth * 0.72, 100);
  image(imgCastle, windowWidth * 0.6, windowHeight * 0.3, 400, 400);
  fill(0, 0, 0);
  strokeWeight(1);
  stroke(255, 0, 0);
  text("Max Weight: " + weightCap, windowWidth * 0.12, windowHeight * 0.62);
  image(img, windowWidth * 0.1, windowHeight * 0.65, 150, 150);
  balls.forEach(ball => {
    ball.display();
  })
}

function mouseClicked() {
  balls.forEach(ball => {
    if (dist(ball.x, ball.y, mouseX, mouseY) < 85 / 2) {
      ball.selected = !ball.selected;
      if (ball.selected) {
        selectedBallsWeight += ball.weight;
        if (selectedBallsWeight <= weightCap) {
          selectedBalls.push(ball);
        }
      } else {
        selectedBalls = selectedBalls.filter(item => item.value !== ball.value && item.weight !== ball.weight);
        selectedBallsWeight -= ball.weight;
      }
      console.log(selectedBalls);
    }
  })
}

function maxKnapsack(items, W) {
  let cache = [];
  for (g = 0; g < items.length + 1; g++) {
    cache[g] = [];
    for (h = 0; h < W + 1; h++) {
      cache[g][h] = 0;
    }
  }
  let weights = items.map(item => item.weight);
  let values = items.map(item => item.value);
  console.log('weights', weights);
  console.log('values', values);
  for (let i = 0; i < items.length + 1; i++) {
    for (let j = 0; j < W + 1; j++) {
      if (i === 0 || j === 0)
        cache[i][j] = 0;
      else if (weights[i - 1] <= j) {
        let included = values[i - 1] + cache[i - 1][j - weights[i - 1]];
        let excluded = cache[i - 1][j];
        cache[i][j] = Math.max(included, excluded);
      }
      else
        cache[i][j] = cache[i - 1][j]
    }
  }
  return cache[items.length][W];
}

function generateBalls() {
  for (let i = 0; i < numballs; i++) {
    let value = Math.round(Math.random() * 100);
    let weight = Math.round(Math.random() * 100 + 50);
    let aux = new Ball(
      windowWidth * 0.05,
      windowHeight * (0.06 + i / 8),
      weight,
      value
    );
    balls.push(aux);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

