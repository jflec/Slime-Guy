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
      if (!enemy.killed) __webpack_require__.g.score -= 20;
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
        scoreText.innerHTML = __webpack_require__.g.score + 'm';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFJRSxVQUFVLEdBQUcsQ0FBakI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUVPLElBQUlDLE1BQU0sR0FBRyxFQUFiLEVBRVA7O0lBQ01DLFFBQ0osZUFBWUMsSUFBWixFQUFrQkMsY0FBbEIsRUFBa0M7QUFBQTs7QUFDaEMsT0FBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDQSxPQUFLQyxNQUFMLEdBQWNGLGNBQWQ7QUFDQSxPQUFLRyxJQUFMLEdBQVlDLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixHQUE1QjtBQUNBLE9BQUtDLE1BQUwsR0FBY0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWQ7QUFDQSxNQUFNRixNQUFNLEdBQUcsS0FBS0EsTUFBcEI7QUFDQUEsRUFBQUEsTUFBTSxDQUFDRyxTQUFQLENBQWlCQyxHQUFqQixDQUFxQixPQUFyQjtBQUNBSixFQUFBQSxNQUFNLENBQUNLLEtBQVAsQ0FBYVIsSUFBYixHQUFvQixLQUFLQSxJQUFMLEdBQVksSUFBaEM7QUFDQUcsRUFBQUEsTUFBTSxDQUFDSyxLQUFQLENBQWFULE1BQWIsR0FBc0IsS0FBS0EsTUFBTCxHQUFjLElBQXBDO0FBQ0FILEVBQUFBLElBQUksQ0FBQ2EsV0FBTCxDQUFpQk4sTUFBakI7QUFDRCxHQUVIOzs7QUFDTyxTQUFTTyxZQUFULEdBQXdCO0FBQzdCLE1BQU1kLElBQUksR0FBR1EsUUFBUSxDQUFDTyxhQUFULENBQXVCLE9BQXZCLENBQWI7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcEIsVUFBcEIsRUFBZ0NvQixDQUFDLEVBQWpDLEVBQXFDO0FBQ25DLFFBQUlDLFFBQVEsR0FBRyxDQUFDakIsSUFBSSxDQUFDa0IsWUFBTixHQUFxQnRCLFVBQXBDO0FBQ0EsUUFBSUssY0FBYyxHQUFHLENBQUMsR0FBRCxHQUFPZSxDQUFDLEdBQUdDLFFBQWhDO0FBQ0EsUUFBSUUsUUFBUSxHQUFHLElBQUlwQixLQUFKLENBQVVDLElBQVYsRUFBZ0JDLGNBQWhCLENBQWY7QUFDQUgsSUFBQUEsTUFBTSxDQUFDc0IsSUFBUCxDQUFZRCxRQUFaO0FBQ0Q7QUFDRixFQUNEOztBQUNPLFNBQVNFLFVBQVQsR0FBc0I7QUFDM0IsTUFBSSxDQUFDMUIsZ0RBQUwsRUFBaUI7QUFDZixRQUFNSyxJQUFJLEdBQUdRLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixPQUF2QixDQUFiO0FBQ0FqQixJQUFBQSxNQUFNLENBQUN3QixPQUFQLENBQWUsVUFBQ0MsS0FBRCxFQUFXO0FBQ3hCQSxNQUFBQSxLQUFLLENBQUNwQixNQUFOLElBQWdCLElBQWhCO0FBQ0EsVUFBSUksTUFBTSxHQUFHZ0IsS0FBSyxDQUFDaEIsTUFBbkI7QUFDQUEsTUFBQUEsTUFBTSxDQUFDSyxLQUFQLENBQWFULE1BQWIsR0FBc0JvQixLQUFLLENBQUNwQixNQUFOLEdBQWUsSUFBckM7QUFDQXFCLE1BQUFBLFlBQVksQ0FBQ0QsS0FBRCxFQUFRdkIsSUFBUixDQUFaO0FBQ0QsS0FMRDtBQU1EO0FBQ0YsRUFDRDs7QUFDQSxTQUFTd0IsWUFBVCxDQUFzQkQsS0FBdEIsRUFBNkJ2QixJQUE3QixFQUFtQztBQUNqQyxNQUFJLENBQUNOLDhDQUFMLEVBQWU7QUFDYixRQUFJNkIsS0FBSyxDQUFDcEIsTUFBTixJQUFnQkgsSUFBSSxDQUFDa0IsWUFBekIsRUFBdUM7QUFDckMsVUFBSU8sVUFBVSxHQUFHM0IsTUFBTSxDQUFDLENBQUQsQ0FBTixDQUFVUyxNQUEzQjtBQUNBLFVBQUksQ0FBQ2dCLEtBQUssQ0FBQ3JCLE1BQVgsRUFBbUJ3QixxQkFBTSxDQUFDQyxLQUFQLElBQWdCLEVBQWhCO0FBQ25CRixNQUFBQSxVQUFVLENBQUNHLE1BQVg7QUFDQTlCLE1BQUFBLE1BQU0sQ0FBQytCLEtBQVA7QUFDQSxVQUFJVixRQUFRLEdBQUcsSUFBSXBCLEtBQUosQ0FBVUMsSUFBVixFQUFnQixDQUFDLEVBQWpCLENBQWY7QUFDQUYsTUFBQUEsTUFBTSxDQUFDc0IsSUFBUCxDQUFZRCxRQUFaO0FBQ0Q7QUFDRjtBQUNGOztBQUVNLFNBQVNXLFNBQVQsQ0FBbUJQLEtBQW5CLEVBQTBCO0FBQy9CRyxFQUFBQSxxQkFBTSxDQUFDQyxLQUFQLElBQWdCLEVBQWhCO0FBQ0FKLEVBQUFBLEtBQUssQ0FBQ3JCLE1BQU4sR0FBZSxJQUFmO0FBQ0FxQixFQUFBQSxLQUFLLENBQUNoQixNQUFOLENBQWFxQixNQUFiO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0REO0FBVUE7QUFDQTtBQUNBO0FBRU8sSUFBSWxDLFFBQVEsR0FBRyxLQUFmO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEtBQWpCO0FBQ0EsSUFBSWdELFVBQVUsR0FBRyxLQUFqQixFQUVQOztBQUNPLFNBQVNDLEtBQVQsQ0FBZTVDLElBQWYsRUFBcUI7QUFDMUIsTUFBSSxDQUFDTCxVQUFMLEVBQWlCO0FBQ2Y0QyxJQUFBQSw2REFBZTtBQUNmekIsSUFBQUEsdURBQVk7QUFDWmlCLElBQUFBLHdEQUFZO0FBQ1pjLElBQUFBLFdBQVcsQ0FBQ0wsdURBQUQsRUFBZ0IsQ0FBaEIsQ0FBWDtBQUNBSyxJQUFBQSxXQUFXLENBQUN4QixpREFBRCxFQUFhLENBQWIsQ0FBWDtBQUNBd0IsSUFBQUEsV0FBVyxDQUFDSCx3REFBRCxFQUFjLENBQWQsQ0FBWDtBQUNBVixJQUFBQSxxREFBUztBQUVUeEIsSUFBQUEsUUFBUSxDQUFDc0MsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUNMLHdEQUFyQztBQUNBakMsSUFBQUEsUUFBUSxDQUFDc0MsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUNiLHVEQUFyQztBQUNBekIsSUFBQUEsUUFBUSxDQUFDc0MsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUNDLGVBQXJDO0FBQ0F2QyxJQUFBQSxRQUFRLENBQUNzQyxnQkFBVCxDQUEwQixTQUExQixFQUFxQ0UsT0FBckM7QUFDQXhDLElBQUFBLFFBQVEsQ0FBQ3NDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DWiwyREFBbkM7QUFDRDtBQUNGLEVBQ0Q7O0FBQ0EsU0FBU2EsZUFBVCxDQUF5QkUsS0FBekIsRUFBZ0M7QUFDOUIsTUFBTUMsSUFBSSxHQUFHMUMsUUFBUSxDQUFDTyxhQUFULENBQXVCLE9BQXZCLENBQWI7O0FBRUEsTUFBSWtDLEtBQUssQ0FBQ0UsT0FBTixLQUFrQixFQUFsQixJQUF3QixDQUFDeEQsVUFBN0IsRUFBeUM7QUFDdkNBLElBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0F1RCxJQUFBQSxJQUFJLENBQUN0QyxLQUFMLENBQVd3QyxPQUFYLEdBQXFCLE9BQXJCO0FBQ0QsR0FIRCxNQUdPLElBQUlILEtBQUssQ0FBQ0UsT0FBTixLQUFrQixFQUFsQixJQUF3QnhELFVBQTVCLEVBQXdDO0FBQzdDdUQsSUFBQUEsSUFBSSxDQUFDdEMsS0FBTCxDQUFXd0MsT0FBWCxHQUFxQixNQUFyQjtBQUNBekQsSUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQWdELElBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0Q7QUFDRjs7QUFFTSxTQUFTVSxTQUFULEdBQXFCO0FBQzFCMUQsRUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQWdELEVBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0QsRUFDRDs7QUFDTyxTQUFTVyxPQUFULEdBQW1CO0FBQ3hCNUQsRUFBQUEsUUFBUSxHQUFHLElBQVg7QUFDQTZELEVBQUFBLGFBQWEsQ0FBQ3BCLGlEQUFELENBQWI7QUFDQW9CLEVBQUFBLGFBQWEsQ0FBQ25CLG1EQUFELENBQWI7QUFDQW1CLEVBQUFBLGFBQWEsQ0FBQ2xCLG1EQUFELENBQWI7QUFDQWtCLEVBQUFBLGFBQWEsQ0FBQ2pCLG9EQUFELENBQWI7QUFDQSxNQUFNa0IsYUFBYSxHQUFHaEQsUUFBUSxDQUFDTyxhQUFULENBQXVCLFlBQXZCLENBQXRCO0FBQ0EsTUFBTTBDLGFBQWEsR0FBR2pELFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixZQUF2QixDQUF0QjtBQUNBLE1BQU0yQyxlQUFlLEdBQUdsRCxRQUFRLENBQUNPLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBeEI7QUFDQSxNQUFNNEMsT0FBTyxHQUFHbkQsUUFBUSxDQUFDTyxhQUFULENBQXVCLFFBQXZCLENBQWhCO0FBQ0E0QyxFQUFBQSxPQUFPLENBQUNDLFNBQVIsR0FBb0IsRUFBcEI7QUFDQUosRUFBQUEsYUFBYSxDQUFDSSxTQUFkLEdBQTBCLGtCQUExQjtBQUNBSCxFQUFBQSxhQUFhLENBQUNHLFNBQWQsR0FBMEIsc0JBQTFCO0FBQ0FGLEVBQUFBLGVBQWUsQ0FBQ0UsU0FBaEIsMEJBQTRDbEMscUJBQU0sQ0FBQ0MsS0FBbkQ7QUFDRCxFQUNEOztBQUNBLFNBQVNxQixPQUFULENBQWlCQyxLQUFqQixFQUF3QjtBQUN0QixNQUFJQSxLQUFLLENBQUNFLE9BQU4sS0FBa0IsRUFBdEIsRUFBMEI7QUFDeEJVLElBQUFBLFFBQVEsQ0FBQ0MsTUFBVDtBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0VEO0FBQ0E7QUFFQSxJQUFJRyxhQUFhLEdBQUcsRUFBcEI7QUFFQXZDLHFCQUFNLENBQUNDLEtBQVAsR0FBZSxDQUFmO0FBQ08sSUFBSXVDLFNBQVMsR0FBRyxFQUFoQixFQUVQOztJQUNNQyxXQUNKLGtCQUFZbkUsSUFBWixFQUFrQm9FLGFBQWxCLEVBQWlDO0FBQUE7O0FBQy9CLE9BQUtqRSxNQUFMLEdBQWNpRSxhQUFkO0FBQ0EsT0FBS2hFLElBQUwsR0FBWUMsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLEdBQTVCO0FBQ0EsT0FBS0MsTUFBTCxHQUFjQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDtBQUNBLE1BQU1GLE1BQU0sR0FBRyxLQUFLQSxNQUFwQjtBQUNBQSxFQUFBQSxNQUFNLENBQUNHLFNBQVAsQ0FBaUJDLEdBQWpCLENBQXFCLFVBQXJCO0FBQ0FKLEVBQUFBLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhUixJQUFiLEdBQW9CLEtBQUtBLElBQUwsR0FBWSxJQUFoQztBQUNBRyxFQUFBQSxNQUFNLENBQUNLLEtBQVAsQ0FBYVQsTUFBYixHQUFzQixLQUFLQSxNQUFMLEdBQWMsSUFBcEM7QUFDQUgsRUFBQUEsSUFBSSxDQUFDYSxXQUFMLENBQWlCTixNQUFqQjtBQUNELEdBRUg7OztBQUNPLFNBQVNnQyxlQUFULEdBQTJCO0FBQ2hDLE1BQU12QyxJQUFJLEdBQUdRLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixPQUF2QixDQUFiOztBQUNBLE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2lELGFBQXBCLEVBQW1DakQsQ0FBQyxFQUFwQyxFQUF3QztBQUN0QyxRQUFJcUQsV0FBVyxHQUFHLE9BQU9KLGFBQXpCO0FBQ0EsUUFBSUcsYUFBYSxHQUFHLE1BQU1wRCxDQUFDLEdBQUdxRCxXQUE5QjtBQUNBLFFBQUlDLFdBQVcsR0FBRyxJQUFJSCxRQUFKLENBQWFuRSxJQUFiLEVBQW1Cb0UsYUFBbkIsQ0FBbEI7QUFDQUYsSUFBQUEsU0FBUyxDQUFDOUMsSUFBVixDQUFla0QsV0FBZjtBQUNEO0FBQ0YsRUFDRDs7QUFDTyxTQUFTOUIsYUFBVCxHQUF5QjtBQUM5QixNQUFNeEMsSUFBSSxHQUFHUSxRQUFRLENBQUNPLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBYjs7QUFDQSxNQUFJLENBQUNwQixnREFBRCxJQUFlZ0QsZ0RBQW5CLEVBQStCO0FBQzdCdUIsSUFBQUEsU0FBUyxDQUFDNUMsT0FBVixDQUFrQixVQUFDaUQsUUFBRCxFQUFjO0FBQzlCLFVBQUlSLGlEQUFKLEVBQWU7QUFDYixZQUFJcEIsZ0RBQUosRUFBZ0I7QUFDZDRCLFVBQUFBLFFBQVEsQ0FBQ3BFLE1BQVQsSUFBbUIsR0FBbkI7QUFDRCxTQUZELE1BRU87QUFDTG9FLFVBQUFBLFFBQVEsQ0FBQ3BFLE1BQVQsSUFBbUIsR0FBbkI7QUFDRDtBQUNGLE9BTkQsTUFNTyxJQUFJNkQsaURBQUosRUFBZTtBQUNwQk8sUUFBQUEsUUFBUSxDQUFDcEUsTUFBVCxJQUFtQixDQUFuQjtBQUNEOztBQUNELFVBQUlJLE1BQU0sR0FBR2dFLFFBQVEsQ0FBQ2hFLE1BQXRCO0FBQ0FBLE1BQUFBLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhVCxNQUFiLEdBQXNCb0UsUUFBUSxDQUFDcEUsTUFBVCxHQUFrQixJQUF4QztBQUNBcUUsTUFBQUEsZUFBZSxDQUFDRCxRQUFELEVBQVd2RSxJQUFYLENBQWY7QUFDRCxLQWJEO0FBY0Q7QUFDRixFQUNEOztBQUNBLFNBQVN3RSxlQUFULENBQXlCRCxRQUF6QixFQUFtQ3ZFLElBQW5DLEVBQXlDO0FBQ3ZDLE1BQUksQ0FBQ04sOENBQUwsRUFBZTtBQUNiLFFBQUk2RSxRQUFRLENBQUNwRSxNQUFULElBQW1CLENBQUMsRUFBeEIsRUFBNEI7QUFDMUIsVUFBTXNFLFNBQVMsR0FBR2pFLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixRQUF2QixDQUFsQjtBQUNBLFVBQU0yRCxTQUFTLEdBQUdsRSxRQUFRLENBQUNPLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBbEI7QUFDQSxVQUFNNEQsWUFBWSxHQUFHbkUsUUFBUSxDQUFDTyxhQUFULENBQXVCLFdBQXZCLENBQXJCO0FBQ0EsVUFBTTZELFNBQVMsR0FBR3BFLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixRQUF2QixDQUFsQjtBQUNBLFVBQUk4RCxhQUFhLEdBQUdYLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYTNELE1BQWpDO0FBQ0FzRSxNQUFBQSxhQUFhLENBQUNqRCxNQUFkO0FBQ0FzQyxNQUFBQSxTQUFTLENBQUNyQyxLQUFWOztBQUNBLFVBQUksQ0FBQ2MsZ0RBQUwsRUFBaUI7QUFDZmpCLFFBQUFBLHFCQUFNLENBQUNDLEtBQVAsSUFBZ0IsQ0FBaEI7QUFDQThDLFFBQUFBLFNBQVMsQ0FBQ2IsU0FBVixHQUFzQmxDLHFCQUFNLENBQUNDLEtBQVAsR0FBZSxHQUFyQztBQUNBK0MsUUFBQUEsU0FBUyxDQUFDZCxTQUFWLEdBQXNCLEVBQXRCO0FBQ0FlLFFBQUFBLFlBQVksQ0FBQ2YsU0FBYixHQUF5QixFQUF6QjtBQUNBZ0IsUUFBQUEsU0FBUyxDQUFDaEIsU0FBVixHQUFzQixFQUF0QjtBQUNEOztBQUNELFVBQUlVLFdBQVcsR0FBRyxJQUFJSCxRQUFKLENBQWFuRSxJQUFiLEVBQW1CLElBQW5CLENBQWxCO0FBQ0FrRSxNQUFBQSxTQUFTLENBQUM5QyxJQUFWLENBQWVrRCxXQUFmO0FBQ0Q7QUFDRjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFRDtBQUNBO0FBRUEsSUFBTVEsS0FBSyxHQUFHdEUsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWQ7QUFFQSxJQUFJc0UsV0FBVyxHQUFHLEtBQWxCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEtBQW5CO0FBRU8sSUFBSWpCLFNBQVMsR0FBRyxLQUFoQjtBQUNBLElBQUlDLFNBQVMsR0FBRyxJQUFoQjtBQUNBLElBQUlpQixjQUFjLEdBQUcsR0FBckI7QUFDQSxJQUFJdkYsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJd0YsVUFBVSxHQUFHLEdBQWpCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUdELFVBQXZCO0FBQ0EsSUFBSTdDLFdBQUo7QUFDQSxJQUFJQyxZQUFKO0FBQ0EsSUFBSUgsU0FBSjtBQUNBLElBQUlDLFdBQUosRUFFUDs7QUFDTyxTQUFTTCxZQUFULEdBQXdCO0FBQzdCdkIsRUFBQUEsUUFBUSxDQUFDTyxhQUFULENBQXVCLE9BQXZCLEVBQWdDRixXQUFoQyxDQUE0Q2lFLEtBQTVDO0FBQ0FBLEVBQUFBLEtBQUssQ0FBQ3BFLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLE9BQXBCO0FBQ0FtRSxFQUFBQSxLQUFLLENBQUNsRSxLQUFOLENBQVlSLElBQVosR0FBbUI2RSxjQUFjLEdBQUcsSUFBcEM7QUFDQUgsRUFBQUEsS0FBSyxDQUFDbEUsS0FBTixDQUFZVCxNQUFaLEdBQXFCZ0YsZ0JBQWdCLEdBQUcsSUFBeEM7QUFDRCxFQUNEOztBQUNPLFNBQVNuRCxTQUFULEdBQXFCO0FBQzFCLE1BQUksQ0FBQ3JDLGdEQUFMLEVBQWlCO0FBQ2Y0RCxJQUFBQSxhQUFhLENBQUNuQixXQUFELENBQWI7QUFDQTJCLElBQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0FDLElBQUFBLFNBQVMsR0FBRyxLQUFaO0FBQ0E3QixJQUFBQSxTQUFTLEdBQUdVLFdBQVcsQ0FBQyxZQUFZO0FBQ2xDLFVBQUksQ0FBQ2xELGdEQUFMLEVBQWlCO0FBQ2Z3RixRQUFBQSxnQkFBZ0IsSUFBSSxDQUFwQjtBQUNBTCxRQUFBQSxLQUFLLENBQUNsRSxLQUFOLENBQVlULE1BQVosR0FBcUJnRixnQkFBZ0IsR0FBRyxJQUF4QztBQUNBLFlBQUlBLGdCQUFnQixHQUFHRCxVQUFVLEdBQUcsR0FBcEMsRUFBeUNFLFNBQVM7QUFDbkQ7QUFDRixLQU5zQixFQU1wQixDQU5vQixDQUF2QjtBQU9EO0FBQ0YsRUFDRDs7QUFDQSxTQUFTQSxTQUFULEdBQXFCO0FBQ25CLE1BQUksQ0FBQ3pGLGdEQUFMLEVBQWlCO0FBQ2Y0RCxJQUFBQSxhQUFhLENBQUNwQixTQUFELENBQWI7QUFDQTRCLElBQUFBLFNBQVMsR0FBRyxLQUFaO0FBQ0FDLElBQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0E1QixJQUFBQSxXQUFXLEdBQUdTLFdBQVcsQ0FBQyxZQUFZO0FBQ3BDLFVBQUksQ0FBQ2xELGdEQUFMLEVBQWlCO0FBQ2Z3RixRQUFBQSxnQkFBZ0IsSUFBSSxDQUFwQjtBQUNBTCxRQUFBQSxLQUFLLENBQUNsRSxLQUFOLENBQVlULE1BQVosR0FBcUJnRixnQkFBZ0IsR0FBRyxJQUF4QztBQUNBLFlBQUlBLGdCQUFnQixJQUFJLENBQUMsR0FBekIsRUFBOEI3QixpREFBTyxDQUFDOUMsUUFBUSxDQUFDTyxhQUFULENBQXVCLE9BQXZCLENBQUQsQ0FBUDtBQUM5Qm1ELFFBQUFBLDJEQUFBLENBQWtCLFVBQUNLLFFBQUQsRUFBYztBQUM5QmMsVUFBQUEsZUFBZSxDQUFDZCxRQUFELENBQWY7QUFDRCxTQUZEO0FBR0Q7QUFDRixLQVR3QixFQVN0QixDQVRzQixDQUF6QjtBQVVEO0FBQ0YsRUFDRDs7O0FBQ0EsU0FBU2MsZUFBVCxDQUF5QmQsUUFBekIsRUFBbUM7QUFDakMsTUFDRVksZ0JBQWdCLElBQUlaLFFBQVEsQ0FBQ3BFLE1BQTdCLElBQ0FnRixnQkFBZ0IsSUFBSVosUUFBUSxDQUFDcEUsTUFBVCxHQUFrQixFQUR0QyxJQUVBOEUsY0FBYyxHQUFHLEVBQWpCLElBQXVCVixRQUFRLENBQUNuRSxJQUZoQyxJQUdBNkUsY0FBYyxJQUFJVixRQUFRLENBQUNuRSxJQUFULEdBQWdCLEdBSGxDLElBSUEsQ0FBQzJELFNBTEgsRUFNRTtBQUNBbUIsSUFBQUEsVUFBVSxHQUFHQyxnQkFBYjtBQUNBbkQsSUFBQUEsU0FBUztBQUNUK0IsSUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDRDtBQUNGLEVBQ0Q7OztBQUNPLFNBQVM5QixlQUFULENBQXlCZ0IsS0FBekIsRUFBZ0M7QUFDckMsTUFBSSxDQUFDdEQsZ0RBQUwsRUFBaUI7QUFDZixRQUFJc0QsS0FBSyxDQUFDRSxPQUFOLEtBQWtCLEVBQWxCLElBQXdCRixLQUFLLENBQUNFLE9BQU4sS0FBa0IsRUFBOUMsRUFBa0RtQyxRQUFRO0FBQzFELFFBQUlyQyxLQUFLLENBQUNFLE9BQU4sS0FBa0IsRUFBbEIsSUFBd0JGLEtBQUssQ0FBQ0UsT0FBTixLQUFrQixFQUE5QyxFQUFrRG9DLFNBQVM7QUFDNUQ7QUFDRixFQUNEOztBQUNPLFNBQVNyRCxtQkFBVCxDQUE2QmUsS0FBN0IsRUFBb0M7QUFDekMsTUFBSUEsS0FBSyxDQUFDRSxPQUFOLEtBQWtCLEVBQWxCLElBQXdCRixLQUFLLENBQUNFLE9BQU4sS0FBa0IsRUFBOUMsRUFBa0Q7QUFDaEQ0QixJQUFBQSxXQUFXLEdBQUcsS0FBZDtBQUNBeEIsSUFBQUEsYUFBYSxDQUFDbEIsV0FBRCxDQUFiO0FBQ0QsR0FIRCxNQUdPLElBQUlZLEtBQUssQ0FBQ0UsT0FBTixLQUFrQixFQUFsQixJQUF3QkYsS0FBSyxDQUFDRSxPQUFOLEtBQWtCLEVBQTlDLEVBQWtEO0FBQ3ZENkIsSUFBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQXpCLElBQUFBLGFBQWEsQ0FBQ2pCLFlBQUQsQ0FBYjtBQUNEO0FBQ0YsRUFDRDs7QUFDQSxTQUFTZ0QsUUFBVCxHQUFvQjtBQUNsQixNQUFJLENBQUMzRixnREFBTCxFQUFpQjtBQUNmNEQsSUFBQUEsYUFBYSxDQUFDbEIsV0FBRCxDQUFiOztBQUNBLFFBQUkyQyxZQUFKLEVBQWtCO0FBQ2hCekIsTUFBQUEsYUFBYSxDQUFDakIsWUFBRCxDQUFiO0FBQ0EwQyxNQUFBQSxZQUFZLEdBQUcsS0FBZjtBQUNEOztBQUNERCxJQUFBQSxXQUFXLEdBQUcsSUFBZDtBQUNBMUMsSUFBQUEsV0FBVyxHQUFHUSxXQUFXLENBQUMsWUFBWTtBQUNwQyxVQUFJb0MsY0FBYyxJQUFJLENBQUMsRUFBdkIsRUFBMkI7QUFDekJBLFFBQUFBLGNBQWMsSUFBSSxDQUFsQjtBQUNBSCxRQUFBQSxLQUFLLENBQUNsRSxLQUFOLENBQVlSLElBQVosR0FBbUI2RSxjQUFjLEdBQUcsSUFBcEM7QUFDRCxPQUhELE1BR09BLGNBQWMsR0FBRyxHQUFqQjtBQUNSLEtBTHdCLEVBS3RCLENBTHNCLENBQXpCO0FBTUQ7QUFDRixFQUNEOzs7QUFDQSxTQUFTTSxTQUFULEdBQXFCO0FBQ25CLE1BQUksQ0FBQzVGLGdEQUFMLEVBQWlCO0FBQ2Y0RCxJQUFBQSxhQUFhLENBQUNqQixZQUFELENBQWI7O0FBQ0EsUUFBSXlDLFdBQUosRUFBaUI7QUFDZnhCLE1BQUFBLGFBQWEsQ0FBQ2xCLFdBQUQsQ0FBYjtBQUNBMEMsTUFBQUEsV0FBVyxHQUFHLEtBQWQ7QUFDRDs7QUFDREMsSUFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQTFDLElBQUFBLFlBQVksR0FBR08sV0FBVyxDQUFDLFlBQVk7QUFDckMsVUFBSW9DLGNBQWMsSUFBSSxHQUF0QixFQUEyQjtBQUN6QkEsUUFBQUEsY0FBYyxJQUFJLENBQWxCO0FBQ0FILFFBQUFBLEtBQUssQ0FBQ2xFLEtBQU4sQ0FBWVIsSUFBWixHQUFtQjZFLGNBQWMsR0FBRyxJQUFwQztBQUNELE9BSEQsTUFHT0EsY0FBYyxHQUFHLENBQUMsRUFBbEI7QUFDUixLQUx5QixFQUt2QixDQUx1QixDQUExQjtBQU1EO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0hEO0FBQ0E7QUFFTyxJQUFJTyxPQUFPLEdBQUcsRUFBZDs7SUFFREMsU0FDSixrQkFBYztBQUFBOztBQUNaLE9BQUt0RixNQUFMLEdBQWNnRix3REFBZDtBQUNBLE9BQUsvRSxJQUFMLEdBQVk2RSxzREFBWjtBQUNBLE9BQUsxRSxNQUFMLEdBQWNDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFkO0FBQ0EsTUFBTUYsTUFBTSxHQUFHLEtBQUtBLE1BQXBCO0FBQ0FBLEVBQUFBLE1BQU0sQ0FBQ0csU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUIsUUFBckI7QUFDQUosRUFBQUEsTUFBTSxDQUFDSyxLQUFQLENBQWFSLElBQWIsR0FBb0I2RSxzREFBYyxHQUFHLEVBQWpCLEdBQXNCLElBQTFDO0FBQ0ExRSxFQUFBQSxNQUFNLENBQUNLLEtBQVAsQ0FBYVQsTUFBYixHQUFzQmdGLHdEQUFnQixHQUFHLEVBQW5CLEdBQXdCLElBQTlDO0FBQ0EzRSxFQUFBQSxRQUFRLENBQUNPLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0NGLFdBQWhDLENBQTRDTixNQUE1QztBQUNEOztBQUdJLFNBQVNrQyxXQUFULENBQXFCUSxLQUFyQixFQUE0QjtBQUNqQyxNQUFJQSxLQUFLLENBQUNFLE9BQU4sS0FBa0IsRUFBdEIsRUFBMEI7QUFDeEJULElBQUFBLFdBQVc7QUFDWCxRQUFJZ0QsU0FBUyxHQUFHLElBQUlELE1BQUosQ0FDZGpGLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixPQUF2QixDQURjLEVBRWRrQyxLQUFLLENBQUMwQyxPQUZRLEVBR2QxQyxLQUFLLENBQUMyQyxPQUhRLENBQWhCO0FBS0FKLElBQUFBLE9BQU8sQ0FBQ3BFLElBQVIsQ0FBYXNFLFNBQWI7QUFDRDtBQUNGO0FBRU0sU0FBU2hELFdBQVQsQ0FBcUJtRCxDQUFyQixFQUF3QkMsQ0FBeEIsRUFBMkI7QUFDaENOLEVBQUFBLE9BQU8sQ0FBQ2xFLE9BQVIsQ0FBZ0IsVUFBQ3lFLE1BQUQsRUFBWTtBQUMxQkEsSUFBQUEsTUFBTSxDQUFDNUYsTUFBUCxJQUFpQixDQUFqQjtBQUNBLFFBQUlJLE1BQU0sR0FBR3dGLE1BQU0sQ0FBQ3hGLE1BQXBCO0FBQ0FBLElBQUFBLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhVCxNQUFiLEdBQXNCNEYsTUFBTSxDQUFDNUYsTUFBUCxHQUFnQixJQUF0QztBQUNBTCxJQUFBQSxxREFBQSxDQUFlLFVBQUN5QixLQUFELEVBQVc7QUFDeEI4RCxNQUFBQSxlQUFlLENBQUM5RCxLQUFELEVBQVF3RSxNQUFNLENBQUM1RixNQUFmLEVBQXVCNEYsTUFBTSxDQUFDM0YsSUFBOUIsQ0FBZjtBQUNELEtBRkQ7O0FBR0EsUUFBSTJGLE1BQU0sQ0FBQzVGLE1BQVAsSUFBaUIsQ0FBQyxFQUF0QixFQUEwQjtBQUN4QixVQUFJNkYsV0FBVyxHQUFHUixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdqRixNQUE3QjtBQUNBeUYsTUFBQUEsV0FBVyxDQUFDcEUsTUFBWjtBQUNBNEQsTUFBQUEsT0FBTyxDQUFDM0QsS0FBUjtBQUNEO0FBQ0YsR0FaRDtBQWFEOztBQUVELFNBQVN3RCxlQUFULENBQXlCOUQsS0FBekIsRUFBZ0NwQixNQUFoQyxFQUF3Q0MsSUFBeEMsRUFBOEM7QUFDNUMsTUFDRUQsTUFBTSxJQUFJb0IsS0FBSyxDQUFDcEIsTUFBaEIsSUFDQUEsTUFBTSxJQUFJb0IsS0FBSyxDQUFDcEIsTUFBTixHQUFlLEVBRHpCLElBRUFDLElBQUksR0FBRyxFQUFQLElBQWFtQixLQUFLLENBQUNuQixJQUZuQixJQUdBQSxJQUFJLElBQUltQixLQUFLLENBQUNuQixJQUFOLEdBQWEsRUFKdkIsRUFLRTtBQUNBLFFBQUksQ0FBQ21CLEtBQUssQ0FBQ3JCLE1BQVgsRUFBbUI0QixvREFBUyxDQUFDUCxLQUFELENBQVQ7QUFDcEI7QUFDRjs7Ozs7O1VDdkREO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBRUEsSUFBTXZCLElBQUksR0FBR1EsUUFBUSxDQUFDTyxhQUFULENBQXVCLE9BQXZCLENBQWI7QUFFQVAsUUFBUSxDQUFDc0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbERGLEVBQUFBLHVEQUFLLENBQUM1QyxJQUFELENBQUw7QUFDQXFELEVBQUFBLDJEQUFTO0FBQ1YsQ0FIRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZW5lbXkuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF0Zm9ybS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyU2hvb3QuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVPdmVyLCBnYW1lUGF1c2VkIH0gZnJvbSAnLi9nYW1lLmpzJztcblxubGV0IGVuZW15Q291bnQgPSAzO1xubGV0IGVuZW15S2V5ID0gMDtcblxuZXhwb3J0IGxldCBlbmVteXMgPSBbXTtcblxuLy8gU2V0cyBlbmVteSBwcm9wZXJ0aWVzXG5jbGFzcyBFbmVteSB7XG4gIGNvbnN0cnVjdG9yKGdyaWQsIG5ld0VuZW15Qm90dG9tKSB7XG4gICAgdGhpcy5raWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmJvdHRvbSA9IG5ld0VuZW15Qm90dG9tO1xuICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnZW5lbXknKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gIH1cbn1cbi8vIENyZWF0ZXMgZW5lbXlzIGFuZCBwdXNoZXMgdG8gZW5lbXkgYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbmVteXMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVuZW15Q291bnQ7IGkrKykge1xuICAgIGxldCBlbmVteUdhcCA9IC1ncmlkLmNsaWVudEhlaWdodCAvIGVuZW15Q291bnQ7XG4gICAgbGV0IG5ld0VuZW15Qm90dG9tID0gLTEyMCArIGkgKiBlbmVteUdhcDtcbiAgICBsZXQgbmV3RW5lbXkgPSBuZXcgRW5lbXkoZ3JpZCwgbmV3RW5lbXlCb3R0b20pO1xuICAgIGVuZW15cy5wdXNoKG5ld0VuZW15KTtcbiAgfVxufVxuLy8gTW92ZXMgZW5lbXlzIGJ5IHN1YnN0cmFjdGluZywgb3IgYWRkaW5nIHRvIHRoZSBlbmVteSdzIGJvdHRvbSBwcm9wZXJ0eVxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVFbmVteXMoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIGVuZW15cy5mb3JFYWNoKChlbmVteSkgPT4ge1xuICAgICAgZW5lbXkuYm90dG9tICs9IDAuNTU7XG4gICAgICBsZXQgdmlzdWFsID0gZW5lbXkudmlzdWFsO1xuICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGVuZW15LmJvdHRvbSArICdweCc7XG4gICAgICB1cGRhdGVFbmVteXMoZW5lbXksIGdyaWQpO1xuICAgIH0pO1xuICB9XG59XG4vLyBSZW1vdmVzIG9sZCBlbmVteXMgYW5kIGNyZWF0ZXMgbmV3IGVuZW15cyB0aGF0IGFyZSB0aGVuIHB1c2hlZCB0byBlbmVteSBhcnJheVxuZnVuY3Rpb24gdXBkYXRlRW5lbXlzKGVuZW15LCBncmlkKSB7XG4gIGlmICghZ2FtZU92ZXIpIHtcbiAgICBpZiAoZW5lbXkuYm90dG9tID49IGdyaWQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICBsZXQgZmlyc3RFbmVteSA9IGVuZW15c1swXS52aXN1YWw7XG4gICAgICBpZiAoIWVuZW15LmtpbGxlZCkgZ2xvYmFsLnNjb3JlIC09IDIwO1xuICAgICAgZmlyc3RFbmVteS5yZW1vdmUoKTtcbiAgICAgIGVuZW15cy5zaGlmdCgpO1xuICAgICAgbGV0IG5ld0VuZW15ID0gbmV3IEVuZW15KGdyaWQsIC01MCk7XG4gICAgICBlbmVteXMucHVzaChuZXdFbmVteSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBraWxsRW5lbXkoZW5lbXkpIHtcbiAgZ2xvYmFsLnNjb3JlICs9IDEwO1xuICBlbmVteS5raWxsZWQgPSB0cnVlO1xuICBlbmVteS52aXN1YWwucmVtb3ZlKCk7XG59XG4iLCJpbXBvcnQge1xuICBjcmVhdGVQbGF5ZXIsXG4gIHNsaW1lSnVtcCxcbiAgcGxheWVyTW92ZW1lbnRzLFxuICBzdG9wUGxheWVyTW92ZW1lbnRzLFxuICB1cFRpbWVySWQsXG4gIGRvd25UaW1lcklkLFxuICBsZWZ0VGltZXJJZCxcbiAgcmlnaHRUaW1lcklkLFxufSBmcm9tICcuL3BsYXllci5qcyc7XG5pbXBvcnQgeyBjcmVhdGVQbGF0Zm9ybXMsIG1vdmVQbGF0Zm9ybXMgfSBmcm9tICcuL3BsYXRmb3JtLmpzJztcbmltcG9ydCB7IHBsYXllclNob290LCBzaG9vdEJ1bGxldCB9IGZyb20gJy4vcGxheWVyU2hvb3QuanMnO1xuaW1wb3J0IHsgY3JlYXRlRW5lbXlzLCBtb3ZlRW5lbXlzIH0gZnJvbSAnLi9lbmVteS5qcyc7XG5cbmV4cG9ydCBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbmV4cG9ydCBsZXQgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuZXhwb3J0IGxldCBzb2Z0UGF1c2VkID0gZmFsc2U7XG5cbi8vIEluIGNoYXJnZSBvZiBzdGFydGluZyB0aGUgZ2FtZSwgY2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBuZWVkZWQgZm9yIGJ1aWxkaW5nIGFuZCByZW5kZXJpbmcuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQoZ3JpZCkge1xuICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICBjcmVhdGVQbGF0Zm9ybXMoKTtcbiAgICBjcmVhdGVFbmVteXMoKTtcbiAgICBjcmVhdGVQbGF5ZXIoKTtcbiAgICBzZXRJbnRlcnZhbChtb3ZlUGxhdGZvcm1zLCAxKTtcbiAgICBzZXRJbnRlcnZhbChtb3ZlRW5lbXlzLCAxKTtcbiAgICBzZXRJbnRlcnZhbChzaG9vdEJ1bGxldCwgMSk7XG4gICAgc2xpbWVKdW1wKCk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyU2hvb3QpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJNb3ZlbWVudHMpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJQYXVzZUdhbWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCByZXN0YXJ0KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN0b3BQbGF5ZXJNb3ZlbWVudHMpO1xuICB9XG59XG4vLyBQYXVzZXMgZ2FtZSBieSBzZXR0aW5nIGV4cG9ydGVkIHZhcmlhYmxlIHRvIGRlc2lyZWQgZ2FtZSBzdGF0ZVxuZnVuY3Rpb24gcGxheWVyUGF1c2VHYW1lKGV2ZW50KSB7XG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gIGlmIChldmVudC5rZXlDb2RlID09PSAzMiAmJiAhZ2FtZVBhdXNlZCkge1xuICAgIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgJiYgZ2FtZVBhdXNlZCkge1xuICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lUGF1c2VkID0gZmFsc2U7XG4gICAgc29mdFBhdXNlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXVzZUdhbWUoKSB7XG4gIGdhbWVQYXVzZWQgPSB0cnVlO1xuICBzb2Z0UGF1c2VkID0gdHJ1ZTtcbn1cbi8vIEVuZHMgZ2FtZSBieSBjbGVhcmluZyB0aGUgZ3JpZCBhbmQgVGltZXJJZHNcbmV4cG9ydCBmdW5jdGlvbiBlbmRHYW1lKCkge1xuICBnYW1lT3ZlciA9IHRydWU7XG4gIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKTtcbiAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZCk7XG4gIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpO1xuICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gIGNvbnN0IGVuZGluZ09uZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lRW5kaW5nJyk7XG4gIGNvbnN0IGVuZGluZ1R3b1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHdvRW5kaW5nJyk7XG4gIGNvbnN0IGVuZGluZ1RocmVlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maW5hbFNjb3JlJyk7XG4gIGNvbnN0IG9nU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcbiAgb2dTY29yZS5pbm5lckhUTUwgPSAnJztcbiAgZW5kaW5nT25lVGV4dC5pbm5lckhUTUwgPSBcIml0IHdhc24ndCBlbm91Z2hcIjtcbiAgZW5kaW5nVHdvVGV4dC5pbm5lckhUTUwgPSAncHJlc3MgUiB0byB0cnkgYWdhaW4nO1xuICBlbmRpbmdUaHJlZVRleHQuaW5uZXJIVE1MID0gYGZpbmFsIHNjb3JlOiAke2dsb2JhbC5zY29yZX1tYDtcbn1cbi8vIFJlc3RhcnRzIGdhbWUgdmlhIHJlbG9hZGluZyBwYWdlXG5mdW5jdGlvbiByZXN0YXJ0KGV2ZW50KSB7XG4gIGlmIChldmVudC5rZXlDb2RlID09PSA4Mikge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBnYW1lT3ZlciwgZ2FtZVBhdXNlZCwgc29mdFBhdXNlZCB9IGZyb20gJy4vZ2FtZS5qcyc7XG5pbXBvcnQgeyBpc0p1bXBpbmcsIGlzRmFsbGluZyB9IGZyb20gJy4vcGxheWVyLmpzJztcblxubGV0IHBsYXRmb3JtQ291bnQgPSAyMjtcblxuZ2xvYmFsLnNjb3JlID0gMTtcbmV4cG9ydCBsZXQgcGxhdGZvcm1zID0gW107XG5cbi8vIFNldHMgUGxhdGZvcm0gcHJvcGVydGllc1xuY2xhc3MgUGxhdGZvcm0ge1xuICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgdGhpcy5ib3R0b20gPSBuZXdQbGF0Qm90dG9tO1xuICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgncGxhdGZvcm0nKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gIH1cbn1cbi8vIENyZWF0ZXMgcGxhdGZvcm1zIGFuZCBwdXNoZXMgdG8gcGxhdGZvcm0gYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybXMoKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXRmb3JtQ291bnQ7IGkrKykge1xuICAgIGxldCBwbGF0Zm9ybUdhcCA9IDM5MDAgLyBwbGF0Zm9ybUNvdW50O1xuICAgIGxldCBuZXdQbGF0Qm90dG9tID0gMTAwICsgaSAqIHBsYXRmb3JtR2FwO1xuICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCBuZXdQbGF0Qm90dG9tKTtcbiAgICBwbGF0Zm9ybXMucHVzaChuZXdQbGF0Zm9ybSk7XG4gIH1cbn1cbi8vIE1vdmVzIFBsYXRmb3JtcyBieSBzdWJzdHJhY3RpbmcsIG9yIGFkZGluZyB0byB0aGUgUGxhdGZvcm0ncyBib3R0b20gcHJvcGVydHlcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUGxhdGZvcm1zKCkge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgaWYgKCFnYW1lUGF1c2VkIHx8IHNvZnRQYXVzZWQpIHtcbiAgICBwbGF0Zm9ybXMuZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcbiAgICAgIGlmIChpc0p1bXBpbmcpIHtcbiAgICAgICAgaWYgKHNvZnRQYXVzZWQpIHtcbiAgICAgICAgICBwbGF0Zm9ybS5ib3R0b20gLT0gMS41O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAzLjU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNGYWxsaW5nKSB7XG4gICAgICAgIHBsYXRmb3JtLmJvdHRvbSArPSAxO1xuICAgICAgfVxuICAgICAgbGV0IHZpc3VhbCA9IHBsYXRmb3JtLnZpc3VhbDtcbiAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuICAgICAgdXBkYXRlUGxhdGZvcm1zKHBsYXRmb3JtLCBncmlkKTtcbiAgICB9KTtcbiAgfVxufVxuLy8gUmVtb3ZlcyBvbGQgcGxhdGZvcm1zIGFuZCBjcmVhdGVzIG5ldyBwbGF0Zm9ybXMgdGhhdCBhcmUgdGhlbiBwdXNoZWQgdG8gcGxhdGZvcm0gYXJyYXlcbmZ1bmN0aW9uIHVwZGF0ZVBsYXRmb3JtcyhwbGF0Zm9ybSwgZ3JpZCkge1xuICBpZiAoIWdhbWVPdmVyKSB7XG4gICAgaWYgKHBsYXRmb3JtLmJvdHRvbSA8PSAtNTApIHtcbiAgICAgIGNvbnN0IHNjb3JlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgICAgY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgICBjb25zdCBtb3ZlbWVudFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZW1lbnQnKTtcbiAgICAgIGNvbnN0IHNob290VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG9vdCcpO1xuICAgICAgbGV0IGZpcnN0UGxhdGZvcm0gPSBwbGF0Zm9ybXNbMF0udmlzdWFsO1xuICAgICAgZmlyc3RQbGF0Zm9ybS5yZW1vdmUoKTtcbiAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgaWYgKCFzb2Z0UGF1c2VkKSB7XG4gICAgICAgIGdsb2JhbC5zY29yZSArPSAxO1xuICAgICAgICBzY29yZVRleHQuaW5uZXJIVE1MID0gZ2xvYmFsLnNjb3JlICsgJ20nO1xuICAgICAgICB0aXRsZVRleHQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1vdmVtZW50VGV4dC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgc2hvb3RUZXh0LmlubmVySFRNTCA9ICcnO1xuICAgICAgfVxuICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIDM5MDApO1xuICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZW5kR2FtZSwgZ2FtZVBhdXNlZCB9IGZyb20gJy4vZ2FtZS5qcyc7XG5pbXBvcnQgeyBwbGF0Zm9ybXMgfSBmcm9tICcuL3BsYXRmb3JtLmpzJztcblxuY29uc3Qgc2xpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxubGV0IGlzR29pbmdMZWZ0ID0gZmFsc2U7XG5sZXQgaXNHb2luZ1JpZ2h0ID0gZmFsc2U7XG5cbmV4cG9ydCBsZXQgaXNKdW1waW5nID0gZmFsc2U7XG5leHBvcnQgbGV0IGlzRmFsbGluZyA9IHRydWU7XG5leHBvcnQgbGV0IHNsaW1lTGVmdFNwYWNlID0gMjgwO1xuZXhwb3J0IGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuZXhwb3J0IGxldCBzdGFydFBvaW50ID0gMjAwO1xuZXhwb3J0IGxldCBzbGltZUJvdHRvbVNwYWNlID0gc3RhcnRQb2ludDtcbmV4cG9ydCBsZXQgbGVmdFRpbWVySWQ7XG5leHBvcnQgbGV0IHJpZ2h0VGltZXJJZDtcbmV4cG9ydCBsZXQgdXBUaW1lcklkO1xuZXhwb3J0IGxldCBkb3duVGltZXJJZDtcblxuLy8gQ3JlYXRlICdTbGltZScgYW5kIGFkZCB0byB0aGUgZ3JpZC5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQoc2xpbWUpO1xuICBzbGltZS5jbGFzc0xpc3QuYWRkKCdzbGltZScpO1xuICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnO1xuICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4Jztcbn1cbi8vIEluIGNoYXJnZSBvZiBhZGRpbmcgdG8gdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgc2xpbWVGYWxsKClcbmV4cG9ydCBmdW5jdGlvbiBzbGltZUp1bXAoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpO1xuICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgaXNGYWxsaW5nID0gZmFsc2U7XG4gICAgdXBUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIHNsaW1lQm90dG9tU3BhY2UgKz0gMTtcbiAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDEwMCkgc2xpbWVGYWxsKCk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cbn1cbi8vIEluIGNoYXJnZSBvZiBzdWJ0cmFjdGluZyB0aGUgcGxheWVyJ3MgWSB2YWx1ZSBhbmQgY2FsbGluZyBlbmRHYW1lKClcbmZ1bmN0aW9uIHNsaW1lRmFsbCgpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpO1xuICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgIGlzRmFsbGluZyA9IHRydWU7XG4gICAgZG93blRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgc2xpbWVCb3R0b21TcGFjZSAtPSAyO1xuICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPD0gLTIwMCkgZW5kR2FtZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpKTtcbiAgICAgICAgcGxhdGZvcm1zLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XG4gICAgICAgICAgY29sbGlzaW9uRGV0ZWN0KHBsYXRmb3JtKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cbn1cbi8vIENoZWNrcyB0aGUgdmFsdWUgb2YgdGhlIGJvdHRvbSBvZiB0aGUgcGxheWVyLCBpZiBzYWlkIHZhbHVlIHJldHVybnMgdHJ1ZSBpdCBjYWxscyBzbGltZUp1bXAoKVxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0KHBsYXRmb3JtKSB7XG4gIGlmIChcbiAgICBzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSAmJlxuICAgIHNsaW1lQm90dG9tU3BhY2UgPD0gcGxhdGZvcm0uYm90dG9tICsgMTkgJiZcbiAgICBzbGltZUxlZnRTcGFjZSArIDQwID49IHBsYXRmb3JtLmxlZnQgJiZcbiAgICBzbGltZUxlZnRTcGFjZSA8PSBwbGF0Zm9ybS5sZWZ0ICsgMTAwICYmXG4gICAgIWlzSnVtcGluZ1xuICApIHtcbiAgICBzdGFydFBvaW50ID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICBzbGltZUp1bXAoKTtcbiAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICB9XG59XG4vLyBDYWxscyBtb3ZlTGVmdCgpIG9yIG1vdmVSaWdodCBkZXBlbmRpbmcgb24gcGxheWVyIGlucHV0LiAqVXNlcyBrZXlkb3duKlxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllck1vdmVtZW50cyhldmVudCkge1xuICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIG1vdmVMZWZ0KCk7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSBtb3ZlUmlnaHQoKTtcbiAgfVxufVxuLy8gQ2Vhc2VzIHBsYXllciBtb3ZlbWVudCBkZXBlbmRpbmcgb24ga2V5IHJlbGVhc2UuICpVc2VzIGtleXVwKlxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSB7XG4gICAgaXNHb2luZ0xlZnQgPSBmYWxzZTtcbiAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkge1xuICAgIGlzR29pbmdSaWdodCA9IGZhbHNlO1xuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgfVxufVxuLy8gRGVjcmVtZW50cyBwbGF5ZXIncyBYIHZhbHVlXG5mdW5jdGlvbiBtb3ZlTGVmdCgpIHtcbiAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZCk7XG4gICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlzR29pbmdMZWZ0ID0gdHJ1ZTtcbiAgICBsZWZ0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAtNjApIHtcbiAgICAgICAgc2xpbWVMZWZ0U3BhY2UgLT0gMjtcbiAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgICAgIH0gZWxzZSBzbGltZUxlZnRTcGFjZSA9IDYwMDtcbiAgICB9LCAxKTtcbiAgfVxufVxuLy8gSW5jcmVtZW50cyBwbGF5ZXIncyBYIHZhbHVlXG5mdW5jdGlvbiBtb3ZlUmlnaHQoKSB7XG4gIGlmICghZ2FtZVBhdXNlZCkge1xuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICBpZiAoaXNHb2luZ0xlZnQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpO1xuICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZTtcbiAgICB9XG4gICAgaXNHb2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICByaWdodFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPD0gNjEwKSB7XG4gICAgICAgIHNsaW1lTGVmdFNwYWNlICs9IDI7XG4gICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSAtNjA7XG4gICAgfSwgMSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHNsaW1lTGVmdFNwYWNlLCBzbGltZUJvdHRvbVNwYWNlIH0gZnJvbSAnLi9wbGF5ZXIuanMnO1xuaW1wb3J0IHsgZW5lbXlzLCBraWxsRW5lbXkgfSBmcm9tICcuL2VuZW15LmpzJztcblxuZXhwb3J0IGxldCBidWxsZXRzID0gW107XG5cbmNsYXNzIEJ1bGxldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICB0aGlzLmxlZnQgPSBzbGltZUxlZnRTcGFjZTtcbiAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdidWxsZXQnKTtcbiAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgMTggKyAncHgnO1xuICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgMTIgKyAncHgnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyU2hvb3QoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgc2hvb3RCdWxsZXQoKTtcbiAgICBsZXQgbmV3QnVsbGV0ID0gbmV3IEJ1bGxldChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyksXG4gICAgICBldmVudC5jbGllbnRYLFxuICAgICAgZXZlbnQuY2xpZW50WVxuICAgICk7XG4gICAgYnVsbGV0cy5wdXNoKG5ld0J1bGxldCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob290QnVsbGV0KHgsIHkpIHtcbiAgYnVsbGV0cy5mb3JFYWNoKChidWxsZXQpID0+IHtcbiAgICBidWxsZXQuYm90dG9tIC09IDM7XG4gICAgbGV0IHZpc3VhbCA9IGJ1bGxldC52aXN1YWw7XG4gICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGJ1bGxldC5ib3R0b20gKyAncHgnO1xuICAgIGVuZW15cy5mb3JFYWNoKChlbmVteSkgPT4ge1xuICAgICAgY29sbGlzaW9uRGV0ZWN0KGVuZW15LCBidWxsZXQuYm90dG9tLCBidWxsZXQubGVmdCk7XG4gICAgfSk7XG4gICAgaWYgKGJ1bGxldC5ib3R0b20gPD0gLTUwKSB7XG4gICAgICBsZXQgZmlyc3RCdWxsZXQgPSBidWxsZXRzWzBdLnZpc3VhbDtcbiAgICAgIGZpcnN0QnVsbGV0LnJlbW92ZSgpO1xuICAgICAgYnVsbGV0cy5zaGlmdCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdChlbmVteSwgYm90dG9tLCBsZWZ0KSB7XG4gIGlmIChcbiAgICBib3R0b20gPj0gZW5lbXkuYm90dG9tICYmXG4gICAgYm90dG9tIDw9IGVuZW15LmJvdHRvbSArIDE5ICYmXG4gICAgbGVmdCArIDQwID49IGVuZW15LmxlZnQgJiZcbiAgICBsZWZ0IDw9IGVuZW15LmxlZnQgKyAzMFxuICApIHtcbiAgICBpZiAoIWVuZW15LmtpbGxlZCkga2lsbEVuZW15KGVuZW15KTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBzdGFydCwgcGF1c2VHYW1lIH0gZnJvbSAnLi9zY3JpcHRzL2dhbWUuanMnO1xuXG5jb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgc3RhcnQoZ3JpZCk7XG4gIHBhdXNlR2FtZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiZ2FtZU92ZXIiLCJnYW1lUGF1c2VkIiwiZW5lbXlDb3VudCIsImVuZW15S2V5IiwiZW5lbXlzIiwiRW5lbXkiLCJncmlkIiwibmV3RW5lbXlCb3R0b20iLCJraWxsZWQiLCJib3R0b20iLCJsZWZ0IiwiTWF0aCIsInJhbmRvbSIsInZpc3VhbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVFbmVteXMiLCJxdWVyeVNlbGVjdG9yIiwiaSIsImVuZW15R2FwIiwiY2xpZW50SGVpZ2h0IiwibmV3RW5lbXkiLCJwdXNoIiwibW92ZUVuZW15cyIsImZvckVhY2giLCJlbmVteSIsInVwZGF0ZUVuZW15cyIsImZpcnN0RW5lbXkiLCJnbG9iYWwiLCJzY29yZSIsInJlbW92ZSIsInNoaWZ0Iiwia2lsbEVuZW15IiwiY3JlYXRlUGxheWVyIiwic2xpbWVKdW1wIiwicGxheWVyTW92ZW1lbnRzIiwic3RvcFBsYXllck1vdmVtZW50cyIsInVwVGltZXJJZCIsImRvd25UaW1lcklkIiwibGVmdFRpbWVySWQiLCJyaWdodFRpbWVySWQiLCJjcmVhdGVQbGF0Zm9ybXMiLCJtb3ZlUGxhdGZvcm1zIiwicGxheWVyU2hvb3QiLCJzaG9vdEJ1bGxldCIsInNvZnRQYXVzZWQiLCJzdGFydCIsInNldEludGVydmFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBsYXllclBhdXNlR2FtZSIsInJlc3RhcnQiLCJldmVudCIsIm1lbnUiLCJrZXlDb2RlIiwiZGlzcGxheSIsInBhdXNlR2FtZSIsImVuZEdhbWUiLCJjbGVhckludGVydmFsIiwiZW5kaW5nT25lVGV4dCIsImVuZGluZ1R3b1RleHQiLCJlbmRpbmdUaHJlZVRleHQiLCJvZ1Njb3JlIiwiaW5uZXJIVE1MIiwibG9jYXRpb24iLCJyZWxvYWQiLCJpc0p1bXBpbmciLCJpc0ZhbGxpbmciLCJwbGF0Zm9ybUNvdW50IiwicGxhdGZvcm1zIiwiUGxhdGZvcm0iLCJuZXdQbGF0Qm90dG9tIiwicGxhdGZvcm1HYXAiLCJuZXdQbGF0Zm9ybSIsInBsYXRmb3JtIiwidXBkYXRlUGxhdGZvcm1zIiwic2NvcmVUZXh0IiwidGl0bGVUZXh0IiwibW92ZW1lbnRUZXh0Iiwic2hvb3RUZXh0IiwiZmlyc3RQbGF0Zm9ybSIsInNsaW1lIiwiaXNHb2luZ0xlZnQiLCJpc0dvaW5nUmlnaHQiLCJzbGltZUxlZnRTcGFjZSIsInN0YXJ0UG9pbnQiLCJzbGltZUJvdHRvbVNwYWNlIiwic2xpbWVGYWxsIiwiY29sbGlzaW9uRGV0ZWN0IiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJidWxsZXRzIiwiQnVsbGV0IiwibmV3QnVsbGV0IiwiY2xpZW50WCIsImNsaWVudFkiLCJ4IiwieSIsImJ1bGxldCIsImZpcnN0QnVsbGV0Il0sInNvdXJjZVJvb3QiOiIifQ==