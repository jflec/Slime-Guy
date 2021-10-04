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
    if (enemy.bottom >= 600) {
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
  // delete enemy;
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
  visual.style.left = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeLeftSpace + 18 + 'px';
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
  if (bottom >= enemy.bottom && bottom <= enemy.bottom + 19 && left + 40 >= enemy.left && left <= enemy.left + 30) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O1VDekZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUVBLElBQU1yQixJQUFJLEdBQUdPLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixPQUF2QixDQUFiO0FBRUFQLFFBQVEsQ0FBQ3FDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2hERixFQUFBQSx1REFBSyxDQUFDMUMsSUFBRCxDQUFMO0FBQ0FtRCxFQUFBQSwyREFBUztBQUNaLENBSEQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL2VuZW15LmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxhdGZvcm0uanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXllclNob290LmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3NvdW5kLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZU92ZXIsIGdhbWVQYXVzZWQgfSBmcm9tICcuL2dhbWUuanMnO1xuXG5sZXQgZW5lbXlDb3VudCA9IDI7XG5cbmV4cG9ydCBsZXQgZW5lbXlzID0gW107XG5cbi8vIFNldHMgZW5lbXkgcHJvcGVydGllc1xuXG5jbGFzcyBFbmVteSB7XG4gIGNvbnN0cnVjdG9yKGdyaWQsIG5ld0VuZW15Qm90dG9tKSB7XG4gICAgdGhpcy5ib3R0b20gPSBuZXdFbmVteUJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSBNYXRoLnJhbmRvbSgpICogNDUwO1xuICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2VuZW15Jyk7XG4gICAgdmlzdWFsLnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyAncHgnO1xuICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSB0aGlzLmJvdHRvbSArICdweCc7XG4gICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICB9XG59XG5cbi8vIENyZWF0ZXMgZW5lbXlzIGFuZCBwdXNoZXMgdG8gZW5lbXkgYXJyYXlcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVuZW15cygpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXlDb3VudDsgaSsrKSB7XG4gICAgbGV0IGVuZW15R2FwID0gLTE3MDAgLyBlbmVteUNvdW50O1xuICAgIGxldCBuZXdFbmVteUJvdHRvbSA9IC0xMjAgKyBpICogZW5lbXlHYXA7XG4gICAgbGV0IG5ld0VuZW15ID0gbmV3IEVuZW15KGdyaWQsIG5ld0VuZW15Qm90dG9tLCBpKTtcbiAgICBlbmVteXMucHVzaChuZXdFbmVteSk7XG4gIH1cbn1cblxuLy8gTW92ZXMgZW5lbXlzIGJ5IHN1YnN0cmFjdGluZywgb3IgYWRkaW5nIHRvIHRoZSBlbmVteSdzIGJvdHRvbSBwcm9wZXJ0eVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUVuZW15cygpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgZW5lbXlzLmZvckVhY2goKGVuZW15KSA9PiB7XG4gICAgICBlbmVteS5ib3R0b20gKz0gMC41NTtcbiAgICAgIGxldCB2aXN1YWwgPSBlbmVteS52aXN1YWw7XG4gICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gZW5lbXkuYm90dG9tICsgJ3B4JztcbiAgICAgIHVwZGF0ZUVuZW15cyhlbmVteSwgZ3JpZCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gUmVtb3ZlcyBvbGQgZW5lbXlzIGFuZCBjcmVhdGVzIG5ldyBlbmVteXMgdGhhdCBhcmUgdGhlbiBwdXNoZWQgdG8gZW5lbXkgYXJyYXlcblxuZnVuY3Rpb24gdXBkYXRlRW5lbXlzKGVuZW15LCBncmlkKSB7XG4gIGlmICghZ2FtZU92ZXIpIHtcbiAgICBpZiAoZW5lbXkuYm90dG9tID49IDYwMCkge1xuICAgICAgbGV0IGZpcnN0RW5lbXkgPSBlbmVteXNbMF0udmlzdWFsO1xuICAgICAgZmlyc3RFbmVteS5yZW1vdmUoKTtcbiAgICAgIGdsb2JhbC5zY29yZSAtPSAyMDtcbiAgICAgIGVuZW15cy5zaGlmdCgpO1xuICAgICAgbGV0IG5ld0VuZW15ID0gbmV3IEVuZW15KGdyaWQsIC01MCk7XG4gICAgICBlbmVteXMucHVzaChuZXdFbmVteSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBraWxsRW5lbXkoZW5lbXkpIHtcbiAgLy8gZGVsZXRlIGVuZW15O1xuICBnbG9iYWwuc2NvcmUgKz0gMTtcbn1cbiIsIi8vIEFkZCBzdGFydCBtZW51XG4vLyBBZGQgcGF1c2UgbWVudVxuLy8gQWRkIGRlYXRoIHNjcmVlblxuLy8gQk9OVVM6IGFkZCBlbmVteSwgYWRkIHN0YWdlc1xuXG5pbXBvcnQge1xuICBjcmVhdGVQbGF5ZXIsXG4gIHNsaW1lSnVtcCxcbiAgcGxheWVyTW92ZW1lbnRzLFxuICBzdG9wUGxheWVyTW92ZW1lbnRzLFxuICB1cFRpbWVySWQsXG4gIGRvd25UaW1lcklkLFxuICBsZWZ0VGltZXJJZCxcbiAgcmlnaHRUaW1lcklkLFxufSBmcm9tICcuL3BsYXllci5qcyc7XG5pbXBvcnQgeyBjcmVhdGVQbGF0Zm9ybXMsIG1vdmVQbGF0Zm9ybXMgfSBmcm9tICcuL3BsYXRmb3JtLmpzJztcbmltcG9ydCB7IHBsYXllclNob290LCBzaG9vdEJ1bGxldCB9IGZyb20gJy4vcGxheWVyU2hvb3QuanMnO1xuaW1wb3J0IHsgY3JlYXRlRW5lbXlzLCBtb3ZlRW5lbXlzIH0gZnJvbSAnLi9lbmVteS5qcyc7XG5cbmV4cG9ydCBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbmV4cG9ydCBsZXQgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuZXhwb3J0IGxldCBzb2Z0UGF1c2VkID0gZmFsc2U7XG5cbi8vIEluIGNoYXJnZSBvZiBzdGFydGluZyB0aGUgZ2FtZSwgY2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBuZWVkZWQgZm9yIGJ1aWxkaW5nIGFuZCByZW5kZXJpbmcuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydChncmlkKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNyZWF0ZVBsYXRmb3JtcygpO1xuICAgIGNyZWF0ZUVuZW15cygpO1xuICAgIGNyZWF0ZVBsYXllcigpO1xuICAgIHNldEludGVydmFsKG1vdmVQbGF0Zm9ybXMsIDEpO1xuICAgIHNldEludGVydmFsKG1vdmVFbmVteXMsIDEpO1xuICAgIHNldEludGVydmFsKHNob290QnVsbGV0LCAxKTtcbiAgICBzbGltZUp1bXAoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJTaG9vdCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllck1vdmVtZW50cyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllclBhdXNlR2FtZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJlc3RhcnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc3RvcFBsYXllck1vdmVtZW50cyk7XG4gIH1cbn1cblxuLy8gUGF1c2VzIGdhbWUgYnkgc2V0dGluZyBleHBvcnRlZCB2YXJpYWJsZSB0byBkZXNpcmVkIGdhbWUgc3RhdGVcblxuZnVuY3Rpb24gcGxheWVyUGF1c2VHYW1lKGV2ZW50KSB7XG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gIGlmIChldmVudC5rZXlDb2RlID09PSAzMiAmJiAhZ2FtZVBhdXNlZCkge1xuICAgIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgJiYgZ2FtZVBhdXNlZCkge1xuICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lUGF1c2VkID0gZmFsc2U7XG4gICAgc29mdFBhdXNlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXVzZUdhbWUoKSB7XG4gIGdhbWVQYXVzZWQgPSB0cnVlO1xuICBzb2Z0UGF1c2VkID0gdHJ1ZTtcbn1cblxuLy8gRW5kcyBnYW1lIGJ5IGNsZWFyaW5nIHRoZSBncmlkIGFuZCBUaW1lcklkc1xuXG5leHBvcnQgZnVuY3Rpb24gZW5kR2FtZSgpIHtcbiAgZ2FtZU92ZXIgPSB0cnVlO1xuICBjbGVhckludGVydmFsKHVwVGltZXJJZCk7XG4gIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpO1xuICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICBjb25zdCBlbmRpbmdPbmVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZUVuZGluZycpO1xuICBjb25zdCBlbmRpbmdUd29UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR3b0VuZGluZycpO1xuICBjb25zdCBlbmRpbmdUaHJlZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWxTY29yZScpO1xuICBjb25zdCBvZ1Njb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XG4gIG9nU2NvcmUuaW5uZXJIVE1MID0gJyc7XG4gIGVuZGluZ09uZVRleHQuaW5uZXJIVE1MID0gXCJpdCB3YXNuJ3QgZW5vdWdoXCI7XG4gIGVuZGluZ1R3b1RleHQuaW5uZXJIVE1MID0gJ3ByZXNzIFIgdG8gdHJ5IGFnYWluJztcbiAgZW5kaW5nVGhyZWVUZXh0LmlubmVySFRNTCA9IGBmaW5hbCBzY29yZTogJHtnbG9iYWwuc2NvcmV9YDtcbn1cblxuLy8gUmVzdGFydHMgZ2FtZSB2aWEgcmVsb2FkaW5nIHBhZ2VcblxuZnVuY3Rpb24gcmVzdGFydChldmVudCkge1xuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gODIpIHtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2FtZU92ZXIsIGdhbWVQYXVzZWQsIHNvZnRQYXVzZWQgfSBmcm9tICcuL2dhbWUuanMnO1xuaW1wb3J0IHsgaXNKdW1waW5nLCBpc0ZhbGxpbmcgfSBmcm9tICcuL3BsYXllci5qcyc7XG5cbmxldCBwbGF0Zm9ybUNvdW50ID0gMTA7XG5cbmdsb2JhbC5zY29yZSA9IDE7XG5leHBvcnQgbGV0IHBsYXRmb3JtcyA9IFtdO1xuXG4vLyBTZXRzIFBsYXRmb3JtIHByb3BlcnRpZXNcblxuY2xhc3MgUGxhdGZvcm0ge1xuICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgdGhpcy5ib3R0b20gPSBuZXdQbGF0Qm90dG9tO1xuICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgncGxhdGZvcm0nKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gIH1cbn1cblxuLy8gQ3JlYXRlcyBwbGF0Zm9ybXMgYW5kIHB1c2hlcyB0byBwbGF0Zm9ybSBhcnJheVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhdGZvcm1zKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0Zm9ybUNvdW50OyBpKyspIHtcbiAgICBsZXQgcGxhdGZvcm1HYXAgPSAxNzAwIC8gcGxhdGZvcm1Db3VudDtcbiAgICBsZXQgbmV3UGxhdEJvdHRvbSA9IDEwMCArIGkgKiBwbGF0Zm9ybUdhcDtcbiAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgbmV3UGxhdEJvdHRvbSk7XG4gICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICB9XG59XG5cbi8vIE1vdmVzIFBsYXRmb3JtcyBieSBzdWJzdHJhY3RpbmcsIG9yIGFkZGluZyB0byB0aGUgUGxhdGZvcm0ncyBib3R0b20gcHJvcGVydHlcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVQbGF0Zm9ybXMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICBpZiAoIWdhbWVQYXVzZWQgfHwgc29mdFBhdXNlZCkge1xuICAgIHBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgaWYgKGlzSnVtcGluZykge1xuICAgICAgICBpZiAoc29mdFBhdXNlZCkge1xuICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAxLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDMuNTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0ZhbGxpbmcpIHtcbiAgICAgICAgcGxhdGZvcm0uYm90dG9tICs9IDE7XG4gICAgICB9XG4gICAgICBsZXQgdmlzdWFsID0gcGxhdGZvcm0udmlzdWFsO1xuICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHBsYXRmb3JtLmJvdHRvbSArICdweCc7XG4gICAgICB1cGRhdGVQbGF0Zm9ybXMocGxhdGZvcm0sIGdyaWQpO1xuICAgIH0pO1xuICB9XG59XG5cbi8vIFJlbW92ZXMgb2xkIHBsYXRmb3JtcyBhbmQgY3JlYXRlcyBuZXcgcGxhdGZvcm1zIHRoYXQgYXJlIHRoZW4gcHVzaGVkIHRvIHBsYXRmb3JtIGFycmF5XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsYXRmb3JtcyhwbGF0Zm9ybSwgZ3JpZCkge1xuICBpZiAoIWdhbWVPdmVyKSB7XG4gICAgaWYgKHBsYXRmb3JtLmJvdHRvbSA8PSAtNTApIHtcbiAgICAgIGNvbnN0IHNjb3JlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgICAgY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgICBjb25zdCBtb3ZlbWVudFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZW1lbnQnKTtcbiAgICAgIGNvbnN0IHNob290VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG9vdCcpO1xuICAgICAgbGV0IGZpcnN0UGxhdGZvcm0gPSBwbGF0Zm9ybXNbMF0udmlzdWFsO1xuICAgICAgZmlyc3RQbGF0Zm9ybS5yZW1vdmUoKTtcbiAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgaWYgKCFzb2Z0UGF1c2VkKSB7XG4gICAgICAgIGdsb2JhbC5zY29yZSArPSAxO1xuICAgICAgICBzY29yZVRleHQuaW5uZXJIVE1MID0gZ2xvYmFsLnNjb3JlO1xuICAgICAgICB0aXRsZVRleHQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1vdmVtZW50VGV4dC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgc2hvb3RUZXh0LmlubmVySFRNTCA9ICcnO1xuICAgICAgfVxuICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIDE3MDApO1xuICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtlbmRHYW1lLCBnYW1lUGF1c2VkfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQge3BsYXRmb3Jtc30gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtzbGltZVNvdW5kUGxheX0gZnJvbSBcIi4vc291bmQuanNcIlxuXG5jb25zdCBzbGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbmxldCBpc0dvaW5nTGVmdCAgICAgICAgICAgICA9IGZhbHNlO1xubGV0IGlzR29pbmdSaWdodCAgICAgICAgICAgID0gZmFsc2U7XG5cbmV4cG9ydCBsZXQgaXNKdW1waW5nICAgICAgICA9IGZhbHNlO1xuZXhwb3J0IGxldCBpc0ZhbGxpbmcgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc2xpbWVMZWZ0U3BhY2UgICA9IDI4MDtcbmV4cG9ydCBsZXQgZ2FtZU92ZXIgICAgICAgICA9IGZhbHNlO1xuZXhwb3J0IGxldCBzdGFydFBvaW50ICAgICAgID0gMjAwO1xuZXhwb3J0IGxldCBzbGltZUJvdHRvbVNwYWNlID0gc3RhcnRQb2ludDtcbmV4cG9ydCBsZXQgbGVmdFRpbWVySWQ7XG5leHBvcnQgbGV0IHJpZ2h0VGltZXJJZDtcbmV4cG9ydCBsZXQgdXBUaW1lcklkO1xuZXhwb3J0IGxldCBkb3duVGltZXJJZDtcblxuLy8gQ3JlYXRlICdTbGltZScgYW5kIGFkZCB0byB0aGUgZ3JpZC5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHNsaW1lKTtcbiAgICBzbGltZS5jbGFzc0xpc3QuYWRkKCdzbGltZScpO1xuICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG59XG5cbi8vIEluIGNoYXJnZSBvZiBhZGRpbmcgdG8gdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgc2xpbWVGYWxsKClcblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lSnVtcCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZClcbiAgICAgICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgaXNGYWxsaW5nID0gZmFsc2U7XG4gICAgICAgIHVwVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVCb3R0b21TcGFjZSArPSAxO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDEwMCkgc2xpbWVGYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBJbiBjaGFyZ2Ugb2Ygc3VidHJhY3RpbmcgdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgZW5kR2FtZSgpXG5cbmZ1bmN0aW9uIHNsaW1lRmFsbCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpXG4gICAgICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgICAgICBpc0ZhbGxpbmcgPSB0cnVlO1xuICAgICAgICBkb3duVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVCb3R0b21TcGFjZSAtPSAyO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlIDw9IC0yMDAgKSBlbmRHYW1lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykpOyBcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7IGNvbGxpc2lvbkRldGVjdChwbGF0Zm9ybSk7fSApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBDaGVja3MgdGhlIHZhbHVlIG9mIHRoZSBib3R0b20gb2YgdGhlIHBsYXllciwgaWYgc2FpZCB2YWx1ZSByZXR1cm5zIHRydWUgaXQgY2FsbHMgc2xpbWVKdW1wKClcblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0KHBsYXRmb3JtKSB7XG4gICAgaWYgKChzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSkgJiYgKHNsaW1lQm90dG9tU3BhY2UgPD0gKHBsYXRmb3JtLmJvdHRvbSArIDE5KSkgJiZcbiAgICAoKHNsaW1lTGVmdFNwYWNlICsgNDApID49IHBsYXRmb3JtLmxlZnQpICYmIChzbGltZUxlZnRTcGFjZSA8PSAocGxhdGZvcm0ubGVmdCArIDEwMCkpICYmXG4gICAgIWlzSnVtcGluZykge1xuICAgICAgICBzdGFydFBvaW50ID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgLy8gc2xpbWVTb3VuZFBsYXkoKTtcbiAgICAgICAgc2xpbWVKdW1wKCk7XG4gICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgfVxufVxuXG4vLyBDYWxscyBtb3ZlTGVmdCgpIG9yIG1vdmVSaWdodCBkZXBlbmRpbmcgb24gcGxheWVyIGlucHV0LiAqVXNlcyBrZXlkb3duKlxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkgbW92ZUxlZnQoKTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSBtb3ZlUmlnaHQoKTtcbiAgICAgICAgXG4gICAgfVxufVxuXG4vLyBDZWFzZXMgcGxheWVyIG1vdmVtZW50IGRlcGVuZGluZyBvbiBrZXkgcmVsZWFzZS4gKlVzZXMga2V5dXAqXG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wUGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSB7XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSB7XG4gICAgICAgIGlzR29pbmdSaWdodCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICB9XG59XG5cbi8vIERlY3JlbWVudHMgcGxheWVyJ3MgWCB2YWx1ZVxuXG5mdW5jdGlvbiBtb3ZlTGVmdCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gdHJ1ZVxuICAgICAgICBsZWZ0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAtNjApIHtcbiAgICAgICAgICAgIHNsaW1lTGVmdFNwYWNlIC09IDI7XG4gICAgICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnXG4gICAgICAgICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSA2MDA7XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBJbmNyZW1lbnRzIHBsYXllcidzIFggdmFsdWVcblxuZnVuY3Rpb24gbW92ZVJpZ2h0KCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICAgICAgaWYgKGlzR29pbmdMZWZ0KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgICAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlzR29pbmdSaWdodCA9IHRydWVcbiAgICAgICAgcmlnaHRUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNsaW1lTGVmdFNwYWNlIDw9IDYxMCkge1xuICAgICAgICAgICAgICAgIHNsaW1lTGVmdFNwYWNlICs9IDI7XG4gICAgICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgICAgfSBlbHNlIHNsaW1lTGVmdFNwYWNlID0gLTYwO1xuICAgICAgICB9LCAxKVxuICAgIH1cbn1cblxuIiwiaW1wb3J0IHsgc2xpbWVMZWZ0U3BhY2UsIHNsaW1lQm90dG9tU3BhY2UgfSBmcm9tICcuL3BsYXllci5qcyc7XG5pbXBvcnQgeyBlbmVteXMsIGtpbGxFbmVteSB9IGZyb20gJy4vZW5lbXkuanMnO1xuXG5leHBvcnQgbGV0IGJ1bGxldHMgPSBbXTtcblxuY2xhc3MgQnVsbGV0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlO1xuICAgIHRoaXMubGVmdCA9IHNsaW1lTGVmdFNwYWNlO1xuICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2J1bGxldCcpO1xuICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAxOCArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAxMiArICdweCc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKS5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJTaG9vdChldmVudCkge1xuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICBzaG9vdEJ1bGxldCgpO1xuICAgIGxldCBuZXdCdWxsZXQgPSBuZXcgQnVsbGV0KFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKSxcbiAgICAgIGV2ZW50LmNsaWVudFgsXG4gICAgICBldmVudC5jbGllbnRZXG4gICAgKTtcbiAgICBidWxsZXRzLnB1c2gobmV3QnVsbGV0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvb3RCdWxsZXQoeCwgeSkge1xuICBidWxsZXRzLmZvckVhY2goKGJ1bGxldCkgPT4ge1xuICAgIGJ1bGxldC5ib3R0b20gLT0gMztcbiAgICBsZXQgdmlzdWFsID0gYnVsbGV0LnZpc3VhbDtcbiAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gYnVsbGV0LmJvdHRvbSArICdweCc7XG4gICAgZW5lbXlzLmZvckVhY2goKGVuZW15KSA9PiB7XG4gICAgICBjb2xsaXNpb25EZXRlY3QoZW5lbXksIGJ1bGxldC5ib3R0b20sIGJ1bGxldC5sZWZ0KTtcbiAgICB9KTtcbiAgICBpZiAoYnVsbGV0LmJvdHRvbSA+PSA3NTApIHtcbiAgICAgIGxldCBmaXJzdEJ1bGxldCA9IGJ1bGxldHNbMF0udmlzdWFsO1xuICAgICAgZmlyc3RCdWxsZXQucmVtb3ZlKCk7XG4gICAgICBidWxsZXRzLnNoaWZ0KCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0KGVuZW15LCBib3R0b20sIGxlZnQpIHtcbiAgaWYgKFxuICAgIGJvdHRvbSA+PSBlbmVteS5ib3R0b20gJiZcbiAgICBib3R0b20gPD0gZW5lbXkuYm90dG9tICsgMTkgJiZcbiAgICBsZWZ0ICsgNDAgPj0gZW5lbXkubGVmdCAmJlxuICAgIGxlZnQgPD0gZW5lbXkubGVmdCArIDMwXG4gICkge1xuICAgIGtpbGxFbmVteShlbmVteSk7XG4gIH1cbn1cbiIsIi8vIGxldCBtdXRlZCA9IHRydWU7XG4vLyBsZXQgc29uZ1J1bm5pbmcgPSBmYWxzZTtcblxuLy8gLy8gY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudVwiKVxuLy8gLy8gY29uc29sZS5sb2cobWVudSlcbi8vIC8vIGNvbnN0IG1lbnVMaXN0ID0gbWVudS5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtbGlzdFwiKVxuXG5cbi8vIC8vIEltcG9ydGluZyBiYWNrZ3JvdW5kIG11c2ljXG5cbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNPbmUgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9BIExvbmVseSBDaGVycnkgVHJlZSDwn4y4Lm1wM1wiKTtcbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNUd28gICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9IZWxsbywgaXQncyBNZSEubXAzXCIpO1xuLy8gbGV0IGJhY2tncm91bmRNdXNpY1RocmVlID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL01lbGFuY2hvbGljIFdhbGsubXAzXCIpO1xuLy8gbGV0IGJhY2tncm91bmRNdXNpY0ZvdXIgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL05vIERlc3RpbmF0aW9uLm1wM1wiKTtcbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNGaXZlICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9SZWFkeSBQaXhlbCBPbmUubXAzXCIpO1xuLy8gbGV0IGJhY2tncm91bmRNdXNpY1NpeCAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1J1biBBcyBGYXN0IEFzIFlvdSBDYW4ubXAzXCIpO1xuLy8gbGV0IGJhY2tncm91bmRNdXNpY1NldmVuID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1RoZSBzZWFyY2gubXAzXCIpO1xuLy8gbGV0IGJhY2tncm91bmRNdXNpY0VpZ2h0ID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1dlbGNvbWUgU3BhY2UgVHJhdmVsZXIubXAzXCIpO1xuXG4vLyBsZXQgYmFja2dyb3VuZE11c2ljID0gW2JhY2tncm91bmRNdXNpY09uZSwgYmFja2dyb3VuZE11c2ljVHdvLCBiYWNrZ3JvdW5kTXVzaWNUaHJlZSwgYmFja2dyb3VuZE11c2ljRm91cixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZE11c2ljRml2ZSwgYmFja2dyb3VuZE11c2ljU2l4LCBiYWNrZ3JvdW5kTXVzaWNTZXZlbiwgYmFja2dyb3VuZE11c2ljRWlnaHRdO1xuXG4vLyAvLyBJbXBvcnRpbmcgc2xpbWUgc291bmRzXG4vLyBsZXQgc2xpbWVTb3VuZE9uZSAgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzAubXAzXCIpO1xuLy8gbGV0IHNsaW1lU291bmRUd28gICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8xLm1wM1wiKTtcbi8vIGxldCBzbGltZVNvdW5kVGhyZWUgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMi5tcDNcIik7XG4vLyBsZXQgc2xpbWVTb3VuZEZvdXIgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzMubXAzXCIpO1xuLy8gbGV0IHNsaW1lU291bmRGaXZlICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8wLm1wM1wiKTtcbi8vIGxldCBzbGltZVNvdW5kU2l4ICAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMS5tcDNcIik7XG4vLyBsZXQgc2xpbWVTb3VuZFNldmVuICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzIubXAzXCIpO1xuLy8gbGV0IHNsaW1lU291bmRFaWdodCAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8zLm1wM1wiKTtcblxuLy8gLy8gQWRqdXN0aW5nIHNsaW1lIHNvdW5kIHZvbHVtZXNcbi8vIGxldCBzbGltZVZvbHVtZSA9IDAuMDU7XG4vLyBzbGltZVNvdW5kT25lLnZvbHVtZSAgICA9IHNsaW1lVm9sdW1lO1xuLy8gc2xpbWVTb3VuZFR3by52b2x1bWUgICAgPSBzbGltZVZvbHVtZTtcbi8vIHNsaW1lU291bmRUaHJlZS52b2x1bWUgID0gc2xpbWVWb2x1bWU7XG4vLyBzbGltZVNvdW5kRm91ci52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuLy8gc2xpbWVTb3VuZEZpdmUudm9sdW1lICAgPSBzbGltZVZvbHVtZTtcbi8vIHNsaW1lU291bmRTaXgudm9sdW1lICAgID0gc2xpbWVWb2x1bWU7XG4vLyBzbGltZVNvdW5kU2V2ZW4udm9sdW1lICA9IHNsaW1lVm9sdW1lO1xuLy8gc2xpbWVTb3VuZEVpZ2h0LnZvbHVtZSAgPSBzbGltZVZvbHVtZTtcblxuLy8gLy8gUHVzaGluZyBzbGltZSBzb3VuZHMgaW50byBhbiBhcnJheVxuLy8gbGV0IHNsaW1lU291bmRzID0gW3NsaW1lU291bmRPbmUsIHNsaW1lU291bmRUd28sIHNsaW1lU291bmRUaHJlZSwgc2xpbWVTb3VuZEZvdXIsIHNsaW1lU291bmRGb3VyLFxuLy8gICAgIHNsaW1lU291bmRGaXZlLCBzbGltZVNvdW5kU2l4LCBzbGltZVNvdW5kU2V2ZW4sIHNsaW1lU291bmRFaWdodF07XG5cbi8vIC8vIGxldCBiYWNrZ3JvdW5kTXVzaWNWb2x1bWUgPSAxO1xuXG4vLyAvLyBiYWNrZ3JvdW5kTXVzaWNPbmUudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyAvLyBiYWNrZ3JvdW5kTXVzaWNUd28gLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyAvLyBiYWNrZ3JvdW5kTXVzaWNUaHJlZS52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyAvLyBiYWNrZ3JvdW5kTXVzaWNGb3VyLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyAvLyBiYWNrZ3JvdW5kTXVzaWNGaXZlLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyAvLyBiYWNrZ3JvdW5kTXVzaWNTaXgudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyAvLyBiYWNrZ3JvdW5kTXVzaWNTZXZlbi52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyAvLyBiYWNrZ3JvdW5kTXVzaWNFaWdodC52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5cblxuXG4vLyAvLyBSZXR1cm5pbmcgcmFuZG9tIHNsaW1lIHNvdW5kIHdoZW4gY2FsbGVkXG5cbi8vIGZ1bmN0aW9uIHNhbXBsZShhcnJheSkge1xuLy8gICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yICggTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCApXVxuLy8gfVxuXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuLy8gICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVzaWNcIik7XG5cbi8vIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbi8vICAgICBsZXQgY3VycmVudFNvbmcgPSBzYW1wbGUoYmFja2dyb3VuZE11c2ljKVxuLy8gICAgIGJhY2tncm91bmRNdXNpY1BsYXkoY3VycmVudFNvbmcpXG4vLyAgICAgY3VycmVudFNvbmcudm9sdW1lID0gdGhpcy52YWx1ZSAvIDEwMDtcbi8vICAgICBjb25zb2xlLmxvZyh0aGlzLnZhbHVlIC8gMTAwKVxuLy8gICAgIH0pXG4vLyB9KVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gc2xpbWVTb3VuZFBsYXkoKSB7XG4vLyAgICAgaWYgKCFtdXRlZCkgc2FtcGxlKHNsaW1lU291bmRzKS5wbGF5KCk7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBiYWNrZ3JvdW5kTXVzaWNQbGF5KGN1cnJlbnRTb25nKSB7XG4vLyAgICAgaWYgKCFzb25nUnVubmluZykge1xuLy8gICAgICAgICBzb25nUnVubmluZyA9IHRydWU7XG4vLyAgICAgICAgIGlmICghbXV0ZWQpIHtcbi8vICAgICAgICAgICAgIGN1cnJlbnRTb25nLnBsYXkoKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbiAgICBcbi8vIH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7c3RhcnQsIHBhdXNlR2FtZX0gZnJvbSBcIi4vc2NyaXB0cy9nYW1lLmpzXCJcblxuY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgc3RhcnQoZ3JpZCk7XG4gICAgcGF1c2VHYW1lKCk7XG59KVxuIl0sIm5hbWVzIjpbImdhbWVPdmVyIiwiZ2FtZVBhdXNlZCIsImVuZW15Q291bnQiLCJlbmVteXMiLCJFbmVteSIsImdyaWQiLCJuZXdFbmVteUJvdHRvbSIsImJvdHRvbSIsImxlZnQiLCJNYXRoIiwicmFuZG9tIiwidmlzdWFsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUVuZW15cyIsInF1ZXJ5U2VsZWN0b3IiLCJpIiwiZW5lbXlHYXAiLCJuZXdFbmVteSIsInB1c2giLCJtb3ZlRW5lbXlzIiwiZm9yRWFjaCIsImVuZW15IiwidXBkYXRlRW5lbXlzIiwiZmlyc3RFbmVteSIsInJlbW92ZSIsImdsb2JhbCIsInNjb3JlIiwic2hpZnQiLCJraWxsRW5lbXkiLCJjcmVhdGVQbGF5ZXIiLCJzbGltZUp1bXAiLCJwbGF5ZXJNb3ZlbWVudHMiLCJzdG9wUGxheWVyTW92ZW1lbnRzIiwidXBUaW1lcklkIiwiZG93blRpbWVySWQiLCJsZWZ0VGltZXJJZCIsInJpZ2h0VGltZXJJZCIsImNyZWF0ZVBsYXRmb3JtcyIsIm1vdmVQbGF0Zm9ybXMiLCJwbGF5ZXJTaG9vdCIsInNob290QnVsbGV0Iiwic29mdFBhdXNlZCIsInN0YXJ0Iiwic2V0SW50ZXJ2YWwiLCJhZGRFdmVudExpc3RlbmVyIiwicGxheWVyUGF1c2VHYW1lIiwicmVzdGFydCIsImV2ZW50IiwibWVudSIsImtleUNvZGUiLCJkaXNwbGF5IiwicGF1c2VHYW1lIiwiZW5kR2FtZSIsImNsZWFySW50ZXJ2YWwiLCJlbmRpbmdPbmVUZXh0IiwiZW5kaW5nVHdvVGV4dCIsImVuZGluZ1RocmVlVGV4dCIsIm9nU2NvcmUiLCJpbm5lckhUTUwiLCJsb2NhdGlvbiIsInJlbG9hZCIsImlzSnVtcGluZyIsImlzRmFsbGluZyIsInBsYXRmb3JtQ291bnQiLCJwbGF0Zm9ybXMiLCJQbGF0Zm9ybSIsIm5ld1BsYXRCb3R0b20iLCJwbGF0Zm9ybUdhcCIsIm5ld1BsYXRmb3JtIiwicGxhdGZvcm0iLCJ1cGRhdGVQbGF0Zm9ybXMiLCJzY29yZVRleHQiLCJ0aXRsZVRleHQiLCJtb3ZlbWVudFRleHQiLCJzaG9vdFRleHQiLCJmaXJzdFBsYXRmb3JtIiwic2xpbWVTb3VuZFBsYXkiLCJzbGltZSIsImlzR29pbmdMZWZ0IiwiaXNHb2luZ1JpZ2h0Iiwic2xpbWVMZWZ0U3BhY2UiLCJzdGFydFBvaW50Iiwic2xpbWVCb3R0b21TcGFjZSIsInNsaW1lRmFsbCIsImNvbGxpc2lvbkRldGVjdCIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwiYnVsbGV0cyIsIkJ1bGxldCIsIm5ld0J1bGxldCIsImNsaWVudFgiLCJjbGllbnRZIiwieCIsInkiLCJidWxsZXQiLCJmaXJzdEJ1bGxldCJdLCJzb3VyY2VSb290IjoiIn0=