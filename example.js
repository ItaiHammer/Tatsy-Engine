import scene from './engine/engine.js';

function startGame() {
    scene.start({
        sceneParent: document.body,
        width: 800,
        height: 400,
    });

    let mouse = {
        x: null,
        y: null,
    };

    const colorArray = ['#d9d2ea', '#4c0490', '#36026a', '#6206b6', '#7b6b92'];

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    let circleArray = [];

    function Circle(
        initalX,
        initalY,
        velocityX,
        velocityY,
        minRadius,
        maxRadius,
        fill
    ) {
        this.x = initalX;
        this.vx = velocityX;

        this.y = initalY;
        this.vy = velocityY;

        this.radius = minRadius;
        this.fill = fill;
        this.minRadius = minRadius;
        this.maxRadius = maxRadius;

        this.draw = () => {
            scene.drawArc({
                position: { x: this.x, y: this.y },
                size: { x: 100, y: 100 },
                radius: this.radius,
                startAng: 0,
                endAng: Math.PI * 2,
                fill: this.fill,
            });
        };

        this.update = () => {
            if (
                this.x + this.radius > scene.canvas.width ||
                this.x - this.radius < 0
            ) {
                this.vx = -this.vx;
            }
            if (
                this.y + this.radius > scene.canvas.height ||
                this.y - this.radius < 0
            ) {
                this.vy = -this.vy;
            }

            this.x += this.vx;
            this.y += this.vy;

            //interaction
            this.interactionDistance = 60;
            if (
                mouse.x - this.x < this.interactionDistance &&
                mouse.x - this.x > -this.interactionDistance &&
                mouse.y - this.y < this.interactionDistance &&
                mouse.y - this.y > -this.interactionDistance &&
                this.radius < this.maxRadius
            ) {
                this.radius += 1;
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }

            this.draw();
        };
    }

    const ballCount = 800;

    for (let i = 0; i < ballCount; i++) {
        circleArray.push(
            new Circle(
                Math.random() * scene.canvas.width - 60 + 30,
                Math.random() * scene.canvas.width - 60 + 30,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                Math.random() * 6 + 2,
                Math.random() * 30 + 20,
                colorArray[Math.floor(Math.random() * colorArray.length)]
            )
        );
    }

    scene.setAnimation(() => {
        for (let i = 0; i < ballCount; i++) {
            circleArray[i].update();
        }
        // circleArray[1].update();
    }, 60);
}

document.body.onload = startGame();
