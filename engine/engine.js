let scene = {
  canvas: document.createElement('canvas'),
  elements: [],
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

      function Rect(name, positionX, positionY, sizeX, sizeY, color, update) {
        this.name = name;
        this.position = { x: positionX, y: positionY };
        this.size = { x: sizeX, y: sizeY };
        this.color = color;

        context.fillStyle = this.color;
        this.draw = () => {
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
          color,
          data.update
        )
      );

      //drawing everything on the scene
      scene.elements.forEach((element) => element.draw());
    };

    //drawing line
    scene.drawPath = (data) => {
      //handling color
      data.color = handleColor(data.color);

      function Path(name, startPos, paths, color, update) {
        this.name = name;
        this.startPos = startPos;
        this.paths = paths;
        this.color = color;

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
        new Path(data.name, data.startPos, data.paths, data.color, data.update)
      );

      //drawing everything on the scene
      scene.elements.forEach((element) => element.draw());
    };

    //drawing arc
    scene.drawArc = (data) => {
      data.drawCounterClockWise =
        data.drawCounterClockWise == null ? false : data.drawCounterClockWise;

      function Arc(
        name,
        position,
        radius,
        startAng,
        endAng,
        drawCounterClockWise,
        color,
        fill,
        update
      ) {
        this.name = name;
        this.position = position;
        this.radius = radius;
        this.startAng = startAng;
        this.endAng = endAng;
        this.drawCounterClockWise = drawCounterClockWise;
        this.color = color;
        this.fill = fill;

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
          data.update
        )
      );

      //finding functions
      scene.findElementByName = (name) => {
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

      //drawing everything on the scene
      scene.elements.forEach((element) => element.draw());
    };

    //animation functions
    scene.startAnimation = (frameRate, animation) => {
      setInterval(() => {
        scene.clear();
        if (animation != null) {
          animation();
        }
        //drawing everything on the scene
        scene.elements.forEach((element) => element.update(element));
      }, 1000 / frameRate);
    };

    //appending canvas into the DOM
    data.sceneParent.append(scene.canvas);
  },
};

export default scene;
