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
    platform.visual.classList.add('turned');
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

    if (bullet.bottom <= -10) {
      visual.style.boxShadow = '0px 0px 150px 60px rgb(0, 94, 0)';
    }

    if (bullet.bottom <= -60) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFFQUMsSUFBSSxHQUFHLEVBQVAsSUFBYW9CLEtBQUssQ0FBQ3BCLElBRm5CLElBR0FBLElBQUksSUFBSW9CLEtBQUssQ0FBQ3BCLElBQU4sR0FBYSxFQUp2QixFQUtFO0FBQ0EsUUFBSSxDQUFDb0IsS0FBSyxDQUFDdEIsTUFBWCxFQUFtQnNDLG9EQUFTLENBQUNoQixLQUFELENBQVQ7QUFDcEI7QUFDRjs7Ozs7O1VDMUREO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBRUEsSUFBTXhCLElBQUksR0FBR1EsUUFBUSxDQUFDUSxhQUFULENBQXVCLE9BQXZCLENBQWI7QUFFQVIsUUFBUSxDQUFDZ0QsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbERGLEVBQUFBLHVEQUFLLENBQUN0RCxJQUFELENBQUw7QUFDQStELEVBQUFBLDJEQUFTO0FBQ1YsQ0FIRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZW5lbXkuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF0Zm9ybS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyU2hvb3QuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVPdmVyLCBnYW1lUGF1c2VkIH0gZnJvbSAnLi9nYW1lLmpzJztcblxubGV0IGVuZW15Q291bnQgPSAzO1xubGV0IGVuZW15S2V5ID0gMDtcblxuZXhwb3J0IGxldCBlbmVteXMgPSBbXTtcblxuLy8gU2V0cyBlbmVteSBwcm9wZXJ0aWVzXG5jbGFzcyBFbmVteSB7XG4gIGNvbnN0cnVjdG9yKGdyaWQsIG5ld0VuZW15Qm90dG9tKSB7XG4gICAgdGhpcy5raWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmJvdHRvbSA9IG5ld0VuZW15Qm90dG9tO1xuICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnZW5lbXknKTtcbiAgICB2aXN1YWwuaWQgPSBlbmVteUtleSArPSAxO1xuICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gdGhpcy5sZWZ0ICsgJ3B4JztcbiAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gdGhpcy5ib3R0b20gKyAncHgnO1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgfVxufVxuLy8gQ3JlYXRlcyBlbmVteXMgYW5kIHB1c2hlcyB0byBlbmVteSBhcnJheVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVuZW15cygpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXlDb3VudDsgaSsrKSB7XG4gICAgbGV0IGVuZW15R2FwID0gLWdyaWQuY2xpZW50SGVpZ2h0IC8gZW5lbXlDb3VudDtcbiAgICBsZXQgbmV3RW5lbXlCb3R0b20gPSAtMTIwICsgaSAqIGVuZW15R2FwO1xuICAgIGxldCBuZXdFbmVteSA9IG5ldyBFbmVteShncmlkLCBuZXdFbmVteUJvdHRvbSk7XG4gICAgZW5lbXlzLnB1c2gobmV3RW5lbXkpO1xuICB9XG59XG4vLyBNb3ZlcyBlbmVteXMgYnkgc3Vic3RyYWN0aW5nLCBvciBhZGRpbmcgdG8gdGhlIGVuZW15J3MgYm90dG9tIHByb3BlcnR5XG5leHBvcnQgZnVuY3Rpb24gbW92ZUVuZW15cygpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgZW5lbXlzLmZvckVhY2goKGVuZW15KSA9PiB7XG4gICAgICBlbmVteS5ib3R0b20gKz0gMC41NTtcbiAgICAgIGxldCB2aXN1YWwgPSBlbmVteS52aXN1YWw7XG4gICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gZW5lbXkuYm90dG9tICsgJ3B4JztcbiAgICAgIHVwZGF0ZUVuZW15cyhlbmVteSwgZ3JpZCk7XG4gICAgfSk7XG4gIH1cbn1cbi8vIFJlbW92ZXMgb2xkIGVuZW15cyBhbmQgY3JlYXRlcyBuZXcgZW5lbXlzIHRoYXQgYXJlIHRoZW4gcHVzaGVkIHRvIGVuZW15IGFycmF5XG5mdW5jdGlvbiB1cGRhdGVFbmVteXMoZW5lbXksIGdyaWQpIHtcbiAgaWYgKCFnYW1lT3Zlcikge1xuICAgIGxldCBzY29yZVN0eWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XG4gICAgaWYgKGVuZW15LmJvdHRvbSA+PSBncmlkLmNsaWVudEhlaWdodCkge1xuICAgICAgaWYgKCFlbmVteS5raWxsZWQpIHtcbiAgICAgICAgZ3JpZC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4wNiknO1xuICAgICAgICBncmlkLnN0eWxlLmJveFNoYWRvdyA9ICdpbnNldCAwcHggMTFweCAyMHB4IC0xMHB4IHJnYig5NCwgMCwgMCknO1xuICAgICAgICBzY29yZVN0eWxlLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgICAgIHNjb3JlU3R5bGUuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEuMDYpJztcbiAgICAgICAgbGV0IGVuZW15U3R5bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbmVteS52aXN1YWwuaWQpO1xuICAgICAgICBlbmVteVN0eWxlLnN0eWxlLnRyYW5zaXRpb24gPSAnMC4ycyc7XG4gICAgICAgIGVuZW15U3R5bGUuc3R5bGUuYm94U2hhZG93ID0gJzBweCAwcHggMTAwcHggNDBweCByZ2IoOTQsIDAsIDApJztcbiAgICAgICAgZ3JpZC5zdHlsZS5ib3JkZXIgPSAnNHB4IHNvbGlkIHJlZCc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmVteS5ib3R0b20gPj0gZ3JpZC5jbGllbnRIZWlnaHQgKyAyMCkge1xuICAgICAgbGV0IGZpcnN0RW5lbXkgPSBlbmVteXNbMF0udmlzdWFsO1xuICAgICAgaWYgKCFlbmVteS5raWxsZWQpIHtcbiAgICAgICAgZ3JpZC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4wKSc7XG4gICAgICAgIGdyaWQuc3R5bGUuYm94U2hhZG93ID0gJ2luc2V0IDBweCAwcHggMHB4IDBweCByZ2IoOTQsIDAsIDApJztcbiAgICAgICAgc2NvcmVTdHlsZS5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIHNjb3JlU3R5bGUuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEuMCknO1xuICAgICAgICBncmlkLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgcmVkJztcbiAgICAgICAgZ3JpZC5zdHlsZS5ib3JkZXJJbWFnZSA9XG4gICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCgwZGVnLCByZ2IoMjU1LCAwLCAwKSwgcmdiKDI2LCAyNiwgMjYpKSAxJztcbiAgICAgICAgZ2xvYmFsLnNjb3JlIC09IDIwO1xuICAgICAgfVxuICAgICAgZmlyc3RFbmVteS5yZW1vdmUoKTtcbiAgICAgIGVuZW15cy5zaGlmdCgpO1xuICAgICAgbGV0IG5ld0VuZW15ID0gbmV3IEVuZW15KGdyaWQsIC01MCk7XG4gICAgICBlbmVteXMucHVzaChuZXdFbmVteSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBraWxsRW5lbXkoZW5lbXkpIHtcbiAgZ2xvYmFsLnNjb3JlICs9IDEwO1xuICBlbmVteS5raWxsZWQgPSB0cnVlO1xuICBlbmVteS52aXN1YWwucmVtb3ZlKCk7XG59XG4iLCJpbXBvcnQge1xuICBjcmVhdGVQbGF5ZXIsXG4gIHNsaW1lSnVtcCxcbiAgcGxheWVyTW92ZW1lbnRzLFxuICBzdG9wUGxheWVyTW92ZW1lbnRzLFxuICB1cFRpbWVySWQsXG4gIGRvd25UaW1lcklkLFxuICBsZWZ0VGltZXJJZCxcbiAgcmlnaHRUaW1lcklkLFxufSBmcm9tICcuL3BsYXllci5qcyc7XG5pbXBvcnQgeyBjcmVhdGVQbGF0Zm9ybXMsIG1vdmVQbGF0Zm9ybXMgfSBmcm9tICcuL3BsYXRmb3JtLmpzJztcbmltcG9ydCB7IHBsYXllclNob290LCBzaG9vdEJ1bGxldCB9IGZyb20gJy4vcGxheWVyU2hvb3QuanMnO1xuaW1wb3J0IHsgY3JlYXRlRW5lbXlzLCBtb3ZlRW5lbXlzIH0gZnJvbSAnLi9lbmVteS5qcyc7XG5cbmV4cG9ydCBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbmV4cG9ydCBsZXQgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuZXhwb3J0IGxldCBzb2Z0UGF1c2VkID0gZmFsc2U7XG5cbi8vIEluIGNoYXJnZSBvZiBzdGFydGluZyB0aGUgZ2FtZSwgY2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBuZWVkZWQgZm9yIGJ1aWxkaW5nIGFuZCByZW5kZXJpbmcuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQoZ3JpZCkge1xuICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICBjcmVhdGVQbGF0Zm9ybXMoKTtcbiAgICBjcmVhdGVFbmVteXMoKTtcbiAgICBjcmVhdGVQbGF5ZXIoKTtcbiAgICBzZXRJbnRlcnZhbChtb3ZlUGxhdGZvcm1zLCAxKTtcbiAgICBzZXRJbnRlcnZhbChtb3ZlRW5lbXlzLCAxKTtcbiAgICBzZXRJbnRlcnZhbChzaG9vdEJ1bGxldCwgMSk7XG4gICAgc2xpbWVKdW1wKCk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyU2hvb3QpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJNb3ZlbWVudHMpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJQYXVzZUdhbWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCByZXN0YXJ0KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN0b3BQbGF5ZXJNb3ZlbWVudHMpO1xuICB9XG59XG4vLyBQYXVzZXMgZ2FtZSBieSBzZXR0aW5nIGV4cG9ydGVkIHZhcmlhYmxlIHRvIGRlc2lyZWQgZ2FtZSBzdGF0ZVxuZnVuY3Rpb24gcGxheWVyUGF1c2VHYW1lKGV2ZW50KSB7XG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gIGlmIChldmVudC5rZXlDb2RlID09PSAzMiAmJiAhZ2FtZVBhdXNlZCkge1xuICAgIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgJiYgZ2FtZVBhdXNlZCkge1xuICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lUGF1c2VkID0gZmFsc2U7XG4gICAgc29mdFBhdXNlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXVzZUdhbWUoKSB7XG4gIGdhbWVQYXVzZWQgPSB0cnVlO1xuICBzb2Z0UGF1c2VkID0gdHJ1ZTtcbn1cbi8vIEVuZHMgZ2FtZSBieSBjbGVhcmluZyB0aGUgZ3JpZCBhbmQgVGltZXJJZHNcbmV4cG9ydCBmdW5jdGlvbiBlbmRHYW1lKCkge1xuICBnYW1lT3ZlciA9IHRydWU7XG4gIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKTtcbiAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZCk7XG4gIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpO1xuICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gIGNvbnN0IGVuZGluZ09uZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lRW5kaW5nJyk7XG4gIGNvbnN0IGVuZGluZ1R3b1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHdvRW5kaW5nJyk7XG4gIGNvbnN0IGVuZGluZ1RocmVlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maW5hbFNjb3JlJyk7XG4gIGNvbnN0IG9nU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcbiAgb2dTY29yZS5pbm5lckhUTUwgPSAnJztcbiAgZW5kaW5nT25lVGV4dC5pbm5lckhUTUwgPSBcIml0IHdhc24ndCBlbm91Z2hcIjtcbiAgZW5kaW5nVHdvVGV4dC5pbm5lckhUTUwgPSAncHJlc3MgUiB0byB0cnkgYWdhaW4nO1xuICBlbmRpbmdUaHJlZVRleHQuaW5uZXJIVE1MID0gYGZpbmFsIHNjb3JlOiAke2dsb2JhbC5zY29yZX1gO1xufVxuLy8gUmVzdGFydHMgZ2FtZSB2aWEgcmVsb2FkaW5nIHBhZ2VcbmZ1bmN0aW9uIHJlc3RhcnQoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDgyKSB7XG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGdhbWVPdmVyLCBnYW1lUGF1c2VkLCBzb2Z0UGF1c2VkIH0gZnJvbSAnLi9nYW1lLmpzJztcbmltcG9ydCB7IGlzSnVtcGluZywgaXNGYWxsaW5nIH0gZnJvbSAnLi9wbGF5ZXIuanMnO1xuXG5sZXQgcGxhdGZvcm1Db3VudCA9IDIyO1xuXG5nbG9iYWwuc2NvcmUgPSAxO1xuZXhwb3J0IGxldCBwbGF0Zm9ybXMgPSBbXTtcblxuLy8gU2V0cyBQbGF0Zm9ybSBwcm9wZXJ0aWVzXG5jbGFzcyBQbGF0Zm9ybSB7XG4gIGNvbnN0cnVjdG9yKGdyaWQsIG5ld1BsYXRCb3R0b20pIHtcbiAgICB0aGlzLmJvdHRvbSA9IG5ld1BsYXRCb3R0b207XG4gICAgdGhpcy5sZWZ0ID0gTWF0aC5yYW5kb20oKSAqIDQ1MDtcbiAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdwbGF0Zm9ybScpO1xuICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gdGhpcy5sZWZ0ICsgJ3B4JztcbiAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gdGhpcy5ib3R0b20gKyAncHgnO1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgfVxufVxuLy8gQ3JlYXRlcyBwbGF0Zm9ybXMgYW5kIHB1c2hlcyB0byBwbGF0Zm9ybSBhcnJheVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXRmb3JtcygpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhdGZvcm1Db3VudDsgaSsrKSB7XG4gICAgbGV0IHBsYXRmb3JtR2FwID0gMzkwMCAvIHBsYXRmb3JtQ291bnQ7XG4gICAgbGV0IG5ld1BsYXRCb3R0b20gPSAxMDAgKyBpICogcGxhdGZvcm1HYXA7XG4gICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIG5ld1BsYXRCb3R0b20pO1xuICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKTtcbiAgfVxufVxuLy8gTW92ZXMgUGxhdGZvcm1zIGJ5IHN1YnN0cmFjdGluZywgb3IgYWRkaW5nIHRvIHRoZSBQbGF0Zm9ybSdzIGJvdHRvbSBwcm9wZXJ0eVxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVQbGF0Zm9ybXMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICBpZiAoIWdhbWVQYXVzZWQgfHwgc29mdFBhdXNlZCkge1xuICAgIHBsYXRmb3Jtcy5mb3JFYWNoKChwbGF0Zm9ybSkgPT4ge1xuICAgICAgaWYgKGlzSnVtcGluZykge1xuICAgICAgICBpZiAoc29mdFBhdXNlZCkge1xuICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAxLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDMuNTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0ZhbGxpbmcpIHtcbiAgICAgICAgcGxhdGZvcm0uYm90dG9tICs9IDE7XG4gICAgICB9XG4gICAgICBsZXQgdmlzdWFsID0gcGxhdGZvcm0udmlzdWFsO1xuICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHBsYXRmb3JtLmJvdHRvbSArICdweCc7XG4gICAgICB1cGRhdGVQbGF0Zm9ybXMocGxhdGZvcm0sIGdyaWQpO1xuICAgIH0pO1xuICB9XG59XG4vLyBSZW1vdmVzIG9sZCBwbGF0Zm9ybXMgYW5kIGNyZWF0ZXMgbmV3IHBsYXRmb3JtcyB0aGF0IGFyZSB0aGVuIHB1c2hlZCB0byBwbGF0Zm9ybSBhcnJheVxuZnVuY3Rpb24gdXBkYXRlUGxhdGZvcm1zKHBsYXRmb3JtLCBncmlkKSB7XG4gIGlmICghZ2FtZU92ZXIpIHtcbiAgICBpZiAocGxhdGZvcm0uYm90dG9tIDw9IC01MCkge1xuICAgICAgY29uc3Qgc2NvcmVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XG4gICAgICBjb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKTtcbiAgICAgIGNvbnN0IG1vdmVtZW50VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZlbWVudCcpO1xuICAgICAgY29uc3Qgc2hvb3RUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNob290Jyk7XG4gICAgICBsZXQgZmlyc3RQbGF0Zm9ybSA9IHBsYXRmb3Jtc1swXS52aXN1YWw7XG4gICAgICBmaXJzdFBsYXRmb3JtLnJlbW92ZSgpO1xuICAgICAgcGxhdGZvcm1zLnNoaWZ0KCk7XG4gICAgICBpZiAoIXNvZnRQYXVzZWQpIHtcbiAgICAgICAgZ2xvYmFsLnNjb3JlICs9IDE7XG4gICAgICAgIHNjb3JlVGV4dC5pbm5lckhUTUwgPSBnbG9iYWwuc2NvcmU7XG4gICAgICAgIHRpdGxlVGV4dC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbW92ZW1lbnRUZXh0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBzaG9vdFRleHQuaW5uZXJIVE1MID0gJyc7XG4gICAgICB9XG4gICAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgMzkwMCk7XG4gICAgICBwbGF0Zm9ybXMucHVzaChuZXdQbGF0Zm9ybSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBlbmRHYW1lLCBnYW1lUGF1c2VkIH0gZnJvbSAnLi9nYW1lLmpzJztcbmltcG9ydCB7IHBsYXRmb3JtcyB9IGZyb20gJy4vcGxhdGZvcm0uanMnO1xuXG5jb25zdCBzbGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5sZXQgaXNHb2luZ0xlZnQgPSBmYWxzZTtcbmxldCBpc0dvaW5nUmlnaHQgPSBmYWxzZTtcblxuZXhwb3J0IGxldCBpc0p1bXBpbmcgPSBmYWxzZTtcbmV4cG9ydCBsZXQgaXNGYWxsaW5nID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc2xpbWVMZWZ0U3BhY2UgPSAyODA7XG5leHBvcnQgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG5leHBvcnQgbGV0IHN0YXJ0UG9pbnQgPSAyMDA7XG5leHBvcnQgbGV0IHNsaW1lQm90dG9tU3BhY2UgPSBzdGFydFBvaW50O1xuZXhwb3J0IGxldCBsZWZ0VGltZXJJZDtcbmV4cG9ydCBsZXQgcmlnaHRUaW1lcklkO1xuZXhwb3J0IGxldCB1cFRpbWVySWQ7XG5leHBvcnQgbGV0IGRvd25UaW1lcklkO1xuXG4vLyBDcmVhdGUgJ1NsaW1lJyBhbmQgYWRkIHRvIHRoZSBncmlkLlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKS5hcHBlbmRDaGlsZChzbGltZSk7XG4gIHNsaW1lLmNsYXNzTGlzdC5hZGQoJ3NsaW1lJyk7XG4gIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xufVxuLy8gSW4gY2hhcmdlIG9mIGFkZGluZyB0byB0aGUgcGxheWVyJ3MgWSB2YWx1ZSBhbmQgY2FsbGluZyBzbGltZUZhbGwoKVxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lSnVtcCgpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZCk7XG4gICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICBpc0ZhbGxpbmcgPSBmYWxzZTtcbiAgICB1cFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgc2xpbWVCb3R0b21TcGFjZSArPSAxO1xuICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPiBzdGFydFBvaW50ICsgMTAwKSBzbGltZUZhbGwoKTtcbiAgICAgIH1cbiAgICB9LCAxKTtcbiAgfVxufVxuLy8gSW4gY2hhcmdlIG9mIHN1YnRyYWN0aW5nIHRoZSBwbGF5ZXIncyBZIHZhbHVlIGFuZCBjYWxsaW5nIGVuZEdhbWUoKVxuZnVuY3Rpb24gc2xpbWVGYWxsKCkge1xuICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICBjbGVhckludGVydmFsKHVwVGltZXJJZCk7XG4gICAgaXNKdW1waW5nID0gZmFsc2U7XG4gICAgaXNGYWxsaW5nID0gdHJ1ZTtcbiAgICBkb3duVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBzbGltZUJvdHRvbVNwYWNlIC09IDI7XG4gICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICBpZiAoc2xpbWVCb3R0b21TcGFjZSA8PSAtMjAwKSBlbmRHYW1lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykpO1xuICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgICAgICBjb2xsaXNpb25EZXRlY3QocGxhdGZvcm0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAxKTtcbiAgfVxufVxuLy8gQ2hlY2tzIHRoZSB2YWx1ZSBvZiB0aGUgYm90dG9tIG9mIHRoZSBwbGF5ZXIsIGlmIHNhaWQgdmFsdWUgcmV0dXJucyB0cnVlIGl0IGNhbGxzIHNsaW1lSnVtcCgpXG5mdW5jdGlvbiBjb2xsaXNpb25EZXRlY3QocGxhdGZvcm0pIHtcbiAgaWYgKFxuICAgIHNsaW1lQm90dG9tU3BhY2UgPj0gcGxhdGZvcm0uYm90dG9tICYmXG4gICAgc2xpbWVCb3R0b21TcGFjZSA8PSBwbGF0Zm9ybS5ib3R0b20gKyAxOSAmJlxuICAgIHNsaW1lTGVmdFNwYWNlICsgNDAgPj0gcGxhdGZvcm0ubGVmdCAmJlxuICAgIHNsaW1lTGVmdFNwYWNlIDw9IHBsYXRmb3JtLmxlZnQgKyAxMDAgJiZcbiAgICAhaXNKdW1waW5nXG4gICkge1xuICAgIHBsYXRmb3JtLnZpc3VhbC5jbGFzc0xpc3QuYWRkKCd0dXJuZWQnKTtcbiAgICBzdGFydFBvaW50ID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICBzbGltZUp1bXAoKTtcbiAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICB9XG59XG4vLyBDYWxscyBtb3ZlTGVmdCgpIG9yIG1vdmVSaWdodCBkZXBlbmRpbmcgb24gcGxheWVyIGlucHV0LiAqVXNlcyBrZXlkb3duKlxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllck1vdmVtZW50cyhldmVudCkge1xuICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIG1vdmVMZWZ0KCk7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSBtb3ZlUmlnaHQoKTtcbiAgfVxufVxuLy8gQ2Vhc2VzIHBsYXllciBtb3ZlbWVudCBkZXBlbmRpbmcgb24ga2V5IHJlbGVhc2UuICpVc2VzIGtleXVwKlxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSB7XG4gICAgaXNHb2luZ0xlZnQgPSBmYWxzZTtcbiAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkge1xuICAgIGlzR29pbmdSaWdodCA9IGZhbHNlO1xuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgfVxufVxuLy8gRGVjcmVtZW50cyBwbGF5ZXIncyBYIHZhbHVlXG5mdW5jdGlvbiBtb3ZlTGVmdCgpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZCk7XG4gICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlzR29pbmdMZWZ0ID0gdHJ1ZTtcbiAgICBsZWZ0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAtNjApIHtcbiAgICAgICAgc2xpbWVMZWZ0U3BhY2UgLT0gMjtcbiAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgICAgIH0gZWxzZSBzbGltZUxlZnRTcGFjZSA9IDYwMDtcbiAgICB9LCAxKTtcbiAgfVxufVxuLy8gSW5jcmVtZW50cyBwbGF5ZXIncyBYIHZhbHVlXG5mdW5jdGlvbiBtb3ZlUmlnaHQoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICBpZiAoaXNHb2luZ0xlZnQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpO1xuICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZTtcbiAgICB9XG4gICAgaXNHb2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICByaWdodFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPD0gNjEwKSB7XG4gICAgICAgIHNsaW1lTGVmdFNwYWNlICs9IDI7XG4gICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSAtNjA7XG4gICAgfSwgMSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHNsaW1lTGVmdFNwYWNlLCBzbGltZUJvdHRvbVNwYWNlIH0gZnJvbSAnLi9wbGF5ZXIuanMnO1xuaW1wb3J0IHsgZW5lbXlzLCBraWxsRW5lbXkgfSBmcm9tICcuL2VuZW15LmpzJztcblxuZXhwb3J0IGxldCBidWxsZXRzID0gW107XG5cbmNsYXNzIEJ1bGxldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICB0aGlzLmxlZnQgPSBzbGltZUxlZnRTcGFjZTtcbiAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdidWxsZXQnKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgMTggKyAncHgnO1xuICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgMTIgKyAncHgnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyU2hvb3QoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgc2hvb3RCdWxsZXQoKTtcbiAgICBsZXQgbmV3QnVsbGV0ID0gbmV3IEJ1bGxldChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyksXG4gICAgICBldmVudC5jbGllbnRYLFxuICAgICAgZXZlbnQuY2xpZW50WVxuICAgICk7XG4gICAgYnVsbGV0cy5wdXNoKG5ld0J1bGxldCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob290QnVsbGV0KHgsIHkpIHtcbiAgYnVsbGV0cy5mb3JFYWNoKChidWxsZXQpID0+IHtcbiAgICBidWxsZXQuYm90dG9tIC09IDM7XG4gICAgbGV0IHZpc3VhbCA9IGJ1bGxldC52aXN1YWw7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGJ1bGxldC5ib3R0b20gKyAncHgnO1xuICAgIGVuZW15cy5mb3JFYWNoKChlbmVteSkgPT4ge1xuICAgICAgY29sbGlzaW9uRGV0ZWN0KGVuZW15LCBidWxsZXQuYm90dG9tLCBidWxsZXQubGVmdCk7XG4gICAgfSk7XG4gICAgaWYgKGJ1bGxldC5ib3R0b20gPD0gLTEwKSB7XG4gICAgICB2aXN1YWwuc3R5bGUuYm94U2hhZG93ID0gJzBweCAwcHggMTUwcHggNjBweCByZ2IoMCwgOTQsIDApJztcbiAgICB9XG4gICAgaWYgKGJ1bGxldC5ib3R0b20gPD0gLTYwKSB7XG4gICAgICBsZXQgZmlyc3RCdWxsZXQgPSBidWxsZXRzWzBdLnZpc3VhbDtcbiAgICAgIGZpcnN0QnVsbGV0LnJlbW92ZSgpO1xuICAgICAgYnVsbGV0cy5zaGlmdCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdChlbmVteSwgYm90dG9tLCBsZWZ0KSB7XG4gIGlmIChcbiAgICBib3R0b20gPj0gZW5lbXkuYm90dG9tICYmXG4gICAgYm90dG9tIDw9IGVuZW15LmJvdHRvbSArIDE5ICYmXG4gICAgbGVmdCArIDQwID49IGVuZW15LmxlZnQgJiZcbiAgICBsZWZ0IDw9IGVuZW15LmxlZnQgKyAzMFxuICApIHtcbiAgICBpZiAoIWVuZW15LmtpbGxlZCkga2lsbEVuZW15KGVuZW15KTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBzdGFydCwgcGF1c2VHYW1lIH0gZnJvbSAnLi9zY3JpcHRzL2dhbWUuanMnO1xuXG5jb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgc3RhcnQoZ3JpZCk7XG4gIHBhdXNlR2FtZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiZ2FtZU92ZXIiLCJnYW1lUGF1c2VkIiwiZW5lbXlDb3VudCIsImVuZW15S2V5IiwiZW5lbXlzIiwiRW5lbXkiLCJncmlkIiwibmV3RW5lbXlCb3R0b20iLCJraWxsZWQiLCJib3R0b20iLCJsZWZ0IiwiTWF0aCIsInJhbmRvbSIsInZpc3VhbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUVuZW15cyIsInF1ZXJ5U2VsZWN0b3IiLCJpIiwiZW5lbXlHYXAiLCJjbGllbnRIZWlnaHQiLCJuZXdFbmVteSIsInB1c2giLCJtb3ZlRW5lbXlzIiwiZm9yRWFjaCIsImVuZW15IiwidXBkYXRlRW5lbXlzIiwic2NvcmVTdHlsZSIsInRyYW5zZm9ybSIsImJveFNoYWRvdyIsImNvbG9yIiwiZW5lbXlTdHlsZSIsImdldEVsZW1lbnRCeUlkIiwidHJhbnNpdGlvbiIsImJvcmRlciIsImZpcnN0RW5lbXkiLCJib3JkZXJJbWFnZSIsImdsb2JhbCIsInNjb3JlIiwicmVtb3ZlIiwic2hpZnQiLCJraWxsRW5lbXkiLCJjcmVhdGVQbGF5ZXIiLCJzbGltZUp1bXAiLCJwbGF5ZXJNb3ZlbWVudHMiLCJzdG9wUGxheWVyTW92ZW1lbnRzIiwidXBUaW1lcklkIiwiZG93blRpbWVySWQiLCJsZWZ0VGltZXJJZCIsInJpZ2h0VGltZXJJZCIsImNyZWF0ZVBsYXRmb3JtcyIsIm1vdmVQbGF0Zm9ybXMiLCJwbGF5ZXJTaG9vdCIsInNob290QnVsbGV0Iiwic29mdFBhdXNlZCIsInN0YXJ0Iiwic2V0SW50ZXJ2YWwiLCJhZGRFdmVudExpc3RlbmVyIiwicGxheWVyUGF1c2VHYW1lIiwicmVzdGFydCIsImV2ZW50IiwibWVudSIsImtleUNvZGUiLCJkaXNwbGF5IiwicGF1c2VHYW1lIiwiZW5kR2FtZSIsImNsZWFySW50ZXJ2YWwiLCJlbmRpbmdPbmVUZXh0IiwiZW5kaW5nVHdvVGV4dCIsImVuZGluZ1RocmVlVGV4dCIsIm9nU2NvcmUiLCJpbm5lckhUTUwiLCJsb2NhdGlvbiIsInJlbG9hZCIsImlzSnVtcGluZyIsImlzRmFsbGluZyIsInBsYXRmb3JtQ291bnQiLCJwbGF0Zm9ybXMiLCJQbGF0Zm9ybSIsIm5ld1BsYXRCb3R0b20iLCJwbGF0Zm9ybUdhcCIsIm5ld1BsYXRmb3JtIiwicGxhdGZvcm0iLCJ1cGRhdGVQbGF0Zm9ybXMiLCJzY29yZVRleHQiLCJ0aXRsZVRleHQiLCJtb3ZlbWVudFRleHQiLCJzaG9vdFRleHQiLCJmaXJzdFBsYXRmb3JtIiwic2xpbWUiLCJpc0dvaW5nTGVmdCIsImlzR29pbmdSaWdodCIsInNsaW1lTGVmdFNwYWNlIiwic3RhcnRQb2ludCIsInNsaW1lQm90dG9tU3BhY2UiLCJzbGltZUZhbGwiLCJjb2xsaXNpb25EZXRlY3QiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsImJ1bGxldHMiLCJCdWxsZXQiLCJuZXdCdWxsZXQiLCJjbGllbnRYIiwiY2xpZW50WSIsIngiLCJ5IiwiYnVsbGV0IiwiZmlyc3RCdWxsZXQiXSwic291cmNlUm9vdCI6IiJ9