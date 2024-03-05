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
        return (this.right() > other.left() && this.left() < other.right() &&
        this.bottom() > other.top() && this.top() < other.bottom());
    }
    pointIntersects(x, y) {
        return x > this.left() && x < this.right() && y > this.top() && y < this.bottom();
    }
}