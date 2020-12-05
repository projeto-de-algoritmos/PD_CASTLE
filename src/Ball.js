class Ball {
  constructor(x, y, weight, value) {
    this.x = x;
    this.y = y;
    this.weight = weight;
    this.value = value;
    this.selected = false;
    this.hide = false;
    this.info = true;
    this.finished = false;
  }

  toCannon() {
    this.interval = setInterval(() => {
      if (this.x <= Math.ceil(windowWidth * 0.15)) {
        this.x += 4;
      } else {
        this.y += 4;
        if (this.y >= Math.ceil(windowHeight * 0.60)) {
          this.hide = true;
          clearInterval(this.interval);
        }
      }
    }, 0.01)
  }

  fire() {
    this.interval = setInterval(() => {
      if (this.x <= width / 2.2) {
        console.log(this.x)
        this.x++;
        this.y--;
      } else {
        this.x++;
        this.y++;
        if (this.y >= Math.ceil(windowHeight * 0.60)) {
          this.hide = true;
          this.finished = true;
          clearInterval(this.interval);
        }
      }
    }, 1)
  }

  display() {
    if (!this.hide) {
      noStroke();
      if (this.selected) {
        fill(255, 0, 0);
      } else {
        fill(0, 204);
      }
      ellipse(this.x, this.y, 85);
      fill(255, 255, 255);
      textSize(9);
      if (this.info) {
        text('Damage: ' + this.value * 10, width * 0.05, this.y);
        text('Weight: ' + this.weight * 10, width * 0.05, this.y + 15);
      }
    } else {
      return;
    }
  }
}