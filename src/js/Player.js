class Player extends Physical {
    constructor(x, y, gameContext) {
        super(x, y, 40, 40, gameContext);
        this.speed = 330;
        this.velY = 0;
        this.gravity = 1.0;
        this.tags.push('drawable');
        this.tags.push('logical');
    }
    update(delta) {
        let aDown = this.gameContext.input.keyIsDown(65);
        let dDown = this.gameContext.input.keyIsDown(68);
        let wDown = this.gameContext.input.keyIsDown(87);
        let sDown = this.gameContext.input.keyIsDown(83);
        
        if(dDown) {
            this.x += this.speed * delta;
        } 
        if(aDown) {
            this.x -= this.speed * delta;
        }
        if(wDown && this.checkGrounded()) {
            this.velY = -800;
        }
        this.resolveCollisions(10);
    }

    render(canvas) {
        canvas.setFillColor('salmon');
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}