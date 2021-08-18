import {gameOver, gamePaused} from "./game.js"
import {isJumping, isFalling} from "./player.js"

let platformCount    = 5;

export let score     = 0;
export let platforms = [];

// Sets Platform properties

class Platform {
    constructor(grid, newPlatBottom) {
        this.bottom = newPlatBottom;
        this.left = Math.random() * 450;
        this.visual = document.createElement('div');
        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + 'px';
        visual.style.bottom = this.bottom + 'px';
        grid.appendChild(visual);
    }
}

// Creates platforms and pushes to platform array

export function createPlatforms() {
    const grid = document.querySelector('.grid');
    for (let i = 0; i < platformCount; i++) {
        let platformGap = 750 / platformCount;
        let newPlatBottom = 100 + i * platformGap;
        let newPlatform = new Platform(grid, newPlatBottom);
        platforms.push(newPlatform)
    }
}

// Moves Platforms by substracting, or adding to the Platform's bottom property

export function movePlatforms() {
    const grid = document.querySelector('.grid');
    if (!gamePaused) {
        platforms.forEach(platform => {
            if (isJumping) {
                platform.bottom -= 3.5;
            } else if (isFalling) {
                platform.bottom += 1;
            }
            let visual = platform.visual;
            visual.style.bottom = platform.bottom + 'px';
            updatePlatforms(platform, grid);
        })
    }
}

// Removes old platforms and creates new platforms that are then pushed to platform array

function updatePlatforms(platform, grid) {
    if (!gameOver) {
        if (platform.bottom <= -50) {
            let firstPlatform = platforms[0].visual;
            firstPlatform.classList.remove('platform');
            platforms.shift();
            score += 1;
            let newPlatform = new Platform(grid, 750)
            platforms.push(newPlatform)

        }
    }
}
