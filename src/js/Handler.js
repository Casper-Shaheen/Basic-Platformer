class Handler {
    constructor() {
        this.gameObjects = [];
    }
    addObject(gameObject) {
        this.gameObjects.push(gameObject);
    }
    removeObject(gameObject) {
        this.gameObjects = this.gameObjects.filter(go => go.id != gameObject.id);
    }
    update(delta) {
        for(let i = 0; i < this.gameObjects.length; ++i) {
            if(this.gameObjects[i].tags.includes('logical'))
                this.gameObjects[i].update(delta);
        }
    }
    render(ctx) {
        for(let i = 0; i < this.gameObjects.length; ++i) {
            if(this.gameObjects[i].tags.includes('drawable'))
               this.gameObjects[i].render(ctx);
        }
    }
    checkIntersects(gameObject) {
        for(let i = 0; i < this.gameObjects.length; ++i) {
            let go = this.gameObjects[i];
            if(go != gameObject && go.tags.includes('hittable')) {
                if(gameObject.getHitbox().intersects(go)) {
                    let hitData = {
                        xDiff: go.x - gameObject.x,
                        yDiff: go.y - gameObject.y
                    };
                    return hitData;
                }
            }
        }
    }
}