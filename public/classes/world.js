class World {
  constructor(n) {

    this.imageLayers = [];
    this.xoffset = [];
    for (let i = 0; i < n; i++) {
      this.imageLayers.push(
        loadImage(`./assets/background/layer${i}.png`)
      );
      this.xoffset.push((i + 1) * 1);
    }

  }

  update() {
    // Offset each layer
    this.xoffset = this.xoffset.map((off, i) => {
      // Increment offset (first element being slower than the last)
      off -= (i + 1) * 0.5 * SPEED;

      // Restart position if layer is out of range
      if (off <= -wnx * 2) off += wnx * 2;

      return off;
    });
  }


  render() {
    background(80, 200, 255);
    for (let i = 0; i < this.imageLayers.length; i++) {
      // Image 1
      image(
        this.imageLayers[i],
        this.xoffset[i],
        i * -10,
        3840,
        1080
      );
      // Image 2
      image(
        this.imageLayers[i],
        this.xoffset[i] + 2 * (wnx),
        i * -10,
        3840,
        1080
      );
    }

    push();
    fill(0, 0, 0, 80);
    rect(0, 0, wnx, wny);
    pop();
  }
}