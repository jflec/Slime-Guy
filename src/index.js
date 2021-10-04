import { start, pauseGame } from './scripts/game.js';

const grid = document.querySelector('.grid');

document.addEventListener('DOMContentLoaded', () => {
  start(grid);
  pauseGame();
});
