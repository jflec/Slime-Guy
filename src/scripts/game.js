import {createPlayer, slimeJump, playerMovements, stopPlayerMovements, upTimerId, downTimerId, leftTimerId, rightTimerId} from "./player.js"
import {createPlatforms, movePlatforms} from "./platform.js"
import {backgroundMusicPlay} from "./sound.js"
import {playerShoot, shootBullet} from "./playerShoot.js"

export let gameOver = false;

export function start(grid) {
        console.log("running")
        createPlatforms();
        setTimeout(function() { createPlayer(); }, 250)
        setInterval(movePlatforms, 1);
        setInterval(shootBullet, 1);
        slimeJump();

        document.addEventListener('keydown', playerShoot.bind(this, grid))
        document.addEventListener('click', backgroundMusicPlay)
        document.addEventListener('keydown', playerMovements)
        document.addEventListener('keyup', stopPlayerMovements)
 }

export function endGame(grid) {
    gameOver = true;
    while (grid.firstChild) { grid.removeChild(grid.firstChild) }
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);

}


