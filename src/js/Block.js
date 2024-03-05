class Block extends Hittable {
    constructor(x, y, width, height, color, gameContext) {
        super(x, y, width, height, gameContext);
        this.color = color;
        this.tags.push('drawable');
    }
    render(canvas) {
        canvas.setFillColor(this.color);
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}