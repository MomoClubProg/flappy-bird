class World {
  constructor(
    backgroundLayers,
    pipeNumber = 3
  ) {

    // Background
    this.imageLayers = [];
    this.xoffset = [];
    for (let i = 0; i < backgroundLayers; i++) {
      this.imageLayers.push(
        loadImage(`./assets/background/layer${i}.png`)
      );
      this.xoffset.push((i + 1) * 1);
    }

    // Pipes
    this.pipes = [];
    this.nearestPipe = 0;
    for (let i = 0; i < pipeNumber; i++) {
      this.pipes.push(new Pipe(
        i * wnx / pipeNumber + ((pipeNumber - 1) * wnx) / pipeNumber,
        random(250, wny - 250)
      ));
    }

    // Bird
    this.bird = new Bird(wnx / 2, wny / 2);
  }
  incrementNearestPipe() {
    if (this.nearestPipe < this.pipes.length - 1) {
      this.nearestPipe++;
    } else {
      this.nearestPipe = 0;
    }
  }
  update(statInstance) {
    this.updateBackground();

    this.pipes.forEach(pipe => {
      pipe.update();
    });
    this.pipes[this.nearestPipe].checkScore(this, statInstance);
    this.bird.update();

    // Check if game ended
    if (this.bird.isOutOfBounds()) initGame();
    if (this.bird.isColliding(
        this.pipes[this.nearestPipe]
      )) initGame();
  }

  render(statInstance) {
    background(80, 200, 255);
    this.renderBackground()

    // Render Game instances
    this.pipes.forEach((pipe, i) => {
      if (i === this.nearestPipe)
        fill(255, 100, 50)
      else
        fill(255)

      pipe.render()
    });
    this.bird.render();

    statInstance.renderCounters();
  }

  updateBackground() {
    // Offset each layer
    this.xoffset = this.xoffset.map((off, i) => {
      // Increment offset (first element being slower than the last)
      off -= (i + 1) * 0.5 * SPEED;

      // Restart position if layer is out of range
      if (off <= -wnx * 2) off += wnx * 2;

      return off;
    });
  }

  renderBackground() {

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