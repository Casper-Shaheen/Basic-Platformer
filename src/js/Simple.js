class Simple extends GameObject {
    constructor(x, y, width=50, height=50, color='white') {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.tags = ['drawable'];
    }
    render(canvas) {
        canvas.setFillColor('white');
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}