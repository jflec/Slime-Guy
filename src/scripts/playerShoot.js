import { slimeLeftSpace, slimeBottomSpace } from './player.js';
import { enemys, killEnemy } from './enemy.js';

export let bullets = [];

class Bullet {
  constructor() {
    this.bottom = slimeBottomSpace;
    this.left = slimeLeftSpace;
    this.visual = document.createElement('div');
    const visual = this.visual;
    visual.classList.add('bullet');
    visual.style.left = slimeLeftSpace + 18 + 'px';
    visual.style.bottom = slimeBottomSpace + 12 + 'px';
    document.querySelector('.grid').appendChild(visual);
  }
}

export function playerShoot(event) {
  if (event.keyCode === 13) {
    shootBullet();
    let newBullet = new Bullet(
      document.querySelector('.grid'),
      event.clientX,
      event.clientY
    );
    bullets.push(newBullet);
  }
}

export function shootBullet(x, y) {
  bullets.forEach((bullet) => {
    bullet.bottom -= 3;
    let visual = bullet.visual;
    visual.style.bottom = bullet.bottom + 'px';
    enemys.forEach((enemy) => {
      collisionDetect(enemy, bullet.bottom, bullet.left);
    });
    if (bullet.bottom <= -10) {
      visual.style.boxShadow = '0px 0px 150px 60px rgb(0, 94, 0)';
    }
    if (bullet.bottom <= -60) {
      let firstBullet = bullets[0].visual;
      firstBullet.remove();
      bullets.shift();
    }
  });
}

function collisionDetect(enemy, bottom, left) {
  if (
    bottom >= enemy.bottom &&
    bottom <= enemy.bottom + 19 &&
    left + 40 >= enemy.left &&
    left <= enemy.left + 30
  ) {
    if (!enemy.killed) killEnemy(enemy);
  }
}
