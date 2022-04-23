let GRAVITY = isMobile ? 0.48 : 0.36;
let FRICTION = isMobile ? 0.94 : 0.95;

class Bird {
  constructor(x, y) {
    this.vy = 0;
    this.ay = 0;
    this.pos = createVector(x, y);
    this.dir = createVector(1, 0);
    this.color = color(255, 255);
    this.size = 18;
    this.jumpThreshold = 0;
    //this.bird = loadImage('./assets/bird.png');
  }

  isColliding(pipe) {
    return (
      this.pos.x > pipe.x - 9 &&
      this.pos.x < pipe.x + pipe.width + 9 &&
      (this.pos.y < pipe.y - pipe.gapSize + 11 ||
        this.pos.y > pipe.y - 11)
    );
  }

  render() {
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size);
    if (!world.pause) {
      strokeWeight(3);
      stroke(255, 180, 35);
      line(
        this.pos.x,
        this.pos.y,
        this.pos.x + this.dir.x * ((this.size - 2) / 2),
        this.pos.y + this.dir.y * ((this.size - 2) / 2)
      );
    }
  }

  isOutOfBounds() {
    return this.pos.y <= 0 || this.pos.y >= wny;
  }

  getAngle = () => World.normal.angleBetween(this.dir);

  update() {
    // Bird's gravity
    this.ay -= GRAVITY;
    this.vy -= this.ay
    this.vy = this.vy < -12 ? -12 : this.vy;


    // Bird's rotation
    if (this.getAngle() < HALF_PI) this.dir.rotate(0.05);

    this.pos.y = this.pos.y + this.vy;
    this.vy *= FRICTION;
    this.ay *= 0;
    this.jumpThreshold++;
  }

  jump() {
    // Wait at least 5 frames for a new jump
    if (this.jumpThreshold > 5) {
      this.jumpThreshold = 0;

      // Add force upwards
      this.ay = 10.8;

      // Rotate bird
      let angle = this.getAngle();

      if (angle > -HALF_PI + 1.8) {
        this.dir.rotate(-1.414);
      } else {
        this.dir.x = 0.35; // Set bird direction up(at an angle) with cartesian coordinates & normalize
        this.dir.y = -0.65;
        this.dir.normalize();
      }
    }
  }
}