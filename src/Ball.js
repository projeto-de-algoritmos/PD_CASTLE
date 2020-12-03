class Ball {
  constructor(x, y, weight, value) {
    this.x = x;
    this.y = y;
    this.weight = weight;
    this.value = value;
  }

  display() {
    noStroke();
    fill(0, 204);
    ellipse(this.x, this.y, 85);
    fill(255, 255, 255);
    text('Value: ' + this.value, this.x / 1.40, this.y);
    text('Weight: ' + this.weight, this.x / 1.40, this.y + 15);
  }
}