class World {
  constructor(
    pipeNumber,
    background
  ) {

    // Background
    this.background = background;

    // Pipes
    this.pipes = [];
    this.offsetFunc = isMobile ? World.mobilePipeOffset : World.desktopPipeOffset;
    this.nearestPipe = 0;
    for (let i = 0; i < pipeNumber; i++) {
      let offset = this.offsetFunc(i, pipeNumber);
      this.pipes.push(new Pipe(
        offset,
        random(250, wny - 250)
      ));
    }

    this.pause = false;
    this.pausedTick = 0;

    // Bird
    this.bird = new Bird(wnx / (isMobile ? 3 : 2), wny / 2);
  }
  static delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  static desktopPipeOffset(i, pipeNumber) {
    return i * wnx / pipeNumber + ((pipeNumber - 1) * wnx) / pipeNumber;
  }

  static mobilePipeOffset(i, pipeNumber) {
    return i * (wnx / pipeNumber) + wnx;
  }
  reset() {

  }

  incrementNearestPipe() {
    if (this.nearestPipe < this.pipes.length - 1) {
      this.nearestPipe++;
    } else {
      this.nearestPipe = 0;
    }
  }
  update(statInstance) {

    if (this.pause) {
      this.bird.size += this.pausedTick;
      this.pausedTick += 5;

      return;
    }
    this.pausedTick = 0;

    this.background.update();

    this.pipes.forEach(pipe => {
      pipe.update();
    });
    this.pipes[this.nearestPipe].checkScore(this, statInstance, this.bird);
    this.bird.update();

    // Check if game ended
    if (this.bird.isOutOfBounds()) this.endGame(); // initGame();
    if (this.bird.isColliding(
        this.pipes[this.nearestPipe]
      )) this.endGame();
  }

  render(statInstance) {
    background(80, 200, 255);
    this.background.render();

    // Render Game instances
    this.pipes.forEach((pipe, i) => {
      pipe.render()
    });
    this.bird.render();

    statInstance.renderCounters();
  }

  async endGame() {
    noLoop();
    await World.delay(250);
    world.pause = true;
    loop();
  }

}