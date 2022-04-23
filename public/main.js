let world;

let wnx = window.innerWidth;
let wny = window.innerHeight;

function setup() {
  refVector = createVector(1, 0);
  // Create game instance
  stats = new Stats();
  // Load assets
  let bckg = new Background();

  // Create World instance
  world = new World(isMobile ? 2 : 4, bckg);
  frameRate(120);
  createCanvas(wnx, wny);
}

function initGame() {
  // Display menu screen
  stats.newAttempt();

  world.reset();
}


function draw() {
  // Update every actor
  world.update();
  // Render every actor
  world.render();

  stats.renderMenu();
}