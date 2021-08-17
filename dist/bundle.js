/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameOver": function() { return /* binding */ gameOver; },
/* harmony export */   "gamePaused": function() { return /* binding */ gamePaused; },
/* harmony export */   "start": function() { return /* binding */ start; },
/* harmony export */   "endGame": function() { return /* binding */ endGame; }
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform.js */ "./src/scripts/platform.js");
/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sound.js */ "./src/scripts/sound.js");
/* harmony import */ var _playerShoot_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./playerShoot.js */ "./src/scripts/playerShoot.js");




var gameOver = false;
var gamePaused = false;
function start(grid) {
  if (!gamePaused) {
    (0,_platform_js__WEBPACK_IMPORTED_MODULE_1__.createPlatforms)();
    setTimeout(function () {
      (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
    }, 300);
    setInterval(_platform_js__WEBPACK_IMPORTED_MODULE_1__.movePlatforms, 1);
    setInterval(_playerShoot_js__WEBPACK_IMPORTED_MODULE_3__.shootBullet, 1);
    (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.slimeJump)();
    document.addEventListener('keydown', _playerShoot_js__WEBPACK_IMPORTED_MODULE_3__.playerShoot.bind(this, grid));
    document.addEventListener('click', _sound_js__WEBPACK_IMPORTED_MODULE_2__.backgroundMusicPlay);
    document.addEventListener('keydown', _player_js__WEBPACK_IMPORTED_MODULE_0__.playerMovements);
    document.addEventListener('keyup', _player_js__WEBPACK_IMPORTED_MODULE_0__.stopPlayerMovements);
    document.addEventListener('keydown', pauseGame);
  }
}
function endGame(grid) {
  gameOver = true;

  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.upTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.downTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.leftTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.rightTimerId);
  grid.innerHTML = "Your final score was: ".concat(_platform_js__WEBPACK_IMPORTED_MODULE_1__.score);
}

function pauseGame(event) {
  if (event.keyCode === 27 && !gamePaused) {
    gamePaused = true;
  } else if (event.keyCode === 27 && gamePaused) {
    gamePaused = false;
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
/* harmony export */   "movePlatforms": function() { return /* binding */ movePlatforms; },
/* harmony export */   "grabScore": function() { return /* binding */ grabScore; }
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/scripts/game.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var platformCount = 5;
var score = 0;
var platforms = [];

var Platform = function Platform(grid, newPlatBottom) {
  _classCallCheck(this, Platform);

  this.bottom = newPlatBottom;
  this.left = Math.random() * 500;
  this.visual = document.createElement('div');
  var visual = this.visual;
  visual.classList.add('platform');
  visual.style.left = this.left + 'px';
  visual.style.bottom = this.bottom + 'px';
  grid.appendChild(visual);
};

function createPlatforms() {
  var grid = document.querySelector('.grid');

  for (var i = 0; i < platformCount; i++) {
    var platformGap = 600 / platformCount;
    var newPlatBottom = 100 + i * platformGap;
    var newPlatform = new Platform(grid, newPlatBottom);
    platforms.push(newPlatform);
  }
}
function movePlatforms() {
  var grid = document.querySelector('.grid');

  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    platforms.forEach(function (platform) {
      if (_player_js__WEBPACK_IMPORTED_MODULE_1__.isJumping) {
        platform.bottom -= 3.5;
      } else if (_player_js__WEBPACK_IMPORTED_MODULE_1__.isFalling) {
        platform.bottom += 1;
      }

      var visual = platform.visual;
      visual.style.bottom = platform.bottom + 'px';

      if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gameOver) {
        if (platform.bottom <= -50) {
          var firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove('platform');
          platforms.shift();
          score += 1;
          var newPlatform = new Platform(grid, 600);
          platforms.push(newPlatform);
        }
      }
    });
  }
}
function grabScore() {
  return score;
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
// Add flying enemies.
// Add shooting feature. 50%



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
var downTimerId;
function createPlayer() {
  document.querySelector('.grid').appendChild(slime);
  slime.classList.add('slime');
  slime.style.left = slimeLeftSpace + 'px';
  slime.style.bottom = slimeBottomSpace + 'px';
}
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
}

function slimeFall() {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    clearInterval(upTimerId);
    isJumping = false;
    isFalling = true;
    downTimerId = setInterval(function () {
      if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
        slimeBottomSpace -= 2;
        slime.style.bottom = slimeBottomSpace + 'px';

        if (slimeBottomSpace <= 0) {
          (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.endGame)(document.querySelector('.grid'));
        }

        _platform_js__WEBPACK_IMPORTED_MODULE_1__.platforms.forEach(function (platform) {
          if (slimeBottomSpace >= platform.bottom && slimeBottomSpace <= platform.bottom + 19 && slimeLeftSpace + 40 >= platform.left && slimeLeftSpace <= platform.left + 100 && // right side
          !isJumping) {
            startPoint = slimeBottomSpace;
            (0,_sound_js__WEBPACK_IMPORTED_MODULE_2__.slimeSoundPlay)();
            slimeJump();
            isJumping = true;
          }
        });
      }
    }, 1);
  }
}

function playerMovements(event) {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    if (event.keyCode === 37 || event.keyCode === 65) moveLeft();
    if (event.keyCode === 39 || event.keyCode === 68) moveRight();
  }
}
function stopPlayerMovements(event) {
  if (event.keyCode === 37 || event.keyCode === 65) {
    isGoingLeft = false;
    clearInterval(leftTimerId);
  } else if (event.keyCode === 39 || event.keyCode === 68) {
    isGoingRight = false;
    clearInterval(rightTimerId);
  }
}

function moveLeft() {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    clearInterval(leftTimerId);

    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }

    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (slimeLeftSpace >= 0) {
        slimeLeftSpace -= 2;
        slime.style.left = slimeLeftSpace + 'px';
      } else {
        slimeLeftSpace = 545;
      }
    }, 1);
  }
}

function moveRight() {
  if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gamePaused) {
    clearInterval(rightTimerId);

    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }

    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (slimeLeftSpace <= 560) {
        slimeLeftSpace += 2;
        slime.style.left = slimeLeftSpace + 'px';
      } else {
        slimeLeftSpace = -4;
      }
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

function playerShoot(grid, event) {
  if (event.keyCode === 32) {
    shootBullet();
    var newBullet = new Bullet(document.querySelector('.grid'), event.clientX, event.clientY);
    bullets.push(newBullet);
  }
}
function shootBullet(x, y) {
  bullets.forEach(function (bullet) {
    bullet.bottom += 3;
    var visual = bullet.visual;
    visual.style.bottom = bullet.bottom + 'px';

    if (bullet.bottom >= 600) {
      var firstbullet = bullets[0].visual;
      firstbullet.classList.remove('bullet');
      bullets.shift();
    }
  });
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
var muted = false; // Importing background music

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
var slimeSoundFour = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3"); // Adjusting slime sound volumes

var slimeVolume = 0.05;
slimeSoundOne.volume = slimeVolume;
slimeSoundTwo.volume = slimeVolume;
slimeSoundThree.volume = slimeVolume;
slimeSoundFour.volume = slimeVolume; // Pushing slime sounds into an array

var backgroundMusicVolume = 0.1;
backgroundMusicOne.volume = backgroundMusicVolume;
backgroundMusicTwo.volume = backgroundMusicVolume;
backgroundMusicThree.volume = backgroundMusicVolume;
backgroundMusicFour.volume = backgroundMusicVolume;
backgroundMusicFive.volume = backgroundMusicVolume;
backgroundMusicSix.volume = backgroundMusicVolume;
backgroundMusicSeven.volume = backgroundMusicVolume;
backgroundMusicEight.volume = backgroundMusicVolume;
var slimeSounds = [slimeSoundOne, slimeSoundTwo, slimeSoundThree, slimeSoundFour]; // Returning random slime sound when called

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function slimeSoundPlay() {
  if (!muted) sample(slimeSounds).play();
}
function backgroundMusicPlay() {
  if (!muted) sample(backgroundMusic).play();
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
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUssQ0FBQ0MsSUFBRCxDQUFMO0FBQ0gsQ0FGRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF0Zm9ybS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyU2hvb3QuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvc291bmQuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlUGxheWVyLCBzbGltZUp1bXAsIHBsYXllck1vdmVtZW50cywgc3RvcFBsYXllck1vdmVtZW50cywgdXBUaW1lcklkLCBkb3duVGltZXJJZCwgbGVmdFRpbWVySWQsIHJpZ2h0VGltZXJJZH0gZnJvbSBcIi4vcGxheWVyLmpzXCJcbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1zLCBtb3ZlUGxhdGZvcm1zLCBzY29yZX0gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtiYWNrZ3JvdW5kTXVzaWNQbGF5fSBmcm9tIFwiLi9zb3VuZC5qc1wiXG5pbXBvcnQge3BsYXllclNob290LCBzaG9vdEJ1bGxldH0gZnJvbSBcIi4vcGxheWVyU2hvb3QuanNcIlxuXG5leHBvcnQgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG5leHBvcnQgbGV0IGdhbWVQYXVzZWQgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KGdyaWQpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY3JlYXRlUGxhdGZvcm1zKCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNyZWF0ZVBsYXllcigpOyB9LCAzMDApXG4gICAgICAgIHNldEludGVydmFsKG1vdmVQbGF0Zm9ybXMsIDEpO1xuICAgICAgICBzZXRJbnRlcnZhbChzaG9vdEJ1bGxldCwgMSk7XG4gICAgICAgIHNsaW1lSnVtcCgpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJTaG9vdC5iaW5kKHRoaXMsIGdyaWQpKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tncm91bmRNdXNpY1BsYXkpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJNb3ZlbWVudHMpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc3RvcFBsYXllck1vdmVtZW50cylcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBhdXNlR2FtZSlcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmRHYW1lKGdyaWQpIHtcbiAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgd2hpbGUgKGdyaWQuZmlyc3RDaGlsZCkgeyBncmlkLnJlbW92ZUNoaWxkKGdyaWQuZmlyc3RDaGlsZCkgfVxuICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gICAgZ3JpZC5pbm5lckhUTUwgPSBgWW91ciBmaW5hbCBzY29yZSB3YXM6ICR7c2NvcmV9YFxuXG59XG5cbmZ1bmN0aW9uIHBhdXNlR2FtZShldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNyAmJiAhZ2FtZVBhdXNlZCkge1xuICAgICAgICBcbiAgICAgICAgZ2FtZVBhdXNlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNyAmJiBnYW1lUGF1c2VkKSB7XG5cbiAgICAgICAgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbn1cblxuXG4iLCJpbXBvcnQge2dhbWVPdmVyLCBnYW1lUGF1c2VkfSBmcm9tIFwiLi9nYW1lLmpzXCJcbmltcG9ydCB7aXNKdW1waW5nLCBpc0ZhbGxpbmd9IGZyb20gXCIuL3BsYXllci5qc1wiXG5cbmxldCBwbGF0Zm9ybUNvdW50ID0gNTtcblxuZXhwb3J0IGxldCBzY29yZSA9IDA7XG5leHBvcnQgbGV0IHBsYXRmb3JtcyA9IFtdO1xuXG5jbGFzcyBQbGF0Zm9ybSB7XG4gICAgY29uc3RydWN0b3IoZ3JpZCwgbmV3UGxhdEJvdHRvbSkge1xuICAgICAgICB0aGlzLmJvdHRvbSA9IG5ld1BsYXRCb3R0b207XG4gICAgICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA1MDA7XG4gICAgICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgICAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgncGxhdGZvcm0nKTtcbiAgICAgICAgdmlzdWFsLnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gdGhpcy5ib3R0b20gKyAncHgnO1xuICAgICAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybXMoKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0Zm9ybUNvdW50OyBpKyspIHtcbiAgICAgICAgbGV0IHBsYXRmb3JtR2FwID0gNjAwIC8gcGxhdGZvcm1Db3VudDtcbiAgICAgICAgbGV0IG5ld1BsYXRCb3R0b20gPSAxMDAgKyBpICogcGxhdGZvcm1HYXA7XG4gICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCBuZXdQbGF0Qm90dG9tKTtcbiAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVBsYXRmb3JtcygpIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgcGxhdGZvcm1zLmZvckVhY2gocGxhdGZvcm0gPT4ge1xuICAgICAgICAgICAgaWYgKGlzSnVtcGluZykge1xuICAgICAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAzLjU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRmFsbGluZykge1xuICAgICAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHZpc3VhbCA9IHBsYXRmb3JtLnZpc3VhbDtcbiAgICAgICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuICAgICAgICAgICAgaWYgKCFnYW1lT3Zlcikge1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocGxhdGZvcm0uYm90dG9tIDw9IC01MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0UGxhdGZvcm0gPSBwbGF0Zm9ybXNbMF0udmlzdWFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RQbGF0Zm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF0Zm9ybScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm1zLnNoaWZ0KCk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSAxO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIDYwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKVxuICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyYWJTY29yZSgpIHtcbiAgICByZXR1cm4gc2NvcmVcbn1cblxuIiwiLy8gQWRkIGZseWluZyBlbmVtaWVzLlxuLy8gQWRkIHNob290aW5nIGZlYXR1cmUuIDUwJVxuXG5pbXBvcnQge2VuZEdhbWUsIGdhbWVQYXVzZWR9IGZyb20gXCIuL2dhbWUuanNcIjtcbmltcG9ydCB7cGxhdGZvcm1zfSBmcm9tIFwiLi9wbGF0Zm9ybS5qc1wiXG5pbXBvcnQge3NsaW1lU291bmRQbGF5fSBmcm9tIFwiLi9zb3VuZC5qc1wiXG5cbmNvbnN0IHNsaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuXG5sZXQgaXNHb2luZ0xlZnQgPSBmYWxzZTtcbmxldCBpc0dvaW5nUmlnaHQgPSBmYWxzZTtcblxuZXhwb3J0IGxldCBpc0p1bXBpbmcgPSBmYWxzZTtcbmV4cG9ydCBsZXQgaXNGYWxsaW5nID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc2xpbWVMZWZ0U3BhY2UgPSAyODA7XG5leHBvcnQgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG5leHBvcnQgbGV0IHN0YXJ0UG9pbnQgPSAyMDA7XG5leHBvcnQgbGV0IHNsaW1lQm90dG9tU3BhY2UgPSBzdGFydFBvaW50O1xuZXhwb3J0IGxldCBsZWZ0VGltZXJJZDtcbmV4cG9ydCBsZXQgcmlnaHRUaW1lcklkO1xuZXhwb3J0IGxldCB1cFRpbWVySWQ7XG5leHBvcnQgbGV0IGRvd25UaW1lcklkO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQoc2xpbWUpO1xuICAgIHNsaW1lLmNsYXNzTGlzdC5hZGQoJ3NsaW1lJyk7XG4gICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lSnVtcCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZClcbiAgICAgICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgaXNGYWxsaW5nID0gZmFsc2U7XG4gICAgICAgIHVwVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICBzbGltZUJvdHRvbVNwYWNlICs9IDE7XG4gICAgICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDEwMCkgc2xpbWVGYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxuICAgIFxufVxuXG5mdW5jdGlvbiBzbGltZUZhbGwoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKVxuICAgICAgICBpc0p1bXBpbmcgPSBmYWxzZTtcbiAgICAgICAgaXNGYWxsaW5nID0gdHJ1ZTtcbiAgICAgICAgZG93blRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghZ2FtZVBhdXNlZCkge1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNsaW1lQm90dG9tU3BhY2UgLT0gMjtcbiAgICAgICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuXG4gICAgICAgICAgICBpZiAoc2xpbWVCb3R0b21TcGFjZSA8PSAwICkge1xuICAgICAgICAgICAgICAgIGVuZEdhbWUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXRmb3Jtcy5mb3JFYWNoKHBsYXRmb3JtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKHNsaW1lQm90dG9tU3BhY2UgPj0gcGxhdGZvcm0uYm90dG9tKSAmJlxuICAgICAgICAgICAgICAgIChzbGltZUJvdHRvbVNwYWNlIDw9IChwbGF0Zm9ybS5ib3R0b20gKyAxOSkpICYmIC8vIHRvcCBvZiBwbGF0Zm9ybVxuICAgICAgICAgICAgICAgICgoc2xpbWVMZWZ0U3BhY2UgKyA0MCkgPj0gcGxhdGZvcm0ubGVmdCkgJiYgXG4gICAgICAgICAgICAgICAgKHNsaW1lTGVmdFNwYWNlIDw9IChwbGF0Zm9ybS5sZWZ0ICsgMTAwKSkgJiYgLy8gcmlnaHQgc2lkZVxuICAgICAgICAgICAgICAgICFpc0p1bXBpbmdcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludCA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgICAgICAgICAgICAgIHNsaW1lU291bmRQbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIHNsaW1lSnVtcCgpO1xuICAgICAgICAgICAgICAgICAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgfSwgMSlcbiAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgIFxuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIG1vdmVMZWZ0KCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkgbW92ZVJpZ2h0KCk7XG4gICAgfVxuIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkge1xuICAgICAgICBpc0dvaW5nTGVmdCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkge1xuICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlTGVmdCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gdHJ1ZVxuICAgICAgICBsZWZ0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAwKSB7XG4gICAgICAgICAgICBzbGltZUxlZnRTcGFjZSAtPSAyO1xuICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzbGltZUxlZnRTcGFjZSA9IDU0NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVSaWdodCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgIGlmIChpc0dvaW5nTGVmdCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpc0dvaW5nUmlnaHQgPSB0cnVlXG4gICAgICAgIHJpZ2h0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPD0gNTYwKSB7XG4gICAgICAgICAgICBzbGltZUxlZnRTcGFjZSArPSAyO1xuICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGltZUxlZnRTcGFjZSA9IC00O1xuICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxuICAgXG59XG5cbiIsImltcG9ydCB7c2xpbWVMZWZ0U3BhY2UsIHNsaW1lQm90dG9tU3BhY2V9IGZyb20gXCIuL3BsYXllci5qc1wiO1xuXG5leHBvcnQgbGV0IGJ1bGxldHMgPSBbXTtcblxuY2xhc3MgQnVsbGV0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlO1xuICAgICAgICB0aGlzLmxlZnQgPSBzbGltZUxlZnRTcGFjZTtcbiAgICAgICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdidWxsZXQnKTtcbiAgICAgICAgdmlzdWFsLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArIDEyICsgJ3B4JztcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAxMiArICdweCc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJTaG9vdChncmlkLCBldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBzaG9vdEJ1bGxldCgpO1xuICAgICAgICBsZXQgbmV3QnVsbGV0ID0gbmV3IEJ1bGxldChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgICAgYnVsbGV0cy5wdXNoKG5ld0J1bGxldCk7XG4gICAgfSBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob290QnVsbGV0KHgsIHkpIHtcbiAgICBidWxsZXRzLmZvckVhY2goYnVsbGV0ID0+IHtcbiAgICAgICAgYnVsbGV0LmJvdHRvbSArPSAzO1xuICAgICAgICBsZXQgdmlzdWFsID0gYnVsbGV0LnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGJ1bGxldC5ib3R0b20gKyAncHgnO1xuICAgICAgICBpZiAoYnVsbGV0LmJvdHRvbSA+PSA2MDApIHtcbiAgICAgICAgICAgIGxldCBmaXJzdGJ1bGxldCA9IGJ1bGxldHNbMF0udmlzdWFsO1xuICAgICAgICAgICAgZmlyc3RidWxsZXQuY2xhc3NMaXN0LnJlbW92ZSgnYnVsbGV0Jyk7XG4gICAgICAgICAgICBidWxsZXRzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuIFxuIiwibGV0IG11dGVkID0gZmFsc2U7XG5cbi8vIEltcG9ydGluZyBiYWNrZ3JvdW5kIG11c2ljXG5cbmxldCBiYWNrZ3JvdW5kTXVzaWNPbmUgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9BIExvbmVseSBDaGVycnkgVHJlZSDwn4y4Lm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNUd28gICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9IZWxsbywgaXQncyBNZSEubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1RocmVlID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL01lbGFuY2hvbGljIFdhbGsubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY0ZvdXIgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL05vIERlc3RpbmF0aW9uLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNGaXZlICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9SZWFkeSBQaXhlbCBPbmUubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1NpeCAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1J1biBBcyBGYXN0IEFzIFlvdSBDYW4ubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1NldmVuID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1RoZSBzZWFyY2gubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY0VpZ2h0ID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1dlbGNvbWUgU3BhY2UgVHJhdmVsZXIubXAzXCIpO1xuXG5sZXQgYmFja2dyb3VuZE11c2ljID0gW2JhY2tncm91bmRNdXNpY09uZSwgYmFja2dyb3VuZE11c2ljVHdvLCBiYWNrZ3JvdW5kTXVzaWNUaHJlZSwgYmFja2dyb3VuZE11c2ljRm91cixcbiAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZE11c2ljRml2ZSwgYmFja2dyb3VuZE11c2ljU2l4LCBiYWNrZ3JvdW5kTXVzaWNTZXZlbiwgYmFja2dyb3VuZE11c2ljRWlnaHRdO1xuXG4vLyBJbXBvcnRpbmcgc2xpbWUgc291bmRzXG5cbmxldCBzbGltZVNvdW5kT25lICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8wLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kVHdvICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8xLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kVGhyZWUgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8yLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kRm91ciAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8zLm1wM1wiKTtcblxuLy8gQWRqdXN0aW5nIHNsaW1lIHNvdW5kIHZvbHVtZXNcblxubGV0IHNsaW1lVm9sdW1lID0gMC4wNTtcbnNsaW1lU291bmRPbmUudm9sdW1lICAgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRUd28udm9sdW1lICAgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRUaHJlZS52b2x1bWUgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRGb3VyLnZvbHVtZSAgPSBzbGltZVZvbHVtZTtcblxuLy8gUHVzaGluZyBzbGltZSBzb3VuZHMgaW50byBhbiBhcnJheVxuXG5sZXQgYmFja2dyb3VuZE11c2ljVm9sdW1lID0gMC4xO1xuXG5iYWNrZ3JvdW5kTXVzaWNPbmUudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5iYWNrZ3JvdW5kTXVzaWNUd28gLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5iYWNrZ3JvdW5kTXVzaWNUaHJlZS52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5iYWNrZ3JvdW5kTXVzaWNGb3VyLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5iYWNrZ3JvdW5kTXVzaWNGaXZlLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5iYWNrZ3JvdW5kTXVzaWNTaXgudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5iYWNrZ3JvdW5kTXVzaWNTZXZlbi52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5iYWNrZ3JvdW5kTXVzaWNFaWdodC52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5cbmxldCBzbGltZVNvdW5kcyA9IFtzbGltZVNvdW5kT25lLCBzbGltZVNvdW5kVHdvLCBzbGltZVNvdW5kVGhyZWUsIHNsaW1lU291bmRGb3VyXTtcblxuLy8gUmV0dXJuaW5nIHJhbmRvbSBzbGltZSBzb3VuZCB3aGVuIGNhbGxlZFxuXG5mdW5jdGlvbiBzYW1wbGUoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vciAoIE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGggKV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lU291bmRQbGF5KCkge1xuICAgIGlmICghbXV0ZWQpIHNhbXBsZShzbGltZVNvdW5kcykucGxheSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFja2dyb3VuZE11c2ljUGxheSgpIHtcbiAgICBpZiAoIW11dGVkKSBzYW1wbGUoYmFja2dyb3VuZE11c2ljKS5wbGF5KCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3N0YXJ0fSBmcm9tIFwiLi9zY3JpcHRzL2dhbWUuanNcIlxuXG5jb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBzdGFydChncmlkKTtcbn0pXG4iXSwibmFtZXMiOlsiY3JlYXRlUGxheWVyIiwic2xpbWVKdW1wIiwicGxheWVyTW92ZW1lbnRzIiwic3RvcFBsYXllck1vdmVtZW50cyIsInVwVGltZXJJZCIsImRvd25UaW1lcklkIiwibGVmdFRpbWVySWQiLCJyaWdodFRpbWVySWQiLCJjcmVhdGVQbGF0Zm9ybXMiLCJtb3ZlUGxhdGZvcm1zIiwic2NvcmUiLCJiYWNrZ3JvdW5kTXVzaWNQbGF5IiwicGxheWVyU2hvb3QiLCJzaG9vdEJ1bGxldCIsImdhbWVPdmVyIiwiZ2FtZVBhdXNlZCIsInN0YXJ0IiwiZ3JpZCIsInNldFRpbWVvdXQiLCJzZXRJbnRlcnZhbCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiLCJwYXVzZUdhbWUiLCJlbmRHYW1lIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiY2xlYXJJbnRlcnZhbCIsImlubmVySFRNTCIsImV2ZW50Iiwia2V5Q29kZSIsImlzSnVtcGluZyIsImlzRmFsbGluZyIsInBsYXRmb3JtQ291bnQiLCJwbGF0Zm9ybXMiLCJQbGF0Zm9ybSIsIm5ld1BsYXRCb3R0b20iLCJib3R0b20iLCJsZWZ0IiwiTWF0aCIsInJhbmRvbSIsInZpc3VhbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsImFwcGVuZENoaWxkIiwicXVlcnlTZWxlY3RvciIsImkiLCJwbGF0Zm9ybUdhcCIsIm5ld1BsYXRmb3JtIiwicHVzaCIsImZvckVhY2giLCJwbGF0Zm9ybSIsImZpcnN0UGxhdGZvcm0iLCJyZW1vdmUiLCJzaGlmdCIsImdyYWJTY29yZSIsInNsaW1lU291bmRQbGF5Iiwic2xpbWUiLCJpc0dvaW5nTGVmdCIsImlzR29pbmdSaWdodCIsInNsaW1lTGVmdFNwYWNlIiwic3RhcnRQb2ludCIsInNsaW1lQm90dG9tU3BhY2UiLCJzbGltZUZhbGwiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsImJ1bGxldHMiLCJCdWxsZXQiLCJuZXdCdWxsZXQiLCJjbGllbnRYIiwiY2xpZW50WSIsIngiLCJ5IiwiYnVsbGV0IiwiZmlyc3RidWxsZXQiLCJtdXRlZCIsImJhY2tncm91bmRNdXNpY09uZSIsIkF1ZGlvIiwiYmFja2dyb3VuZE11c2ljVHdvIiwiYmFja2dyb3VuZE11c2ljVGhyZWUiLCJiYWNrZ3JvdW5kTXVzaWNGb3VyIiwiYmFja2dyb3VuZE11c2ljRml2ZSIsImJhY2tncm91bmRNdXNpY1NpeCIsImJhY2tncm91bmRNdXNpY1NldmVuIiwiYmFja2dyb3VuZE11c2ljRWlnaHQiLCJiYWNrZ3JvdW5kTXVzaWMiLCJzbGltZVNvdW5kT25lIiwic2xpbWVTb3VuZFR3byIsInNsaW1lU291bmRUaHJlZSIsInNsaW1lU291bmRGb3VyIiwic2xpbWVWb2x1bWUiLCJ2b2x1bWUiLCJiYWNrZ3JvdW5kTXVzaWNWb2x1bWUiLCJzbGltZVNvdW5kcyIsInNhbXBsZSIsImFycmF5IiwiZmxvb3IiLCJsZW5ndGgiLCJwbGF5Il0sInNvdXJjZVJvb3QiOiIifQ==