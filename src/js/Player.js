class Player extends GameObject {
    constructor(x, y, gameContext) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.lastX = this.x;
        this.lastY = this.y;
        this.speed = 230;
        this.gameContext = gameContext;
        this.tags = ['logical', 'drawable', 'hittable'];
    }
    getHitbox() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
    update(delta) {
        let aDown = this.gameContext.input.keyIsDown(65);
        let dDown = this.gameContext.input.keyIsDown(68);
        let wDown = this.gameContext.input.keyIsDown(87);
        let sDown = this.gameContext.input.keyIsDown(83);

        this.lastX = this.x;
        this.lastY = this.y;
        
        if(dDown) {
            this.x += this.speed * delta;
        } 
        if(aDown) {
            this.x -= this.speed * delta;
        }
        if(sDown) {
            this.y += this.speed * delta;
        }
        if(wDown) {
            this.y -= this.speed * delta;
        }
        if(this.gameContext.handler.checkIntersects(this)) {
            console.log('hitting!');
        }
    }

    

    render(canvas) {
        canvas.setFillColor('grey');
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}