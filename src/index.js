import {createPlayer, slimeJump, playerMovements, stopPlayerMovements, gameOver} from "./scripts/player.js"
import {createPlatforms, movePlatforms} from "./scripts/platform.js"
import {backgroundMusicPlay} from "./scripts/sound.js"
import {playerShoot, shootBullet} from "./scripts/playerShoot.js"

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');

    function start() {
        if (!gameOver()) {
            createPlatforms(grid);
            setTimeout(function() { createPlayer(grid); }, 500)
            setInterval(movePlatforms.bind(this, grid), 1);
            setInterval(shootBullet.bind(this, grid), 1);
            slimeJump();

            document.addEventListener('keydown', playerShoot.bind(this, grid))
            
            // document.addEventListener('click', backgroundMusicPlay)

            document.addEventListener('keydown', playerMovements)
            document.addEventListener('keyup', stopPlayerMovements)
        }
    }

    start();
})

