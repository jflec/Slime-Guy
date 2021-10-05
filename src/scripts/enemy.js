import { gameOver, gamePaused } from './game.js';

let enemyCount = 3;
let enemyKey = 0;

export let enemys = [];

// Sets enemy properties
class Enemy {
  constructor(grid, newEnemyBottom) {
    this.killed = false;
    this.bottom = newEnemyBottom;
    this.left = Math.random() * 450;
    this.visual = document.createElement('div');
    const visual = this.visual;
    visual.classList.add('enemy');
    visual.style.left = this.left + 'px';
    visual.style.bottom = this.bottom + 'px';
    grid.appendChild(visual);
  }
}
// Creates enemys and pushes to enemy array
export function createEnemys() {
  const grid = document.querySelector('.grid');
  for (let i = 0; i < enemyCount; i++) {
    let enemyGap = -grid.clientHeight / enemyCount;
    let newEnemyBottom = -120 + i * enemyGap;
    let newEnemy = new Enemy(grid, newEnemyBottom);
    enemys.push(newEnemy);
  }
}
// Moves enemys by substracting, or adding to the enemy's bottom property
export function moveEnemys() {
  if (!gamePaused) {
    const grid = document.querySelector('.grid');
    enemys.forEach((enemy) => {
      enemy.bottom += 0.55;
      let visual = enemy.visual;
      visual.style.bottom = enemy.bottom + 'px';
      updateEnemys(enemy, grid);
    });
  }
}
// Removes old enemys and creates new enemys that are then pushed to enemy array
function updateEnemys(enemy, grid) {
  if (!gameOver) {
    if (enemy.bottom >= grid.clientHeight) {
      let firstEnemy = enemys[0].visual;
      if (!enemy.killed) global.score -= 20;
      firstEnemy.remove();
      enemys.shift();
      let newEnemy = new Enemy(grid, -50);
      enemys.push(newEnemy);
    }
  }
}

export function killEnemy(enemy) {
  global.score += 10;
  enemy.killed = true;
  enemy.visual.remove();
}
