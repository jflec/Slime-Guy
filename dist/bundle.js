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

  this.killed = false;
  this.bottom = newEnemyBottom;
  this.left = Math.random() * 450;
  this.visual = document.createElement('div');
  var visual = this.visual;
  visual.classList.add('enemy');
  visual.id = enemyKey += 1;
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
    var scoreStyle = document.querySelector('.score');

    if (enemy.bottom >= grid.clientHeight) {
      if (!enemy.killed) {
        grid.style.transform = 'scale(1.06)';
        grid.style.boxShadow = 'inset 0px 11px 20px -10px rgb(94, 0, 0)';
        scoreStyle.style.color = 'red';
        scoreStyle.style.transform = 'scale(1.06)';
        var enemyStyle = document.getElementById(enemy.visual.id);
        enemyStyle.style.transition = '0.2s';
        enemyStyle.style.boxShadow = '0px 0px 100px 40px rgb(94, 0, 0)';
        grid.style.border = '4px solid red';
      }
    }

    if (enemy.bottom >= grid.clientHeight + 20) {
      var firstEnemy = enemys[0].visual;

      if (!enemy.killed) {
        grid.style.transform = 'scale(1.0)';
        grid.style.boxShadow = 'inset 0px 0px 0px 0px rgb(94, 0, 0)';
        scoreStyle.style.color = 'white';
        scoreStyle.style.transform = 'scale(1.0)';
        grid.style.border = '2px solid red';
        grid.style.borderImage = 'linear-gradient(0deg, rgb(255, 0, 0), rgb(26, 26, 26)) 1';
        __webpack_require__.g.score -= 20;
      }

      firstEnemy.remove();
      enemys.shift();
      var newEnemy = new Enemy(grid, -50);
      enemys.push(newEnemy);
    }
  }
}

function killEnemy(enemy) {
  __webpack_require__.g.score += 10;
  enemy.killed = true;
  enemy.visual.remove();
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "platforms": function() { return /* binding */ platforms; },
/* harmony export */   "createPlatforms": function() { return /* binding */ createPlatforms; },
/* harmony export */   "movePlatforms": function() { return /* binding */ movePlatforms; }
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/scripts/game.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var platformCount = 22;
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
    var platformGap = 3900 / platformCount;
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

      var newPlatform = new Platform(grid, 3900);
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
    if (!enemy.killed) (0,_enemy_js__WEBPACK_IMPORTED_MODULE_1__.killEnemy)(enemy);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3ZERDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BELDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUVBLElBQU14QixJQUFJLEdBQUdRLFFBQVEsQ0FBQ1EsYUFBVCxDQUF1QixPQUF2QixDQUFiO0FBRUFSLFFBQVEsQ0FBQ2dELGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xERixFQUFBQSx1REFBSyxDQUFDdEQsSUFBRCxDQUFMO0FBQ0ErRCxFQUFBQSwyREFBUztBQUNWLENBSEQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL2VuZW15LmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxhdGZvcm0uanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXllclNob290LmpzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lT3ZlciwgZ2FtZVBhdXNlZCB9IGZyb20gJy4vZ2FtZS5qcyc7XG5cbmxldCBlbmVteUNvdW50ID0gMztcbmxldCBlbmVteUtleSA9IDA7XG5cbmV4cG9ydCBsZXQgZW5lbXlzID0gW107XG5cbi8vIFNldHMgZW5lbXkgcHJvcGVydGllc1xuY2xhc3MgRW5lbXkge1xuICBjb25zdHJ1Y3RvcihncmlkLCBuZXdFbmVteUJvdHRvbSkge1xuICAgIHRoaXMua2lsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5ib3R0b20gPSBuZXdFbmVteUJvdHRvbTtcbiAgICB0aGlzLmxlZnQgPSBNYXRoLnJhbmRvbSgpICogNDUwO1xuICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2VuZW15Jyk7XG4gICAgdmlzdWFsLmlkID0gZW5lbXlLZXkgKz0gMTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gIH1cbn1cbi8vIENyZWF0ZXMgZW5lbXlzIGFuZCBwdXNoZXMgdG8gZW5lbXkgYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbmVteXMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVuZW15Q291bnQ7IGkrKykge1xuICAgIGxldCBlbmVteUdhcCA9IC1ncmlkLmNsaWVudEhlaWdodCAvIGVuZW15Q291bnQ7XG4gICAgbGV0IG5ld0VuZW15Qm90dG9tID0gLTEyMCArIGkgKiBlbmVteUdhcDtcbiAgICBsZXQgbmV3RW5lbXkgPSBuZXcgRW5lbXkoZ3JpZCwgbmV3RW5lbXlCb3R0b20pO1xuICAgIGVuZW15cy5wdXNoKG5ld0VuZW15KTtcbiAgfVxufVxuLy8gTW92ZXMgZW5lbXlzIGJ5IHN1YnN0cmFjdGluZywgb3IgYWRkaW5nIHRvIHRoZSBlbmVteSdzIGJvdHRvbSBwcm9wZXJ0eVxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVFbmVteXMoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIGVuZW15cy5mb3JFYWNoKChlbmVteSkgPT4ge1xuICAgICAgZW5lbXkuYm90dG9tICs9IDAuNTU7XG4gICAgICBsZXQgdmlzdWFsID0gZW5lbXkudmlzdWFsO1xuICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGVuZW15LmJvdHRvbSArICdweCc7XG4gICAgICB1cGRhdGVFbmVteXMoZW5lbXksIGdyaWQpO1xuICAgIH0pO1xuICB9XG59XG4vLyBSZW1vdmVzIG9sZCBlbmVteXMgYW5kIGNyZWF0ZXMgbmV3IGVuZW15cyB0aGF0IGFyZSB0aGVuIHB1c2hlZCB0byBlbmVteSBhcnJheVxuZnVuY3Rpb24gdXBkYXRlRW5lbXlzKGVuZW15LCBncmlkKSB7XG4gIGlmICghZ2FtZU92ZXIpIHtcbiAgICBsZXQgc2NvcmVTdHlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgIGlmIChlbmVteS5ib3R0b20gPj0gZ3JpZC5jbGllbnRIZWlnaHQpIHtcbiAgICAgIGlmICghZW5lbXkua2lsbGVkKSB7XG4gICAgICAgIGdyaWQuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEuMDYpJztcbiAgICAgICAgZ3JpZC5zdHlsZS5ib3hTaGFkb3cgPSAnaW5zZXQgMHB4IDExcHggMjBweCAtMTBweCByZ2IoOTQsIDAsIDApJztcbiAgICAgICAgc2NvcmVTdHlsZS5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgICAgICBzY29yZVN0eWxlLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgxLjA2KSc7XG4gICAgICAgIGxldCBlbmVteVN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZW5lbXkudmlzdWFsLmlkKTtcbiAgICAgICAgZW5lbXlTdHlsZS5zdHlsZS50cmFuc2l0aW9uID0gJzAuMnMnO1xuICAgICAgICBlbmVteVN0eWxlLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggMHB4IDEwMHB4IDQwcHggcmdiKDk0LCAwLCAwKSc7XG4gICAgICAgIGdyaWQuc3R5bGUuYm9yZGVyID0gJzRweCBzb2xpZCByZWQnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5lbXkuYm90dG9tID49IGdyaWQuY2xpZW50SGVpZ2h0ICsgMjApIHtcbiAgICAgIGxldCBmaXJzdEVuZW15ID0gZW5lbXlzWzBdLnZpc3VhbDtcbiAgICAgIGlmICghZW5lbXkua2lsbGVkKSB7XG4gICAgICAgIGdyaWQuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEuMCknO1xuICAgICAgICBncmlkLnN0eWxlLmJveFNoYWRvdyA9ICdpbnNldCAwcHggMHB4IDBweCAwcHggcmdiKDk0LCAwLCAwKSc7XG4gICAgICAgIHNjb3JlU3R5bGUuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICBzY29yZVN0eWxlLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgxLjApJztcbiAgICAgICAgZ3JpZC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIHJlZCc7XG4gICAgICAgIGdyaWQuc3R5bGUuYm9yZGVySW1hZ2UgPVxuICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiKDI1NSwgMCwgMCksIHJnYigyNiwgMjYsIDI2KSkgMSc7XG4gICAgICAgIGdsb2JhbC5zY29yZSAtPSAyMDtcbiAgICAgIH1cbiAgICAgIGZpcnN0RW5lbXkucmVtb3ZlKCk7XG4gICAgICBlbmVteXMuc2hpZnQoKTtcbiAgICAgIGxldCBuZXdFbmVteSA9IG5ldyBFbmVteShncmlkLCAtNTApO1xuICAgICAgZW5lbXlzLnB1c2gobmV3RW5lbXkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ga2lsbEVuZW15KGVuZW15KSB7XG4gIGdsb2JhbC5zY29yZSArPSAxMDtcbiAgZW5lbXkua2lsbGVkID0gdHJ1ZTtcbiAgZW5lbXkudmlzdWFsLnJlbW92ZSgpO1xufVxuIiwiaW1wb3J0IHtcbiAgY3JlYXRlUGxheWVyLFxuICBzbGltZUp1bXAsXG4gIHBsYXllck1vdmVtZW50cyxcbiAgc3RvcFBsYXllck1vdmVtZW50cyxcbiAgdXBUaW1lcklkLFxuICBkb3duVGltZXJJZCxcbiAgbGVmdFRpbWVySWQsXG4gIHJpZ2h0VGltZXJJZCxcbn0gZnJvbSAnLi9wbGF5ZXIuanMnO1xuaW1wb3J0IHsgY3JlYXRlUGxhdGZvcm1zLCBtb3ZlUGxhdGZvcm1zIH0gZnJvbSAnLi9wbGF0Zm9ybS5qcyc7XG5pbXBvcnQgeyBwbGF5ZXJTaG9vdCwgc2hvb3RCdWxsZXQgfSBmcm9tICcuL3BsYXllclNob290LmpzJztcbmltcG9ydCB7IGNyZWF0ZUVuZW15cywgbW92ZUVuZW15cyB9IGZyb20gJy4vZW5lbXkuanMnO1xuXG5leHBvcnQgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG5leHBvcnQgbGV0IGdhbWVQYXVzZWQgPSBmYWxzZTtcbmV4cG9ydCBsZXQgc29mdFBhdXNlZCA9IGZhbHNlO1xuXG4vLyBJbiBjaGFyZ2Ugb2Ygc3RhcnRpbmcgdGhlIGdhbWUsIGNhbGxzIG5lY2Vzc2FyeSBmdW5jdGlvbnMgbmVlZGVkIGZvciBidWlsZGluZyBhbmQgcmVuZGVyaW5nLlxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KGdyaWQpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY3JlYXRlUGxhdGZvcm1zKCk7XG4gICAgY3JlYXRlRW5lbXlzKCk7XG4gICAgY3JlYXRlUGxheWVyKCk7XG4gICAgc2V0SW50ZXJ2YWwobW92ZVBsYXRmb3JtcywgMSk7XG4gICAgc2V0SW50ZXJ2YWwobW92ZUVuZW15cywgMSk7XG4gICAgc2V0SW50ZXJ2YWwoc2hvb3RCdWxsZXQsIDEpO1xuICAgIHNsaW1lSnVtcCgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllclNob290KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyTW92ZW1lbnRzKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyUGF1c2VHYW1lKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcmVzdGFydCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzdG9wUGxheWVyTW92ZW1lbnRzKTtcbiAgfVxufVxuLy8gUGF1c2VzIGdhbWUgYnkgc2V0dGluZyBleHBvcnRlZCB2YXJpYWJsZSB0byBkZXNpcmVkIGdhbWUgc3RhdGVcbmZ1bmN0aW9uIHBsYXllclBhdXNlR2FtZShldmVudCkge1xuICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcblxuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgJiYgIWdhbWVQYXVzZWQpIHtcbiAgICBnYW1lUGF1c2VkID0gdHJ1ZTtcbiAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyICYmIGdhbWVQYXVzZWQpIHtcbiAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuICAgIHNvZnRQYXVzZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF1c2VHYW1lKCkge1xuICBnYW1lUGF1c2VkID0gdHJ1ZTtcbiAgc29mdFBhdXNlZCA9IHRydWU7XG59XG4vLyBFbmRzIGdhbWUgYnkgY2xlYXJpbmcgdGhlIGdyaWQgYW5kIFRpbWVySWRzXG5leHBvcnQgZnVuY3Rpb24gZW5kR2FtZSgpIHtcbiAgZ2FtZU92ZXIgPSB0cnVlO1xuICBjbGVhckludGVydmFsKHVwVGltZXJJZCk7XG4gIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpO1xuICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICBjb25zdCBlbmRpbmdPbmVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZUVuZGluZycpO1xuICBjb25zdCBlbmRpbmdUd29UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR3b0VuZGluZycpO1xuICBjb25zdCBlbmRpbmdUaHJlZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWxTY29yZScpO1xuICBjb25zdCBvZ1Njb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XG4gIG9nU2NvcmUuaW5uZXJIVE1MID0gJyc7XG4gIGVuZGluZ09uZVRleHQuaW5uZXJIVE1MID0gXCJpdCB3YXNuJ3QgZW5vdWdoXCI7XG4gIGVuZGluZ1R3b1RleHQuaW5uZXJIVE1MID0gJ3ByZXNzIFIgdG8gdHJ5IGFnYWluJztcbiAgZW5kaW5nVGhyZWVUZXh0LmlubmVySFRNTCA9IGBmaW5hbCBzY29yZTogJHtnbG9iYWwuc2NvcmV9YDtcbn1cbi8vIFJlc3RhcnRzIGdhbWUgdmlhIHJlbG9hZGluZyBwYWdlXG5mdW5jdGlvbiByZXN0YXJ0KGV2ZW50KSB7XG4gIGlmIChldmVudC5rZXlDb2RlID09PSA4Mikge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBnYW1lT3ZlciwgZ2FtZVBhdXNlZCwgc29mdFBhdXNlZCB9IGZyb20gJy4vZ2FtZS5qcyc7XG5pbXBvcnQgeyBpc0p1bXBpbmcsIGlzRmFsbGluZyB9IGZyb20gJy4vcGxheWVyLmpzJztcblxubGV0IHBsYXRmb3JtQ291bnQgPSAyMjtcblxuZ2xvYmFsLnNjb3JlID0gMTtcbmV4cG9ydCBsZXQgcGxhdGZvcm1zID0gW107XG5cbi8vIFNldHMgUGxhdGZvcm0gcHJvcGVydGllc1xuY2xhc3MgUGxhdGZvcm0ge1xuICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgdGhpcy5ib3R0b20gPSBuZXdQbGF0Qm90dG9tO1xuICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgncGxhdGZvcm0nKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gIH1cbn1cbi8vIENyZWF0ZXMgcGxhdGZvcm1zIGFuZCBwdXNoZXMgdG8gcGxhdGZvcm0gYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybXMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXRmb3JtQ291bnQ7IGkrKykge1xuICAgIGxldCBwbGF0Zm9ybUdhcCA9IDM5MDAgLyBwbGF0Zm9ybUNvdW50O1xuICAgIGxldCBuZXdQbGF0Qm90dG9tID0gMTAwICsgaSAqIHBsYXRmb3JtR2FwO1xuICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCBuZXdQbGF0Qm90dG9tKTtcbiAgICBwbGF0Zm9ybXMucHVzaChuZXdQbGF0Zm9ybSk7XG4gIH1cbn1cbi8vIE1vdmVzIFBsYXRmb3JtcyBieSBzdWJzdHJhY3RpbmcsIG9yIGFkZGluZyB0byB0aGUgUGxhdGZvcm0ncyBib3R0b20gcHJvcGVydHlcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUGxhdGZvcm1zKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgaWYgKCFnYW1lUGF1c2VkIHx8IHNvZnRQYXVzZWQpIHtcbiAgICBwbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIGlmIChpc0p1bXBpbmcpIHtcbiAgICAgICAgaWYgKHNvZnRQYXVzZWQpIHtcbiAgICAgICAgICBwbGF0Zm9ybS5ib3R0b20gLT0gMS41O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAzLjU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNGYWxsaW5nKSB7XG4gICAgICAgIHBsYXRmb3JtLmJvdHRvbSArPSAxO1xuICAgICAgfVxuICAgICAgbGV0IHZpc3VhbCA9IHBsYXRmb3JtLnZpc3VhbDtcbiAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuICAgICAgdXBkYXRlUGxhdGZvcm1zKHBsYXRmb3JtLCBncmlkKTtcbiAgICB9KTtcbiAgfVxufVxuLy8gUmVtb3ZlcyBvbGQgcGxhdGZvcm1zIGFuZCBjcmVhdGVzIG5ldyBwbGF0Zm9ybXMgdGhhdCBhcmUgdGhlbiBwdXNoZWQgdG8gcGxhdGZvcm0gYXJyYXlcbmZ1bmN0aW9uIHVwZGF0ZVBsYXRmb3JtcyhwbGF0Zm9ybSwgZ3JpZCkge1xuICBpZiAoIWdhbWVPdmVyKSB7XG4gICAgaWYgKHBsYXRmb3JtLmJvdHRvbSA8PSAtNTApIHtcbiAgICAgIGNvbnN0IHNjb3JlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgICAgY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgICBjb25zdCBtb3ZlbWVudFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZW1lbnQnKTtcbiAgICAgIGNvbnN0IHNob290VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG9vdCcpO1xuICAgICAgbGV0IGZpcnN0UGxhdGZvcm0gPSBwbGF0Zm9ybXNbMF0udmlzdWFsO1xuICAgICAgZmlyc3RQbGF0Zm9ybS5yZW1vdmUoKTtcbiAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgaWYgKCFzb2Z0UGF1c2VkKSB7XG4gICAgICAgIGdsb2JhbC5zY29yZSArPSAxO1xuICAgICAgICBzY29yZVRleHQuaW5uZXJIVE1MID0gZ2xvYmFsLnNjb3JlO1xuICAgICAgICB0aXRsZVRleHQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1vdmVtZW50VGV4dC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgc2hvb3RUZXh0LmlubmVySFRNTCA9ICcnO1xuICAgICAgfVxuICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIDM5MDApO1xuICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZW5kR2FtZSwgZ2FtZVBhdXNlZCB9IGZyb20gJy4vZ2FtZS5qcyc7XG5pbXBvcnQgeyBwbGF0Zm9ybXMgfSBmcm9tICcuL3BsYXRmb3JtLmpzJztcblxuY29uc3Qgc2xpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxubGV0IGlzR29pbmdMZWZ0ID0gZmFsc2U7XG5sZXQgaXNHb2luZ1JpZ2h0ID0gZmFsc2U7XG5cbmV4cG9ydCBsZXQgaXNKdW1waW5nID0gZmFsc2U7XG5leHBvcnQgbGV0IGlzRmFsbGluZyA9IHRydWU7XG5leHBvcnQgbGV0IHNsaW1lTGVmdFNwYWNlID0gMjgwO1xuZXhwb3J0IGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuZXhwb3J0IGxldCBzdGFydFBvaW50ID0gMjAwO1xuZXhwb3J0IGxldCBzbGltZUJvdHRvbVNwYWNlID0gc3RhcnRQb2ludDtcbmV4cG9ydCBsZXQgbGVmdFRpbWVySWQ7XG5leHBvcnQgbGV0IHJpZ2h0VGltZXJJZDtcbmV4cG9ydCBsZXQgdXBUaW1lcklkO1xuZXhwb3J0IGxldCBkb3duVGltZXJJZDtcblxuLy8gQ3JlYXRlICdTbGltZScgYW5kIGFkZCB0byB0aGUgZ3JpZC5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQoc2xpbWUpO1xuICBzbGltZS5jbGFzc0xpc3QuYWRkKCdzbGltZScpO1xuICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnO1xuICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4Jztcbn1cbi8vIEluIGNoYXJnZSBvZiBhZGRpbmcgdG8gdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgc2xpbWVGYWxsKClcbmV4cG9ydCBmdW5jdGlvbiBzbGltZUp1bXAoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpO1xuICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgaXNGYWxsaW5nID0gZmFsc2U7XG4gICAgdXBUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIHNsaW1lQm90dG9tU3BhY2UgKz0gMTtcbiAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDEwMCkgc2xpbWVGYWxsKCk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cbn1cbi8vIEluIGNoYXJnZSBvZiBzdWJ0cmFjdGluZyB0aGUgcGxheWVyJ3MgWSB2YWx1ZSBhbmQgY2FsbGluZyBlbmRHYW1lKClcbmZ1bmN0aW9uIHNsaW1lRmFsbCgpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpO1xuICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgIGlzRmFsbGluZyA9IHRydWU7XG4gICAgZG93blRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgc2xpbWVCb3R0b21TcGFjZSAtPSAyO1xuICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPD0gLTIwMCkgZW5kR2FtZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpKTtcbiAgICAgICAgcGxhdGZvcm1zLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XG4gICAgICAgICAgY29sbGlzaW9uRGV0ZWN0KHBsYXRmb3JtKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cbn1cbi8vIENoZWNrcyB0aGUgdmFsdWUgb2YgdGhlIGJvdHRvbSBvZiB0aGUgcGxheWVyLCBpZiBzYWlkIHZhbHVlIHJldHVybnMgdHJ1ZSBpdCBjYWxscyBzbGltZUp1bXAoKVxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0KHBsYXRmb3JtKSB7XG4gIGlmIChcbiAgICBzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSAmJlxuICAgIHNsaW1lQm90dG9tU3BhY2UgPD0gcGxhdGZvcm0uYm90dG9tICsgMTkgJiZcbiAgICBzbGltZUxlZnRTcGFjZSArIDQwID49IHBsYXRmb3JtLmxlZnQgJiZcbiAgICBzbGltZUxlZnRTcGFjZSA8PSBwbGF0Zm9ybS5sZWZ0ICsgMTAwICYmXG4gICAgIWlzSnVtcGluZ1xuICApIHtcbiAgICBzdGFydFBvaW50ID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICBzbGltZUp1bXAoKTtcbiAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICB9XG59XG4vLyBDYWxscyBtb3ZlTGVmdCgpIG9yIG1vdmVSaWdodCBkZXBlbmRpbmcgb24gcGxheWVyIGlucHV0LiAqVXNlcyBrZXlkb3duKlxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllck1vdmVtZW50cyhldmVudCkge1xuICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIG1vdmVMZWZ0KCk7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSBtb3ZlUmlnaHQoKTtcbiAgfVxufVxuLy8gQ2Vhc2VzIHBsYXllciBtb3ZlbWVudCBkZXBlbmRpbmcgb24ga2V5IHJlbGVhc2UuICpVc2VzIGtleXVwKlxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSB7XG4gICAgaXNHb2luZ0xlZnQgPSBmYWxzZTtcbiAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkge1xuICAgIGlzR29pbmdSaWdodCA9IGZhbHNlO1xuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgfVxufVxuLy8gRGVjcmVtZW50cyBwbGF5ZXIncyBYIHZhbHVlXG5mdW5jdGlvbiBtb3ZlTGVmdCgpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZCk7XG4gICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlzR29pbmdMZWZ0ID0gdHJ1ZTtcbiAgICBsZWZ0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAtNjApIHtcbiAgICAgICAgc2xpbWVMZWZ0U3BhY2UgLT0gMjtcbiAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgICAgIH0gZWxzZSBzbGltZUxlZnRTcGFjZSA9IDYwMDtcbiAgICB9LCAxKTtcbiAgfVxufVxuLy8gSW5jcmVtZW50cyBwbGF5ZXIncyBYIHZhbHVlXG5mdW5jdGlvbiBtb3ZlUmlnaHQoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICBpZiAoaXNHb2luZ0xlZnQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpO1xuICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZTtcbiAgICB9XG4gICAgaXNHb2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICByaWdodFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPD0gNjEwKSB7XG4gICAgICAgIHNsaW1lTGVmdFNwYWNlICs9IDI7XG4gICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSAtNjA7XG4gICAgfSwgMSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHNsaW1lTGVmdFNwYWNlLCBzbGltZUJvdHRvbVNwYWNlIH0gZnJvbSAnLi9wbGF5ZXIuanMnO1xuaW1wb3J0IHsgZW5lbXlzLCBraWxsRW5lbXkgfSBmcm9tICcuL2VuZW15LmpzJztcblxuZXhwb3J0IGxldCBidWxsZXRzID0gW107XG5cbmNsYXNzIEJ1bGxldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICB0aGlzLmxlZnQgPSBzbGltZUxlZnRTcGFjZTtcbiAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdidWxsZXQnKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgMTggKyAncHgnO1xuICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgMTIgKyAncHgnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyU2hvb3QoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgc2hvb3RCdWxsZXQoKTtcbiAgICBsZXQgbmV3QnVsbGV0ID0gbmV3IEJ1bGxldChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyksXG4gICAgICBldmVudC5jbGllbnRYLFxuICAgICAgZXZlbnQuY2xpZW50WVxuICAgICk7XG4gICAgYnVsbGV0cy5wdXNoKG5ld0J1bGxldCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob290QnVsbGV0KHgsIHkpIHtcbiAgYnVsbGV0cy5mb3JFYWNoKChidWxsZXQpID0+IHtcbiAgICBidWxsZXQuYm90dG9tIC09IDM7XG4gICAgbGV0IHZpc3VhbCA9IGJ1bGxldC52aXN1YWw7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGJ1bGxldC5ib3R0b20gKyAncHgnO1xuICAgIGVuZW15cy5mb3JFYWNoKChlbmVteSkgPT4ge1xuICAgICAgY29sbGlzaW9uRGV0ZWN0KGVuZW15LCBidWxsZXQuYm90dG9tLCBidWxsZXQubGVmdCk7XG4gICAgfSk7XG4gICAgaWYgKGJ1bGxldC5ib3R0b20gPD0gLTUwKSB7XG4gICAgICBsZXQgZmlyc3RCdWxsZXQgPSBidWxsZXRzWzBdLnZpc3VhbDtcbiAgICAgIGZpcnN0QnVsbGV0LnJlbW92ZSgpO1xuICAgICAgYnVsbGV0cy5zaGlmdCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdChlbmVteSwgYm90dG9tLCBsZWZ0KSB7XG4gIGlmIChcbiAgICBib3R0b20gPj0gZW5lbXkuYm90dG9tICYmXG4gICAgYm90dG9tIDw9IGVuZW15LmJvdHRvbSArIDE5ICYmXG4gICAgbGVmdCArIDQwID49IGVuZW15LmxlZnQgJiZcbiAgICBsZWZ0IDw9IGVuZW15LmxlZnQgKyAzMFxuICApIHtcbiAgICBpZiAoIWVuZW15LmtpbGxlZCkga2lsbEVuZW15KGVuZW15KTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBzdGFydCwgcGF1c2VHYW1lIH0gZnJvbSAnLi9zY3JpcHRzL2dhbWUuanMnO1xuXG5jb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgc3RhcnQoZ3JpZCk7XG4gIHBhdXNlR2FtZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiZ2FtZU92ZXIiLCJnYW1lUGF1c2VkIiwiZW5lbXlDb3VudCIsImVuZW15S2V5IiwiZW5lbXlzIiwiRW5lbXkiLCJncmlkIiwibmV3RW5lbXlCb3R0b20iLCJraWxsZWQiLCJib3R0b20iLCJsZWZ0IiwiTWF0aCIsInJhbmRvbSIsInZpc3VhbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUVuZW15cyIsInF1ZXJ5U2VsZWN0b3IiLCJpIiwiZW5lbXlHYXAiLCJjbGllbnRIZWlnaHQiLCJuZXdFbmVteSIsInB1c2giLCJtb3ZlRW5lbXlzIiwiZm9yRWFjaCIsImVuZW15IiwidXBkYXRlRW5lbXlzIiwic2NvcmVTdHlsZSIsInRyYW5zZm9ybSIsImJveFNoYWRvdyIsImNvbG9yIiwiZW5lbXlTdHlsZSIsImdldEVsZW1lbnRCeUlkIiwidHJhbnNpdGlvbiIsImJvcmRlciIsImZpcnN0RW5lbXkiLCJib3JkZXJJbWFnZSIsImdsb2JhbCIsInNjb3JlIiwicmVtb3ZlIiwic2hpZnQiLCJraWxsRW5lbXkiLCJjcmVhdGVQbGF5ZXIiLCJzbGltZUp1bXAiLCJwbGF5ZXJNb3ZlbWVudHMiLCJzdG9wUGxheWVyTW92ZW1lbnRzIiwidXBUaW1lcklkIiwiZG93blRpbWVySWQiLCJsZWZ0VGltZXJJZCIsInJpZ2h0VGltZXJJZCIsImNyZWF0ZVBsYXRmb3JtcyIsIm1vdmVQbGF0Zm9ybXMiLCJwbGF5ZXJTaG9vdCIsInNob290QnVsbGV0Iiwic29mdFBhdXNlZCIsInN0YXJ0Iiwic2V0SW50ZXJ2YWwiLCJhZGRFdmVudExpc3RlbmVyIiwicGxheWVyUGF1c2VHYW1lIiwicmVzdGFydCIsImV2ZW50IiwibWVudSIsImtleUNvZGUiLCJkaXNwbGF5IiwicGF1c2VHYW1lIiwiZW5kR2FtZSIsImNsZWFySW50ZXJ2YWwiLCJlbmRpbmdPbmVUZXh0IiwiZW5kaW5nVHdvVGV4dCIsImVuZGluZ1RocmVlVGV4dCIsIm9nU2NvcmUiLCJpbm5lckhUTUwiLCJsb2NhdGlvbiIsInJlbG9hZCIsImlzSnVtcGluZyIsImlzRmFsbGluZyIsInBsYXRmb3JtQ291bnQiLCJwbGF0Zm9ybXMiLCJQbGF0Zm9ybSIsIm5ld1BsYXRCb3R0b20iLCJwbGF0Zm9ybUdhcCIsIm5ld1BsYXRmb3JtIiwicGxhdGZvcm0iLCJ1cGRhdGVQbGF0Zm9ybXMiLCJzY29yZVRleHQiLCJ0aXRsZVRleHQiLCJtb3ZlbWVudFRleHQiLCJzaG9vdFRleHQiLCJmaXJzdFBsYXRmb3JtIiwic2xpbWUiLCJpc0dvaW5nTGVmdCIsImlzR29pbmdSaWdodCIsInNsaW1lTGVmdFNwYWNlIiwic3RhcnRQb2ludCIsInNsaW1lQm90dG9tU3BhY2UiLCJzbGltZUZhbGwiLCJjb2xsaXNpb25EZXRlY3QiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsImJ1bGxldHMiLCJCdWxsZXQiLCJuZXdCdWxsZXQiLCJjbGllbnRYIiwiY2xpZW50WSIsIngiLCJ5IiwiYnVsbGV0IiwiZmlyc3RCdWxsZXQiXSwic291cmNlUm9vdCI6IiJ9