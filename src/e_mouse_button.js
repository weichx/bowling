const MouseButton = {
    None: 0,
    Left: 1 << 0,
    Right: 1 << 1,
    Middle: 1 << 2
};

MouseButton.LeftOrRight = (MouseButton.Left | MouseButton.Right);
MouseButton.Any = (MouseButton.Left | MouseButton.Right | MouseButton.Middle);


module.exports = MouseButton;