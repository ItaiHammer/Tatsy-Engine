parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"W24X":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t={canvas:document.createElement("canvas"),elements:[],clear:function(){t.context.clearRect(0,0,t.canvas.width,t.canvas.height)},start:function(n){t.canvas.width=n.width,t.canvas.height=n.height,t.context=t.canvas.getContext("2d");var e=t.context;t.handleColor=function(t){return null==t||""===t?"black":t};var o=t.handleColor;t.drawRect=function(n){t.elements.push(new function(t,i,s,a,r,l,c){var u=this;this.name=t,this.position={x:i,y:s},this.size={x:a,y:r},this.color=o(n.color),e.fillStyle=this.color,this.draw=function(){e.fillRect(u.position.x,u.position.y,u.size.x,u.size.y)},this.update=null==c?function(){u.draw()}:c}(n.name,n.position.x,n.position.y,n.size.x,n.size.y,n.color,n.update)),t.elements.forEach(function(t){return t.draw()})},t.drawPath=function(n){n.color=o(n.color),t.elements.push(new function(t,o,i,s,a){var r=this;this.name=t,this.startPos=o,this.paths=i,this.color=s,this.draw=function(){e.beginPath(),e.moveTo(o.x,o.y),n.paths.forEach(function(t){e.lineTo(t.x,t.y)}),e.strokeStyle=s,e.stroke()},this.update=null==a?function(){r.draw()}:a}(n.name,n.startPos,n.paths,n.color,n.update)),t.elements.forEach(function(t){return t.draw()})},t.drawArc=function(n){n.drawCounterClockWise=null!=n.drawCounterClockWise&&n.drawCounterClockWise,t.elements.push(new function(t,n,o,i,s,a,r,l,c){var u=this;this.name=t,this.position=n,this.radius=o,this.startAng=i,this.endAng=s,this.drawCounterClockWise=a,this.color=r,this.fill=l,this.draw=function(){e.beginPath(),e.arc(u.position.x,u.position.y,u.radius,u.startAng,u.endAng,u.drawCounterClockWise),null!=u.color&&(e.strokeStyle=u.color,e.stroke()),null!=u.fill&&(e.fillStyle=u.fill,e.fill())},this.update=null==c?function(){u.draw()}:c}(n.name,n.position,n.radius,n.startAng,n.endAng,n.drawCounterClockWise,n.color,n.fill,n.update)),t.findElementByName=function(n){var e=!1,o=0;return t.elements.forEach(function(t){t.name===n?e=!0:!1===e&&o++}),!0===e?t.elements[o]:null},t.elements.forEach(function(t){return t.draw()})},t.startAnimation=function(n,e){setInterval(function(){t.clear(),null!=e&&e(),t.elements.forEach(function(t){return t.update(t)})},1e3/n)},n.sceneParent.append(t.canvas)}},n=t;exports.default=n;
},{}],"Zdfz":[function(require,module,exports) {
"use strict";var a=t(require("./engine/engine.js"));function t(a){return a&&a.__esModule?a:{default:a}}function n(){a.default.start({sceneParent:document.body,width:800,height:600});var t={x:null,y:null},n=["#d9d2ea","#4c0490","#36026a","#6206b6","#7b6b92"];window.addEventListener("mousemove",function(a){t.x=a.x,t.y=a.y});for(var i=function(i){var o=2*(Math.random()-.5),d=2*(Math.random()-.5),e=6*Math.random()+2,r=30*Math.random()+20;a.default.drawArc({position:{x:Math.random()*a.default.canvas.width-30,y:Math.random()*a.default.canvas.height-30},radius:e,startAng:0,endAng:2*Math.PI,fill:n[Math.floor(Math.random()*n.length)],update:function(n){(n.position.x+n.radius>a.default.canvas.width||n.position.x-n.radius<0)&&(o=-o),(n.position.y+n.radius>a.default.canvas.height||n.position.y-n.radius<0)&&(d=-d),n.position.x+=o,n.position.y+=d,t.x-n.position.x<50&&t.x-n.position.x>-50&&t.y-n.position.y<50&&t.y-n.position.y>-50&&n.radius<r?n.radius++:n.radius>e&&n.radius--,n.draw()}})},o=0;800>o;o++)i();a.default.startAnimation(60)}document.body.onload=n();
},{"./engine/engine.js":"W24X"}]},{},["Zdfz"], null)
//# sourceMappingURL=/example.f4545848.js.map