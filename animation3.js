import scene from './engine/engine.js';

export default function animation3() {
    scene.start({
        sceneParent: document.body,
        width: innerWidth,
        height: innerHeight,
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    let mouse = {
        x: scene.canvas.width / 2,
        y: scene.canvas.height / 2,
    };

    const colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];
    const ballCount = innerWidth / 20;

    for (let i = 0; i < ballCount; i++) {
        scene.drawArc({
            position: { x: scene.canvas.width / 2, y: scene.canvas.height / 2 },
            radius: scene.math.randomIntFromRange(5, 8),
            startAng: 0,
            endAng: Math.PI * 2,
            customVars: {
                radians: Math.random() * Math.PI * 2,
                velocity: 0.01,
                distanceFromCenter: scene.math.randomIntFromRange(
                    20,
                    innerWidth / 2
                ),
                lastMouse: {
                    x: scene.canvas.width / 2,
                    y: scene.canvas.height / 2,
                },
            },
            fill: colorArray[Math.floor(Math.random() * colorArray.length)],
            update: (element) => {
                //smoothing mouse animation
                element.customVars.lastMouse.x +=
                    (mouse.x - element.customVars.lastMouse.x) * 0.05;

                element.customVars.lastMouse.y +=
                    (mouse.y - element.customVars.lastMouse.y) * 0.05;

                //move points overtime in a circular motion
                element.customVars.radians += element.customVars.velocity;

                element.position.x =
                    element.customVars.lastMouse.x +
                    Math.cos(element.customVars.radians) *
                        element.customVars.distanceFromCenter;
                element.position.y =
                    element.customVars.lastMouse.y +
                    Math.sin(element.customVars.radians) *
                        element.customVars.distanceFromCenter;

                element.draw();
            },
        });
    }

    scene.drawRect({
        name: 'fadingEffect',
        position: { x: 0, y: 0 },
        size: { x: scene.canvas.width, y: scene.canvas.height },
        color: 'rgba(255,255,255, 0.05)',
    });

    scene.startAnimation(
        300,
        () => {
            scene.elements.forEach((element) => element.update(element));
        },
        false
    );
}
