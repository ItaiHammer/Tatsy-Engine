## Tasty Engine

### Scene Properties

- **Vars:**

  - **`scene.canvas`** - Refrence to the canvas element the scene is working on
    - `width` - Returns the width of the canvas
    - `height` - Returns the height of the canvas

- **Functions:**

  - **`scene.start()`** - Starts up the scene and appends the canvas
    _Arguments:_
    - `sceneParent` - The element where the canvas is going to get appended to
    - `width` - The width of the canvas
    - `height` - The height of the canvas
  - **`scene.clear()`** - Clears the canvas

  - **`scene.drawRect()`** - Draws a rectangle on the canvas

    - _Arguments:_
    - `{name: <String>} _not required_` - A name that could be used later to locate this specific element
    - `{position: {x: <Int>, y: <Int>}} _required_` - The x and y position of the Rectangle
    - `{size: {x: <Int>, y: <Int>}} _required_` - The width and height of the Rectangle
    - `{color: <String>} _required_` - The color of the Rectangle
    - `{update: <Function>} _not required_` - When you start an animation this function would run every frame
      - _Arguments:_
      - `element <Object>` - This object contains all of the properties and infomation about the shape
      - `element.draw() <Function>` - This is a function that draws the shape onto the canvas

  - **`scene.drawPath()`** - Draws a line on the canvas

    - _Arguments:_
    - `{name: <String>} _not required_` - A name that could be used later to locate this specific element
    - `{startPos: {x: <Int>, y: <Int>}} _required_` - The position where the line starts
    - `{paths: <Array>} _required_` - An array full of x and y coordinates to show where the line goes
    - `{color: <String>} _required_` - The color of the line
    - `{update: <Function>} _not required_` - When you start an animation this function would run every frame
      - _Arguments:_
      - `element <Object>` - This object contains all of the properties and infomation about the shape
      - `element.draw() <Function>` - This is a function that draws the shape onto the canvas

  - **`scene.drawArc()`** - Draws an Arc on the canvas

    - _Arguments:_
    - `{name: <String>} _not required_` - A name that could be used later to locate this specific element
    - `{position: {x: <Int>, y: <Int>}} _required_` - The x and y position of the Arc
    - `{radius: <Int>} _required_` - The width from the center of the circle to the edge
    - `{startAng: <Int> _required_}` - At what angle it starts drawing the Arc
    - `{endAng: <Int> _required_}` - At what angle it stops drawing the Arc
    - `{drawCounterClockWise: <Bool> _not required_}` - From what direction it starts drawing the Arc
    - `{color: <String>} _not required_` - The color of the Arc
    - `{fill: <String>} _not required_` - The color of the fill of the Arc
    - `{update: <Function>} _not required_` - When you start an animation this function would run every frame
      - _Arguments:_
      - `element <Object>` - This object contains all of the properties and infomation about the shape
      - `element.draw() <Function>` - This is a function that draws the shape onto the canvas

  - **`scene.startAnimation()`** - Creates an animation function

    - _Arguments:_
    - `frameRate <Int> _required_` - How many frames per second the animation runs
    - `animation <Function> _not required_` - This is the function that is going to be running every frame of the animation

  - **`scene.findElementByName()`** - Locates a specific element by its name
    - _Arguments:_
    - `name <String> _required_` - The name of the element you want to locate
