parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QB8e":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var n="value has not been set",e={canvas:document.createElement("canvas"),elements:[],handleName:function(){return valueHasNotBeenSet},handleColor:function(){return valueHasNotBeenSet},handlePosition:function(){return valueHasNotBeenSet},handleXCord:function(){return valueHasNotBeenSet},handleYCord:function(){return valueHasNotBeenSet},drawRect:function(){return n},drawPath:function(){return n},drawArc:function(){return n},start:function(n){e.canvas.width=n.width,e.canvas.height=n.height,e.context=e.canvas.getContext("2d");var t=e.context;e.handleName=function(n){return null==n||""===n?"element".concat(e.elements.length):n};var a=e.handleName;e.handleColor=function(n){return null==n||""===n?"black":n};var o=e.handleColor;e.handlePosition=function(n){return null==n.x||null==n.y||n.x>e.canvas.width||n.y>n.canvas.height?{x:0,y:0}:n};e.handlePosition;e.handleXCord=function(n){return null==n||n>e.canvas.width?0:n};e.handleXCord;e.handleYCord=function(n){return null==n||n>e.canvas.height?0:n};e.handleYCord;e.drawRect=function(n){var e=o(n.color);t.fillStyle=e;a(n.name);t.fillRect(n.position.x,n.position.y,n.size.x,n.size.y)},e.drawPath=function(n){var e=o(n.color),r=(a(n.name),n.startPos||n.startPosition);t.beginPath(),t.moveTo(r.x,r.y),n.paths.forEach(function(n){t.lineTo(n.x,n.y)}),t.strokeStyle=e,t.stroke()},e.drawArc=function(n){var e=o(n.color),r=(a(n.name),n.position),l=n.radius,i=n.startAng||n.startAngle,u=n.endAng||n.endAngle,c=null!=n.drawCounterClockWise&&n.drawCounterClockWise;t.beginPath(),t.arc(r.x,r.y,l,i,u,c),t.strokeStyle=e,t.stroke()},n.sceneParent.append(e.canvas)}},t=e;exports.default=t;
},{}],"Zdfz":[function(require,module,exports) {
"use strict";var e=t(require("./engine.js"));function t(e){return e&&e.__esModule?e:{default:e}}function r(){console.log(e.default),e.default.start({sceneParent:document.body,width:400,height:400}),e.default.drawRect({position:{x:100,y:100},size:{x:200,y:100},color:"red"}),e.default.drawPath({startPos:{x:50,y:50},paths:[{x:10,y:60},{x:10,y:40},{x:90,y:120}]}),e.default.drawArc({position:{x:200,y:300},radius:30,startAngle:0,endAngle:2*Math.PI,color:"green"})}r();
},{"./engine.js":"QB8e"}]},{},["Zdfz"], null)
//# sourceMappingURL=/example.59a0756f.js.map