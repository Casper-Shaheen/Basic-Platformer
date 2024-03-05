class Physical extends Hittable {
    constructor(x, y, width, height, gameContext) {
        super(x, y, width, height, gameContext);
        this.tags.push('physical');
        this.velX = 0;
        this.velY = 0;
        this.gravity = 2000.0;
        this.accelX = 0;
        this.accelY = this.gravity;
        this.grounded;
    }
    
    checkGrounded() {
        for(let i = 0; i < this.gameContext.handler.gameObjects.length; ++i) {
            let go = this.gameContext.handler.gameObjects[i];
            if(go != this && go.tags.includes('hittable')) {
                if(go.getHitbox().pointIntersects(this.x+1, this.y + this.height) 
                    || go.getHitbox().pointIntersects(this.x+this.width-1, this.y + this.height)) {
                    
                    return true;
                }
            }
        }
        return false;
    }

    checkHead() {
        for(let i = 0; i < this.gameContext.handler.gameObjects.length; ++i) {
            let go = this.gameContext.handler.gameObjects[i];
            if(go != this && go.tags.includes('hittable')) {
                if(go.getHitbox().pointIntersects(this.x + 1, this.y) 
                    || go.getHitbox().pointIntersects(this.x+this.width - 1, this.y)) {
                        return true;
                }
            }
        }
        return false;
    }

    physicsUpdate(delta) {
        this.velX += this.accelX * delta;
        this.x += this.velX * delta;
        this.y += this.velY * delta;
        if(!this.checkGrounded()){
            this.velY += this.accelY * delta;
        } else {
            this.velY = 0;
        }
        if(this.checkHead()) {
            this.velY = 0;
        }
    }
}