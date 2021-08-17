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
/* harmony export */   "start": function() { return /* binding */ start; },
/* harmony export */   "endGame": function() { return /* binding */ endGame; }
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform.js */ "./src/scripts/platform.js");
/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sound.js */ "./src/scripts/sound.js");
/* harmony import */ var _playerShoot_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./playerShoot.js */ "./src/scripts/playerShoot.js");




var gameOver = false;
function start(grid) {
  console.log("running");
  (0,_platform_js__WEBPACK_IMPORTED_MODULE_1__.createPlatforms)();
  setTimeout(function () {
    (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
  }, 250);
  setInterval(_platform_js__WEBPACK_IMPORTED_MODULE_1__.movePlatforms, 1);
  setInterval(_playerShoot_js__WEBPACK_IMPORTED_MODULE_3__.shootBullet, 1);
  (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.slimeJump)();
  document.addEventListener('keydown', _playerShoot_js__WEBPACK_IMPORTED_MODULE_3__.playerShoot.bind(this, grid));
  document.addEventListener('click', _sound_js__WEBPACK_IMPORTED_MODULE_2__.backgroundMusicPlay);
  document.addEventListener('keydown', _player_js__WEBPACK_IMPORTED_MODULE_0__.playerMovements);
  document.addEventListener('keyup', _player_js__WEBPACK_IMPORTED_MODULE_0__.stopPlayerMovements);
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
  platforms.forEach(function (platform) {
    if (_player_js__WEBPACK_IMPORTED_MODULE_1__.isJumping) {
      platform.bottom -= 3.5;
    } else if (_player_js__WEBPACK_IMPORTED_MODULE_1__.isFalling) {
      platform.bottom += 1;
    }

    var visual = platform.visual;
    visual.style.bottom = platform.bottom + 'px';

    if (!_game_js__WEBPACK_IMPORTED_MODULE_0__.gameOver) {
      if (platform.bottom <= -15) {
        score += 1;
        var firstPlatform = platforms[0].visual;
        console.log(platforms[0].visual);
        firstPlatform.classList.remove('platform');
        platforms.shift();
        var newPlatform = new Platform(grid, 600);
        platforms.push(newPlatform);
      }
    }
  });
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
var startPoint = 600;
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
  clearInterval(downTimerId);
  isJumping = true;
  isFalling = false;
  upTimerId = setInterval(function () {
    slimeBottomSpace += 2;
    slime.style.bottom = slimeBottomSpace + 'px';
    if (slimeBottomSpace > startPoint + 155) slimeFall();
  }, 1);
}

function slimeFall() {
  clearInterval(upTimerId);
  isJumping = false;
  isFalling = true;
  downTimerId = setInterval(function () {
    slimeBottomSpace -= 3;
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
  }, 1);
}

function playerMovements(event) {
  if (event.keyCode === 37 || event.keyCode === 65) moveLeft();
  if (event.keyCode === 39 || event.keyCode === 68) moveRight();
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

function moveRight() {
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
var muted = true; // Importing background music

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUVBLElBQU1wRixJQUFJLEdBQUdLLFFBQVEsQ0FBQ3dCLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBYjtBQUVBeEIsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNoRFAsRUFBQUEsdURBQUssQ0FBQ0MsSUFBRCxDQUFMO0FBQ0gsQ0FGRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF0Zm9ybS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyU2hvb3QuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvc291bmQuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlUGxheWVyLCBzbGltZUp1bXAsIHBsYXllck1vdmVtZW50cywgc3RvcFBsYXllck1vdmVtZW50cywgdXBUaW1lcklkLCBkb3duVGltZXJJZCwgbGVmdFRpbWVySWQsIHJpZ2h0VGltZXJJZH0gZnJvbSBcIi4vcGxheWVyLmpzXCJcbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1zLCBtb3ZlUGxhdGZvcm1zfSBmcm9tIFwiLi9wbGF0Zm9ybS5qc1wiXG5pbXBvcnQge2JhY2tncm91bmRNdXNpY1BsYXl9IGZyb20gXCIuL3NvdW5kLmpzXCJcbmltcG9ydCB7cGxheWVyU2hvb3QsIHNob290QnVsbGV0fSBmcm9tIFwiLi9wbGF5ZXJTaG9vdC5qc1wiXG5cbmV4cG9ydCBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KGdyaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJydW5uaW5nXCIpXG4gICAgICAgIGNyZWF0ZVBsYXRmb3JtcygpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjcmVhdGVQbGF5ZXIoKTsgfSwgMjUwKVxuICAgICAgICBzZXRJbnRlcnZhbChtb3ZlUGxhdGZvcm1zLCAxKTtcbiAgICAgICAgc2V0SW50ZXJ2YWwoc2hvb3RCdWxsZXQsIDEpO1xuICAgICAgICBzbGltZUp1bXAoKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyU2hvb3QuYmluZCh0aGlzLCBncmlkKSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiYWNrZ3JvdW5kTXVzaWNQbGF5KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyTW92ZW1lbnRzKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN0b3BQbGF5ZXJNb3ZlbWVudHMpXG4gfVxuXG5leHBvcnQgZnVuY3Rpb24gZW5kR2FtZShncmlkKSB7XG4gICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgIHdoaWxlIChncmlkLmZpcnN0Q2hpbGQpIHsgZ3JpZC5yZW1vdmVDaGlsZChncmlkLmZpcnN0Q2hpbGQpIH1cbiAgICBjbGVhckludGVydmFsKHVwVGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuXG59XG5cblxuIiwiaW1wb3J0IHtnYW1lT3Zlcn0gZnJvbSBcIi4vZ2FtZS5qc1wiXG5pbXBvcnQge2lzSnVtcGluZywgaXNGYWxsaW5nfSBmcm9tIFwiLi9wbGF5ZXIuanNcIlxuXG5sZXQgcGxhdGZvcm1Db3VudCA9IDU7XG5cbmV4cG9ydCBsZXQgc2NvcmUgPSAwO1xuZXhwb3J0IGxldCBwbGF0Zm9ybXMgPSBbXTtcblxuY2xhc3MgUGxhdGZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKGdyaWQsIG5ld1BsYXRCb3R0b20pIHtcbiAgICAgICAgdGhpcy5ib3R0b20gPSBuZXdQbGF0Qm90dG9tO1xuICAgICAgICB0aGlzLmxlZnQgPSBNYXRoLnJhbmRvbSgpICogNTAwO1xuICAgICAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ3BsYXRmb3JtJyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gdGhpcy5sZWZ0ICsgJ3B4JztcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICAgICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXRmb3JtcygpIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXRmb3JtQ291bnQ7IGkrKykge1xuICAgICAgICBsZXQgcGxhdGZvcm1HYXAgPSA2MDAgLyBwbGF0Zm9ybUNvdW50O1xuICAgICAgICBsZXQgbmV3UGxhdEJvdHRvbSA9IDEwMCArIGkgKiBwbGF0Zm9ybUdhcDtcbiAgICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIG5ld1BsYXRCb3R0b20pO1xuICAgICAgICBwbGF0Zm9ybXMucHVzaChuZXdQbGF0Zm9ybSlcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUGxhdGZvcm1zKCkge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIHBsYXRmb3Jtcy5mb3JFYWNoKHBsYXRmb3JtID0+IHtcbiAgICAgICAgaWYgKGlzSnVtcGluZykge1xuICAgICAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDMuNTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0ZhbGxpbmcpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aXN1YWwgPSBwbGF0Zm9ybS52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuICAgICAgICBpZiAoIWdhbWVPdmVyKSB7XG4gICAgICAgICAgICBpZiAocGxhdGZvcm0uYm90dG9tIDw9IC0xNSkge1xuICAgICAgICAgICAgICAgIHNjb3JlICs9IDE7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0UGxhdGZvcm0gPSBwbGF0Zm9ybXNbMF0udmlzdWFsO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBsYXRmb3Jtc1swXS52aXN1YWwpXG4gICAgICAgICAgICAgICAgZmlyc3RQbGF0Zm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF0Zm9ybScpO1xuICAgICAgICAgICAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCA2MDApXG4gICAgICAgICAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JhYlNjb3JlKCkge1xuICAgIHJldHVybiBzY29yZVxufVxuXG4iLCIvLyBBZGQgZmx5aW5nIGVuZW1pZXMuXG4vLyBBZGQgc2hvb3RpbmcgZmVhdHVyZS4gNTAlXG5cbmltcG9ydCB7ZW5kR2FtZX0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xuaW1wb3J0IHtwbGF0Zm9ybXN9IGZyb20gXCIuL3BsYXRmb3JtLmpzXCJcbmltcG9ydCB7c2xpbWVTb3VuZFBsYXl9IGZyb20gXCIuL3NvdW5kLmpzXCJcblxuY29uc3Qgc2xpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG5cbmxldCBpc0dvaW5nTGVmdCA9IGZhbHNlO1xubGV0IGlzR29pbmdSaWdodCA9IGZhbHNlO1xuXG5leHBvcnQgbGV0IGlzSnVtcGluZyA9IGZhbHNlO1xuZXhwb3J0IGxldCBpc0ZhbGxpbmcgPSB0cnVlO1xuZXhwb3J0IGxldCBzbGltZUxlZnRTcGFjZSA9IDI4MDtcbmV4cG9ydCBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbmV4cG9ydCBsZXQgc3RhcnRQb2ludCA9IDYwMDtcbmV4cG9ydCBsZXQgc2xpbWVCb3R0b21TcGFjZSA9IHN0YXJ0UG9pbnQ7XG5leHBvcnQgbGV0IGxlZnRUaW1lcklkO1xuZXhwb3J0IGxldCByaWdodFRpbWVySWQ7XG5leHBvcnQgbGV0IHVwVGltZXJJZDtcbmV4cG9ydCBsZXQgZG93blRpbWVySWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKS5hcHBlbmRDaGlsZChzbGltZSk7XG4gICAgc2xpbWUuY2xhc3NMaXN0LmFkZCgnc2xpbWUnKTtcbiAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnO1xuICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpbWVKdW1wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpXG4gICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICBpc0ZhbGxpbmcgPSBmYWxzZTtcbiAgICB1cFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgc2xpbWVCb3R0b21TcGFjZSArPSAyO1xuICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPiBzdGFydFBvaW50ICsgMTU1KSBzbGltZUZhbGwoKTtcbiAgICB9LCAxKVxufVxuXG5mdW5jdGlvbiBzbGltZUZhbGwoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpXG4gICAgaXNKdW1waW5nID0gZmFsc2U7XG4gICAgaXNGYWxsaW5nID0gdHJ1ZTtcbiAgICBkb3duVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzbGltZUJvdHRvbVNwYWNlIC09IDM7XG4gICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuXG4gICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlIDw9IDAgKSB7XG4gICAgICAgICAgICBlbmRHYW1lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxhdGZvcm1zLmZvckVhY2gocGxhdGZvcm0gPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoc2xpbWVCb3R0b21TcGFjZSA+PSBwbGF0Zm9ybS5ib3R0b20pICYmXG4gICAgICAgICAgICAgIChzbGltZUJvdHRvbVNwYWNlIDw9IChwbGF0Zm9ybS5ib3R0b20gKyAxOSkpICYmIC8vIHRvcCBvZiBwbGF0Zm9ybVxuICAgICAgICAgICAgICAoKHNsaW1lTGVmdFNwYWNlICsgNDApID49IHBsYXRmb3JtLmxlZnQpICYmIFxuICAgICAgICAgICAgICAoc2xpbWVMZWZ0U3BhY2UgPD0gKHBsYXRmb3JtLmxlZnQgKyAxMDApKSAmJiAvLyByaWdodCBzaWRlXG4gICAgICAgICAgICAgICFpc0p1bXBpbmdcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRQb2ludCA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgICAgICAgICAgc2xpbWVTb3VuZFBsYXkoKTtcbiAgICAgICAgICAgICAgICBzbGltZUp1bXAoKTtcbiAgICAgICAgICAgICAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICB9LCAxKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSBtb3ZlTGVmdCgpO1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkgbW92ZVJpZ2h0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wUGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSB7XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSB7XG4gICAgICAgIGlzR29pbmdSaWdodCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVMZWZ0KCkge1xuICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICB9XG4gICAgaXNHb2luZ0xlZnQgPSB0cnVlXG4gICAgbGVmdFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAwKSB7XG4gICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgLT0gMjtcbiAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgPSA1NDU7XG4gICAgICAgIH1cbiAgICB9LCAxKVxufVxuXG5mdW5jdGlvbiBtb3ZlUmlnaHQoKSB7XG4gICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgaWYgKGlzR29pbmdMZWZ0KSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICB9XG4gICAgaXNHb2luZ1JpZ2h0ID0gdHJ1ZVxuICAgIHJpZ2h0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA8PSA1NjApIHtcbiAgICAgICAgc2xpbWVMZWZ0U3BhY2UgKz0gMjtcbiAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpbWVMZWZ0U3BhY2UgPSAtNDtcbiAgICB9XG4gICAgfSwgMSlcbn1cblxuIiwiaW1wb3J0IHtzbGltZUxlZnRTcGFjZSwgc2xpbWVCb3R0b21TcGFjZX0gZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5cbmV4cG9ydCBsZXQgYnVsbGV0cyA9IFtdO1xuXG5jbGFzcyBCdWxsZXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgIHRoaXMubGVmdCA9IHNsaW1lTGVmdFNwYWNlO1xuICAgICAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2J1bGxldCcpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgMTIgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArIDEyICsgJ3B4JztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKS5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclNob290KGdyaWQsIGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNob290QnVsbGV0KCk7XG4gICAgICAgIGxldCBuZXdCdWxsZXQgPSBuZXcgQnVsbGV0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyksIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICBidWxsZXRzLnB1c2gobmV3QnVsbGV0KTtcbiAgICB9IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvb3RCdWxsZXQoeCwgeSkge1xuICAgIGJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4ge1xuICAgICAgICBidWxsZXQuYm90dG9tICs9IDM7XG4gICAgICAgIGxldCB2aXN1YWwgPSBidWxsZXQudmlzdWFsO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gYnVsbGV0LmJvdHRvbSArICdweCc7XG4gICAgICAgIGlmIChidWxsZXQuYm90dG9tID49IDYwMCkge1xuICAgICAgICAgICAgbGV0IGZpcnN0YnVsbGV0ID0gYnVsbGV0c1swXS52aXN1YWw7XG4gICAgICAgICAgICBmaXJzdGJ1bGxldC5jbGFzc0xpc3QucmVtb3ZlKCdidWxsZXQnKTtcbiAgICAgICAgICAgIGJ1bGxldHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG4gXG4iLCJsZXQgbXV0ZWQgPSB0cnVlO1xuXG4vLyBJbXBvcnRpbmcgYmFja2dyb3VuZCBtdXNpY1xuXG5sZXQgYmFja2dyb3VuZE11c2ljT25lICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvQSBMb25lbHkgQ2hlcnJ5IFRyZWUg8J+MuC5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljVHdvICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvSGVsbG8sIGl0J3MgTWUhLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNUaHJlZSA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9NZWxhbmNob2xpYyBXYWxrLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNGb3VyICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9ObyBEZXN0aW5hdGlvbi5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRml2ZSAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvUmVhZHkgUGl4ZWwgT25lLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNTaXggICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9SdW4gQXMgRmFzdCBBcyBZb3UgQ2FuLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNTZXZlbiA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9UaGUgc2VhcmNoLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNFaWdodCA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9XZWxjb21lIFNwYWNlIFRyYXZlbGVyLm1wM1wiKTtcblxubGV0IGJhY2tncm91bmRNdXNpYyA9IFtiYWNrZ3JvdW5kTXVzaWNPbmUsIGJhY2tncm91bmRNdXNpY1R3bywgYmFja2dyb3VuZE11c2ljVGhyZWUsIGJhY2tncm91bmRNdXNpY0ZvdXIsXG4gICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRNdXNpY0ZpdmUsIGJhY2tncm91bmRNdXNpY1NpeCwgYmFja2dyb3VuZE11c2ljU2V2ZW4sIGJhY2tncm91bmRNdXNpY0VpZ2h0XTtcblxuLy8gSW1wb3J0aW5nIHNsaW1lIHNvdW5kc1xuXG5sZXQgc2xpbWVTb3VuZE9uZSAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMC5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFR3byAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMS5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFRocmVlID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMi5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZEZvdXIgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMy5tcDNcIik7XG5cbi8vIEFkanVzdGluZyBzbGltZSBzb3VuZCB2b2x1bWVzXG5cbmxldCBzbGltZVZvbHVtZSA9IDAuMDU7XG5zbGltZVNvdW5kT25lLnZvbHVtZSAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kVHdvLnZvbHVtZSAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kVGhyZWUudm9sdW1lID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kRm91ci52b2x1bWUgID0gc2xpbWVWb2x1bWU7XG5cbi8vIFB1c2hpbmcgc2xpbWUgc291bmRzIGludG8gYW4gYXJyYXlcblxubGV0IGJhY2tncm91bmRNdXNpY1ZvbHVtZSA9IDAuMTtcblxuYmFja2dyb3VuZE11c2ljT25lLnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljVHdvIC52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljVGhyZWUudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljRm91ci52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljRml2ZS52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljU2l4LnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljU2V2ZW4udm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljRWlnaHQudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuXG5sZXQgc2xpbWVTb3VuZHMgPSBbc2xpbWVTb3VuZE9uZSwgc2xpbWVTb3VuZFR3bywgc2xpbWVTb3VuZFRocmVlLCBzbGltZVNvdW5kRm91cl07XG5cbi8vIFJldHVybmluZyByYW5kb20gc2xpbWUgc291bmQgd2hlbiBjYWxsZWRcblxuZnVuY3Rpb24gc2FtcGxlKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IgKCBNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoICldXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGltZVNvdW5kUGxheSgpIHtcbiAgICBpZiAoIW11dGVkKSBzYW1wbGUoc2xpbWVTb3VuZHMpLnBsYXkoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhY2tncm91bmRNdXNpY1BsYXkoKSB7XG4gICAgaWYgKCFtdXRlZCkgc2FtcGxlKGJhY2tncm91bmRNdXNpYykucGxheSgpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtzdGFydH0gZnJvbSBcIi4vc2NyaXB0cy9nYW1lLmpzXCJcblxuY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgc3RhcnQoZ3JpZCk7XG59KVxuIl0sIm5hbWVzIjpbImNyZWF0ZVBsYXllciIsInNsaW1lSnVtcCIsInBsYXllck1vdmVtZW50cyIsInN0b3BQbGF5ZXJNb3ZlbWVudHMiLCJ1cFRpbWVySWQiLCJkb3duVGltZXJJZCIsImxlZnRUaW1lcklkIiwicmlnaHRUaW1lcklkIiwiY3JlYXRlUGxhdGZvcm1zIiwibW92ZVBsYXRmb3JtcyIsImJhY2tncm91bmRNdXNpY1BsYXkiLCJwbGF5ZXJTaG9vdCIsInNob290QnVsbGV0IiwiZ2FtZU92ZXIiLCJzdGFydCIsImdyaWQiLCJjb25zb2xlIiwibG9nIiwic2V0VGltZW91dCIsInNldEludGVydmFsIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsImVuZEdhbWUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJjbGVhckludGVydmFsIiwiaXNKdW1waW5nIiwiaXNGYWxsaW5nIiwicGxhdGZvcm1Db3VudCIsInNjb3JlIiwicGxhdGZvcm1zIiwiUGxhdGZvcm0iLCJuZXdQbGF0Qm90dG9tIiwiYm90dG9tIiwibGVmdCIsIk1hdGgiLCJyYW5kb20iLCJ2aXN1YWwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJpIiwicGxhdGZvcm1HYXAiLCJuZXdQbGF0Zm9ybSIsInB1c2giLCJmb3JFYWNoIiwicGxhdGZvcm0iLCJmaXJzdFBsYXRmb3JtIiwicmVtb3ZlIiwic2hpZnQiLCJncmFiU2NvcmUiLCJzbGltZVNvdW5kUGxheSIsInNsaW1lIiwiaXNHb2luZ0xlZnQiLCJpc0dvaW5nUmlnaHQiLCJzbGltZUxlZnRTcGFjZSIsInN0YXJ0UG9pbnQiLCJzbGltZUJvdHRvbVNwYWNlIiwic2xpbWVGYWxsIiwiZXZlbnQiLCJrZXlDb2RlIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJidWxsZXRzIiwiQnVsbGV0IiwibmV3QnVsbGV0IiwiY2xpZW50WCIsImNsaWVudFkiLCJ4IiwieSIsImJ1bGxldCIsImZpcnN0YnVsbGV0IiwibXV0ZWQiLCJiYWNrZ3JvdW5kTXVzaWNPbmUiLCJBdWRpbyIsImJhY2tncm91bmRNdXNpY1R3byIsImJhY2tncm91bmRNdXNpY1RocmVlIiwiYmFja2dyb3VuZE11c2ljRm91ciIsImJhY2tncm91bmRNdXNpY0ZpdmUiLCJiYWNrZ3JvdW5kTXVzaWNTaXgiLCJiYWNrZ3JvdW5kTXVzaWNTZXZlbiIsImJhY2tncm91bmRNdXNpY0VpZ2h0IiwiYmFja2dyb3VuZE11c2ljIiwic2xpbWVTb3VuZE9uZSIsInNsaW1lU291bmRUd28iLCJzbGltZVNvdW5kVGhyZWUiLCJzbGltZVNvdW5kRm91ciIsInNsaW1lVm9sdW1lIiwidm9sdW1lIiwiYmFja2dyb3VuZE11c2ljVm9sdW1lIiwic2xpbWVTb3VuZHMiLCJzYW1wbGUiLCJhcnJheSIsImZsb29yIiwibGVuZ3RoIiwicGxheSJdLCJzb3VyY2VSb290IjoiIn0=