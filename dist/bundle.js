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
  endingTwoText.innerHTML = "push R to try again";
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



var platformCount = 5;
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
    var platformGap = 750 / platformCount;
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

      var newPlatform = new Platform(grid, 750);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRU0sU0FBU0YsbUJBQVQsQ0FBNkJELFdBQTdCLEVBQTBDO0FBQzdDLE1BQUksQ0FBQzVCLFdBQUwsRUFBa0I7QUFDZEEsSUFBQUEsV0FBVyxHQUFHLElBQWQ7O0FBQ0EsUUFBSSxDQUFDRCxLQUFMLEVBQVk7QUFDUjZCLE1BQUFBLFdBQVcsQ0FBQ0csSUFBWjtBQUNIO0FBQ0o7QUFFSjs7Ozs7O1VDekZEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBRUEsSUFBTWpJLElBQUksR0FBR08sUUFBUSxDQUFDTyxhQUFULENBQXVCLE9BQXZCLENBQWI7QUFFQVAsUUFBUSxDQUFDb0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaERGLEVBQUFBLHVEQUFLLENBQUN6QyxJQUFELENBQUw7QUFDQWtELEVBQUFBLDJEQUFTO0FBQ1osQ0FIRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZW5lbXkuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF0Zm9ybS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyU2hvb3QuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvc291bmQuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2FtZU92ZXIsIGdhbWVQYXVzZWR9IGZyb20gXCIuL2dhbWUuanNcIlxuXG5sZXQgZW5lbXlDb3VudCAgICA9IDI7XG5cbmV4cG9ydCBsZXQgZW5lbXlzID0gW107XG5cblxuLy8gU2V0cyBlbmVteSBwcm9wZXJ0aWVzXG5cbmNsYXNzIEVuZW15IHtcbiAgICBjb25zdHJ1Y3RvcihncmlkLCBuZXdFbmVteUJvdHRvbSkge1xuICAgICAgICB0aGlzLmJvdHRvbSA9IG5ld0VuZW15Qm90dG9tO1xuICAgICAgICB0aGlzLmxlZnQgPSBNYXRoLnJhbmRvbSgpICogNDUwO1xuICAgICAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2VuZW15Jyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gdGhpcy5sZWZ0ICsgJ3B4JztcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICAgICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuLy8gQ3JlYXRlcyBlbmVteXMgYW5kIHB1c2hlcyB0byBlbmVteSBhcnJheVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRW5lbXlzKCkge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXlDb3VudDsgaSsrKSB7XG4gICAgICAgIGxldCBlbmVteUdhcCA9IC02MDAgLyBlbmVteUNvdW50O1xuICAgICAgICBsZXQgbmV3RW5lbXlCb3R0b20gPSAtMTIwICsgaSAqIGVuZW15R2FwO1xuICAgICAgICBsZXQgbmV3RW5lbXkgPSBuZXcgRW5lbXkoZ3JpZCwgbmV3RW5lbXlCb3R0b20pO1xuICAgICAgICBlbmVteXMucHVzaChuZXdFbmVteSlcbiAgICB9XG59XG5cbi8vIE1vdmVzIGVuZW15cyBieSBzdWJzdHJhY3RpbmcsIG9yIGFkZGluZyB0byB0aGUgZW5lbXkncyBib3R0b20gcHJvcGVydHlcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVFbmVteXMoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgICAgICBlbmVteXMuZm9yRWFjaChlbmVteSA9PiB7XG4gICAgICAgICAgICBlbmVteS5ib3R0b20gKz0gLjU1O1xuICAgICAgICAgICAgbGV0IHZpc3VhbCA9IGVuZW15LnZpc3VhbDtcbiAgICAgICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBlbmVteS5ib3R0b20gKyAncHgnO1xuICAgICAgICAgICAgdXBkYXRlRW5lbXlzKGVuZW15LCBncmlkKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbi8vIFJlbW92ZXMgb2xkIGVuZW15cyBhbmQgY3JlYXRlcyBuZXcgZW5lbXlzIHRoYXQgYXJlIHRoZW4gcHVzaGVkIHRvIGVuZW15IGFycmF5XG5cbmZ1bmN0aW9uIHVwZGF0ZUVuZW15cyhlbmVteSwgZ3JpZCkge1xuICAgIGlmICghZ2FtZU92ZXIpIHsgXG4gICAgICAgIGlmIChlbmVteS5ib3R0b20gPj0gODIwKSB7XG4gICAgICAgICAgICBsZXQgZmlyc3RFbmVteSA9IGVuZW15c1swXS52aXN1YWw7XG4gICAgICAgICAgICBmaXJzdEVuZW15LnJlbW92ZSgpO1xuICAgICAgICAgICAgZW5lbXlzLnNoaWZ0KCk7XG4gICAgICAgICAgICBsZXQgbmV3RW5lbXkgPSBuZXcgRW5lbXkoZ3JpZCwgLTUwKVxuICAgICAgICAgICAgZW5lbXlzLnB1c2gobmV3RW5lbXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ga2lsbEVuZW15KGVuZW15KSB7XG4gICAgZW5lbXkubGVmdCA9IDIwMDtcbn1cbiIsIi8vIEFkZCBzdGFydCBtZW51XG4vLyBBZGQgcGF1c2UgbWVudVxuLy8gQWRkIGRlYXRoIHNjcmVlblxuLy8gQk9OVVM6IGFkZCBlbmVteSwgYWRkIHN0YWdlc1xuXG5pbXBvcnQge2NyZWF0ZVBsYXllciwgc2xpbWVKdW1wLCBwbGF5ZXJNb3ZlbWVudHMsIHN0b3BQbGF5ZXJNb3ZlbWVudHMsXG4gICAgICAgIHVwVGltZXJJZCwgZG93blRpbWVySWQsIGxlZnRUaW1lcklkLCByaWdodFRpbWVySWR9IGZyb20gXCIuL3BsYXllci5qc1wiXG5pbXBvcnQge2NyZWF0ZVBsYXRmb3JtcywgbW92ZVBsYXRmb3Jtcywgc2NvcmV9IGZyb20gXCIuL3BsYXRmb3JtLmpzXCJcbmltcG9ydCB7cGxheWVyU2hvb3QsIHNob290QnVsbGV0fSBmcm9tIFwiLi9wbGF5ZXJTaG9vdC5qc1wiXG5pbXBvcnQge2NyZWF0ZUVuZW15cywgbW92ZUVuZW15c30gZnJvbSBcIi4vZW5lbXkuanNcIlxuXG5leHBvcnQgbGV0IGdhbWVPdmVyICAgPSBmYWxzZTtcbmV4cG9ydCBsZXQgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuZXhwb3J0IGxldCBzb2Z0UGF1c2VkID0gZmFsc2U7XG5cbi8vIEluIGNoYXJnZSBvZiBzdGFydGluZyB0aGUgZ2FtZSwgY2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBuZWVkZWQgZm9yIGJ1aWxkaW5nIGFuZCByZW5kZXJpbmcuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydChncmlkKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNyZWF0ZVBsYXRmb3JtcygpO1xuICAgICAgICBjcmVhdGVFbmVteXMoKVxuICAgICAgICBjcmVhdGVQbGF5ZXIoKVxuICAgICAgICBzZXRJbnRlcnZhbChtb3ZlUGxhdGZvcm1zLCAxKTtcbiAgICAgICAgc2V0SW50ZXJ2YWwobW92ZUVuZW15cywgMSk7XG4gICAgICAgIHNldEludGVydmFsKHNob290QnVsbGV0LCAxKTtcbiAgICAgICAgc2xpbWVKdW1wKCk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllclNob290KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyTW92ZW1lbnRzKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyUGF1c2VHYW1lKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcmVzdGFydClcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzdG9wUGxheWVyTW92ZW1lbnRzKVxuICAgIH1cbn1cblxuLy8gUGF1c2VzIGdhbWUgYnkgc2V0dGluZyBleHBvcnRlZCB2YXJpYWJsZSB0byBkZXNpcmVkIGdhbWUgc3RhdGVcblxuZnVuY3Rpb24gcGxheWVyUGF1c2VHYW1lKGV2ZW50KSB7XG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG5cbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgJiYgIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgZ2FtZVBhdXNlZCA9IHRydWU7XG4gICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9IFxuICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyICYmIGdhbWVQYXVzZWQpIHtcbiAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGdhbWVQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgc29mdFBhdXNlZCA9IGZhbHNlO1xuICAgIH0gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXVzZUdhbWUoKSB7XG4gICAgZ2FtZVBhdXNlZCA9IHRydWU7XG4gICAgc29mdFBhdXNlZCA9IHRydWU7XG59XG5cbi8vIEVuZHMgZ2FtZSBieSBjbGVhcmluZyB0aGUgZ3JpZCBhbmQgVGltZXJJZHNcblxuZXhwb3J0IGZ1bmN0aW9uIGVuZEdhbWUoKSB7IFxuICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICBjbGVhckludGVydmFsKHVwVGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgIGNvbnN0IGVuZGluZ09uZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lRW5kaW5nJyk7XG4gICAgY29uc3QgZW5kaW5nVHdvVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50d29FbmRpbmcnKTtcbiAgICBjb25zdCBlbmRpbmdUaHJlZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWxTY29yZScpO1xuICAgIGNvbnN0IG9nU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcbiAgICBvZ1Njb3JlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZW5kaW5nT25lVGV4dC5pbm5lckhUTUwgPSBcIml0IHdhc24ndCBlbm91Z2hcIjtcbiAgICBlbmRpbmdUd29UZXh0LmlubmVySFRNTCA9IFwicHVzaCBSIHRvIHRyeSBhZ2FpblwiO1xuICAgIGVuZGluZ1RocmVlVGV4dC5pbm5lckhUTUwgPSBgZmluYWwgc2NvcmU6ICR7c2NvcmV9YDtcbn1cblxuLy8gUmVzdGFydHMgZ2FtZSB2aWEgcmVsb2FkaW5nIHBhZ2VcblxuZnVuY3Rpb24gcmVzdGFydChldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA4Mikge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgIH1cbn1cblxuXG4iLCJpbXBvcnQge2dhbWVPdmVyLCBnYW1lUGF1c2VkLCBzb2Z0UGF1c2VkfSBmcm9tIFwiLi9nYW1lLmpzXCJcbmltcG9ydCB7aXNKdW1waW5nLCBpc0ZhbGxpbmd9IGZyb20gXCIuL3BsYXllci5qc1wiXG5cbmxldCBwbGF0Zm9ybUNvdW50ICAgID0gNTtcblxuZXhwb3J0IGxldCBzY29yZSAgICAgPSAxO1xuZXhwb3J0IGxldCBwbGF0Zm9ybXMgPSBbXTtcblxuLy8gU2V0cyBQbGF0Zm9ybSBwcm9wZXJ0aWVzXG5cbmNsYXNzIFBsYXRmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gbmV3UGxhdEJvdHRvbTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gTWF0aC5yYW5kb20oKSAqIDQ1MDtcbiAgICAgICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdwbGF0Zm9ybScpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSB0aGlzLmJvdHRvbSArICdweCc7XG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgICB9XG59XG5cbi8vIENyZWF0ZXMgcGxhdGZvcm1zIGFuZCBwdXNoZXMgdG8gcGxhdGZvcm0gYXJyYXlcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXRmb3JtcygpIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXRmb3JtQ291bnQ7IGkrKykge1xuICAgICAgICBsZXQgcGxhdGZvcm1HYXAgPSA3NTAgLyBwbGF0Zm9ybUNvdW50O1xuICAgICAgICBsZXQgbmV3UGxhdEJvdHRvbSA9IDEwMCArIGkgKiBwbGF0Zm9ybUdhcDtcbiAgICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIG5ld1BsYXRCb3R0b20pO1xuICAgICAgICBwbGF0Zm9ybXMucHVzaChuZXdQbGF0Zm9ybSlcbiAgICB9XG59XG5cbi8vIE1vdmVzIFBsYXRmb3JtcyBieSBzdWJzdHJhY3RpbmcsIG9yIGFkZGluZyB0byB0aGUgUGxhdGZvcm0ncyBib3R0b20gcHJvcGVydHlcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVQbGF0Zm9ybXMoKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgaWYgKCFnYW1lUGF1c2VkIHx8IHNvZnRQYXVzZWQpIHtcbiAgICAgICAgcGxhdGZvcm1zLmZvckVhY2gocGxhdGZvcm0gPT4ge1xuICAgICAgICAgICAgaWYgKGlzSnVtcGluZykge1xuICAgICAgICAgICAgICAgIGlmIChzb2Z0UGF1c2VkKSB7IFxuICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybS5ib3R0b20gLT0gMS41O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAzLjU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRmFsbGluZykge1xuICAgICAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHZpc3VhbCA9IHBsYXRmb3JtLnZpc3VhbDtcbiAgICAgICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuICAgICAgICAgICAgdXBkYXRlUGxhdGZvcm1zKHBsYXRmb3JtLCBncmlkKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbi8vIFJlbW92ZXMgb2xkIHBsYXRmb3JtcyBhbmQgY3JlYXRlcyBuZXcgcGxhdGZvcm1zIHRoYXQgYXJlIHRoZW4gcHVzaGVkIHRvIHBsYXRmb3JtIGFycmF5XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsYXRmb3JtcyhwbGF0Zm9ybSwgZ3JpZCkge1xuICAgIGlmICghZ2FtZU92ZXIpIHsgXG4gICAgICAgIGlmIChwbGF0Zm9ybS5ib3R0b20gPD0gLTUwKSB7XG4gICAgICAgICAgICBjb25zdCBzY29yZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRsZScpO1xuICAgICAgICAgICAgY29uc3QgbW92ZW1lbnRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVtZW50Jyk7XG4gICAgICAgICAgICBjb25zdCBzaG9vdFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hvb3QnKTtcbiAgICAgICAgICAgIGxldCBmaXJzdFBsYXRmb3JtID0gcGxhdGZvcm1zWzBdLnZpc3VhbDtcbiAgICAgICAgICAgIGZpcnN0UGxhdGZvcm0ucmVtb3ZlKCk7XG4gICAgICAgICAgICBwbGF0Zm9ybXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghc29mdFBhdXNlZCApIHtcbiAgICAgICAgICAgICAgICBzY29yZSArPSAxO1xuICAgICAgICAgICAgICAgIHNjb3JlVGV4dC5pbm5lckhUTUwgPSBzY29yZTtcbiAgICAgICAgICAgICAgICB0aXRsZVRleHQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICBtb3ZlbWVudFRleHQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICBzaG9vdFRleHQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCA3NTApXG4gICAgICAgICAgICBwbGF0Zm9ybXMucHVzaChuZXdQbGF0Zm9ybSlcblxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtlbmRHYW1lLCBnYW1lUGF1c2VkfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQge3BsYXRmb3Jtc30gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtzbGltZVNvdW5kUGxheX0gZnJvbSBcIi4vc291bmQuanNcIlxuXG5jb25zdCBzbGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbmxldCBpc0dvaW5nTGVmdCAgICAgICAgICAgICA9IGZhbHNlO1xubGV0IGlzR29pbmdSaWdodCAgICAgICAgICAgID0gZmFsc2U7XG5cbmV4cG9ydCBsZXQgaXNKdW1waW5nICAgICAgICA9IGZhbHNlO1xuZXhwb3J0IGxldCBpc0ZhbGxpbmcgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc2xpbWVMZWZ0U3BhY2UgICA9IDI4MDtcbmV4cG9ydCBsZXQgZ2FtZU92ZXIgICAgICAgICA9IGZhbHNlO1xuZXhwb3J0IGxldCBzdGFydFBvaW50ICAgICAgID0gMjAwO1xuZXhwb3J0IGxldCBzbGltZUJvdHRvbVNwYWNlID0gc3RhcnRQb2ludDtcbmV4cG9ydCBsZXQgbGVmdFRpbWVySWQ7XG5leHBvcnQgbGV0IHJpZ2h0VGltZXJJZDtcbmV4cG9ydCBsZXQgdXBUaW1lcklkO1xuZXhwb3J0IGxldCBkb3duVGltZXJJZDtcblxuLy8gQ3JlYXRlICdTbGltZScgYW5kIGFkZCB0byB0aGUgZ3JpZC5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHNsaW1lKTtcbiAgICBzbGltZS5jbGFzc0xpc3QuYWRkKCdzbGltZScpO1xuICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG59XG5cbi8vIEluIGNoYXJnZSBvZiBhZGRpbmcgdG8gdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgc2xpbWVGYWxsKClcblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lSnVtcCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZClcbiAgICAgICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgaXNGYWxsaW5nID0gZmFsc2U7XG4gICAgICAgIHVwVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVCb3R0b21TcGFjZSArPSAxO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDEwMCkgc2xpbWVGYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBJbiBjaGFyZ2Ugb2Ygc3VidHJhY3RpbmcgdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgZW5kR2FtZSgpXG5cbmZ1bmN0aW9uIHNsaW1lRmFsbCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpXG4gICAgICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgICAgICBpc0ZhbGxpbmcgPSB0cnVlO1xuICAgICAgICBkb3duVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVCb3R0b21TcGFjZSAtPSAyO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlIDw9IC0yMDAgKSBlbmRHYW1lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykpOyBcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7IGNvbGxpc2lvbkRldGVjdChwbGF0Zm9ybSk7fSApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBDaGVja3MgdGhlIHZhbHVlIG9mIHRoZSBib3R0b20gb2YgdGhlIHBsYXllciwgaWYgc2FpZCB2YWx1ZSByZXR1cm5zIHRydWUgaXQgY2FsbHMgc2xpbWVKdW1wKClcblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0KHBsYXRmb3JtKSB7XG4gICAgaWYgKChzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSkgJiYgKHNsaW1lQm90dG9tU3BhY2UgPD0gKHBsYXRmb3JtLmJvdHRvbSArIDE5KSkgJiZcbiAgICAoKHNsaW1lTGVmdFNwYWNlICsgNDApID49IHBsYXRmb3JtLmxlZnQpICYmIChzbGltZUxlZnRTcGFjZSA8PSAocGxhdGZvcm0ubGVmdCArIDEwMCkpICYmXG4gICAgIWlzSnVtcGluZykge1xuICAgICAgICBzdGFydFBvaW50ID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgc2xpbWVTb3VuZFBsYXkoKTtcbiAgICAgICAgc2xpbWVKdW1wKCk7XG4gICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgfVxufVxuXG4vLyBDYWxscyBtb3ZlTGVmdCgpIG9yIG1vdmVSaWdodCBkZXBlbmRpbmcgb24gcGxheWVyIGlucHV0LiAqVXNlcyBrZXlkb3duKlxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkgbW92ZUxlZnQoKTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSBtb3ZlUmlnaHQoKTtcbiAgICAgICAgXG4gICAgfVxufVxuXG4vLyBDZWFzZXMgcGxheWVyIG1vdmVtZW50IGRlcGVuZGluZyBvbiBrZXkgcmVsZWFzZS4gKlVzZXMga2V5dXAqXG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wUGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSB7XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSB7XG4gICAgICAgIGlzR29pbmdSaWdodCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICB9XG59XG5cbi8vIERlY3JlbWVudHMgcGxheWVyJ3MgWCB2YWx1ZVxuXG5mdW5jdGlvbiBtb3ZlTGVmdCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gdHJ1ZVxuICAgICAgICBsZWZ0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAtNjApIHtcbiAgICAgICAgICAgIHNsaW1lTGVmdFNwYWNlIC09IDI7XG4gICAgICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnXG4gICAgICAgICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSA2MDA7XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBJbmNyZW1lbnRzIHBsYXllcidzIFggdmFsdWVcblxuZnVuY3Rpb24gbW92ZVJpZ2h0KCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICAgICAgaWYgKGlzR29pbmdMZWZ0KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgICAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlzR29pbmdSaWdodCA9IHRydWVcbiAgICAgICAgcmlnaHRUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNsaW1lTGVmdFNwYWNlIDw9IDYxMCkge1xuICAgICAgICAgICAgICAgIHNsaW1lTGVmdFNwYWNlICs9IDI7XG4gICAgICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgICAgfSBlbHNlIHNsaW1lTGVmdFNwYWNlID0gLTYwO1xuICAgICAgICB9LCAxKVxuICAgIH1cbn1cblxuIiwiaW1wb3J0IHtzbGltZUxlZnRTcGFjZSwgc2xpbWVCb3R0b21TcGFjZX0gZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5pbXBvcnQge2VuZW15cywga2lsbEVuZW15fSBmcm9tIFwiLi9lbmVteS5qc1wiXG5cbmV4cG9ydCBsZXQgYnVsbGV0cyA9IFtdO1xuXG5jbGFzcyBCdWxsZXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgIHRoaXMubGVmdCA9IHNsaW1lTGVmdFNwYWNlO1xuICAgICAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2J1bGxldCcpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgMTIgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArIDEyICsgJ3B4JztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKS5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclNob290KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHNob290QnVsbGV0KCk7XG4gICAgICAgIGxldCBuZXdCdWxsZXQgPSBuZXcgQnVsbGV0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyksIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICBidWxsZXRzLnB1c2gobmV3QnVsbGV0KTtcbiAgICB9IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvb3RCdWxsZXQoeCwgeSkge1xuICAgIGJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4ge1xuICAgICAgICBidWxsZXQuYm90dG9tIC09IDM7XG4gICAgICAgIGxldCB2aXN1YWwgPSBidWxsZXQudmlzdWFsO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gYnVsbGV0LmJvdHRvbSArICdweCc7XG4gICAgICAgIGVuZW15cy5mb3JFYWNoKChlbmVteSkgPT4geyBjb2xsaXNpb25EZXRlY3QoZW5lbXksIGJ1bGxldC5ib3R0b20sIGJ1bGxldC5sZWZ0KSB9KVxuICAgICAgICBpZiAoYnVsbGV0LmJvdHRvbSA+PSA3NTApIHtcbiAgICAgICAgICAgIGxldCBmaXJzdEJ1bGxldCA9IGJ1bGxldHNbMF0udmlzdWFsO1xuICAgICAgICAgICAgZmlyc3RCdWxsZXQucmVtb3ZlKCk7XG4gICAgICAgICAgICBidWxsZXRzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjb2xsaXNpb25EZXRlY3QoZW5lbXksIGJvdHRvbSwgbGVmdCkge1xuICAgIGlmICgoYm90dG9tID49IGVuZW15LmJvdHRvbSkgJiYgKGJvdHRvbSA8PSAoZW5lbXkuYm90dG9tICsgMTkpKSAmJlxuICAgICgobGVmdCArIDQwKSA+PSBlbmVteS5sZWZ0KSAmJiAobGVmdCA8PSAoZW5lbXkubGVmdCArIDEwMCkpKVxuICAgIHtcbiAgICAgICAga2lsbEVuZW15KGVuZW15KVxuICAgICAgICBjb25zb2xlLmxvZyhcImhpdFwiKVxuICAgIH1cbiAgICBcbn1cbiBcbiIsImxldCBtdXRlZCA9IHRydWU7XG5sZXQgc29uZ1J1bm5pbmcgPSBmYWxzZTtcblxuLy8gY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudVwiKVxuLy8gY29uc29sZS5sb2cobWVudSlcbi8vIGNvbnN0IG1lbnVMaXN0ID0gbWVudS5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtbGlzdFwiKVxuXG5cbi8vIEltcG9ydGluZyBiYWNrZ3JvdW5kIG11c2ljXG5cbmxldCBiYWNrZ3JvdW5kTXVzaWNPbmUgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9BIExvbmVseSBDaGVycnkgVHJlZSDwn4y4Lm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNUd28gICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9IZWxsbywgaXQncyBNZSEubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1RocmVlID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL01lbGFuY2hvbGljIFdhbGsubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY0ZvdXIgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL05vIERlc3RpbmF0aW9uLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNGaXZlICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9SZWFkeSBQaXhlbCBPbmUubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1NpeCAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1J1biBBcyBGYXN0IEFzIFlvdSBDYW4ubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1NldmVuID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1RoZSBzZWFyY2gubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY0VpZ2h0ID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1dlbGNvbWUgU3BhY2UgVHJhdmVsZXIubXAzXCIpO1xuXG5sZXQgYmFja2dyb3VuZE11c2ljID0gW2JhY2tncm91bmRNdXNpY09uZSwgYmFja2dyb3VuZE11c2ljVHdvLCBiYWNrZ3JvdW5kTXVzaWNUaHJlZSwgYmFja2dyb3VuZE11c2ljRm91cixcbiAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZE11c2ljRml2ZSwgYmFja2dyb3VuZE11c2ljU2l4LCBiYWNrZ3JvdW5kTXVzaWNTZXZlbiwgYmFja2dyb3VuZE11c2ljRWlnaHRdO1xuXG4vLyBJbXBvcnRpbmcgc2xpbWUgc291bmRzXG5sZXQgc2xpbWVTb3VuZE9uZSAgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzAubXAzXCIpO1xubGV0IHNsaW1lU291bmRUd28gICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8xLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kVGhyZWUgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMi5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZEZvdXIgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzMubXAzXCIpO1xubGV0IHNsaW1lU291bmRGaXZlICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8wLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kU2l4ICAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMS5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFNldmVuICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzIubXAzXCIpO1xubGV0IHNsaW1lU291bmRFaWdodCAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8zLm1wM1wiKTtcblxuLy8gQWRqdXN0aW5nIHNsaW1lIHNvdW5kIHZvbHVtZXNcbmxldCBzbGltZVZvbHVtZSA9IDAuMDU7XG5zbGltZVNvdW5kT25lLnZvbHVtZSAgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFR3by52b2x1bWUgICAgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRUaHJlZS52b2x1bWUgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kRm91ci52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZEZpdmUudm9sdW1lICAgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRTaXgudm9sdW1lICAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kU2V2ZW4udm9sdW1lICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZEVpZ2h0LnZvbHVtZSAgPSBzbGltZVZvbHVtZTtcblxuLy8gUHVzaGluZyBzbGltZSBzb3VuZHMgaW50byBhbiBhcnJheVxubGV0IHNsaW1lU291bmRzID0gW3NsaW1lU291bmRPbmUsIHNsaW1lU291bmRUd28sIHNsaW1lU291bmRUaHJlZSwgc2xpbWVTb3VuZEZvdXIsIHNsaW1lU291bmRGb3VyLFxuICAgIHNsaW1lU291bmRGaXZlLCBzbGltZVNvdW5kU2l4LCBzbGltZVNvdW5kU2V2ZW4sIHNsaW1lU291bmRFaWdodF07XG5cbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNWb2x1bWUgPSAxO1xuXG4vLyBiYWNrZ3JvdW5kTXVzaWNPbmUudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNUd28gLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNUaHJlZS52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNGb3VyLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNGaXZlLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNTaXgudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNTZXZlbi52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNFaWdodC52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5cblxuXG4vLyBSZXR1cm5pbmcgcmFuZG9tIHNsaW1lIHNvdW5kIHdoZW4gY2FsbGVkXG5cbmZ1bmN0aW9uIHNhbXBsZShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yICggTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCApXVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVzaWNcIik7XG5cbnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgY3VycmVudFNvbmcgPSBzYW1wbGUoYmFja2dyb3VuZE11c2ljKVxuICAgIGJhY2tncm91bmRNdXNpY1BsYXkoY3VycmVudFNvbmcpXG4gICAgY3VycmVudFNvbmcudm9sdW1lID0gdGhpcy52YWx1ZSAvIDEwMDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnZhbHVlIC8gMTAwKVxuICAgIH0pXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpbWVTb3VuZFBsYXkoKSB7XG4gICAgaWYgKCFtdXRlZCkgc2FtcGxlKHNsaW1lU291bmRzKS5wbGF5KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrZ3JvdW5kTXVzaWNQbGF5KGN1cnJlbnRTb25nKSB7XG4gICAgaWYgKCFzb25nUnVubmluZykge1xuICAgICAgICBzb25nUnVubmluZyA9IHRydWU7XG4gICAgICAgIGlmICghbXV0ZWQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTb25nLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7c3RhcnQsIHBhdXNlR2FtZX0gZnJvbSBcIi4vc2NyaXB0cy9nYW1lLmpzXCJcblxuY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgc3RhcnQoZ3JpZCk7XG4gICAgcGF1c2VHYW1lKCk7XG59KVxuIl0sIm5hbWVzIjpbImdhbWVPdmVyIiwiZ2FtZVBhdXNlZCIsImVuZW15Q291bnQiLCJlbmVteXMiLCJFbmVteSIsImdyaWQiLCJuZXdFbmVteUJvdHRvbSIsImJvdHRvbSIsImxlZnQiLCJNYXRoIiwicmFuZG9tIiwidmlzdWFsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUVuZW15cyIsInF1ZXJ5U2VsZWN0b3IiLCJpIiwiZW5lbXlHYXAiLCJuZXdFbmVteSIsInB1c2giLCJtb3ZlRW5lbXlzIiwiZm9yRWFjaCIsImVuZW15IiwidXBkYXRlRW5lbXlzIiwiZmlyc3RFbmVteSIsInJlbW92ZSIsInNoaWZ0Iiwia2lsbEVuZW15IiwiY3JlYXRlUGxheWVyIiwic2xpbWVKdW1wIiwicGxheWVyTW92ZW1lbnRzIiwic3RvcFBsYXllck1vdmVtZW50cyIsInVwVGltZXJJZCIsImRvd25UaW1lcklkIiwibGVmdFRpbWVySWQiLCJyaWdodFRpbWVySWQiLCJjcmVhdGVQbGF0Zm9ybXMiLCJtb3ZlUGxhdGZvcm1zIiwic2NvcmUiLCJwbGF5ZXJTaG9vdCIsInNob290QnVsbGV0Iiwic29mdFBhdXNlZCIsInN0YXJ0Iiwic2V0SW50ZXJ2YWwiLCJhZGRFdmVudExpc3RlbmVyIiwicGxheWVyUGF1c2VHYW1lIiwicmVzdGFydCIsImV2ZW50IiwibWVudSIsImtleUNvZGUiLCJkaXNwbGF5IiwicGF1c2VHYW1lIiwiZW5kR2FtZSIsImNsZWFySW50ZXJ2YWwiLCJlbmRpbmdPbmVUZXh0IiwiZW5kaW5nVHdvVGV4dCIsImVuZGluZ1RocmVlVGV4dCIsIm9nU2NvcmUiLCJpbm5lckhUTUwiLCJsb2NhdGlvbiIsInJlbG9hZCIsImlzSnVtcGluZyIsImlzRmFsbGluZyIsInBsYXRmb3JtQ291bnQiLCJwbGF0Zm9ybXMiLCJQbGF0Zm9ybSIsIm5ld1BsYXRCb3R0b20iLCJwbGF0Zm9ybUdhcCIsIm5ld1BsYXRmb3JtIiwicGxhdGZvcm0iLCJ1cGRhdGVQbGF0Zm9ybXMiLCJzY29yZVRleHQiLCJ0aXRsZVRleHQiLCJtb3ZlbWVudFRleHQiLCJzaG9vdFRleHQiLCJmaXJzdFBsYXRmb3JtIiwic2xpbWVTb3VuZFBsYXkiLCJzbGltZSIsImlzR29pbmdMZWZ0IiwiaXNHb2luZ1JpZ2h0Iiwic2xpbWVMZWZ0U3BhY2UiLCJzdGFydFBvaW50Iiwic2xpbWVCb3R0b21TcGFjZSIsInNsaW1lRmFsbCIsImNvbGxpc2lvbkRldGVjdCIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwiYnVsbGV0cyIsIkJ1bGxldCIsIm5ld0J1bGxldCIsImNsaWVudFgiLCJjbGllbnRZIiwieCIsInkiLCJidWxsZXQiLCJmaXJzdEJ1bGxldCIsImNvbnNvbGUiLCJsb2ciLCJtdXRlZCIsInNvbmdSdW5uaW5nIiwiYmFja2dyb3VuZE11c2ljT25lIiwiQXVkaW8iLCJiYWNrZ3JvdW5kTXVzaWNUd28iLCJiYWNrZ3JvdW5kTXVzaWNUaHJlZSIsImJhY2tncm91bmRNdXNpY0ZvdXIiLCJiYWNrZ3JvdW5kTXVzaWNGaXZlIiwiYmFja2dyb3VuZE11c2ljU2l4IiwiYmFja2dyb3VuZE11c2ljU2V2ZW4iLCJiYWNrZ3JvdW5kTXVzaWNFaWdodCIsImJhY2tncm91bmRNdXNpYyIsInNsaW1lU291bmRPbmUiLCJzbGltZVNvdW5kVHdvIiwic2xpbWVTb3VuZFRocmVlIiwic2xpbWVTb3VuZEZvdXIiLCJzbGltZVNvdW5kRml2ZSIsInNsaW1lU291bmRTaXgiLCJzbGltZVNvdW5kU2V2ZW4iLCJzbGltZVNvdW5kRWlnaHQiLCJzbGltZVZvbHVtZSIsInZvbHVtZSIsInNsaW1lU291bmRzIiwic2FtcGxlIiwiYXJyYXkiLCJmbG9vciIsImxlbmd0aCIsInNsaWRlciIsImdldEVsZW1lbnRCeUlkIiwiY3VycmVudFNvbmciLCJiYWNrZ3JvdW5kTXVzaWNQbGF5IiwidmFsdWUiLCJwbGF5Il0sInNvdXJjZVJvb3QiOiIifQ==