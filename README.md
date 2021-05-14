## Tasty Engine

### Scene Properties

-   **Vars:**

    -   **`scene.canvas`** - Refrence to the canvas element the scene is working on
        -   `width` - Returns the width of the canvas
        -   `height` - Returns the height of the canvas

-   **Functions:**

    -   **`scene.start()`** - Starts up the scene and appends the canvas
        _Arguments:_
        -   `sceneParent` - The element where the canvas is going to get appended to
        -   `width` - The width of the canvas
        -   `height` - The height of the canvas
    -   **`scene.clear()`** - Clears the canvas

    -   **`scene.drawRect()`** - Draws a rectangle on the canvas

        -   _Arguments:_
        -   `{position: {x: <Int>, y: <Int>}}` - The x and y position of the Rectangle
        -   `{size: {x: <Int>, y: <Int>}}` - The width and height of the Rectangle
        -   `{color: <String>}` - The color of the Rectangle

    -   **`scene.drawPath()`** - Draws a line on the canvas

        -   _Arguments:_
        -   `{startPos: {x: <Int>, y: <Int>}}` - The position where the line starts
        -   `{paths: <Array>}` - An array full of x and y coordinates to show where the line goes
        -   `{color: <String>}` - The color of the line

    -   **`scene.drawArc()`** - Draws an Arc on the canvas

        -   _Arguments:_
        -   `{position: {x: <Int>, y: <Int>}}` - The x and y position of the Arc
        -   `{radius: <Int>}` - The width from the center of the circle to the edge
        -   `{startAng: <Int>}` - At what angle it starts drawing the Arc
        -   `{endAng: <Int>}` - At what angle it stops drawing the Arc
        -   `{drawCounterClockWise: <Bool>}` - From what direction it starts drawing the Arc
        -   `{color: <String>}` - The color of the Arc
        -   `{fill: <String>}` - The color of the fill of the Arc

    -   **`scene.setAnimation()`** - Creates an animation function
        -   _Arguments:_
        -   `animation <Function>` - This is the function that is going to be running every frame of the animation
        -   `frameRate <Int>` - How many frames per second the animation runs
