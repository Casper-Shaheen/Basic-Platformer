class Floater extends GameObject {
    constructor(x, y, velX, velY, width, height, color, gameContext) {
        super();
        this.x = x;
        this.y = y;
        this.tags = ['drawable', 'logical'];
        this.velX = velX;
        this.velY = velY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.gameContext = gameContext;
    }
    update(delta) {
        this.x += this.velX * delta;
        this.y += this.velY * delta;
        let xBeforeCorrection = this.x;
        let yBeforeCorrection = this.y;
        this.x = (
            this.x < 0 ? 0 : (
                this.x + this.width > this.gameContext.canvas.getWidth() ? 
                this.gameContext.canvas.getWidth() - this.width : this.x
            )
        );
        if(xBeforeCorrection != this.x) this.velX *= -1;
        this.y = (
            this.y < 0 ? 0 : (
                this.y + this.height > this.gameContext.canvas.getHeight() ? 
                this.gameContext.canvas.getHeight() - this.height : this.y
            )
        );
        if(yBeforeCorrection != this.y) this.velY *= -1;

    }
    render(canvas) {
        canvas.setFillColor('salmon');
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}