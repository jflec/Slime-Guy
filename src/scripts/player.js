import { endGame, gamePaused } from './game.js';
import { platforms } from './platform.js';

const slime = document.createElement('div');

let isGoingLeft = false;
let isGoingRight = false;

export let isJumping = false;
export let isFalling = true;
export let slimeLeftSpace = 280;
export let gameOver = false;
export let startPoint = 200;
export let slimeBottomSpace = startPoint;
export let leftTimerId;
export let rightTimerId;
export let upTimerId;
export let downTimerId;

// Create 'Slime' and add to the grid.
export function createPlayer() {
  document.querySelector('.grid').appendChild(slime);
  slime.classList.add('slime');
  slime.style.left = slimeLeftSpace + 'px';
  slime.style.bottom = slimeBottomSpace + 'px';
}
// In charge of adding to the player's Y value and calling slimeFall()
export function slimeJump() {
  if (!gamePaused) {
    clearInterval(downTimerId);
    isJumping = true;
    isFalling = false;
    upTimerId = setInterval(function () {
      if (!gamePaused) {
        slimeBottomSpace += 1;
        slime.style.bottom = slimeBottomSpace + 'px';
        if (slimeBottomSpace > startPoint + 100) slimeFall();
      }
    }, 1);
  }
}
// In charge of subtracting the player's Y value and calling endGame()
function slimeFall() {
  if (!gamePaused) {
    clearInterval(upTimerId);
    isJumping = false;
    isFalling = true;
    downTimerId = setInterval(function () {
      if (!gamePaused) {
        slimeBottomSpace -= 2;
        slime.style.bottom = slimeBottomSpace + 'px';
        if (slimeBottomSpace <= -200) endGame(document.querySelector('.grid'));
        platforms.forEach((platform) => {
          collisionDetect(platform);
        });
      }
    }, 1);
  }
}
// Checks the value of the bottom of the player, if said value returns true it calls slimeJump()
function collisionDetect(platform) {
  if (
    slimeBottomSpace >= platform.bottom &&
    slimeBottomSpace <= platform.bottom + 19 &&
    slimeLeftSpace + 40 >= platform.left &&
    slimeLeftSpace <= platform.left + 100 &&
    !isJumping
  ) {
    platform.visual.classList.add('turned');
    startPoint = slimeBottomSpace;
    slimeJump();
    isJumping = true;
  }
}
// Calls moveLeft() or moveRight depending on player input. *Uses keydown*
export function playerMovements(event) {
  if (!gamePaused) {
    if (event.keyCode === 37 || event.keyCode === 65) moveLeft();
    if (event.keyCode === 39 || event.keyCode === 68) moveRight();
  }
}
// Ceases player movement depending on key release. *Uses keyup*
export function stopPlayerMovements(event) {
  if (event.keyCode === 37 || event.keyCode === 65) {
    isGoingLeft = false;
    clearInterval(leftTimerId);
  } else if (event.keyCode === 39 || event.keyCode === 68) {
    isGoingRight = false;
    clearInterval(rightTimerId);
  }
}
// Decrements player's X value
function moveLeft() {
  if (!gamePaused) {
    clearInterval(leftTimerId);
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (slimeLeftSpace >= -60) {
        slimeLeftSpace -= 2;
        slime.style.left = slimeLeftSpace + 'px';
      } else slimeLeftSpace = 600;
    }, 1);
  }
}
// Increments player's X value
function moveRight() {
  if (!gamePaused) {
    clearInterval(rightTimerId);
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (slimeLeftSpace <= 610) {
        slimeLeftSpace += 2;
        slime.style.left = slimeLeftSpace + 'px';
      } else slimeLeftSpace = -60;
    }, 1);
  }
}
