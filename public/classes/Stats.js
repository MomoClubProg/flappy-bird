function getUniqueID() {
  // Get ID from server
  return "3834738478374" // dummy ID
}

// Save an instance of this class to `localStorage`
class Stats {
  constructor() {
    let item = localStorage.getItem(`FlappyBirdSession${GAME_MODE}`);
    if (item === null) {
      this.user = {
        name: getUniqueID(),
      }
      this.platform = isMobile ? "mobile" : "desktop";
      this.score = {
        current: 0,
        high: 0,
        attempts: 0
      }
      this.settings = {};
    } else {
      this.load(JSON.parse(item));
    }
  }

  execute(object) {
    let ans = {};
    for (let key in object) {
      ans[key] = new Function(
        "isMobile",
        `return ${object[key]}`
      )(isMobile);
    }
    return ans;
  }

  async fetchSettings() {
    let settings = await fetch('./settings.json');
    let s = await settings.json();
    console.log(s)
    this.settings = this.execute(s[GAME_MODE]);
  }

  load(data) {
    this.user = data.user;
    this.score = data.score;
    this.platform = isMobile ? "mobile" : "desktop";
  }

  renderMenu() {
    if (!world.pause) return;
    noStroke(0);
    fill(0);

    textSize(wnx / 18);
    textAlign(CENTER);
    text("Appuyez pour recommencer", wnx / 2, wny / 2 + (wny / 12));
  }

  newAttempt() {
    this.score.current = 0;
    this.score.attempts++;

    localStorage.setItem(`FlappyBirdSession${GAME_MODE}`, JSON.stringify(this));
  }

  // update high score
  setHighScore() {
    if (this.score.high < this.score.current)
      this.score.high = this.score.current;
  }

  // Render counters & update high score
  renderCounters() {
    noStroke();

    if (world.pause)
      fill(0);
    else
      fill(255)

    textSize(20);
    textAlign(LEFT);
    text("Mode Dévelopeur", 20, 30);
    text("Essais: " + this.score.attempts, 20, 50);
    text("Record: " + this.score.high, 20, 70);
    text("Score: " + this.score.current, 20, 90);

    this.setHighScore();
  }
}