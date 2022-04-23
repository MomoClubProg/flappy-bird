const SPEED = (isMobile ? 2.5 : 3.25);
const COLLISON_RANGE = isMobile ? 3 : 3;
class Pipe {
  constructor(x, gapHeight) {
    this.x = x;
    this.y = gapHeight;
    this.gapSize = isMobile ? 175 : 120;
    this.width = 50;
    this.speed = SPEED;

    //this.image = loadImage('./assets/pipe.png');
  }

  render() {
    noStroke();
    fill(200);
    rect(this.x, this.y, this.width, wny - this.y)
    rect(this.x, 0, this.width, this.y - this.gapSize)
  }

  checkScore(worldInstance, statInstance, bird) {
    let diff = (this.x + this.width) - bird.x;
    // If distance between those two points is between -1.5 and 1.5
    if (diff <= COLLISON_RANGE && diff >= -COLLISON_RANGE) {
      statInstance.score.current++;
      worldInstance.incrementNearestPipe();
    }
  }

  update() {
    if (this.x <= -this.width) {
      this.x = wnx;
      this.y = random(wny / 2, wny - (wny / 4));
    } else {
      this.x = this.x - this.speed;
    }
    this.speed += 0.001;
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