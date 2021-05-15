import animation1 from './animation1.js';

const animations = [animation1];

window.onload = () =>
    animations[Math.floor(Math.random() * animations.length)]();
