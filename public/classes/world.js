class World {
  constructor(
    pipeNumber,
    background
  ) {

    // Background
    this.background = background;

    // Pipes
    this.gapSize = World.SETTINGS.GAP_SIZE;
    this.pipes = [];
    this.offsetFunc = isMobile ? World.mobilePipeOffset : World.desktopPipeOffset;
    this.nearestPipeIndex = 0;
    for (let i = 0; i < pipeNumber; i++) {
      let offset = this.offsetFunc(i, pipeNumber);
      this.pipes.push(new Pipe(
        offset,
        random(250, wny - 250),
        this.gapSize
      ));
    }

    // Pause
    this.pause = false;
    this.pausedTick = 0;
    this.startScreen = true;
    // Bird
    this.bird = new Bird(wnx / (isMobile ? 3 : 2), wny / 2);
    this.tick = 0;
  }
  static normal = new p5.Vector(1, 0);

  static delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  static desktopPipeOffset(i, pipeNumber) {
    return i * wnx / pipeNumber + ((pipeNumber - 1) * wnx) / pipeNumber - 28;
  }

  static mobilePipeOffset(i, pipeNumber) {
    return i * (wnx / pipeNumber) + wnx - 26;
  }

  // Get Game mode from link queries
  static getGameMode() {
    let queries = window.location.href.split('?')[1];

    if (queries === undefined) return "normal";
    let q = queries.split('&');
    let gameMode;
    for (let i = 0; i < q.length; i++) {
      let s = q[i].split('=');
      if (s[0] === 'd') {
        gameMode = s[1]
      }
    }
    return gameMode || "normal";
  }

  reset() {
    // Background
    this.background.reset();
    this.startScreen = false;

    // Pipes
    let pipeNumber = this.pipes.length;
    this.pipes = [];
    this.nearestPipeIndex = 0;
    for (let i = 0; i < pipeNumber; i++) {
      let offset = this.offsetFunc(i, pipeNumber);
      this.pipes.push(new Pipe(
        offset,
        random(250, wny - 250),
        this.gapSize
      ));
    }

    // Pause
    this.pause = false;
    this.pausedTick = 0;

    // Bird
    this.bird = new Bird(wnx / (isMobile ? 3 : 2), wny / 2);
    this.tick = 0;
  }

  incrementNearestPipe() {
    if (this.nearestPipeIndex < this.pipes.length - 1) {
      this.nearestPipeIndex++;
    } else {
      this.nearestPipeIndex = 0;
    }
  }

  updatePause() {
    if (this.pausedTick > 200) return;
    this.bird.size += this.pausedTick;
    this.pausedTick += 4;
  }

  update(dt) {
    if (this.pause) {
      this.updatePause();
      return;
    }
    this.pausedTick = 0;
    this.background.update(dt);
    if (this.startScreen) return; // Stop after updating background

    this.pipes.forEach(pipe => {
      pipe.update(dt);
    });

    this.pipes[this.nearestPipeIndex].checkScore(this.bird);
    this.bird.update(dt);

    // Check if game ended
    // 1. Out of game boundaries
    if (this.bird.isOutOfBounds()) this.endGame();
    // 2. Bird is colliding with pipe
    if (this.bird.isColliding(
        this.pipes[this.nearestPipeIndex]
      )) this.endGame();

    this.tick++;
  }

  render() {
    this.background.render();


    // Render Game instances
    this.pipes.forEach(pipe => {
      pipe.render()
    });
    this.bird.render();

    stats.renderCounters();


    if (this.startScreen) {
      let fontSize = constrain(wnx / 18, 12, 48);
      textSize(fontSize);

      text("▲  Tap to start!", this.bird.pos.x - fontSize / 2, this.bird.pos.y + fontSize * 1.8);
    };


  }

  async endGame() {
    this.bird.color.setAlpha(160);
    noLoop();
    await World.delay(250);
    world.pause = true;
    loop();
  }


  // LIVE DEMO Methods
  setGaps(n = 120) {
    this.gapSize = n;
    this.pipes.forEach(pipe => {
      pipe.gapSize = n;
    })
  }

}