// Add flying enemies.
// Add shooting feature. 50%

import {endGame, gamePaused} from "./game.js";
import {platforms} from "./platform.js"
import {slimeSoundPlay} from "./sound.js"

const slime = document.createElement('div')


let isGoingLeft             = false;
let isGoingRight            = false;

export let isJumping        = false;
export let isFalling        = true;
export let slimeLeftSpace   = 280;
export let gameOver         = false;
export let startPoint       = 200;
export let slimeBottomSpace = startPoint;
export let leftTimerId;
export let rightTimerId;
export let upTimerId;
export let downTimerId;

export function createPlayer() {
    document.querySelector('.grid').appendChild(slime);
    slime.classList.add('slime');
    slime.style.left = slimeLeftSpace + 'px';
    slime.style.bottom = slimeBottomSpace + 'px';
}

export function slimeJump() {
    if (!gamePaused) {
        clearInterval(downTimerId)
        isJumping = true;
        isFalling = false;
        upTimerId = setInterval(function() {
            if (!gamePaused) {
            slimeBottomSpace += 1;
            slime.style.bottom = slimeBottomSpace + 'px';
            if (slimeBottomSpace > startPoint + 100) slimeFall();
            }
        }, 1)
    }
    
}

function slimeFall() {
    if (!gamePaused) {
        clearInterval(upTimerId)
        isJumping = false;
        isFalling = true;
        downTimerId = setInterval(function() {
            if (!gamePaused) {
                slimeBottomSpace -= 2;
                slime.style.bottom = slimeBottomSpace + 'px';
                if (slimeBottomSpace <= -80 ) { endGame(document.querySelector('.grid')); }
                platforms.forEach(platform => {
                    if ((slimeBottomSpace >= platform.bottom) && (slimeBottomSpace <= (platform.bottom + 19)) &&
                    ((slimeLeftSpace + 40) >= platform.left) && (slimeLeftSpace <= (platform.left + 100)) &&
                    !isJumping) {
                        startPoint = slimeBottomSpace;
                        slimeSoundPlay();
                        slimeJump();
                        isJumping = true;
                    }
                })
            }
        }, 1)
    }
}

export function playerMovements(event) {
    if (!gamePaused) {
        if (event.keyCode === 37 || event.keyCode === 65) moveLeft();
        if (event.keyCode === 39 || event.keyCode === 68) moveRight();
    }
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
    if (!gamePaused) {
        clearInterval(leftTimerId)
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function () {
            if (slimeLeftSpace >= -60) {
            slimeLeftSpace -= 2;
            slime.style.left = slimeLeftSpace + 'px'
            } else {
                slimeLeftSpace = 600;
            }
        }, 1)
    }
}

function moveRight() {
    if (!gamePaused) {
        clearInterval(rightTimerId)
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function () {
            if (slimeLeftSpace <= 610) {
                slimeLeftSpace += 2;
                slime.style.left = slimeLeftSpace + 'px'
            } else {
                slimeLeftSpace = -60;
        }
        }, 1)
    }
   
}

