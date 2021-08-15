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
/* harmony export */   "platforms": function() { return /* binding */ platforms; },
/* harmony export */   "createPlatforms": function() { return /* binding */ createPlatforms; },
/* harmony export */   "movePlatforms": function() { return /* binding */ movePlatforms; }
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/scripts/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var platformCount = 5;
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
  // if (slimeBottomSpace > 200) {
  platforms.forEach(function (platform) {
    platform.bottom -= 4;
    var visual = platform.visual;
    visual.style.bottom = platform.bottom + 'px';

    if (platform.bottom < 10) {
      var firstPlatform = platforms[0].visual;
      firstPlatform.classList.remove('platform');
      platforms.shift();
      var newPlatform = new Platform(grid, 600);
      platforms.push(newPlatform);
    }
  }); // }
}

/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startPoint": function() { return /* binding */ startPoint; },
/* harmony export */   "isPlayerDead": function() { return /* binding */ isPlayerDead; },
/* harmony export */   "upTimerId": function() { return /* binding */ upTimerId; },
/* harmony export */   "downTimerId": function() { return /* binding */ downTimerId; },
/* harmony export */   "slimeBottomSpace": function() { return /* binding */ slimeBottomSpace; },
/* harmony export */   "createPlayer": function() { return /* binding */ createPlayer; },
/* harmony export */   "slimeJump": function() { return /* binding */ slimeJump; },
/* harmony export */   "playerMovements": function() { return /* binding */ playerMovements; },
/* harmony export */   "stopPlayerMovements": function() { return /* binding */ stopPlayerMovements; }
/* harmony export */ });
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform.js */ "./src/scripts/platform.js");
/* harmony import */ var _sound_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sound.js */ "./src/scripts/sound.js");
// Add score system.
// Add starting platform.
// Add WASD controls.
// Add flying enemies.
// Add shooting feature.
// Potentially have background that scales with player Y.


var slime = document.createElement('div');
var slimeLeftSpace = 50;
var isGameOver = false;
var isJumping = false;
var isGoingLeft = false;
var isGoingRight = false;
var leftTimerId;
var rightTimerId;
var score = 0;
var startPoint = 150;
var isPlayerDead = false;
var upTimerId;
var downTimerId;
var slimeBottomSpace = startPoint;
function createPlayer(grid) {
  grid.appendChild(slime);
  slime.classList.add('slime'); // slimeLeftSpace = startingPlatform[0].left;

  slime.style.left = slimeLeftSpace + 'px';
  slime.style.bottom = slimeBottomSpace + 'px';
}
function slimeJump() {
  clearInterval(downTimerId);
  isJumping = true;
  upTimerId = setInterval(function () {
    slimeBottomSpace += 3;
    slime.style.bottom = slimeBottomSpace + 'px';

    if (slimeBottomSpace > startPoint + 175) {
      slimeFall();
    }
  }, 1);
}

function slimeFall() {
  clearInterval(upTimerId);
  isJumping = false;
  downTimerId = setInterval(function () {
    slimeBottomSpace -= 2;
    slime.style.bottom = slimeBottomSpace + 'px';

    if (slimeBottomSpace <= 0) {
      isPlayerDead = true;
      gameOver();
    }

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
  if (event.key === "ArrowLeft") {
    moveLeft();
  } else if (event.key === "ArrowRight") {
    moveRight();
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

function gameOver() {
  isGameOver = true;

  while (window.firstChild) {
    window.removeChild(window.firstChild);
  }

  clearInterval(upTimerId);
  clearInterval(downTimerId);
}

/***/ }),

/***/ "./src/scripts/sound.js":
/*!******************************!*\
  !*** ./src/scripts/sound.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slimeSoundPlay": function() { return /* binding */ slimeSoundPlay; }
/* harmony export */ });
// Importing slime sounds
var slimeSoundOne = new Audio("../src/sounds/slime_sounds/slime_sound_0.mp3");
var slimeSoundTwo = new Audio("../src/sounds/slime_sounds/slime_sound_1.mp3");
var slimeSoundThree = new Audio("../src/sounds/slime_sounds/slime_sound_2.mp3");
var slimeSoundFour = new Audio("../src/sounds/slime_sounds/slime_sound_3.mp3"); // Adjusting slime sound volumes

var slimeVolume = 0.1;
slimeSoundOne.volume = slimeVolume;
slimeSoundTwo.volume = slimeVolume;
slimeSoundThree.volume = slimeVolume;
slimeSoundFour.volume = slimeVolume; // Pushing slime sounds into an array

var slimeSounds = [slimeSoundOne, slimeSoundTwo, slimeSoundThree, slimeSoundFour]; // Returning random slime sound when called

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function slimeSoundPlay() {
  sample(slimeSounds).play();
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


var isGameOver = false;
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.querySelector('.grid');
  var slime = (0,_scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(grid);

  function start() {
    if (!isGameOver) {
      (0,_scripts_platform_js__WEBPACK_IMPORTED_MODULE_1__.createPlatforms)(grid);
      (0,_scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(grid);
      setInterval(_scripts_platform_js__WEBPACK_IMPORTED_MODULE_1__.movePlatforms.bind(this, grid), 30);
      (0,_scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.slimeJump)();
      document.addEventListener('keydown', _scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.playerMovements);
      document.addEventListener('keyup', _scripts_player_js__WEBPACK_IMPORTED_MODULE_0__.stopPlayerMovements);
    }
  }

  start();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWhCRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxhdGZvcm0uanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9zY3JpcHRzL3NvdW5kLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3NsaW1lQm90dG9tU3BhY2V9IGZyb20gXCIuL3BsYXllci5qc1wiO1xuXG5sZXQgcGxhdGZvcm1Db3VudCA9IDU7XG5cbmV4cG9ydCBsZXQgcGxhdGZvcm1zID0gW107XG5cbmNsYXNzIFBsYXRmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gbmV3UGxhdEJvdHRvbTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gTWF0aC5yYW5kb20oKSAqIDUwMDtcbiAgICAgICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ3BsYXRmb3JtJyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gdGhpcy5sZWZ0ICsgJ3B4JztcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICAgICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXRmb3JtcyhncmlkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0Zm9ybUNvdW50OyBpKyspIHtcbiAgICAgICAgbGV0IHBsYXRmb3JtR2FwID0gNjAwIC8gcGxhdGZvcm1Db3VudDtcbiAgICAgICAgbGV0IG5ld1BsYXRCb3R0b20gPSAxMDAgKyBpICogcGxhdGZvcm1HYXA7XG4gICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCBuZXdQbGF0Qm90dG9tKTtcbiAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVQbGF0Zm9ybXMoZ3JpZCkge1xuICAgIC8vIGlmIChzbGltZUJvdHRvbVNwYWNlID4gMjAwKSB7XG4gICAgICAgIHBsYXRmb3Jtcy5mb3JFYWNoKHBsYXRmb3JtID0+IHtcbiAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSA0O1xuICAgICAgICAgICAgbGV0IHZpc3VhbCA9IHBsYXRmb3JtLnZpc3VhbDtcbiAgICAgICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuXG4gICAgICAgICAgICBpZiAocGxhdGZvcm0uYm90dG9tIDwgMTApIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RQbGF0Zm9ybSA9IHBsYXRmb3Jtc1swXS52aXN1YWw7XG4gICAgICAgICAgICAgICAgZmlyc3RQbGF0Zm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF0Zm9ybScpO1xuICAgICAgICAgICAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCA2MDApXG4gICAgICAgICAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgLy8gfVxufVxuXG4iLCIvLyBBZGQgc2NvcmUgc3lzdGVtLlxuLy8gQWRkIHN0YXJ0aW5nIHBsYXRmb3JtLlxuLy8gQWRkIFdBU0QgY29udHJvbHMuXG4vLyBBZGQgZmx5aW5nIGVuZW1pZXMuXG4vLyBBZGQgc2hvb3RpbmcgZmVhdHVyZS5cbi8vIFBvdGVudGlhbGx5IGhhdmUgYmFja2dyb3VuZCB0aGF0IHNjYWxlcyB3aXRoIHBsYXllciBZLlxuXG5pbXBvcnQge3BsYXRmb3Jtc30gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuaW1wb3J0IHtzbGltZVNvdW5kUGxheX0gZnJvbSBcIi4vc291bmQuanNcIlxuXG5jb25zdCBzbGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbmxldCBzbGltZUxlZnRTcGFjZSA9IDUwO1xubGV0IGlzR2FtZU92ZXIgPSBmYWxzZTtcbmxldCBpc0p1bXBpbmcgPSBmYWxzZTtcbmxldCBpc0dvaW5nTGVmdCA9IGZhbHNlO1xubGV0IGlzR29pbmdSaWdodCA9IGZhbHNlO1xubGV0IGxlZnRUaW1lcklkO1xubGV0IHJpZ2h0VGltZXJJZDtcbmxldCBzY29yZSA9IDA7XG5cbmV4cG9ydCBsZXQgc3RhcnRQb2ludCA9IDE1MDtcbmV4cG9ydCBsZXQgaXNQbGF5ZXJEZWFkID0gZmFsc2U7XG5leHBvcnQgbGV0IHVwVGltZXJJZDtcbmV4cG9ydCBsZXQgZG93blRpbWVySWQ7XG5leHBvcnQgbGV0IHNsaW1lQm90dG9tU3BhY2UgPSBzdGFydFBvaW50O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKGdyaWQpIHtcbiAgICBncmlkLmFwcGVuZENoaWxkKHNsaW1lKTtcbiAgICBzbGltZS5jbGFzc0xpc3QuYWRkKCdzbGltZScpO1xuICAgIC8vIHNsaW1lTGVmdFNwYWNlID0gc3RhcnRpbmdQbGF0Zm9ybVswXS5sZWZ0O1xuICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGltZUp1bXAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZClcbiAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgIHVwVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzbGltZUJvdHRvbVNwYWNlICs9IDM7XG4gICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICBpZiAoc2xpbWVCb3R0b21TcGFjZSA+IHN0YXJ0UG9pbnQgKyAxNzUpIHtcbiAgICAgICAgICAgIHNsaW1lRmFsbCgpO1xuICAgICAgICB9XG4gICAgfSwgMSlcbn1cblxuZnVuY3Rpb24gc2xpbWVGYWxsKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKVxuICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgIGRvd25UaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNsaW1lQm90dG9tU3BhY2UgLT0gMjtcbiAgICAgICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG4gICAgICAgIGlmIChzbGltZUJvdHRvbVNwYWNlIDw9IDAgKSB7XG4gICAgICAgICAgICBpc1BsYXllckRlYWQgPSB0cnVlO1xuICAgICAgICAgICAgZ2FtZU92ZXIoKVxuICAgICAgICB9XG5cbiAgICAgICAgcGxhdGZvcm1zLmZvckVhY2gocGxhdGZvcm0gPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoc2xpbWVCb3R0b21TcGFjZSA+PSBwbGF0Zm9ybS5ib3R0b20pICYmXG4gICAgICAgICAgICAgIChzbGltZUJvdHRvbVNwYWNlIDw9IChwbGF0Zm9ybS5ib3R0b20gKyAxNSkpICYmXG4gICAgICAgICAgICAgICgoc2xpbWVMZWZ0U3BhY2UgKyA2MCkgPj0gcGxhdGZvcm0ubGVmdCkgJiYgXG4gICAgICAgICAgICAgIChzbGltZUxlZnRTcGFjZSA8PSAocGxhdGZvcm0ubGVmdCArIDg1KSkgJiZcbiAgICAgICAgICAgICAgIWlzSnVtcGluZ1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzdGFydFBvaW50ID0gc2xpbWVCb3R0b21TcGFjZTtcbiAgICAgICAgICAgICAgICBzbGltZVNvdW5kUGxheSgpO1xuICAgICAgICAgICAgICAgIHNsaW1lSnVtcCgpO1xuICAgICAgICAgICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuXG4gICAgfSwgMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgICAgbW92ZUxlZnQoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgbW92ZVJpZ2h0KCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkge1xuICAgICAgICBpc0dvaW5nTGVmdCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkge1xuICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVMZWZ0KCkge1xuICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICB9XG4gICAgaXNHb2luZ0xlZnQgPSB0cnVlXG4gICAgbGVmdFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAwKSB7XG4gICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgLT0gMjtcbiAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgPSA1NDU7XG4gICAgICAgIH1cbiAgICB9LCAxKVxufVxuXG5mdW5jdGlvbiBtb3ZlUmlnaHQoKSB7XG4gICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgaWYgKGlzR29pbmdMZWZ0KSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICB9XG4gICAgaXNHb2luZ1JpZ2h0ID0gdHJ1ZVxuICAgIHJpZ2h0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA8PSA1NjApIHtcbiAgICAgICAgc2xpbWVMZWZ0U3BhY2UgKz0gMjtcbiAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpbWVMZWZ0U3BhY2UgPSAtNDtcbiAgICB9XG4gICAgfSwgMSlcbn1cblxuZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG4gICAgaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgd2hpbGUgKHdpbmRvdy5maXJzdENoaWxkKSB7IHdpbmRvdy5yZW1vdmVDaGlsZCh3aW5kb3cuZmlyc3RDaGlsZCkgfVxuICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKTtcbiAgICBjbGVhckludGVydmFsKGRvd25UaW1lcklkKTtcbn0iLCJcbi8vIEltcG9ydGluZyBzbGltZSBzb3VuZHNcbmxldCBzbGltZVNvdW5kT25lID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMC5tcDNcIik7XG5sZXQgc2xpbWVTb3VuZFR3byA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzEubXAzXCIpO1xubGV0IHNsaW1lU291bmRUaHJlZSA9IG5ldyBBdWRpbyhcIi4uL3NyYy9zb3VuZHMvc2xpbWVfc291bmRzL3NsaW1lX3NvdW5kXzIubXAzXCIpO1xubGV0IHNsaW1lU291bmRGb3VyID0gbmV3IEF1ZGlvKFwiLi4vc3JjL3NvdW5kcy9zbGltZV9zb3VuZHMvc2xpbWVfc291bmRfMy5tcDNcIik7XG5cbi8vIEFkanVzdGluZyBzbGltZSBzb3VuZCB2b2x1bWVzXG5cbmxldCBzbGltZVZvbHVtZSA9IDAuMTtcbnNsaW1lU291bmRPbmUudm9sdW1lID0gc2xpbWVWb2x1bWU7XG5zbGltZVNvdW5kVHdvLnZvbHVtZSA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZFRocmVlLnZvbHVtZSA9IHNsaW1lVm9sdW1lO1xuc2xpbWVTb3VuZEZvdXIudm9sdW1lID0gc2xpbWVWb2x1bWU7XG5cbi8vIFB1c2hpbmcgc2xpbWUgc291bmRzIGludG8gYW4gYXJyYXlcblxubGV0IHNsaW1lU291bmRzID0gW3NsaW1lU291bmRPbmUsIHNsaW1lU291bmRUd28sIHNsaW1lU291bmRUaHJlZSwgc2xpbWVTb3VuZEZvdXJdO1xuXG4vLyBSZXR1cm5pbmcgcmFuZG9tIHNsaW1lIHNvdW5kIHdoZW4gY2FsbGVkXG5cbmZ1bmN0aW9uIHNhbXBsZShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yICggTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCApXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpbWVTb3VuZFBsYXkoKSB7XG4gICAgc2FtcGxlKHNsaW1lU291bmRzKS5wbGF5KCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2NyZWF0ZVBsYXllciwgc2xpbWVKdW1wLCBwbGF5ZXJNb3ZlbWVudHMsIHN0b3BQbGF5ZXJNb3ZlbWVudHMsIHN0YXJ0UG9pbnR9IGZyb20gXCIuL3NjcmlwdHMvcGxheWVyLmpzXCJcbmltcG9ydCB7Y3JlYXRlUGxhdGZvcm1zLCBtb3ZlUGxhdGZvcm1zfSBmcm9tIFwiLi9zY3JpcHRzL3BsYXRmb3JtLmpzXCJcblxubGV0IGlzR2FtZU92ZXIgPSBmYWxzZTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbiAgICBjb25zdCBzbGltZSA9IGNyZWF0ZVBsYXllcihncmlkKTtcblxuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIGNyZWF0ZVBsYXRmb3JtcyhncmlkKTtcbiAgICAgICAgICAgIGNyZWF0ZVBsYXllcihncmlkKTtcbiAgICAgICAgICAgIHNldEludGVydmFsKG1vdmVQbGF0Zm9ybXMuYmluZCh0aGlzLCBncmlkKSwgMzApO1xuICAgICAgICAgICAgc2xpbWVKdW1wKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcGxheWVyTW92ZW1lbnRzKVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzdG9wUGxheWVyTW92ZW1lbnRzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKTtcbn0pXG5cbiJdLCJuYW1lcyI6WyJzbGltZUJvdHRvbVNwYWNlIiwicGxhdGZvcm1Db3VudCIsInBsYXRmb3JtcyIsIlBsYXRmb3JtIiwiZ3JpZCIsIm5ld1BsYXRCb3R0b20iLCJib3R0b20iLCJsZWZ0IiwiTWF0aCIsInJhbmRvbSIsInZpc3VhbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVQbGF0Zm9ybXMiLCJpIiwicGxhdGZvcm1HYXAiLCJuZXdQbGF0Zm9ybSIsInB1c2giLCJtb3ZlUGxhdGZvcm1zIiwiZm9yRWFjaCIsInBsYXRmb3JtIiwiZmlyc3RQbGF0Zm9ybSIsInJlbW92ZSIsInNoaWZ0Iiwic2xpbWVTb3VuZFBsYXkiLCJzbGltZSIsInNsaW1lTGVmdFNwYWNlIiwiaXNHYW1lT3ZlciIsImlzSnVtcGluZyIsImlzR29pbmdMZWZ0IiwiaXNHb2luZ1JpZ2h0IiwibGVmdFRpbWVySWQiLCJyaWdodFRpbWVySWQiLCJzY29yZSIsInN0YXJ0UG9pbnQiLCJpc1BsYXllckRlYWQiLCJ1cFRpbWVySWQiLCJkb3duVGltZXJJZCIsImNyZWF0ZVBsYXllciIsInNsaW1lSnVtcCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInNsaW1lRmFsbCIsImdhbWVPdmVyIiwicGxheWVyTW92ZW1lbnRzIiwiZXZlbnQiLCJrZXkiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsInN0b3BQbGF5ZXJNb3ZlbWVudHMiLCJrZXlDb2RlIiwid2luZG93IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwic2xpbWVTb3VuZE9uZSIsIkF1ZGlvIiwic2xpbWVTb3VuZFR3byIsInNsaW1lU291bmRUaHJlZSIsInNsaW1lU291bmRGb3VyIiwic2xpbWVWb2x1bWUiLCJ2b2x1bWUiLCJzbGltZVNvdW5kcyIsInNhbXBsZSIsImFycmF5IiwiZmxvb3IiLCJsZW5ndGgiLCJwbGF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJzdGFydCIsImJpbmQiXSwic291cmNlUm9vdCI6IiJ9