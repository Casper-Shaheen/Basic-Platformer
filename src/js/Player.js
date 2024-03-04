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
    center() {
        return {x: this.x + this.width / 2, y: this.y + this.height/2};
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
        let hitData = {};
        if(hitData = this.gameContext.handler.checkIntersects(this)) {
            console.log(hitData);
            if(Math.abs(hitData.xDiff) > Math.abs(hitData.yDiff)) {
                let dx = (hitData.other.width + this.width) / 2 
                        - Math.abs(hitData.other.center().x  - this.center().x);
                this.x += Util.normalize(hitData.xDiff) * dx;
            } else {
                let dy = (hitData.other.height + this.height) / 2 
                        - Math.abs(hitData.other.center().y  - this.center().y);
                this.y += Util.normalize(hitData.yDiff) * dy;
            }
        }
    }

    

    render(canvas) {
        canvas.setFillColor('grey');
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}