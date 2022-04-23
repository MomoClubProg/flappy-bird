// Save an instance of this class to `localStorage`
class Stats {
  constructor() {
    let item = localStorage.getItem("Score");
    if (item === null) {
      this.score = {
        current: 0,
        high: 0,
        attempts: -1
      }
    } else {
      this.score = JSON.parse(item);
    }

  }

  // Display an end game menu
  // Should trigger a DOM menu and remove the Canvas
  // A DOM control should restart this p5 canvas
  renderMenu() {
    if (!world.pause) return;
    noStroke(0);
    fill(0);

    if (this.attemps >= 1) {
      textSize(72)
      textAlign(CENTER);
      text("YOU LOST", wnx / 2, wny / 2);
    }

    textSize(wnx / 14);
    textAlign(CENTER);
    text("Press space to start", wnx / 2, wny / 2 + (wny / 12));
  }

  newAttempt() {
    this.score.current = 0;
    this.score.attempts++;

    localStorage.setItem("Score", JSON.stringify(this.score));
  }

  // update high score
  setHighScore() {
    if (this.score.high < this.score.current)
      this.score.high = this.score.current;
  }

  // Render counters & update high score
  renderCounters() {
    stroke(255);
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("Attemps: " + this.score.attempts, 20, 30);
    text("High score: " + this.score.high, 20, 50);
    text("Score: " + this.score.current, 20, 70);

    this.setHighScore();
  }
}