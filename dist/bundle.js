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
var yVelocity = 1;
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

    if (platform.bottom <= -15) {
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
// Add flying enemies.
// Add shooting feature. 50%
// Potentially have background that scales with player Y.


var slime = document.createElement('div');
var isJumping = false;
var isGoingLeft = false;
var isGoingRight = false;
var leftTimerId;
var rightTimerId;
var slimeLeftSpace = 280;
var score = 0;
var startPoint = 600;
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
    if (slimeBottomSpace > startPoint + 155) slimeFall();
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
      if (slimeBottomSpace >= platform.bottom && slimeBottomSpace <= platform.bottom + 19 && slimeLeftSpace + 40 >= platform.left && slimeLeftSpace <= platform.left + 100 && // right side
      !isJumping) {
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
    return true;
  } else if (!isGameOver) {
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
/* harmony export */   "playerShoot": function() { return /* binding */ playerShoot; },
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
  visual.style.left = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeLeftSpace + 12 + 'px';
  visual.style.bottom = _player_js__WEBPACK_IMPORTED_MODULE_0__.slimeBottomSpace + 12 + 'px';
  grid.appendChild(visual);
};

function playerShoot(grid, event) {
  if (event.keyCode === 32) {
    shootBullet();
    var newBullet = new Bullet(grid, event.clientX, event.clientY);
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
      setTimeout(function () {
        (0,_scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(grid);
      }, 500);
      setInterval(_scripts_platform_js__WEBPACK_IMPORTED_MODULE_1__.movePlatforms.bind(this, grid), 1);
      setInterval(_scripts_playerShoot_js__WEBPACK_IMPORTED_MODULE_3__.shootBullet.bind(this, grid), 1);
      (0,_scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.slimeJump)();
      document.addEventListener('keydown', _scripts_playerShoot_js__WEBPACK_IMPORTED_MODULE_3__.playerShoot.bind(this, grid)); // document.addEventListener('click', backgroundMusicPlay)

      document.addEventListener('keydown', _scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.playerMovements);
      document.addEventListener('keyup', _scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.stopPlayerMovements);
    }
  }

  start();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF0Zm9ybS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyU2hvb3QuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvc291bmQuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c2NvcmV9IGZyb20gXCIuL3BsYXllci5qc1wiXG5cbmxldCBwbGF0Zm9ybUNvdW50ID0gNTtcbmxldCB5VmVsb2NpdHkgPSAxO1xuXG5leHBvcnQgbGV0IHRvdGFsU2NvcmUgPSBzY29yZTtcbmV4cG9ydCBsZXQgcGxhdGZvcm1zID0gW107XG5cbmNsYXNzIFBsYXRmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gbmV3UGxhdEJvdHRvbTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gTWF0aC5yYW5kb20oKSAqIDUwMDtcbiAgICAgICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdwbGF0Zm9ybScpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSB0aGlzLmJvdHRvbSArICdweCc7XG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybXMoZ3JpZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhdGZvcm1Db3VudDsgaSsrKSB7XG4gICAgICAgIGxldCBwbGF0Zm9ybUdhcCA9IDYwMCAvIHBsYXRmb3JtQ291bnQ7XG4gICAgICAgIGxldCBuZXdQbGF0Qm90dG9tID0gMTAwICsgaSAqIHBsYXRmb3JtR2FwO1xuICAgICAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgbmV3UGxhdEJvdHRvbSk7XG5cbiAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVQbGF0Zm9ybXMoZ3JpZCkge1xuICAgIHBsYXRmb3Jtcy5mb3JFYWNoKHBsYXRmb3JtID0+IHtcbiAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDAuNzU7XG4gICAgICAgIGxldCB2aXN1YWwgPSBwbGF0Zm9ybS52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuICAgICAgICBpZiAocGxhdGZvcm0uYm90dG9tIDw9IC0xNSkge1xuXG4gICAgICAgICAgICBsZXQgZmlyc3RQbGF0Zm9ybSA9IHBsYXRmb3Jtc1swXS52aXN1YWw7XG4gICAgICAgICAgICBmaXJzdFBsYXRmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXRmb3JtJyk7XG4gICAgICAgICAgICBwbGF0Zm9ybXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHRvdGFsU2NvcmUrKztcbiAgICAgICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCA2MDApXG4gICAgICAgICAgICBwbGF0Zm9ybXMucHVzaChuZXdQbGF0Zm9ybSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbiIsIi8vIEFkZCBzY29yZSBzeXN0ZW0uXG4vLyBBZGQgZmx5aW5nIGVuZW1pZXMuXG4vLyBBZGQgc2hvb3RpbmcgZmVhdHVyZS4gNTAlXG4vLyBQb3RlbnRpYWxseSBoYXZlIGJhY2tncm91bmQgdGhhdCBzY2FsZXMgd2l0aCBwbGF5ZXIgWS5cblxuaW1wb3J0IHtwbGF0Zm9ybXN9IGZyb20gXCIuL3BsYXRmb3JtLmpzXCJcbmltcG9ydCB7c2xpbWVTb3VuZFBsYXl9IGZyb20gXCIuL3NvdW5kLmpzXCJcblxuY29uc3Qgc2xpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG5sZXQgaXNKdW1waW5nID0gZmFsc2U7XG5sZXQgaXNHb2luZ0xlZnQgPSBmYWxzZTtcbmxldCBpc0dvaW5nUmlnaHQgPSBmYWxzZTtcbmxldCBsZWZ0VGltZXJJZDtcbmxldCByaWdodFRpbWVySWQ7XG5cbmV4cG9ydCBsZXQgc2xpbWVMZWZ0U3BhY2UgPSAyODA7XG5leHBvcnQgbGV0IHNjb3JlID0gMDtcbmV4cG9ydCBsZXQgc3RhcnRQb2ludCA9IDYwMDtcbmV4cG9ydCBsZXQgc2xpbWVCb3R0b21TcGFjZSA9IHN0YXJ0UG9pbnQ7XG5leHBvcnQgbGV0IHVwVGltZXJJZDtcbmV4cG9ydCBsZXQgZG93blRpbWVySWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoZ3JpZCkge1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoc2xpbWUpO1xuICAgIHNsaW1lLmNsYXNzTGlzdC5hZGQoJ3NsaW1lJyk7XG4gICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lSnVtcCgpIHtcbiAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKVxuICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgdXBUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNsaW1lQm90dG9tU3BhY2UgKz0gMztcbiAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDE1NSkgc2xpbWVGYWxsKCk7XG4gICAgfSwgMSlcbn1cblxuZnVuY3Rpb24gc2xpbWVGYWxsKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKVxuICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgIGRvd25UaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNsaW1lQm90dG9tU3BhY2UgLT0gMjtcbiAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlIDw9IDAgKSBnYW1lT3Zlcih0cnVlKTtcblxuICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSkgJiZcbiAgICAgICAgICAgICAgKHNsaW1lQm90dG9tU3BhY2UgPD0gKHBsYXRmb3JtLmJvdHRvbSArIDE5KSkgJiYgLy8gdG9wIG9mIHBsYXRmb3JtXG4gICAgICAgICAgICAgICgoc2xpbWVMZWZ0U3BhY2UgKyA0MCkgPj0gcGxhdGZvcm0ubGVmdCkgJiYgXG4gICAgICAgICAgICAgIChzbGltZUxlZnRTcGFjZSA8PSAocGxhdGZvcm0ubGVmdCArIDEwMCkpICYmIC8vIHJpZ2h0IHNpZGVcbiAgICAgICAgICAgICAgIWlzSnVtcGluZ1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzdGFydFBvaW50ID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgICAgICAgICBzbGltZVNvdW5kUGxheSgpO1xuICAgICAgICAgICAgICAgIHNsaW1lSnVtcCgpO1xuICAgICAgICAgICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgIH0sIDEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIG1vdmVMZWZ0KCk7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSBtb3ZlUmlnaHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIHtcbiAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIHtcbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbW92ZUxlZnQoKSB7XG4gICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICBpZiAoaXNHb2luZ1JpZ2h0KSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKVxuICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgIH1cbiAgICBpc0dvaW5nTGVmdCA9IHRydWVcbiAgICBsZWZ0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNsaW1lTGVmdFNwYWNlID49IDApIHtcbiAgICAgICAgICBzbGltZUxlZnRTcGFjZSAtPSAyO1xuICAgICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGltZUxlZnRTcGFjZSA9IDU0NTtcbiAgICAgICAgfVxuICAgIH0sIDEpXG59XG5cbmZ1bmN0aW9uIG1vdmVSaWdodCgpIHtcbiAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICBpZiAoaXNHb2luZ0xlZnQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgIH1cbiAgICBpc0dvaW5nUmlnaHQgPSB0cnVlXG4gICAgcmlnaHRUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNsaW1lTGVmdFNwYWNlIDw9IDU2MCkge1xuICAgICAgICBzbGltZUxlZnRTcGFjZSArPSAyO1xuICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGltZUxlZnRTcGFjZSA9IC00O1xuICAgIH1cbiAgICB9LCAxKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZU92ZXIoaXNHYW1lT3Zlcikge1xuICAgIGlmIChpc0dhbWVPdmVyKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgICAgICB3aGlsZSAoZ3JpZC5maXJzdENoaWxkKSB7IGdyaWQucmVtb3ZlQ2hpbGQoZ3JpZC5maXJzdENoaWxkKSB9XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpO1xuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBcbiAgICB9IGVsc2UgaWYgKCFpc0dhbWVPdmVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQge3NsaW1lTGVmdFNwYWNlLCBzbGltZUJvdHRvbVNwYWNlfSBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcblxuZXhwb3J0IGxldCBidWxsZXRzID0gW107XG5cbmNsYXNzIEJ1bGxldCB7XG4gICAgY29uc3RydWN0b3IoZ3JpZCkge1xuICAgICAgICB0aGlzLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgIHRoaXMubGVmdCA9IHNsaW1lTGVmdFNwYWNlO1xuICAgICAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2J1bGxldCcpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgMTIgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArIDEyICsgJ3B4JztcbiAgICAgICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclNob290KGdyaWQsIGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNob290QnVsbGV0KCk7XG4gICAgICAgIGxldCBuZXdCdWxsZXQgPSBuZXcgQnVsbGV0KGdyaWQsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIGJ1bGxldHMucHVzaChuZXdCdWxsZXQpO1xuICAgIH0gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9vdEJ1bGxldCh4LCB5KSB7XG4gICAgYnVsbGV0cy5mb3JFYWNoKGJ1bGxldCA9PiB7XG4gICAgICAgIGJ1bGxldC5ib3R0b20gKz0gMztcbiAgICAgICAgICAgIGxldCB2aXN1YWwgPSBidWxsZXQudmlzdWFsO1xuICAgICAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IGJ1bGxldC5ib3R0b20gKyAncHgnO1xuICAgICAgICAgICAgaWYgKGJ1bGxldC5ib3R0b20gPj0gNjAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0YnVsbGV0ID0gYnVsbGV0c1swXS52aXN1YWw7XG4gICAgICAgICAgICAgICAgZmlyc3RidWxsZXQuY2xhc3NMaXN0LnJlbW92ZSgnYnVsbGV0Jyk7XG4gICAgICAgICAgICAgICAgYnVsbGV0cy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcbn1cbiBcblxuICAgIC8vIGlmIChidWxsZXRMZWZ0U3BhY2UgPD0gNTYwKSB7XG4gICAgLy8gICAgIGNsZWFySW50ZXJ2YWwoc2hvb3RUaW1lcklkKVxuICAgIC8vIH1cblxuICAgIC8vIGZvciAobGV0IGkgPSBidWxsZXQuc3R5bGUubGVmdDsgaSA8IHg7IGkrKykge1xuICAgIC8vICAgICBidWxsZXRMZWZ0U3BhY2UgKz0gMTtcbiAgICAvLyAgICAgYnVsbGV0LnN0eWxlLmxlZnQgKz0gYnVsbGV0TGVmdFNwYWNlICsgJ3B4JztcbiAgICAvLyB9XG5cbiAgICAvLyBmb3IgKGxldCBqID0gYnVsbGV0LnN0eWxlLmJvdHRvbTsgaiA8IHk7IGorKykge1xuICAgIC8vICAgICBidWxsZXRMZWZ0U3BhY2UgKz0gMTtcbiAgICAvLyAgICAgYnVsbGV0LnN0eWxlLmxlZnQgKz0gYnVsbGV0Qm90dG9tU3BhY2UgKyAncHgnO1xuICAgIC8vIH1cbiAgICAgICAgXG5cblxuIiwibGV0IG11dGVkID0gdHJ1ZTtcblxuLy8gSW1wb3J0aW5nIGJhY2tncm91bmQgbXVzaWNcblxubGV0IGJhY2tncm91bmRNdXNpY09uZSAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL0EgTG9uZWx5IENoZXJyeSBUcmVlIPCfjLgubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1R3byAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL0hlbGxvLCBpdCdzIE1lIS5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljVGhyZWUgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvTWVsYW5jaG9saWMgV2Fsay5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRm91ciAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvTm8gRGVzdGluYXRpb24ubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY0ZpdmUgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1JlYWR5IFBpeGVsIE9uZS5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljU2l4ICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvUnVuIEFzIEZhc3QgQXMgWW91IENhbi5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljU2V2ZW4gPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvVGhlIHNlYXJjaC5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRWlnaHQgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvV2VsY29tZSBTcGFjZSBUcmF2ZWxlci5tcDNcIik7XG5cbmxldCBiYWNrZ3JvdW5kTXVzaWMgPSBbYmFja2dyb3VuZE11c2ljT25lLCBiYWNrZ3JvdW5kTXVzaWNUd28sIGJhY2tncm91bmRNdXNpY1RocmVlLCBiYWNrZ3JvdW5kTXVzaWNGb3VyLFxuICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kTXVzaWNGaXZlLCBiYWNrZ3JvdW5kTXVzaWNTaXgsIGJhY2tncm91bmRNdXNpY1NldmVuLCBiYWNrZ3JvdW5kTXVzaWNFaWdodF07XG5cbi8vIEltcG9ydGluZyBzbGltZSBzb3VuZHNcblxubGV0IHNsaW1lU291bmRPbmUgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzAubXAzXCIpO1xubGV0IHNsaW1lU291bmRUd28gICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzEubXAzXCIpO1xubGV0IHNsaW1lU291bmRUaHJlZSA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzIubXAzXCIpO1xubGV0IHNsaW1lU291bmRGb3VyICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzMubXAzXCIpO1xuXG4vLyBBZGp1c3Rpbmcgc2xpbWUgc291bmQgdm9sdW1lc1xuXG5sZXQgc2xpbWVWb2x1bWUgPSAwLjA1O1xuc2xpbWVTb3VuZE9uZS52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFR3by52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFRocmVlLnZvbHVtZSA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZEZvdXIudm9sdW1lICA9IHNsaW1lVm9sdW1lO1xuXG4vLyBQdXNoaW5nIHNsaW1lIHNvdW5kcyBpbnRvIGFuIGFycmF5XG5cbmxldCBiYWNrZ3JvdW5kTXVzaWNWb2x1bWUgPSAwLjE7XG5cbmJhY2tncm91bmRNdXNpY09uZS52b2x1bWUgICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY1R3byAudm9sdW1lICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY1RocmVlLnZvbHVtZSA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY0ZvdXIudm9sdW1lICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY0ZpdmUudm9sdW1lICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY1NpeC52b2x1bWUgICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY1NldmVuLnZvbHVtZSA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY0VpZ2h0LnZvbHVtZSA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcblxubGV0IHNsaW1lU291bmRzID0gW3NsaW1lU291bmRPbmUsIHNsaW1lU291bmRUd28sIHNsaW1lU291bmRUaHJlZSwgc2xpbWVTb3VuZEZvdXJdO1xuXG4vLyBSZXR1cm5pbmcgcmFuZG9tIHNsaW1lIHNvdW5kIHdoZW4gY2FsbGVkXG5cbmZ1bmN0aW9uIHNhbXBsZShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yICggTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCApXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpbWVTb3VuZFBsYXkoKSB7XG4gICAgaWYgKCFtdXRlZCkgc2FtcGxlKHNsaW1lU291bmRzKS5wbGF5KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrZ3JvdW5kTXVzaWNQbGF5KCkge1xuICAgIGlmICghbXV0ZWQpIHNhbXBsZShiYWNrZ3JvdW5kTXVzaWMpLnBsYXkoKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Y3JlYXRlUGxheWVyLCBzbGltZUp1bXAsIHBsYXllck1vdmVtZW50cywgc3RvcFBsYXllck1vdmVtZW50cywgZ2FtZU92ZXJ9IGZyb20gXCIuL3NjcmlwdHMvcGxheWVyLmpzXCJcbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1zLCBtb3ZlUGxhdGZvcm1zfSBmcm9tIFwiLi9zY3JpcHRzL3BsYXRmb3JtLmpzXCJcbmltcG9ydCB7YmFja2dyb3VuZE11c2ljUGxheX0gZnJvbSBcIi4vc2NyaXB0cy9zb3VuZC5qc1wiXG5pbXBvcnQge3BsYXllclNob290LCBzaG9vdEJ1bGxldH0gZnJvbSBcIi4vc2NyaXB0cy9wbGF5ZXJTaG9vdC5qc1wiXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG5cbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgaWYgKCFnYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF0Zm9ybXMoZ3JpZCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjcmVhdGVQbGF5ZXIoZ3JpZCk7IH0sIDUwMClcbiAgICAgICAgICAgIHNldEludGVydmFsKG1vdmVQbGF0Zm9ybXMuYmluZCh0aGlzLCBncmlkKSwgMSk7XG4gICAgICAgICAgICBzZXRJbnRlcnZhbChzaG9vdEJ1bGxldC5iaW5kKHRoaXMsIGdyaWQpLCAxKTtcbiAgICAgICAgICAgIHNsaW1lSnVtcCgpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyU2hvb3QuYmluZCh0aGlzLCBncmlkKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiYWNrZ3JvdW5kTXVzaWNQbGF5KVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyTW92ZW1lbnRzKVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzdG9wUGxheWVyTW92ZW1lbnRzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKTtcbn0pXG5cbiJdLCJuYW1lcyI6WyJzY29yZSIsInBsYXRmb3JtQ291bnQiLCJ5VmVsb2NpdHkiLCJ0b3RhbFNjb3JlIiwicGxhdGZvcm1zIiwiUGxhdGZvcm0iLCJncmlkIiwibmV3UGxhdEJvdHRvbSIsImJvdHRvbSIsImxlZnQiLCJNYXRoIiwicmFuZG9tIiwidmlzdWFsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVBsYXRmb3JtcyIsImkiLCJwbGF0Zm9ybUdhcCIsIm5ld1BsYXRmb3JtIiwicHVzaCIsIm1vdmVQbGF0Zm9ybXMiLCJmb3JFYWNoIiwicGxhdGZvcm0iLCJmaXJzdFBsYXRmb3JtIiwicmVtb3ZlIiwic2hpZnQiLCJzbGltZVNvdW5kUGxheSIsInNsaW1lIiwiaXNKdW1waW5nIiwiaXNHb2luZ0xlZnQiLCJpc0dvaW5nUmlnaHQiLCJsZWZ0VGltZXJJZCIsInJpZ2h0VGltZXJJZCIsInNsaW1lTGVmdFNwYWNlIiwic3RhcnRQb2ludCIsInNsaW1lQm90dG9tU3BhY2UiLCJ1cFRpbWVySWQiLCJkb3duVGltZXJJZCIsImNyZWF0ZVBsYXllciIsInNsaW1lSnVtcCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInNsaW1lRmFsbCIsImdhbWVPdmVyIiwicGxheWVyTW92ZW1lbnRzIiwiZXZlbnQiLCJrZXlDb2RlIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJzdG9wUGxheWVyTW92ZW1lbnRzIiwiaXNHYW1lT3ZlciIsInF1ZXJ5U2VsZWN0b3IiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJidWxsZXRzIiwiQnVsbGV0IiwicGxheWVyU2hvb3QiLCJzaG9vdEJ1bGxldCIsIm5ld0J1bGxldCIsImNsaWVudFgiLCJjbGllbnRZIiwieCIsInkiLCJidWxsZXQiLCJmaXJzdGJ1bGxldCIsIm11dGVkIiwiYmFja2dyb3VuZE11c2ljT25lIiwiQXVkaW8iLCJiYWNrZ3JvdW5kTXVzaWNUd28iLCJiYWNrZ3JvdW5kTXVzaWNUaHJlZSIsImJhY2tncm91bmRNdXNpY0ZvdXIiLCJiYWNrZ3JvdW5kTXVzaWNGaXZlIiwiYmFja2dyb3VuZE11c2ljU2l4IiwiYmFja2dyb3VuZE11c2ljU2V2ZW4iLCJiYWNrZ3JvdW5kTXVzaWNFaWdodCIsImJhY2tncm91bmRNdXNpYyIsInNsaW1lU291bmRPbmUiLCJzbGltZVNvdW5kVHdvIiwic2xpbWVTb3VuZFRocmVlIiwic2xpbWVTb3VuZEZvdXIiLCJzbGltZVZvbHVtZSIsInZvbHVtZSIsImJhY2tncm91bmRNdXNpY1ZvbHVtZSIsInNsaW1lU291bmRzIiwic2FtcGxlIiwiYXJyYXkiLCJmbG9vciIsImxlbmd0aCIsInBsYXkiLCJiYWNrZ3JvdW5kTXVzaWNQbGF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXJ0Iiwic2V0VGltZW91dCIsImJpbmQiXSwic291cmNlUm9vdCI6IiJ9