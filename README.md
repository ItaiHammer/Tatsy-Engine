## Tasty Engine

### **What is this?**

A simple < canvas > engine for pictures, animations, and games!

### **Installation**

For npm:

`npm install tasty-engine`

For yarn:

`yarn add tasty-engine`

Then...

For commonjs:

```js
const scene = require('tasty-engine');
```

For module:

```js
import scene from 'tasty-engine';
```

### Scene Properties

-   **Vars:**

    -   **`scene.canvas <Html Element>`** - Refrence to the canvas element the scene is working on

        -   `width` - Returns the width of the canvas
        -   `height` - Returns the height of the canvas

    -   **`scene.elements <Array>`** - An Array filled with all of the elements on the scene

-   **Functions:**

    -   **`scene.start({})`** - Starts up the scene and appends the canvas
        _Arguments:_

        -   `sceneParent _required_` - The element where the canvas is going to get appended to
        -   `width _not required_` - The width of the canvas
        -   `height _not required_` - The height of the canvas

    -   **`scene.clear()`** - Clears the canvas

    -   **`scene.animationClear()`** - The function that clears the canvas every frame of an animation

    -   **`scene.drawRect({})`** - Draws a rectangle on the canvas

        -   _Arguments:_
        -   `{name: <String>} _not required_` - A name that could be used later to locate this specific element
        -   `{position: {x: <Int>, y: <Int>}} _required_` - The x and y position of the Rectangle
        -   `{size: {x: <Int>, y: <Int>}} _required_` - The width and height of the Rectangle
        -   `{color: <String>} _not required_` - The color of the Rectangle
        -   `{update: <Function>} _not required_` - When you start an animation this function would run every frame
            -   _Arguments:_
            -   `element <Object>` - This object contains all of the properties and infomation about the shape
            -   `element.draw() <Function>` - This is a function that draws the shape onto the canvas
        -   `{customVars: <Anything>} _not required_` - This allows you to save additional infomation inside of the class

    -   **`scene.drawPath({})`** - Draws a line on the canvas

        -   _Arguments:_
        -   `{name: <String>} _not required_` - A name that could be used later to locate this specific element
        -   `{startPos: {x: <Int>, y: <Int>}} _required_` - The position where the line starts
        -   `{paths: <Array>} _required_` - An array full of x and y coordinates to show where the line goes
        -   `{color: <String>} _not required_` - The color of the line
        -   `{update: <Function>} _not required_` - When you start an animation this function would run every frame
            -   _Arguments:_
            -   `element <Object>` - This object contains all of the properties and infomation about the shape
            -   `element.draw() <Function>` - This is a function that draws the shape onto the canvas
        -   `{customVars: <Anything>} _not required_` - This allows you to save additional infomation inside of the class

    -   **`scene.drawArc({})`** - Draws an Arc on the canvas

        -   _Arguments:_
        -   `{name: <String>} _not required_` - A name that could be used later to locate this specific element
        -   `{position: {x: <Int>, y: <Int>}} _required_` - The x and y position of the Arc
        -   `{radius: <Int>} _required_` - The width from the center of the circle to the edge
        -   `{startAng: <Int> _required_}` - At what angle it starts drawing the Arc
        -   `{endAng: <Int> _required_}` - At what angle it stops drawing the Arc
        -   `{drawCounterClockWise: <Bool> _not required_}` - From what direction it starts drawing the Arc
        -   `{color: <String>} _not required_` - The color of the Arc
        -   `{fill: <String>} _not required_` - The color of the fill of the Arc
        -   `{update: <Function>} _not required_` - When you start an animation this function would run every frame
            -   _Arguments:_
            -   `element <Object>` - This object contains all of the properties and infomation about the shape
            -   `element.draw() <Function>` - This is a function that draws the shape onto the canvas
        -   `{customVars: <Anything>} _not required_` - This allows you to save additional infomation inside of the class

    -   **`scene.drawText({})`** - Draws Text on the canvas

        -   _Arguments:_
        -   `{name: <String>} _not required_` - A name that could be used later to locate this specific element
        -   `{position: {x: <Int>, y: <Int>}} _required_` - The x and y position of the Arc
        -   `{size: <Int> _required_}` - The size of the text
        -   `{text: <String> _required_}` - The text you want to write
        -   `{family: <String> _not required_}` - The font family of the text
        -   `{color: <String>} _not required_` - The color of the Arc
        -   `{update: <Function>} _not required_` - When you start an animation this function would run every frame
            -   _Arguments:_
            -   `element <Object>` - This object contains all of the properties and infomation about the shape
            -   `element.draw() <Function>` - This is a function that draws the shape onto the canvas
        -   `{customVars: <Anything>} _not required_` - This allows you to save additional infomation inside of the class

    -   **`scene.startAnimation(frameRate, animation, extras)`** - Creates an animation function

        -   _Arguments:_
        -   `frameRate <Int> _required_` - How many frames per second the animation runs
        -   `animation <Function> _not required_` - This is the function that is going to be running every frame of the animation
        -   `extras <Bool> _not required_` - If this is off auto redrawing and would be off

    -   **`scene.getElementByName(name)`** - Returns a specific element by its name

        -   _Arguments:_
        -   `name <String> _required_` - The name of the element you want to locate

    -   **`scene.getElementById(id)`** - Returns a specific element by its name

        -   _Arguments:_
        -   `id <Int> _required_` - The id of the element you want to locate

    -   **`scene.math.randomIntFromRange(min, max)`** - Gives you a random int from a range of two numbers

        -   _Arguments:_
        -   `min <Int> _required_` - The minimum number the function returns
        -   `max <Int> _required_` - The maximum number the function returns

    -   **`scene.math.randomColor()`** - Returns a random color

    -   **`scene.math.getDistance(x1, y1, x2, y1)`** - Gives you a random int from a range of two numbers
        -   _Arguments:_
        -   `x1 <Int> _required_` - The x coordinate of the first object to compare
        -   `y1 <Int> _required_` - The y coordinate of the first object to compare
        -   `x2 <Int> _required_` - The x coordinate of the second object to compare
        -   `y2 <Int> _required_` - The y coordinate of the second object to compare
