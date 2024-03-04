class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    left() {
        return this.x;
    }
    top() {
        return this.y;
    }
    right() {
        return this.x + this.width;
    }
    bottom() {
         return this.y + this.height;
    }
    intersects(other) {
        if(this.right() > other.left() && this.left() < other.right() &&
            this.bottom() > other.top() && this.top() < other.bottom()) {
                return true;
            }
        return false;
    }
}