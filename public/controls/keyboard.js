function keyPressed() {
  // Bird jump mechanic
  if (keyCode === 32) world.bird.jump();

  // If space is pressed while the game is stopped, restart the game
  if (keyCode === 32)(isLooping() ? (() => {})() : loop());
}