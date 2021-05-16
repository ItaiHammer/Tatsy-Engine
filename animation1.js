import scene from './engine/engine.js';

export default function animation1() {
    scene.start({
        sceneParent: document.body,
        width: innerWidth,
        height: innerHeight,
    });

    let mouse = {
        x: -100,
        y: -100,
    };

    const colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    const ballCount = Math.floor(innerWidth / 2);

    for (let i = 0; ballCount > i; i++) {
        let vx = (Math.random() - 0.5) * 2;
        let vy = (Math.random() - 0.5) * 2;
        let minRadius = scene.math.randomIntFromRange(2, 8);
        let maxRadius = scene.math.randomIntFromRange(20, 30);
        let interactionDistance = 50;
        let mass = 1;

        scene.drawArc({
            position: {
                x: scene.math.randomIntFromRange(30, scene.canvas.width - 30),
                y: scene.math.randomIntFromRange(30, scene.canvas.height - 30),
            },
            radius: minRadius,
            startAng: 0,
            endAng: Math.PI * 2,
            fill: colorArray[Math.floor(Math.random() * colorArray.length)],
            update: (element) => {
                if (
                    element.position.x + element.radius > scene.canvas.width ||
                    element.position.x - element.radius < 0
                ) {
                    vx = -vx;
                }
                if (
                    element.position.y + element.radius > scene.canvas.height ||
                    element.position.y - element.radius < 0
                ) {
                    vy = -vy;
                }

                element.position.x += vx;
                element.position.y += vy;

                //interaction
                if (
                    mouse.x - element.position.x < interactionDistance &&
                    mouse.x - element.position.x > -interactionDistance &&
                    mouse.y - element.position.y < interactionDistance &&
                    mouse.y - element.position.y > -interactionDistance &&
                    element.radius < maxRadius
                ) {
                    element.radius++;
                } else if (element.radius > minRadius) {
                    element.radius--;
                }

                element.draw();
            },
        });
    }

    scene.startAnimation(60, () => {
        scene.canvas.width = innerWidth;
        scene.canvas.height = innerHeight;
    });
}
