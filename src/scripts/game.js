// Add start menu
// Add pause menu
// Add death screen
// BONUS: add enemy, add stages

import {createPlayer, slimeJump, playerMovements, stopPlayerMovements,
        upTimerId, downTimerId, leftTimerId, rightTimerId} from "./player.js"
import {createPlatforms, movePlatforms, score} from "./platform.js"
import {playerShoot, shootBullet} from "./playerShoot.js"

export let gameOver   = false;
export let gamePaused = false;

// In charge of starting the game, calls necessary functions needed for building and rendering.

export function start(grid) {
    if (!gamePaused) {
        createPlatforms();
        setTimeout(function() { createPlayer(); }, 300)
        setInterval(movePlatforms, 1);
        setInterval(shootBullet, 1);
        slimeJump();

        document.addEventListener('keydown', playerShoot.bind(this, grid))
        document.addEventListener('keydown', playerMovements)
        document.addEventListener('keydown', pauseGame)
        document.addEventListener('keydown', restart)
        document.addEventListener('keyup', stopPlayerMovements)
    }
}

// Pauses game by setting exported variable to desired game state

function pauseGame(event) {
    if (event.keyCode === 27 && !gamePaused) gamePaused = true;
    else if (event.keyCode === 27 && gamePaused) gamePaused = false;
}

// Ends game by clearing the grid and TimerIds

export function endGame(grid) {
    gameOver = true;
    while (grid.firstChild) { grid.removeChild(grid.firstChild) }
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    // document.getElementById("ending").style.display = "block";
}

// Restarts game via reloading page

function restart(event) {
    if (event.keyCode === 82) {
        location.reload()
    }
}


