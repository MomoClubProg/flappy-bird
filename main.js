let bird;
let pipes = [];
let wnx = 600;
let wny = 600;


function restartMenu(){

    stroke(255)
    fill(255)
    /*textSize(72)
    textAlign(CENTER);
    text("YOU LOST",300,300);*/

    textSize(50);
    textAlign(CENTER);
    text("Press space to start",300,350);

}



function init() {

    noLoop();
    restartMenu();
    pipes = [];
    pipes.push(new Pipe(600, random(100, 500)));
    pipes.push(new Pipe(900, random(100, 500)));
    bird = new Bird(300, 300);
    
}

function setup() {
    init();
    loop();
    createCanvas(wnx, wny);
}

function draw() {
    // Background 
    background(51);


    // Update every actor
    pipes.forEach(pipe => pipe.update());
    bird.update();

    // Check if game ended
    if(bird.isOutOfBounds()) init();
    if(bird.isColliding(pipes)) init();


    // Render every actor
    pipes.forEach(pipe => pipe.render());
    bird.render();
}

function keyPressed() {
    if (keyCode === 32) bird.jump();
    if (keyCode === 32) (isLooping() ? (()=>{})(): loop());
}