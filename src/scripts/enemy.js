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
    visual.id = enemyKey += 1;
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
    let scoreStyle = document.querySelector('.score');
    if (enemy.bottom >= grid.clientHeight) {
      if (!enemy.killed) {
        grid.style.transform = 'scale(1.06)';
        grid.style.boxShadow = 'inset 0px 11px 20px -10px rgb(94, 0, 0)';
        scoreStyle.style.color = 'red';
        scoreStyle.style.transform = 'scale(1.06)';
        let enemyStyle = document.getElementById(enemy.visual.id);
        enemyStyle.style.transition = '0.2s';
        enemyStyle.style.boxShadow = '0px 0px 100px 40px rgb(94, 0, 0)';
        grid.style.border = '4px solid red';
      }
    }
    if (enemy.bottom >= grid.clientHeight + 20) {
      let firstEnemy = enemys[0].visual;
      if (!enemy.killed) {
        grid.style.transform = 'scale(1.0)';
        grid.style.boxShadow = 'inset 0px 0px 0px 0px rgb(94, 0, 0)';
        scoreStyle.style.color = 'white';
        scoreStyle.style.transform = 'scale(1.0)';
        grid.style.border = '2px solid red';
        grid.style.borderImage =
          'linear-gradient(0deg, rgb(255, 0, 0), rgb(26, 26, 26)) 1';
        global.score -= 20;
      }
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
