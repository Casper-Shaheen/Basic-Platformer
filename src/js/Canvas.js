class Canvas {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
    }
    getWidth() {
        return this.canvas.width;
    }
    getHeight() {
        return this.canvas.height;
    }
    setWidth(width) { 
        this.canvas.width = width;
    }
    setHeight(height) {
        this.canvas.height = height;
    }

    fillRect(x, y, width, height) {
        this.context.fillRect(x, y, width, height);
    }

    setFillColor(color) {
        this.context.fillStyle = color;
    }

    clear(color) {
        this.context.fillStyle = color;
        this.fillRect(0, 0, this.getWidth(), this.getHeight());
    }
}