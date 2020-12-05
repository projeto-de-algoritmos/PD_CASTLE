let numballs = 6;
let balls = [];
let weightCap = 200
let weights = balls.map((item) => item.weight);
let values = balls.map((item) => item.value);
let castleLife = 0;
let selectedBalls = [];
let selectedBallsWeight = 0;
let selectedBallsValues = 0;
let initGame = false;
let gamedEnded = false;
let win = false;
let finalShoot = false;
let readyToShoot = false;

let img;
let imgCastle;

function setup() {
  weight = [];
  values = [];
  castleLife = 0;
  selectedBalls = [];
  selectedBallsWeight = 0;
  selectedBallsValues = 0;
  balls = [];
  createCanvas(windowWidth, windowHeight * 0.90);
  generateBalls();
  castleLife = maxKnapsack(balls, 200);
}

function buttonPressed() {

}

function preload() {
  img = loadImage('assets/cannon.png');
  imgCastle = loadImage('assets/castle.png');
  grass = loadImage('assets/grass.png');
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
  text("Free Weight: " + (weightCap - selectedBallsWeight)*10, windowWidth * 0.14, windowHeight * 0.65);
  image(img, windowWidth * 0.1, windowHeight * 0.67, 150, 150);
  if (readyToShoot) {
    finalShoot.display();
  }
}

function castleDraw() {
  stroke(0, 255, 0);
  strokeWeight(12);
  line(windowWidth * 0.6, windowHeight * 0.26, windowWidth * 0.83, windowHeight * 0.26);
  fill(0, 0, 0);
  strokeWeight(1);
  textSize(16)
  text("Castle HP: " + castleLife * 10, windowWidth * 0.71, windowHeight * 0.23);
  image(imgCastle, windowWidth * 0.6, windowHeight * 0.3, 400, 400);
  if (finalShoot.finished) {
    if (castleLife === selectedBallsValues) {
      gamedEnded = true;
      initGame = false;
      win = true;
    } else {
      gamedEnded = true;
      initGame = false;
      win = false;
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER && !gamedEnded) {
    if (!initGame) {
      initGame = true;
    }
  } else if (keyCode === ENTER && gamedEnded && !initGame) {
    gamedEnded = false;
    setup();
  }
}


function draw() {
  if (initGame) {
    background(grass);
    castleDraw();
    cannonDraw();
    balls.forEach(ball => {
      ball.display();
    })
    fill(255, 0, 0);
    rect(windowWidth * 0.115, windowHeight * 0.85, 100, 40, 20, 20 ,20 ,20)
    fill(0);
    text("Shoot!", windowWidth * 0.14, windowHeight * 0.88)
  } else if (gamedEnded && win) {
    renderEndGameVictory();
  } else if (gamedEnded && !win) {
    renderEndGameLose();
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
  text('You only have one cannon shot to destroy the enemy castle,\n so respect the weight supported by the cannon. the ammunition\n has different levels of damage so choose the best combination between the ammunition.\n to choose just click on the chosen ammo and finally shoot', width / 2, height / 1.25);
  textAlign(CENTER, BOTTOM);
}

function renderEndGameVictory() {
  background(105, 105, 105);
  textStyle(BOLD);
  textSize(80);
  text('CONGRATULATIONS!!! YOU HAVE MADE IT!', width / 2, height / 3);
  textSize(width * 0.015);
  fill(255, 255, 255);
  textAlign(CENTER, TOP);
  text('The castle was successful destroyed', width / 2, height / 2);
  textSize(24);
  textAlign(CENTER, CENTER);
  text('Press Enter to play again!', width / 2, height / 1.25);
  textAlign(CENTER, BOTTOM);
}

function renderEndGameLose() {
  background(105, 105, 105);
  textStyle(BOLD);
  textSize(80);
  text('YOU LOSE!', width / 2, height / 3);
  textSize(width * 0.015);
  fill(255, 255, 255);
  textAlign(CENTER, TOP);
  text('Continue...?', width / 2, height / 2);
  textSize(24);
  textAlign(CENTER, CENTER);
  text('Press Enter to play again', width / 2, height / 1.25);
  textAlign(CENTER, BOTTOM);
}

function mouseClicked() {
  balls.forEach(ball => {
    if (dist(ball.x, ball.y, mouseX, mouseY) < 85 / 2) {
      if (!ball.selected && (selectedBallsWeight + ball.weight) <= weightCap) {
        ball.selected = true;
        selectedBallsWeight += ball.weight;
        selectedBallsValues += ball.value;
        selectedBalls.push(ball);
      } else if (ball.selected) {
        selectedBalls = selectedBalls.filter(
          item => item.value !== ball.value && item.weight !== ball.weight
        );
        selectedBallsWeight -= ball.weight;
        selectedBallsValues -= ball.value;
        ball.selected = false;
      }
    }
  })
}

function mousePressed() {
  //if the mouse is over the rectangle
  if ((mouseX > windowWidth * 0.115) && (mouseX < windowWidth * 0.115 + 100) ||
    (mouseY > windowHeight * 0.88) && (mouseY < windowHeight * 0.88 + 50)) {
    shoot();
  }
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
    let value = Math.round(Math.random() * 70);
    let weight = Math.round(Math.random() * 80 + 50);
    let aux = new Ball(
      windowWidth * 0.05,
      windowHeight * (0.06 + i / 8),
      weight,
      value
    );
    balls.push(aux);
  }
  finalShoot = new Ball(windowWidth * 0.2, windowHeight * 0.67, 200, 200);
  finalShoot.info = false;
}

function shoot() {
  balls.reverse().map(item => {
    if (item.selected) {
      item.toCannon();
      item.info = false;
    }
  })
  setTimeout(() => {
    readyToShoot = true;
    setTimeout(() => {
      finalShoot.fire();
    }, 1500);
  }, 1500);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

