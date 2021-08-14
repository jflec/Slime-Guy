// Add score system.
// Add starting platform.

import {platforms} from "./platform.js"

const slime = document.createElement('div')

let slimeLeftSpace = 50;
let isGameOver = false;
let isJumping = false;
let isGoingLeft = false;
let isGoingRight = false;
let leftTimerId;
let rightTimerId;
let score = 0;

export let startPoint = 150;
export let isPlayerDead = false;
export let upTimerId;
export let downTimerId;
export let slimeBottomSpace = startPoint;

export function createPlayer(grid) {
    grid.appendChild(slime);
    slime.classList.add('slime');
    // slimeLeftSpace = startingPlatform[0].left;
    slime.style.left = slimeLeftSpace + 'px';
    slime.style.bottom = slimeBottomSpace + 'px';
}

export function slimeJump() {
    clearInterval(downTimerId)
    isJumping = true;
    upTimerId = setInterval(function() {
        slimeBottomSpace += 2;
        slime.style.bottom = slimeBottomSpace + 'px';
        if (slimeBottomSpace > startPoint + 175) {
            slimeFall();
        }
    }, 1)
}

function slimeFall() {
    clearInterval(upTimerId)
    isJumping = false;
    downTimerId = setInterval(function() {
        slimeBottomSpace -= 1.5;
        slime.style.bottom = slimeBottomSpace + 'px';
        if (slimeBottomSpace <= 0 ) {
            isPlayerDead = true;
            gameOver()
        }

        platforms.forEach(platform => {
            if (
              (slimeBottomSpace >= platform.bottom) &&
              (slimeBottomSpace <= (platform.bottom + 15)) &&
              ((slimeLeftSpace + 60) >= platform.left) && 
              (slimeLeftSpace <= (platform.left + 85)) &&
              !isJumping
              ) {
                startPoint = slimeBottomSpace;
                slimeJump();
                isJumping = true;
              }
          })

    }, 1)
}

export function playerMovements(event) {
    if (event.key === "ArrowLeft") {
        moveLeft();
    } else if (event.key === "ArrowRight") {
        moveRight();
    }
}

export function stopPlayerMovements(event) {
    if (event.keyCode === 37 || event.keyCode === 65) {
        isGoingLeft = false
        clearInterval(leftTimerId)
    } else if (event.keyCode === 39 || event.keyCode === 68) {
        isGoingRight = false
        clearInterval(rightTimerId)
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
      if (slimeLeftSpace <= 538.5) {
        slimeLeftSpace += 2;
        slime.style.left = slimeLeftSpace + 'px'
      } else {
        slimeLeftSpace = -4;
    }
    }, 1)
}

function gameOver() {
    isGameOver = true;
    while (window.firstChild) { window.removeChild(window.firstChild) }
    clearInterval(upTimerId);
    clearInterval(downTimerId);
}