let bird;
let pipes = [];
let wnx = 600;
let wny = 600;

function setup() {
    pipes.push(new Pipe(600, random(100, 500)));
    pipes.push(new Pipe(900, random(100, 500)));
    bird = new Bird(300, 300);
    createCanvas(wnx, wny);
}

function draw() {
    // Background 
    background(51);


    // Update every actor
    pipes.forEach(pipe => pipe.update());
    bird.update();

    // Check if game ended
    if(bird.isOutOfBounds()) noLoop();
    if(bird.isColliding(pipe)) noLoop();


    // Render every actor
    pipes.forEach(pipe => pipe.render());
    bird.render();
}

function keyPressed() {
    if (keyCode === 32) bird.jump();
}