let bird;
let pipe;
let wnx = 600;
let wny = 600;

function setup() {
  pipe = new Pipe(600, random(100, 500))
  bird = new Bird(300, 300);
  createCanvas(wnx, wny);
}

function draw() {
  background(51);
  pipe.update();
  bird.render();
  pipe.render();
}