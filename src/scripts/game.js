import {
  createPlayer,
  slimeJump,
  playerMovements,
  stopPlayerMovements,
  upTimerId,
  downTimerId,
  leftTimerId,
  rightTimerId,
} from './player.js';
import { createPlatforms, movePlatforms } from './platform.js';
import { playerShoot, shootBullet } from './playerShoot.js';
import { createEnemys, moveEnemys } from './enemy.js';

export let gameOver = false;
export let gamePaused = false;
export let softPaused = false;

// In charge of starting the game, calls necessary functions needed for building and rendering.
export function start(grid) {
  if (!gamePaused) {
    createPlatforms();
    createEnemys();
    createPlayer();
    setInterval(movePlatforms, 1);
    setInterval(moveEnemys, 1);
    setInterval(shootBullet, 1);
    slimeJump();

    document.addEventListener('keydown', playerShoot);
    document.addEventListener('keydown', playerMovements);
    document.addEventListener('keydown', playerPauseGame);
    document.addEventListener('keydown', restart);
    document.addEventListener('keyup', stopPlayerMovements);
  }
}
// Pauses game by setting exported variable to desired game state
function playerPauseGame(event) {
  const menu = document.querySelector('.menu');

  if (event.keyCode === 32 && !gamePaused) {
    gamePaused = true;
    menu.style.display = 'block';
  } else if (event.keyCode === 32 && gamePaused) {
    menu.style.display = 'none';
    gamePaused = false;
    softPaused = false;
  }
}

export function pauseGame() {
  gamePaused = true;
  softPaused = true;
}
// Ends game by clearing the grid and TimerIds
export function endGame() {
  gameOver = true;
  clearInterval(upTimerId);
  clearInterval(downTimerId);
  clearInterval(leftTimerId);
  clearInterval(rightTimerId);
  const endingOneText = document.querySelector('.oneEnding');
  const endingTwoText = document.querySelector('.twoEnding');
  const endingThreeText = document.querySelector('.finalScore');
  const ogScore = document.querySelector('.score');
  ogScore.innerHTML = '';
  endingOneText.innerHTML = "it wasn't enough";
  endingTwoText.innerHTML = 'press R to try again';
  endingThreeText.innerHTML = `final score: ${global.score}`;
}
// Restarts game via reloading page
function restart(event) {
  if (event.keyCode === 82) {
    location.reload();
  }
}
