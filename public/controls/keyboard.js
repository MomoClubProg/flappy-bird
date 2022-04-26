const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function jumpKey() {
  if (world.startScreen) {
    world.pause = false;
    world.startScreen = false;
    loop();
  } else if (world.pause) {
    world.pause = false;
    initGame();
    loop();
  } else {
    world.bird.jump(deltaTime);
  }

}

function keyPressed() {
  if (keyCode === 32) {
    jumpKey();
  }
}

function touchStarted() {
  jumpKey();
}