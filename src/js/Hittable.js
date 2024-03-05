class Hittable extends GameObject {
    constructor(x, y, width, height, gameContext) {
        super();
        this.tags.push('hittable');
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gameContext = gameContext;
    }
    center() {
        return {x: this.x + this.width / 2, y: this.y + this.height / 2};
    }
    getHitbox() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
    distanceToObject(other) {
        return Math.sqrt(
            Math.pow(other.center().x - this.center().x, 2) 
          + Math.pow(other.center().y - this.center().y, 2)
            );
    }
    resolveCollisions(depth) {
        let hitData = {};
        for(let i = 0; i < depth && (hitData = this.gameContext.handler.checkCollisions(this)); ++i) {
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
}