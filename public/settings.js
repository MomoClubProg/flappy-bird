const wnx = window.innerWidth;
const wny = window.innerHeight;
const GAME_MODE = "normal"; // Change for different difficulty
// Should be affected by http queries, not hardcoded in .
// raw.githack does not support http queries
// Our own self-hosted server could (nodejs, express)

World.SETTINGS = ({
  dev: {
    SPEED: isMobile ? 2 : 3.25,
    GRAVITY: isMobile ? 0.48 : 0.48,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 10.2 : 12,
    PIPE_WIDTH: isMobile ? 42 : 50,
    GAP_SIZE: wny / 6.5,
    NOISE: false,
    NOISE_SPEED: 0
  },
  easy: {
    SPEED: isMobile ? 1.85 : 3.1,
    GRAVITY: isMobile ? 0.48 : 0.48,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 10.2 : 12,
    PIPE_WIDTH: isMobile ? 40 : 50,
    GAP_SIZE: wny / 5.5,
    NOISE: false,
    NOISE_SPEED: 0
  },
  normal: {
    SPEED: isMobile ? 2 : 3.25,
    GRAVITY: isMobile ? 0.48 : 0.48,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 10.2 : 12,
    PIPE_WIDTH: isMobile ? 44 : 54,
    GAP_SIZE: wny / 6.2,
    NOISE: false,
    NOISE_SPEED: 0
  },
  hard: {
    SPEED: isMobile ? 2 : 3.25,
    GRAVITY: isMobile ? 0.48 : 0.48,
    FRICTION: isMobile ? 0.94 : 0.94,
    JUMP_HEIGHT: isMobile ? 10.2 : 12,
    PIPE_WIDTH: isMobile ? 48 : 58,
    GAP_SIZE: wny / 6.5,
    NOISE: true,
    NOISE_SPEED: 0.005
  }
})[GAME_MODE];