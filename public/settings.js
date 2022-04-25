const wnx = window.innerWidth;
const wny = window.innerHeight;
const GAME_MODE = World.getGameMode(); // Change for different difficulty
// Should be affected by http queries, not hardcoded in .
// raw.githack does not support http queries
// Our own self-hosted server could (nodejs, express)

World.SETTINGS = ({
  dev: {
    SPEED: isMobile ? 0.2 : 0.25,
    GRAVITY: isMobile ? 0.03 : 0.03,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 1.5 : 2,
    PIPE_WIDTH: isMobile ? 42 : 50,
    GAP_SIZE: wny / 6.5,
    NOISE: false,
    NOISE_SPEED: 0
  },
  easy: {
    SPEED: isMobile ? 0.125 : 0.2,
    GRAVITY: isMobile ? 0.03 : 0.03,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.75 : 1,
    PIPE_WIDTH: isMobile ? 38 : 50,
    GAP_SIZE: wny / 5,
    NOISE: false,
    NOISE_SPEED: 0
  },
  normal: {
    SPEED: isMobile ? 0.125 : 0.2,
    GRAVITY: isMobile ? 0.03 : 0.03,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.75 : 1,
    PIPE_WIDTH: isMobile ? 44 : 54,
    GAP_SIZE: wny / 6.2,
    NOISE: false,
    NOISE_SPEED: 0
  },
  hard: {
    SPEED: isMobile ? 0.125 : 0.2,
    GRAVITY: isMobile ? 0.03 : 0.03,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.75 : 1,
    PIPE_WIDTH: isMobile ? 48 : 58,
    GAP_SIZE: wny / 6.5,
    NOISE: true,
    NOISE_SPEED: 0.005
  }
})[GAME_MODE];

World.TRANSLATION = {
  dev: "Dévelopement",
  easy: "Facile",
  normal: "",
  hard: "Difficile"
}