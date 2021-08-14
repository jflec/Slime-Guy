import {slimeBottomSpace} from "./player.js";

let platformCount = 5;

export let platforms = [];

class Platform {
    constructor(grid, newPlatBottom) {
        this.bottom = newPlatBottom;
        this.left = Math.random() * 315;
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
    if (slimeBottomSpace > 200) {
        platforms.forEach(platform => {
            platform.bottom -= 4;
            let visual = platform.visual;
            visual.style.bottom = platform.bottom + 'px';

            if (platform.bottom < 10) {
                let firstPlatform = platforms[0].visual;
                firstPlatform.classList.remove('platform');
                platforms.shift();
                let newPlatform = new Platform(grid, 600)
                platforms.push(newPlatform)
            }
        })
    }
}

