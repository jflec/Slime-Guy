/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/platform.js":
/*!*********************************!*\
  !*** ./src/scripts/platform.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "totalScore": function() { return /* binding */ totalScore; },
/* harmony export */   "platforms": function() { return /* binding */ platforms; },
/* harmony export */   "createPlatforms": function() { return /* binding */ createPlatforms; },
/* harmony export */   "movePlatforms": function() { return /* binding */ movePlatforms; }
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var platformCount = 5;
var totalScore = _player_js__WEBPACK_IMPORTED_MODULE_0__.score;
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

function createPlatforms(grid) {
  for (var i = 0; i < platformCount; i++) {
    var platformGap = 600 / platformCount;
    var newPlatBottom = 100 + i * platformGap;
    var newPlatform = new Platform(grid, newPlatBottom);
    platforms.push(newPlatform);
  }
}
function movePlatforms(grid) {
  platforms.forEach(function (platform) {
    platform.bottom -= 0.75;
    var visual = platform.visual;
    visual.style.bottom = platform.bottom + 'px';

    if (platform.bottom <= -0) {
      var firstPlatform = platforms[0].visual;
      firstPlatform.classList.remove('platform');
      platforms.shift();
      totalScore++;
      var newPlatform = new Platform(grid, 600);
      platforms.push(newPlatform);
    }
  });
}

/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slimeLeftSpace": function() { return /* binding */ slimeLeftSpace; },
/* harmony export */   "score": function() { return /* binding */ score; },
/* harmony export */   "startPoint": function() { return /* binding */ startPoint; },
/* harmony export */   "slimeBottomSpace": function() { return /* binding */ slimeBottomSpace; },
/* harmony export */   "upTimerId": function() { return /* binding */ upTimerId; },
/* harmony export */   "downTimerId": function() { return /* binding */ downTimerId; },
/* harmony export */   "createPlayer": function() { return /* binding */ createPlayer; },
/* harmony export */   "slimeJump": function() { return /* binding */ slimeJump; },
/* harmony export */   "playerMovements": function() { return /* binding */ playerMovements; },
/* harmony export */   "stopPlayerMovements": function() { return /* binding */ stopPlayerMovements; },
/* harmony export */   "gameOver": function() { return /* binding */ gameOver; }
/* harmony export */ });
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform.js */ "./src/scripts/platform.js");
/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sound.js */ "./src/scripts/sound.js");
// Add score system.
// Add starting platform.
// Add flying enemies.
// Add shooting feature.
// Potentially have background that scales with player Y.


var slime = document.createElement('div');
var isJumping = false;
var isGoingLeft = false;
var isGoingRight = false;
var leftTimerId;
var rightTimerId;
var slimeLeftSpace = 50;
var score = 0;
var startPoint = 150;
var slimeBottomSpace = startPoint;
var upTimerId;
var downTimerId;
function createPlayer(grid) {
  grid.appendChild(slime);
  slime.classList.add('slime');
  slime.style.left = slimeLeftSpace + 'px';
  slime.style.bottom = slimeBottomSpace + 'px';
}
function slimeJump() {
  clearInterval(downTimerId);
  isJumping = true;
  upTimerId = setInterval(function () {
    slimeBottomSpace += 3;
    slime.style.bottom = slimeBottomSpace + 'px';
    if (slimeBottomSpace > startPoint + 175) slimeFall();
  }, 1);
}

function slimeFall() {
  clearInterval(upTimerId);
  isJumping = false;
  downTimerId = setInterval(function () {
    slimeBottomSpace -= 2;
    slime.style.bottom = slimeBottomSpace + 'px';
    if (slimeBottomSpace <= 0) gameOver(true);
    _platform_js__WEBPACK_IMPORTED_MODULE_0__.platforms.forEach(function (platform) {
      if (slimeBottomSpace >= platform.bottom && slimeBottomSpace <= platform.bottom + 15 && slimeLeftSpace + 60 >= platform.left && slimeLeftSpace <= platform.left + 85 && !isJumping) {
        startPoint = slimeBottomSpace;
        (0,_sound_js__WEBPACK_IMPORTED_MODULE_1__.slimeSoundPlay)();
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

function gameOver(isGameOver) {
  if (isGameOver) {
    var grid = document.querySelector('.grid');

    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }

    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    console.log("game is done");
    return true;
  } else if (!isGameOver) {
    console.log("game not done");
    return false;
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
/* harmony export */   "createBullet": function() { return /* binding */ createBullet; },
/* harmony export */   "shootBullet": function() { return /* binding */ shootBullet; }
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var bullets = [];

var Bullet = function Bullet(grid) {
  _classCallCheck(this, Bullet);

  this.bottom = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeBottomSpace;
  this.left = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeLeftSpace;
  this.visual = document.createElement('div');
  var visual = this.visual;
  visual.classList.add('bullet');
  visual.style.left = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeLeftSpace + 'px';
  visual.style.bottom = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeBottomSpace + 'px';
  grid.appendChild(visual);
};

function createBullet(grid, event) {
  console.log("new bullet");
  var newBullet = new Bullet(grid, event.clientX, event.clientY);
  bullets.push(newBullet);
}
function shootBullet(x, y) {
  console.log("shoot bullet");
  bullets.forEach(function (bullet) {
    bullet.bottom += 1.5;
    var visual = bullet.visual;
    visual.style.bottom = bullet.bottom + 'px';

    if (bullet.bottom <= -0) {
      var firstbullet = bullets[0].visual;
      firstbullet.classList.remove('bullet');
      bullets.shift();
    }
  });
} // if (bulletLeftSpace <= 560) {
//     clearInterval(shootTimerId)
// }
// for (let i = bullet.style.left; i < x; i++) {
//     bulletLeftSpace += 1;
//     bullet.style.left += bulletLeftSpace + 'px';
// }
// for (let j = bullet.style.bottom; j < y; j++) {
//     bulletLeftSpace += 1;
//     bullet.style.left += bulletBottomSpace + 'px';
// }

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
/* harmony import */ var _scripts_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/player.js */ "./src/scripts/player.js");
/* harmony import */ var _scripts_platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/platform.js */ "./src/scripts/platform.js");
/* harmony import */ var _scripts_sound_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/sound.js */ "./src/scripts/sound.js");
/* harmony import */ var _scripts_playerShoot_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/playerShoot.js */ "./src/scripts/playerShoot.js");




document.addEventListener('DOMContentLoaded', function () {
  var grid = document.querySelector('.grid');

  function start() {
    if (!(0,_scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.gameOver)()) {
      (0,_scripts_platform_js__WEBPACK_IMPORTED_MODULE_1__.createPlatforms)(grid);
      (0,_scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(grid);
      setInterval(_scripts_platform_js__WEBPACK_IMPORTED_MODULE_1__.movePlatforms.bind(this, grid), 1);
      setInterval(_scripts_playerShoot_js__WEBPACK_IMPORTED_MODULE_3__.shootBullet.bind(this, grid), 1);
      (0,_scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.slimeJump)();
      document.addEventListener('click', _scripts_playerShoot_js__WEBPACK_IMPORTED_MODULE_3__.createBullet.bind(this, grid));
      document.addEventListener('click', _scripts_sound_js__WEBPACK_IMPORTED_MODULE_2__.backgroundMusicPlay);
      document.addEventListener('keydown', _scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.playerMovements);
      document.addEventListener('keyup', _scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.stopPlayerMovements);
    }
  }

  start();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSIsInNvdXJjZXMiOlsid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXRmb3JtLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXJTaG9vdC5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9zb3VuZC5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtzY29yZX0gZnJvbSBcIi4vcGxheWVyLmpzXCJcblxubGV0IHBsYXRmb3JtQ291bnQgPSA1O1xuXG5leHBvcnQgbGV0IHRvdGFsU2NvcmUgPSBzY29yZTtcbmV4cG9ydCBsZXQgcGxhdGZvcm1zID0gW107XG5cbmNsYXNzIFBsYXRmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gbmV3UGxhdEJvdHRvbTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gTWF0aC5yYW5kb20oKSAqIDUwMDtcbiAgICAgICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdwbGF0Zm9ybScpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSB0aGlzLmJvdHRvbSArICdweCc7XG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybXMoZ3JpZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhdGZvcm1Db3VudDsgaSsrKSB7XG4gICAgICAgIGxldCBwbGF0Zm9ybUdhcCA9IDYwMCAvIHBsYXRmb3JtQ291bnQ7XG4gICAgICAgIGxldCBuZXdQbGF0Qm90dG9tID0gMTAwICsgaSAqIHBsYXRmb3JtR2FwO1xuICAgICAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgbmV3UGxhdEJvdHRvbSk7XG5cbiAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVQbGF0Zm9ybXMoZ3JpZCkge1xuICAgIHBsYXRmb3Jtcy5mb3JFYWNoKHBsYXRmb3JtID0+IHtcbiAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDAuNzU7XG4gICAgICAgIGxldCB2aXN1YWwgPSBwbGF0Zm9ybS52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuICAgICAgICBpZiAocGxhdGZvcm0uYm90dG9tIDw9IC0wKSB7XG5cbiAgICAgICAgICAgIGxldCBmaXJzdFBsYXRmb3JtID0gcGxhdGZvcm1zWzBdLnZpc3VhbDtcbiAgICAgICAgICAgIGZpcnN0UGxhdGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgncGxhdGZvcm0nKTtcbiAgICAgICAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgICAgICAgdG90YWxTY29yZSsrO1xuICAgICAgICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIDYwMClcbiAgICAgICAgICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuIiwiLy8gQWRkIHNjb3JlIHN5c3RlbS5cbi8vIEFkZCBzdGFydGluZyBwbGF0Zm9ybS5cbi8vIEFkZCBmbHlpbmcgZW5lbWllcy5cbi8vIEFkZCBzaG9vdGluZyBmZWF0dXJlLlxuLy8gUG90ZW50aWFsbHkgaGF2ZSBiYWNrZ3JvdW5kIHRoYXQgc2NhbGVzIHdpdGggcGxheWVyIFkuXG5cbmltcG9ydCB7cGxhdGZvcm1zfSBmcm9tIFwiLi9wbGF0Zm9ybS5qc1wiXG5pbXBvcnQge3NsaW1lU291bmRQbGF5fSBmcm9tIFwiLi9zb3VuZC5qc1wiXG5cbmNvbnN0IHNsaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxubGV0IGlzSnVtcGluZyA9IGZhbHNlO1xubGV0IGlzR29pbmdMZWZ0ID0gZmFsc2U7XG5sZXQgaXNHb2luZ1JpZ2h0ID0gZmFsc2U7XG5sZXQgbGVmdFRpbWVySWQ7XG5sZXQgcmlnaHRUaW1lcklkO1xuXG5leHBvcnQgbGV0IHNsaW1lTGVmdFNwYWNlID0gNTA7XG5leHBvcnQgbGV0IHNjb3JlID0gMDtcbmV4cG9ydCBsZXQgc3RhcnRQb2ludCA9IDE1MDtcbmV4cG9ydCBsZXQgc2xpbWVCb3R0b21TcGFjZSA9IHN0YXJ0UG9pbnQ7XG5leHBvcnQgbGV0IHVwVGltZXJJZDtcbmV4cG9ydCBsZXQgZG93blRpbWVySWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoZ3JpZCkge1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoc2xpbWUpO1xuICAgIHNsaW1lLmNsYXNzTGlzdC5hZGQoJ3NsaW1lJyk7XG4gICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lSnVtcCgpIHtcbiAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKVxuICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgdXBUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNsaW1lQm90dG9tU3BhY2UgKz0gMztcbiAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDE3NSkgc2xpbWVGYWxsKCk7XG4gICAgfSwgMSlcbn1cblxuZnVuY3Rpb24gc2xpbWVGYWxsKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKVxuICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgIGRvd25UaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNsaW1lQm90dG9tU3BhY2UgLT0gMjtcbiAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlIDw9IDAgKSBnYW1lT3Zlcih0cnVlKTtcblxuICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSkgJiZcbiAgICAgICAgICAgICAgKHNsaW1lQm90dG9tU3BhY2UgPD0gKHBsYXRmb3JtLmJvdHRvbSArIDE1KSkgJiZcbiAgICAgICAgICAgICAgKChzbGltZUxlZnRTcGFjZSArIDYwKSA+PSBwbGF0Zm9ybS5sZWZ0KSAmJiBcbiAgICAgICAgICAgICAgKHNsaW1lTGVmdFNwYWNlIDw9IChwbGF0Zm9ybS5sZWZ0ICsgODUpKSAmJlxuICAgICAgICAgICAgICAhaXNKdW1waW5nXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQgPSBzbGltZUJvdHRvbVNwYWNlO1xuICAgICAgICAgICAgICAgIHNsaW1lU291bmRQbGF5KCk7XG4gICAgICAgICAgICAgICAgc2xpbWVKdW1wKCk7XG4gICAgICAgICAgICAgICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgfSwgMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkgbW92ZUxlZnQoKTtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIG1vdmVSaWdodCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkge1xuICAgICAgICBpc0dvaW5nTGVmdCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkge1xuICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlTGVmdCgpIHtcbiAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgIGlmIChpc0dvaW5nUmlnaHQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgIGlzR29pbmdSaWdodCA9IGZhbHNlXG4gICAgfVxuICAgIGlzR29pbmdMZWZ0ID0gdHJ1ZVxuICAgIGxlZnRUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPj0gMCkge1xuICAgICAgICAgIHNsaW1lTGVmdFNwYWNlIC09IDI7XG4gICAgICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaW1lTGVmdFNwYWNlID0gNTQ1O1xuICAgICAgICB9XG4gICAgfSwgMSlcbn1cblxuZnVuY3Rpb24gbW92ZVJpZ2h0KCkge1xuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKVxuICAgIGlmIChpc0dvaW5nTGVmdCkge1xuICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgICAgICBpc0dvaW5nTGVmdCA9IGZhbHNlXG4gICAgfVxuICAgIGlzR29pbmdSaWdodCA9IHRydWVcbiAgICByaWdodFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPD0gNTYwKSB7XG4gICAgICAgIHNsaW1lTGVmdFNwYWNlICs9IDI7XG4gICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaW1lTGVmdFNwYWNlID0gLTQ7XG4gICAgfVxuICAgIH0sIDEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lT3Zlcihpc0dhbWVPdmVyKSB7XG4gICAgaWYgKGlzR2FtZU92ZXIpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgICAgIHdoaWxlIChncmlkLmZpcnN0Q2hpbGQpIHsgZ3JpZC5yZW1vdmVDaGlsZChncmlkLmZpcnN0Q2hpbGQpIH1cbiAgICAgICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpO1xuICAgICAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIGlzIGRvbmVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBcbiAgICB9IGVsc2UgaWYgKCFpc0dhbWVPdmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBub3QgZG9uZVwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7c2xpbWVMZWZ0U3BhY2UsIHNsaW1lQm90dG9tU3BhY2V9IGZyb20gXCIuL3BsYXllci5qc1wiO1xuXG5leHBvcnQgbGV0IGJ1bGxldHMgPSBbXTtcblxuY2xhc3MgQnVsbGV0IHtcbiAgICBjb25zdHJ1Y3RvcihncmlkKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2U7XG4gICAgICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgICAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnYnVsbGV0Jyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdWxsZXQoZ3JpZCwgZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm5ldyBidWxsZXRcIilcbiAgICBsZXQgbmV3QnVsbGV0ID0gbmV3IEJ1bGxldChncmlkLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICBidWxsZXRzLnB1c2gobmV3QnVsbGV0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob290QnVsbGV0KHgsIHkpIHtcbiAgICBjb25zb2xlLmxvZyhcInNob290IGJ1bGxldFwiKVxuICAgIGJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4ge1xuICAgICAgICBidWxsZXQuYm90dG9tICs9IDEuNTtcbiAgICAgICAgICAgIGxldCB2aXN1YWwgPSBidWxsZXQudmlzdWFsO1xuICAgICAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGJ1bGxldC5ib3R0b20gKyAncHgnO1xuICAgICAgICAgICAgaWYgKGJ1bGxldC5ib3R0b20gPD0gLTApIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RidWxsZXQgPSBidWxsZXRzWzBdLnZpc3VhbDtcbiAgICAgICAgICAgICAgICBmaXJzdGJ1bGxldC5jbGFzc0xpc3QucmVtb3ZlKCdidWxsZXQnKTtcbiAgICAgICAgICAgICAgICBidWxsZXRzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuIFxuXG4gICAgLy8gaWYgKGJ1bGxldExlZnRTcGFjZSA8PSA1NjApIHtcbiAgICAvLyAgICAgY2xlYXJJbnRlcnZhbChzaG9vdFRpbWVySWQpXG4gICAgLy8gfVxuXG4gICAgLy8gZm9yIChsZXQgaSA9IGJ1bGxldC5zdHlsZS5sZWZ0OyBpIDwgeDsgaSsrKSB7XG4gICAgLy8gICAgIGJ1bGxldExlZnRTcGFjZSArPSAxO1xuICAgIC8vICAgICBidWxsZXQuc3R5bGUubGVmdCArPSBidWxsZXRMZWZ0U3BhY2UgKyAncHgnO1xuICAgIC8vIH1cblxuICAgIC8vIGZvciAobGV0IGogPSBidWxsZXQuc3R5bGUuYm90dG9tOyBqIDwgeTsgaisrKSB7XG4gICAgLy8gICAgIGJ1bGxldExlZnRTcGFjZSArPSAxO1xuICAgIC8vICAgICBidWxsZXQuc3R5bGUubGVmdCArPSBidWxsZXRCb3R0b21TcGFjZSArICdweCc7XG4gICAgLy8gfVxuICAgICAgICBcblxuXG4iLCJsZXQgbXV0ZWQgPSB0cnVlO1xuXG4vLyBJbXBvcnRpbmcgYmFja2dyb3VuZCBtdXNpY1xuXG5sZXQgYmFja2dyb3VuZE11c2ljT25lICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvQSBMb25lbHkgQ2hlcnJ5IFRyZWUg8J+MuC5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljVHdvICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvSGVsbG8sIGl0J3MgTWUhLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNUaHJlZSA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9NZWxhbmNob2xpYyBXYWxrLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNGb3VyICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9ObyBEZXN0aW5hdGlvbi5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRml2ZSAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvUmVhZHkgUGl4ZWwgT25lLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNTaXggICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9SdW4gQXMgRmFzdCBBcyBZb3UgQ2FuLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNTZXZlbiA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9UaGUgc2VhcmNoLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNFaWdodCA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9XZWxjb21lIFNwYWNlIFRyYXZlbGVyLm1wM1wiKTtcblxubGV0IGJhY2tncm91bmRNdXNpYyA9IFtiYWNrZ3JvdW5kTXVzaWNPbmUsIGJhY2tncm91bmRNdXNpY1R3bywgYmFja2dyb3VuZE11c2ljVGhyZWUsIGJhY2tncm91bmRNdXNpY0ZvdXIsXG4gICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRNdXNpY0ZpdmUsIGJhY2tncm91bmRNdXNpY1NpeCwgYmFja2dyb3VuZE11c2ljU2V2ZW4sIGJhY2tncm91bmRNdXNpY0VpZ2h0XTtcblxuLy8gSW1wb3J0aW5nIHNsaW1lIHNvdW5kc1xuXG5sZXQgc2xpbWVTb3VuZE9uZSAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMC5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFR3byAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMS5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFRocmVlID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMi5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZEZvdXIgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMy5tcDNcIik7XG5cbi8vIEFkanVzdGluZyBzbGltZSBzb3VuZCB2b2x1bWVzXG5cbmxldCBzbGltZVZvbHVtZSA9IDAuMDU7XG5zbGltZVNvdW5kT25lLnZvbHVtZSAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kVHdvLnZvbHVtZSAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kVGhyZWUudm9sdW1lID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kRm91ci52b2x1bWUgID0gc2xpbWVWb2x1bWU7XG5cbi8vIFB1c2hpbmcgc2xpbWUgc291bmRzIGludG8gYW4gYXJyYXlcblxubGV0IGJhY2tncm91bmRNdXNpY1ZvbHVtZSA9IDAuMTtcblxuYmFja2dyb3VuZE11c2ljT25lLnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljVHdvIC52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljVGhyZWUudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljRm91ci52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljRml2ZS52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljU2l4LnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljU2V2ZW4udm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljRWlnaHQudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuXG5sZXQgc2xpbWVTb3VuZHMgPSBbc2xpbWVTb3VuZE9uZSwgc2xpbWVTb3VuZFR3bywgc2xpbWVTb3VuZFRocmVlLCBzbGltZVNvdW5kRm91cl07XG5cbi8vIFJldHVybmluZyByYW5kb20gc2xpbWUgc291bmQgd2hlbiBjYWxsZWRcblxuZnVuY3Rpb24gc2FtcGxlKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IgKCBNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoICldXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGltZVNvdW5kUGxheSgpIHtcbiAgICBpZiAoIW11dGVkKSBzYW1wbGUoc2xpbWVTb3VuZHMpLnBsYXkoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhY2tncm91bmRNdXNpY1BsYXkoKSB7XG4gICAgaWYgKCFtdXRlZCkgc2FtcGxlKGJhY2tncm91bmRNdXNpYykucGxheSgpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtjcmVhdGVQbGF5ZXIsIHNsaW1lSnVtcCwgcGxheWVyTW92ZW1lbnRzLCBzdG9wUGxheWVyTW92ZW1lbnRzLCBnYW1lT3Zlcn0gZnJvbSBcIi4vc2NyaXB0cy9wbGF5ZXIuanNcIlxuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybXMsIG1vdmVQbGF0Zm9ybXN9IGZyb20gXCIuL3NjcmlwdHMvcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtiYWNrZ3JvdW5kTXVzaWNQbGF5fSBmcm9tIFwiLi9zY3JpcHRzL3NvdW5kLmpzXCJcbmltcG9ydCB7Y3JlYXRlQnVsbGV0LCBzaG9vdEJ1bGxldH0gZnJvbSBcIi4vc2NyaXB0cy9wbGF5ZXJTaG9vdC5qc1wiXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG5cbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgaWYgKCFnYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF0Zm9ybXMoZ3JpZCk7XG4gICAgICAgICAgICBjcmVhdGVQbGF5ZXIoZ3JpZCk7XG4gICAgICAgICAgICBzZXRJbnRlcnZhbChtb3ZlUGxhdGZvcm1zLmJpbmQodGhpcywgZ3JpZCksIDEpO1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoc2hvb3RCdWxsZXQuYmluZCh0aGlzLCBncmlkKSwgMSk7XG4gICAgICAgICAgICBzbGltZUp1bXAoKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVCdWxsZXQuYmluZCh0aGlzLCBncmlkKSlcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja2dyb3VuZE11c2ljUGxheSlcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJNb3ZlbWVudHMpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN0b3BQbGF5ZXJNb3ZlbWVudHMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpO1xufSlcblxuIl0sIm5hbWVzIjpbInNjb3JlIiwicGxhdGZvcm1Db3VudCIsInRvdGFsU2NvcmUiLCJwbGF0Zm9ybXMiLCJQbGF0Zm9ybSIsImdyaWQiLCJuZXdQbGF0Qm90dG9tIiwiYm90dG9tIiwibGVmdCIsIk1hdGgiLCJyYW5kb20iLCJ2aXN1YWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlUGxhdGZvcm1zIiwiaSIsInBsYXRmb3JtR2FwIiwibmV3UGxhdGZvcm0iLCJwdXNoIiwibW92ZVBsYXRmb3JtcyIsImZvckVhY2giLCJwbGF0Zm9ybSIsImZpcnN0UGxhdGZvcm0iLCJyZW1vdmUiLCJzaGlmdCIsInNsaW1lU291bmRQbGF5Iiwic2xpbWUiLCJpc0p1bXBpbmciLCJpc0dvaW5nTGVmdCIsImlzR29pbmdSaWdodCIsImxlZnRUaW1lcklkIiwicmlnaHRUaW1lcklkIiwic2xpbWVMZWZ0U3BhY2UiLCJzdGFydFBvaW50Iiwic2xpbWVCb3R0b21TcGFjZSIsInVwVGltZXJJZCIsImRvd25UaW1lcklkIiwiY3JlYXRlUGxheWVyIiwic2xpbWVKdW1wIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwic2xpbWVGYWxsIiwiZ2FtZU92ZXIiLCJwbGF5ZXJNb3ZlbWVudHMiLCJldmVudCIsImtleUNvZGUiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsInN0b3BQbGF5ZXJNb3ZlbWVudHMiLCJpc0dhbWVPdmVyIiwicXVlcnlTZWxlY3RvciIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImNvbnNvbGUiLCJsb2ciLCJidWxsZXRzIiwiQnVsbGV0IiwiY3JlYXRlQnVsbGV0IiwibmV3QnVsbGV0IiwiY2xpZW50WCIsImNsaWVudFkiLCJzaG9vdEJ1bGxldCIsIngiLCJ5IiwiYnVsbGV0IiwiZmlyc3RidWxsZXQiLCJtdXRlZCIsImJhY2tncm91bmRNdXNpY09uZSIsIkF1ZGlvIiwiYmFja2dyb3VuZE11c2ljVHdvIiwiYmFja2dyb3VuZE11c2ljVGhyZWUiLCJiYWNrZ3JvdW5kTXVzaWNGb3VyIiwiYmFja2dyb3VuZE11c2ljRml2ZSIsImJhY2tncm91bmRNdXNpY1NpeCIsImJhY2tncm91bmRNdXNpY1NldmVuIiwiYmFja2dyb3VuZE11c2ljRWlnaHQiLCJiYWNrZ3JvdW5kTXVzaWMiLCJzbGltZVNvdW5kT25lIiwic2xpbWVTb3VuZFR3byIsInNsaW1lU291bmRUaHJlZSIsInNsaW1lU291bmRGb3VyIiwic2xpbWVWb2x1bWUiLCJ2b2x1bWUiLCJiYWNrZ3JvdW5kTXVzaWNWb2x1bWUiLCJzbGltZVNvdW5kcyIsInNhbXBsZSIsImFycmF5IiwiZmxvb3IiLCJsZW5ndGgiLCJwbGF5IiwiYmFja2dyb3VuZE11c2ljUGxheSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydCIsImJpbmQiXSwic291cmNlUm9vdCI6IiJ9