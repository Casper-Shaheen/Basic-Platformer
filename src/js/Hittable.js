/*
Hittable.js : Casper Shaheen

The Hittable class is a single generation decent from
the GameObject class, this class identifies an object
which strinctly requires either being able to detect a
collision, resolve one, or both. No physics is required
on these objects, and they do not implement any gravity
or acceleration.

As a requirement for collision logic, this class adds 
functionality to get a hitbox (a rectangle made with the 
Rect class), locate the object's center, and determine
the distance of the objects center from the distance of 
another object's center.

For the necessary operations, this class requires a copy
of the Game class it belongs to, so that it can check 
the objects in the Game's Handler field to see if they are 
intersecting with itself.

Also requires a position and a width and height.
*/

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
    
    
    /*
    --- center() ---
    inputs: none
    returns: an object with the following structure:
    {
        x - the x coordinate of this object's center
        y - the y coordinate of this object's center
    }
    ----------------
    */
    center() {
        return {x: this.x + this.width / 2, y: this.y + this.height / 2};
    }
    
    
    /*
    --- getHitbox() ---
    inputs: none
    outputs: A rectangle (of type Rect) of the object's hitbox.
    -------------------
    */
    getHitbox() {
        return new Rect(this.x, this.y, this.width, this.height);
    }


    /*
    --- distanceToObject() ---
    inputs: other -> required to be of type Hittable
    outputs: float distance to the other object's center
    from this object's center.
    --------------------------
    */
    distanceToObject(other) {
        return Math.sqrt(
            Math.pow(other.center().x - this.center().x, 2) 
          + Math.pow(other.center().y - this.center().y, 2)
            );
    }


    /*
    --- resolveCollisions() ---
    inputs: depth -> an integer value of how many times to resolve
    returns: void
    Descrition: This method checks the game's handler for any objects
    it's intersecting with, and calculates the smallest movement to 
    resolve in either the x or y axis (not both).
    ---------------------------
    */
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