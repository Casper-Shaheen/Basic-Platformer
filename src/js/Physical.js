/*
Physical.js : Casper Shaheen
The Physical class is a second-generation decendent 
of the GameObject class, inheriting from Hittable.

This class takes all of the required functionality of
the hittable class (if an object is physical, it is 
by a matter of necessity hittable, at least in as far
as it can be positioned and check for collisions.)

This class adds funcitonality for x and y velocity
and physical simulations with acceleration. Gravity
is also a required field of this class which is by default
set to 2000.0, which is a magic number I picked because it
makes jumping look nice. By default, the object's Y acceleration
is equal to the gravity.
*/
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
                if(go.getHitbox().pointIntersects(this.x+10, this.y + this.height) 
                    || go.getHitbox().pointIntersects(this.x+this.width-10, this.y + this.height)) {
                    
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
        // This has to go after, because if not, 
        // then y has already been resolved by Hittable,
        // and therefore will not be 'grounded'
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