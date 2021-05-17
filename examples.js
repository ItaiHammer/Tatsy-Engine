import animation1 from './animation1.js';
import animation2 from './animation2.js';
import animation3 from './animation3.js';
import animation4 from './animation4.js';
import animation5 from './animation5.js';

const animations = [animation1, animation2, animation3, animation4, animation5];

window.onload = animations[Math.floor(Math.random() * animations.length)];