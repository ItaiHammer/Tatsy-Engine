import scene from './engine/engine.js';

export default function animation2() {
    scene.start({
        sceneParent: document.body,
        width: innerWidth,
        height: innerHeight,
    });

    const colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];
    const ballCount = Math.floor(innerWidth / 5);

    for (let i = 0; i < ballCount; i++) {
        let vy = 1;
        let vx = (Math.random() - 0.5) * 10;
        let gravity = 1;
        let bounciness = 0.99 + Math.random() / 100;

        scene.drawArc({
            position: {
                x: scene.math.randomIntFromRange(30, scene.canvas.width - 30),
                y: scene.math.randomIntFromRange(30, scene.canvas.height - 30),
            },
            radius: scene.math.randomIntFromRange(20, 40),
            startAng: 0,
            endAng: Math.PI * 2,
            color: 'black',
            fill: colorArray[Math.floor(Math.random() * colorArray.length)],
            update: (element) => {
                if (
                    element.position.y + element.radius + vy >
                    scene.canvas.height
                ) {
                    vy = -vy * bounciness;
                } else {
                    vy += gravity;
                }

                if (
                    element.position.x + element.radius + vx >
                        scene.canvas.width ||
                    element.position.x - element.radius + vx < 0
                ) {
                    vx = -vx;
                }

                element.position.x += vx;
                element.position.y += vy;
                element.draw();
            },
        });
    }

    scene.startAnimation(60, () => {
        scene.canvas.width = innerWidth;
        scene.canvas.height = innerHeight;
    });
}
