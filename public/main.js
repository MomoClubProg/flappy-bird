let bird;
let game;
let world;
let pipes = [];

let wnx = 1920;
let wny = 1080;
let pipeNumber = 6;


function setup() {
  // Create game instance
  game = new Game();

  initGame();
  loop();
}

function initGame() {
  noLoop();

  // Display menu screen
  game.renderMenu();
  game.newAttempt();


  // Create World instance
  world = new World(4);

  // Initiate pipes;
  pipes = [];
  for (let i = 0; i < pipeNumber; i++) {
    pipes.push(new Pipe(
      i * wnx / pipeNumber + ((pipeNumber - 1) * wnx) / pipeNumber,
      random(250, wny - 250)
    ));
  }

  // Create player
  bird = new Bird(wnx / 2, wny / 2);

  createCanvas(wnx, wny);
}


function draw() {
  // Update every actor
  world.update();
  pipes.forEach(pipe => {
    pipe.update();
    pipe.checkScore(game);
  });
  bird.update();

  // Check if game ended
  if (bird.isOutOfBounds()) initGame();
  if (bird.isColliding(pipes)) initGame();

  // Render every actor
  world.render();
  pipes.forEach(pipe => pipe.render());
  bird.render();

  game.renderCounters();
}