class LandingDust {
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