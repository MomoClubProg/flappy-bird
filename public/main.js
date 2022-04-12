let bird;
let world;
let pipes = [];
let wnx = 1920;
let wny = 1080;


function restartMenu(){

    stroke(255)
    fill(255)
    /*textSize(72)
    textAlign(CENTER);0
    text("YOU LOST",300,300);*/

    textSize(50);
    textAlign(CENTER);
    text("Press space to start",300, 350);

}



function initGame() {

    noLoop();
    restartMenu();
    pipes = [];
    pipes.push(new Pipe(1*wny/4 + wny , random(250, wny-250)));
    pipes.push(new Pipe(2*wny/4 + wny, random(250, wny-250)));
    bird = new Bird(wnx/2, wny/2);
    world = new World(4);
    createCanvas(wnx, wny);
}

function setup() {
    initGame();
    loop();
    createCanvas(wnx, wny);
}

function draw() {
    // Background 
    background(80,200,255);

    
    // Update every actor
    world.update();
    pipes.forEach(pipe => pipe.update());
    bird.update();

    // Check if game ended
    if(bird.isOutOfBounds()) initGame();
    if(bird.isColliding(pipes)) initGame();


    // Render every actor
    world.render();
    pipes.forEach(pipe => pipe.render());
    bird.render();
}

function keyPressed() {
    if (keyCode === 32) bird.jump();
    if (keyCode === 32) (isLooping() ? (()=>{})(): loop());
}