/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/enemy.js":
/*!******************************!*\
  !*** ./src/scripts/enemy.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
    var enemyGap = -600 / enemyCount;
    var newEnemyBottom = -120 + i * enemyGap;
    var newEnemy = new Enemy(grid, newEnemyBottom);
    enemys.push(newEnemy);
  }
} // Moves enemys by substracting, or adding to the enemy's bottom property

function moveEnemys() {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    var grid = document.querySelector('.grid');
    enemys.forEach(function (enemy) {
      enemy.bottom += .55;
      var visual = enemy.visual;
      visual.style.bottom = enemy.bottom + 'px';
      updateEnemys(enemy, grid);
    });
  }
} // Removes old enemys and creates new enemys that are then pushed to enemy array

function updateEnemys(enemy, grid) {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gameOver) {
    if (enemy.bottom >= 820) {
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

      console.log(grid);
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
    startPoint = slimeBottomSpace;
    (0,_sound_js__WEBPACK_IMPORTED_MODULE_2__.slimeSoundPlay)();
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slimeSoundPlay": function() { return /* binding */ slimeSoundPlay; },
/* harmony export */   "backgroundMusicPlay": function() { return /* binding */ backgroundMusicPlay; }
/* harmony export */ });
var muted = true;
var songRunning = false; // const menu = document.querySelector(".menu")
// console.log(menu)
// const menuList = menu.querySelector(".menu-list")
// Importing background music

var backgroundMusicOne = new Audio("../src/sounds/background_music/A Lonely Cherry Tree 🌸.mp3");
var backgroundMusicTwo = new Audio("../src/sounds/background_music/Hello, it's Me!.mp3");
var backgroundMusicThree = new Audio("../src/sounds/background_music/Melancholic Walk.mp3");
var backgroundMusicFour = new Audio("../src/sounds/background_music/No Destination.mp3");
var backgroundMusicFive = new Audio("../src/sounds/background_music/Ready Pixel One.mp3");
var backgroundMusicSix = new Audio("../src/sounds/background_music/Run As Fast As You Can.mp3");
var backgroundMusicSeven = new Audio("../src/sounds/background_music/The search.mp3");
var backgroundMusicEight = new Audio("../src/sounds/background_music/Welcome Space Traveler.mp3");
var backgroundMusic = [backgroundMusicOne, backgroundMusicTwo, backgroundMusicThree, backgroundMusicFour, backgroundMusicFive, backgroundMusicSix, backgroundMusicSeven, backgroundMusicEight]; // Importing slime sounds

var slimeSoundOne = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
var slimeSoundTwo = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
var slimeSoundThree = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
var slimeSoundFour = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3");
var slimeSoundFive = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
var slimeSoundSix = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
var slimeSoundSeven = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
var slimeSoundEight = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3"); // Adjusting slime sound volumes

var slimeVolume = 0.05;
slimeSoundOne.volume = slimeVolume;
slimeSoundTwo.volume = slimeVolume;
slimeSoundThree.volume = slimeVolume;
slimeSoundFour.volume = slimeVolume;
slimeSoundFive.volume = slimeVolume;
slimeSoundSix.volume = slimeVolume;
slimeSoundSeven.volume = slimeVolume;
slimeSoundEight.volume = slimeVolume; // Pushing slime sounds into an array

var slimeSounds = [slimeSoundOne, slimeSoundTwo, slimeSoundThree, slimeSoundFour, slimeSoundFour, slimeSoundFive, slimeSoundSix, slimeSoundSeven, slimeSoundEight]; // let backgroundMusicVolume = 1;
// backgroundMusicOne.volume   = backgroundMusicVolume;
// backgroundMusicTwo .volume  = backgroundMusicVolume;
// backgroundMusicThree.volume = backgroundMusicVolume;
// backgroundMusicFour.volume  = backgroundMusicVolume;
// backgroundMusicFive.volume  = backgroundMusicVolume;
// backgroundMusicSix.volume   = backgroundMusicVolume;
// backgroundMusicSeven.volume = backgroundMusicVolume;
// backgroundMusicEight.volume = backgroundMusicVolume;
// Returning random slime sound when called

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

document.addEventListener('DOMContentLoaded', function () {
  var slider = document.getElementById("music");
  slider.addEventListener('change', function () {
    var currentSong = sample(backgroundMusic);
    backgroundMusicPlay(currentSong);
    currentSong.volume = this.value / 100;
    console.log(this.value / 100);
  });
});
function slimeSoundPlay() {
  if (!muted) sample(slimeSounds).play();
}
function backgroundMusicPlay(currentSong) {
  if (!songRunning) {
    songRunning = true;

    if (!muted) {
      currentSong.play();
    }
  }
}

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TCxFQUFZdUIsTUFBTSxDQUFDRCxXQUFELENBQU4sQ0FBb0JVLElBQXBCO0FBQ2Y7QUFFTSxTQUFTRixtQkFBVCxDQUE2QkQsV0FBN0IsRUFBMEM7QUFDN0MsTUFBSSxDQUFDNUIsV0FBTCxFQUFrQjtBQUNkQSxJQUFBQSxXQUFXLEdBQUcsSUFBZDs7QUFDQSxRQUFJLENBQUNELEtBQUwsRUFBWTtBQUNSNkIsTUFBQUEsV0FBVyxDQUFDRyxJQUFaO0FBQ0g7QUFDSjtBQUVKOzs7Ozs7VUN6RkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQSxJQUFNakksSUFBSSxHQUFHTyxRQUFRLENBQUNPLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBYjtBQUVBUCxRQUFRLENBQUNvQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNoREYsRUFBQUEsdURBQUssQ0FBQ3pDLElBQUQsQ0FBTDtBQUNBa0QsRUFBQUEsMkRBQVM7QUFDWixDQUhELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9lbmVteS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9nYW1lLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXRmb3JtLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXJTaG9vdC5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9zb3VuZC5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnYW1lT3ZlciwgZ2FtZVBhdXNlZH0gZnJvbSBcIi4vZ2FtZS5qc1wiXG5cbmxldCBlbmVteUNvdW50ICAgID0gMjtcblxuZXhwb3J0IGxldCBlbmVteXMgPSBbXTtcblxuXG4vLyBTZXRzIGVuZW15IHByb3BlcnRpZXNcblxuY2xhc3MgRW5lbXkge1xuICAgIGNvbnN0cnVjdG9yKGdyaWQsIG5ld0VuZW15Qm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gbmV3RW5lbXlCb3R0b207XG4gICAgICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgICAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnZW5lbXknKTtcbiAgICAgICAgdmlzdWFsLnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gdGhpcy5ib3R0b20gKyAncHgnO1xuICAgICAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gICAgfVxufVxuXG4vLyBDcmVhdGVzIGVuZW15cyBhbmQgcHVzaGVzIHRvIGVuZW15IGFycmF5XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbmVteXMoKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmVteUNvdW50OyBpKyspIHtcbiAgICAgICAgbGV0IGVuZW15R2FwID0gLTYwMCAvIGVuZW15Q291bnQ7XG4gICAgICAgIGxldCBuZXdFbmVteUJvdHRvbSA9IC0xMjAgKyBpICogZW5lbXlHYXA7XG4gICAgICAgIGxldCBuZXdFbmVteSA9IG5ldyBFbmVteShncmlkLCBuZXdFbmVteUJvdHRvbSk7XG4gICAgICAgIGVuZW15cy5wdXNoKG5ld0VuZW15KVxuICAgIH1cbn1cblxuLy8gTW92ZXMgZW5lbXlzIGJ5IHN1YnN0cmFjdGluZywgb3IgYWRkaW5nIHRvIHRoZSBlbmVteSdzIGJvdHRvbSBwcm9wZXJ0eVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUVuZW15cygpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgICAgIGVuZW15cy5mb3JFYWNoKGVuZW15ID0+IHtcbiAgICAgICAgICAgIGVuZW15LmJvdHRvbSArPSAuNTU7XG4gICAgICAgICAgICBsZXQgdmlzdWFsID0gZW5lbXkudmlzdWFsO1xuICAgICAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGVuZW15LmJvdHRvbSArICdweCc7XG4gICAgICAgICAgICB1cGRhdGVFbmVteXMoZW5lbXksIGdyaWQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuLy8gUmVtb3ZlcyBvbGQgZW5lbXlzIGFuZCBjcmVhdGVzIG5ldyBlbmVteXMgdGhhdCBhcmUgdGhlbiBwdXNoZWQgdG8gZW5lbXkgYXJyYXlcblxuZnVuY3Rpb24gdXBkYXRlRW5lbXlzKGVuZW15LCBncmlkKSB7XG4gICAgaWYgKCFnYW1lT3ZlcikgeyBcbiAgICAgICAgaWYgKGVuZW15LmJvdHRvbSA+PSA4MjApIHtcbiAgICAgICAgICAgIGxldCBmaXJzdEVuZW15ID0gZW5lbXlzWzBdLnZpc3VhbDtcbiAgICAgICAgICAgIGZpcnN0RW5lbXkucmVtb3ZlKCk7XG4gICAgICAgICAgICBlbmVteXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGxldCBuZXdFbmVteSA9IG5ldyBFbmVteShncmlkLCAtNTApXG4gICAgICAgICAgICBlbmVteXMucHVzaChuZXdFbmVteSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBraWxsRW5lbXkoZW5lbXkpIHtcbiAgICBlbmVteS5sZWZ0ID0gMjAwO1xufVxuIiwiLy8gQWRkIHN0YXJ0IG1lbnVcbi8vIEFkZCBwYXVzZSBtZW51XG4vLyBBZGQgZGVhdGggc2NyZWVuXG4vLyBCT05VUzogYWRkIGVuZW15LCBhZGQgc3RhZ2VzXG5cbmltcG9ydCB7Y3JlYXRlUGxheWVyLCBzbGltZUp1bXAsIHBsYXllck1vdmVtZW50cywgc3RvcFBsYXllck1vdmVtZW50cyxcbiAgICAgICAgdXBUaW1lcklkLCBkb3duVGltZXJJZCwgbGVmdFRpbWVySWQsIHJpZ2h0VGltZXJJZH0gZnJvbSBcIi4vcGxheWVyLmpzXCJcbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1zLCBtb3ZlUGxhdGZvcm1zLCBzY29yZX0gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtwbGF5ZXJTaG9vdCwgc2hvb3RCdWxsZXR9IGZyb20gXCIuL3BsYXllclNob290LmpzXCJcbmltcG9ydCB7Y3JlYXRlRW5lbXlzLCBtb3ZlRW5lbXlzfSBmcm9tIFwiLi9lbmVteS5qc1wiXG5cbmV4cG9ydCBsZXQgZ2FtZU92ZXIgICA9IGZhbHNlO1xuZXhwb3J0IGxldCBnYW1lUGF1c2VkID0gZmFsc2U7XG5leHBvcnQgbGV0IHNvZnRQYXVzZWQgPSBmYWxzZTtcblxuLy8gSW4gY2hhcmdlIG9mIHN0YXJ0aW5nIHRoZSBnYW1lLCBjYWxscyBuZWNlc3NhcnkgZnVuY3Rpb25zIG5lZWRlZCBmb3IgYnVpbGRpbmcgYW5kIHJlbmRlcmluZy5cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KGdyaWQpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY3JlYXRlUGxhdGZvcm1zKCk7XG4gICAgICAgIGNyZWF0ZUVuZW15cygpXG4gICAgICAgIGNyZWF0ZVBsYXllcigpXG4gICAgICAgIHNldEludGVydmFsKG1vdmVQbGF0Zm9ybXMsIDEpO1xuICAgICAgICBzZXRJbnRlcnZhbChtb3ZlRW5lbXlzLCAxKTtcbiAgICAgICAgc2V0SW50ZXJ2YWwoc2hvb3RCdWxsZXQsIDEpO1xuICAgICAgICBzbGltZUp1bXAoKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyU2hvb3QpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJNb3ZlbWVudHMpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJQYXVzZUdhbWUpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCByZXN0YXJ0KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN0b3BQbGF5ZXJNb3ZlbWVudHMpXG4gICAgfVxufVxuXG4vLyBQYXVzZXMgZ2FtZSBieSBzZXR0aW5nIGV4cG9ydGVkIHZhcmlhYmxlIHRvIGRlc2lyZWQgZ2FtZSBzdGF0ZVxuXG5mdW5jdGlvbiBwbGF5ZXJQYXVzZUdhbWUoZXZlbnQpIHtcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcblxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMiAmJiAhZ2FtZVBhdXNlZCkge1xuICAgICAgICBnYW1lUGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0gXG4gICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgJiYgZ2FtZVBhdXNlZCkge1xuICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBzb2Z0UGF1c2VkID0gZmFsc2U7XG4gICAgfSBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdXNlR2FtZSgpIHtcbiAgICBnYW1lUGF1c2VkID0gdHJ1ZTtcbiAgICBzb2Z0UGF1c2VkID0gdHJ1ZTtcbn1cblxuLy8gRW5kcyBnYW1lIGJ5IGNsZWFyaW5nIHRoZSBncmlkIGFuZCBUaW1lcklkc1xuXG5leHBvcnQgZnVuY3Rpb24gZW5kR2FtZSgpIHsgXG4gICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gICAgY29uc3QgZW5kaW5nT25lVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVFbmRpbmcnKTtcbiAgICBjb25zdCBlbmRpbmdUd29UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR3b0VuZGluZycpO1xuICAgIGNvbnN0IGVuZGluZ1RocmVlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maW5hbFNjb3JlJyk7XG4gICAgY29uc3Qgb2dTY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgIG9nU2NvcmUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBlbmRpbmdPbmVUZXh0LmlubmVySFRNTCA9IFwiaXQgd2Fzbid0IGVub3VnaFwiO1xuICAgIGVuZGluZ1R3b1RleHQuaW5uZXJIVE1MID0gXCJwcmVzcyBSIHRvIHRyeSBhZ2FpblwiO1xuICAgIGVuZGluZ1RocmVlVGV4dC5pbm5lckhUTUwgPSBgZmluYWwgc2NvcmU6ICR7c2NvcmV9YDtcbn1cblxuLy8gUmVzdGFydHMgZ2FtZSB2aWEgcmVsb2FkaW5nIHBhZ2VcblxuZnVuY3Rpb24gcmVzdGFydChldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA4Mikge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgIH1cbn1cblxuXG4iLCJpbXBvcnQge2dhbWVPdmVyLCBnYW1lUGF1c2VkLCBzb2Z0UGF1c2VkfSBmcm9tIFwiLi9nYW1lLmpzXCJcbmltcG9ydCB7aXNKdW1waW5nLCBpc0ZhbGxpbmd9IGZyb20gXCIuL3BsYXllci5qc1wiXG5cbmxldCBwbGF0Zm9ybUNvdW50ICAgID0gMTA7XG5cbmV4cG9ydCBsZXQgc2NvcmUgICAgID0gMTtcbmV4cG9ydCBsZXQgcGxhdGZvcm1zID0gW107XG5cbi8vIFNldHMgUGxhdGZvcm0gcHJvcGVydGllc1xuXG5jbGFzcyBQbGF0Zm9ybSB7XG4gICAgY29uc3RydWN0b3IoZ3JpZCwgbmV3UGxhdEJvdHRvbSkge1xuICAgICAgICB0aGlzLmJvdHRvbSA9IG5ld1BsYXRCb3R0b207XG4gICAgICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgICAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgncGxhdGZvcm0nKTtcbiAgICAgICAgdmlzdWFsLnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gdGhpcy5ib3R0b20gKyAncHgnO1xuICAgICAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gICAgfVxufVxuXG4vLyBDcmVhdGVzIHBsYXRmb3JtcyBhbmQgcHVzaGVzIHRvIHBsYXRmb3JtIGFycmF5XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybXMoKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0Zm9ybUNvdW50OyBpKyspIHtcbiAgICAgICAgbGV0IHBsYXRmb3JtR2FwID0gMTcwMCAvIHBsYXRmb3JtQ291bnQ7XG4gICAgICAgIGxldCBuZXdQbGF0Qm90dG9tID0gMTAwICsgaSAqIHBsYXRmb3JtR2FwO1xuICAgICAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgbmV3UGxhdEJvdHRvbSk7XG4gICAgICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKVxuICAgIH1cbn1cblxuLy8gTW92ZXMgUGxhdGZvcm1zIGJ5IHN1YnN0cmFjdGluZywgb3IgYWRkaW5nIHRvIHRoZSBQbGF0Zm9ybSdzIGJvdHRvbSBwcm9wZXJ0eVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVBsYXRmb3JtcygpIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBpZiAoIWdhbWVQYXVzZWQgfHwgc29mdFBhdXNlZCkge1xuICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNKdW1waW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvZnRQYXVzZWQpIHsgXG4gICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAxLjU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDMuNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNGYWxsaW5nKSB7XG4gICAgICAgICAgICAgICAgcGxhdGZvcm0uYm90dG9tICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdmlzdWFsID0gcGxhdGZvcm0udmlzdWFsO1xuICAgICAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHBsYXRmb3JtLmJvdHRvbSArICdweCc7XG4gICAgICAgICAgICB1cGRhdGVQbGF0Zm9ybXMocGxhdGZvcm0sIGdyaWQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuLy8gUmVtb3ZlcyBvbGQgcGxhdGZvcm1zIGFuZCBjcmVhdGVzIG5ldyBwbGF0Zm9ybXMgdGhhdCBhcmUgdGhlbiBwdXNoZWQgdG8gcGxhdGZvcm0gYXJyYXlcblxuZnVuY3Rpb24gdXBkYXRlUGxhdGZvcm1zKHBsYXRmb3JtLCBncmlkKSB7XG4gICAgaWYgKCFnYW1lT3ZlcikgeyBcbiAgICAgICAgaWYgKHBsYXRmb3JtLmJvdHRvbSA8PSAtNTApIHtcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgICAgICAgICBjb25zdCBtb3ZlbWVudFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZW1lbnQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNob290VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG9vdCcpO1xuICAgICAgICAgICAgbGV0IGZpcnN0UGxhdGZvcm0gPSBwbGF0Zm9ybXNbMF0udmlzdWFsO1xuICAgICAgICAgICAgZmlyc3RQbGF0Zm9ybS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCFzb2Z0UGF1c2VkICkge1xuICAgICAgICAgICAgICAgIHNjb3JlICs9IDE7XG4gICAgICAgICAgICAgICAgc2NvcmVUZXh0LmlubmVySFRNTCA9IHNjb3JlO1xuICAgICAgICAgICAgICAgIHRpdGxlVGV4dC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIG1vdmVtZW50VGV4dC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNob290VGV4dC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZ3JpZClcbiAgICAgICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCAxNzAwKVxuICAgICAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pXG5cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7ZW5kR2FtZSwgZ2FtZVBhdXNlZH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xuaW1wb3J0IHtwbGF0Zm9ybXN9IGZyb20gXCIuL3BsYXRmb3JtLmpzXCJcbmltcG9ydCB7c2xpbWVTb3VuZFBsYXl9IGZyb20gXCIuL3NvdW5kLmpzXCJcblxuY29uc3Qgc2xpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG5sZXQgaXNHb2luZ0xlZnQgICAgICAgICAgICAgPSBmYWxzZTtcbmxldCBpc0dvaW5nUmlnaHQgICAgICAgICAgICA9IGZhbHNlO1xuXG5leHBvcnQgbGV0IGlzSnVtcGluZyAgICAgICAgPSBmYWxzZTtcbmV4cG9ydCBsZXQgaXNGYWxsaW5nICAgICAgICA9IHRydWU7XG5leHBvcnQgbGV0IHNsaW1lTGVmdFNwYWNlICAgPSAyODA7XG5leHBvcnQgbGV0IGdhbWVPdmVyICAgICAgICAgPSBmYWxzZTtcbmV4cG9ydCBsZXQgc3RhcnRQb2ludCAgICAgICA9IDIwMDtcbmV4cG9ydCBsZXQgc2xpbWVCb3R0b21TcGFjZSA9IHN0YXJ0UG9pbnQ7XG5leHBvcnQgbGV0IGxlZnRUaW1lcklkO1xuZXhwb3J0IGxldCByaWdodFRpbWVySWQ7XG5leHBvcnQgbGV0IHVwVGltZXJJZDtcbmV4cG9ydCBsZXQgZG93blRpbWVySWQ7XG5cbi8vIENyZWF0ZSAnU2xpbWUnIGFuZCBhZGQgdG8gdGhlIGdyaWQuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKS5hcHBlbmRDaGlsZChzbGltZSk7XG4gICAgc2xpbWUuY2xhc3NMaXN0LmFkZCgnc2xpbWUnKTtcbiAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnO1xuICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xufVxuXG4vLyBJbiBjaGFyZ2Ugb2YgYWRkaW5nIHRvIHRoZSBwbGF5ZXIncyBZIHZhbHVlIGFuZCBjYWxsaW5nIHNsaW1lRmFsbCgpXG5cbmV4cG9ydCBmdW5jdGlvbiBzbGltZUp1bXAoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpXG4gICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgICAgIGlzRmFsbGluZyA9IGZhbHNlO1xuICAgICAgICB1cFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHNsaW1lQm90dG9tU3BhY2UgKz0gMTtcbiAgICAgICAgICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgICAgICAgICBpZiAoc2xpbWVCb3R0b21TcGFjZSA+IHN0YXJ0UG9pbnQgKyAxMDApIHNsaW1lRmFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxKVxuICAgIH1cbn1cblxuLy8gSW4gY2hhcmdlIG9mIHN1YnRyYWN0aW5nIHRoZSBwbGF5ZXIncyBZIHZhbHVlIGFuZCBjYWxsaW5nIGVuZEdhbWUoKVxuXG5mdW5jdGlvbiBzbGltZUZhbGwoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKVxuICAgICAgICBpc0p1bXBpbmcgPSBmYWxzZTtcbiAgICAgICAgaXNGYWxsaW5nID0gdHJ1ZTtcbiAgICAgICAgZG93blRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHNsaW1lQm90dG9tU3BhY2UgLT0gMjtcbiAgICAgICAgICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgICAgICAgICBpZiAoc2xpbWVCb3R0b21TcGFjZSA8PSAtMjAwICkgZW5kR2FtZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpKTsgXG4gICAgICAgICAgICAgICAgcGxhdGZvcm1zLmZvckVhY2gocGxhdGZvcm0gPT4geyBjb2xsaXNpb25EZXRlY3QocGxhdGZvcm0pO30gKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxKVxuICAgIH1cbn1cblxuLy8gQ2hlY2tzIHRoZSB2YWx1ZSBvZiB0aGUgYm90dG9tIG9mIHRoZSBwbGF5ZXIsIGlmIHNhaWQgdmFsdWUgcmV0dXJucyB0cnVlIGl0IGNhbGxzIHNsaW1lSnVtcCgpXG5cbmZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdChwbGF0Zm9ybSkge1xuICAgIGlmICgoc2xpbWVCb3R0b21TcGFjZSA+PSBwbGF0Zm9ybS5ib3R0b20pICYmIChzbGltZUJvdHRvbVNwYWNlIDw9IChwbGF0Zm9ybS5ib3R0b20gKyAxOSkpICYmXG4gICAgKChzbGltZUxlZnRTcGFjZSArIDQwKSA+PSBwbGF0Zm9ybS5sZWZ0KSAmJiAoc2xpbWVMZWZ0U3BhY2UgPD0gKHBsYXRmb3JtLmxlZnQgKyAxMDApKSAmJlxuICAgICFpc0p1bXBpbmcpIHtcbiAgICAgICAgc3RhcnRQb2ludCA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgIHNsaW1lU291bmRQbGF5KCk7XG4gICAgICAgIHNsaW1lSnVtcCgpO1xuICAgICAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgIH1cbn1cblxuLy8gQ2FsbHMgbW92ZUxlZnQoKSBvciBtb3ZlUmlnaHQgZGVwZW5kaW5nIG9uIHBsYXllciBpbnB1dC4gKlVzZXMga2V5ZG93bipcblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIG1vdmVMZWZ0KCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkgbW92ZVJpZ2h0KCk7XG4gICAgICAgIFxuICAgIH1cbn1cblxuLy8gQ2Vhc2VzIHBsYXllciBtb3ZlbWVudCBkZXBlbmRpbmcgb24ga2V5IHJlbGVhc2UuICpVc2VzIGtleXVwKlxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkge1xuICAgICAgICBpc0dvaW5nTGVmdCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkge1xuICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gICAgfVxufVxuXG4vLyBEZWNyZW1lbnRzIHBsYXllcidzIFggdmFsdWVcblxuZnVuY3Rpb24gbW92ZUxlZnQoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgICAgIGlmIChpc0dvaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKVxuICAgICAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpc0dvaW5nTGVmdCA9IHRydWVcbiAgICAgICAgbGVmdFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPj0gLTYwKSB7XG4gICAgICAgICAgICBzbGltZUxlZnRTcGFjZSAtPSAyO1xuICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgICAgfSBlbHNlIHNsaW1lTGVmdFNwYWNlID0gNjAwO1xuICAgICAgICB9LCAxKVxuICAgIH1cbn1cblxuLy8gSW5jcmVtZW50cyBwbGF5ZXIncyBYIHZhbHVlXG5cbmZ1bmN0aW9uIG1vdmVSaWdodCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgIGlmIChpc0dvaW5nTGVmdCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpc0dvaW5nUmlnaHQgPSB0cnVlXG4gICAgICAgIHJpZ2h0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA8PSA2MTApIHtcbiAgICAgICAgICAgICAgICBzbGltZUxlZnRTcGFjZSArPSAyO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCdcbiAgICAgICAgICAgIH0gZWxzZSBzbGltZUxlZnRTcGFjZSA9IC02MDtcbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbiIsImltcG9ydCB7c2xpbWVMZWZ0U3BhY2UsIHNsaW1lQm90dG9tU3BhY2V9IGZyb20gXCIuL3BsYXllci5qc1wiO1xuaW1wb3J0IHtlbmVteXMsIGtpbGxFbmVteX0gZnJvbSBcIi4vZW5lbXkuanNcIlxuXG5leHBvcnQgbGV0IGJ1bGxldHMgPSBbXTtcblxuY2xhc3MgQnVsbGV0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlO1xuICAgICAgICB0aGlzLmxlZnQgPSBzbGltZUxlZnRTcGFjZTtcbiAgICAgICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdidWxsZXQnKTtcbiAgICAgICAgdmlzdWFsLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArIDEyICsgJ3B4JztcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAxMiArICdweCc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJTaG9vdChldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBzaG9vdEJ1bGxldCgpO1xuICAgICAgICBsZXQgbmV3QnVsbGV0ID0gbmV3IEJ1bGxldChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgICAgYnVsbGV0cy5wdXNoKG5ld0J1bGxldCk7XG4gICAgfSBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob290QnVsbGV0KHgsIHkpIHtcbiAgICBidWxsZXRzLmZvckVhY2goYnVsbGV0ID0+IHtcbiAgICAgICAgYnVsbGV0LmJvdHRvbSAtPSAzO1xuICAgICAgICBsZXQgdmlzdWFsID0gYnVsbGV0LnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGJ1bGxldC5ib3R0b20gKyAncHgnO1xuICAgICAgICBlbmVteXMuZm9yRWFjaCgoZW5lbXkpID0+IHsgY29sbGlzaW9uRGV0ZWN0KGVuZW15LCBidWxsZXQuYm90dG9tLCBidWxsZXQubGVmdCkgfSlcbiAgICAgICAgaWYgKGJ1bGxldC5ib3R0b20gPj0gNzUwKSB7XG4gICAgICAgICAgICBsZXQgZmlyc3RCdWxsZXQgPSBidWxsZXRzWzBdLnZpc3VhbDtcbiAgICAgICAgICAgIGZpcnN0QnVsbGV0LnJlbW92ZSgpO1xuICAgICAgICAgICAgYnVsbGV0cy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0KGVuZW15LCBib3R0b20sIGxlZnQpIHtcbiAgICBpZiAoKGJvdHRvbSA+PSBlbmVteS5ib3R0b20pICYmIChib3R0b20gPD0gKGVuZW15LmJvdHRvbSArIDE5KSkgJiZcbiAgICAoKGxlZnQgKyA0MCkgPj0gZW5lbXkubGVmdCkgJiYgKGxlZnQgPD0gKGVuZW15LmxlZnQgKyAxMDApKSlcbiAgICB7XG4gICAgICAgIGtpbGxFbmVteShlbmVteSlcbiAgICAgICAgY29uc29sZS5sb2coXCJoaXRcIilcbiAgICB9XG4gICAgXG59XG4gXG4iLCJsZXQgbXV0ZWQgPSB0cnVlO1xubGV0IHNvbmdSdW5uaW5nID0gZmFsc2U7XG5cbi8vIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnVcIilcbi8vIGNvbnNvbGUubG9nKG1lbnUpXG4vLyBjb25zdCBtZW51TGlzdCA9IG1lbnUucXVlcnlTZWxlY3RvcihcIi5tZW51LWxpc3RcIilcblxuXG4vLyBJbXBvcnRpbmcgYmFja2dyb3VuZCBtdXNpY1xuXG5sZXQgYmFja2dyb3VuZE11c2ljT25lICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvQSBMb25lbHkgQ2hlcnJ5IFRyZWUg8J+MuC5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljVHdvICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvSGVsbG8sIGl0J3MgTWUhLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNUaHJlZSA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9NZWxhbmNob2xpYyBXYWxrLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNGb3VyICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9ObyBEZXN0aW5hdGlvbi5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRml2ZSAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvUmVhZHkgUGl4ZWwgT25lLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNTaXggICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9SdW4gQXMgRmFzdCBBcyBZb3UgQ2FuLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNTZXZlbiA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9UaGUgc2VhcmNoLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNFaWdodCA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9XZWxjb21lIFNwYWNlIFRyYXZlbGVyLm1wM1wiKTtcblxubGV0IGJhY2tncm91bmRNdXNpYyA9IFtiYWNrZ3JvdW5kTXVzaWNPbmUsIGJhY2tncm91bmRNdXNpY1R3bywgYmFja2dyb3VuZE11c2ljVGhyZWUsIGJhY2tncm91bmRNdXNpY0ZvdXIsXG4gICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRNdXNpY0ZpdmUsIGJhY2tncm91bmRNdXNpY1NpeCwgYmFja2dyb3VuZE11c2ljU2V2ZW4sIGJhY2tncm91bmRNdXNpY0VpZ2h0XTtcblxuLy8gSW1wb3J0aW5nIHNsaW1lIHNvdW5kc1xubGV0IHNsaW1lU291bmRPbmUgICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8wLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kVHdvICAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMS5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFRocmVlICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzIubXAzXCIpO1xubGV0IHNsaW1lU291bmRGb3VyICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8zLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kRml2ZSAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMC5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFNpeCAgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzEubXAzXCIpO1xubGV0IHNsaW1lU291bmRTZXZlbiAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8yLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kRWlnaHQgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMy5tcDNcIik7XG5cbi8vIEFkanVzdGluZyBzbGltZSBzb3VuZCB2b2x1bWVzXG5sZXQgc2xpbWVWb2x1bWUgPSAwLjA1O1xuc2xpbWVTb3VuZE9uZS52b2x1bWUgICAgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRUd28udm9sdW1lICAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kVGhyZWUudm9sdW1lICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZEZvdXIudm9sdW1lICAgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRGaXZlLnZvbHVtZSAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kU2l4LnZvbHVtZSAgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFNldmVuLnZvbHVtZSAgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRFaWdodC52b2x1bWUgID0gc2xpbWVWb2x1bWU7XG5cbi8vIFB1c2hpbmcgc2xpbWUgc291bmRzIGludG8gYW4gYXJyYXlcbmxldCBzbGltZVNvdW5kcyA9IFtzbGltZVNvdW5kT25lLCBzbGltZVNvdW5kVHdvLCBzbGltZVNvdW5kVGhyZWUsIHNsaW1lU291bmRGb3VyLCBzbGltZVNvdW5kRm91cixcbiAgICBzbGltZVNvdW5kRml2ZSwgc2xpbWVTb3VuZFNpeCwgc2xpbWVTb3VuZFNldmVuLCBzbGltZVNvdW5kRWlnaHRdO1xuXG4vLyBsZXQgYmFja2dyb3VuZE11c2ljVm9sdW1lID0gMTtcblxuLy8gYmFja2dyb3VuZE11c2ljT25lLnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gYmFja2dyb3VuZE11c2ljVHdvIC52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gYmFja2dyb3VuZE11c2ljVGhyZWUudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gYmFja2dyb3VuZE11c2ljRm91ci52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gYmFja2dyb3VuZE11c2ljRml2ZS52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gYmFja2dyb3VuZE11c2ljU2l4LnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gYmFja2dyb3VuZE11c2ljU2V2ZW4udm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuLy8gYmFja2dyb3VuZE11c2ljRWlnaHQudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuXG5cblxuLy8gUmV0dXJuaW5nIHJhbmRvbSBzbGltZSBzb3VuZCB3aGVuIGNhbGxlZFxuXG5mdW5jdGlvbiBzYW1wbGUoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vciAoIE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGggKV1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11c2ljXCIpO1xuXG5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGN1cnJlbnRTb25nID0gc2FtcGxlKGJhY2tncm91bmRNdXNpYylcbiAgICBiYWNrZ3JvdW5kTXVzaWNQbGF5KGN1cnJlbnRTb25nKVxuICAgIGN1cnJlbnRTb25nLnZvbHVtZSA9IHRoaXMudmFsdWUgLyAxMDA7XG4gICAgY29uc29sZS5sb2codGhpcy52YWx1ZSAvIDEwMClcbiAgICB9KVxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lU291bmRQbGF5KCkge1xuICAgIGlmICghbXV0ZWQpIHNhbXBsZShzbGltZVNvdW5kcykucGxheSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFja2dyb3VuZE11c2ljUGxheShjdXJyZW50U29uZykge1xuICAgIGlmICghc29uZ1J1bm5pbmcpIHtcbiAgICAgICAgc29uZ1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICBpZiAoIW11dGVkKSB7XG4gICAgICAgICAgICBjdXJyZW50U29uZy5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3N0YXJ0LCBwYXVzZUdhbWV9IGZyb20gXCIuL3NjcmlwdHMvZ2FtZS5qc1wiXG5cbmNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIHN0YXJ0KGdyaWQpO1xuICAgIHBhdXNlR2FtZSgpO1xufSlcbiJdLCJuYW1lcyI6WyJnYW1lT3ZlciIsImdhbWVQYXVzZWQiLCJlbmVteUNvdW50IiwiZW5lbXlzIiwiRW5lbXkiLCJncmlkIiwibmV3RW5lbXlCb3R0b20iLCJib3R0b20iLCJsZWZ0IiwiTWF0aCIsInJhbmRvbSIsInZpc3VhbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVFbmVteXMiLCJxdWVyeVNlbGVjdG9yIiwiaSIsImVuZW15R2FwIiwibmV3RW5lbXkiLCJwdXNoIiwibW92ZUVuZW15cyIsImZvckVhY2giLCJlbmVteSIsInVwZGF0ZUVuZW15cyIsImZpcnN0RW5lbXkiLCJyZW1vdmUiLCJzaGlmdCIsImtpbGxFbmVteSIsImNyZWF0ZVBsYXllciIsInNsaW1lSnVtcCIsInBsYXllck1vdmVtZW50cyIsInN0b3BQbGF5ZXJNb3ZlbWVudHMiLCJ1cFRpbWVySWQiLCJkb3duVGltZXJJZCIsImxlZnRUaW1lcklkIiwicmlnaHRUaW1lcklkIiwiY3JlYXRlUGxhdGZvcm1zIiwibW92ZVBsYXRmb3JtcyIsInNjb3JlIiwicGxheWVyU2hvb3QiLCJzaG9vdEJ1bGxldCIsInNvZnRQYXVzZWQiLCJzdGFydCIsInNldEludGVydmFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBsYXllclBhdXNlR2FtZSIsInJlc3RhcnQiLCJldmVudCIsIm1lbnUiLCJrZXlDb2RlIiwiZGlzcGxheSIsInBhdXNlR2FtZSIsImVuZEdhbWUiLCJjbGVhckludGVydmFsIiwiZW5kaW5nT25lVGV4dCIsImVuZGluZ1R3b1RleHQiLCJlbmRpbmdUaHJlZVRleHQiLCJvZ1Njb3JlIiwiaW5uZXJIVE1MIiwibG9jYXRpb24iLCJyZWxvYWQiLCJpc0p1bXBpbmciLCJpc0ZhbGxpbmciLCJwbGF0Zm9ybUNvdW50IiwicGxhdGZvcm1zIiwiUGxhdGZvcm0iLCJuZXdQbGF0Qm90dG9tIiwicGxhdGZvcm1HYXAiLCJuZXdQbGF0Zm9ybSIsInBsYXRmb3JtIiwidXBkYXRlUGxhdGZvcm1zIiwic2NvcmVUZXh0IiwidGl0bGVUZXh0IiwibW92ZW1lbnRUZXh0Iiwic2hvb3RUZXh0IiwiZmlyc3RQbGF0Zm9ybSIsImNvbnNvbGUiLCJsb2ciLCJzbGltZVNvdW5kUGxheSIsInNsaW1lIiwiaXNHb2luZ0xlZnQiLCJpc0dvaW5nUmlnaHQiLCJzbGltZUxlZnRTcGFjZSIsInN0YXJ0UG9pbnQiLCJzbGltZUJvdHRvbVNwYWNlIiwic2xpbWVGYWxsIiwiY29sbGlzaW9uRGV0ZWN0IiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJidWxsZXRzIiwiQnVsbGV0IiwibmV3QnVsbGV0IiwiY2xpZW50WCIsImNsaWVudFkiLCJ4IiwieSIsImJ1bGxldCIsImZpcnN0QnVsbGV0IiwibXV0ZWQiLCJzb25nUnVubmluZyIsImJhY2tncm91bmRNdXNpY09uZSIsIkF1ZGlvIiwiYmFja2dyb3VuZE11c2ljVHdvIiwiYmFja2dyb3VuZE11c2ljVGhyZWUiLCJiYWNrZ3JvdW5kTXVzaWNGb3VyIiwiYmFja2dyb3VuZE11c2ljRml2ZSIsImJhY2tncm91bmRNdXNpY1NpeCIsImJhY2tncm91bmRNdXNpY1NldmVuIiwiYmFja2dyb3VuZE11c2ljRWlnaHQiLCJiYWNrZ3JvdW5kTXVzaWMiLCJzbGltZVNvdW5kT25lIiwic2xpbWVTb3VuZFR3byIsInNsaW1lU291bmRUaHJlZSIsInNsaW1lU291bmRGb3VyIiwic2xpbWVTb3VuZEZpdmUiLCJzbGltZVNvdW5kU2l4Iiwic2xpbWVTb3VuZFNldmVuIiwic2xpbWVTb3VuZEVpZ2h0Iiwic2xpbWVWb2x1bWUiLCJ2b2x1bWUiLCJzbGltZVNvdW5kcyIsInNhbXBsZSIsImFycmF5IiwiZmxvb3IiLCJsZW5ndGgiLCJzbGlkZXIiLCJnZXRFbGVtZW50QnlJZCIsImN1cnJlbnRTb25nIiwiYmFja2dyb3VuZE11c2ljUGxheSIsInZhbHVlIiwicGxheSJdLCJzb3VyY2VSb290IjoiIn0=