// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"engine/engine.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var scene = {
  canvas: document.createElement('canvas'),
  elements: [],
  math: {
    randomIntFromRange: function randomIntFromRange(min, max) {
      return Math.random() * (max - min) + min;
    },
    randomColor: function randomColor() {
      return "rgb(".concat(Math.random() * 255, ", ").concat(Math.random() * 255, ", ").concat(Math.random() * 255);
    },
    getDistance: function getDistance(x1, y1, x2, y2) {
      var xDistance = x2 - x1;
      var yDistance = y2 - y1;
      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }
  },
  clear: function clear() {
    scene.context.clearRect(0, 0, scene.canvas.width, scene.canvas.height);
  },
  animationClear: function animationClear() {
    scene.clear();
  },
  start: function start(data) {
    //setting up canvas
    if (data.width != null) {
      scene.canvas.width = data.width;
    }

    if (data.height != null) {
      scene.canvas.height = data.height;
    }

    scene.context = scene.canvas.getContext('2d');
    var context = scene.context; //handling functions

    scene.handleColor = function (color) {
      return color == null || color === '' ? 'black' : color;
    };

    var handleColor = scene.handleColor;
    var id = 0; //drawing functions
    //drawing rectangle

    scene.drawRect = function (data) {
      function Rect(name, positionX, positionY, sizeX, sizeY, color, update, customVars) {
        var _this = this;

        this.name = name;
        this.position = {
          x: positionX,
          y: positionY
        };
        this.size = {
          x: sizeX,
          y: sizeY
        };
        this.color = handleColor(color);
        this.customVars = customVars;
        this.id = id;
        id += 1;

        this.draw = function () {
          context.fillStyle = _this.color;
          context.fillRect(_this.position.x, _this.position.y, _this.size.x, _this.size.y);
        };

        this.update = update == null ? function () {
          _this.draw();
        } : update;

        this.delete = function () {
          var foundElement = false;
          var index = 0;
          scene.elements.forEach(function (element) {
            if (element.id === _this.id || foundElement === true) {
              foundElement = true;
            } else {
              index++;
            }
          });
          scene.elements.splice(index, 1);
        };
      }

      scene.elements.push(new Rect(data.name, data.position.x, data.position.y, data.size.x, data.size.y, data.color, data.update, data.customVars)); //drawing everything on the scene

      scene.elements.forEach(function (element) {
        return element.draw();
      });
    }; //drawing line


    scene.drawPath = function (data) {
      //handling color
      data.color = handleColor(data.color);

      function Path(name, startPos, paths, color, update, customVars) {
        var _this2 = this;

        this.name = name;
        this.startPos = startPos;
        this.paths = paths;
        this.color = color;
        this.customVars = customVars;
        this.id = id;
        id += 1;

        this.draw = function () {
          context.beginPath();
          context.moveTo(startPos.x, startPos.y);
          data.paths.forEach(function (path) {
            context.lineTo(path.x, path.y);
          });
          context.strokeStyle = color;
          context.stroke();
        };

        this.update = update == null ? function () {
          _this2.draw();
        } : update;

        this.delete = function () {
          var foundElement = false;
          var index = 0;
          scene.elements.forEach(function (element) {
            if (element.id === _this2.id || foundElement === true) {
              foundElement = true;
            } else {
              index++;
            }
          });
          scene.elements.splice(index, 1);
        };
      }

      scene.elements.push(new Path(data.name, data.startPos, data.paths, data.color, data.update, data.customVars)); //drawing everything on the scene

      scene.elements.forEach(function (element) {
        return element.draw();
      });
    }; //drawing arc


    scene.drawArc = function (data) {
      data.drawCounterClockWise = data.drawCounterClockWise == null ? false : data.drawCounterClockWise;

      function Arc(name, position, radius, startAng, endAng, drawCounterClockWise, color, fill, update, customVars) {
        var _this3 = this;

        this.name = name;
        this.position = position;
        this.radius = radius;
        this.startAng = startAng;
        this.endAng = endAng;
        this.drawCounterClockWise = drawCounterClockWise;
        this.color = color;
        this.fill = fill;
        this.customVars = customVars;
        this.id = id;
        id += 1;

        this.draw = function () {
          context.beginPath();
          context.arc(_this3.position.x, _this3.position.y, _this3.radius, _this3.startAng, _this3.endAng, _this3.drawCounterClockWise);

          if (_this3.color != null) {
            context.strokeStyle = _this3.color;
            context.stroke();
          }

          if (_this3.fill != null) {
            context.fillStyle = _this3.fill;
            context.fill();
          }
        };

        this.update = update == null ? function () {
          _this3.draw();
        } : update;

        this.delete = function () {
          var foundElement = false;
          var index = 0;
          scene.elements.forEach(function (element) {
            if (element.id === _this3.id || foundElement === true) {
              foundElement = true;
            } else {
              index++;
            }
          });
          scene.elements.splice(index, 1);
        };
      }

      scene.elements.push(new Arc(data.name, data.position, data.radius, data.startAng, data.endAng, data.drawCounterClockWise, data.color, data.fill, data.update, data.customVars)); //drawing everything on the scene

      scene.elements.forEach(function (element) {
        return element.draw();
      });
    }; //drawing text


    scene.drawText = function (data) {
      function Text(name, position, text, size, family, color, update, customVars) {
        var _this4 = this;

        this.name = name;
        this.position = position;
        this.text = text;
        this.size = String(size).substr(String(size).lenth - 2) === 'px' ? String(size) : "".concat(size, "px");
        this.family = family == null ? 'Arial' : family;
        this.color = scene.handleColor(color);
        this.customVars = customVars;
        this.id = id;
        id += 1;

        this.draw = function () {
          context.font = "".concat(_this4.size, " ").concat(_this4.family);
          context.fillStyle = _this4.color;
          context.fillText(_this4.text, _this4.position.x, _this4.position.y);
        };

        this.update = update == null ? function () {
          _this4.draw();
        } : update;

        this.delete = function () {
          var foundElement = false;
          var index = 0;
          scene.elements.forEach(function (element) {
            if (element.id === _this4.id || foundElement === true) {
              foundElement = true;
            } else {
              index++;
            }
          });
          scene.elements.splice(index, 1);
        };
      }

      scene.elements.push(new Text(data.name, data.position, data.text, data.size, data.family, data.color, data.update, data.customVars)); //drawing everything on the scene

      scene.elements.forEach(function (element) {
        return element.draw();
      });
    }; //finding functions


    scene.getElementByName = function (name) {
      var foundElement = false;
      var i = 0;
      scene.elements.forEach(function (element) {
        if (element.name === name) {
          foundElement = true;
        } else if (foundElement === false) {
          i++;
        }
      });

      if (foundElement === true) {
        return scene.elements[i];
      } else {
        return null;
      }
    };

    scene.getElementById = function (id) {
      var foundElement = false;
      var i = 0;
      scene.elements.forEach(function (element) {
        if (element.id === id) {
          foundElement = true;
        } else if (foundElement === false) {
          i++;
        }
      });

      if (foundElement === true) {
        return scene.elements[i];
      } else {
        return null;
      }
    }; //animation functions


    scene.startAnimation = function (frameRate, animation, extras) {
      setInterval(function () {
        if (extras === true || extras == null) {
          scene.animationClear();

          if (animation != null) {
            animation();
          } //drawing everything on the scene


          scene.elements.forEach(function (element) {
            return element.update(element);
          });
        } else {
          if (animation != null) {
            animation();
          }
        }
      }, 1000 / frameRate);
    }; //appending canvas into the DOM


    data.sceneParent.append(scene.canvas);
  }
};
var _default = scene;
exports.default = _default;
},{}],"animation1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animation1;

var _engine = _interopRequireDefault(require("./engine/engine.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function animation1() {
  _engine.default.start({
    sceneParent: document.body,
    width: innerWidth,
    height: innerHeight
  });

  var mouse = {
    x: -100,
    y: -100
  };
  var colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  var ballCount = Math.floor(innerWidth / 2);

  var _loop = function _loop(i) {
    var vx = (Math.random() - 0.5) * 2;
    var vy = (Math.random() - 0.5) * 2;

    var minRadius = _engine.default.math.randomIntFromRange(2, 8);

    var maxRadius = _engine.default.math.randomIntFromRange(20, 30);

    var interactionDistance = 50;
    var mass = 1;

    _engine.default.drawArc({
      position: {
        x: _engine.default.math.randomIntFromRange(30, _engine.default.canvas.width - 30),
        y: _engine.default.math.randomIntFromRange(30, _engine.default.canvas.height - 30)
      },
      radius: minRadius,
      startAng: 0,
      endAng: Math.PI * 2,
      fill: colorArray[Math.floor(Math.random() * colorArray.length)],
      update: function update(element) {
        if (element.position.x + element.radius > _engine.default.canvas.width || element.position.x - element.radius < 0) {
          vx = -vx;
        }

        if (element.position.y + element.radius > _engine.default.canvas.height || element.position.y - element.radius < 0) {
          vy = -vy;
        }

        element.position.x += vx;
        element.position.y += vy; //interaction

        if (mouse.x - element.position.x < interactionDistance && mouse.x - element.position.x > -interactionDistance && mouse.y - element.position.y < interactionDistance && mouse.y - element.position.y > -interactionDistance && element.radius < maxRadius) {
          element.radius++;
        } else if (element.radius > minRadius) {
          element.radius--;
        }

        element.draw();
      }
    });
  };

  for (var i = 0; ballCount > i; i++) {
    _loop(i);
  }

  _engine.default.startAnimation(60, function () {
    _engine.default.canvas.width = innerWidth;
    _engine.default.canvas.height = innerHeight;
  });
}
},{"./engine/engine.js":"engine/engine.js"}],"animation2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animation2;

var _engine = _interopRequireDefault(require("./engine/engine.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function animation2() {
  _engine.default.start({
    sceneParent: document.body,
    width: innerWidth,
    height: innerHeight
  });

  var colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];
  var ballCount = Math.floor(innerWidth / 5);

  var _loop = function _loop(i) {
    var vy = 1;
    var vx = (Math.random() - 0.5) * 10;
    var gravity = 1;
    var bounciness = 0.99 + Math.random() / 100;

    _engine.default.drawArc({
      position: {
        x: _engine.default.math.randomIntFromRange(30, _engine.default.canvas.width - 30),
        y: _engine.default.math.randomIntFromRange(30, _engine.default.canvas.height - 30)
      },
      radius: _engine.default.math.randomIntFromRange(20, 40),
      startAng: 0,
      endAng: Math.PI * 2,
      color: 'black',
      fill: colorArray[Math.floor(Math.random() * colorArray.length)],
      update: function update(element) {
        if (element.position.y + element.radius + vy > _engine.default.canvas.height) {
          vy = -vy * bounciness;
        } else {
          vy += gravity;
        }

        if (element.position.x + element.radius + vx > _engine.default.canvas.width || element.position.x - element.radius + vx < 0) {
          vx = -vx;
        }

        element.position.x += vx;
        element.position.y += vy;
        element.draw();
      }
    });
  };

  for (var i = 0; i < ballCount; i++) {
    _loop(i);
  }

  _engine.default.startAnimation(60, function () {
    _engine.default.canvas.width = innerWidth;
    _engine.default.canvas.height = innerHeight;
  });
}
},{"./engine/engine.js":"engine/engine.js"}],"animation3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animation3;

var _engine = _interopRequireDefault(require("./engine/engine.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function animation3() {
  _engine.default.start({
    sceneParent: document.body,
    width: innerWidth,
    height: innerHeight
  });

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  var mouse = {
    x: _engine.default.canvas.width / 2,
    y: _engine.default.canvas.height / 2
  };
  var colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];
  var ballCount = innerWidth / 20;

  for (var i = 0; i < ballCount; i++) {
    _engine.default.drawArc({
      position: {
        x: _engine.default.canvas.width / 2,
        y: _engine.default.canvas.height / 2
      },
      radius: _engine.default.math.randomIntFromRange(5, 8),
      startAng: 0,
      endAng: Math.PI * 2,
      customVars: {
        radians: Math.random() * Math.PI * 2,
        velocity: 0.01,
        distanceFromCenter: _engine.default.math.randomIntFromRange(20, innerWidth / 2),
        lastMouse: {
          x: _engine.default.canvas.width / 2,
          y: _engine.default.canvas.height / 2
        }
      },
      fill: colorArray[Math.floor(Math.random() * colorArray.length)],
      update: function update(element) {
        //smoothing mouse animation
        element.customVars.lastMouse.x += (mouse.x - element.customVars.lastMouse.x) * 0.05;
        element.customVars.lastMouse.y += (mouse.y - element.customVars.lastMouse.y) * 0.05; //move points overtime in a circular motion

        element.customVars.radians += element.customVars.velocity;
        element.position.x = element.customVars.lastMouse.x + Math.cos(element.customVars.radians) * element.customVars.distanceFromCenter;
        element.position.y = element.customVars.lastMouse.y + Math.sin(element.customVars.radians) * element.customVars.distanceFromCenter;
        element.draw();
      }
    });
  }

  _engine.default.drawRect({
    name: 'fadingEffect',
    position: {
      x: 0,
      y: 0
    },
    size: {
      x: _engine.default.canvas.width,
      y: _engine.default.canvas.height
    },
    color: 'rgba(255,255,255, 0.05)'
  });

  _engine.default.startAnimation(300, function () {
    _engine.default.elements.forEach(function (element) {
      return element.update(element);
    });
  }, false);
}
},{"./engine/engine.js":"engine/engine.js"}],"animation4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animation4;

var _engine = _interopRequireDefault(require("./engine/engine.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function animation4() {
  _engine.default.start({
    sceneParent: document.body,
    width: innerWidth,
    height: innerHeight
  });

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  var mouse = {
    x: _engine.default.canvas.width / 2,
    y: _engine.default.canvas.height / 2
  };
  var colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];
  var ballCount = {
    x: _engine.default.canvas.width / 25,
    y: _engine.default.canvas.height / 25
  }; //drawing before timer starts
  //drawing one row

  var _loop = function _loop(i) {
    var minRadius = 5;
    var maxRadius = 10;

    _engine.default.drawArc({
      position: {
        x: minRadius * i + i * 20 + 11,
        y: _engine.default.canvas.height + minRadius
      },
      radius: minRadius,
      startAng: 0,
      endAng: Math.PI * 2,
      fill: colorArray[Math.floor(Math.random() * colorArray.length)],
      update: function update(e) {
        if (e.position.y < 0 - minRadius) {
          e.delete();
        }

        if (_engine.default.math.getDistance(e.position.x, e.position.y, mouse.x, mouse.y) < 100 && e.radius < maxRadius) {
          e.radius++;
        } else if (e.radius > minRadius) {
          e.radius--;
        }

        e.position.y -= 3;
        e.draw();
      }
    });
  };

  for (var i = 0; i < ballCount.x; i++) {
    _loop(i);
  } //drawing one column


  var _loop2 = function _loop2(_i) {
    var minRadius = 5;
    var maxRadius = 10;

    _engine.default.drawArc({
      position: {
        x: 0,
        y: minRadius * _i + _i * 20 + 11
      },
      radius: minRadius,
      startAng: 0,
      endAng: Math.PI * 2,
      fill: colorArray[Math.floor(Math.random() * colorArray.length)],
      update: function update(e) {
        if (e.position.x > _engine.default.canvas.width - minRadius) {
          e.delete();
        }

        if (_engine.default.math.getDistance(e.position.x, e.position.y, mouse.x, mouse.y) < 100 && e.radius < maxRadius) {
          e.radius++;
        } else if (e.radius > minRadius) {
          e.radius--;
        }

        e.position.x += 3;
        e.draw();
      }
    });
  };

  for (var _i = 0; _i < ballCount.y; _i++) {
    _loop2(_i);
  } //interval for drawing rows


  setInterval(function () {
    var _loop3 = function _loop3(_i2) {
      var minRadius = 5;
      var maxRadius = 10;

      _engine.default.drawArc({
        position: {
          x: minRadius * _i2 + _i2 * 20 + 11,
          y: _engine.default.canvas.height + minRadius
        },
        radius: minRadius,
        startAng: 0,
        endAng: Math.PI * 2,
        fill: colorArray[Math.floor(Math.random() * colorArray.length)],
        update: function update(e) {
          if (e.position.y < 0 - minRadius) {
            e.delete();
          }

          if (_engine.default.math.getDistance(e.position.x, e.position.y, mouse.x, mouse.y) < 100 && e.radius < maxRadius) {
            e.radius++;
          } else if (e.radius > minRadius) {
            e.radius--;
          }

          e.position.y -= 3;
          e.draw();
        }
      });
    };

    //drawing one row
    for (var _i2 = 0; _i2 < ballCount.x; _i2++) {
      _loop3(_i2);
    } //drawing one column


    var _loop4 = function _loop4(_i3) {
      var minRadius = 5;
      var maxRadius = 10;

      _engine.default.drawArc({
        position: {
          x: 0,
          y: minRadius * _i3 + _i3 * 20 + 11
        },
        radius: minRadius,
        startAng: 0,
        endAng: Math.PI * 2,
        fill: colorArray[Math.floor(Math.random() * colorArray.length)],
        update: function update(e) {
          if (e.position.x > _engine.default.canvas.width - minRadius) {
            e.delete();
          }

          if (_engine.default.math.getDistance(e.position.x, e.position.y, mouse.x, mouse.y) < 100 && e.radius < maxRadius) {
            e.radius++;
          } else if (e.radius > minRadius) {
            e.radius--;
          }

          e.position.x += 3;
          e.draw();
        }
      });
    };

    for (var _i3 = 0; _i3 < ballCount.y; _i3++) {
      _loop4(_i3);
    }
  }, 3000);

  _engine.default.startAnimation(60);
}
},{"./engine/engine.js":"engine/engine.js"}],"animation5.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animation5;

var _engine = _interopRequireDefault(require("./engine/engine.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function animation5() {
  _engine.default.start({
    sceneParent: document.body,
    width: innerWidth,
    height: innerHeight
  });

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  var mouse = {
    x: -100,
    y: 100
  };
  var colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];
  var ballCount = _engine.default.canvas.height / 120;

  var _loop = function _loop(i) {
    var ballOffset = 10;
    var radius = 30;

    _engine.default.drawArc({
      position: {
        x: _engine.default.canvas.width / 2,
        y: i * radius * 4 + radius + ballOffset
      },
      radius: 30,
      startAng: 0,
      endAng: Math.PI * 2,
      fill: colorArray[Math.floor(Math.random() * colorArray.length)],
      customVars: {
        velocity: _engine.default.canvas.width / 200,
        bounceTimer: 0
      },
      update: function update(e) {
        if (e.position.x + e.radius >= _engine.default.canvas.width) {
          e.customVars.velocity = -e.customVars.velocity;
          e.fill = colorArray[Math.floor(Math.random() * colorArray.length)];
        } else if (e.position.x - e.radius <= 0) {
          e.customVars.velocity = -e.customVars.velocity;
          e.fill = colorArray[Math.floor(Math.random() * colorArray.length)];
        } else if (_engine.default.math.getDistance(e.position.x, e.position.y, mouse.x, mouse.y) <= radius && e.customVars.bounceTimer === 0) {
          e.customVars.bounceTimer = 144 / 3;
          e.customVars.velocity = -e.customVars.velocity;
          e.fill = colorArray[Math.floor(Math.random() * colorArray.length)];
        }

        if (e.customVars.bounceTimer > 0) e.customVars.bounceTimer--;
        e.position.x += e.customVars.velocity;
        e.draw();
      }
    });
  };

  for (var i = 0; i < ballCount; i++) {
    _loop(i);
  }

  _engine.default.drawRect({
    name: 'fadingEffect',
    position: {
      x: 0,
      y: 0
    },
    size: {
      x: _engine.default.canvas.width,
      y: _engine.default.canvas.height
    },
    color: 'rgba(255,255,255, 0.05)'
  });

  _engine.default.startAnimation(144, function () {
    _engine.default.elements.forEach(function (element) {
      element.update(element);
    });
  }, false);
}
},{"./engine/engine.js":"engine/engine.js"}],"examples.js":[function(require,module,exports) {
"use strict";

var _animation = _interopRequireDefault(require("./animation1.js"));

var _animation2 = _interopRequireDefault(require("./animation2.js"));

var _animation3 = _interopRequireDefault(require("./animation3.js"));

var _animation4 = _interopRequireDefault(require("./animation4.js"));

var _animation5 = _interopRequireDefault(require("./animation5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animations = [_animation.default, _animation2.default, _animation3.default, _animation4.default, _animation5.default];
window.onload = animations[Math.floor(Math.random() * animations.length)];
},{"./animation1.js":"animation1.js","./animation2.js":"animation2.js","./animation3.js":"animation3.js","./animation4.js":"animation4.js","./animation5.js":"animation5.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50207" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","examples.js"], null)
//# sourceMappingURL=/examples.fbd95d22.js.map