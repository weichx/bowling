const MouseButton = require("./e_mouse_button");

const MinDragRadius = 8;

class Input {

    constructor() {

        this.mouseX = 0;
        this.mouseY = 0;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.dragOriginX = 0;
        this.dragOriginY = 0;
        this.isDragging = false;
        this.mouseState = MouseButton.None;
        this.lastMouseState = MouseButton.None;
        this.boundMouseHandler = (evt) => {
            this.handleMouseEvent(evt);
        };
        //todo handle enter / exit
        document.addEventListener("mousedown", this.boundMouseHandler, false);
        document.addEventListener("mousemove", this.boundMouseHandler, false);
        document.addEventListener("mouseup", this.boundMouseHandler, false);
    }

    handleMouseEvent(evt) {
        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;
        this.mouseX = evt.clientX;
        this.mouseY = evt.clientY;
        this.mouseState = evt.buttons;
        evt.stopPropagation();
        evt.preventDefault();
    }

    getMouseButton(button) {
        return (this.mouseState & button) !== 0;
    }

    getMouseButtonDown(button) {
        return (this.mouseState & button) !== 0 && (this.lastMouseState & button) === 0;
    }

    getMouseButtonUp(button) {
        return (this.mouseState & button) === 0 && (this.lastMouseState & button) !== 0;
    }

    processInput() {
        if (!this.isDragging && this.getMouseButtonDown(MouseButton.Left)) {
            this.dragOriginX = this.mouseX;
            this.dragOriginY = this.mouseY;
        }
        if (!this.isDragging && this.getMouseButton(MouseButton.Left)) {
            var distX = (this.dragOriginX - this.mouseX);
            var distY = (this.dragOriginY - this.mouseY);
            this.isDragging = (distX * distX + distY * distY) >= MinDragRadius * MinDragRadius;
        }
        if (this.getMouseButtonUp(MouseButton.Left)) {
            this.isDragging = false;
            this.dragOriginX = 0;
            this.dragOriginY = 0;
        }

        this.lastMouseState = this.mouseState;
    }

}

module.exports = Input;