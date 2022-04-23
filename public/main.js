let game;
let world;
let bckg;

let wnx = window.innerWidth;
let wny = window.innerHeight;



let pipeNumber = isMobile ? 2 : 6;


function setup() {
  // Create game instance
  stats = new Stats();

  // Load assets
  bckg = new Background();


  frameRate(120);
  initGame();
  loop();
}

function initGame() {
  noLoop();

  // Display menu screen
  stats.newAttempt();


  // Create World instance
  world = new World(pipeNumber, bckg);

  createCanvas(wnx, wny);
}


function draw() {
  // Update every actor
  world.update(stats);

  // Render every actor
  world.render(stats);

  stats.renderMenu();
}