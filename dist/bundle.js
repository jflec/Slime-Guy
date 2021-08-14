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
  this.left = Math.random() * 315;
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
  if (_player_js__WEBPACK_IMPORTED_MODULE_0__.slimeBottomSpace > 200) {
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
// Add score system.
// Add starting platform.

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
    slimeBottomSpace += 2;
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
    slimeBottomSpace -= 1.5;
    slime.style.bottom = slimeBottomSpace + 'px';

    if (slimeBottomSpace <= 0) {
      isPlayerDead = true;
      gameOver();
    }

    _platform_js__WEBPACK_IMPORTED_MODULE_0__.platforms.forEach(function (platform) {
      if (slimeBottomSpace >= platform.bottom && slimeBottomSpace <= platform.bottom + 15 && slimeLeftSpace + 60 >= platform.left && slimeLeftSpace <= platform.left + 85 && !isJumping) {
        startPoint = slimeBottomSpace;
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
    if (slimeLeftSpace <= 538.5) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxFQUFqQyxDQUFYO0FBQ0FzQyxNQUFBQSw2REFBUztBQUNUL0IsTUFBQUEsUUFBUSxDQUFDOEMsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUNWLCtEQUFyQztBQUNBcEMsTUFBQUEsUUFBUSxDQUFDOEMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUNMLG1FQUFuQztBQUNIO0FBQ0o7O0FBRURPLEVBQUFBLEtBQUs7QUFDUixDQWhCRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxhdGZvcm0uanMiLCJ3ZWJwYWNrOi8vc2xpbWVfZ3V5Ly4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbGltZV9ndXkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NsaW1lX2d1eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NsaW1lX2d1eS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3NsaW1lQm90dG9tU3BhY2V9IGZyb20gXCIuL3BsYXllci5qc1wiO1xuXG5sZXQgcGxhdGZvcm1Db3VudCA9IDU7XG5cbmV4cG9ydCBsZXQgcGxhdGZvcm1zID0gW107XG5cbmNsYXNzIFBsYXRmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihncmlkLCBuZXdQbGF0Qm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tID0gbmV3UGxhdEJvdHRvbTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gTWF0aC5yYW5kb20oKSAqIDMxNTtcbiAgICAgICAgdGhpcy52aXN1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBjb25zdCB2aXN1YWwgPSB0aGlzLnZpc3VhbDtcbiAgICAgICAgdmlzdWFsLmNsYXNzTGlzdC5hZGQoJ3BsYXRmb3JtJyk7XG4gICAgICAgIHZpc3VhbC5zdHlsZS5sZWZ0ID0gdGhpcy5sZWZ0ICsgJ3B4JztcbiAgICAgICAgdmlzdWFsLnN0eWxlLmJvdHRvbSA9IHRoaXMuYm90dG9tICsgJ3B4JztcbiAgICAgICAgZ3JpZC5hcHBlbmRDaGlsZCh2aXN1YWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXRmb3JtcyhncmlkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF0Zm9ybUNvdW50OyBpKyspIHtcbiAgICAgICAgbGV0IHBsYXRmb3JtR2FwID0gNjAwIC8gcGxhdGZvcm1Db3VudDtcbiAgICAgICAgbGV0IG5ld1BsYXRCb3R0b20gPSAxMDAgKyBpICogcGxhdGZvcm1HYXA7XG4gICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCBuZXdQbGF0Qm90dG9tKTtcbiAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVQbGF0Zm9ybXMoZ3JpZCkge1xuICAgIGlmIChzbGltZUJvdHRvbVNwYWNlID4gMjAwKSB7XG4gICAgICAgIHBsYXRmb3Jtcy5mb3JFYWNoKHBsYXRmb3JtID0+IHtcbiAgICAgICAgICAgIHBsYXRmb3JtLmJvdHRvbSAtPSA0O1xuICAgICAgICAgICAgbGV0IHZpc3VhbCA9IHBsYXRmb3JtLnZpc3VhbDtcbiAgICAgICAgICAgIHZpc3VhbC5zdHlsZS5ib3R0b20gPSBwbGF0Zm9ybS5ib3R0b20gKyAncHgnO1xuXG4gICAgICAgICAgICBpZiAocGxhdGZvcm0uYm90dG9tIDwgMTApIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RQbGF0Zm9ybSA9IHBsYXRmb3Jtc1swXS52aXN1YWw7XG4gICAgICAgICAgICAgICAgZmlyc3RQbGF0Zm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF0Zm9ybScpO1xuICAgICAgICAgICAgICAgIHBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybShncmlkLCA2MDApXG4gICAgICAgICAgICAgICAgcGxhdGZvcm1zLnB1c2gobmV3UGxhdGZvcm0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG4iLCIvLyBBZGQgc2NvcmUgc3lzdGVtLlxuLy8gQWRkIHN0YXJ0aW5nIHBsYXRmb3JtLlxuXG5pbXBvcnQge3BsYXRmb3Jtc30gZnJvbSBcIi4vcGxhdGZvcm0uanNcIlxuXG5jb25zdCBzbGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbmxldCBzbGltZUxlZnRTcGFjZSA9IDUwO1xubGV0IGlzR2FtZU92ZXIgPSBmYWxzZTtcbmxldCBpc0p1bXBpbmcgPSBmYWxzZTtcbmxldCBpc0dvaW5nTGVmdCA9IGZhbHNlO1xubGV0IGlzR29pbmdSaWdodCA9IGZhbHNlO1xubGV0IGxlZnRUaW1lcklkO1xubGV0IHJpZ2h0VGltZXJJZDtcbmxldCBzY29yZSA9IDA7XG5cbmV4cG9ydCBsZXQgc3RhcnRQb2ludCA9IDE1MDtcbmV4cG9ydCBsZXQgaXNQbGF5ZXJEZWFkID0gZmFsc2U7XG5leHBvcnQgbGV0IHVwVGltZXJJZDtcbmV4cG9ydCBsZXQgZG93blRpbWVySWQ7XG5leHBvcnQgbGV0IHNsaW1lQm90dG9tU3BhY2UgPSBzdGFydFBvaW50O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWVyKGdyaWQpIHtcbiAgICBncmlkLmFwcGVuZENoaWxkKHNsaW1lKTtcbiAgICBzbGltZS5jbGFzc0xpc3QuYWRkKCdzbGltZScpO1xuICAgIC8vIHNsaW1lTGVmdFNwYWNlID0gc3RhcnRpbmdQbGF0Zm9ybVswXS5sZWZ0O1xuICAgIHNsaW1lLnN0eWxlLmxlZnQgPSBzbGltZUxlZnRTcGFjZSArICdweCc7XG4gICAgc2xpbWUuc3R5bGUuYm90dG9tID0gc2xpbWVCb3R0b21TcGFjZSArICdweCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGltZUp1bXAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbChkb3duVGltZXJJZClcbiAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICAgIHVwVGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzbGltZUJvdHRvbVNwYWNlICs9IDI7XG4gICAgICAgIHNsaW1lLnN0eWxlLmJvdHRvbSA9IHNsaW1lQm90dG9tU3BhY2UgKyAncHgnO1xuICAgICAgICBpZiAoc2xpbWVCb3R0b21TcGFjZSA+IHN0YXJ0UG9pbnQgKyAxNzUpIHtcbiAgICAgICAgICAgIHNsaW1lRmFsbCgpO1xuICAgICAgICB9XG4gICAgfSwgMSlcbn1cblxuZnVuY3Rpb24gc2xpbWVGYWxsKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodXBUaW1lcklkKVxuICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgIGRvd25UaW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNsaW1lQm90dG9tU3BhY2UgLT0gMS41O1xuICAgICAgICBzbGltZS5zdHlsZS5ib3R0b20gPSBzbGltZUJvdHRvbVNwYWNlICsgJ3B4JztcbiAgICAgICAgaWYgKHNsaW1lQm90dG9tU3BhY2UgPD0gMCApIHtcbiAgICAgICAgICAgIGlzUGxheWVyRGVhZCA9IHRydWU7XG4gICAgICAgICAgICBnYW1lT3ZlcigpXG4gICAgICAgIH1cblxuICAgICAgICBwbGF0Zm9ybXMuZm9yRWFjaChwbGF0Zm9ybSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChzbGltZUJvdHRvbVNwYWNlID49IHBsYXRmb3JtLmJvdHRvbSkgJiZcbiAgICAgICAgICAgICAgKHNsaW1lQm90dG9tU3BhY2UgPD0gKHBsYXRmb3JtLmJvdHRvbSArIDE1KSkgJiZcbiAgICAgICAgICAgICAgKChzbGltZUxlZnRTcGFjZSArIDYwKSA+PSBwbGF0Zm9ybS5sZWZ0KSAmJiBcbiAgICAgICAgICAgICAgKHNsaW1lTGVmdFNwYWNlIDw9IChwbGF0Zm9ybS5sZWZ0ICsgODUpKSAmJlxuICAgICAgICAgICAgICAhaXNKdW1waW5nXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQgPSBzbGltZUJvdHRvbVNwYWNlO1xuICAgICAgICAgICAgICAgIHNsaW1lSnVtcCgpO1xuICAgICAgICAgICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuXG4gICAgfSwgMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgICAgbW92ZUxlZnQoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgbW92ZVJpZ2h0KCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcFBsYXllck1vdmVtZW50cyhldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA2NSkge1xuICAgICAgICBpc0dvaW5nTGVmdCA9IGZhbHNlXG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSB8fCBldmVudC5rZXlDb2RlID09PSA2OCkge1xuICAgICAgICBpc0dvaW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVMZWZ0KCkge1xuICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgaWYgKGlzR29pbmdSaWdodCkge1xuICAgICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXJJZClcbiAgICAgICAgaXNHb2luZ1JpZ2h0ID0gZmFsc2VcbiAgICB9XG4gICAgaXNHb2luZ0xlZnQgPSB0cnVlXG4gICAgbGVmdFRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA+PSAwKSB7XG4gICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgLT0gMjtcbiAgICAgICAgICAgc2xpbWUuc3R5bGUubGVmdCA9IHNsaW1lTGVmdFNwYWNlICsgJ3B4J1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpbWVMZWZ0U3BhY2UgPSA1NDU7XG4gICAgICAgIH1cbiAgICB9LCAxKVxufVxuXG5mdW5jdGlvbiBtb3ZlUmlnaHQoKSB7XG4gICAgY2xlYXJJbnRlcnZhbChyaWdodFRpbWVySWQpXG4gICAgaWYgKGlzR29pbmdMZWZ0KSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVySWQpXG4gICAgICAgIGlzR29pbmdMZWZ0ID0gZmFsc2VcbiAgICB9XG4gICAgaXNHb2luZ1JpZ2h0ID0gdHJ1ZVxuICAgIHJpZ2h0VGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzbGltZUxlZnRTcGFjZSA8PSA1MzguNSkge1xuICAgICAgICBzbGltZUxlZnRTcGFjZSArPSAyO1xuICAgICAgICBzbGltZS5zdHlsZS5sZWZ0ID0gc2xpbWVMZWZ0U3BhY2UgKyAncHgnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGltZUxlZnRTcGFjZSA9IC00O1xuICAgIH1cbiAgICB9LCAxKVxufVxuXG5mdW5jdGlvbiBnYW1lT3ZlcigpIHtcbiAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICB3aGlsZSAod2luZG93LmZpcnN0Q2hpbGQpIHsgd2luZG93LnJlbW92ZUNoaWxkKHdpbmRvdy5maXJzdENoaWxkKSB9XG4gICAgY2xlYXJJbnRlcnZhbCh1cFRpbWVySWQpO1xuICAgIGNsZWFySW50ZXJ2YWwoZG93blRpbWVySWQpO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Y3JlYXRlUGxheWVyLCBzbGltZUp1bXAsIHBsYXllck1vdmVtZW50cywgc3RvcFBsYXllck1vdmVtZW50cywgc3RhcnRQb2ludH0gZnJvbSBcIi4vc2NyaXB0cy9wbGF5ZXIuanNcIlxuaW1wb3J0IHtjcmVhdGVQbGF0Zm9ybXMsIG1vdmVQbGF0Zm9ybXN9IGZyb20gXCIuL3NjcmlwdHMvcGxhdGZvcm0uanNcIlxuXG5sZXQgaXNHYW1lT3ZlciA9IGZhbHNlO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZCcpO1xuICAgIGNvbnN0IHNsaW1lID0gY3JlYXRlUGxheWVyKGdyaWQpO1xuXG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgY3JlYXRlUGxhdGZvcm1zKGdyaWQpO1xuICAgICAgICAgICAgY3JlYXRlUGxheWVyKGdyaWQpO1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwobW92ZVBsYXRmb3Jtcy5iaW5kKHRoaXMsIGdyaWQpLCAzMCk7XG4gICAgICAgICAgICBzbGltZUp1bXAoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwbGF5ZXJNb3ZlbWVudHMpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN0b3BQbGF5ZXJNb3ZlbWVudHMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpO1xufSlcblxuIl0sIm5hbWVzIjpbInNsaW1lQm90dG9tU3BhY2UiLCJwbGF0Zm9ybUNvdW50IiwicGxhdGZvcm1zIiwiUGxhdGZvcm0iLCJncmlkIiwibmV3UGxhdEJvdHRvbSIsImJvdHRvbSIsImxlZnQiLCJNYXRoIiwicmFuZG9tIiwidmlzdWFsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVBsYXRmb3JtcyIsImkiLCJwbGF0Zm9ybUdhcCIsIm5ld1BsYXRmb3JtIiwicHVzaCIsIm1vdmVQbGF0Zm9ybXMiLCJmb3JFYWNoIiwicGxhdGZvcm0iLCJmaXJzdFBsYXRmb3JtIiwicmVtb3ZlIiwic2hpZnQiLCJzbGltZSIsInNsaW1lTGVmdFNwYWNlIiwiaXNHYW1lT3ZlciIsImlzSnVtcGluZyIsImlzR29pbmdMZWZ0IiwiaXNHb2luZ1JpZ2h0IiwibGVmdFRpbWVySWQiLCJyaWdodFRpbWVySWQiLCJzY29yZSIsInN0YXJ0UG9pbnQiLCJpc1BsYXllckRlYWQiLCJ1cFRpbWVySWQiLCJkb3duVGltZXJJZCIsImNyZWF0ZVBsYXllciIsInNsaW1lSnVtcCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInNsaW1lRmFsbCIsImdhbWVPdmVyIiwicGxheWVyTW92ZW1lbnRzIiwiZXZlbnQiLCJrZXkiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsInN0b3BQbGF5ZXJNb3ZlbWVudHMiLCJrZXlDb2RlIiwid2luZG93IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJzdGFydCIsImJpbmQiXSwic291cmNlUm9vdCI6IiJ9