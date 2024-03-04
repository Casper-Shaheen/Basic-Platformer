class Block extends GameObject {
    constructor(x, y, width, height, color) {
        super();
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tags = ['hittable', 'drawable'];
    }
    render(canvas) {
        canvas.setFillColor(this.color);
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
    getHitbox() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
}