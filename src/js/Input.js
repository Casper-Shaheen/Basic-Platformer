class Input {
    constructor() {
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        this.downKeys = [];
    }

    keyDown(e) {
        this.downKeys.push(e);
    }

    keyUp(e) {
        this.downKeys = this.downKeys.filter((item) => item.keyCode != e.keyCode);
    }

    keyIsDown(keyCode) {
        return this.downKeys.filter((item) => item.keyCode == keyCode).length > 0;
    }
}