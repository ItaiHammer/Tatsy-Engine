import scene from './engine/engine.js';

export default function animation4() {
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
    const ballCount = {
        x: scene.canvas.width / 25,
        y: scene.canvas.height / 25,
    };

    //drawing before timer starts

    //drawing one row
    for (let i = 0; i < ballCount.x; i++) {
        const minRadius = 5;
        const maxRadius = 10;

        scene.drawArc({
            position: {
                x: minRadius * i + i * 20 + 11,
                y: scene.canvas.height + minRadius,
            },
            radius: minRadius,
            startAng: 0,
            endAng: Math.PI * 2,
            fill: colorArray[Math.floor(Math.random() * colorArray.length)],
            update: (e) => {
                if (e.position.y < 0 - minRadius) {
                    e.delete();
                }

                if (
                    scene.math.getDistance(
                        e.position.x,
                        e.position.y,
                        mouse.x,
                        mouse.y
                    ) < 100 &&
                    e.radius < maxRadius
                ) {
                    e.radius++;
                } else if (e.radius > minRadius) {
                    e.radius--;
                }

                e.position.y -= 3;

                e.draw();
            },
        });
    }

    //drawing one column
    for (let i = 0; i < ballCount.y; i++) {
        const minRadius = 5;
        const maxRadius = 10;

        scene.drawArc({
            position: {
                x: 0,
                y: minRadius * i + i * 20 + 11,
            },
            radius: minRadius,
            startAng: 0,
            endAng: Math.PI * 2,
            fill: colorArray[Math.floor(Math.random() * colorArray.length)],
            update: (e) => {
                if (e.position.x > scene.canvas.width - minRadius) {
                    e.delete();
                }

                if (
                    scene.math.getDistance(
                        e.position.x,
                        e.position.y,
                        mouse.x,
                        mouse.y
                    ) < 100 &&
                    e.radius < maxRadius
                ) {
                    e.radius++;
                } else if (e.radius > minRadius) {
                    e.radius--;
                }

                e.position.x += 3;

                e.draw();
            },
        });
    }

    //interval for drawing rows
    setInterval(() => {
        //drawing one row
        for (let i = 0; i < ballCount.x; i++) {
            const minRadius = 5;
            const maxRadius = 10;

            scene.drawArc({
                position: {
                    x: minRadius * i + i * 20 + 11,
                    y: scene.canvas.height + minRadius,
                },
                radius: minRadius,
                startAng: 0,
                endAng: Math.PI * 2,
                fill: colorArray[Math.floor(Math.random() * colorArray.length)],
                update: (e) => {
                    if (e.position.y < 0 - minRadius) {
                        e.delete();
                    }

                    if (
                        scene.math.getDistance(
                            e.position.x,
                            e.position.y,
                            mouse.x,
                            mouse.y
                        ) < 100 &&
                        e.radius < maxRadius
                    ) {
                        e.radius++;
                    } else if (e.radius > minRadius) {
                        e.radius--;
                    }

                    e.position.y -= 3;

                    e.draw();
                },
            });
        }

        //drawing one column
        for (let i = 0; i < ballCount.y; i++) {
            const minRadius = 5;
            const maxRadius = 10;

            scene.drawArc({
                position: {
                    x: 0,
                    y: minRadius * i + i * 20 + 11,
                },
                radius: minRadius,
                startAng: 0,
                endAng: Math.PI * 2,
                fill: colorArray[Math.floor(Math.random() * colorArray.length)],
                update: (e) => {
                    if (e.position.x > scene.canvas.width - minRadius) {
                        e.delete();
                    }

                    if (
                        scene.math.getDistance(
                            e.position.x,
                            e.position.y,
                            mouse.x,
                            mouse.y
                        ) < 100 &&
                        e.radius < maxRadius
                    ) {
                        e.radius++;
                    } else if (e.radius > minRadius) {
                        e.radius--;
                    }

                    e.position.x += 3;

                    e.draw();
                },
            });
        }
    }, 3000);

    scene.startAnimation(60);
}
