class Background {
  constructor(backgroundLayers = 4) {
    // Background
    this.imageLayers = [];

    this.ytranslate = [
      wny / 6, -wny / 6,
      isMobile ? wny / 6 : 0,
      isMobile ? wny / 6 : 0
    ];
    this.xoffset = [];

    this.backgroundWidth = isMobile ? (3840 * wny) / 1080 : 3840;
    this.backgroundHeight = isMobile ? wny : 1080;

    for (let i = 0; i < backgroundLayers; i++) {
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
      off -= (i + 1) * 0.2 * SPEED;

      // Restart position if layer is out of range
      if (off <= -this.backgroundWidth) off += this.backgroundWidth;

      return off;
    });
  }

  render() {
    fill(10, 200, 60)
    rect(0, (wny * 3) / 4, wnx, wny / 4);
    for (let i = 0; i < this.imageLayers.length; i++) {
      // Image 1
      image(
        this.imageLayers[i],
        this.xoffset[i],
        i - i * 10 + this.ytranslate[i],
        this.backgroundWidth,
        this.backgroundHeight
      );
      // Image 2
      image(
        this.imageLayers[i],
        this.xoffset[i] + this.backgroundWidth,
        i - i * 10 + this.ytranslate[i],
        this.backgroundWidth,
        this.backgroundHeight
      );
    }

    push();

    fill(0, 0, 0, 100);
    rect(0, 0, wnx, wny);
    pop();
  }
}