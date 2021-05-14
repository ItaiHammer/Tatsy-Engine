let scene = {
    canvas: document.createElement('canvas'),
    clear: () => {
        scene.context.clearRect(0, 0, scene.canvas.width, scene.canvas.height);
    },
    start: (data) => {
        //setting up canvas
        scene.canvas.width = data.width;
        scene.canvas.height = data.height;
        scene.context = scene.canvas.getContext('2d');
        const context = scene.context;

        //handling functions

        scene.handleColor = (color) => {
            return color == null || color === '' ? 'black' : color;
        };
        const handleColor = scene.handleColor;

        //drawing functions
        //drawing rectangle
        scene.drawRect = (data) => {
            const color = handleColor(data.color);

            function Rect(positionX, positionY, sizeX, sizeY, color) {
                this.position = { x: positionX, y: positionY };
                this.size = { x: sizeX, y: sizeY };
                this.color = color;

                context.fillStyle = this.color;
                context.fillRect(
                    this.position.x,
                    this.position.y,
                    this.size.x,
                    this.size.y
                );
            }

            new Rect(
                data.position.x,
                data.position.y,
                data.size.x,
                data.size.y,
                color
            );
        };

        //drawing line
        scene.drawPath = (data) => {
            //handling color
            data.color = handleColor(data.color);

            function Path(startPos, paths, color) {
                this.startPos = startPos;
                this.paths = paths;
                this.color = color;

                context.beginPath();
                context.moveTo(startPos.x, startPos.y);
                data.paths.forEach((path) => {
                    context.lineTo(path.x, path.y);
                });

                context.strokeStyle = color;

                context.stroke();
            }

            Path(data.startPos, data.paths, data.color);
        };

        //drawing arc
        scene.drawArc = (data) => {
            data.drawCounterClockWise =
                data.drawCounterClockWise == null
                    ? false
                    : data.drawCounterClockWise;

            function Arc(
                position,
                radius,
                startAng,
                endAng,
                drawCounterClockWise,
                color,
                fill
            ) {
                this.position = position;
                this.radius = radius;
                this.startAng = startAng;
                this.endAng = endAng;
                this.drawCounterClockWise = drawCounterClockWise;
                this.color = color;
                this.fill = fill;

                context.beginPath();
                context.arc(
                    this.position.x,
                    this.position.y,
                    this.radius,
                    this.startAng,
                    this.endAng,
                    this.drawCounterClockWise
                );
                if (this.color != null) {
                    context.strokeStyle = this.color;
                    context.stroke();
                }
                if (this.fill != null) {
                    context.fillStyle = this.fill;
                    context.fill();
                }
            }

            new Arc(
                data.position,
                data.radius,
                data.startAng,
                data.endAng,
                data.drawCounterClockWise,
                data.color,
                data.fill
            );
        };

        //physics functions
        scene.checkForCollision = (obj1, obj2) => {};

        scene.setGravity = (x, speed, colisionCords) => {};

        //animation functions
        scene.setAnimation = (animation, frameRate) => {
            setInterval(() => {
                scene.clear();
                animation();
            }, 1000 / frameRate);
        };

        //appending canvas into the DOM
        data.sceneParent.append(scene.canvas);
    },
};

export default scene;
