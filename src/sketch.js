let numballs = 3;
let balls = [];
let weightCap = 200
let weights = balls.map((item) => item.weight);
let values = balls.map((item) => item.value);
let castleLife = 0;
let selectedBalls = [];
let selectedBallsWeight = 0;
let initGame = false;

//Game State


let img;
let imgCastle;

function setup() {
  createCanvas(windowWidth, windowHeight * 0.90);
  generateBalls();
  castleLife = maxKnapsack(balls, 200);
  button = createButton('Shoot!');
}

function buttonPressed() {
  alert("FIRE");
}

function preload() {
  img = loadImage('assets/cannon.jpg');
  imgCastle = loadImage('assets/castle.png');
}

function cannonDraw() {
  stroke(255, 0, 0);
  noFill();
  rect(windowWidth * 0.09, windowHeight * 0.60, 200, 15, 20);
  fill(0);
  rect(windowWidth * 0.09, windowHeight * 0.60, selectedBallsWeight, 15, 20);
  fill(0, 0, 0);
  strokeWeight(1);
  stroke(255, 0, 0);
  text("Free Weight: " + (weightCap - selectedBallsWeight), windowWidth * 0.12, windowHeight * 0.65);
  image(img, windowWidth * 0.1, windowHeight * 0.67, 150, 150);
}

function castleDraw() {
  stroke(0, 255, 0);
  strokeWeight(12);
  line(windowWidth * 0.6, windowHeight * 0.26, windowWidth * 0.83, windowHeight * 0.26);
  fill(0, 0, 0);
  strokeWeight(1);
  text("Castle HP: " + castleLife, windowWidth * 0.69, windowHeight * 0.23);
  image(imgCastle, windowWidth * 0.6, windowHeight * 0.3, 400, 400);
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (!initGame) {
      initGame = true;
    }
  }
}


function draw() {
  if (initGame) {
    background(255, 255, 255);
    castleDraw();
    cannonDraw();
    balls.forEach(ball => {
      ball.display();
    })
    let col = color(25, 23, 200);
    button.position(windowWidth * 0.125, windowHeight * 0.90);
    button.mousePressed(buttonPressed);
  } else {
    renderHomeScreen();
  }
}

function renderHomeScreen() {
  background(105, 105, 105);
  textStyle(BOLD);
  textSize(80);
  text('Castle Desctruction', width / 2, height / 3);
  textSize(width * 0.015);
  fill(255, 255, 255);
  textAlign(CENTER, TOP);
  text('Press Enter to start the game ...', width / 2, height / 2);
  textSize(24);
  textAlign(CENTER, CENTER);
  text('you only have one cannon shot to destroy the enemy castle,\n so respect the weight supported by the cannon. the ammunition\n has different levels of damage so choose the best combination between the ammunition.\n to choose just click on the chosen ammo and finally shoot', width / 3, height / 1.25);
  textAlign(CENTER, BOTTOM);
}

function mouseClicked() {
  balls.forEach(ball => {
    if (dist(ball.x, ball.y, mouseX, mouseY) < 85 / 2) {
      if (!ball.selected && (selectedBallsWeight + ball.weight) <= weightCap) {
        console.log(selectedBallsWeight + ball.weight)
        ball.selected = true;
        selectedBallsWeight += ball.weight;
        selectedBalls.push(ball);
      } else if (ball.selected) {
        selectedBalls = selectedBalls.filter(
          item => item.value !== ball.value && item.weight !== ball.weight
        );
        selectedBallsWeight -= ball.weight;
        ball.selected = false;
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

