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


var enemyCount = 3;
var enemyKey = 0;
var enemys = []; // Sets enemy properties

var Enemy = function Enemy(grid, newEnemyBottom) {
  _classCallCheck(this, Enemy);

  this.id = enemyKey += 1;
  this.bottom = newEnemyBottom;
  this.left = Math.random() * 450;
  this.visual = document.createElement('div');
  var visual = this.visual;
  visual.classList.add('enemy');
  visual.classList.add(this.id);
  visual.style.left = this.left + 'px';
  visual.style.bottom = this.bottom + 'px';
  grid.appendChild(visual);
}; // Creates enemys and pushes to enemy array


function createEnemys() {
  var grid = document.querySelector('.grid');

  for (var i = 0; i < enemyCount; i++) {
    var enemyGap = -grid.clientHeight / enemyCount;
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
    if (enemy.bottom >= grid.clientHeight) {
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
  var newTarget = document.getElementsByClassName(enemy.id);
  newTarget.visual.remove();
  __webpack_require__.g.score += 1;
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
  endingThreeText.innerHTML = "final score: ".concat(__webpack_require__.g.score, "m");
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
        scoreText.innerHTML = __webpack_require__.g.score + 'm';
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

    if (bullet.bottom <= -50) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRCw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQSxJQUFNdkIsSUFBSSxHQUFHUSxRQUFRLENBQUNPLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBYjtBQUVBUCxRQUFRLENBQUN3QyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsREYsRUFBQUEsdURBQUssQ0FBQzlDLElBQUQsQ0FBTDtBQUNBdUQsRUFBQUEsMkRBQVM7QUFDVixDQUhELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9lbmVteS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9nYW1lLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXRmb3JtLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXJTaG9vdC5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZU92ZXIsIGdhbWVQYXVzZWQgfSBmcm9tICcuL2dhbWUuanMnO1xuXG5sZXQgZW5lbXlDb3VudCA9IDM7XG5sZXQgZW5lbXlLZXkgPSAwO1xuXG5leHBvcnQgbGV0IGVuZW15cyA9IFtdO1xuXG4vLyBTZXRzIGVuZW15IHByb3BlcnRpZXNcbmNsYXNzIEVuZW15IHtcbiAgY29uc3RydWN0b3IoZ3JpZCwgbmV3RW5lbXlCb3R0b20pIHtcbiAgICB0aGlzLmlkID0gZW5lbXlLZXkgKz0gMTtcbiAgICB0aGlzLmJvdHRvbSA9IG5ld0VuZW15Qm90dG9tO1xuICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnZW5lbXknKTtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCh0aGlzLmlkKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gIH1cbn1cbi8vIENyZWF0ZXMgZW5lbXlzIGFuZCBwdXNoZXMgdG8gZW5lbXkgYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbmVteXMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVuZW15Q291bnQ7IGkrKykge1xuICAgIGxldCBlbmVteUdhcCA9IC1ncmlkLmNsaWVudEhlaWdodCAvIGVuZW15Q291bnQ7XG4gICAgbGV0IG5ld0VuZW15Qm90dG9tID0gLTEyMCArIGkgKiBlbmVteUdhcDtcbiAgICBsZXQgbmV3RW5lbXkgPSBuZXcgRW5lbXkoZ3JpZCwgbmV3RW5lbXlCb3R0b20pO1xuICAgIGVuZW15cy5wdXNoKG5ld0VuZW15KTtcbiAgfVxufVxuLy8gTW92ZXMgZW5lbXlzIGJ5IHN1YnN0cmFjdGluZywgb3IgYWRkaW5nIHRvIHRoZSBlbmVteSdzIGJvdHRvbSBwcm9wZXJ0eVxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVFbmVteXMoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIGVuZW15cy5mb3JFYWNoKChlbmVteSkgPT4ge1xuICAgICAgZW5lbXkuYm90dG9tICs9IDAuNTU7XG4gICAgICBsZXQgdmlzdWFsID0gZW5lbXkudmlzdWFsO1xuICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGVuZW15LmJvdHRvbSArICdweCc7XG4gICAgICB1cGRhdGVFbmVteXMoZW5lbXksIGdyaWQpO1xuICAgIH0pO1xuICB9XG59XG4vLyBSZW1vdmVzIG9sZCBlbmVteXMgYW5kIGNyZWF0ZXMgbmV3IGVuZW15cyB0aGF0IGFyZSB0aGVuIHB1c2hlZCB0byBlbmVteSBhcnJheVxuZnVuY3Rpb24gdXBkYXRlRW5lbXlzKGVuZW15LCBncmlkKSB7XG4gIGlmICghZ2FtZU92ZXIpIHtcbiAgICBpZiAoZW5lbXkuYm90dG9tID49IGdyaWQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICBsZXQgZmlyc3RFbmVteSA9IGVuZW15c1swXS52aXN1YWw7XG4gICAgICBmaXJzdEVuZW15LnJlbW92ZSgpO1xuICAgICAgZ2xvYmFsLnNjb3JlIC09IDIwO1xuICAgICAgZW5lbXlzLnNoaWZ0KCk7XG4gICAgICBsZXQgbmV3RW5lbXkgPSBuZXcgRW5lbXkoZ3JpZCwgLTUwKTtcbiAgICAgIGVuZW15cy5wdXNoKG5ld0VuZW15KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtpbGxFbmVteShlbmVteSkge1xuICBsZXQgbmV3VGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShlbmVteS5pZCk7XG4gIG5ld1RhcmdldC52aXN1YWwucmVtb3ZlKCk7XG4gIGdsb2JhbC5zY29yZSArPSAxO1xufVxuIiwiaW1wb3J0IHtcbiAgY3JlYXRlUGxheWVyLFxuICBzbGltZUp1bXAsXG4gIHBsYXllck1vdmVtZW50cyxcbiAgc3RvcFBsYXllck1vdmVtZW50cyxcbiAgdXBUaW1lcklkLFxuICBkb3duVGltZXJJZCxcbiAgbGVmdFRpbWVySWQsXG4gIHJpZ2h0VGltZXJJZCxcbn0gZnJvbSAnLi9wbGF5ZXIuanMnO1xuaW1wb3J0IHsgY3JlYXRlUGxhdGZvcm1zLCBtb3ZlUGxhdGZvcm1zIH0gZnJvbSAnLi9wbGF0Zm9ybS5qcyc7XG5pbXBvcnQgeyBwbGF5ZXJTaG9vdCwgc2hvb3RCdWxsZXQgfSBmcm9tICcuL3BsYXllclNob290LmpzJztcbmltcG9ydCB7IGNyZWF0ZUVuZW15cywgbW92ZUVuZW15cyB9IGZyb20gJy4vZW5lbXkuanMnO1xuXG5leHBvcnQgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG5leHBvcnQgbGV0IGdhbWVQYXVzZWQgPSBmYWxzZTtcbmV4cG9ydCBsZXQgc29mdFBhdXNlZCA9IGZhbHNlO1xuXG4vLyBJbiBjaGFyZ2Ugb2Ygc3RhcnRpbmcgdGhlIGdhbWUsIGNhbGxzIG5lY2Vzc2FyeSBmdW5jdGlvbnMgbmVlZGVkIGZvciBidWlsZGluZyBhbmQgcmVuZGVyaW5nLlxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KGdyaWQpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY3JlYXRlUGxhdGZvcm1zKCk7XG4gICAgY3JlYXRlRW5lbXlzKCk7XG4gICAgY3JlYXRlUGxheWVyKCk7XG4gICAgc2V0SW50ZXJ2YWwobW92ZVBsYXRmb3JtcywgMSk7XG4gICAgc2V0SW50ZXJ2YWwobW92ZUVuZW15cywgMSk7XG4gICAgc2V0SW50ZXJ2YWwoc2hvb3RCdWxsZXQsIDEpO1xuICAgIHNsaW1lSnVtcCgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllclNob290KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyTW92ZW1lbnRzKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyUGF1c2VHYW1lKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcmVzdGFydCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzdG9wUGxheWVyTW92ZW1lbnRzKTtcbiAgfVxufVxuLy8gUGF1c2VzIGdhbWUgYnkgc2V0dGluZyBleHBvcnRlZCB2YXJpYWJsZSB0byBkZXNpcmVkIGdhbWUgc3RhdGVcbmZ1bmN0aW9uIHBsYXllclBhdXNlR2FtZShldmVudCkge1xuICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcblxuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgJiYgIWdhbWVQYXVzZWQpIHtcbiAgICBnYW1lUGF1c2VkID0gdHJ1ZTtcbiAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyICYmIGdhbWVQYXVzZWQpIHtcbiAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuICAgIHNvZnRQYXVzZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF1c2VHYW1lKCkge1xuICBnYW1lUGF1c2VkID0gdHJ1ZTtcbiAgc29mdFBhdXNlZCA9IHRydWU7XG59XG4vLyBFbmRzIGdhbWUgYnkgY2xlYXJpbmcgdGhlIGdyaWQgYW5kIFRpbWVySWRzXG5leHBvcnQgZnVuY3Rpb24gZW5kR2FtZSgpIHtcbiAgZ2FtZU92ZXIgPSB0cnVlO1xuICBjbGVhckludGVydmFsKHVwVGltZXJJZCk7XG4gIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpO1xuICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICBjb25zdCBlbmRpbmdPbmVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZUVuZGluZycpO1xuICBjb25zdCBlbmRpbmdUd29UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR3b0VuZGluZycpO1xuICBjb25zdCBlbmRpbmdUaHJlZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWxTY29yZScpO1xuICBjb25zdCBvZ1Njb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XG4gIG9nU2NvcmUuaW5uZXJIVE1MID0gJyc7XG4gIGVuZGluZ09uZVRleHQuaW5uZXJIVE1MID0gXCJpdCB3YXNuJ3QgZW5vdWdoXCI7XG4gIGVuZGluZ1R3b1RleHQuaW5uZXJIVE1MID0gJ3ByZXNzIFIgdG8gdHJ5IGFnYWluJztcbiAgZW5kaW5nVGhyZWVUZXh0LmlubmVySFRNTCA9IGBmaW5hbCBzY29yZTogJHtnbG9iYWwuc2NvcmV9bWA7XG59XG4vLyBSZXN0YXJ0cyBnYW1lIHZpYSByZWxvYWRpbmcgcGFnZVxuZnVuY3Rpb24gcmVzdGFydChldmVudCkge1xuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gODIpIHtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2FtZU92ZXIsIGdhbWVQYXVzZWQsIHNvZnRQYXVzZWQgfSBmcm9tICcuL2dhbWUuanMnO1xuaW1wb3J0IHsgaXNKdW1waW5nLCBpc0ZhbGxpbmcgfSBmcm9tICcuL3BsYXllci5qcyc7XG5cbmxldCBwbGF0Zm9ybUNvdW50ID0gMTA7XG5cbmdsb2JhbC5zY29yZSA9IDE7XG5leHBvcnQgbGV0IHBsYXRmb3JtcyA9IFtdO1xuXG4vLyBTZXRzIFBsYXRmb3JtIHByb3BlcnRpZXNcbmNsYXNzIFBsYXRmb3JtIHtcbiAgY29uc3RydWN0b3IoZ3JpZCwgbmV3UGxhdEJvdHRvbSkge1xuICAgIHRoaXMuYm90dG9tID0gbmV3UGxhdEJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSBNYXRoLnJhbmRvbSgpICogNDUwO1xuICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ3BsYXRmb3JtJyk7XG4gICAgdmlzdWFsLnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyAncHgnO1xuICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSB0aGlzLmJvdHRvbSArICdweCc7XG4gICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICB9XG59XG4vLyBDcmVhdGVzIHBsYXRmb3JtcyBhbmQgcHVzaGVzIHRvIHBsYXRmb3JtIGFycmF5XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhdGZvcm1zKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0Zm9ybUNvdW50OyBpKyspIHtcbiAgICBsZXQgcGxhdGZvcm1HYXAgPSAxNzAwIC8gcGxhdGZvcm1Db3VudDtcbiAgICBsZXQgbmV3UGxhdEJvdHRvbSA9IDEwMCArIGkgKiBwbGF0Zm9ybUdhcDtcbiAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgbmV3UGxhdEJvdHRvbSk7XG4gICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICB9XG59XG4vLyBNb3ZlcyBQbGF0Zm9ybXMgYnkgc3Vic3RyYWN0aW5nLCBvciBhZGRpbmcgdG8gdGhlIFBsYXRmb3JtJ3MgYm90dG9tIHByb3BlcnR5XG5leHBvcnQgZnVuY3Rpb24gbW92ZVBsYXRmb3JtcygpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gIGlmICghZ2FtZVBhdXNlZCB8fCBzb2Z0UGF1c2VkKSB7XG4gICAgcGxhdGZvcm1zLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XG4gICAgICBpZiAoaXNKdW1waW5nKSB7XG4gICAgICAgIGlmIChzb2Z0UGF1c2VkKSB7XG4gICAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDEuNTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwbGF0Zm9ybS5ib3R0b20gLT0gMy41O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzRmFsbGluZykge1xuICAgICAgICBwbGF0Zm9ybS5ib3R0b20gKz0gMTtcbiAgICAgIH1cbiAgICAgIGxldCB2aXN1YWwgPSBwbGF0Zm9ybS52aXN1YWw7XG4gICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gcGxhdGZvcm0uYm90dG9tICsgJ3B4JztcbiAgICAgIHVwZGF0ZVBsYXRmb3JtcyhwbGF0Zm9ybSwgZ3JpZCk7XG4gICAgfSk7XG4gIH1cbn1cbi8vIFJlbW92ZXMgb2xkIHBsYXRmb3JtcyBhbmQgY3JlYXRlcyBuZXcgcGxhdGZvcm1zIHRoYXQgYXJlIHRoZW4gcHVzaGVkIHRvIHBsYXRmb3JtIGFycmF5XG5mdW5jdGlvbiB1cGRhdGVQbGF0Zm9ybXMocGxhdGZvcm0sIGdyaWQpIHtcbiAgaWYgKCFnYW1lT3Zlcikge1xuICAgIGlmIChwbGF0Zm9ybS5ib3R0b20gPD0gLTUwKSB7XG4gICAgICBjb25zdCBzY29yZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcbiAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRsZScpO1xuICAgICAgY29uc3QgbW92ZW1lbnRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVtZW50Jyk7XG4gICAgICBjb25zdCBzaG9vdFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hvb3QnKTtcbiAgICAgIGxldCBmaXJzdFBsYXRmb3JtID0gcGxhdGZvcm1zWzBdLnZpc3VhbDtcbiAgICAgIGZpcnN0UGxhdGZvcm0ucmVtb3ZlKCk7XG4gICAgICBwbGF0Zm9ybXMuc2hpZnQoKTtcbiAgICAgIGlmICghc29mdFBhdXNlZCkge1xuICAgICAgICBnbG9iYWwuc2NvcmUgKz0gMTtcbiAgICAgICAgc2NvcmVUZXh0LmlubmVySFRNTCA9IGdsb2JhbC5zY29yZSArICdtJztcbiAgICAgICAgdGl0bGVUZXh0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBtb3ZlbWVudFRleHQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHNob290VGV4dC5pbm5lckhUTUwgPSAnJztcbiAgICAgIH1cbiAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCAxNzAwKTtcbiAgICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGVuZEdhbWUsIGdhbWVQYXVzZWQgfSBmcm9tICcuL2dhbWUuanMnO1xuaW1wb3J0IHsgcGxhdGZvcm1zIH0gZnJvbSAnLi9wbGF0Zm9ybS5qcyc7XG5cbmNvbnN0IHNsaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmxldCBpc0dvaW5nTGVmdCA9IGZhbHNlO1xubGV0IGlzR29pbmdSaWdodCA9IGZhbHNlO1xuXG5leHBvcnQgbGV0IGlzSnVtcGluZyA9IGZhbHNlO1xuZXhwb3J0IGxldCBpc0ZhbGxpbmcgPSB0cnVlO1xuZXhwb3J0IGxldCBzbGltZUxlZnRTcGFjZSA9IDI4MDtcbmV4cG9ydCBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbmV4cG9ydCBsZXQgc3RhcnRQb2ludCA9IDIwMDtcbmV4cG9ydCBsZXQgc2xpbWVCb3R0b21TcGFjZSA9IHN0YXJ0UG9pbnQ7XG5leHBvcnQgbGV0IGxlZnRUaW1lcklkO1xuZXhwb3J0IGxldCByaWdodFRpbWVySWQ7XG5leHBvcnQgbGV0IHVwVGltZXJJZDtcbmV4cG9ydCBsZXQgZG93blRpbWVySWQ7XG5cbi8vIENyZWF0ZSAnU2xpbWUnIGFuZCBhZGQgdG8gdGhlIGdyaWQuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHNsaW1lKTtcbiAgc2xpbWUuY2xhc3NMaXN0LmFkZCgnc2xpbWUnKTtcbiAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG59XG4vLyBJbiBjaGFyZ2Ugb2YgYWRkaW5nIHRvIHRoZSBwbGF5ZXIncyBZIHZhbHVlIGFuZCBjYWxsaW5nIHNsaW1lRmFsbCgpXG5leHBvcnQgZnVuY3Rpb24gc2xpbWVKdW1wKCkge1xuICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKTtcbiAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgIGlzRmFsbGluZyA9IGZhbHNlO1xuICAgIHVwVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBzbGltZUJvdHRvbVNwYWNlICs9IDE7XG4gICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICBpZiAoc2xpbWVCb3R0b21TcGFjZSA+IHN0YXJ0UG9pbnQgKyAxMDApIHNsaW1lRmFsbCgpO1xuICAgICAgfVxuICAgIH0sIDEpO1xuICB9XG59XG4vLyBJbiBjaGFyZ2Ugb2Ygc3VidHJhY3RpbmcgdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgZW5kR2FtZSgpXG5mdW5jdGlvbiBzbGltZUZhbGwoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKTtcbiAgICBpc0p1bXBpbmcgPSBmYWxzZTtcbiAgICBpc0ZhbGxpbmcgPSB0cnVlO1xuICAgIGRvd25UaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIHNsaW1lQm90dG9tU3BhY2UgLT0gMjtcbiAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlIDw9IC0yMDApIGVuZEdhbWUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKSk7XG4gICAgICAgIHBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgICAgIGNvbGxpc2lvbkRldGVjdChwbGF0Zm9ybSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIDEpO1xuICB9XG59XG4vLyBDaGVja3MgdGhlIHZhbHVlIG9mIHRoZSBib3R0b20gb2YgdGhlIHBsYXllciwgaWYgc2FpZCB2YWx1ZSByZXR1cm5zIHRydWUgaXQgY2FsbHMgc2xpbWVKdW1wKClcbmZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdChwbGF0Zm9ybSkge1xuICBpZiAoXG4gICAgc2xpbWVCb3R0b21TcGFjZSA+PSBwbGF0Zm9ybS5ib3R0b20gJiZcbiAgICBzbGltZUJvdHRvbVNwYWNlIDw9IHBsYXRmb3JtLmJvdHRvbSArIDE5ICYmXG4gICAgc2xpbWVMZWZ0U3BhY2UgKyA0MCA+PSBwbGF0Zm9ybS5sZWZ0ICYmXG4gICAgc2xpbWVMZWZ0U3BhY2UgPD0gcGxhdGZvcm0ubGVmdCArIDEwMCAmJlxuICAgICFpc0p1bXBpbmdcbiAgKSB7XG4gICAgc3RhcnRQb2ludCA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgc2xpbWVKdW1wKCk7XG4gICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgfVxufVxuLy8gQ2FsbHMgbW92ZUxlZnQoKSBvciBtb3ZlUmlnaHQgZGVwZW5kaW5nIG9uIHBsYXllciBpbnB1dC4gKlVzZXMga2V5ZG93bipcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSBtb3ZlTGVmdCgpO1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkgbW92ZVJpZ2h0KCk7XG4gIH1cbn1cbi8vIENlYXNlcyBwbGF5ZXIgbW92ZW1lbnQgZGVwZW5kaW5nIG9uIGtleSByZWxlYXNlLiAqVXNlcyBrZXl1cCpcbmV4cG9ydCBmdW5jdGlvbiBzdG9wUGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkge1xuICAgIGlzR29pbmdMZWZ0ID0gZmFsc2U7XG4gICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZCk7XG4gIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIHtcbiAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZTtcbiAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gIH1cbn1cbi8vIERlY3JlbWVudHMgcGxheWVyJ3MgWCB2YWx1ZVxuZnVuY3Rpb24gbW92ZUxlZnQoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpO1xuICAgIGlmIChpc0dvaW5nUmlnaHQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICAgIGlzR29pbmdSaWdodCA9IGZhbHNlO1xuICAgIH1cbiAgICBpc0dvaW5nTGVmdCA9IHRydWU7XG4gICAgbGVmdFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPj0gLTYwKSB7XG4gICAgICAgIHNsaW1lTGVmdFNwYWNlIC09IDI7XG4gICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSA2MDA7XG4gICAgfSwgMSk7XG4gIH1cbn1cbi8vIEluY3JlbWVudHMgcGxheWVyJ3MgWCB2YWx1ZVxuZnVuY3Rpb24gbW92ZVJpZ2h0KCkge1xuICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gICAgaWYgKGlzR29pbmdMZWZ0KSB7XG4gICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlzR29pbmdSaWdodCA9IHRydWU7XG4gICAgcmlnaHRUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNsaW1lTGVmdFNwYWNlIDw9IDYxMCkge1xuICAgICAgICBzbGltZUxlZnRTcGFjZSArPSAyO1xuICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnO1xuICAgICAgfSBlbHNlIHNsaW1lTGVmdFNwYWNlID0gLTYwO1xuICAgIH0sIDEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBzbGltZUxlZnRTcGFjZSwgc2xpbWVCb3R0b21TcGFjZSB9IGZyb20gJy4vcGxheWVyLmpzJztcbmltcG9ydCB7IGVuZW15cywga2lsbEVuZW15IH0gZnJvbSAnLi9lbmVteS5qcyc7XG5cbmV4cG9ydCBsZXQgYnVsbGV0cyA9IFtdO1xuXG5jbGFzcyBCdWxsZXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgdGhpcy5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2U7XG4gICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnYnVsbGV0Jyk7XG4gICAgdmlzdWFsLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArIDE4ICsgJ3B4JztcbiAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArIDEyICsgJ3B4JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclNob290KGV2ZW50KSB7XG4gIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgIHNob290QnVsbGV0KCk7XG4gICAgbGV0IG5ld0J1bGxldCA9IG5ldyBCdWxsZXQoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLFxuICAgICAgZXZlbnQuY2xpZW50WCxcbiAgICAgIGV2ZW50LmNsaWVudFlcbiAgICApO1xuICAgIGJ1bGxldHMucHVzaChuZXdCdWxsZXQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9vdEJ1bGxldCh4LCB5KSB7XG4gIGJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0KSA9PiB7XG4gICAgYnVsbGV0LmJvdHRvbSAtPSAzO1xuICAgIGxldCB2aXN1YWwgPSBidWxsZXQudmlzdWFsO1xuICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBidWxsZXQuYm90dG9tICsgJ3B4JztcbiAgICBlbmVteXMuZm9yRWFjaCgoZW5lbXkpID0+IHtcbiAgICAgIGNvbGxpc2lvbkRldGVjdChlbmVteSwgYnVsbGV0LmJvdHRvbSwgYnVsbGV0LmxlZnQpO1xuICAgIH0pO1xuICAgIGlmIChidWxsZXQuYm90dG9tIDw9IC01MCkge1xuICAgICAgbGV0IGZpcnN0QnVsbGV0ID0gYnVsbGV0c1swXS52aXN1YWw7XG4gICAgICBmaXJzdEJ1bGxldC5yZW1vdmUoKTtcbiAgICAgIGJ1bGxldHMuc2hpZnQoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjb2xsaXNpb25EZXRlY3QoZW5lbXksIGJvdHRvbSwgbGVmdCkge1xuICBpZiAoXG4gICAgYm90dG9tID49IGVuZW15LmJvdHRvbSAmJlxuICAgIGJvdHRvbSA8PSBlbmVteS5ib3R0b20gKyAxOSAmJlxuICAgIGxlZnQgKyA0MCA+PSBlbmVteS5sZWZ0ICYmXG4gICAgbGVmdCA8PSBlbmVteS5sZWZ0ICsgMzBcbiAgKSB7XG4gICAga2lsbEVuZW15KGVuZW15KTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBzdGFydCwgcGF1c2VHYW1lIH0gZnJvbSAnLi9zY3JpcHRzL2dhbWUuanMnO1xuXG5jb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgc3RhcnQoZ3JpZCk7XG4gIHBhdXNlR2FtZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiZ2FtZU92ZXIiLCJnYW1lUGF1c2VkIiwiZW5lbXlDb3VudCIsImVuZW15S2V5IiwiZW5lbXlzIiwiRW5lbXkiLCJncmlkIiwibmV3RW5lbXlCb3R0b20iLCJpZCIsImJvdHRvbSIsImxlZnQiLCJNYXRoIiwicmFuZG9tIiwidmlzdWFsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUVuZW15cyIsInF1ZXJ5U2VsZWN0b3IiLCJpIiwiZW5lbXlHYXAiLCJjbGllbnRIZWlnaHQiLCJuZXdFbmVteSIsInB1c2giLCJtb3ZlRW5lbXlzIiwiZm9yRWFjaCIsImVuZW15IiwidXBkYXRlRW5lbXlzIiwiZmlyc3RFbmVteSIsInJlbW92ZSIsImdsb2JhbCIsInNjb3JlIiwic2hpZnQiLCJraWxsRW5lbXkiLCJuZXdUYXJnZXQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY3JlYXRlUGxheWVyIiwic2xpbWVKdW1wIiwicGxheWVyTW92ZW1lbnRzIiwic3RvcFBsYXllck1vdmVtZW50cyIsInVwVGltZXJJZCIsImRvd25UaW1lcklkIiwibGVmdFRpbWVySWQiLCJyaWdodFRpbWVySWQiLCJjcmVhdGVQbGF0Zm9ybXMiLCJtb3ZlUGxhdGZvcm1zIiwicGxheWVyU2hvb3QiLCJzaG9vdEJ1bGxldCIsInNvZnRQYXVzZWQiLCJzdGFydCIsInNldEludGVydmFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBsYXllclBhdXNlR2FtZSIsInJlc3RhcnQiLCJldmVudCIsIm1lbnUiLCJrZXlDb2RlIiwiZGlzcGxheSIsInBhdXNlR2FtZSIsImVuZEdhbWUiLCJjbGVhckludGVydmFsIiwiZW5kaW5nT25lVGV4dCIsImVuZGluZ1R3b1RleHQiLCJlbmRpbmdUaHJlZVRleHQiLCJvZ1Njb3JlIiwiaW5uZXJIVE1MIiwibG9jYXRpb24iLCJyZWxvYWQiLCJpc0p1bXBpbmciLCJpc0ZhbGxpbmciLCJwbGF0Zm9ybUNvdW50IiwicGxhdGZvcm1zIiwiUGxhdGZvcm0iLCJuZXdQbGF0Qm90dG9tIiwicGxhdGZvcm1HYXAiLCJuZXdQbGF0Zm9ybSIsInBsYXRmb3JtIiwidXBkYXRlUGxhdGZvcm1zIiwic2NvcmVUZXh0IiwidGl0bGVUZXh0IiwibW92ZW1lbnRUZXh0Iiwic2hvb3RUZXh0IiwiZmlyc3RQbGF0Zm9ybSIsInNsaW1lIiwiaXNHb2luZ0xlZnQiLCJpc0dvaW5nUmlnaHQiLCJzbGltZUxlZnRTcGFjZSIsInN0YXJ0UG9pbnQiLCJzbGltZUJvdHRvbVNwYWNlIiwic2xpbWVGYWxsIiwiY29sbGlzaW9uRGV0ZWN0IiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJidWxsZXRzIiwiQnVsbGV0IiwibmV3QnVsbGV0IiwiY2xpZW50WCIsImNsaWVudFkiLCJ4IiwieSIsImJ1bGxldCIsImZpcnN0QnVsbGV0Il0sInNvdXJjZVJvb3QiOiIifQ==