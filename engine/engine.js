const valueHasNotBeenSetMessage = 'value has not been set';

let scene = {
  canvas: document.createElement('canvas'),
  elements: [],
  borders: {
    left: 0,
    top: 0,
    bottom: valueHasNotBeenSetMessage,
    right: valueHasNotBeenSetMessage,
  },
  //handling functions
  handleName: () => {
    return valueHasNotBeenSet;
  },
  handleColor: () => {
    return valueHasNotBeenSet;
  },
  handlePosition: () => {
    return valueHasNotBeenSet;
  },
  handleXCord: () => {
    return valueHasNotBeenSet;
  },
  handleYCord: () => {
    return valueHasNotBeenSet;
  },
  //drawing functions
  drawRect: () => {
    return valueHasNotBeenSetMessage;
  },
  drawPath: () => {
    return valueHasNotBeenSetMessage;
  },
  drawArc: () => {
    return valueHasNotBeenSetMessage;
  },
  //animation functions
  setAnimation: () => {
    return valueHasNotBeenSetMessage;
  },
  stopAnimation: () => {},

  start: (data) => {
    //setting canvas values
    scene.canvas.width = data.width;
    scene.canvas.height = data.height;
    scene.borders.right = scene.canvas.width;
    scene.borders.bottom = scene.canvas.height;

    scene.context = scene.canvas.getContext('2d');
    const context = scene.context;

    //scene functions
    function addToScene(name, element) {
      scene.elements.push({ name, element });
    }

    //handling functions
    scene.handleName = (name) => {
      return name == null || name === ''
        ? `element${scene.elements.length + 1}`
        : name;
    };
    const handleName = scene.handleName;

    scene.handleColor = (color) => {
      return color == null || color === '' ? 'black' : color;
    };
    const handleColor = scene.handleColor;

    //drawing functions
    scene.drawRect = (data) => {
      //handling color
      const color = handleColor(data.color);
      context.fillStyle = color;

      //handling name
      const name = handleName(data.name);

      context.fillRect(
        data.position.x,
        data.position.y,
        data.size.x,
        data.size.y
      );

      scene.elements.push(new Rect(name, x, y, radius));
    };

    scene.drawPath = (data) => {
      //handling color
      const color = handleColor(data.color);

      //handling name
      const name = handleName(data.name);
      const startPos = data.startPos || data.startPosition;

      context.beginPath();
      context.moveTo(startPos.x, startPos.y);
      data.paths.forEach((path) => {
        context.lineTo(path.x, path.y);
      });

      context.strokeStyle = color;

      context.stroke();

      scene.elements.push(new Path(name, x, y, { paths }));
    };

    scene.drawArc = (data) => {
      //handling color
      const color = handleColor(data.color);

      //handling name
      const name = handleName(data.name);

      const position = data.position;
      const radius = data.radius;
      const startAng = data.startAng || data.startAngle;
      const endAng = data.endAng || data.endAngle;
      const drawCounterClockWise =
        data.drawCounterClockWise == null ? false : data.drawCounterClockWise;

      context.beginPath();
      context.arc(
        position.x,
        position.y,
        radius,
        startAng,
        endAng,
        drawCounterClockWise
      );
      context.strokeStyle = color;
      context.stroke();

      scene.elements.push(new drawArc(name, x, y, radius, startAng, endAng));
    };

    //animation functions

    //appending canvas into the DOM
    data.sceneParent.append(scene.canvas);
  },
};

export default scene;
