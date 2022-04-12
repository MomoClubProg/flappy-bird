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
    background(51);

    pipes.forEach(pipe => pipe.update());
    bird.update();
    if (
        pipes.map(pipe => pipe.isColliding(bird))
            .includes(true)
    ) noLoop();

    if(bird.isOutOfBounds()) noLoop();


    bird.render();
    pipes.forEach(pipe => pipe.render());
}

function keyPressed() {
    if (keyCode === 32) {
        bird.jump();
    }
}