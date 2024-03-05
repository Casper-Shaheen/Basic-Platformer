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
    physicsUpdate(delta) {
        for(let i = 0; i < this.gameObjects.length; ++i) {
            if(this.gameObjects[i].tags.includes('physical')) {
                this.gameObjects[i].physicsUpdate(delta);
            }
        }
    }
    checkCollisions(gameObject) {
        for(let i = 0; i < this.gameObjects.length; ++i) {
            let go = this.gameObjects[i];
            if(go != gameObject && go.tags.includes('hittable') && gameObject.distanceToObject(go) < 100) {
                if(gameObject.getHitbox().intersects(go.getHitbox())) {
                    let hitData = {
                        other: go,
                        xDiff: (gameObject.center().x) - (go.center().x),
                        yDiff: (gameObject.center().y) - (go.center().y)
                    };
                    return hitData;
                }
            }
        }
    }
}