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
    var newEnemy = new Enemy(grid, newEnemyBottom);
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
      enemys.shift();
      var newEnemy = new Enemy(grid, -50);
      enemys.push(newEnemy);
    }
  }
}

function killEnemy(enemy) {
  enemy.left = 200;
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
    menu.style.display = "block";
  } else if (event.keyCode === 32 && gamePaused) {
    menu.style.display = "none";
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
  ogScore.innerHTML = "";
  endingOneText.innerHTML = "it wasn't enough";
  endingTwoText.innerHTML = "press R to try again";
  endingThreeText.innerHTML = "final score: ".concat(_platform_js__WEBPACK_IMPORTED_MODULE_1__.score);
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
/* harmony export */   "score": function() { return /* binding */ score; },
/* harmony export */   "platforms": function() { return /* binding */ platforms; },
/* harmony export */   "createPlatforms": function() { return /* binding */ createPlatforms; },
/* harmony export */   "movePlatforms": function() { return /* binding */ movePlatforms; }
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/scripts/game.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var platformCount = 10;
var score = 1;
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
        score += 1;
        scoreText.innerHTML = score;
        titleText.innerHTML = "";
        movementText.innerHTML = "";
        shootText.innerHTML = "";
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
    console.log("hit");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFFQTs7Ozs7O1VDekZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUVBLElBQU1oRyxJQUFJLEdBQUdPLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixPQUF2QixDQUFiO0FBRUFQLFFBQVEsQ0FBQ29DLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2hERixFQUFBQSx1REFBSyxDQUFDekMsSUFBRCxDQUFMO0FBQ0FrRCxFQUFBQSwyREFBUztBQUNaLENBSEQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL2VuZW15LmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxhdGZvcm0uanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXllclNob290LmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3NvdW5kLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZU92ZXIsIGdhbWVQYXVzZWQgfSBmcm9tICcuL2dhbWUuanMnO1xuXG5sZXQgZW5lbXlDb3VudCA9IDI7XG5cbmV4cG9ydCBsZXQgZW5lbXlzID0gW107XG5cbi8vIFNldHMgZW5lbXkgcHJvcGVydGllc1xuXG5jbGFzcyBFbmVteSB7XG4gIGNvbnN0cnVjdG9yKGdyaWQsIG5ld0VuZW15Qm90dG9tKSB7XG4gICAgdGhpcy5ib3R0b20gPSBuZXdFbmVteUJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSBNYXRoLnJhbmRvbSgpICogNDUwO1xuICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2VuZW15Jyk7XG4gICAgdmlzdWFsLnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyAncHgnO1xuICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSB0aGlzLmJvdHRvbSArICdweCc7XG4gICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICB9XG59XG5cbi8vIENyZWF0ZXMgZW5lbXlzIGFuZCBwdXNoZXMgdG8gZW5lbXkgYXJyYXlcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVuZW15cygpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXlDb3VudDsgaSsrKSB7XG4gICAgbGV0IGVuZW15R2FwID0gLTE3MDAgLyBlbmVteUNvdW50O1xuICAgIGxldCBuZXdFbmVteUJvdHRvbSA9IC0xMjAgKyBpICogZW5lbXlHYXA7XG4gICAgbGV0IG5ld0VuZW15ID0gbmV3IEVuZW15KGdyaWQsIG5ld0VuZW15Qm90dG9tKTtcbiAgICBlbmVteXMucHVzaChuZXdFbmVteSk7XG4gIH1cbn1cblxuLy8gTW92ZXMgZW5lbXlzIGJ5IHN1YnN0cmFjdGluZywgb3IgYWRkaW5nIHRvIHRoZSBlbmVteSdzIGJvdHRvbSBwcm9wZXJ0eVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUVuZW15cygpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgZW5lbXlzLmZvckVhY2goKGVuZW15KSA9PiB7XG4gICAgICBlbmVteS5ib3R0b20gKz0gMC41NTtcbiAgICAgIGxldCB2aXN1YWwgPSBlbmVteS52aXN1YWw7XG4gICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gZW5lbXkuYm90dG9tICsgJ3B4JztcbiAgICAgIHVwZGF0ZUVuZW15cyhlbmVteSwgZ3JpZCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gUmVtb3ZlcyBvbGQgZW5lbXlzIGFuZCBjcmVhdGVzIG5ldyBlbmVteXMgdGhhdCBhcmUgdGhlbiBwdXNoZWQgdG8gZW5lbXkgYXJyYXlcblxuZnVuY3Rpb24gdXBkYXRlRW5lbXlzKGVuZW15LCBncmlkKSB7XG4gIGlmICghZ2FtZU92ZXIpIHtcbiAgICBpZiAoZW5lbXkuYm90dG9tID49IDE3MDApIHtcbiAgICAgIGxldCBmaXJzdEVuZW15ID0gZW5lbXlzWzBdLnZpc3VhbDtcbiAgICAgIGZpcnN0RW5lbXkucmVtb3ZlKCk7XG4gICAgICBlbmVteXMuc2hpZnQoKTtcbiAgICAgIGxldCBuZXdFbmVteSA9IG5ldyBFbmVteShncmlkLCAtNTApO1xuICAgICAgZW5lbXlzLnB1c2gobmV3RW5lbXkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ga2lsbEVuZW15KGVuZW15KSB7XG4gIGVuZW15LmxlZnQgPSAyMDA7XG59XG4iLCIvLyBBZGQgc3RhcnQgbWVudVxuLy8gQWRkIHBhdXNlIG1lbnVcbi8vIEFkZCBkZWF0aCBzY3JlZW5cbi8vIEJPTlVTOiBhZGQgZW5lbXksIGFkZCBzdGFnZXNcblxuaW1wb3J0IHtjcmVhdGVQbGF5ZXIsIHNsaW1lSnVtcCwgcGxheWVyTW92ZW1lbnRzLCBzdG9wUGxheWVyTW92ZW1lbnRzLFxuICAgICAgICB1cFRpbWVySWQsIGRvd25UaW1lcklkLCBsZWZ0VGltZXJJZCwgcmlnaHRUaW1lcklkfSBmcm9tIFwiLi9wbGF5ZXIuanNcIlxuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybXMsIG1vdmVQbGF0Zm9ybXMsIHNjb3JlfSBmcm9tIFwiLi9wbGF0Zm9ybS5qc1wiXG5pbXBvcnQge3BsYXllclNob290LCBzaG9vdEJ1bGxldH0gZnJvbSBcIi4vcGxheWVyU2hvb3QuanNcIlxuaW1wb3J0IHtjcmVhdGVFbmVteXMsIG1vdmVFbmVteXN9IGZyb20gXCIuL2VuZW15LmpzXCJcblxuZXhwb3J0IGxldCBnYW1lT3ZlciAgID0gZmFsc2U7XG5leHBvcnQgbGV0IGdhbWVQYXVzZWQgPSBmYWxzZTtcbmV4cG9ydCBsZXQgc29mdFBhdXNlZCA9IGZhbHNlO1xuXG4vLyBJbiBjaGFyZ2Ugb2Ygc3RhcnRpbmcgdGhlIGdhbWUsIGNhbGxzIG5lY2Vzc2FyeSBmdW5jdGlvbnMgbmVlZGVkIGZvciBidWlsZGluZyBhbmQgcmVuZGVyaW5nLlxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQoZ3JpZCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjcmVhdGVQbGF0Zm9ybXMoKTtcbiAgICAgICAgY3JlYXRlRW5lbXlzKClcbiAgICAgICAgY3JlYXRlUGxheWVyKClcbiAgICAgICAgc2V0SW50ZXJ2YWwobW92ZVBsYXRmb3JtcywgMSk7XG4gICAgICAgIHNldEludGVydmFsKG1vdmVFbmVteXMsIDEpO1xuICAgICAgICBzZXRJbnRlcnZhbChzaG9vdEJ1bGxldCwgMSk7XG4gICAgICAgIHNsaW1lSnVtcCgpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJTaG9vdClcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllck1vdmVtZW50cylcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllclBhdXNlR2FtZSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJlc3RhcnQpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc3RvcFBsYXllck1vdmVtZW50cylcbiAgICB9XG59XG5cbi8vIFBhdXNlcyBnYW1lIGJ5IHNldHRpbmcgZXhwb3J0ZWQgdmFyaWFibGUgdG8gZGVzaXJlZCBnYW1lIHN0YXRlXG5cbmZ1bmN0aW9uIHBsYXllclBhdXNlR2FtZShldmVudCkge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyICYmICFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfSBcbiAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzMiAmJiBnYW1lUGF1c2VkKSB7XG4gICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBnYW1lUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHNvZnRQYXVzZWQgPSBmYWxzZTtcbiAgICB9IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF1c2VHYW1lKCkge1xuICAgIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgIHNvZnRQYXVzZWQgPSB0cnVlO1xufVxuXG4vLyBFbmRzIGdhbWUgYnkgY2xlYXJpbmcgdGhlIGdyaWQgYW5kIFRpbWVySWRzXG5cbmV4cG9ydCBmdW5jdGlvbiBlbmRHYW1lKCkgeyBcbiAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpO1xuICAgIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpO1xuICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpO1xuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICBjb25zdCBlbmRpbmdPbmVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZUVuZGluZycpO1xuICAgIGNvbnN0IGVuZGluZ1R3b1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHdvRW5kaW5nJyk7XG4gICAgY29uc3QgZW5kaW5nVGhyZWVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbmFsU2NvcmUnKTtcbiAgICBjb25zdCBvZ1Njb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XG4gICAgb2dTY29yZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGVuZGluZ09uZVRleHQuaW5uZXJIVE1MID0gXCJpdCB3YXNuJ3QgZW5vdWdoXCI7XG4gICAgZW5kaW5nVHdvVGV4dC5pbm5lckhUTUwgPSBcInByZXNzIFIgdG8gdHJ5IGFnYWluXCI7XG4gICAgZW5kaW5nVGhyZWVUZXh0LmlubmVySFRNTCA9IGBmaW5hbCBzY29yZTogJHtzY29yZX1gO1xufVxuXG4vLyBSZXN0YXJ0cyBnYW1lIHZpYSByZWxvYWRpbmcgcGFnZVxuXG5mdW5jdGlvbiByZXN0YXJ0KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDgyKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfVxufVxuXG5cbiIsImltcG9ydCB7Z2FtZU92ZXIsIGdhbWVQYXVzZWQsIHNvZnRQYXVzZWR9IGZyb20gXCIuL2dhbWUuanNcIlxuaW1wb3J0IHtpc0p1bXBpbmcsIGlzRmFsbGluZ30gZnJvbSBcIi4vcGxheWVyLmpzXCJcblxubGV0IHBsYXRmb3JtQ291bnQgICAgPSAxMDtcblxuZXhwb3J0IGxldCBzY29yZSAgICAgPSAxO1xuZXhwb3J0IGxldCBwbGF0Zm9ybXMgPSBbXTtcblxuLy8gU2V0cyBQbGF0Zm9ybSBwcm9wZXJ0aWVzXG5cbmNsYXNzIFBsYXRmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gbmV3UGxhdEJvdHRvbTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gTWF0aC5yYW5kb20oKSAqIDQ1MDtcbiAgICAgICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdwbGF0Zm9ybScpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSB0aGlzLmJvdHRvbSArICdweCc7XG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgICB9XG59XG5cbi8vIENyZWF0ZXMgcGxhdGZvcm1zIGFuZCBwdXNoZXMgdG8gcGxhdGZvcm0gYXJyYXlcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXRmb3JtcygpIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXRmb3JtQ291bnQ7IGkrKykge1xuICAgICAgICBsZXQgcGxhdGZvcm1HYXAgPSAxNzAwIC8gcGxhdGZvcm1Db3VudDtcbiAgICAgICAgbGV0IG5ld1BsYXRCb3R0b20gPSAxMDAgKyBpICogcGxhdGZvcm1HYXA7XG4gICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCBuZXdQbGF0Qm90dG9tKTtcbiAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pXG4gICAgfVxufVxuXG4vLyBNb3ZlcyBQbGF0Zm9ybXMgYnkgc3Vic3RyYWN0aW5nLCBvciBhZGRpbmcgdG8gdGhlIFBsYXRmb3JtJ3MgYm90dG9tIHByb3BlcnR5XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUGxhdGZvcm1zKCkge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIGlmICghZ2FtZVBhdXNlZCB8fCBzb2Z0UGF1c2VkKSB7XG4gICAgICAgIHBsYXRmb3Jtcy5mb3JFYWNoKHBsYXRmb3JtID0+IHtcbiAgICAgICAgICAgIGlmIChpc0p1bXBpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc29mdFBhdXNlZCkgeyBcbiAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDEuNTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybS5ib3R0b20gLT0gMy41O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0ZhbGxpbmcpIHtcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybS5ib3R0b20gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB2aXN1YWwgPSBwbGF0Zm9ybS52aXN1YWw7XG4gICAgICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gcGxhdGZvcm0uYm90dG9tICsgJ3B4JztcbiAgICAgICAgICAgIHVwZGF0ZVBsYXRmb3JtcyhwbGF0Zm9ybSwgZ3JpZCk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG4vLyBSZW1vdmVzIG9sZCBwbGF0Zm9ybXMgYW5kIGNyZWF0ZXMgbmV3IHBsYXRmb3JtcyB0aGF0IGFyZSB0aGVuIHB1c2hlZCB0byBwbGF0Zm9ybSBhcnJheVxuXG5mdW5jdGlvbiB1cGRhdGVQbGF0Zm9ybXMocGxhdGZvcm0sIGdyaWQpIHtcbiAgICBpZiAoIWdhbWVPdmVyKSB7IFxuICAgICAgICBpZiAocGxhdGZvcm0uYm90dG9tIDw9IC01MCkge1xuICAgICAgICAgICAgY29uc3Qgc2NvcmVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XG4gICAgICAgICAgICBjb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVtZW50VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZlbWVudCcpO1xuICAgICAgICAgICAgY29uc3Qgc2hvb3RUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNob290Jyk7XG4gICAgICAgICAgICBsZXQgZmlyc3RQbGF0Zm9ybSA9IHBsYXRmb3Jtc1swXS52aXN1YWw7XG4gICAgICAgICAgICBmaXJzdFBsYXRmb3JtLnJlbW92ZSgpO1xuICAgICAgICAgICAgcGxhdGZvcm1zLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoIXNvZnRQYXVzZWQgKSB7XG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gMTtcbiAgICAgICAgICAgICAgICBzY29yZVRleHQuaW5uZXJIVE1MID0gc2NvcmU7XG4gICAgICAgICAgICAgICAgdGl0bGVUZXh0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgbW92ZW1lbnRUZXh0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgc2hvb3RUZXh0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgMTcwMClcbiAgICAgICAgICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKVxuXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge2VuZEdhbWUsIGdhbWVQYXVzZWR9IGZyb20gXCIuL2dhbWUuanNcIjtcbmltcG9ydCB7cGxhdGZvcm1zfSBmcm9tIFwiLi9wbGF0Zm9ybS5qc1wiXG5pbXBvcnQge3NsaW1lU291bmRQbGF5fSBmcm9tIFwiLi9zb3VuZC5qc1wiXG5cbmNvbnN0IHNsaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxubGV0IGlzR29pbmdMZWZ0ICAgICAgICAgICAgID0gZmFsc2U7XG5sZXQgaXNHb2luZ1JpZ2h0ICAgICAgICAgICAgPSBmYWxzZTtcblxuZXhwb3J0IGxldCBpc0p1bXBpbmcgICAgICAgID0gZmFsc2U7XG5leHBvcnQgbGV0IGlzRmFsbGluZyAgICAgICAgPSB0cnVlO1xuZXhwb3J0IGxldCBzbGltZUxlZnRTcGFjZSAgID0gMjgwO1xuZXhwb3J0IGxldCBnYW1lT3ZlciAgICAgICAgID0gZmFsc2U7XG5leHBvcnQgbGV0IHN0YXJ0UG9pbnQgICAgICAgPSAyMDA7XG5leHBvcnQgbGV0IHNsaW1lQm90dG9tU3BhY2UgPSBzdGFydFBvaW50O1xuZXhwb3J0IGxldCBsZWZ0VGltZXJJZDtcbmV4cG9ydCBsZXQgcmlnaHRUaW1lcklkO1xuZXhwb3J0IGxldCB1cFRpbWVySWQ7XG5leHBvcnQgbGV0IGRvd25UaW1lcklkO1xuXG4vLyBDcmVhdGUgJ1NsaW1lJyBhbmQgYWRkIHRvIHRoZSBncmlkLlxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQoc2xpbWUpO1xuICAgIHNsaW1lLmNsYXNzTGlzdC5hZGQoJ3NsaW1lJyk7XG4gICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4Jztcbn1cblxuLy8gSW4gY2hhcmdlIG9mIGFkZGluZyB0byB0aGUgcGxheWVyJ3MgWSB2YWx1ZSBhbmQgY2FsbGluZyBzbGltZUZhbGwoKVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpbWVKdW1wKCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKVxuICAgICAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgICAgICBpc0ZhbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgdXBUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgICAgICAgICBzbGltZUJvdHRvbVNwYWNlICs9IDE7XG4gICAgICAgICAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgICAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPiBzdGFydFBvaW50ICsgMTAwKSBzbGltZUZhbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbi8vIEluIGNoYXJnZSBvZiBzdWJ0cmFjdGluZyB0aGUgcGxheWVyJ3MgWSB2YWx1ZSBhbmQgY2FsbGluZyBlbmRHYW1lKClcblxuZnVuY3Rpb24gc2xpbWVGYWxsKCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKHVwVGltZXJJZClcbiAgICAgICAgaXNKdW1waW5nID0gZmFsc2U7XG4gICAgICAgIGlzRmFsbGluZyA9IHRydWU7XG4gICAgICAgIGRvd25UaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgICAgICAgICBzbGltZUJvdHRvbVNwYWNlIC09IDI7XG4gICAgICAgICAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgICAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPD0gLTIwMCApIGVuZEdhbWUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKSk7IFxuICAgICAgICAgICAgICAgIHBsYXRmb3Jtcy5mb3JFYWNoKHBsYXRmb3JtID0+IHsgY29sbGlzaW9uRGV0ZWN0KHBsYXRmb3JtKTt9IClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbi8vIENoZWNrcyB0aGUgdmFsdWUgb2YgdGhlIGJvdHRvbSBvZiB0aGUgcGxheWVyLCBpZiBzYWlkIHZhbHVlIHJldHVybnMgdHJ1ZSBpdCBjYWxscyBzbGltZUp1bXAoKVxuXG5mdW5jdGlvbiBjb2xsaXNpb25EZXRlY3QocGxhdGZvcm0pIHtcbiAgICBpZiAoKHNsaW1lQm90dG9tU3BhY2UgPj0gcGxhdGZvcm0uYm90dG9tKSAmJiAoc2xpbWVCb3R0b21TcGFjZSA8PSAocGxhdGZvcm0uYm90dG9tICsgMTkpKSAmJlxuICAgICgoc2xpbWVMZWZ0U3BhY2UgKyA0MCkgPj0gcGxhdGZvcm0ubGVmdCkgJiYgKHNsaW1lTGVmdFNwYWNlIDw9IChwbGF0Zm9ybS5sZWZ0ICsgMTAwKSkgJiZcbiAgICAhaXNKdW1waW5nKSB7XG4gICAgICAgIHN0YXJ0UG9pbnQgPSBzbGltZUJvdHRvbVNwYWNlO1xuICAgICAgICAvLyBzbGltZVNvdW5kUGxheSgpO1xuICAgICAgICBzbGltZUp1bXAoKTtcbiAgICAgICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICB9XG59XG5cbi8vIENhbGxzIG1vdmVMZWZ0KCkgb3IgbW92ZVJpZ2h0IGRlcGVuZGluZyBvbiBwbGF5ZXIgaW5wdXQuICpVc2VzIGtleWRvd24qXG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSBtb3ZlTGVmdCgpO1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIG1vdmVSaWdodCgpO1xuICAgICAgICBcbiAgICB9XG59XG5cbi8vIENlYXNlcyBwbGF5ZXIgbW92ZW1lbnQgZGVwZW5kaW5nIG9uIGtleSByZWxlYXNlLiAqVXNlcyBrZXl1cCpcblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIHtcbiAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIHtcbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgIH1cbn1cblxuLy8gRGVjcmVtZW50cyBwbGF5ZXIncyBYIHZhbHVlXG5cbmZ1bmN0aW9uIG1vdmVMZWZ0KCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgICAgICBpZiAoaXNHb2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICAgICAgICAgIGlzR29pbmdSaWdodCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaXNHb2luZ0xlZnQgPSB0cnVlXG4gICAgICAgIGxlZnRUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNsaW1lTGVmdFNwYWNlID49IC02MCkge1xuICAgICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgLT0gMjtcbiAgICAgICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCdcbiAgICAgICAgICAgIH0gZWxzZSBzbGltZUxlZnRTcGFjZSA9IDYwMDtcbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbi8vIEluY3JlbWVudHMgcGxheWVyJ3MgWCB2YWx1ZVxuXG5mdW5jdGlvbiBtb3ZlUmlnaHQoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKVxuICAgICAgICBpZiAoaXNHb2luZ0xlZnQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgICAgICAgICBpc0dvaW5nTGVmdCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gdHJ1ZVxuICAgICAgICByaWdodFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPD0gNjEwKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgKz0gMjtcbiAgICAgICAgICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnXG4gICAgICAgICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSAtNjA7XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4iLCJpbXBvcnQge3NsaW1lTGVmdFNwYWNlLCBzbGltZUJvdHRvbVNwYWNlfSBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCB7ZW5lbXlzLCBraWxsRW5lbXl9IGZyb20gXCIuL2VuZW15LmpzXCJcblxuZXhwb3J0IGxldCBidWxsZXRzID0gW107XG5cbmNsYXNzIEJ1bGxldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2U7XG4gICAgICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgICAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnYnVsbGV0Jyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAxMiArICdweCc7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgMTIgKyAncHgnO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyU2hvb3QoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgc2hvb3RCdWxsZXQoKTtcbiAgICAgICAgbGV0IG5ld0J1bGxldCA9IG5ldyBCdWxsZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKSwgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgIGJ1bGxldHMucHVzaChuZXdCdWxsZXQpO1xuICAgIH0gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9vdEJ1bGxldCh4LCB5KSB7XG4gICAgYnVsbGV0cy5mb3JFYWNoKGJ1bGxldCA9PiB7XG4gICAgICAgIGJ1bGxldC5ib3R0b20gLT0gMztcbiAgICAgICAgbGV0IHZpc3VhbCA9IGJ1bGxldC52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBidWxsZXQuYm90dG9tICsgJ3B4JztcbiAgICAgICAgZW5lbXlzLmZvckVhY2goKGVuZW15KSA9PiB7IGNvbGxpc2lvbkRldGVjdChlbmVteSwgYnVsbGV0LmJvdHRvbSwgYnVsbGV0LmxlZnQpIH0pXG4gICAgICAgIGlmIChidWxsZXQuYm90dG9tID49IDc1MCkge1xuICAgICAgICAgICAgbGV0IGZpcnN0QnVsbGV0ID0gYnVsbGV0c1swXS52aXN1YWw7XG4gICAgICAgICAgICBmaXJzdEJ1bGxldC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGJ1bGxldHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdChlbmVteSwgYm90dG9tLCBsZWZ0KSB7XG4gICAgaWYgKChib3R0b20gPj0gZW5lbXkuYm90dG9tKSAmJiAoYm90dG9tIDw9IChlbmVteS5ib3R0b20gKyAxOSkpICYmXG4gICAgKChsZWZ0ICsgNDApID49IGVuZW15LmxlZnQpICYmIChsZWZ0IDw9IChlbmVteS5sZWZ0ICsgMTAwKSkpXG4gICAge1xuICAgICAgICBraWxsRW5lbXkoZW5lbXkpXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGl0XCIpXG4gICAgfVxuICAgIFxufVxuIFxuIiwiLy8gbGV0IG11dGVkID0gdHJ1ZTtcbi8vIGxldCBzb25nUnVubmluZyA9IGZhbHNlO1xuXG4vLyAvLyBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51XCIpXG4vLyAvLyBjb25zb2xlLmxvZyhtZW51KVxuLy8gLy8gY29uc3QgbWVudUxpc3QgPSBtZW51LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1saXN0XCIpXG5cblxuLy8gLy8gSW1wb3J0aW5nIGJhY2tncm91bmQgbXVzaWNcblxuLy8gbGV0IGJhY2tncm91bmRNdXNpY09uZSAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL0EgTG9uZWx5IENoZXJyeSBUcmVlIPCfjLgubXAzXCIpO1xuLy8gbGV0IGJhY2tncm91bmRNdXNpY1R3byAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL0hlbGxvLCBpdCdzIE1lIS5tcDNcIik7XG4vLyBsZXQgYmFja2dyb3VuZE11c2ljVGhyZWUgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvTWVsYW5jaG9saWMgV2Fsay5tcDNcIik7XG4vLyBsZXQgYmFja2dyb3VuZE11c2ljRm91ciAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvTm8gRGVzdGluYXRpb24ubXAzXCIpO1xuLy8gbGV0IGJhY2tncm91bmRNdXNpY0ZpdmUgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1JlYWR5IFBpeGVsIE9uZS5tcDNcIik7XG4vLyBsZXQgYmFja2dyb3VuZE11c2ljU2l4ICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvUnVuIEFzIEZhc3QgQXMgWW91IENhbi5tcDNcIik7XG4vLyBsZXQgYmFja2dyb3VuZE11c2ljU2V2ZW4gPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvVGhlIHNlYXJjaC5tcDNcIik7XG4vLyBsZXQgYmFja2dyb3VuZE11c2ljRWlnaHQgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvV2VsY29tZSBTcGFjZSBUcmF2ZWxlci5tcDNcIik7XG5cbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWMgPSBbYmFja2dyb3VuZE11c2ljT25lLCBiYWNrZ3JvdW5kTXVzaWNUd28sIGJhY2tncm91bmRNdXNpY1RocmVlLCBiYWNrZ3JvdW5kTXVzaWNGb3VyLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kTXVzaWNGaXZlLCBiYWNrZ3JvdW5kTXVzaWNTaXgsIGJhY2tncm91bmRNdXNpY1NldmVuLCBiYWNrZ3JvdW5kTXVzaWNFaWdodF07XG5cbi8vIC8vIEltcG9ydGluZyBzbGltZSBzb3VuZHNcbi8vIGxldCBzbGltZVNvdW5kT25lICAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMC5tcDNcIik7XG4vLyBsZXQgc2xpbWVTb3VuZFR3byAgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzEubXAzXCIpO1xuLy8gbGV0IHNsaW1lU291bmRUaHJlZSAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8yLm1wM1wiKTtcbi8vIGxldCBzbGltZVNvdW5kRm91ciAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMy5tcDNcIik7XG4vLyBsZXQgc2xpbWVTb3VuZEZpdmUgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzAubXAzXCIpO1xuLy8gbGV0IHNsaW1lU291bmRTaXggICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8xLm1wM1wiKTtcbi8vIGxldCBzbGltZVNvdW5kU2V2ZW4gID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMi5tcDNcIik7XG4vLyBsZXQgc2xpbWVTb3VuZEVpZ2h0ICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzMubXAzXCIpO1xuXG4vLyAvLyBBZGp1c3Rpbmcgc2xpbWUgc291bmQgdm9sdW1lc1xuLy8gbGV0IHNsaW1lVm9sdW1lID0gMC4wNTtcbi8vIHNsaW1lU291bmRPbmUudm9sdW1lICAgID0gc2xpbWVWb2x1bWU7XG4vLyBzbGltZVNvdW5kVHdvLnZvbHVtZSAgICA9IHNsaW1lVm9sdW1lO1xuLy8gc2xpbWVTb3VuZFRocmVlLnZvbHVtZSAgPSBzbGltZVZvbHVtZTtcbi8vIHNsaW1lU291bmRGb3VyLnZvbHVtZSAgID0gc2xpbWVWb2x1bWU7XG4vLyBzbGltZVNvdW5kRml2ZS52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuLy8gc2xpbWVTb3VuZFNpeC52b2x1bWUgICAgPSBzbGltZVZvbHVtZTtcbi8vIHNsaW1lU291bmRTZXZlbi52b2x1bWUgID0gc2xpbWVWb2x1bWU7XG4vLyBzbGltZVNvdW5kRWlnaHQudm9sdW1lICA9IHNsaW1lVm9sdW1lO1xuXG4vLyAvLyBQdXNoaW5nIHNsaW1lIHNvdW5kcyBpbnRvIGFuIGFycmF5XG4vLyBsZXQgc2xpbWVTb3VuZHMgPSBbc2xpbWVTb3VuZE9uZSwgc2xpbWVTb3VuZFR3bywgc2xpbWVTb3VuZFRocmVlLCBzbGltZVNvdW5kRm91ciwgc2xpbWVTb3VuZEZvdXIsXG4vLyAgICAgc2xpbWVTb3VuZEZpdmUsIHNsaW1lU291bmRTaXgsIHNsaW1lU291bmRTZXZlbiwgc2xpbWVTb3VuZEVpZ2h0XTtcblxuLy8gLy8gbGV0IGJhY2tncm91bmRNdXNpY1ZvbHVtZSA9IDE7XG5cbi8vIC8vIGJhY2tncm91bmRNdXNpY09uZS52b2x1bWUgICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbi8vIC8vIGJhY2tncm91bmRNdXNpY1R3byAudm9sdW1lICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbi8vIC8vIGJhY2tncm91bmRNdXNpY1RocmVlLnZvbHVtZSA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbi8vIC8vIGJhY2tncm91bmRNdXNpY0ZvdXIudm9sdW1lICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbi8vIC8vIGJhY2tncm91bmRNdXNpY0ZpdmUudm9sdW1lICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbi8vIC8vIGJhY2tncm91bmRNdXNpY1NpeC52b2x1bWUgICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbi8vIC8vIGJhY2tncm91bmRNdXNpY1NldmVuLnZvbHVtZSA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbi8vIC8vIGJhY2tncm91bmRNdXNpY0VpZ2h0LnZvbHVtZSA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcblxuXG5cbi8vIC8vIFJldHVybmluZyByYW5kb20gc2xpbWUgc291bmQgd2hlbiBjYWxsZWRcblxuLy8gZnVuY3Rpb24gc2FtcGxlKGFycmF5KSB7XG4vLyAgICAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IgKCBNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoICldXG4vLyB9XG5cbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4vLyAgICAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtdXNpY1wiKTtcblxuLy8gc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuLy8gICAgIGxldCBjdXJyZW50U29uZyA9IHNhbXBsZShiYWNrZ3JvdW5kTXVzaWMpXG4vLyAgICAgYmFja2dyb3VuZE11c2ljUGxheShjdXJyZW50U29uZylcbi8vICAgICBjdXJyZW50U29uZy52b2x1bWUgPSB0aGlzLnZhbHVlIC8gMTAwO1xuLy8gICAgIGNvbnNvbGUubG9nKHRoaXMudmFsdWUgLyAxMDApXG4vLyAgICAgfSlcbi8vIH0pXG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBzbGltZVNvdW5kUGxheSgpIHtcbi8vICAgICBpZiAoIW11dGVkKSBzYW1wbGUoc2xpbWVTb3VuZHMpLnBsYXkoKTtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGJhY2tncm91bmRNdXNpY1BsYXkoY3VycmVudFNvbmcpIHtcbi8vICAgICBpZiAoIXNvbmdSdW5uaW5nKSB7XG4vLyAgICAgICAgIHNvbmdSdW5uaW5nID0gdHJ1ZTtcbi8vICAgICAgICAgaWYgKCFtdXRlZCkge1xuLy8gICAgICAgICAgICAgY3VycmVudFNvbmcucGxheSgpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuICAgIFxuLy8gfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7c3RhcnQsIHBhdXNlR2FtZX0gZnJvbSBcIi4vc2NyaXB0cy9nYW1lLmpzXCJcblxuY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgc3RhcnQoZ3JpZCk7XG4gICAgcGF1c2VHYW1lKCk7XG59KVxuIl0sIm5hbWVzIjpbImdhbWVPdmVyIiwiZ2FtZVBhdXNlZCIsImVuZW15Q291bnQiLCJlbmVteXMiLCJFbmVteSIsImdyaWQiLCJuZXdFbmVteUJvdHRvbSIsImJvdHRvbSIsImxlZnQiLCJNYXRoIiwicmFuZG9tIiwidmlzdWFsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUVuZW15cyIsInF1ZXJ5U2VsZWN0b3IiLCJpIiwiZW5lbXlHYXAiLCJuZXdFbmVteSIsInB1c2giLCJtb3ZlRW5lbXlzIiwiZm9yRWFjaCIsImVuZW15IiwidXBkYXRlRW5lbXlzIiwiZmlyc3RFbmVteSIsInJlbW92ZSIsInNoaWZ0Iiwia2lsbEVuZW15IiwiY3JlYXRlUGxheWVyIiwic2xpbWVKdW1wIiwicGxheWVyTW92ZW1lbnRzIiwic3RvcFBsYXllck1vdmVtZW50cyIsInVwVGltZXJJZCIsImRvd25UaW1lcklkIiwibGVmdFRpbWVySWQiLCJyaWdodFRpbWVySWQiLCJjcmVhdGVQbGF0Zm9ybXMiLCJtb3ZlUGxhdGZvcm1zIiwic2NvcmUiLCJwbGF5ZXJTaG9vdCIsInNob290QnVsbGV0Iiwic29mdFBhdXNlZCIsInN0YXJ0Iiwic2V0SW50ZXJ2YWwiLCJhZGRFdmVudExpc3RlbmVyIiwicGxheWVyUGF1c2VHYW1lIiwicmVzdGFydCIsImV2ZW50IiwibWVudSIsImtleUNvZGUiLCJkaXNwbGF5IiwicGF1c2VHYW1lIiwiZW5kR2FtZSIsImNsZWFySW50ZXJ2YWwiLCJlbmRpbmdPbmVUZXh0IiwiZW5kaW5nVHdvVGV4dCIsImVuZGluZ1RocmVlVGV4dCIsIm9nU2NvcmUiLCJpbm5lckhUTUwiLCJsb2NhdGlvbiIsInJlbG9hZCIsImlzSnVtcGluZyIsImlzRmFsbGluZyIsInBsYXRmb3JtQ291bnQiLCJwbGF0Zm9ybXMiLCJQbGF0Zm9ybSIsIm5ld1BsYXRCb3R0b20iLCJwbGF0Zm9ybUdhcCIsIm5ld1BsYXRmb3JtIiwicGxhdGZvcm0iLCJ1cGRhdGVQbGF0Zm9ybXMiLCJzY29yZVRleHQiLCJ0aXRsZVRleHQiLCJtb3ZlbWVudFRleHQiLCJzaG9vdFRleHQiLCJmaXJzdFBsYXRmb3JtIiwic2xpbWVTb3VuZFBsYXkiLCJzbGltZSIsImlzR29pbmdMZWZ0IiwiaXNHb2luZ1JpZ2h0Iiwic2xpbWVMZWZ0U3BhY2UiLCJzdGFydFBvaW50Iiwic2xpbWVCb3R0b21TcGFjZSIsInNsaW1lRmFsbCIsImNvbGxpc2lvbkRldGVjdCIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwiYnVsbGV0cyIsIkJ1bGxldCIsIm5ld0J1bGxldCIsImNsaWVudFgiLCJjbGllbnRZIiwieCIsInkiLCJidWxsZXQiLCJmaXJzdEJ1bGxldCIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9