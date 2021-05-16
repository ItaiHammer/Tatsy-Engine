let scene = {
    canvas: document.createElement('canvas'),
    elements: [],
    math: {
        randomIntFromRange: (min, max) => {
            return Math.random() * (max - min) + min;
        },
        randomColor: () => {
            return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
                Math.random() * 255
            }`;
        },
        getDistance: (x1, y1, x2, y2) => {
            let xDistance = x2 - x1;
            let yDistance = y2 - y1;

            return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        },
    },
    clear: () => {
        scene.context.clearRect(0, 0, scene.canvas.width, scene.canvas.height);
    },
    animationClear: () => {
        scene.clear();
    },
    start: (data) => {
        //setting up canvas
        if (data.width != null) {
            scene.canvas.width = data.width;
        }
        if (data.height != null) {
            scene.canvas.height = data.height;
        }
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
            function Rect(
                name,
                positionX,
                positionY,
                sizeX,
                sizeY,
                color,
                update,
                customVars
            ) {
                this.name = name;
                this.position = { x: positionX, y: positionY };
                this.size = { x: sizeX, y: sizeY };
                this.color = handleColor(color);
                this.customVars = customVars;

                this.draw = () => {
                    context.fillStyle = this.color;
                    context.fillRect(
                        this.position.x,
                        this.position.y,
                        this.size.x,
                        this.size.y
                    );
                };

                this.update =
                    update == null
                        ? () => {
                              this.draw();
                          }
                        : update;
            }

            scene.elements.push(
                new Rect(
                    data.name,
                    data.position.x,
                    data.position.y,
                    data.size.x,
                    data.size.y,
                    data.color,
                    data.update,
                    data.customVars
                )
            );

            //drawing everything on the scene
            scene.elements.forEach((element) => element.draw());
        };

        //drawing line
        scene.drawPath = (data) => {
            //handling color
            data.color = handleColor(data.color);

            function Path(name, startPos, paths, color, update, customVars) {
                this.name = name;
                this.startPos = startPos;
                this.paths = paths;
                this.color = color;
                this.customVars = customVars;

                this.draw = () => {
                    context.beginPath();
                    context.moveTo(startPos.x, startPos.y);
                    data.paths.forEach((path) => {
                        context.lineTo(path.x, path.y);
                    });

                    context.strokeStyle = color;

                    context.stroke();
                };

                this.update =
                    update == null
                        ? () => {
                              this.draw();
                          }
                        : update;
            }

            scene.elements.push(
                new Path(
                    data.name,
                    data.startPos,
                    data.paths,
                    data.color,
                    data.update,
                    data.customVars
                )
            );

            //drawing everything on the scene
            scene.elements.forEach((element) => element.draw());
        };

        //drawing arc
        scene.drawArc = (data) => {
            data.drawCounterClockWise =
                data.drawCounterClockWise == null
                    ? false
                    : data.drawCounterClockWise;

            function Arc(
                name,
                position,
                radius,
                startAng,
                endAng,
                drawCounterClockWise,
                color,
                fill,
                update,
                customVars
            ) {
                this.name = name;
                this.position = position;
                this.radius = radius;
                this.startAng = startAng;
                this.endAng = endAng;
                this.drawCounterClockWise = drawCounterClockWise;
                this.color = color;
                this.fill = fill;
                this.customVars = customVars;

                this.draw = () => {
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
                };

                this.update =
                    update == null
                        ? () => {
                              this.draw();
                          }
                        : update;
            }

            scene.elements.push(
                new Arc(
                    data.name,
                    data.position,
                    data.radius,
                    data.startAng,
                    data.endAng,
                    data.drawCounterClockWise,
                    data.color,
                    data.fill,
                    data.update,
                    data.customVars
                )
            );

            //drawing everything on the scene
            scene.elements.forEach((element) => element.draw());
        };

        //drawing text
        scene.drawText = (data) => {
            function Text(
                name,
                position,
                text,
                size,
                family,
                color,
                update,
                customVars
            ) {
                this.name = name;
                this.position = position;
                this.text = text;
                this.size =
                    String(size).substr(String(size).lenth - 2) === 'px'
                        ? String(size)
                        : `${size}px`;
                this.family = family == null ? 'Arial' : family;
                this.color = scene.handleColor(color);
                this.customVars = customVars;

                this.draw = () => {
                    context.font = `${this.size} ${this.family}`;
                    context.fillStyle = this.color;
                    context.fillText(
                        this.text,
                        this.position.x,
                        this.position.y
                    );
                };

                this.update =
                    update == null
                        ? () => {
                              this.draw();
                          }
                        : update;

                console.log(this);
            }

            scene.elements.push(
                new Text(
                    data.name,
                    data.position,
                    data.text,
                    data.size,
                    data.family,
                    data.color,
                    data.update,
                    data.customVars
                )
            );

            //drawing everything on the scene
            scene.elements.forEach((element) => element.draw());
        };

        //finding functions
        scene.getElementByName = (name) => {
            let foundElement = false;
            let i = 0;

            scene.elements.forEach((element) => {
                if (element.name === name) {
                    foundElement = true;
                } else if (foundElement === false) {
                    i++;
                }
            });

            if (foundElement === true) {
                return scene.elements[i];
            } else {
                return null;
            }
        };

        //animation functions
        scene.startAnimation = (frameRate, animation, extras) => {
            setInterval(() => {
                if (extras === true || extras == null) {
                    scene.animationClear();
                    if (animation != null) {
                        animation();
                    }
                    //drawing everything on the scene
                    scene.elements.forEach((element) =>
                        element.update(element)
                    );
                } else {
                    if (animation != null) {
                        animation();
                    }
                }
            }, 1000 / frameRate);
        };

        //appending canvas into the DOM
        data.sceneParent.append(scene.canvas);
    },
};

export default scene;
