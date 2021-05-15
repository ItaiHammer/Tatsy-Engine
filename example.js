import animation1 from './animation1.js';
import animation2 from './animation2.js';

const animations = [animation1, animation2];

window.onload = () =>
    animations[Math.floor(Math.random() * animations.length)]();
