const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function jumpKey() {
  console.log('JUMP');

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
    console.trace();
  }

}

function keyPressed() {
  if (keyCode === 32) {
    jumpKey();
  }
}

function touchStarted() {
  if (event.type != 'touchstart') return true
  jumpKey();
}