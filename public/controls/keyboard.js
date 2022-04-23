const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function jumpKey() {
  if (world.pause) {
    initGame();
    loop();
  } else {
    world.bird.jump();
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