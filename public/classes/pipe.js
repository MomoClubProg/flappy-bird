let SPEED = (isMobile ? 2 : 3.25);

class Pipe {
  constructor(x, gapHeight) {
    this.x = x;
    this.y = gapHeight;
    this.gapSize = 120;
    this.width = isMobile ? 42 : 50;
    this.speed = SPEED;
    this.collisionRange = 3;

    //this.image = loadImage('./assets/pipe.png');
  }

  render() {
    noStroke();
    fill(200);
    rect(this.x, this.y, this.width, wny - this.y)
    rect(this.x, 0, this.width, this.y - this.gapSize)
  }

  checkScore(bird) {
    let diff = (this.x + this.width) - bird.pos.x;
    // If distance between those two points is between -1.5 and 1.5
    if (diff <= this.collisionRange && diff >= -this.collisionRange) {
      stats.score.current++;
      world.incrementNearestPipe();
    }
  }

  update() {



    if (this.x <= -this.width) {
      this.x = wnx;
      this.y = random(wny / 3.5, wny - (wny / 3.5));
    } else {
      this.x = this.x - this.speed;
    }

    this.speed += 0.001;
    this.collisionRange += 0.001;
  }

  isColliding(bird) {
    return (
      wnx / 2 > this.x - 3 &&
      wnx / 2 < this.x + this.width + 3 &&
      (bird.y < this.y - this.gapSize + 3 ||
        bird.y > this.y - 3)
    );
  }

}