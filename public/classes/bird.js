class Bird {
  constructor(x, y) {
    this.vy = 0;
    this.ay = 0;
    this.x = x;
    this.y = y;
    //this.bird = loadImage('./assets/bird.png');
  }

  isColliding(pipe) {
    return (
      wnx / 2 > pipe.x - 3 &&
      wnx / 2 < pipe.x + pipe.width + 3 &&
      (this.y < pipe.y - pipe.gapSize + 3 ||
        this.y > pipe.y - 3)
    );
  }

  render() {
    fill(255)
    ellipse(this.x, this.y, 18, 18);
  }

  isOutOfBounds() {
    return this.y <= 0 || this.y >= wny;
  }

  update() {
    this.ay -= 0.3;
    this.vy -= this.ay
    this.y = this.y + this.vy;
    this.vy *= 0.97;
    this.ay *= 0;
  }
  jump() {
    this.ay = 9
  }
}