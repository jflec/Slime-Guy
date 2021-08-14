import {createPlayer, slimeJump, playerMovements, stopPlayerMovements, startPoint} from "./scripts/player.js"
import {createPlatforms, movePlatforms} from "./scripts/platform.js"

let isGameOver = false;

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const slime = createPlayer(grid);

    function start() {
        if (!isGameOver) {
            createPlatforms(grid);
            createPlayer(grid);
            setInterval(movePlatforms.bind(this, grid), 30);
            slimeJump();
            document.addEventListener('keydown', playerMovements)
            document.addEventListener('keyup', stopPlayerMovements)
        }
    }

    start();
})

