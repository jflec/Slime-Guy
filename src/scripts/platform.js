import {score} from "./player.js"

let platformCount = 5;

export let totalScore = score;
export let platforms = [];

class Platform {
    constructor(grid, newPlatBottom) {
        this.bottom = newPlatBottom;
        this.left = Math.random() * 500;
        this.visual = document.createElement('div');
        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + 'px';
        visual.style.bottom = this.bottom + 'px';
        grid.appendChild(visual);
    }
}

export function createPlatforms(grid) {
    for (let i = 0; i < platformCount; i++) {
        let platformGap = 600 / platformCount;
        let newPlatBottom = 100 + i * platformGap;
        let newPlatform = new Platform(grid, newPlatBottom);

        platforms.push(newPlatform);
    }
}

export function movePlatforms(grid) {
    platforms.forEach(platform => {
        platform.bottom -= 0.75;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + 'px';
        if (platform.bottom <= -0) {

            let firstPlatform = platforms[0].visual;
            firstPlatform.classList.remove('platform');
            platforms.shift();
            totalScore++;
            let newPlatform = new Platform(grid, 600)
            platforms.push(newPlatform)
        }
    })
}

