const SPEED = 1.3;
class Pipe {
  constructor(x, gapHeight) {
    this.x = x;
    this.y = gapHeight;
    this.gapSize = 120;
    this.width = 50;
    this.speed = 2.5 * SPEED;
    //this.image = loadImage('./assets/pipe.png');
  }

  render() {
    noStroke();
    rect(this.x, this.y, this.width, wny - this.y)
    rect(this.x, 0, this.width, this.y - this.gapSize)
  }

  checkScore(game) {
    if (this.x + this.width == wnx / 2) {
      game.score.current++;
    }
  }

  update() {
    if (this.x <= -this.width) {
      this.x = wnx;
      this.y = random(250, wny - 250);
    } else {
      this.x = this.x - this.speed;
    }
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