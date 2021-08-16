// Add score system.
// Add starting platform.
// Add flying enemies.
// Add shooting feature.
// Potentially have background that scales with player Y.

import {platforms} from "./platform.js"
import {slimeSoundPlay} from "./sound.js"

const slime = document.createElement('div')

let isJumping = false;
let isGoingLeft = false;
let isGoingRight = false;
let leftTimerId;
let rightTimerId;

export let slimeLeftSpace = 50;
export let score = 0;
export let startPoint = 150;
export let slimeBottomSpace = startPoint;
export let upTimerId;
export let downTimerId;

export function createPlayer(grid) {
    grid.appendChild(slime);
    slime.classList.add('slime');
    slime.style.left = slimeLeftSpace + 'px';
    slime.style.bottom = slimeBottomSpace + 'px';
}

export function slimeJump() {
    clearInterval(downTimerId)
    isJumping = true;
    upTimerId = setInterval(function() {
        slimeBottomSpace += 3;
        slime.style.bottom = slimeBottomSpace + 'px';
        if (slimeBottomSpace > startPoint + 175) slimeFall();
    }, 1)
}

function slimeFall() {
    clearInterval(upTimerId)
    isJumping = false;
    downTimerId = setInterval(function() {
        slimeBottomSpace -= 2;
        slime.style.bottom = slimeBottomSpace + 'px';
        if (slimeBottomSpace <= 0 ) gameOver(true);

        platforms.forEach(platform => {
            if (
              (slimeBottomSpace >= platform.bottom) &&
              (slimeBottomSpace <= (platform.bottom + 15)) &&
              ((slimeLeftSpace + 60) >= platform.left) && 
              (slimeLeftSpace <= (platform.left + 85)) &&
              !isJumping
              ) {
                startPoint = slimeBottomSpace;
                slimeSoundPlay();
                slimeJump();
                isJumping = true;
              }
          })
    }, 1)
}

export function playerMovements(event) {
    if (event.keyCode === 37 || event.keyCode === 65) moveLeft();
    if (event.keyCode === 39 || event.keyCode === 68) moveRight();
}

export function stopPlayerMovements(event) {
    if (event.keyCode === 37 || event.keyCode === 65) {
        isGoingLeft = false
        clearInterval(leftTimerId)
    } else if (event.keyCode === 39 || event.keyCode === 68) {
        isGoingRight = false
        clearInterval(rightTimerId);
    }
}

function moveLeft() {
    clearInterval(leftTimerId)
    if (isGoingRight) {
        clearInterval(rightTimerId)
        isGoingRight = false
    }
    isGoingLeft = true
    leftTimerId = setInterval(function () {
        if (slimeLeftSpace >= 0) {
          slimeLeftSpace -= 2;
           slime.style.left = slimeLeftSpace + 'px'
        } else {
            slimeLeftSpace = 545;
        }
    }, 1)
}

function moveRight() {
    clearInterval(rightTimerId)
    if (isGoingLeft) {
        clearInterval(leftTimerId)
        isGoingLeft = false
    }
    isGoingRight = true
    rightTimerId = setInterval(function () {
      if (slimeLeftSpace <= 560) {
        slimeLeftSpace += 2;
        slime.style.left = slimeLeftSpace + 'px'
      } else {
        slimeLeftSpace = -4;
    }
    }, 1)
}

export function gameOver(isGameOver) {
    if (isGameOver) {
        const grid = document.querySelector('.grid');
        while (grid.firstChild) { grid.removeChild(grid.firstChild) }
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
        console.log("game is done");
        return true;
        
    } else if (!isGameOver) {
        console.log("game not done");
        return false;
    }
}
