let bird;
let game;
let world;
let pipes = [];

let wnx = 1920;
let wny = 1080;
let pipeNumber = 6;

function setup() {
  // Create game instance
  stats = new Stats();

  initGame();
  loop();
}

function initGame() {
  noLoop();

  // Display menu screen
  stats.newAttempt();


  // Create World instance
  world = new World(4, 6);

  createCanvas(wnx, wny);
}


function draw() {
  // Update every actor
  world.update(stats);

  // Render every actor
  world.render(stats);
}