import {slimeLeftSpace, slimeBottomSpace} from "./player.js";

export let bullets = [];

class Bullet {
    constructor(grid) {
        this.bottom = slimeBottomSpace;
        this.left = slimeLeftSpace;
        this.visual = document.createElement('div');
        const visual = this.visual;
        visual.classList.add('bullet');
        visual.style.left = slimeLeftSpace + 'px';
        visual.style.bottom = slimeBottomSpace + 'px';
        grid.appendChild(visual);
    }
}

export function createBullet(grid, event) {
    console.log("new bullet")
    let newBullet = new Bullet(grid, event.clientX, event.clientY);
    bullets.push(newBullet);
}

export function shootBullet(x, y) {
    console.log("shoot bullet")
    bullets.forEach(bullet => {
        bullet.bottom += 1.5;
            let visual = bullet.visual;
            visual.style.bottom = bullet.bottom + 'px';
            if (bullet.bottom <= -0) {
                let firstbullet = bullets[0].visual;
                firstbullet.classList.remove('bullet');
                bullets.shift();
        }
    })
}
 

    // if (bulletLeftSpace <= 560) {
    //     clearInterval(shootTimerId)
    // }

    // for (let i = bullet.style.left; i < x; i++) {
    //     bulletLeftSpace += 1;
    //     bullet.style.left += bulletLeftSpace + 'px';
    // }

    // for (let j = bullet.style.bottom; j < y; j++) {
    //     bulletLeftSpace += 1;
    //     bullet.style.left += bulletBottomSpace + 'px';
    // }
        


