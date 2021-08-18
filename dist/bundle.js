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
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.rightTimerId); // document.getElementById("ending").style.display = "block";
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
/* harmony export */   "movePlatforms": function() { return /* binding */ movePlatforms; }
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
          if (slimeBottomSpace >= platform.bottom && slimeBottomSpace <= platform.bottom + 19 && slimeLeftSpace + 40 >= platform.left && slimeLeftSpace <= platform.left + 100 && !isJumping) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF0Zm9ybS5qcyIsIndlYnBhY2s6Ly9zbGltZV9ndXkvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyU2hvb3QuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvc291bmQuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlUGxheWVyLCBzbGltZUp1bXAsIHBsYXllck1vdmVtZW50cywgc3RvcFBsYXllck1vdmVtZW50cywgdXBUaW1lcklkLCBkb3duVGltZXJJZCwgbGVmdFRpbWVySWQsIHJpZ2h0VGltZXJJZH0gZnJvbSBcIi4vcGxheWVyLmpzXCJcbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1zLCBtb3ZlUGxhdGZvcm1zLCBzY29yZX0gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtiYWNrZ3JvdW5kTXVzaWNQbGF5fSBmcm9tIFwiLi9zb3VuZC5qc1wiXG5pbXBvcnQge3BsYXllclNob290LCBzaG9vdEJ1bGxldH0gZnJvbSBcIi4vcGxheWVyU2hvb3QuanNcIlxuXG5leHBvcnQgbGV0IGdhbWVPdmVyICAgPSBmYWxzZTtcbmV4cG9ydCBsZXQgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQoZ3JpZCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjcmVhdGVQbGF0Zm9ybXMoKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY3JlYXRlUGxheWVyKCk7IH0sIDMwMClcbiAgICAgICAgc2V0SW50ZXJ2YWwobW92ZVBsYXRmb3JtcywgMSk7XG4gICAgICAgIHNldEludGVydmFsKHNob290QnVsbGV0LCAxKTtcbiAgICAgICAgc2xpbWVKdW1wKCk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllclNob290LmJpbmQodGhpcywgZ3JpZCkpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja2dyb3VuZE11c2ljUGxheSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllck1vdmVtZW50cylcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzdG9wUGxheWVyTW92ZW1lbnRzKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGF1c2VHYW1lKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuZEdhbWUoZ3JpZCkge1xuICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICB3aGlsZSAoZ3JpZC5maXJzdENoaWxkKSB7IGdyaWQucmVtb3ZlQ2hpbGQoZ3JpZC5maXJzdENoaWxkKSB9XG4gICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpO1xuICAgIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpO1xuICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpO1xuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVuZGluZ1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufVxuXG5mdW5jdGlvbiBwYXVzZUdhbWUoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgJiYgIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgZ2FtZVBhdXNlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNyAmJiBnYW1lUGF1c2VkKSB7XG4gICAgICAgIGdhbWVQYXVzZWQgPSBmYWxzZTtcbiAgICB9XG59XG5cblxuIiwiaW1wb3J0IHtnYW1lT3ZlciwgZ2FtZVBhdXNlZH0gZnJvbSBcIi4vZ2FtZS5qc1wiXG5pbXBvcnQge2lzSnVtcGluZywgaXNGYWxsaW5nfSBmcm9tIFwiLi9wbGF5ZXIuanNcIlxuXG5sZXQgcGxhdGZvcm1Db3VudCAgICA9IDU7XG5cbmV4cG9ydCBsZXQgc2NvcmUgICAgID0gMDtcbmV4cG9ydCBsZXQgcGxhdGZvcm1zID0gW107XG5cbmNsYXNzIFBsYXRmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gbmV3UGxhdEJvdHRvbTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gTWF0aC5yYW5kb20oKSAqIDUwMDtcbiAgICAgICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgdmlzdWFsID0gdGhpcy52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5jbGFzc0xpc3QuYWRkKCdwbGF0Zm9ybScpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSB0aGlzLmJvdHRvbSArICdweCc7XG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQodmlzdWFsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybXMoKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0Zm9ybUNvdW50OyBpKyspIHtcbiAgICAgICAgbGV0IHBsYXRmb3JtR2FwID0gNzUwIC8gcGxhdGZvcm1Db3VudDtcbiAgICAgICAgbGV0IG5ld1BsYXRCb3R0b20gPSAxMDAgKyBpICogcGxhdGZvcm1HYXA7XG4gICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCBuZXdQbGF0Qm90dG9tKTtcbiAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVBsYXRmb3JtcygpIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgcGxhdGZvcm1zLmZvckVhY2gocGxhdGZvcm0gPT4ge1xuICAgICAgICAgICAgaWYgKGlzSnVtcGluZykge1xuICAgICAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAzLjU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRmFsbGluZykge1xuICAgICAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHZpc3VhbCA9IHBsYXRmb3JtLnZpc3VhbDtcbiAgICAgICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuICAgICAgICAgICAgaWYgKCFnYW1lT3Zlcikge1xuICAgICAgICAgICAgICAgIGlmIChwbGF0Zm9ybS5ib3R0b20gPD0gLTUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdFBsYXRmb3JtID0gcGxhdGZvcm1zWzBdLnZpc3VhbDtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RQbGF0Zm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF0Zm9ybScpO1xuICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIDc1MClcbiAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pXG4gICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cbiIsIi8vIEFkZCBmbHlpbmcgZW5lbWllcy5cbi8vIEFkZCBzaG9vdGluZyBmZWF0dXJlLiA1MCVcblxuaW1wb3J0IHtlbmRHYW1lLCBnYW1lUGF1c2VkfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQge3BsYXRmb3Jtc30gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtzbGltZVNvdW5kUGxheX0gZnJvbSBcIi4vc291bmQuanNcIlxuXG5jb25zdCBzbGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cblxubGV0IGlzR29pbmdMZWZ0ICAgICAgICAgICAgID0gZmFsc2U7XG5sZXQgaXNHb2luZ1JpZ2h0ICAgICAgICAgICAgPSBmYWxzZTtcblxuZXhwb3J0IGxldCBpc0p1bXBpbmcgICAgICAgID0gZmFsc2U7XG5leHBvcnQgbGV0IGlzRmFsbGluZyAgICAgICAgPSB0cnVlO1xuZXhwb3J0IGxldCBzbGltZUxlZnRTcGFjZSAgID0gMjgwO1xuZXhwb3J0IGxldCBnYW1lT3ZlciAgICAgICAgID0gZmFsc2U7XG5leHBvcnQgbGV0IHN0YXJ0UG9pbnQgICAgICAgPSAyMDA7XG5leHBvcnQgbGV0IHNsaW1lQm90dG9tU3BhY2UgPSBzdGFydFBvaW50O1xuZXhwb3J0IGxldCBsZWZ0VGltZXJJZDtcbmV4cG9ydCBsZXQgcmlnaHRUaW1lcklkO1xuZXhwb3J0IGxldCB1cFRpbWVySWQ7XG5leHBvcnQgbGV0IGRvd25UaW1lcklkO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQoc2xpbWUpO1xuICAgIHNsaW1lLmNsYXNzTGlzdC5hZGQoJ3NsaW1lJyk7XG4gICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lSnVtcCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZClcbiAgICAgICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgaXNGYWxsaW5nID0gZmFsc2U7XG4gICAgICAgIHVwVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICBzbGltZUJvdHRvbVNwYWNlICs9IDE7XG4gICAgICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDEwMCkgc2xpbWVGYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxuICAgIFxufVxuXG5mdW5jdGlvbiBzbGltZUZhbGwoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKVxuICAgICAgICBpc0p1bXBpbmcgPSBmYWxzZTtcbiAgICAgICAgaXNGYWxsaW5nID0gdHJ1ZTtcbiAgICAgICAgZG93blRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHNsaW1lQm90dG9tU3BhY2UgLT0gMjtcbiAgICAgICAgICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgICAgICAgICBpZiAoc2xpbWVCb3R0b21TcGFjZSA8PSAtODAgKSB7IGVuZEdhbWUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKSk7IH1cbiAgICAgICAgICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc2xpbWVCb3R0b21TcGFjZSA+PSBwbGF0Zm9ybS5ib3R0b20pICYmIChzbGltZUJvdHRvbVNwYWNlIDw9IChwbGF0Zm9ybS5ib3R0b20gKyAxOSkpICYmXG4gICAgICAgICAgICAgICAgICAgICgoc2xpbWVMZWZ0U3BhY2UgKyA0MCkgPj0gcGxhdGZvcm0ubGVmdCkgJiYgKHNsaW1lTGVmdFNwYWNlIDw9IChwbGF0Zm9ybS5sZWZ0ICsgMTAwKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgIWlzSnVtcGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludCA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGltZVNvdW5kUGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpbWVKdW1wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSBtb3ZlTGVmdCgpO1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIG1vdmVSaWdodCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIHtcbiAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIHtcbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbW92ZUxlZnQoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgICAgIGlmIChpc0dvaW5nUmlnaHQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKVxuICAgICAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpc0dvaW5nTGVmdCA9IHRydWVcbiAgICAgICAgbGVmdFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPj0gLTYwKSB7XG4gICAgICAgICAgICBzbGltZUxlZnRTcGFjZSAtPSAyO1xuICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzbGltZUxlZnRTcGFjZSA9IDYwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVSaWdodCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgIGlmIChpc0dvaW5nTGVmdCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpc0dvaW5nUmlnaHQgPSB0cnVlXG4gICAgICAgIHJpZ2h0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA8PSA2MTApIHtcbiAgICAgICAgICAgICAgICBzbGltZUxlZnRTcGFjZSArPSAyO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCdcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgPSAtNjA7XG4gICAgICAgIH1cbiAgICAgICAgfSwgMSlcbiAgICB9XG4gICBcbn1cblxuIiwiaW1wb3J0IHtzbGltZUxlZnRTcGFjZSwgc2xpbWVCb3R0b21TcGFjZX0gZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5cbmV4cG9ydCBsZXQgYnVsbGV0cyA9IFtdO1xuXG5jbGFzcyBCdWxsZXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgIHRoaXMubGVmdCA9IHNsaW1lTGVmdFNwYWNlO1xuICAgICAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2J1bGxldCcpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgMTIgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArIDEyICsgJ3B4JztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKS5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclNob290KGdyaWQsIGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNob290QnVsbGV0KCk7XG4gICAgICAgIGxldCBuZXdCdWxsZXQgPSBuZXcgQnVsbGV0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyksIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICBidWxsZXRzLnB1c2gobmV3QnVsbGV0KTtcbiAgICB9IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvb3RCdWxsZXQoeCwgeSkge1xuICAgIGJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4ge1xuICAgICAgICBidWxsZXQuYm90dG9tICs9IDM7XG4gICAgICAgIGxldCB2aXN1YWwgPSBidWxsZXQudmlzdWFsO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gYnVsbGV0LmJvdHRvbSArICdweCc7XG4gICAgICAgIGlmIChidWxsZXQuYm90dG9tID49IDc1MCkge1xuICAgICAgICAgICAgbGV0IGZpcnN0YnVsbGV0ID0gYnVsbGV0c1swXS52aXN1YWw7XG4gICAgICAgICAgICBmaXJzdGJ1bGxldC5jbGFzc0xpc3QucmVtb3ZlKCdidWxsZXQnKTtcbiAgICAgICAgICAgIGJ1bGxldHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG4gXG4iLCJsZXQgbXV0ZWQgPSBmYWxzZTtcblxuLy8gSW1wb3J0aW5nIGJhY2tncm91bmQgbXVzaWNcblxubGV0IGJhY2tncm91bmRNdXNpY09uZSAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL0EgTG9uZWx5IENoZXJyeSBUcmVlIPCfjLgubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1R3byAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL0hlbGxvLCBpdCdzIE1lIS5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljVGhyZWUgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvTWVsYW5jaG9saWMgV2Fsay5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRm91ciAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvTm8gRGVzdGluYXRpb24ubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY0ZpdmUgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1JlYWR5IFBpeGVsIE9uZS5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljU2l4ICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvUnVuIEFzIEZhc3QgQXMgWW91IENhbi5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljU2V2ZW4gPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvVGhlIHNlYXJjaC5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRWlnaHQgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvV2VsY29tZSBTcGFjZSBUcmF2ZWxlci5tcDNcIik7XG5cbmxldCBiYWNrZ3JvdW5kTXVzaWMgPSBbYmFja2dyb3VuZE11c2ljT25lLCBiYWNrZ3JvdW5kTXVzaWNUd28sIGJhY2tncm91bmRNdXNpY1RocmVlLCBiYWNrZ3JvdW5kTXVzaWNGb3VyLFxuICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kTXVzaWNGaXZlLCBiYWNrZ3JvdW5kTXVzaWNTaXgsIGJhY2tncm91bmRNdXNpY1NldmVuLCBiYWNrZ3JvdW5kTXVzaWNFaWdodF07XG5cbi8vIEltcG9ydGluZyBzbGltZSBzb3VuZHNcblxubGV0IHNsaW1lU291bmRPbmUgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzAubXAzXCIpO1xubGV0IHNsaW1lU291bmRUd28gICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzEubXAzXCIpO1xubGV0IHNsaW1lU291bmRUaHJlZSA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzIubXAzXCIpO1xubGV0IHNsaW1lU291bmRGb3VyICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzMubXAzXCIpO1xuXG4vLyBBZGp1c3Rpbmcgc2xpbWUgc291bmQgdm9sdW1lc1xuXG5sZXQgc2xpbWVWb2x1bWUgPSAwLjA1O1xuc2xpbWVTb3VuZE9uZS52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFR3by52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFRocmVlLnZvbHVtZSA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZEZvdXIudm9sdW1lICA9IHNsaW1lVm9sdW1lO1xuXG4vLyBQdXNoaW5nIHNsaW1lIHNvdW5kcyBpbnRvIGFuIGFycmF5XG5cbmxldCBiYWNrZ3JvdW5kTXVzaWNWb2x1bWUgPSAwLjE7XG5cbmJhY2tncm91bmRNdXNpY09uZS52b2x1bWUgICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY1R3byAudm9sdW1lICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY1RocmVlLnZvbHVtZSA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY0ZvdXIudm9sdW1lICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY0ZpdmUudm9sdW1lICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY1NpeC52b2x1bWUgICA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY1NldmVuLnZvbHVtZSA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcbmJhY2tncm91bmRNdXNpY0VpZ2h0LnZvbHVtZSA9IGJhY2tncm91bmRNdXNpY1ZvbHVtZTtcblxubGV0IHNsaW1lU291bmRzID0gW3NsaW1lU291bmRPbmUsIHNsaW1lU291bmRUd28sIHNsaW1lU291bmRUaHJlZSwgc2xpbWVTb3VuZEZvdXJdO1xuXG4vLyBSZXR1cm5pbmcgcmFuZG9tIHNsaW1lIHNvdW5kIHdoZW4gY2FsbGVkXG5cbmZ1bmN0aW9uIHNhbXBsZShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yICggTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCApXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpbWVTb3VuZFBsYXkoKSB7XG4gICAgaWYgKCFtdXRlZCkgc2FtcGxlKHNsaW1lU291bmRzKS5wbGF5KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrZ3JvdW5kTXVzaWNQbGF5KCkge1xuICAgIGlmICghbXV0ZWQpIHNhbXBsZShiYWNrZ3JvdW5kTXVzaWMpLnBsYXkoKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7c3RhcnR9IGZyb20gXCIuL3NjcmlwdHMvZ2FtZS5qc1wiXG5cbmNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIHN0YXJ0KGdyaWQpO1xufSlcbiJdLCJuYW1lcyI6WyJjcmVhdGVQbGF5ZXIiLCJzbGltZUp1bXAiLCJwbGF5ZXJNb3ZlbWVudHMiLCJzdG9wUGxheWVyTW92ZW1lbnRzIiwidXBUaW1lcklkIiwiZG93blRpbWVySWQiLCJsZWZ0VGltZXJJZCIsInJpZ2h0VGltZXJJZCIsImNyZWF0ZVBsYXRmb3JtcyIsIm1vdmVQbGF0Zm9ybXMiLCJzY29yZSIsImJhY2tncm91bmRNdXNpY1BsYXkiLCJwbGF5ZXJTaG9vdCIsInNob290QnVsbGV0IiwiZ2FtZU92ZXIiLCJnYW1lUGF1c2VkIiwic3RhcnQiLCJncmlkIiwic2V0VGltZW91dCIsInNldEludGVydmFsIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsInBhdXNlR2FtZSIsImVuZEdhbWUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJjbGVhckludGVydmFsIiwiZXZlbnQiLCJrZXlDb2RlIiwiaXNKdW1waW5nIiwiaXNGYWxsaW5nIiwicGxhdGZvcm1Db3VudCIsInBsYXRmb3JtcyIsIlBsYXRmb3JtIiwibmV3UGxhdEJvdHRvbSIsImJvdHRvbSIsImxlZnQiLCJNYXRoIiwicmFuZG9tIiwidmlzdWFsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwiaSIsInBsYXRmb3JtR2FwIiwibmV3UGxhdGZvcm0iLCJwdXNoIiwiZm9yRWFjaCIsInBsYXRmb3JtIiwiZmlyc3RQbGF0Zm9ybSIsInJlbW92ZSIsInNoaWZ0Iiwic2xpbWVTb3VuZFBsYXkiLCJzbGltZSIsImlzR29pbmdMZWZ0IiwiaXNHb2luZ1JpZ2h0Iiwic2xpbWVMZWZ0U3BhY2UiLCJzdGFydFBvaW50Iiwic2xpbWVCb3R0b21TcGFjZSIsInNsaW1lRmFsbCIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwiYnVsbGV0cyIsIkJ1bGxldCIsIm5ld0J1bGxldCIsImNsaWVudFgiLCJjbGllbnRZIiwieCIsInkiLCJidWxsZXQiLCJmaXJzdGJ1bGxldCIsIm11dGVkIiwiYmFja2dyb3VuZE11c2ljT25lIiwiQXVkaW8iLCJiYWNrZ3JvdW5kTXVzaWNUd28iLCJiYWNrZ3JvdW5kTXVzaWNUaHJlZSIsImJhY2tncm91bmRNdXNpY0ZvdXIiLCJiYWNrZ3JvdW5kTXVzaWNGaXZlIiwiYmFja2dyb3VuZE11c2ljU2l4IiwiYmFja2dyb3VuZE11c2ljU2V2ZW4iLCJiYWNrZ3JvdW5kTXVzaWNFaWdodCIsImJhY2tncm91bmRNdXNpYyIsInNsaW1lU291bmRPbmUiLCJzbGltZVNvdW5kVHdvIiwic2xpbWVTb3VuZFRocmVlIiwic2xpbWVTb3VuZEZvdXIiLCJzbGltZVZvbHVtZSIsInZvbHVtZSIsImJhY2tncm91bmRNdXNpY1ZvbHVtZSIsInNsaW1lU291bmRzIiwic2FtcGxlIiwiYXJyYXkiLCJmbG9vciIsImxlbmd0aCIsInBsYXkiXSwic291cmNlUm9vdCI6IiJ9