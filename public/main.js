let world;

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
  frameRate(60);
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