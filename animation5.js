import scene from './engine/engine.js';

export default function animation5() {
    const animationNum = 5;
    console.log(`Animation ${animationNum}`);
    let hasAnimaitonBeenSeen = false;
    localStorage
        .getItem('animations')
        .split('&')
        .forEach((animation) => {
            if (animation === `${animationNum}`) {
                hasAnimaitonBeenSeen = true;
            }
        });
    if (
        localStorage.getItem('animations') == null ||
        localStorage.getItem('animations') === ''
    ) {
        localStorage.setItem('animations', animationNum);
    } else if (!hasAnimaitonBeenSeen) {
        localStorage.setItem(
            'animations',
            `${localStorage.getItem('animations')}&${animationNum}`
        );
    }

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
        x: -100,
        y: 100,
    };

    const colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];
    const ballCount = scene.canvas.height / 120;

    for (let i = 0; i < ballCount; i++) {
        let ballOffset = 10;
        let radius = 30;

        scene.drawArc({
            position: {
                x: scene.canvas.width / 2,
                y: i * radius * 4 + radius + ballOffset,
            },
            radius: 30,
            startAng: 0,
            endAng: Math.PI * 2,
            fill: colorArray[Math.floor(Math.random() * colorArray.length)],
            customVars: { velocity: scene.canvas.width / 200, bounceTimer: 0 },
            update: (e) => {
                if (e.position.x + e.radius >= scene.canvas.width) {
                    e.customVars.velocity = -e.customVars.velocity;
                    e.fill =
                        colorArray[
                            Math.floor(Math.random() * colorArray.length)
                        ];
                } else if (e.position.x - e.radius <= 0) {
                    e.customVars.velocity = -e.customVars.velocity;
                    e.fill =
                        colorArray[
                            Math.floor(Math.random() * colorArray.length)
                        ];
                } else if (
                    scene.math.getDistance(
                        e.position.x,
                        e.position.y,
                        mouse.x,
                        mouse.y
                    ) <= radius &&
                    e.customVars.bounceTimer === 0
                ) {
                    e.customVars.bounceTimer = 144 / 3;
                    e.customVars.velocity = -e.customVars.velocity;
                    e.fill =
                        colorArray[
                            Math.floor(Math.random() * colorArray.length)
                        ];
                }

                if (e.customVars.bounceTimer > 0) e.customVars.bounceTimer--;
                e.position.x += e.customVars.velocity;

                e.draw();
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
        144,
        () => {
            scene.elements.forEach((element) => {
                element.update(element);
            });
        },
        false
    );
}
