let bird;
let pipes = [];
let wnx = 600;
let wny = 600;
let attemps=0;
let score =0;
let highScore=0;


function highScoreCounter(){

    if(highScore <= score) highScore=score;
}


function dspCounters(){

    stroke(255)
    fill(255)
    textSize(20)

    text("Attemps: "+ attemps, 50, 20);
    text("High score: "+ highScore,60,40);
    text("Score: "+score,40,60);
}


function restartMenu(){

    stroke(255)
    fill(255)

    if(attemps>=1){
    textSize(72)
    textAlign(CENTER);
    text("YOU LOST",300,300);
    }

    textSize(50);
    textAlign(CENTER);
    text("Press space to start",300,350);

}



function initGame() {

    noLoop();
    restartMenu();
    pipes = [];
    pipes.push(new Pipe(600, random(100, 500)));
    pipes.push(new Pipe(900, random(100, 500)));
    bird = new Bird(300, 300);
    attemps++;
    score=0;
}

function setup() {
    initGame();
    loop();
    createCanvas(wnx, wny);
}

function draw() {
    // Background 
    background(51);

    //Display counters
    dspCounters();
    

    // Update every actor
    pipes.forEach(pipe => pipe.update());
    bird.update();

    // Check if game ended
    if(bird.isOutOfBounds()) initGame();
    if(bird.isColliding(pipes)) initGame();


    // Render every actor
    pipes.forEach(pipe => pipe.render());
    bird.render();

    highScoreCounter();
}

function keyPressed() {
    if (keyCode === 32) bird.jump();
    if (keyCode === 32) (isLooping() ? (()=>{})(): loop());
}