const wnx = window.innerWidth;
const wny = window.innerHeight;
const GAME_MODE = World.getGameMode(); // Change for different difficulty
// Should be affected by http queries, not hardcoded in .
// raw.githack does not support http queries
// Our own self-hosted server could (nodejs, express)

World.SETTINGS = ({
  dev: {
    SPEED: isMobile ? 0.22 : 0.27,
    GRAVITY: isMobile ? 0.05 : 0.05,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.9 : 1.2,
    PIPE_WIDTH: isMobile ? 42 : 50,
    GAP_SIZE: wny / 6.5,
    NOISE: false,
    NOISE_SPEED: 0
  },
  easy: {
    SPEED: isMobile ? 0.18 : 0.2,
    GRAVITY: isMobile ? 0.05 : 0.05,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.9 : 1.2,
    PIPE_WIDTH: isMobile ? 38 : 50,
    GAP_SIZE: wny / 5,
    NOISE: false,
    NOISE_SPEED: 0
  },
  normal: {
    SPEED: isMobile ? 0.22 : 0.29,
    GRAVITY: isMobile ? 0.05 : 0.05,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.9 : 1.2,
    PIPE_WIDTH: isMobile ? 44 : 54,
    GAP_SIZE: wny / 6.2,
    NOISE: false,
    NOISE_SPEED: 0
  },
  hard: {
    SPEED: isMobile ? 0.25 : 0.3,
    GRAVITY: isMobile ? 0.05 : 0.05,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 0.9 : 1.2,
    PIPE_WIDTH: isMobile ? 50 : 58,
    GAP_SIZE: wny / 6.5,
    NOISE: true,
    NOISE_SPEED: 0.0025
  }
})[GAME_MODE];

World.TRANSLATION = {
  dev: "Dévelopement",
  easy: "Facile",
  normal: "",
  hard: "Difficile"
}