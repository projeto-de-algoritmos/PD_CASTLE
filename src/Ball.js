class Ball {
  constructor(x, y, weight, value) {
    this.x = x;
    this.y = y;
    this.weight = weight;
    this.value = value;
    this.selected = false;
  }

  display() {
    noStroke();
    if(this.selected) {
      fill(255,0,0);
    } else {
      fill(0, 204);
    }
    ellipse(this.x, this.y, 85);
    fill(255, 255, 255);
    textSize(11);
    text('Damage: ' + this.value, this.x / 1.45, this.y);
    text('Weight: ' + this.weight, this.x / 1.45, this.y + 15);
  }
}