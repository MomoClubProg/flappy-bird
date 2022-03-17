let bird = new Bird(300, 300);

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(51);
  bird.render();
}