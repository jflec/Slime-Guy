import {slimeLeftSpace, slimeBottomSpace} from "./player.js";

export let bullets = [];

class Bullet {
    constructor() {
        this.bottom = slimeBottomSpace;
        this.left = slimeLeftSpace;
        this.visual = document.createElement('div');
        const visual = this.visual;
        visual.classList.add('bullet');
        visual.style.left = slimeLeftSpace + 12 + 'px';
        visual.style.bottom = slimeBottomSpace + 12 + 'px';
        document.querySelector('.grid').appendChild(visual);
    }
}

export function playerShoot(grid, event) {
    if (event.keyCode === 32) {
        shootBullet();
        let newBullet = new Bullet(document.querySelector('.grid'), event.clientX, event.clientY);
        bullets.push(newBullet);
    } 
}

export function shootBullet(x, y) {
    bullets.forEach(bullet => {
        bullet.bottom += 3;
        let visual = bullet.visual;
        visual.style.bottom = bullet.bottom + 'px';
        if (bullet.bottom >= 600) {
            let firstbullet = bullets[0].visual;
            firstbullet.classList.remove('bullet');
            bullets.shift();
        }
    })
}
 