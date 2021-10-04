/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/enemy.js":
/*!******************************!*\
  !*** ./src/scripts/enemy.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enemys": function() { return /* binding */ enemys; },
/* harmony export */   "createEnemys": function() { return /* binding */ createEnemys; },
/* harmony export */   "moveEnemys": function() { return /* binding */ moveEnemys; },
/* harmony export */   "killEnemy": function() { return /* binding */ killEnemy; }
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/scripts/game.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var enemyCount = 2;
var enemys = []; // Sets enemy properties

var Enemy = function Enemy(grid, newEnemyBottom) {
  _classCallCheck(this, Enemy);

  this.bottom = newEnemyBottom;
  this.left = Math.random() * 450;
  this.visual = document.createElement('div');
  var visual = this.visual;
  visual.classList.add('enemy');
  visual.style.left = this.left + 'px';
  visual.style.bottom = this.bottom + 'px';
  grid.appendChild(visual);
}; // Creates enemys and pushes to enemy array


function createEnemys() {
  var grid = document.querySelector('.grid');

  for (var i = 0; i < enemyCount; i++) {
    var enemyGap = -1700 / enemyCount;
    var newEnemyBottom = -120 + i * enemyGap;
    var newEnemy = new Enemy(grid, newEnemyBottom, i);
    enemys.push(newEnemy);
  }
} // Moves enemys by substracting, or adding to the enemy's bottom property

function moveEnemys() {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    var grid = document.querySelector('.grid');
    enemys.forEach(function (enemy) {
      enemy.bottom += 0.55;
      var visual = enemy.visual;
      visual.style.bottom = enemy.bottom + 'px';
      updateEnemys(enemy, grid);
    });
  }
} // Removes old enemys and creates new enemys that are then pushed to enemy array

function updateEnemys(enemy, grid) {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gameOver) {
    if (enemy.bottom >= 1700) {
      var firstEnemy = enemys[0].visual;
      firstEnemy.remove();
      __webpack_require__.g.score -= 20;
      enemys.shift();
      var newEnemy = new Enemy(grid, -50);
      enemys.push(newEnemy);
    }
  }
}

function killEnemy(enemy) {
  enemy.visual.remove();
  __webpack_require__.g.score += 1;
}

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameOver": function() { return /* binding */ gameOver; },
/* harmony export */   "gamePaused": function() { return /* binding */ gamePaused; },
/* harmony export */   "softPaused": function() { return /* binding */ softPaused; },
/* harmony export */   "start": function() { return /* binding */ start; },
/* harmony export */   "pauseGame": function() { return /* binding */ pauseGame; },
/* harmony export */   "endGame": function() { return /* binding */ endGame; }
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform.js */ "./src/scripts/platform.js");
/* harmony import */ var _playerShoot_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerShoot.js */ "./src/scripts/playerShoot.js");
/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemy.js */ "./src/scripts/enemy.js");
// Add start menu
// Add pause menu
// Add death screen
// BONUS: add enemy, add stages




var gameOver = false;
var gamePaused = false;
var softPaused = false; // In charge of starting the game, calls necessary functions needed for building and rendering.

function start(grid) {
  if (!gamePaused) {
    (0,_platform_js__WEBPACK_IMPORTED_MODULE_1__.createPlatforms)();
    (0,_enemy_js__WEBPACK_IMPORTED_MODULE_3__.createEnemys)();
    (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
    setInterval(_platform_js__WEBPACK_IMPORTED_MODULE_1__.movePlatforms, 1);
    setInterval(_enemy_js__WEBPACK_IMPORTED_MODULE_3__.moveEnemys, 1);
    setInterval(_playerShoot_js__WEBPACK_IMPORTED_MODULE_2__.shootBullet, 1);
    (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.slimeJump)();
    document.addEventListener('keydown', _playerShoot_js__WEBPACK_IMPORTED_MODULE_2__.playerShoot);
    document.addEventListener('keydown', _player_js__WEBPACK_IMPORTED_MODULE_0__.playerMovements);
    document.addEventListener('keydown', playerPauseGame);
    document.addEventListener('keydown', restart);
    document.addEventListener('keyup', _player_js__WEBPACK_IMPORTED_MODULE_0__.stopPlayerMovements);
  }
} // Pauses game by setting exported variable to desired game state

function playerPauseGame(event) {
  var menu = document.querySelector('.menu');

  if (event.keyCode === 32 && !gamePaused) {
    gamePaused = true;
    menu.style.display = 'block';
  } else if (event.keyCode === 32 && gamePaused) {
    menu.style.display = 'none';
    gamePaused = false;
    softPaused = false;
  }
}

function pauseGame() {
  gamePaused = true;
  softPaused = true;
} // Ends game by clearing the grid and TimerIds

function endGame() {
  gameOver = true;
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.upTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.downTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.leftTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.rightTimerId);
  var endingOneText = document.querySelector('.oneEnding');
  var endingTwoText = document.querySelector('.twoEnding');
  var endingThreeText = document.querySelector('.finalScore');
  var ogScore = document.querySelector('.score');
  ogScore.innerHTML = '';
  endingOneText.innerHTML = "it wasn't enough";
  endingTwoText.innerHTML = 'press R to try again';
  endingThreeText.innerHTML = "final score: ".concat(__webpack_require__.g.score);
} // Restarts game via reloading page

function restart(event) {
  if (event.keyCode === 82) {
    location.reload();
  }
}

/***/ }),

/***/ "./src/scripts/platform.js":
/*!*********************************!*\
  !*** ./src/scripts/platform.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "platforms": function() { return /* binding */ platforms; },
/* harmony export */   "createPlatforms": function() { return /* binding */ createPlatforms; },
/* harmony export */   "movePlatforms": function() { return /* binding */ movePlatforms; }
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/scripts/game.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var platformCount = 10;
__webpack_require__.g.score = 1;
var platforms = []; // Sets Platform properties

var Platform = function Platform(grid, newPlatBottom) {
  _classCallCheck(this, Platform);

  this.bottom = newPlatBottom;
  this.left = Math.random() * 450;
  this.visual = document.createElement('div');
  var visual = this.visual;
  visual.classList.add('platform');
  visual.style.left = this.left + 'px';
  visual.style.bottom = this.bottom + 'px';
  grid.appendChild(visual);
}; // Creates platforms and pushes to platform array


function createPlatforms() {
  var grid = document.querySelector('.grid');

  for (var i = 0; i < platformCount; i++) {
    var platformGap = 1700 / platformCount;
    var newPlatBottom = 100 + i * platformGap;
    var newPlatform = new Platform(grid, newPlatBottom);
    platforms.push(newPlatform);
  }
} // Moves Platforms by substracting, or adding to the Platform's bottom property

function movePlatforms() {
  var grid = document.querySelector('.grid');

  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused || _game_js__WEBPACK_IMPORTED_MODULE_0__.softPaused) {
    platforms.forEach(function (platform) {
      if (_player_js__WEBPACK_IMPORTED_MODULE_1__.isJumping) {
        if (_game_js__WEBPACK_IMPORTED_MODULE_0__.softPaused) {
          platform.bottom -= 1.5;
        } else {
          platform.bottom -= 3.5;
        }
      } else if (_player_js__WEBPACK_IMPORTED_MODULE_1__.isFalling) {
        platform.bottom += 1;
      }

      var visual = platform.visual;
      visual.style.bottom = platform.bottom + 'px';
      updatePlatforms(platform, grid);
    });
  }
} // Removes old platforms and creates new platforms that are then pushed to platform array

function updatePlatforms(platform, grid) {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gameOver) {
    if (platform.bottom <= -50) {
      var scoreText = document.querySelector('.score');
      var titleText = document.querySelector('.title');
      var movementText = document.querySelector('.movement');
      var shootText = document.querySelector('.shoot');
      var firstPlatform = platforms[0].visual;
      firstPlatform.remove();
      platforms.shift();

      if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.softPaused) {
        __webpack_require__.g.score += 1;
        scoreText.innerHTML = __webpack_require__.g.score;
        titleText.innerHTML = '';
        movementText.innerHTML = '';
        shootText.innerHTML = '';
      }

      var newPlatform = new Platform(grid, 1700);
      platforms.push(newPlatform);
    }
  }
}

/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isJumping": function() { return /* binding */ isJumping; },
/* harmony export */   "isFalling": function() { return /* binding */ isFalling; },
/* harmony export */   "slimeLeftSpace": function() { return /* binding */ slimeLeftSpace; },
/* harmony export */   "gameOver": function() { return /* binding */ gameOver; },
/* harmony export */   "startPoint": function() { return /* binding */ startPoint; },
/* harmony export */   "slimeBottomSpace": function() { return /* binding */ slimeBottomSpace; },
/* harmony export */   "leftTimerId": function() { return /* binding */ leftTimerId; },
/* harmony export */   "rightTimerId": function() { return /* binding */ rightTimerId; },
/* harmony export */   "upTimerId": function() { return /* binding */ upTimerId; },
/* harmony export */   "downTimerId": function() { return /* binding */ downTimerId; },
/* harmony export */   "createPlayer": function() { return /* binding */ createPlayer; },
/* harmony export */   "slimeJump": function() { return /* binding */ slimeJump; },
/* harmony export */   "playerMovements": function() { return /* binding */ playerMovements; },
/* harmony export */   "stopPlayerMovements": function() { return /* binding */ stopPlayerMovements; }
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/scripts/game.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform.js */ "./src/scripts/platform.js");
/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sound.js */ "./src/scripts/sound.js");
/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sound_js__WEBPACK_IMPORTED_MODULE_2__);



var slime = document.createElement('div');
var isGoingLeft = false;
var isGoingRight = false;
var isJumping = false;
var isFalling = true;
var slimeLeftSpace = 280;
var gameOver = false;
var startPoint = 200;
var slimeBottomSpace = startPoint;
var leftTimerId;
var rightTimerId;
var upTimerId;
var downTimerId; // Create 'Slime' and add to the grid.

function createPlayer() {
  document.querySelector('.grid').appendChild(slime);
  slime.classList.add('slime');
  slime.style.left = slimeLeftSpace + 'px';
  slime.style.bottom = slimeBottomSpace + 'px';
} // In charge of adding to the player's Y value and calling slimeFall()

function slimeJump() {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    clearInterval(downTimerId);
    isJumping = true;
    isFalling = false;
    upTimerId = setInterval(function () {
      if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
        slimeBottomSpace += 1;
        slime.style.bottom = slimeBottomSpace + 'px';
        if (slimeBottomSpace > startPoint + 100) slimeFall();
      }
    }, 1);
  }
} // In charge of subtracting the player's Y value and calling endGame()

function slimeFall() {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    clearInterval(upTimerId);
    isJumping = false;
    isFalling = true;
    downTimerId = setInterval(function () {
      if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
        slimeBottomSpace -= 2;
        slime.style.bottom = slimeBottomSpace + 'px';
        if (slimeBottomSpace <= -200) (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.endGame)(document.querySelector('.grid'));
        _platform_js__WEBPACK_IMPORTED_MODULE_1__.platforms.forEach(function (platform) {
          collisionDetect(platform);
        });
      }
    }, 1);
  }
} // Checks the value of the bottom of the player, if said value returns true it calls slimeJump()


function collisionDetect(platform) {
  if (slimeBottomSpace >= platform.bottom && slimeBottomSpace <= platform.bottom + 19 && slimeLeftSpace + 40 >= platform.left && slimeLeftSpace <= platform.left + 100 && !isJumping) {
    startPoint = slimeBottomSpace; // slimeSoundPlay();

    slimeJump();
    isJumping = true;
  }
} // Calls moveLeft() or moveRight depending on player input. *Uses keydown*


function playerMovements(event) {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    if (event.keyCode === 37 || event.keyCode === 65) moveLeft();
    if (event.keyCode === 39 || event.keyCode === 68) moveRight();
  }
} // Ceases player movement depending on key release. *Uses keyup*

function stopPlayerMovements(event) {
  if (event.keyCode === 37 || event.keyCode === 65) {
    isGoingLeft = false;
    clearInterval(leftTimerId);
  } else if (event.keyCode === 39 || event.keyCode === 68) {
    isGoingRight = false;
    clearInterval(rightTimerId);
  }
} // Decrements player's X value

function moveLeft() {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    clearInterval(leftTimerId);

    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }

    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (slimeLeftSpace >= -60) {
        slimeLeftSpace -= 2;
        slime.style.left = slimeLeftSpace + 'px';
      } else slimeLeftSpace = 600;
    }, 1);
  }
} // Increments player's X value


function moveRight() {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    clearInterval(rightTimerId);

    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }

    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (slimeLeftSpace <= 610) {
        slimeLeftSpace += 2;
        slime.style.left = slimeLeftSpace + 'px';
      } else slimeLeftSpace = -60;
    }, 1);
  }
}

/***/ }),

/***/ "./src/scripts/playerShoot.js":
/*!************************************!*\
  !*** ./src/scripts/playerShoot.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bullets": function() { return /* binding */ bullets; },
/* harmony export */   "playerShoot": function() { return /* binding */ playerShoot; },
/* harmony export */   "shootBullet": function() { return /* binding */ shootBullet; }
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy.js */ "./src/scripts/enemy.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var bullets = [];

var Bullet = function Bullet() {
  _classCallCheck(this, Bullet);

  this.bottom = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeBottomSpace;
  this.left = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeLeftSpace;
  this.visual = document.createElement('div');
  var visual = this.visual;
  visual.classList.add('bullet');
  visual.style.left = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeLeftSpace + 12 + 'px';
  visual.style.bottom = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeBottomSpace + 12 + 'px';
  document.querySelector('.grid').appendChild(visual);
};

function playerShoot(event) {
  if (event.keyCode === 13) {
    shootBullet();
    var newBullet = new Bullet(document.querySelector('.grid'), event.clientX, event.clientY);
    bullets.push(newBullet);
  }
}
function shootBullet(x, y) {
  bullets.forEach(function (bullet) {
    bullet.bottom -= 3;
    var visual = bullet.visual;
    visual.style.bottom = bullet.bottom + 'px';
    _enemy_js__WEBPACK_IMPORTED_MODULE_1__.enemys.forEach(function (enemy) {
      collisionDetect(enemy, bullet.bottom, bullet.left);
    });

    if (bullet.bottom >= 750) {
      var firstBullet = bullets[0].visual;
      firstBullet.remove();
      bullets.shift();
    }
  });
}

function collisionDetect(enemy, bottom, left) {
  if (bottom >= enemy.bottom && bottom <= enemy.bottom + 19 && left + 40 >= enemy.left && left <= enemy.left + 100) {
    (0,_enemy_js__WEBPACK_IMPORTED_MODULE_1__.killEnemy)(enemy);
  }
}

/***/ }),

/***/ "./src/scripts/sound.js":
/*!******************************!*\
  !*** ./src/scripts/sound.js ***!
  \******************************/
/***/ (function() {

// let muted = true;
// let songRunning = false;
// // const menu = document.querySelector(".menu")
// // console.log(menu)
// // const menuList = menu.querySelector(".menu-list")
// // Importing background music
// let backgroundMusicOne   = new Audio("../src/sounds/background_music/A Lonely Cherry Tree 🌸.mp3");
// let backgroundMusicTwo   = new Audio("../src/sounds/background_music/Hello, it's Me!.mp3");
// let backgroundMusicThree = new Audio("../src/sounds/background_music/Melancholic Walk.mp3");
// let backgroundMusicFour  = new Audio("../src/sounds/background_music/No Destination.mp3");
// let backgroundMusicFive  = new Audio("../src/sounds/background_music/Ready Pixel One.mp3");
// let backgroundMusicSix   = new Audio("../src/sounds/background_music/Run As Fast As You Can.mp3");
// let backgroundMusicSeven = new Audio("../src/sounds/background_music/The search.mp3");
// let backgroundMusicEight = new Audio("../src/sounds/background_music/Welcome Space Traveler.mp3");
// let backgroundMusic = [backgroundMusicOne, backgroundMusicTwo, backgroundMusicThree, backgroundMusicFour,
//                        backgroundMusicFive, backgroundMusicSix, backgroundMusicSeven, backgroundMusicEight];
// // Importing slime sounds
// let slimeSoundOne    = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
// let slimeSoundTwo    = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
// let slimeSoundThree  = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
// let slimeSoundFour   = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3");
// let slimeSoundFive   = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
// let slimeSoundSix    = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
// let slimeSoundSeven  = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
// let slimeSoundEight  = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3");
// // Adjusting slime sound volumes
// let slimeVolume = 0.05;
// slimeSoundOne.volume    = slimeVolume;
// slimeSoundTwo.volume    = slimeVolume;
// slimeSoundThree.volume  = slimeVolume;
// slimeSoundFour.volume   = slimeVolume;
// slimeSoundFive.volume   = slimeVolume;
// slimeSoundSix.volume    = slimeVolume;
// slimeSoundSeven.volume  = slimeVolume;
// slimeSoundEight.volume  = slimeVolume;
// // Pushing slime sounds into an array
// let slimeSounds = [slimeSoundOne, slimeSoundTwo, slimeSoundThree, slimeSoundFour, slimeSoundFour,
//     slimeSoundFive, slimeSoundSix, slimeSoundSeven, slimeSoundEight];
// // let backgroundMusicVolume = 1;
// // backgroundMusicOne.volume   = backgroundMusicVolume;
// // backgroundMusicTwo .volume  = backgroundMusicVolume;
// // backgroundMusicThree.volume = backgroundMusicVolume;
// // backgroundMusicFour.volume  = backgroundMusicVolume;
// // backgroundMusicFive.volume  = backgroundMusicVolume;
// // backgroundMusicSix.volume   = backgroundMusicVolume;
// // backgroundMusicSeven.volume = backgroundMusicVolume;
// // backgroundMusicEight.volume = backgroundMusicVolume;
// // Returning random slime sound when called
// function sample(array) {
//     return array[Math.floor ( Math.random() * array.length )]
// }
// document.addEventListener('DOMContentLoaded', () => {
//     const slider = document.getElementById("music");
// slider.addEventListener('change', function() {
//     let currentSong = sample(backgroundMusic)
//     backgroundMusicPlay(currentSong)
//     currentSong.volume = this.value / 100;
//     console.log(this.value / 100)
//     })
// })
// export function slimeSoundPlay() {
//     if (!muted) sample(slimeSounds).play();
// }
// export function backgroundMusicPlay(currentSong) {
//     if (!songRunning) {
//         songRunning = true;
//         if (!muted) {
//             currentSong.play();
//         }
//     }
// }

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/game.js */ "./src/scripts/game.js");

var grid = document.querySelector('.grid');
document.addEventListener('DOMContentLoaded', function () {
  (0,_scripts_game_js__WEBPACK_IMPORTED_MODULE_0__.start)(grid);
  (0,_scripts_game_js__WEBPACK_IMPORTED_MODULE_0__.pauseGame)();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7VUN6RkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRCw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBRUEsSUFBTXJCLElBQUksR0FBR08sUUFBUSxDQUFDTyxhQUFULENBQXVCLE9BQXZCLENBQWI7QUFFQVAsUUFBUSxDQUFDcUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaERGLEVBQUFBLHVEQUFLLENBQUMxQyxJQUFELENBQUw7QUFDQW1ELEVBQUFBLDJEQUFTO0FBQ1osQ0FIRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZW5lbXkuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF0Zm9ybS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyU2hvb3QuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvc291bmQuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lT3ZlciwgZ2FtZVBhdXNlZCB9IGZyb20gJy4vZ2FtZS5qcyc7XG5cbmxldCBlbmVteUNvdW50ID0gMjtcblxuZXhwb3J0IGxldCBlbmVteXMgPSBbXTtcblxuLy8gU2V0cyBlbmVteSBwcm9wZXJ0aWVzXG5cbmNsYXNzIEVuZW15IHtcbiAgY29uc3RydWN0b3IoZ3JpZCwgbmV3RW5lbXlCb3R0b20pIHtcbiAgICB0aGlzLmJvdHRvbSA9IG5ld0VuZW15Qm90dG9tO1xuICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnZW5lbXknKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gIH1cbn1cblxuLy8gQ3JlYXRlcyBlbmVteXMgYW5kIHB1c2hlcyB0byBlbmVteSBhcnJheVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRW5lbXlzKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmVteUNvdW50OyBpKyspIHtcbiAgICBsZXQgZW5lbXlHYXAgPSAtMTcwMCAvIGVuZW15Q291bnQ7XG4gICAgbGV0IG5ld0VuZW15Qm90dG9tID0gLTEyMCArIGkgKiBlbmVteUdhcDtcbiAgICBsZXQgbmV3RW5lbXkgPSBuZXcgRW5lbXkoZ3JpZCwgbmV3RW5lbXlCb3R0b20sIGkpO1xuICAgIGVuZW15cy5wdXNoKG5ld0VuZW15KTtcbiAgfVxufVxuXG4vLyBNb3ZlcyBlbmVteXMgYnkgc3Vic3RyYWN0aW5nLCBvciBhZGRpbmcgdG8gdGhlIGVuZW15J3MgYm90dG9tIHByb3BlcnR5XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlRW5lbXlzKCkge1xuICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBlbmVteXMuZm9yRWFjaCgoZW5lbXkpID0+IHtcbiAgICAgIGVuZW15LmJvdHRvbSArPSAwLjU1O1xuICAgICAgbGV0IHZpc3VhbCA9IGVuZW15LnZpc3VhbDtcbiAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBlbmVteS5ib3R0b20gKyAncHgnO1xuICAgICAgdXBkYXRlRW5lbXlzKGVuZW15LCBncmlkKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBSZW1vdmVzIG9sZCBlbmVteXMgYW5kIGNyZWF0ZXMgbmV3IGVuZW15cyB0aGF0IGFyZSB0aGVuIHB1c2hlZCB0byBlbmVteSBhcnJheVxuXG5mdW5jdGlvbiB1cGRhdGVFbmVteXMoZW5lbXksIGdyaWQpIHtcbiAgaWYgKCFnYW1lT3Zlcikge1xuICAgIGlmIChlbmVteS5ib3R0b20gPj0gMTcwMCkge1xuICAgICAgbGV0IGZpcnN0RW5lbXkgPSBlbmVteXNbMF0udmlzdWFsO1xuICAgICAgZmlyc3RFbmVteS5yZW1vdmUoKTtcbiAgICAgIGdsb2JhbC5zY29yZSAtPSAyMDtcbiAgICAgIGVuZW15cy5zaGlmdCgpO1xuICAgICAgbGV0IG5ld0VuZW15ID0gbmV3IEVuZW15KGdyaWQsIC01MCk7XG4gICAgICBlbmVteXMucHVzaChuZXdFbmVteSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBraWxsRW5lbXkoZW5lbXkpIHtcbiAgZW5lbXkudmlzdWFsLnJlbW92ZSgpO1xuICBnbG9iYWwuc2NvcmUgKz0gMTtcbn1cbiIsIi8vIEFkZCBzdGFydCBtZW51XG4vLyBBZGQgcGF1c2UgbWVudVxuLy8gQWRkIGRlYXRoIHNjcmVlblxuLy8gQk9OVVM6IGFkZCBlbmVteSwgYWRkIHN0YWdlc1xuXG5pbXBvcnQge1xuICBjcmVhdGVQbGF5ZXIsXG4gIHNsaW1lSnVtcCxcbiAgcGxheWVyTW92ZW1lbnRzLFxuICBzdG9wUGxheWVyTW92ZW1lbnRzLFxuICB1cFRpbWVySWQsXG4gIGRvd25UaW1lcklkLFxuICBsZWZ0VGltZXJJZCxcbiAgcmlnaHRUaW1lcklkLFxufSBmcm9tICcuL3BsYXllci5qcyc7XG5pbXBvcnQgeyBjcmVhdGVQbGF0Zm9ybXMsIG1vdmVQbGF0Zm9ybXMgfSBmcm9tICcuL3BsYXRmb3JtLmpzJztcbmltcG9ydCB7IHBsYXllclNob290LCBzaG9vdEJ1bGxldCB9IGZyb20gJy4vcGxheWVyU2hvb3QuanMnO1xuaW1wb3J0IHsgY3JlYXRlRW5lbXlzLCBtb3ZlRW5lbXlzIH0gZnJvbSAnLi9lbmVteS5qcyc7XG5cbmV4cG9ydCBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbmV4cG9ydCBsZXQgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuZXhwb3J0IGxldCBzb2Z0UGF1c2VkID0gZmFsc2U7XG5cbi8vIEluIGNoYXJnZSBvZiBzdGFydGluZyB0aGUgZ2FtZSwgY2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBuZWVkZWQgZm9yIGJ1aWxkaW5nIGFuZCByZW5kZXJpbmcuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydChncmlkKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNyZWF0ZVBsYXRmb3JtcygpO1xuICAgIGNyZWF0ZUVuZW15cygpO1xuICAgIGNyZWF0ZVBsYXllcigpO1xuICAgIHNldEludGVydmFsKG1vdmVQbGF0Zm9ybXMsIDEpO1xuICAgIHNldEludGVydmFsKG1vdmVFbmVteXMsIDEpO1xuICAgIHNldEludGVydmFsKHNob290QnVsbGV0LCAxKTtcbiAgICBzbGltZUp1bXAoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJTaG9vdCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllck1vdmVtZW50cyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllclBhdXNlR2FtZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJlc3RhcnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc3RvcFBsYXllck1vdmVtZW50cyk7XG4gIH1cbn1cblxuLy8gUGF1c2VzIGdhbWUgYnkgc2V0dGluZyBleHBvcnRlZCB2YXJpYWJsZSB0byBkZXNpcmVkIGdhbWUgc3RhdGVcblxuZnVuY3Rpb24gcGxheWVyUGF1c2VHYW1lKGV2ZW50KSB7XG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gIGlmIChldmVudC5rZXlDb2RlID09PSAzMiAmJiAhZ2FtZVBhdXNlZCkge1xuICAgIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgJiYgZ2FtZVBhdXNlZCkge1xuICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lUGF1c2VkID0gZmFsc2U7XG4gICAgc29mdFBhdXNlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXVzZUdhbWUoKSB7XG4gIGdhbWVQYXVzZWQgPSB0cnVlO1xuICBzb2Z0UGF1c2VkID0gdHJ1ZTtcbn1cblxuLy8gRW5kcyBnYW1lIGJ5IGNsZWFyaW5nIHRoZSBncmlkIGFuZCBUaW1lcklkc1xuXG5leHBvcnQgZnVuY3Rpb24gZW5kR2FtZSgpIHtcbiAgZ2FtZU92ZXIgPSB0cnVlO1xuICBjbGVhckludGVydmFsKHVwVGltZXJJZCk7XG4gIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpO1xuICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICBjb25zdCBlbmRpbmdPbmVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZUVuZGluZycpO1xuICBjb25zdCBlbmRpbmdUd29UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR3b0VuZGluZycpO1xuICBjb25zdCBlbmRpbmdUaHJlZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWxTY29yZScpO1xuICBjb25zdCBvZ1Njb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XG4gIG9nU2NvcmUuaW5uZXJIVE1MID0gJyc7XG4gIGVuZGluZ09uZVRleHQuaW5uZXJIVE1MID0gXCJpdCB3YXNuJ3QgZW5vdWdoXCI7XG4gIGVuZGluZ1R3b1RleHQuaW5uZXJIVE1MID0gJ3ByZXNzIFIgdG8gdHJ5IGFnYWluJztcbiAgZW5kaW5nVGhyZWVUZXh0LmlubmVySFRNTCA9IGBmaW5hbCBzY29yZTogJHtnbG9iYWwuc2NvcmV9YDtcbn1cblxuLy8gUmVzdGFydHMgZ2FtZSB2aWEgcmVsb2FkaW5nIHBhZ2VcblxuZnVuY3Rpb24gcmVzdGFydChldmVudCkge1xuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gODIpIHtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2FtZU92ZXIsIGdhbWVQYXVzZWQsIHNvZnRQYXVzZWQgfSBmcm9tICcuL2dhbWUuanMnO1xuaW1wb3J0IHsgaXNKdW1waW5nLCBpc0ZhbGxpbmcgfSBmcm9tICcuL3BsYXllci5qcyc7XG5cbmxldCBwbGF0Zm9ybUNvdW50ID0gMTA7XG5cbmdsb2JhbC5zY29yZSA9IDE7XG5leHBvcnQgbGV0IHBsYXRmb3JtcyA9IFtdO1xuXG4vLyBTZXRzIFBsYXRmb3JtIHByb3BlcnRpZXNcblxuY2xhc3MgUGxhdGZvcm0ge1xuICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgdGhpcy5ib3R0b20gPSBuZXdQbGF0Qm90dG9tO1xuICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgncGxhdGZvcm0nKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gIH1cbn1cblxuLy8gQ3JlYXRlcyBwbGF0Zm9ybXMgYW5kIHB1c2hlcyB0byBwbGF0Zm9ybSBhcnJheVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhdGZvcm1zKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0Zm9ybUNvdW50OyBpKyspIHtcbiAgICBsZXQgcGxhdGZvcm1HYXAgPSAxNzAwIC8gcGxhdGZvcm1Db3VudDtcbiAgICBsZXQgbmV3UGxhdEJvdHRvbSA9IDEwMCArIGkgKiBwbGF0Zm9ybUdhcDtcbiAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgbmV3UGxhdEJvdHRvbSk7XG4gICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICB9XG59XG5cbi8vIE1vdmVzIFBsYXRmb3JtcyBieSBzdWJzdHJhY3RpbmcsIG9yIGFkZGluZyB0byB0aGUgUGxhdGZvcm0ncyBib3R0b20gcHJvcGVydHlcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVQbGF0Zm9ybXMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICBpZiAoIWdhbWVQYXVzZWQgfHwgc29mdFBhdXNlZCkge1xuICAgIHBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgaWYgKGlzSnVtcGluZykge1xuICAgICAgICBpZiAoc29mdFBhdXNlZCkge1xuICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAxLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDMuNTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0ZhbGxpbmcpIHtcbiAgICAgICAgcGxhdGZvcm0uYm90dG9tICs9IDE7XG4gICAgICB9XG4gICAgICBsZXQgdmlzdWFsID0gcGxhdGZvcm0udmlzdWFsO1xuICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHBsYXRmb3JtLmJvdHRvbSArICdweCc7XG4gICAgICB1cGRhdGVQbGF0Zm9ybXMocGxhdGZvcm0sIGdyaWQpO1xuICAgIH0pO1xuICB9XG59XG5cbi8vIFJlbW92ZXMgb2xkIHBsYXRmb3JtcyBhbmQgY3JlYXRlcyBuZXcgcGxhdGZvcm1zIHRoYXQgYXJlIHRoZW4gcHVzaGVkIHRvIHBsYXRmb3JtIGFycmF5XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsYXRmb3JtcyhwbGF0Zm9ybSwgZ3JpZCkge1xuICBpZiAoIWdhbWVPdmVyKSB7XG4gICAgaWYgKHBsYXRmb3JtLmJvdHRvbSA8PSAtNTApIHtcbiAgICAgIGNvbnN0IHNjb3JlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgICAgY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgICBjb25zdCBtb3ZlbWVudFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZW1lbnQnKTtcbiAgICAgIGNvbnN0IHNob290VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG9vdCcpO1xuICAgICAgbGV0IGZpcnN0UGxhdGZvcm0gPSBwbGF0Zm9ybXNbMF0udmlzdWFsO1xuICAgICAgZmlyc3RQbGF0Zm9ybS5yZW1vdmUoKTtcbiAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgaWYgKCFzb2Z0UGF1c2VkKSB7XG4gICAgICAgIGdsb2JhbC5zY29yZSArPSAxO1xuICAgICAgICBzY29yZVRleHQuaW5uZXJIVE1MID0gZ2xvYmFsLnNjb3JlO1xuICAgICAgICB0aXRsZVRleHQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1vdmVtZW50VGV4dC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgc2hvb3RUZXh0LmlubmVySFRNTCA9ICcnO1xuICAgICAgfVxuICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIDE3MDApO1xuICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtlbmRHYW1lLCBnYW1lUGF1c2VkfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQge3BsYXRmb3Jtc30gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtzbGltZVNvdW5kUGxheX0gZnJvbSBcIi4vc291bmQuanNcIlxuXG5jb25zdCBzbGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbmxldCBpc0dvaW5nTGVmdCAgICAgICAgICAgICA9IGZhbHNlO1xubGV0IGlzR29pbmdSaWdodCAgICAgICAgICAgID0gZmFsc2U7XG5cbmV4cG9ydCBsZXQgaXNKdW1waW5nICAgICAgICA9IGZhbHNlO1xuZXhwb3J0IGxldCBpc0ZhbGxpbmcgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc2xpbWVMZWZ0U3BhY2UgICA9IDI4MDtcbmV4cG9ydCBsZXQgZ2FtZU92ZXIgICAgICAgICA9IGZhbHNlO1xuZXhwb3J0IGxldCBzdGFydFBvaW50ICAgICAgID0gMjAwO1xuZXhwb3J0IGxldCBzbGltZUJvdHRvbVNwYWNlID0gc3RhcnRQb2ludDtcbmV4cG9ydCBsZXQgbGVmdFRpbWVySWQ7XG5leHBvcnQgbGV0IHJpZ2h0VGltZXJJZDtcbmV4cG9ydCBsZXQgdXBUaW1lcklkO1xuZXhwb3J0IGxldCBkb3duVGltZXJJZDtcblxuLy8gQ3JlYXRlICdTbGltZScgYW5kIGFkZCB0byB0aGUgZ3JpZC5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHNsaW1lKTtcbiAgICBzbGltZS5jbGFzc0xpc3QuYWRkKCdzbGltZScpO1xuICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG59XG5cbi8vIEluIGNoYXJnZSBvZiBhZGRpbmcgdG8gdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgc2xpbWVGYWxsKClcblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lSnVtcCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZClcbiAgICAgICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgaXNGYWxsaW5nID0gZmFsc2U7XG4gICAgICAgIHVwVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVCb3R0b21TcGFjZSArPSAxO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDEwMCkgc2xpbWVGYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBJbiBjaGFyZ2Ugb2Ygc3VidHJhY3RpbmcgdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgZW5kR2FtZSgpXG5cbmZ1bmN0aW9uIHNsaW1lRmFsbCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpXG4gICAgICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgICAgICBpc0ZhbGxpbmcgPSB0cnVlO1xuICAgICAgICBkb3duVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVCb3R0b21TcGFjZSAtPSAyO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlIDw9IC0yMDAgKSBlbmRHYW1lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykpOyBcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7IGNvbGxpc2lvbkRldGVjdChwbGF0Zm9ybSk7fSApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBDaGVja3MgdGhlIHZhbHVlIG9mIHRoZSBib3R0b20gb2YgdGhlIHBsYXllciwgaWYgc2FpZCB2YWx1ZSByZXR1cm5zIHRydWUgaXQgY2FsbHMgc2xpbWVKdW1wKClcblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0KHBsYXRmb3JtKSB7XG4gICAgaWYgKChzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSkgJiYgKHNsaW1lQm90dG9tU3BhY2UgPD0gKHBsYXRmb3JtLmJvdHRvbSArIDE5KSkgJiZcbiAgICAoKHNsaW1lTGVmdFNwYWNlICsgNDApID49IHBsYXRmb3JtLmxlZnQpICYmIChzbGltZUxlZnRTcGFjZSA8PSAocGxhdGZvcm0ubGVmdCArIDEwMCkpICYmXG4gICAgIWlzSnVtcGluZykge1xuICAgICAgICBzdGFydFBvaW50ID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgLy8gc2xpbWVTb3VuZFBsYXkoKTtcbiAgICAgICAgc2xpbWVKdW1wKCk7XG4gICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgfVxufVxuXG4vLyBDYWxscyBtb3ZlTGVmdCgpIG9yIG1vdmVSaWdodCBkZXBlbmRpbmcgb24gcGxheWVyIGlucHV0LiAqVXNlcyBrZXlkb3duKlxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkgbW92ZUxlZnQoKTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSBtb3ZlUmlnaHQoKTtcbiAgICAgICAgXG4gICAgfVxufVxuXG4vLyBDZWFzZXMgcGxheWVyIG1vdmVtZW50IGRlcGVuZGluZyBvbiBrZXkgcmVsZWFzZS4gKlVzZXMga2V5dXAqXG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wUGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSB7XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSB7XG4gICAgICAgIGlzR29pbmdSaWdodCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICB9XG59XG5cbi8vIERlY3JlbWVudHMgcGxheWVyJ3MgWCB2YWx1ZVxuXG5mdW5jdGlvbiBtb3ZlTGVmdCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gdHJ1ZVxuICAgICAgICBsZWZ0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAtNjApIHtcbiAgICAgICAgICAgIHNsaW1lTGVmdFNwYWNlIC09IDI7XG4gICAgICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnXG4gICAgICAgICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSA2MDA7XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBJbmNyZW1lbnRzIHBsYXllcidzIFggdmFsdWVcblxuZnVuY3Rpb24gbW92ZVJpZ2h0KCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICAgICAgaWYgKGlzR29pbmdMZWZ0KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgICAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlzR29pbmdSaWdodCA9IHRydWVcbiAgICAgICAgcmlnaHRUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNsaW1lTGVmdFNwYWNlIDw9IDYxMCkge1xuICAgICAgICAgICAgICAgIHNsaW1lTGVmdFNwYWNlICs9IDI7XG4gICAgICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgICAgfSBlbHNlIHNsaW1lTGVmdFNwYWNlID0gLTYwO1xuICAgICAgICB9LCAxKVxuICAgIH1cbn1cblxuIiwiaW1wb3J0IHsgc2xpbWVMZWZ0U3BhY2UsIHNsaW1lQm90dG9tU3BhY2UgfSBmcm9tICcuL3BsYXllci5qcyc7XG5pbXBvcnQgeyBlbmVteXMsIGtpbGxFbmVteSB9IGZyb20gJy4vZW5lbXkuanMnO1xuXG5leHBvcnQgbGV0IGJ1bGxldHMgPSBbXTtcblxuY2xhc3MgQnVsbGV0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlO1xuICAgIHRoaXMubGVmdCA9IHNsaW1lTGVmdFNwYWNlO1xuICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2J1bGxldCcpO1xuICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAxMiArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAxMiArICdweCc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKS5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJTaG9vdChldmVudCkge1xuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICBzaG9vdEJ1bGxldCgpO1xuICAgIGxldCBuZXdCdWxsZXQgPSBuZXcgQnVsbGV0KFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKSxcbiAgICAgIGV2ZW50LmNsaWVudFgsXG4gICAgICBldmVudC5jbGllbnRZXG4gICAgKTtcbiAgICBidWxsZXRzLnB1c2gobmV3QnVsbGV0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvb3RCdWxsZXQoeCwgeSkge1xuICBidWxsZXRzLmZvckVhY2goKGJ1bGxldCkgPT4ge1xuICAgIGJ1bGxldC5ib3R0b20gLT0gMztcbiAgICBsZXQgdmlzdWFsID0gYnVsbGV0LnZpc3VhbDtcbiAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gYnVsbGV0LmJvdHRvbSArICdweCc7XG4gICAgZW5lbXlzLmZvckVhY2goKGVuZW15KSA9PiB7XG4gICAgICBjb2xsaXNpb25EZXRlY3QoZW5lbXksIGJ1bGxldC5ib3R0b20sIGJ1bGxldC5sZWZ0KTtcbiAgICB9KTtcbiAgICBpZiAoYnVsbGV0LmJvdHRvbSA+PSA3NTApIHtcbiAgICAgIGxldCBmaXJzdEJ1bGxldCA9IGJ1bGxldHNbMF0udmlzdWFsO1xuICAgICAgZmlyc3RCdWxsZXQucmVtb3ZlKCk7XG4gICAgICBidWxsZXRzLnNoaWZ0KCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0KGVuZW15LCBib3R0b20sIGxlZnQpIHtcbiAgaWYgKFxuICAgIGJvdHRvbSA+PSBlbmVteS5ib3R0b20gJiZcbiAgICBib3R0b20gPD0gZW5lbXkuYm90dG9tICsgMTkgJiZcbiAgICBsZWZ0ICsgNDAgPj0gZW5lbXkubGVmdCAmJlxuICAgIGxlZnQgPD0gZW5lbXkubGVmdCArIDEwMFxuICApIHtcbiAgICBraWxsRW5lbXkoZW5lbXkpO1xuICB9XG59XG4iLCIvLyBsZXQgbXV0ZWQgPSB0cnVlO1xuLy8gbGV0IHNvbmdSdW5uaW5nID0gZmFsc2U7XG5cbi8vIC8vIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnVcIilcbi8vIC8vIGNvbnNvbGUubG9nKG1lbnUpXG4vLyAvLyBjb25zdCBtZW51TGlzdCA9IG1lbnUucXVlcnlTZWxlY3RvcihcIi5tZW51LWxpc3RcIilcblxuXG4vLyAvLyBJbXBvcnRpbmcgYmFja2dyb3VuZCBtdXNpY1xuXG4vLyBsZXQgYmFja2dyb3VuZE11c2ljT25lICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvQSBMb25lbHkgQ2hlcnJ5IFRyZWUg8J+MuC5tcDNcIik7XG4vLyBsZXQgYmFja2dyb3VuZE11c2ljVHdvICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvSGVsbG8sIGl0J3MgTWUhLm1wM1wiKTtcbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNUaHJlZSA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9NZWxhbmNob2xpYyBXYWxrLm1wM1wiKTtcbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNGb3VyICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9ObyBEZXN0aW5hdGlvbi5tcDNcIik7XG4vLyBsZXQgYmFja2dyb3VuZE11c2ljRml2ZSAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvUmVhZHkgUGl4ZWwgT25lLm1wM1wiKTtcbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNTaXggICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9SdW4gQXMgRmFzdCBBcyBZb3UgQ2FuLm1wM1wiKTtcbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNTZXZlbiA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9UaGUgc2VhcmNoLm1wM1wiKTtcbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNFaWdodCA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9XZWxjb21lIFNwYWNlIFRyYXZlbGVyLm1wM1wiKTtcblxuLy8gbGV0IGJhY2tncm91bmRNdXNpYyA9IFtiYWNrZ3JvdW5kTXVzaWNPbmUsIGJhY2tncm91bmRNdXNpY1R3bywgYmFja2dyb3VuZE11c2ljVGhyZWUsIGJhY2tncm91bmRNdXNpY0ZvdXIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRNdXNpY0ZpdmUsIGJhY2tncm91bmRNdXNpY1NpeCwgYmFja2dyb3VuZE11c2ljU2V2ZW4sIGJhY2tncm91bmRNdXNpY0VpZ2h0XTtcblxuLy8gLy8gSW1wb3J0aW5nIHNsaW1lIHNvdW5kc1xuLy8gbGV0IHNsaW1lU291bmRPbmUgICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8wLm1wM1wiKTtcbi8vIGxldCBzbGltZVNvdW5kVHdvICAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMS5tcDNcIik7XG4vLyBsZXQgc2xpbWVTb3VuZFRocmVlICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzIubXAzXCIpO1xuLy8gbGV0IHNsaW1lU291bmRGb3VyICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8zLm1wM1wiKTtcbi8vIGxldCBzbGltZVNvdW5kRml2ZSAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMC5tcDNcIik7XG4vLyBsZXQgc2xpbWVTb3VuZFNpeCAgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzEubXAzXCIpO1xuLy8gbGV0IHNsaW1lU291bmRTZXZlbiAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8yLm1wM1wiKTtcbi8vIGxldCBzbGltZVNvdW5kRWlnaHQgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMy5tcDNcIik7XG5cbi8vIC8vIEFkanVzdGluZyBzbGltZSBzb3VuZCB2b2x1bWVzXG4vLyBsZXQgc2xpbWVWb2x1bWUgPSAwLjA1O1xuLy8gc2xpbWVTb3VuZE9uZS52b2x1bWUgICAgPSBzbGltZVZvbHVtZTtcbi8vIHNsaW1lU291bmRUd28udm9sdW1lICAgID0gc2xpbWVWb2x1bWU7XG4vLyBzbGltZVNvdW5kVGhyZWUudm9sdW1lICA9IHNsaW1lVm9sdW1lO1xuLy8gc2xpbWVTb3VuZEZvdXIudm9sdW1lICAgPSBzbGltZVZvbHVtZTtcbi8vIHNsaW1lU291bmRGaXZlLnZvbHVtZSAgID0gc2xpbWVWb2x1bWU7XG4vLyBzbGltZVNvdW5kU2l4LnZvbHVtZSAgICA9IHNsaW1lVm9sdW1lO1xuLy8gc2xpbWVTb3VuZFNldmVuLnZvbHVtZSAgPSBzbGltZVZvbHVtZTtcbi8vIHNsaW1lU291bmRFaWdodC52b2x1bWUgID0gc2xpbWVWb2x1bWU7XG5cbi8vIC8vIFB1c2hpbmcgc2xpbWUgc291bmRzIGludG8gYW4gYXJyYXlcbi8vIGxldCBzbGltZVNvdW5kcyA9IFtzbGltZVNvdW5kT25lLCBzbGltZVNvdW5kVHdvLCBzbGltZVNvdW5kVGhyZWUsIHNsaW1lU291bmRGb3VyLCBzbGltZVNvdW5kRm91cixcbi8vICAgICBzbGltZVNvdW5kRml2ZSwgc2xpbWVTb3VuZFNpeCwgc2xpbWVTb3VuZFNldmVuLCBzbGltZVNvdW5kRWlnaHRdO1xuXG4vLyAvLyBsZXQgYmFja2dyb3VuZE11c2ljVm9sdW1lID0gMTtcblxuLy8gLy8gYmFja2dyb3VuZE11c2ljT25lLnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gLy8gYmFja2dyb3VuZE11c2ljVHdvIC52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gLy8gYmFja2dyb3VuZE11c2ljVGhyZWUudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gLy8gYmFja2dyb3VuZE11c2ljRm91ci52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gLy8gYmFja2dyb3VuZE11c2ljRml2ZS52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gLy8gYmFja2dyb3VuZE11c2ljU2l4LnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gLy8gYmFja2dyb3VuZE11c2ljU2V2ZW4udm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gLy8gYmFja2dyb3VuZE11c2ljRWlnaHQudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuXG5cblxuLy8gLy8gUmV0dXJuaW5nIHJhbmRvbSBzbGltZSBzb3VuZCB3aGVuIGNhbGxlZFxuXG4vLyBmdW5jdGlvbiBzYW1wbGUoYXJyYXkpIHtcbi8vICAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vciAoIE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGggKV1cbi8vIH1cblxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbi8vICAgICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11c2ljXCIpO1xuXG4vLyBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4vLyAgICAgbGV0IGN1cnJlbnRTb25nID0gc2FtcGxlKGJhY2tncm91bmRNdXNpYylcbi8vICAgICBiYWNrZ3JvdW5kTXVzaWNQbGF5KGN1cnJlbnRTb25nKVxuLy8gICAgIGN1cnJlbnRTb25nLnZvbHVtZSA9IHRoaXMudmFsdWUgLyAxMDA7XG4vLyAgICAgY29uc29sZS5sb2codGhpcy52YWx1ZSAvIDEwMClcbi8vICAgICB9KVxuLy8gfSlcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNsaW1lU291bmRQbGF5KCkge1xuLy8gICAgIGlmICghbXV0ZWQpIHNhbXBsZShzbGltZVNvdW5kcykucGxheSgpO1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gYmFja2dyb3VuZE11c2ljUGxheShjdXJyZW50U29uZykge1xuLy8gICAgIGlmICghc29uZ1J1bm5pbmcpIHtcbi8vICAgICAgICAgc29uZ1J1bm5pbmcgPSB0cnVlO1xuLy8gICAgICAgICBpZiAoIW11dGVkKSB7XG4vLyAgICAgICAgICAgICBjdXJyZW50U29uZy5wbGF5KCk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4gICAgXG4vLyB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3N0YXJ0LCBwYXVzZUdhbWV9IGZyb20gXCIuL3NjcmlwdHMvZ2FtZS5qc1wiXG5cbmNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIHN0YXJ0KGdyaWQpO1xuICAgIHBhdXNlR2FtZSgpO1xufSlcbiJdLCJuYW1lcyI6WyJnYW1lT3ZlciIsImdhbWVQYXVzZWQiLCJlbmVteUNvdW50IiwiZW5lbXlzIiwiRW5lbXkiLCJncmlkIiwibmV3RW5lbXlCb3R0b20iLCJib3R0b20iLCJsZWZ0IiwiTWF0aCIsInJhbmRvbSIsInZpc3VhbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVFbmVteXMiLCJxdWVyeVNlbGVjdG9yIiwiaSIsImVuZW15R2FwIiwibmV3RW5lbXkiLCJwdXNoIiwibW92ZUVuZW15cyIsImZvckVhY2giLCJlbmVteSIsInVwZGF0ZUVuZW15cyIsImZpcnN0RW5lbXkiLCJyZW1vdmUiLCJnbG9iYWwiLCJzY29yZSIsInNoaWZ0Iiwia2lsbEVuZW15IiwiY3JlYXRlUGxheWVyIiwic2xpbWVKdW1wIiwicGxheWVyTW92ZW1lbnRzIiwic3RvcFBsYXllck1vdmVtZW50cyIsInVwVGltZXJJZCIsImRvd25UaW1lcklkIiwibGVmdFRpbWVySWQiLCJyaWdodFRpbWVySWQiLCJjcmVhdGVQbGF0Zm9ybXMiLCJtb3ZlUGxhdGZvcm1zIiwicGxheWVyU2hvb3QiLCJzaG9vdEJ1bGxldCIsInNvZnRQYXVzZWQiLCJzdGFydCIsInNldEludGVydmFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBsYXllclBhdXNlR2FtZSIsInJlc3RhcnQiLCJldmVudCIsIm1lbnUiLCJrZXlDb2RlIiwiZGlzcGxheSIsInBhdXNlR2FtZSIsImVuZEdhbWUiLCJjbGVhckludGVydmFsIiwiZW5kaW5nT25lVGV4dCIsImVuZGluZ1R3b1RleHQiLCJlbmRpbmdUaHJlZVRleHQiLCJvZ1Njb3JlIiwiaW5uZXJIVE1MIiwibG9jYXRpb24iLCJyZWxvYWQiLCJpc0p1bXBpbmciLCJpc0ZhbGxpbmciLCJwbGF0Zm9ybUNvdW50IiwicGxhdGZvcm1zIiwiUGxhdGZvcm0iLCJuZXdQbGF0Qm90dG9tIiwicGxhdGZvcm1HYXAiLCJuZXdQbGF0Zm9ybSIsInBsYXRmb3JtIiwidXBkYXRlUGxhdGZvcm1zIiwic2NvcmVUZXh0IiwidGl0bGVUZXh0IiwibW92ZW1lbnRUZXh0Iiwic2hvb3RUZXh0IiwiZmlyc3RQbGF0Zm9ybSIsInNsaW1lU291bmRQbGF5Iiwic2xpbWUiLCJpc0dvaW5nTGVmdCIsImlzR29pbmdSaWdodCIsInNsaW1lTGVmdFNwYWNlIiwic3RhcnRQb2ludCIsInNsaW1lQm90dG9tU3BhY2UiLCJzbGltZUZhbGwiLCJjb2xsaXNpb25EZXRlY3QiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsImJ1bGxldHMiLCJCdWxsZXQiLCJuZXdCdWxsZXQiLCJjbGllbnRYIiwiY2xpZW50WSIsIngiLCJ5IiwiYnVsbGV0IiwiZmlyc3RCdWxsZXQiXSwic291cmNlUm9vdCI6IiJ9