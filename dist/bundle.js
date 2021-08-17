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
    var platformGap = 750 / platformCount;
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
          var newPlatform = new Platform(grid, 750);
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

        if (slimeBottomSpace <= -80) {
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
      if (slimeLeftSpace >= -60) {
        slimeLeftSpace -= 2;
        slime.style.left = slimeLeftSpace + 'px';
      } else {
        slimeLeftSpace = 600;
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
      if (slimeLeftSpace <= 610) {
        slimeLeftSpace += 2;
        slime.style.left = slimeLeftSpace + 'px';
      } else {
        slimeLeftSpace = -60;
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

    if (bullet.bottom >= 750) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUFBLHVEQUFLLENBQUNDLElBQUQsQ0FBTDtBQUNILENBRkQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxhdGZvcm0uanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXllclNob290LmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3NvdW5kLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NyZWF0ZVBsYXllciwgc2xpbWVKdW1wLCBwbGF5ZXJNb3ZlbWVudHMsIHN0b3BQbGF5ZXJNb3ZlbWVudHMsIHVwVGltZXJJZCwgZG93blRpbWVySWQsIGxlZnRUaW1lcklkLCByaWdodFRpbWVySWR9IGZyb20gXCIuL3BsYXllci5qc1wiXG5pbXBvcnQge2NyZWF0ZVBsYXRmb3JtcywgbW92ZVBsYXRmb3Jtcywgc2NvcmV9IGZyb20gXCIuL3BsYXRmb3JtLmpzXCJcbmltcG9ydCB7YmFja2dyb3VuZE11c2ljUGxheX0gZnJvbSBcIi4vc291bmQuanNcIlxuaW1wb3J0IHtwbGF5ZXJTaG9vdCwgc2hvb3RCdWxsZXR9IGZyb20gXCIuL3BsYXllclNob290LmpzXCJcblxuZXhwb3J0IGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuZXhwb3J0IGxldCBnYW1lUGF1c2VkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydChncmlkKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNyZWF0ZVBsYXRmb3JtcygpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjcmVhdGVQbGF5ZXIoKTsgfSwgMzAwKVxuICAgICAgICBzZXRJbnRlcnZhbChtb3ZlUGxhdGZvcm1zLCAxKTtcbiAgICAgICAgc2V0SW50ZXJ2YWwoc2hvb3RCdWxsZXQsIDEpO1xuICAgICAgICBzbGltZUp1bXAoKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyU2hvb3QuYmluZCh0aGlzLCBncmlkKSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiYWNrZ3JvdW5kTXVzaWNQbGF5KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyTW92ZW1lbnRzKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN0b3BQbGF5ZXJNb3ZlbWVudHMpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwYXVzZUdhbWUpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5kR2FtZShncmlkKSB7XG4gICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgIHdoaWxlIChncmlkLmZpcnN0Q2hpbGQpIHsgZ3JpZC5yZW1vdmVDaGlsZChncmlkLmZpcnN0Q2hpbGQpIH1cbiAgICBjbGVhckludGVydmFsKHVwVGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgIGdyaWQuaW5uZXJIVE1MID0gYFlvdXIgZmluYWwgc2NvcmUgd2FzOiAke3Njb3JlfWBcblxufVxuXG5mdW5jdGlvbiBwYXVzZUdhbWUoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgJiYgIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgXG4gICAgICAgIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgJiYgZ2FtZVBhdXNlZCkge1xuXG4gICAgICAgIGdhbWVQYXVzZWQgPSBmYWxzZTtcbiAgICB9XG59XG5cblxuIiwiaW1wb3J0IHtnYW1lT3ZlciwgZ2FtZVBhdXNlZH0gZnJvbSBcIi4vZ2FtZS5qc1wiXG5pbXBvcnQge2lzSnVtcGluZywgaXNGYWxsaW5nfSBmcm9tIFwiLi9wbGF5ZXIuanNcIlxuXG5sZXQgcGxhdGZvcm1Db3VudCA9IDU7XG5cbmV4cG9ydCBsZXQgc2NvcmUgPSAwO1xuZXhwb3J0IGxldCBwbGF0Zm9ybXMgPSBbXTtcblxuY2xhc3MgUGxhdGZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKGdyaWQsIG5ld1BsYXRCb3R0b20pIHtcbiAgICAgICAgdGhpcy5ib3R0b20gPSBuZXdQbGF0Qm90dG9tO1xuICAgICAgICB0aGlzLmxlZnQgPSBNYXRoLnJhbmRvbSgpICogNTAwO1xuICAgICAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ3BsYXRmb3JtJyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gdGhpcy5sZWZ0ICsgJ3B4JztcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICAgICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhdGZvcm1zKCkge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhdGZvcm1Db3VudDsgaSsrKSB7XG4gICAgICAgIGxldCBwbGF0Zm9ybUdhcCA9IDc1MCAvIHBsYXRmb3JtQ291bnQ7XG4gICAgICAgIGxldCBuZXdQbGF0Qm90dG9tID0gMTAwICsgaSAqIHBsYXRmb3JtR2FwO1xuICAgICAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgbmV3UGxhdEJvdHRvbSk7XG4gICAgICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVQbGF0Zm9ybXMoKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIHBsYXRmb3Jtcy5mb3JFYWNoKHBsYXRmb3JtID0+IHtcbiAgICAgICAgICAgIGlmIChpc0p1bXBpbmcpIHtcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybS5ib3R0b20gLT0gMy41O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0ZhbGxpbmcpIHtcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybS5ib3R0b20gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB2aXN1YWwgPSBwbGF0Zm9ybS52aXN1YWw7XG4gICAgICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gcGxhdGZvcm0uYm90dG9tICsgJ3B4JztcbiAgICAgICAgICAgIGlmICghZ2FtZU92ZXIpIHtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXRmb3JtLmJvdHRvbSA8PSAtNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdFBsYXRmb3JtID0gcGxhdGZvcm1zWzBdLnZpc3VhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UGxhdGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgncGxhdGZvcm0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gMTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCA3NTApXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybXMucHVzaChuZXdQbGF0Zm9ybSlcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncmFiU2NvcmUoKSB7XG4gICAgcmV0dXJuIHNjb3JlXG59XG5cbiIsIi8vIEFkZCBmbHlpbmcgZW5lbWllcy5cbi8vIEFkZCBzaG9vdGluZyBmZWF0dXJlLiA1MCVcblxuaW1wb3J0IHtlbmRHYW1lLCBnYW1lUGF1c2VkfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQge3BsYXRmb3Jtc30gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtzbGltZVNvdW5kUGxheX0gZnJvbSBcIi4vc291bmQuanNcIlxuXG5jb25zdCBzbGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cblxubGV0IGlzR29pbmdMZWZ0ID0gZmFsc2U7XG5sZXQgaXNHb2luZ1JpZ2h0ID0gZmFsc2U7XG5cbmV4cG9ydCBsZXQgaXNKdW1waW5nID0gZmFsc2U7XG5leHBvcnQgbGV0IGlzRmFsbGluZyA9IHRydWU7XG5leHBvcnQgbGV0IHNsaW1lTGVmdFNwYWNlID0gMjgwO1xuZXhwb3J0IGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuZXhwb3J0IGxldCBzdGFydFBvaW50ID0gMjAwO1xuZXhwb3J0IGxldCBzbGltZUJvdHRvbVNwYWNlID0gc3RhcnRQb2ludDtcbmV4cG9ydCBsZXQgbGVmdFRpbWVySWQ7XG5leHBvcnQgbGV0IHJpZ2h0VGltZXJJZDtcbmV4cG9ydCBsZXQgdXBUaW1lcklkO1xuZXhwb3J0IGxldCBkb3duVGltZXJJZDtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHNsaW1lKTtcbiAgICBzbGltZS5jbGFzc0xpc3QuYWRkKCdzbGltZScpO1xuICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGltZUp1bXAoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpXG4gICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgICAgIGlzRmFsbGluZyA9IGZhbHNlO1xuICAgICAgICB1cFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICAgICAgc2xpbWVCb3R0b21TcGFjZSArPSAxO1xuICAgICAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgICAgICBpZiAoc2xpbWVCb3R0b21TcGFjZSA+IHN0YXJ0UG9pbnQgKyAxMDApIHNsaW1lRmFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxKVxuICAgIH1cbiAgICBcbn1cblxuZnVuY3Rpb24gc2xpbWVGYWxsKCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKHVwVGltZXJJZClcbiAgICAgICAgaXNKdW1waW5nID0gZmFsc2U7XG4gICAgICAgIGlzRmFsbGluZyA9IHRydWU7XG4gICAgICAgIGRvd25UaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgICAgICAgICBzbGltZUJvdHRvbVNwYWNlIC09IDI7XG4gICAgICAgICAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgICAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPD0gLTgwICkgeyBlbmRHYW1lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykpOyB9XG4gICAgICAgICAgICAgICAgcGxhdGZvcm1zLmZvckVhY2gocGxhdGZvcm0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIChzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKHNsaW1lQm90dG9tU3BhY2UgPD0gKHBsYXRmb3JtLmJvdHRvbSArIDE5KSkgJiYgLy8gdG9wIG9mIHBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICgoc2xpbWVMZWZ0U3BhY2UgKyA0MCkgPj0gcGxhdGZvcm0ubGVmdCkgJiYgXG4gICAgICAgICAgICAgICAgICAgIChzbGltZUxlZnRTcGFjZSA8PSAocGxhdGZvcm0ubGVmdCArIDEwMCkpICYmIC8vIHJpZ2h0IHNpZGVcbiAgICAgICAgICAgICAgICAgICAgIWlzSnVtcGluZ1xuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQgPSBzbGltZUJvdHRvbVNwYWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpbWVTb3VuZFBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaW1lSnVtcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICBcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSBtb3ZlTGVmdCgpO1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIG1vdmVSaWdodCgpO1xuICAgIH1cbiBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIHtcbiAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIHtcbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbW92ZUxlZnQoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgICAgIGlmIChpc0dvaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKVxuICAgICAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpc0dvaW5nTGVmdCA9IHRydWVcbiAgICAgICAgbGVmdFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPj0gLTYwKSB7XG4gICAgICAgICAgICBzbGltZUxlZnRTcGFjZSAtPSAyO1xuICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzbGltZUxlZnRTcGFjZSA9IDYwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVSaWdodCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgIGlmIChpc0dvaW5nTGVmdCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpc0dvaW5nUmlnaHQgPSB0cnVlXG4gICAgICAgIHJpZ2h0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPD0gNjEwKSB7XG4gICAgICAgICAgICBzbGltZUxlZnRTcGFjZSArPSAyO1xuICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGltZUxlZnRTcGFjZSA9IC02MDtcbiAgICAgICAgfVxuICAgICAgICB9LCAxKVxuICAgIH1cbiAgIFxufVxuXG4iLCJpbXBvcnQge3NsaW1lTGVmdFNwYWNlLCBzbGltZUJvdHRvbVNwYWNlfSBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcblxuZXhwb3J0IGxldCBidWxsZXRzID0gW107XG5cbmNsYXNzIEJ1bGxldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2U7XG4gICAgICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgICAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnYnVsbGV0Jyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAxMiArICdweCc7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgMTIgKyAncHgnO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyU2hvb3QoZ3JpZCwgZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgc2hvb3RCdWxsZXQoKTtcbiAgICAgICAgbGV0IG5ld0J1bGxldCA9IG5ldyBCdWxsZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKSwgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgIGJ1bGxldHMucHVzaChuZXdCdWxsZXQpO1xuICAgIH0gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9vdEJ1bGxldCh4LCB5KSB7XG4gICAgYnVsbGV0cy5mb3JFYWNoKGJ1bGxldCA9PiB7XG4gICAgICAgIGJ1bGxldC5ib3R0b20gKz0gMztcbiAgICAgICAgbGV0IHZpc3VhbCA9IGJ1bGxldC52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBidWxsZXQuYm90dG9tICsgJ3B4JztcbiAgICAgICAgaWYgKGJ1bGxldC5ib3R0b20gPj0gNzUwKSB7XG4gICAgICAgICAgICBsZXQgZmlyc3RidWxsZXQgPSBidWxsZXRzWzBdLnZpc3VhbDtcbiAgICAgICAgICAgIGZpcnN0YnVsbGV0LmNsYXNzTGlzdC5yZW1vdmUoJ2J1bGxldCcpO1xuICAgICAgICAgICAgYnVsbGV0cy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcbn1cbiBcbiIsImxldCBtdXRlZCA9IGZhbHNlO1xuXG4vLyBJbXBvcnRpbmcgYmFja2dyb3VuZCBtdXNpY1xuXG5sZXQgYmFja2dyb3VuZE11c2ljT25lICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvQSBMb25lbHkgQ2hlcnJ5IFRyZWUg8J+MuC5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljVHdvICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvSGVsbG8sIGl0J3MgTWUhLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNUaHJlZSA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9NZWxhbmNob2xpYyBXYWxrLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNGb3VyICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9ObyBEZXN0aW5hdGlvbi5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRml2ZSAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvUmVhZHkgUGl4ZWwgT25lLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNTaXggICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9SdW4gQXMgRmFzdCBBcyBZb3UgQ2FuLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNTZXZlbiA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9UaGUgc2VhcmNoLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNFaWdodCA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9XZWxjb21lIFNwYWNlIFRyYXZlbGVyLm1wM1wiKTtcblxubGV0IGJhY2tncm91bmRNdXNpYyA9IFtiYWNrZ3JvdW5kTXVzaWNPbmUsIGJhY2tncm91bmRNdXNpY1R3bywgYmFja2dyb3VuZE11c2ljVGhyZWUsIGJhY2tncm91bmRNdXNpY0ZvdXIsXG4gICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRNdXNpY0ZpdmUsIGJhY2tncm91bmRNdXNpY1NpeCwgYmFja2dyb3VuZE11c2ljU2V2ZW4sIGJhY2tncm91bmRNdXNpY0VpZ2h0XTtcblxuLy8gSW1wb3J0aW5nIHNsaW1lIHNvdW5kc1xuXG5sZXQgc2xpbWVTb3VuZE9uZSAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMC5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFR3byAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMS5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFRocmVlID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMi5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZEZvdXIgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMy5tcDNcIik7XG5cbi8vIEFkanVzdGluZyBzbGltZSBzb3VuZCB2b2x1bWVzXG5cbmxldCBzbGltZVZvbHVtZSA9IDAuMDU7XG5zbGltZVNvdW5kT25lLnZvbHVtZSAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kVHdvLnZvbHVtZSAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kVGhyZWUudm9sdW1lID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kRm91ci52b2x1bWUgID0gc2xpbWVWb2x1bWU7XG5cbi8vIFB1c2hpbmcgc2xpbWUgc291bmRzIGludG8gYW4gYXJyYXlcblxubGV0IGJhY2tncm91bmRNdXNpY1ZvbHVtZSA9IDAuMTtcblxuYmFja2dyb3VuZE11c2ljT25lLnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljVHdvIC52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljVGhyZWUudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljRm91ci52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljRml2ZS52b2x1bWUgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljU2l4LnZvbHVtZSAgID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljU2V2ZW4udm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuYmFja2dyb3VuZE11c2ljRWlnaHQudm9sdW1lID0gYmFja2dyb3VuZE11c2ljVm9sdW1lO1xuXG5sZXQgc2xpbWVTb3VuZHMgPSBbc2xpbWVTb3VuZE9uZSwgc2xpbWVTb3VuZFR3bywgc2xpbWVTb3VuZFRocmVlLCBzbGltZVNvdW5kRm91cl07XG5cbi8vIFJldHVybmluZyByYW5kb20gc2xpbWUgc291bmQgd2hlbiBjYWxsZWRcblxuZnVuY3Rpb24gc2FtcGxlKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IgKCBNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoICldXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGltZVNvdW5kUGxheSgpIHtcbiAgICBpZiAoIW11dGVkKSBzYW1wbGUoc2xpbWVTb3VuZHMpLnBsYXkoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhY2tncm91bmRNdXNpY1BsYXkoKSB7XG4gICAgaWYgKCFtdXRlZCkgc2FtcGxlKGJhY2tncm91bmRNdXNpYykucGxheSgpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtzdGFydH0gZnJvbSBcIi4vc2NyaXB0cy9nYW1lLmpzXCJcblxuY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgc3RhcnQoZ3JpZCk7XG59KVxuIl0sIm5hbWVzIjpbImNyZWF0ZVBsYXllciIsInNsaW1lSnVtcCIsInBsYXllck1vdmVtZW50cyIsInN0b3BQbGF5ZXJNb3ZlbWVudHMiLCJ1cFRpbWVySWQiLCJkb3duVGltZXJJZCIsImxlZnRUaW1lcklkIiwicmlnaHRUaW1lcklkIiwiY3JlYXRlUGxhdGZvcm1zIiwibW92ZVBsYXRmb3JtcyIsInNjb3JlIiwiYmFja2dyb3VuZE11c2ljUGxheSIsInBsYXllclNob290Iiwic2hvb3RCdWxsZXQiLCJnYW1lT3ZlciIsImdhbWVQYXVzZWQiLCJzdGFydCIsImdyaWQiLCJzZXRUaW1lb3V0Iiwic2V0SW50ZXJ2YWwiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJiaW5kIiwicGF1c2VHYW1lIiwiZW5kR2FtZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImNsZWFySW50ZXJ2YWwiLCJpbm5lckhUTUwiLCJldmVudCIsImtleUNvZGUiLCJpc0p1bXBpbmciLCJpc0ZhbGxpbmciLCJwbGF0Zm9ybUNvdW50IiwicGxhdGZvcm1zIiwiUGxhdGZvcm0iLCJuZXdQbGF0Qm90dG9tIiwiYm90dG9tIiwibGVmdCIsIk1hdGgiLCJyYW5kb20iLCJ2aXN1YWwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJpIiwicGxhdGZvcm1HYXAiLCJuZXdQbGF0Zm9ybSIsInB1c2giLCJmb3JFYWNoIiwicGxhdGZvcm0iLCJmaXJzdFBsYXRmb3JtIiwicmVtb3ZlIiwic2hpZnQiLCJncmFiU2NvcmUiLCJzbGltZVNvdW5kUGxheSIsInNsaW1lIiwiaXNHb2luZ0xlZnQiLCJpc0dvaW5nUmlnaHQiLCJzbGltZUxlZnRTcGFjZSIsInN0YXJ0UG9pbnQiLCJzbGltZUJvdHRvbVNwYWNlIiwic2xpbWVGYWxsIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJidWxsZXRzIiwiQnVsbGV0IiwibmV3QnVsbGV0IiwiY2xpZW50WCIsImNsaWVudFkiLCJ4IiwieSIsImJ1bGxldCIsImZpcnN0YnVsbGV0IiwibXV0ZWQiLCJiYWNrZ3JvdW5kTXVzaWNPbmUiLCJBdWRpbyIsImJhY2tncm91bmRNdXNpY1R3byIsImJhY2tncm91bmRNdXNpY1RocmVlIiwiYmFja2dyb3VuZE11c2ljRm91ciIsImJhY2tncm91bmRNdXNpY0ZpdmUiLCJiYWNrZ3JvdW5kTXVzaWNTaXgiLCJiYWNrZ3JvdW5kTXVzaWNTZXZlbiIsImJhY2tncm91bmRNdXNpY0VpZ2h0IiwiYmFja2dyb3VuZE11c2ljIiwic2xpbWVTb3VuZE9uZSIsInNsaW1lU291bmRUd28iLCJzbGltZVNvdW5kVGhyZWUiLCJzbGltZVNvdW5kRm91ciIsInNsaW1lVm9sdW1lIiwidm9sdW1lIiwiYmFja2dyb3VuZE11c2ljVm9sdW1lIiwic2xpbWVTb3VuZHMiLCJzYW1wbGUiLCJhcnJheSIsImZsb29yIiwibGVuZ3RoIiwicGxheSJdLCJzb3VyY2VSb290IjoiIn0=