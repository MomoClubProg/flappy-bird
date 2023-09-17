const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function jumpKey() {
  console.log('JUMP');

  if (world.startScreen) {
    world.pause = false;
    world.startScreen = false;
    loop();
  } else if (world.pause) {
    world.pause = false;
    initGame();
    loop();
  } else {
    world.bird.jump(deltaTime);
    console.trace();
  }

}

function keyPressed() {
  if (keyCode === 32) {
    jumpKey();
  }
}

function touchStarted() {
  if (event.type != 'touchstart') return true
  jumpKey();
}

function getUniqueID() {
  // Get ID from server
  return "3834738478374" // dummy ID
}

// Save an instance of this class to `localStorage`
class Stats {
  constructor() {
    let item = localStorage.getItem(`FlappyBirdSession${GAME_MODE}`);
    if (item === null) {
      this.user = {
        name: getUniqueID(),
      }
      this.platform = isMobile ? "mobile" : "desktop";
      this.score = {
        current: 0,
        high: 0,
        attempts: 0
      }
      this.settings = {};
    } else {
      this.load(JSON.parse(item));
    }
  }

  load(data) {
    this.user = data.user;
    this.score = data.score;
    this.platform = isMobile ? "mobile" : "desktop";
  }

  renderMenu() {
    if (!world.pause) return;
    noStroke(0);
    fill(0);

    textSize(72)
    textAlign(CENTER);
    text("Perdu!", wnx / 2, wny / 2);

    textSize(wnx / 18);
    textAlign(CENTER);
    text("Appuyez pour recommencer", wnx / 2, wny / 2 + (wny / 12));
  }

  newAttempt() {
    this.score.current = 0;
    this.score.attempts++;

    localStorage.setItem(`FlappyBirdSession${GAME_MODE}`, JSON.stringify(this));
  }

  // update high score
  setHighScore() {
    if (this.score.high < this.score.current)
      this.score.high = this.score.current;
  }

  // Render counters & update high score
  renderCounters() {
    noStroke();

    if (world.pause)
      fill(0);
    else
      fill(255)

    textSize(20);
    textAlign(LEFT);

    if (GAME_MODE !== 'normal') text(`Mode ${World.TRANSLATION[GAME_MODE]}`, 20, wny - 20);
    text("Essais: " + this.score.attempts, 20, 30);
    text("Record: " + this.score.high, 20, 50);
    text("Score: " + this.score.current, 20, 70);

    this.setHighScore();
  }
}

class Background {
  constructor(backgroundLayers = 4) {
    // Background
    this.imageLayers = [];
    this.backgroundWidth = isMobile ? (3840 * wny) / 1080 : 3840;
    this.backgroundHeight = isMobile ? wny : 1080;

    this.ytranslate = [
      wny / 6, -wny / 6,
      isMobile ? wny / 6 : 0,
      isMobile ? wny / 6 : -wny / 32
    ];

    this.xoffset = new Array(backgroundLayers).fill(0);

    for (let i = 0; i < backgroundLayers; i++) {
      this.imageLayers.push(
        loadImage(`./assets/background/layer${i}.png`)
      );
    }


  }

  reset() {
    this.xoffset = new Array(this.xoffset.length).fill(0);
  }

  update(dt) {
    // Offset each layer
    this.xoffset = this.xoffset.map((off, i) => {
      // Increment offset (first element being slower than the last)
      off -= (i + 1) * 0.2 * World.SETTINGS.SPEED * dt;

      // Restart position if layer is out of range
      if (off <= -this.backgroundWidth) off += this.backgroundWidth;

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

const wnx = window.innerWidth;
const wny = window.innerHeight;
const GAME_MODE = World.getGameMode(); // Change for different difficulty
// Should be affected by http queries, not hardcoded in .
// raw.githack does not support http queries
// Our own self-hosted server could (nodejs, express)

World.SETTINGS = ({
  dev: {
    SPEED: isMobile ? 0.22 : 0.27,
    GRAVITY: isMobile ? 0.05 : 0.05,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.9 : 1.2,
    PIPE_WIDTH: isMobile ? 42 : 50,
    GAP_SIZE: wny / 6.5,
    NOISE: false,
    NOISE_SPEED: 0
  },
  easy: {
    SPEED: isMobile ? 0.18 : 0.2,
    GRAVITY: isMobile ? 0.05 : 0.05,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.9 : 1.2,
    PIPE_WIDTH: isMobile ? 38 : 50,
    GAP_SIZE: wny / 5,
    NOISE: false,
    NOISE_SPEED: 0
  },
  normal: {
    SPEED: isMobile ? 0.22 : 0.29,
    GRAVITY: isMobile ? 0.05 : 0.05,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 1.1 : 1.6,
    PIPE_WIDTH: isMobile ? 44 : 54,
    GAP_SIZE: wny / 5.8,
    NOISE: false,
    NOISE_SPEED: 0
  },
  hard: {
    SPEED: isMobile ? 0.25 : 0.3,
    GRAVITY: isMobile ? 0.05 : 0.05,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.9 : 1.2,
    PIPE_WIDTH: isMobile ? 50 : 58,
    GAP_SIZE: wny / 6.5,
    NOISE: true,
    NOISE_SPEED: 0.0025
  }
})[GAME_MODE];

World.TRANSLATION = {
  dev: "Dévelopement",
  easy: "Facile",
  normal: "",
  hard: "Difficile"
}

class Pipe {
  constructor(x, gapHeight, gapSize) {
    this.x = x;
    this.y = gapHeight;
    this.gapSize = gapSize;
    this.width = World.SETTINGS.PIPE_WIDTH;
    this.speed = World.SETTINGS.SPEED;
    this.collisionRange = 3;

    this.ran = random(0, 10000);
    //this.image = loadImage('./assets/pipe.png');
  }

  render() {
    noStroke();
    fill(200);
    rect(this.x, this.y, this.width, wny - this.y)
    rect(this.x, 0, this.width, this.y - this.gapSize)
  }

  checkScore(bird) {
    let diff = (this.x + this.width) - bird.pos.x;
    // If distance between those two points is between -1.5 and 1.5
    if (diff <= this.collisionRange && diff >= -this.collisionRange) {
      stats.score.current++;
      world.incrementNearestPipe();
    }
  }

  update(dt) {

    if (this.x <= -this.width) {
      this.x = wnx;
      this.y = random(wny / 3.5, wny - (wny / 3.5));
    } else {
      this.x = this.x - (this.speed * dt);
    }

    this.speed += 0.0000625;
    this.collisionRange += 0.0000625 * dt;

    if (World.SETTINGS.NOISE) {
      this.y = wny / 2 * noise(world.tick * World.SETTINGS.NOISE_SPEED + this.ran) + wny / 4;
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

class Bird {
  constructor(x, y) {
    this.vy = 0;
    this.ay = 0;
    this.pos = createVector(x, y);
    this.dir = createVector(1, 0);
    this.color = color(255, 255);
    this.size = 18;
    this.jumpThreshold = 0;
    //this.bird = loadImage('./assets/bird.png');
  }

  isColliding(pipe) {
    return (
      this.pos.x > pipe.x - 9 &&
      this.pos.x < pipe.x + pipe.width + 11 &&
      (this.pos.y < pipe.y - pipe.gapSize + 11 ||
        this.pos.y > pipe.y - 11)
    );
  }

  render() {
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size);
    if (!world.pause) {
      strokeWeight(3);
      stroke(255, 180, 35);
      line(
        this.pos.x,
        this.pos.y,
        this.pos.x + this.dir.x * ((this.size - 2) / 2),
        this.pos.y + this.dir.y * ((this.size - 2) / 2)
      );
    }
  }

  isOutOfBounds() {
    return this.pos.y <= 0 || this.pos.y >= wny;
  }

  getAngle = () => World.normal.angleBetween(this.dir);

  update(dt) {
    // Bird's gravity
    this.ay -= World.SETTINGS.GRAVITY;
    this.vy -= this.ay

    if (this.vy < -World.SETTINGS.JUMP_HEIGHT) this.vy = -World.SETTINGS.JUMP_HEIGHT;

    // Bird's rotation
    if (this.getAngle() < HALF_PI) this.dir.rotate(0.003125 * dt);

    this.pos.y = this.pos.y + (this.vy * dt);
    this.vy *= World.SETTINGS.FRICTION;
    this.ay *= 0;
    this.jumpThreshold++;
  }

  jump(dt) {
    // Wait at least 5 frames for a new jump
    if (this.jumpThreshold > (0.5 * dt)) {
      this.jumpThreshold = 0;

      // Add force upwards
      this.ay = World.SETTINGS.JUMP_HEIGHT;

      // Rotate bird
      if (this.getAngle()) {
        this.dir.x = 0.35; // Set bird direction up(at an angle) with cartesian coordinates & normalize
        this.dir.y = -0.65;
        this.dir.normalize();
      }
    }
  }
}

let world;
let DT;

function preload() {
  refVector = createVector(1, 0);
  // Create game instance
  stats = new Stats();
}

function setup() {
  // Load assets
  let bckg = new Background();

  // Create World instance
  world = new World(isMobile ? 2 : 5, bckg);
  createCanvas(wnx, wny);
  frameRate(80);
}

function initGame() {
  // Display menu screen
  stats.newAttempt();

  world.reset();

}


function draw() {
  // Update every actor
  world.update(deltaTime);
  // Render every actor
  world.render();

  stats.renderMenu();
}