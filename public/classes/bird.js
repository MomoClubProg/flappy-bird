const GRAVITY = (isMobile) ? 0.55 : 0.36;
const FRICTION = isMobile ? 0.93 : 0.95;
class Bird {
  constructor(x, y) {
    this.vy = 0;
    this.ay = 0;
    this.x = x;
    this.y = y;
    this.size = 18;
    this.jumpThreshold = 0;
    //this.bird = loadImage('./assets/bird.png');
  }

  isColliding(pipe) {
    return (
      this.x > pipe.x - 3 &&
      this.x < pipe.x + pipe.width + 3 &&
      (this.y < pipe.y - pipe.gapSize + 3 ||
        this.y > pipe.y - 3)
    );
  }

  render() {
    noStroke();
    fill(255);
    circle(this.x, this.y, this.size);
  }

  isOutOfBounds() {
    return this.y <= 0 || this.y >= wny;
  }

  update() {
    this.ay -= GRAVITY;
    this.vy -= this.ay
    this.y = this.y + this.vy;
    this.vy *= FRICTION;
    this.ay *= 0;
    this.jumpThreshold++;
  }
  jump() {
    if (this.jumpThreshold > 3) {
      this.ay = 12;
      this.jumpThreshold = 0;
    }
  }
}