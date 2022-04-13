class Bird {
  constructor(x, y) {
    this.vy = 0;
    this.ay = 0;
    this.x = x;
    this.y = y;
    //this.bird = loadImage('./assets/bird.png');
  }
  isColliding = (pipes) => pipes.map(pipe =>
    pipe.isColliding(this)
  ).includes(true);

  render() {
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