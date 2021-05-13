import scene from './engine/engine.js';

function startGame() {
  scene.start({
    sceneParent: document.body,
    width: 500,
    height: 500,
  });

  scene.drawArc({
    position: { x: 200, y: 200 },
    radius: 30,
    startAngle: 0,
    endAngle: Math.PI * 2,
    color: 'red',
  });
}

document.body.onload = startGame();
