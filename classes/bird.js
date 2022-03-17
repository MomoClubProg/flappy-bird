class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  render() {
    ellipse(this.x, this.y, 10, 10);
  }
}