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
/* harmony export */   "softPaused": function() { return /* binding */ softPaused; },
/* harmony export */   "start": function() { return /* binding */ start; },
/* harmony export */   "pauseGame": function() { return /* binding */ pauseGame; },
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
var gamePaused = false;
var softPaused = false; // In charge of starting the game, calls necessary functions needed for building and rendering.

function start(grid) {
  if (!gamePaused) {
    (0,_platform_js__WEBPACK_IMPORTED_MODULE_1__.createPlatforms)();
    (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
    setInterval(_platform_js__WEBPACK_IMPORTED_MODULE_1__.movePlatforms, 1);
    setInterval(_playerShoot_js__WEBPACK_IMPORTED_MODULE_2__.shootBullet, 1);
    (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.slimeJump)();
    document.addEventListener('keydown', _playerShoot_js__WEBPACK_IMPORTED_MODULE_2__.playerShoot.bind(this, grid));
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
    menu.style.display = "block";
  } else if (event.keyCode === 32 && gamePaused) {
    menu.style.display = "none";
    gamePaused = false;
    softPaused = false;
  }
}

function pauseGame() {
  gamePaused = true;
  softPaused = true;
} // Ends game by clearing the grid and TimerIds

function endGame(grid) {
  gameOver = true;
  var htmlPlatforms = document.getElementsByClassName("platform");
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.upTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.downTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.leftTimerId);
  clearInterval(_player_js__WEBPACK_IMPORTED_MODULE_0__.rightTimerId);
  var endingOneText = document.querySelector('.oneEnding');
  var endingTwoText = document.querySelector('.twoEnding');
  var endingThreeText = document.querySelector('.finalScore');
  var ogScore = document.querySelector('.score');
  ogScore.innerHTML = "";
  endingOneText.innerHTML = "it wasn't enough";
  endingTwoText.innerHTML = "push R to try again";
  endingThreeText.innerHTML = "final score: ".concat(_platform_js__WEBPACK_IMPORTED_MODULE_1__.score);
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
var score = 1;
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
        score += 1;
        scoreText.innerHTML = score;
        titleText.innerHTML = "";
        movementText.innerHTML = "";
        shootText.innerHTML = "";
      }

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
  if (event.keyCode === 13) {
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
      var firstBullet = bullets[0].visual;
      firstBullet.remove();
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
var muted = true;
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
var slimeSoundFour = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3");
var slimeSoundFive = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
var slimeSoundSix = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
var slimeSoundSeven = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
var slimeSoundEight = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3"); // Adjusting slime sound volumes

var slimeVolume = 0.05;
slimeSoundOne.volume = slimeVolume;
slimeSoundTwo.volume = slimeVolume;
slimeSoundThree.volume = slimeVolume;
slimeSoundFour.volume = slimeVolume;
slimeSoundFive.volume = slimeVolume;
slimeSoundSix.volume = slimeVolume;
slimeSoundSeven.volume = slimeVolume;
slimeSoundEight.volume = slimeVolume; // Pushing slime sounds into an array

var slimeSounds = [slimeSoundOne, slimeSoundTwo, slimeSoundThree, slimeSoundFour, slimeSoundFour, slimeSoundFive, slimeSoundSix, slimeSoundSeven, slimeSoundEight]; // let backgroundMusicVolume = 1;
// backgroundMusicOne.volume   = backgroundMusicVolume;
// backgroundMusicTwo .volume  = backgroundMusicVolume;
// backgroundMusicThree.volume = backgroundMusicVolume;
// backgroundMusicFour.volume  = backgroundMusicVolume;
// backgroundMusicFive.volume  = backgroundMusicVolume;
// backgroundMusicSix.volume   = backgroundMusicVolume;
// backgroundMusicSeven.volume = backgroundMusicVolume;
// backgroundMusicEight.volume = backgroundMusicVolume;
// Returning random slime sound when called

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
  (0,_scripts_game_js__WEBPACK_IMPORTED_MODULE_0__.pauseGame)();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUVBLElBQU01RyxJQUFJLEdBQUdFLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixPQUF2QixDQUFiO0FBRUFQLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaERKLEVBQUFBLHVEQUFLLENBQUNDLElBQUQsQ0FBTDtBQUNBYSxFQUFBQSwyREFBUztBQUNaLENBSEQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxhdGZvcm0uanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3BsYXllclNob290LmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3NvdW5kLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBZGQgc3RhcnQgbWVudVxuLy8gQWRkIHBhdXNlIG1lbnVcbi8vIEFkZCBkZWF0aCBzY3JlZW5cbi8vIEJPTlVTOiBhZGQgZW5lbXksIGFkZCBzdGFnZXNcblxuaW1wb3J0IHtjcmVhdGVQbGF5ZXIsIHNsaW1lSnVtcCwgcGxheWVyTW92ZW1lbnRzLCBzdG9wUGxheWVyTW92ZW1lbnRzLFxuICAgICAgICB1cFRpbWVySWQsIGRvd25UaW1lcklkLCBsZWZ0VGltZXJJZCwgcmlnaHRUaW1lcklkfSBmcm9tIFwiLi9wbGF5ZXIuanNcIlxuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybXMsIG1vdmVQbGF0Zm9ybXMsIHNjb3JlfSBmcm9tIFwiLi9wbGF0Zm9ybS5qc1wiXG5pbXBvcnQge3BsYXllclNob290LCBzaG9vdEJ1bGxldH0gZnJvbSBcIi4vcGxheWVyU2hvb3QuanNcIlxuXG5leHBvcnQgbGV0IGdhbWVPdmVyICAgPSBmYWxzZTtcbmV4cG9ydCBsZXQgZ2FtZVBhdXNlZCA9IGZhbHNlO1xuZXhwb3J0IGxldCBzb2Z0UGF1c2VkID0gZmFsc2U7XG5cbi8vIEluIGNoYXJnZSBvZiBzdGFydGluZyB0aGUgZ2FtZSwgY2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyBuZWVkZWQgZm9yIGJ1aWxkaW5nIGFuZCByZW5kZXJpbmcuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydChncmlkKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNyZWF0ZVBsYXRmb3JtcygpO1xuICAgICAgICBjcmVhdGVQbGF5ZXIoKVxuICAgICAgICBzZXRJbnRlcnZhbChtb3ZlUGxhdGZvcm1zLCAxKTtcbiAgICAgICAgc2V0SW50ZXJ2YWwoc2hvb3RCdWxsZXQsIDEpO1xuICAgICAgICBzbGltZUp1bXAoKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyU2hvb3QuYmluZCh0aGlzLCBncmlkKSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllck1vdmVtZW50cylcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHBsYXllclBhdXNlR2FtZSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHJlc3RhcnQpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc3RvcFBsYXllck1vdmVtZW50cylcbiAgICB9XG59XG5cbi8vIFBhdXNlcyBnYW1lIGJ5IHNldHRpbmcgZXhwb3J0ZWQgdmFyaWFibGUgdG8gZGVzaXJlZCBnYW1lIHN0YXRlXG5cbmZ1bmN0aW9uIHBsYXllclBhdXNlR2FtZShldmVudCkge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyICYmICFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfSBcbiAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzMiAmJiBnYW1lUGF1c2VkKSB7XG4gICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBnYW1lUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHNvZnRQYXVzZWQgPSBmYWxzZTtcbiAgICB9IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF1c2VHYW1lKCkge1xuICAgIGdhbWVQYXVzZWQgPSB0cnVlO1xuICAgIHNvZnRQYXVzZWQgPSB0cnVlO1xufVxuXG4vLyBFbmRzIGdhbWUgYnkgY2xlYXJpbmcgdGhlIGdyaWQgYW5kIFRpbWVySWRzXG5cbmV4cG9ydCBmdW5jdGlvbiBlbmRHYW1lKGdyaWQpIHsgXG4gICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgIGxldCBodG1sUGxhdGZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYXRmb3JtXCIpO1xuICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZCk7XG4gICAgY29uc3QgZW5kaW5nT25lVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVFbmRpbmcnKTtcbiAgICBjb25zdCBlbmRpbmdUd29UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR3b0VuZGluZycpO1xuICAgIGNvbnN0IGVuZGluZ1RocmVlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maW5hbFNjb3JlJyk7XG4gICAgY29uc3Qgb2dTY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgIG9nU2NvcmUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBlbmRpbmdPbmVUZXh0LmlubmVySFRNTCA9IFwiaXQgd2Fzbid0IGVub3VnaFwiO1xuICAgIGVuZGluZ1R3b1RleHQuaW5uZXJIVE1MID0gXCJwdXNoIFIgdG8gdHJ5IGFnYWluXCI7XG4gICAgZW5kaW5nVGhyZWVUZXh0LmlubmVySFRNTCA9IGBmaW5hbCBzY29yZTogJHtzY29yZX1gO1xufVxuXG4vLyBSZXN0YXJ0cyBnYW1lIHZpYSByZWxvYWRpbmcgcGFnZVxuXG5mdW5jdGlvbiByZXN0YXJ0KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDgyKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfVxufVxuXG5cbiIsImltcG9ydCB7Z2FtZU92ZXIsIGdhbWVQYXVzZWQsIHNvZnRQYXVzZWR9IGZyb20gXCIuL2dhbWUuanNcIlxuaW1wb3J0IHtpc0p1bXBpbmcsIGlzRmFsbGluZ30gZnJvbSBcIi4vcGxheWVyLmpzXCJcblxubGV0IHBsYXRmb3JtQ291bnQgICAgPSA1O1xuXG5leHBvcnQgbGV0IHNjb3JlICAgICA9IDE7XG5leHBvcnQgbGV0IHBsYXRmb3JtcyA9IFtdO1xuXG4vLyBTZXRzIFBsYXRmb3JtIHByb3BlcnRpZXNcblxuY2xhc3MgUGxhdGZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKGdyaWQsIG5ld1BsYXRCb3R0b20pIHtcbiAgICAgICAgdGhpcy5ib3R0b20gPSBuZXdQbGF0Qm90dG9tO1xuICAgICAgICB0aGlzLmxlZnQgPSBNYXRoLnJhbmRvbSgpICogNDUwO1xuICAgICAgICB0aGlzLnZpc3VhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ3BsYXRmb3JtJyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gdGhpcy5sZWZ0ICsgJ3B4JztcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICAgICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuLy8gQ3JlYXRlcyBwbGF0Zm9ybXMgYW5kIHB1c2hlcyB0byBwbGF0Zm9ybSBhcnJheVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhdGZvcm1zKCkge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhdGZvcm1Db3VudDsgaSsrKSB7XG4gICAgICAgIGxldCBwbGF0Zm9ybUdhcCA9IDc1MCAvIHBsYXRmb3JtQ291bnQ7XG4gICAgICAgIGxldCBuZXdQbGF0Qm90dG9tID0gMTAwICsgaSAqIHBsYXRmb3JtR2FwO1xuICAgICAgICBsZXQgbmV3UGxhdGZvcm0gPSBuZXcgUGxhdGZvcm0oZ3JpZCwgbmV3UGxhdEJvdHRvbSk7XG4gICAgICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKVxuICAgIH1cbn1cblxuLy8gTW92ZXMgUGxhdGZvcm1zIGJ5IHN1YnN0cmFjdGluZywgb3IgYWRkaW5nIHRvIHRoZSBQbGF0Zm9ybSdzIGJvdHRvbSBwcm9wZXJ0eVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVBsYXRmb3JtcygpIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBpZiAoIWdhbWVQYXVzZWQgfHwgc29mdFBhdXNlZCkge1xuICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNKdW1waW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvZnRQYXVzZWQpIHsgXG4gICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSAxLjU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0uYm90dG9tIC09IDMuNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNGYWxsaW5nKSB7XG4gICAgICAgICAgICAgICAgcGxhdGZvcm0uYm90dG9tICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdmlzdWFsID0gcGxhdGZvcm0udmlzdWFsO1xuICAgICAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHBsYXRmb3JtLmJvdHRvbSArICdweCc7XG4gICAgICAgICAgICB1cGRhdGVQbGF0Zm9ybXMocGxhdGZvcm0sIGdyaWQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuLy8gUmVtb3ZlcyBvbGQgcGxhdGZvcm1zIGFuZCBjcmVhdGVzIG5ldyBwbGF0Zm9ybXMgdGhhdCBhcmUgdGhlbiBwdXNoZWQgdG8gcGxhdGZvcm0gYXJyYXlcblxuZnVuY3Rpb24gdXBkYXRlUGxhdGZvcm1zKHBsYXRmb3JtLCBncmlkKSB7XG4gICAgaWYgKCFnYW1lT3ZlcikgeyBcbiAgICAgICAgaWYgKHBsYXRmb3JtLmJvdHRvbSA8PSAtNTApIHtcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgICAgICAgICBjb25zdCBtb3ZlbWVudFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZW1lbnQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNob290VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG9vdCcpO1xuICAgICAgICAgICAgbGV0IGZpcnN0UGxhdGZvcm0gPSBwbGF0Zm9ybXNbMF0udmlzdWFsO1xuICAgICAgICAgICAgZmlyc3RQbGF0Zm9ybS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCFzb2Z0UGF1c2VkICkge1xuICAgICAgICAgICAgICAgIHNjb3JlICs9IDE7XG4gICAgICAgICAgICAgICAgc2NvcmVUZXh0LmlubmVySFRNTCA9IHNjb3JlO1xuICAgICAgICAgICAgICAgIHRpdGxlVGV4dC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIG1vdmVtZW50VGV4dC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNob290VGV4dC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCA3NTApXG4gICAgICAgICAgICBwbGF0Zm9ybXMucHVzaChuZXdQbGF0Zm9ybSlcblxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtlbmRHYW1lLCBnYW1lUGF1c2VkfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQge3BsYXRmb3Jtc30gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtzbGltZVNvdW5kUGxheX0gZnJvbSBcIi4vc291bmQuanNcIlxuXG5jb25zdCBzbGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbmxldCBpc0dvaW5nTGVmdCAgICAgICAgICAgICA9IGZhbHNlO1xubGV0IGlzR29pbmdSaWdodCAgICAgICAgICAgID0gZmFsc2U7XG5cbmV4cG9ydCBsZXQgaXNKdW1waW5nICAgICAgICA9IGZhbHNlO1xuZXhwb3J0IGxldCBpc0ZhbGxpbmcgICAgICAgID0gdHJ1ZTtcbmV4cG9ydCBsZXQgc2xpbWVMZWZ0U3BhY2UgICA9IDI4MDtcbmV4cG9ydCBsZXQgZ2FtZU92ZXIgICAgICAgICA9IGZhbHNlO1xuZXhwb3J0IGxldCBzdGFydFBvaW50ICAgICAgID0gMjAwO1xuZXhwb3J0IGxldCBzbGltZUJvdHRvbVNwYWNlID0gc3RhcnRQb2ludDtcbmV4cG9ydCBsZXQgbGVmdFRpbWVySWQ7XG5leHBvcnQgbGV0IHJpZ2h0VGltZXJJZDtcbmV4cG9ydCBsZXQgdXBUaW1lcklkO1xuZXhwb3J0IGxldCBkb3duVGltZXJJZDtcblxuLy8gQ3JlYXRlICdTbGltZScgYW5kIGFkZCB0byB0aGUgZ3JpZC5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHNsaW1lKTtcbiAgICBzbGltZS5jbGFzc0xpc3QuYWRkKCdzbGltZScpO1xuICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG59XG5cbi8vIEluIGNoYXJnZSBvZiBhZGRpbmcgdG8gdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgc2xpbWVGYWxsKClcblxuZXhwb3J0IGZ1bmN0aW9uIHNsaW1lSnVtcCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZClcbiAgICAgICAgaXNKdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgaXNGYWxsaW5nID0gZmFsc2U7XG4gICAgICAgIHVwVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVCb3R0b21TcGFjZSArPSAxO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gc3RhcnRQb2ludCArIDEwMCkgc2xpbWVGYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBJbiBjaGFyZ2Ugb2Ygc3VidHJhY3RpbmcgdGhlIHBsYXllcidzIFkgdmFsdWUgYW5kIGNhbGxpbmcgZW5kR2FtZSgpXG5cbmZ1bmN0aW9uIHNsaW1lRmFsbCgpIHtcbiAgICBpZiAoIWdhbWVQYXVzZWQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpXG4gICAgICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgICAgICBpc0ZhbGxpbmcgPSB0cnVlO1xuICAgICAgICBkb3duVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVCb3R0b21TcGFjZSAtPSAyO1xuICAgICAgICAgICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICAgICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlIDw9IC0yMDAgKSBlbmRHYW1lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJykpOyBcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7IGNvbGxpc2lvbkRldGVjdChwbGF0Zm9ybSk7fSApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4vLyBDaGVja3MgdGhlIHZhbHVlIG9mIHRoZSBib3R0b20gb2YgdGhlIHBsYXllciwgaWYgc2FpZCB2YWx1ZSByZXR1cm5zIHRydWUgaXQgY2FsbHMgc2xpbWVKdW1wKClcblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0KHBsYXRmb3JtKSB7XG4gICAgaWYgKChzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSkgJiYgKHNsaW1lQm90dG9tU3BhY2UgPD0gKHBsYXRmb3JtLmJvdHRvbSArIDE5KSkgJiZcbiAgICAoKHNsaW1lTGVmdFNwYWNlICsgNDApID49IHBsYXRmb3JtLmxlZnQpICYmIChzbGltZUxlZnRTcGFjZSA8PSAocGxhdGZvcm0ubGVmdCArIDEwMCkpICYmXG4gICAgIWlzSnVtcGluZykge1xuICAgICAgICBzdGFydFBvaW50ID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgc2xpbWVTb3VuZFBsYXkoKTtcbiAgICAgICAgc2xpbWVKdW1wKCk7XG4gICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgfVxufVxuXG4vLyBDYWxscyBtb3ZlTGVmdCgpIG9yIG1vdmVSaWdodCBkZXBlbmRpbmcgb24gcGxheWVyIGlucHV0LiAqVXNlcyBrZXlkb3duKlxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTW92ZW1lbnRzKGV2ZW50KSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkgbW92ZUxlZnQoKTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleUNvZGUgPT09IDY4KSBtb3ZlUmlnaHQoKTtcbiAgICB9XG59XG5cbi8vIENlYXNlcyBwbGF5ZXIgbW92ZW1lbnQgZGVwZW5kaW5nIG9uIGtleSByZWxlYXNlLiAqVXNlcyBrZXl1cCpcblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BQbGF5ZXJNb3ZlbWVudHMoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjUpIHtcbiAgICAgICAgaXNHb2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5Q29kZSA9PT0gNjgpIHtcbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpO1xuICAgIH1cbn1cblxuLy8gRGVjcmVtZW50cyBwbGF5ZXIncyBYIHZhbHVlXG5cbmZ1bmN0aW9uIG1vdmVMZWZ0KCkge1xuICAgIGlmICghZ2FtZVBhdXNlZCkge1xuICAgICAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcklkKVxuICAgICAgICBpZiAoaXNHb2luZ1JpZ2h0KSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICAgICAgICAgIGlzR29pbmdSaWdodCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaXNHb2luZ0xlZnQgPSB0cnVlXG4gICAgICAgIGxlZnRUaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNsaW1lTGVmdFNwYWNlID49IC02MCkge1xuICAgICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgLT0gMjtcbiAgICAgICAgICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCdcbiAgICAgICAgICAgIH0gZWxzZSBzbGltZUxlZnRTcGFjZSA9IDYwMDtcbiAgICAgICAgfSwgMSlcbiAgICB9XG59XG5cbi8vIEluY3JlbWVudHMgcGxheWVyJ3MgWCB2YWx1ZVxuXG5mdW5jdGlvbiBtb3ZlUmlnaHQoKSB7XG4gICAgaWYgKCFnYW1lUGF1c2VkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcklkKVxuICAgICAgICBpZiAoaXNHb2luZ0xlZnQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgICAgICAgICBpc0dvaW5nTGVmdCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gdHJ1ZVxuICAgICAgICByaWdodFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2xpbWVMZWZ0U3BhY2UgPD0gNjEwKSB7XG4gICAgICAgICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgKz0gMjtcbiAgICAgICAgICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnXG4gICAgICAgICAgICB9IGVsc2Ugc2xpbWVMZWZ0U3BhY2UgPSAtNjA7XG4gICAgICAgIH0sIDEpXG4gICAgfVxufVxuXG4iLCJpbXBvcnQge3NsaW1lTGVmdFNwYWNlLCBzbGltZUJvdHRvbVNwYWNlfSBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcblxuZXhwb3J0IGxldCBidWxsZXRzID0gW107XG5cbmNsYXNzIEJ1bGxldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2U7XG4gICAgICAgIHRoaXMudmlzdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHZpc3VhbCA9IHRoaXMudmlzdWFsO1xuICAgICAgICB2aXN1YWwuY2xhc3NMaXN0LmFkZCgnYnVsbGV0Jyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAxMiArICdweCc7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgMTIgKyAncHgnO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpLmFwcGVuZENoaWxkKHZpc3VhbCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyU2hvb3QoZ3JpZCwgZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgc2hvb3RCdWxsZXQoKTtcbiAgICAgICAgbGV0IG5ld0J1bGxldCA9IG5ldyBCdWxsZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKSwgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgIGJ1bGxldHMucHVzaChuZXdCdWxsZXQpO1xuICAgIH0gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG9vdEJ1bGxldCh4LCB5KSB7XG4gICAgYnVsbGV0cy5mb3JFYWNoKGJ1bGxldCA9PiB7XG4gICAgICAgIGJ1bGxldC5ib3R0b20gKz0gMztcbiAgICAgICAgbGV0IHZpc3VhbCA9IGJ1bGxldC52aXN1YWw7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBidWxsZXQuYm90dG9tICsgJ3B4JztcbiAgICAgICAgaWYgKGJ1bGxldC5ib3R0b20gPj0gNzUwKSB7XG4gICAgICAgICAgICBsZXQgZmlyc3RCdWxsZXQgPSBidWxsZXRzWzBdLnZpc3VhbDtcbiAgICAgICAgICAgIGZpcnN0QnVsbGV0LnJlbW92ZSgpO1xuICAgICAgICAgICAgYnVsbGV0cy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcbn1cbiBcbiIsImxldCBtdXRlZCA9IHRydWU7XG5sZXQgc29uZ1J1bm5pbmcgPSBmYWxzZTtcblxuLy8gY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudVwiKVxuLy8gY29uc29sZS5sb2cobWVudSlcbi8vIGNvbnN0IG1lbnVMaXN0ID0gbWVudS5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtbGlzdFwiKVxuXG5cbi8vIEltcG9ydGluZyBiYWNrZ3JvdW5kIG11c2ljXG5cbmxldCBiYWNrZ3JvdW5kTXVzaWNPbmUgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9BIExvbmVseSBDaGVycnkgVHJlZSDwn4y4Lm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNUd28gICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9IZWxsbywgaXQncyBNZSEubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1RocmVlID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL01lbGFuY2hvbGljIFdhbGsubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY0ZvdXIgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL05vIERlc3RpbmF0aW9uLm1wM1wiKTtcbmxldCBiYWNrZ3JvdW5kTXVzaWNGaXZlICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvYmFja2dyb3VuZF9tdXNpYy9SZWFkeSBQaXhlbCBPbmUubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1NpeCAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1J1biBBcyBGYXN0IEFzIFlvdSBDYW4ubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY1NldmVuID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1RoZSBzZWFyY2gubXAzXCIpO1xubGV0IGJhY2tncm91bmRNdXNpY0VpZ2h0ID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9iYWNrZ3JvdW5kX211c2ljL1dlbGNvbWUgU3BhY2UgVHJhdmVsZXIubXAzXCIpO1xuXG5sZXQgYmFja2dyb3VuZE11c2ljID0gW2JhY2tncm91bmRNdXNpY09uZSwgYmFja2dyb3VuZE11c2ljVHdvLCBiYWNrZ3JvdW5kTXVzaWNUaHJlZSwgYmFja2dyb3VuZE11c2ljRm91cixcbiAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZE11c2ljRml2ZSwgYmFja2dyb3VuZE11c2ljU2l4LCBiYWNrZ3JvdW5kTXVzaWNTZXZlbiwgYmFja2dyb3VuZE11c2ljRWlnaHRdO1xuXG4vLyBJbXBvcnRpbmcgc2xpbWUgc291bmRzXG5sZXQgc2xpbWVTb3VuZE9uZSAgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzAubXAzXCIpO1xubGV0IHNsaW1lU291bmRUd28gICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8xLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kVGhyZWUgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMi5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZEZvdXIgICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzMubXAzXCIpO1xubGV0IHNsaW1lU291bmRGaXZlICAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8wLm1wM1wiKTtcbmxldCBzbGltZVNvdW5kU2l4ICAgID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMS5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFNldmVuICA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzIubXAzXCIpO1xubGV0IHNsaW1lU291bmRFaWdodCAgPSBuZXcgQXVkaW8oXCIuLi9zcmMvc291bmRzL3NsaW1lX3NvdW5kcy9zbGltZV9zb3VuZF8zLm1wM1wiKTtcblxuLy8gQWRqdXN0aW5nIHNsaW1lIHNvdW5kIHZvbHVtZXNcbmxldCBzbGltZVZvbHVtZSA9IDAuMDU7XG5zbGltZVNvdW5kT25lLnZvbHVtZSAgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFR3by52b2x1bWUgICAgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRUaHJlZS52b2x1bWUgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kRm91ci52b2x1bWUgICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZEZpdmUudm9sdW1lICAgPSBzbGltZVZvbHVtZTtcbnNsaW1lU291bmRTaXgudm9sdW1lICAgID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kU2V2ZW4udm9sdW1lICA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZEVpZ2h0LnZvbHVtZSAgPSBzbGltZVZvbHVtZTtcblxuLy8gUHVzaGluZyBzbGltZSBzb3VuZHMgaW50byBhbiBhcnJheVxubGV0IHNsaW1lU291bmRzID0gW3NsaW1lU291bmRPbmUsIHNsaW1lU291bmRUd28sIHNsaW1lU291bmRUaHJlZSwgc2xpbWVTb3VuZEZvdXIsIHNsaW1lU291bmRGb3VyLFxuICAgIHNsaW1lU291bmRGaXZlLCBzbGltZVNvdW5kU2l4LCBzbGltZVNvdW5kU2V2ZW4sIHNsaW1lU291bmRFaWdodF07XG5cbi8vIGxldCBiYWNrZ3JvdW5kTXVzaWNWb2x1bWUgPSAxO1xuXG4vLyBiYWNrZ3JvdW5kTXVzaWNPbmUudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNUd28gLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNUaHJlZS52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNGb3VyLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNGaXZlLnZvbHVtZSAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNTaXgudm9sdW1lICAgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNTZXZlbi52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG4vLyBiYWNrZ3JvdW5kTXVzaWNFaWdodC52b2x1bWUgPSBiYWNrZ3JvdW5kTXVzaWNWb2x1bWU7XG5cblxuXG4vLyBSZXR1cm5pbmcgcmFuZG9tIHNsaW1lIHNvdW5kIHdoZW4gY2FsbGVkXG5cbmZ1bmN0aW9uIHNhbXBsZShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yICggTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCApXVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVzaWNcIik7XG5cbnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgY3VycmVudFNvbmcgPSBzYW1wbGUoYmFja2dyb3VuZE11c2ljKVxuICAgIGJhY2tncm91bmRNdXNpY1BsYXkoY3VycmVudFNvbmcpXG4gICAgY3VycmVudFNvbmcudm9sdW1lID0gdGhpcy52YWx1ZSAvIDEwMDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnZhbHVlIC8gMTAwKVxuICAgIH0pXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpbWVTb3VuZFBsYXkoKSB7XG4gICAgaWYgKCFtdXRlZCkgc2FtcGxlKHNsaW1lU291bmRzKS5wbGF5KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrZ3JvdW5kTXVzaWNQbGF5KGN1cnJlbnRTb25nKSB7XG4gICAgaWYgKCFzb25nUnVubmluZykge1xuICAgICAgICBzb25nUnVubmluZyA9IHRydWU7XG4gICAgICAgIGlmICghbXV0ZWQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTb25nLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7c3RhcnQsIHBhdXNlR2FtZX0gZnJvbSBcIi4vc2NyaXB0cy9nYW1lLmpzXCJcblxuY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgc3RhcnQoZ3JpZCk7XG4gICAgcGF1c2VHYW1lKCk7XG59KVxuIl0sIm5hbWVzIjpbImNyZWF0ZVBsYXllciIsInNsaW1lSnVtcCIsInBsYXllck1vdmVtZW50cyIsInN0b3BQbGF5ZXJNb3ZlbWVudHMiLCJ1cFRpbWVySWQiLCJkb3duVGltZXJJZCIsImxlZnRUaW1lcklkIiwicmlnaHRUaW1lcklkIiwiY3JlYXRlUGxhdGZvcm1zIiwibW92ZVBsYXRmb3JtcyIsInNjb3JlIiwicGxheWVyU2hvb3QiLCJzaG9vdEJ1bGxldCIsImdhbWVPdmVyIiwiZ2FtZVBhdXNlZCIsInNvZnRQYXVzZWQiLCJzdGFydCIsImdyaWQiLCJzZXRJbnRlcnZhbCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiLCJwbGF5ZXJQYXVzZUdhbWUiLCJyZXN0YXJ0IiwiZXZlbnQiLCJtZW51IiwicXVlcnlTZWxlY3RvciIsImtleUNvZGUiLCJzdHlsZSIsImRpc3BsYXkiLCJwYXVzZUdhbWUiLCJlbmRHYW1lIiwiaHRtbFBsYXRmb3JtcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGVhckludGVydmFsIiwiZW5kaW5nT25lVGV4dCIsImVuZGluZ1R3b1RleHQiLCJlbmRpbmdUaHJlZVRleHQiLCJvZ1Njb3JlIiwiaW5uZXJIVE1MIiwibG9jYXRpb24iLCJyZWxvYWQiLCJpc0p1bXBpbmciLCJpc0ZhbGxpbmciLCJwbGF0Zm9ybUNvdW50IiwicGxhdGZvcm1zIiwiUGxhdGZvcm0iLCJuZXdQbGF0Qm90dG9tIiwiYm90dG9tIiwibGVmdCIsIk1hdGgiLCJyYW5kb20iLCJ2aXN1YWwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJpIiwicGxhdGZvcm1HYXAiLCJuZXdQbGF0Zm9ybSIsInB1c2giLCJmb3JFYWNoIiwicGxhdGZvcm0iLCJ1cGRhdGVQbGF0Zm9ybXMiLCJzY29yZVRleHQiLCJ0aXRsZVRleHQiLCJtb3ZlbWVudFRleHQiLCJzaG9vdFRleHQiLCJmaXJzdFBsYXRmb3JtIiwicmVtb3ZlIiwic2hpZnQiLCJzbGltZVNvdW5kUGxheSIsInNsaW1lIiwiaXNHb2luZ0xlZnQiLCJpc0dvaW5nUmlnaHQiLCJzbGltZUxlZnRTcGFjZSIsInN0YXJ0UG9pbnQiLCJzbGltZUJvdHRvbVNwYWNlIiwic2xpbWVGYWxsIiwiY29sbGlzaW9uRGV0ZWN0IiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJidWxsZXRzIiwiQnVsbGV0IiwibmV3QnVsbGV0IiwiY2xpZW50WCIsImNsaWVudFkiLCJ4IiwieSIsImJ1bGxldCIsImZpcnN0QnVsbGV0IiwibXV0ZWQiLCJzb25nUnVubmluZyIsImJhY2tncm91bmRNdXNpY09uZSIsIkF1ZGlvIiwiYmFja2dyb3VuZE11c2ljVHdvIiwiYmFja2dyb3VuZE11c2ljVGhyZWUiLCJiYWNrZ3JvdW5kTXVzaWNGb3VyIiwiYmFja2dyb3VuZE11c2ljRml2ZSIsImJhY2tncm91bmRNdXNpY1NpeCIsImJhY2tncm91bmRNdXNpY1NldmVuIiwiYmFja2dyb3VuZE11c2ljRWlnaHQiLCJiYWNrZ3JvdW5kTXVzaWMiLCJzbGltZVNvdW5kT25lIiwic2xpbWVTb3VuZFR3byIsInNsaW1lU291bmRUaHJlZSIsInNsaW1lU291bmRGb3VyIiwic2xpbWVTb3VuZEZpdmUiLCJzbGltZVNvdW5kU2l4Iiwic2xpbWVTb3VuZFNldmVuIiwic2xpbWVTb3VuZEVpZ2h0Iiwic2xpbWVWb2x1bWUiLCJ2b2x1bWUiLCJzbGltZVNvdW5kcyIsInNhbXBsZSIsImFycmF5IiwiZmxvb3IiLCJsZW5ndGgiLCJzbGlkZXIiLCJnZXRFbGVtZW50QnlJZCIsImN1cnJlbnRTb25nIiwiYmFja2dyb3VuZE11c2ljUGxheSIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsInBsYXkiXSwic291cmNlUm9vdCI6IiJ9