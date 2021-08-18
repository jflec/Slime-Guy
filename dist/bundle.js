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
/* harmony import */ var _playerShoot_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerShoot.js */ "./src/scripts/playerShoot.js");
// Add start menu
// Add pause menu
// Add death screen
// BONUS: add enemy, add stages



var gameOver = false;
var gamePaused = false; // In charge of starting the game, calls necessary functions needed for building and rendering.

function start(grid) {
  if (!gamePaused) {
    (0,_platform_js__WEBPACK_IMPORTED_MODULE_1__.createPlatforms)();
    setTimeout(function () {
      (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
    }, 300);
    setInterval(_platform_js__WEBPACK_IMPORTED_MODULE_1__.movePlatforms, 1);
    setInterval(_playerShoot_js__WEBPACK_IMPORTED_MODULE_2__.shootBullet, 1);
    (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.slimeJump)();
    document.addEventListener('keydown', _playerShoot_js__WEBPACK_IMPORTED_MODULE_2__.playerShoot.bind(this, grid));
    document.addEventListener('keydown', _player_js__WEBPACK_IMPORTED_MODULE_0__.playerMovements);
    document.addEventListener('keydown', pauseGame);
    document.addEventListener('keydown', restart);
    document.addEventListener('keyup', _player_js__WEBPACK_IMPORTED_MODULE_0__.stopPlayerMovements);
  }
} // Pauses game by setting exported variable to desired game state

function pauseGame(event) {
  if (event.keyCode === 27 && !gamePaused) gamePaused = true;else if (event.keyCode === 27 && gamePaused) gamePaused = false;
} // Ends game by clearing the grid and TimerIds


function endGame(grid) {
  gameOver = true;

  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.upTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.downTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.leftTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.rightTimerId); // document.getElementById("ending").style.display = "block";
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
    var platformGap = 750 / platformCount;
    var newPlatBottom = 100 + i * platformGap;
    var newPlatform = new Platform(grid, newPlatBottom);
    platforms.push(newPlatform);
  }
} // Moves Platforms by substracting, or adding to the Platform's bottom property

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
      updatePlatforms(platform, grid);
    });
  }
} // Removes old platforms and creates new platforms that are then pushed to platform array

function updatePlatforms(platform, grid) {
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
        if (slimeBottomSpace <= -80) (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.endGame)(document.querySelector('.grid'));
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
    (0,_sound_js__WEBPACK_IMPORTED_MODULE_2__.slimeSoundPlay)();
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
var muted = false;
var songRunning = false; // const menu = document.querySelector(".menu")
// console.log(menu)
// const menuList = menu.querySelector(".menu-list")
// Importing background music

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
// let backgroundMusicVolume = 1;
// backgroundMusicOne.volume   = backgroundMusicVolume;
// backgroundMusicTwo .volume  = backgroundMusicVolume;
// backgroundMusicThree.volume = backgroundMusicVolume;
// backgroundMusicFour.volume  = backgroundMusicVolume;
// backgroundMusicFive.volume  = backgroundMusicVolume;
// backgroundMusicSix.volume   = backgroundMusicVolume;
// backgroundMusicSeven.volume = backgroundMusicVolume;
// backgroundMusicEight.volume = backgroundMusicVolume;

var slimeSounds = [slimeSoundOne, slimeSoundTwo, slimeSoundThree, slimeSoundFour]; // Returning random slime sound when called

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

document.addEventListener('DOMContentLoaded', function () {
  var slider = document.getElementById("music");
  slider.addEventListener('change', function () {
    var currentSong = sample(backgroundMusic);
    backgroundMusicPlay(currentSong);
    currentSong.volume = this.value / 100;
    console.log(this.value / 100);
  });
});
function slimeSoundPlay() {
  if (!muted) sample(slimeSounds).play();
}
function backgroundMusicPlay(currentSong) {
  if (!songRunning) {
    songRunning = true;

    if (!muted) {
      currentSong.play();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VyxDQUFDSyxJQUFaO0FBQ0g7QUFDSjtBQUVKOzs7Ozs7VUNqRkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQSxJQUFNN0YsSUFBSSxHQUFHRyxRQUFRLENBQUM2QixhQUFULENBQXVCLE9BQXZCLENBQWI7QUFFQTdCLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaERMLEVBQUFBLHVEQUFLLENBQUNDLElBQUQsQ0FBTDtBQUNILENBRkQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxhdGZvcm0uanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXllclNob290LmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3NvdW5kLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBZGQgc3RhcnQgbWVudVxuLy8gQWRkIHBhdXNlIG1lbnVcbi8vIEFkZCBkZWF0aCBzY3JlZW5cbi8vIEJPTlVTOiBhZGQgZW5lbXksIGFkZCBzdGFnZXNcblxuaW1wb3J0IHtjcmVhdGVQbGF5ZXIsIHNsaW1lSnVtcCwgcGxheWVyTW92ZW1lbnRzLCBzdG9wUGxheWVyTW92ZW1lbnRzLFxuICAgICAgICB1cFRpbWVySWQsIGRvd25UaW1lcklkLCBsZWZ0VGltZXJJZCwgcmlnaHRUaW1lcklkfSBmcm9tIFwiLi9wbGF5ZXIuanNcIlxuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybXMsIG1vdmVQbGF0Zm9ybXMsIHNjb3JlfSBmcm9tIFwiLi9wbGF0Zm9ybS5qc1wiXG5pbXBvcnQge3BsYXllclNob290LCBzaG9vdEJ1bGxldH0gZnJvbSBcIi4vcGxheWVyU2hvb3QuanNcIlxuXG5leHBvcnQgbGV0IGdhbWVPdmVyICAgPSBmYWxzZTtcbmV4cG9ydCBsZXQgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuXG4vLyBJbiBjaGFyZ2Ugb2Ygc3RhcnRpbmcgdGhlIGdhbWUsIGNhbGxzIG5lY2Vzc2FyeSBmdW5jdGlvbnMgbmVlZGVkIGZvciBidWlsZGluZyBhbmQgcmVuZGVyaW5nLlxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQoZ3JpZCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjcmVhdGVQbGF0Zm9ybXMoKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY3JlYXRlUGxheWVyKCk7IH0sIDMwMClcbiAgICAgICAgc2V0SW50ZXJ2YWwobW92ZVBsYXRmb3JtcywgMSk7XG4gICAgICAgIHNldEludGVydmFsKHNob290QnVsbGV0LCAxKTtcbiAgICAgICAgc2xpbWVKdW1wKCk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllclNob290LmJpbmQodGhpcywgZ3JpZCkpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJNb3ZlbWVudHMpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwYXVzZUdhbWUpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCByZXN0YXJ0KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN0b3BQbGF5ZXJNb3ZlbWVudHMpXG4gICAgfVxufVxuXG4vLyBQYXVzZXMgZ2FtZSBieSBzZXR0aW5nIGV4cG9ydGVkIHZhcmlhYmxlIHRvIGRlc2lyZWQgZ2FtZSBzdGF0ZVxuXG5mdW5jdGlvbiBwYXVzZUdhbWUoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgJiYgIWdhbWVQYXVzZWQpIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3ICYmIGdhbWVQYXVzZWQpIGdhbWVQYXVzZWQgPSBmYWxzZTtcbn1cblxuLy8gRW5kcyBnYW1lIGJ5IGNsZWFyaW5nIHRoZSBncmlkIGFuZCBUaW1lcklkc1xuXG5leHBvcnQgZnVuY3Rpb24gZW5kR2FtZShncmlkKSB7XG4gICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgIHdoaWxlIChncmlkLmZpcnN0Q2hpbGQpIHsgZ3JpZC5yZW1vdmVDaGlsZChncmlkLmZpcnN0Q2hpbGQpIH1cbiAgICBjbGVhckludGVydmFsKHVwVGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZCk7XG4gICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW5kaW5nXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59XG5cbi8vIFJlc3RhcnRzIGdhbWUgdmlhIHJlbG9hZGluZyBwYWdlXG5cbmZ1bmN0aW9uIHJlc3RhcnQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gODIpIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICB9XG59XG5cblxuIiwiaW1wb3J0IHtnYW1lT3ZlciwgZ2FtZVBhdXNlZH0gZnJvbSBcIi4vZ2FtZS5qc1wiXG5pbXBvcnQge2lzSnVtcGluZywgaXNGYWxsaW5nfSBmcm9tIFwiLi9wbGF5ZXIuanNcIlxuXG5sZXQgcGxhdGZvcm1Db3VudCAgICA9IDU7XG5cbmV4cG9ydCBsZXQgc2NvcmUgICAgID0gMDtcbmV4cG9ydCBsZXQgcGxhdGZvcm1zID0gW107XG5cbi8vIFNldHMgUGxhdGZvcm0gcHJvcGVydGllc1xuXG5jbGFzcyBQbGF0Zm9ybSB7XG4gICAgY29uc3RydWN0b3IoZ3JpZCwgbmV3UGxhdEJvdHRvbSkge1xuICAgICAgICB0aGlzLmJvdHRvbSA9IG5ld1BsYXRCb3R0b207XG4gICAgICAgIHRoaXMubGVmdCA9IE1hdGgucmFuZG9tKCkgKiA0NTA7XG4gICAgICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgICAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgncGxhdGZvcm0nKTtcbiAgICAgICAgdmlzdWFsLnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gdGhpcy5ib3R0b20gKyAncHgnO1xuICAgICAgICBncmlkLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gICAgfVxufVxuXG4vLyBDcmVhdGVzIHBsYXRmb3JtcyBhbmQgcHVzaGVzIHRvIHBsYXRmb3JtIGFycmF5XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybXMoKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0Zm9ybUNvdW50OyBpKyspIHtcbiAgICAgICAgbGV0IHBsYXRmb3JtR2FwID0gNzUwIC8gcGxhdGZvcm1Db3VudDtcbiAgICAgICAgbGV0IG5ld1BsYXRCb3R0b20gPSAxMDAgKyBpICogcGxhdGZvcm1HYXA7XG4gICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCBuZXdQbGF0Qm90dG9tKTtcbiAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pXG4gICAgfVxufVxuXG4vLyBNb3ZlcyBQbGF0Zm9ybXMgYnkgc3Vic3RyYWN0aW5nLCBvciBhZGRpbmcgdG8gdGhlIFBsYXRmb3JtJ3MgYm90dG9tIHByb3BlcnR5XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUGxhdGZvcm1zKCkge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNKdW1waW5nKSB7XG4gICAgICAgICAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDMuNTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNGYWxsaW5nKSB7XG4gICAgICAgICAgICAgICAgcGxhdGZvcm0uYm90dG9tICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdmlzdWFsID0gcGxhdGZvcm0udmlzdWFsO1xuICAgICAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHBsYXRmb3JtLmJvdHRvbSArICdweCc7XG4gICAgICAgICAgICB1cGRhdGVQbGF0Zm9ybXMocGxhdGZvcm0sIGdyaWQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuLy8gUmVtb3ZlcyBvbGQgcGxhdGZvcm1zIGFuZCBjcmVhdGVzIG5ldyBwbGF0Zm9ybXMgdGhhdCBhcmUgdGhlbiBwdXNoZWQgdG8gcGxhdGZvcm0gYXJyYXlcblxuZnVuY3Rpb24gdXBkYXRlUGxhdGZvcm1zKHBsYXRmb3JtLCBncmlkKSB7XG4gICAgaWYgKCFnYW1lT3Zlcikge1xuICAgICAgICBpZiAocGxhdGZvcm0uYm90dG9tIDw9IC01MCkge1xuICAgICAgICAgICAgbGV0IGZpcnN0UGxhdGZvcm0gPSBwbGF0Zm9ybXNbMF0udmlzdWFsO1xuICAgICAgICAgICAgZmlyc3RQbGF0Zm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF0Zm9ybScpO1xuICAgICAgICAgICAgcGxhdGZvcm1zLnNoaWZ0KCk7XG4gICAgICAgICAgICBzY29yZSArPSAxO1xuICAgICAgICAgICAgbGV0IG5ld1BsYXRmb3JtID0gbmV3IFBsYXRmb3JtKGdyaWQsIDc1MClcbiAgICAgICAgICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKVxuXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge2VuZEdhbWUsIGdhbWVQYXVzZWR9IGZyb20gXCIuL2dhbWUuanNcIjtcbmltcG9ydCB7cGxhdGZvcm1zfSBmcm9tIFwiLi9wbGF0Zm9ybS5qc1wiXG5pbXBvcnQge3NsaW1lU291bmRQbGF5fSBmcm9tIFwiLi9zb3VuZC5qc1wiXG5cbmNvbnN0IHNsaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxubGV0IGlzR29pbmdMZWZ0ICAgICAgICAgICAgID0gZmFsc2U7XG5sZXQgaXNHb2luZ1JpZ2h0ICAgICAgICAgICAgPSBmYWxzZTtcblxuZXhwb3J0IGxldCBpc0p1bXBpbmcgICAgICAgID0gZmFsc2U7XG5leHBvcnQgbGV0IGlzRmFsbGluZyAgICAgICAgPSB0cnVlO1xuZXhwb3J0IGxldCBzbGltZUxlZnRTcGFjZSAgID0gMjgwO1xuZXhwb3J0IGxldCBnYW1lT3ZlciAgICAgICAgID0gZmFsc2U7XG5leHBvcnQgbGV0IHN0YXJ0UG9pbnQgICAgICAgPSAyMDA7XG5leHBvcnQgbGV0IHNsaW1lQm90dG9tU3BhY2UgPSBzdGFydFBvaW50O1xuZXhwb3J0IGxldCBsZWZ0VGltZXJJZDtcbmV4cG9ydCBsZXQgcmlnaHRUaW1lcklkO1xuZXhwb3J0IGxldCB1cFRpbWVySWQ7XG5leHBvcnQgbGV0IGRvd25UaW1lcklkO1xuXG4vLyBDcmVhdGUgJ1NsaW1lJyBhbmQgYWRkIHRvIHRoZSBncmlkLlxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykuYXBwZW5kQ2hpbGQoc2xpbWUpO1xuICAgIHNsaW1lLmNsYXNzTGlzdC5hZGQoJ3NsaW1lJyk7XG4gICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4JztcbiAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4Jztcbn1cblxuLy8gSW4gY2hhcmdlIG9mIGFkZGluZyB0byB0aGUgcGxheWVyJ3MgWSB2YWx1ZSBhbmQgY2FsbGluZyBzbGltZUZhbGwoKVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpbWVKdW1wKCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKVxuICAgICAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgICAgICBpc0ZhbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgdXBUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgICAgICAgICBzbGltZUJvdHRvbVNwYWNlICs9IDE7XG4gICAgICAgICAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgICAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPiBzdGFydFBvaW50ICsgMTAwKSBzbGltZUZhbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbi8vIEluIGNoYXJnZSBvZiBzdWJ0cmFjdGluZyB0aGUgcGxheWVyJ3MgWSB2YWx1ZSBhbmQgY2FsbGluZyBlbmRHYW1lKClcblxuZnVuY3Rpb24gc2xpbWVGYWxsKCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKHVwVGltZXJJZClcbiAgICAgICAgaXNKdW1waW5nID0gZmFsc2U7XG4gICAgICAgIGlzRmFsbGluZyA9IHRydWU7XG4gICAgICAgIGRvd25UaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgICAgICAgICBzbGltZUJvdHRvbVNwYWNlIC09IDI7XG4gICAgICAgICAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgICAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPD0gLTgwICkgZW5kR2FtZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpKTsgXG4gICAgICAgICAgICAgICAgcGxhdGZvcm1zLmZvckVhY2gocGxhdGZvcm0gPT4geyBjb2xsaXNpb25EZXRlY3QocGxhdGZvcm0pO30gKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxKVxuICAgIH1cbn1cblxuLy8gQ2hlY2tzIHRoZSB2YWx1ZSBvZiB0aGUgYm90dG9tIG9mIHRoZSBwbGF5ZXIsIGlmIHNhaWQgdmFsdWUgcmV0dXJucyB0cnVlIGl0IGNhbGxzIHNsaW1lSnVtcCgpXG5cbmZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdChwbGF0Zm9ybSkge1xuICAgIGlmICgoc2xpbWVCb3R0b21TcGFjZSA+PSBwbGF0Zm9ybS5ib3R0b20pICYmIChzbGltZUJvdHRvbVNwYWNlIDw9IChwbGF0Zm9ybS5ib3R0b20gKyAxOSkpICYmXG4gICAgKChzbGltZUxlZnRTcGFjZSArIDQwKSA+PSBwbGF0Zm9ybS5sZWZ0KSAmJiAoc2xpbWVMZWZ0U3BhY2UgPD0gKHBsYXRmb3JtLmxlZnQgKyAxMDApKSAmJlxuICAgICFpc0p1bXBpbmcpIHtcbiAgICAgICAgc3RhcnRQb2ludCA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgIHNsaW1lU291bmRQbGF5KCk7XG4gICAgICAgIHNsaW1lSnVtcCgpO1xuICAgICAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgIH1cbn1cblxuLy8gQ2FsbHMgbW92ZUxlZnQoKSBvciBtb3ZlUmlnaHQgZGVwZW5kaW5nIG9uIHBsYXllciBpbnB1dC4gKlVzZXMga2V5ZG93bipcblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIG1vdmVMZWZ0KCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkgbW92ZVJpZ2h0KCk7XG4gICAgfVxufVxuXG4vLyBDZWFzZXMgcGxheWVyIG1vdmVtZW50IGRlcGVuZGluZyBvbiBrZXkgcmVsZWFzZS4gKlVzZXMga2V5dXAqXG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wUGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDY1KSB7XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSB7XG4gICAgICAgIGlzR29pbmdSaWdodCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKTtcbiAgICB9XG59XG5cbi8vIERlY3JlbWVudHMgcGxheWVyJ3MgWCB2YWx1ZVxuXG5mdW5jdGlvbiBtb3ZlTGVmdCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChsZWZ0VGltZXJJZClcbiAgICAgICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlzR29pbmdMZWZ0ID0gdHJ1ZVxuICAgICAgICBsZWZ0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAtNjApIHtcbiAgICAgICAgICAgIHNsaW1lTGVmdFNwYWNlIC09IDI7XG4gICAgICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnXG4gICAgICAgICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSA2MDA7XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBJbmNyZW1lbnRzIHBsYXllcidzIFggdmFsdWVcblxuZnVuY3Rpb24gbW92ZVJpZ2h0KCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICAgICAgaWYgKGlzR29pbmdMZWZ0KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgICAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlzR29pbmdSaWdodCA9IHRydWVcbiAgICAgICAgcmlnaHRUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNsaW1lTGVmdFNwYWNlIDw9IDYxMCkge1xuICAgICAgICAgICAgICAgIHNsaW1lTGVmdFNwYWNlICs9IDI7XG4gICAgICAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICAgICAgfSBlbHNlIHNsaW1lTGVmdFNwYWNlID0gLTYwO1xuICAgICAgICB9LCAxKVxuICAgIH1cbn1cblxuIiwiaW1wb3J0IHtzbGltZUxlZnRTcGFjZSwgc2xpbWVCb3R0b21TcGFjZX0gZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5cbmV4cG9ydCBsZXQgYnVsbGV0cyA9IFtdO1xuXG5jbGFzcyBCdWxsZXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2U7XG4gICAgICAgIHRoaXMubGVmdCA9IHNsaW1lTGVmdFNwYWNlO1xuICAgICAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ2J1bGxldCcpO1xuICAgICAgICB2aXN1YWwuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgMTIgKyAncHgnO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArIDEyICsgJ3B4JztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKS5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclNob290KGdyaWQsIGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNob290QnVsbGV0KCk7XG4gICAgICAgIGxldCBuZXdCdWxsZXQgPSBuZXcgQnVsbGV0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyksIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICBidWxsZXRzLnB1c2gobmV3QnVsbGV0KTtcbiAgICB9IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvb3RCdWxsZXQoeCwgeSkge1xuICAgIGJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4ge1xuICAgICAgICBidWxsZXQuYm90dG9tICs9IDM7XG4gICAgICAgIGxldCB2aXN1YWwgPSBidWxsZXQudmlzdWFsO1xuICAgICAgICB2aXN1YWwuc3R5bGUuYm90dG9tID0gYnVsbGV0LmJvdHRvbSArICdweCc7XG4gICAgICAgIGlmIChidWxsZXQuYm90dG9tID49IDc1MCkge1xuICAgICAgICAgICAgbGV0IGZpcnN0YnVsbGV0ID0gYnVsbGV0c1swXS52aXN1YWw7XG4gICAgICAgICAgICBmaXJzdGJ1bGxldC5jbGFzc0xpc3QucmVtb3ZlKCdidWxsZXQnKTtcbiAgICAgICAgICAgIGJ1bGxldHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG4gXG4iLCJsZXQgbXV0ZWQgPSBmYWxzZTtcbmxldCBzb25nUnVubmluZyA9IGZhbHNlO1xuXG4vLyBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51XCIpXG4vLyBjb25zb2xlLmxvZyhtZW51KVxuLy8gY29uc3QgbWVudUxpc3QgPSBtZW51LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1saXN0XCIpXG5cblxuLy8gSW1wb3J0aW5nIGJhY2tncm91bmQgbXVzaWNcblxubGV0IGJhY2tncm91bmRNdXNpY09uZSAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL0EgTG9uZWx5IENoZXJyeSBUcmVlIPCfjLgubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1R3byAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL0hlbGxvLCBpdCdzIE1lIS5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljVGhyZWUgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvTWVsYW5jaG9saWMgV2Fsay5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRm91ciAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvTm8gRGVzdGluYXRpb24ubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY0ZpdmUgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1JlYWR5IFBpeGVsIE9uZS5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljU2l4ICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvUnVuIEFzIEZhc3QgQXMgWW91IENhbi5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljU2V2ZW4gPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvVGhlIHNlYXJjaC5tcDNcIik7XG5sZXQgYmFja2dyb3VuZE11c2ljRWlnaHQgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL2JhY2tncm91bmRfbXVzaWMvV2VsY29tZSBTcGFjZSBUcmF2ZWxlci5tcDNcIik7XG5cbmxldCBiYWNrZ3JvdW5kTXVzaWMgPSBbYmFja2dyb3VuZE11c2ljT25lLCBiYWNrZ3JvdW5kTXVzaWNUd28sIGJhY2tncm91bmRNdXNpY1RocmVlLCBiYWNrZ3JvdW5kTXVzaWNGb3VyLFxuICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kTXVzaWNGaXZlLCBiYWNrZ3JvdW5kTXVzaWNTaXgsIGJhY2tncm91bmRNdXNpY1NldmVuLCBiYWNrZ3JvdW5kTXVzaWNFaWdodF07XG5cbi8vIEltcG9ydGluZyBzbGltZSBzb3VuZHNcblxubGV0IHNsaW1lU291bmRPbmUgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzAubXAzXCIpO1xubGV0IHNsaW1lU291bmRUd28gICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzEubXAzXCIpO1xubGV0IHNsaW1lU291bmRUaHJlZSA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzIubXAzXCIpO1xubGV0IHNsaW1lU291bmRGb3VyICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzMubXAzXCIpO1xuXG4vLyBBZGp1c3Rpbmcgc2xpbWUgc291bmQgdm9sdW1lc1xuXG5sZXQgc2xpbWVWb2x1bWUgPSAwLjA1O1xuc2xpbWVTb3VuZE9uZS52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFR3by52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFRocmVlLnZvbHVtZSA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZEZvdXIudm9sdW1lICA9IHNsaW1lVm9sdW1lO1xuXG4vLyBQdXNoaW5nIHNsaW1lIHNvdW5kcyBpbnRvIGFuIGFycmF5XG5cbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNWb2x1bWUgPSAxO1xuXG4vLyBiYWNrZ3JvdW5kTXVzaWNPbmUudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNUd28gLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNUaHJlZS52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNGb3VyLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNGaXZlLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNTaXgudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNTZXZlbi52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNFaWdodC52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5cbmxldCBzbGltZVNvdW5kcyA9IFtzbGltZVNvdW5kT25lLCBzbGltZVNvdW5kVHdvLCBzbGltZVNvdW5kVGhyZWUsIHNsaW1lU291bmRGb3VyXTtcblxuLy8gUmV0dXJuaW5nIHJhbmRvbSBzbGltZSBzb3VuZCB3aGVuIGNhbGxlZFxuXG5mdW5jdGlvbiBzYW1wbGUoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vciAoIE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGggKV1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11c2ljXCIpO1xuXG5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGN1cnJlbnRTb25nID0gc2FtcGxlKGJhY2tncm91bmRNdXNpYylcbiAgICBiYWNrZ3JvdW5kTXVzaWNQbGF5KGN1cnJlbnRTb25nKVxuICAgIGN1cnJlbnRTb25nLnZvbHVtZSA9IHRoaXMudmFsdWUgLyAxMDA7XG4gICAgY29uc29sZS5sb2codGhpcy52YWx1ZSAvIDEwMClcbiAgICB9KVxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lU291bmRQbGF5KCkge1xuICAgIGlmICghbXV0ZWQpIHNhbXBsZShzbGltZVNvdW5kcykucGxheSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFja2dyb3VuZE11c2ljUGxheShjdXJyZW50U29uZykge1xuICAgIGlmICghc29uZ1J1bm5pbmcpIHtcbiAgICAgICAgc29uZ1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICBpZiAoIW11dGVkKSB7XG4gICAgICAgICAgICBjdXJyZW50U29uZy5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3N0YXJ0fSBmcm9tIFwiLi9zY3JpcHRzL2dhbWUuanNcIlxuXG5jb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBzdGFydChncmlkKTtcbn0pXG4iXSwibmFtZXMiOlsiY3JlYXRlUGxheWVyIiwic2xpbWVKdW1wIiwicGxheWVyTW92ZW1lbnRzIiwic3RvcFBsYXllck1vdmVtZW50cyIsInVwVGltZXJJZCIsImRvd25UaW1lcklkIiwibGVmdFRpbWVySWQiLCJyaWdodFRpbWVySWQiLCJjcmVhdGVQbGF0Zm9ybXMiLCJtb3ZlUGxhdGZvcm1zIiwic2NvcmUiLCJwbGF5ZXJTaG9vdCIsInNob290QnVsbGV0IiwiZ2FtZU92ZXIiLCJnYW1lUGF1c2VkIiwic3RhcnQiLCJncmlkIiwic2V0VGltZW91dCIsInNldEludGVydmFsIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsInBhdXNlR2FtZSIsInJlc3RhcnQiLCJldmVudCIsImtleUNvZGUiLCJlbmRHYW1lIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiY2xlYXJJbnRlcnZhbCIsImxvY2F0aW9uIiwicmVsb2FkIiwiaXNKdW1waW5nIiwiaXNGYWxsaW5nIiwicGxhdGZvcm1Db3VudCIsInBsYXRmb3JtcyIsIlBsYXRmb3JtIiwibmV3UGxhdEJvdHRvbSIsImJvdHRvbSIsImxlZnQiLCJNYXRoIiwicmFuZG9tIiwidmlzdWFsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwiaSIsInBsYXRmb3JtR2FwIiwibmV3UGxhdGZvcm0iLCJwdXNoIiwiZm9yRWFjaCIsInBsYXRmb3JtIiwidXBkYXRlUGxhdGZvcm1zIiwiZmlyc3RQbGF0Zm9ybSIsInJlbW92ZSIsInNoaWZ0Iiwic2xpbWVTb3VuZFBsYXkiLCJzbGltZSIsImlzR29pbmdMZWZ0IiwiaXNHb2luZ1JpZ2h0Iiwic2xpbWVMZWZ0U3BhY2UiLCJzdGFydFBvaW50Iiwic2xpbWVCb3R0b21TcGFjZSIsInNsaW1lRmFsbCIsImNvbGxpc2lvbkRldGVjdCIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwiYnVsbGV0cyIsIkJ1bGxldCIsIm5ld0J1bGxldCIsImNsaWVudFgiLCJjbGllbnRZIiwieCIsInkiLCJidWxsZXQiLCJmaXJzdGJ1bGxldCIsIm11dGVkIiwic29uZ1J1bm5pbmciLCJiYWNrZ3JvdW5kTXVzaWNPbmUiLCJBdWRpbyIsImJhY2tncm91bmRNdXNpY1R3byIsImJhY2tncm91bmRNdXNpY1RocmVlIiwiYmFja2dyb3VuZE11c2ljRm91ciIsImJhY2tncm91bmRNdXNpY0ZpdmUiLCJiYWNrZ3JvdW5kTXVzaWNTaXgiLCJiYWNrZ3JvdW5kTXVzaWNTZXZlbiIsImJhY2tncm91bmRNdXNpY0VpZ2h0IiwiYmFja2dyb3VuZE11c2ljIiwic2xpbWVTb3VuZE9uZSIsInNsaW1lU291bmRUd28iLCJzbGltZVNvdW5kVGhyZWUiLCJzbGltZVNvdW5kRm91ciIsInNsaW1lVm9sdW1lIiwidm9sdW1lIiwic2xpbWVTb3VuZHMiLCJzYW1wbGUiLCJhcnJheSIsImZsb29yIiwibGVuZ3RoIiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjdXJyZW50U29uZyIsImJhY2tncm91bmRNdXNpY1BsYXkiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJwbGF5Il0sInNvdXJjZVJvb3QiOiIifQ==