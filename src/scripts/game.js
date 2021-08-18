import {createPlayer, slimeJump, playerMovements, stopPlayerMovements, upTimerId, downTimerId, leftTimerId, rightTimerId} from "./player.js"
import {createPlatforms, movePlatforms, score} from "./platform.js"
import {backgroundMusicPlay} from "./sound.js"
import {playerShoot, shootBullet} from "./playerShoot.js"

export let gameOver   = false;
export let gamePaused = false;

export function start(grid) {
    if (!gamePaused) {
        createPlatforms();
        setTimeout(function() { createPlayer(); }, 300)
        setInterval(movePlatforms, 1);
        setInterval(shootBullet, 1);
        slimeJump();

        document.addEventListener('keydown', playerShoot.bind(this, grid))
        document.addEventListener('click', backgroundMusicPlay)
        document.addEventListener('keydown', playerMovements)
        document.addEventListener('keyup', stopPlayerMovements)
        document.addEventListener('keydown', pauseGame)
    }
}

export function endGame(grid) {
    gameOver = true;
    while (grid.firstChild) { grid.removeChild(grid.firstChild) }
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    // document.getElementById("ending").style.display = "block";
}

function pauseGame(event) {
    if (event.keyCode === 27 && !gamePaused) {
        gamePaused = true;
    } else if (event.keyCode === 27 && gamePaused) {
        gamePaused = false;
    }
}


