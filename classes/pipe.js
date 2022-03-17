class Pipe {
  constructor(x, gapHeight) {
    this.x = x;
    this.y = gapHeight;
    this.gapSize = 100;
    this.width = 50;
  }
  render() {
    noStroke();
    rect(this.x, this.y, this.width, 600 - this.y)
    rect(this.x, 0, this.width, this.y - this.gapSize)
  }
  update() {
    this.x = this.x - 1;
  }
}