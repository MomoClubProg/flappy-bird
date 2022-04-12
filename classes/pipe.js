class Pipe {
  constructor(x, gapHeight) {
    this.x = x;
    this.y = gapHeight;
    this.gapSize = 100;
    this.width = 50;
    this.image = loadImage('../assets/pipe.png');
  }
  render() {
    noStroke();
    rect(this.x, this.y, this.width, 600 - this.y)
    rect(this.x, 0, this.width, this.y - this.gapSize)
  }
  update() {
    if (this.x+this.width==wnx/2) {
      console.log('Hello world')
      score++;
    }
    if (this.x <= -this.width) {
      this.x = wnx;
      this.y = random(100, 500);
    } else {
      this.x = this.x - 1;
    }
  }
  isColliding(bird) {
    return (
      300 > this.x &&
      300 < this.x + this.width &&
      (bird.y < this.y - this.gapSize ||
        bird.y > this.y)
    );
  }
}