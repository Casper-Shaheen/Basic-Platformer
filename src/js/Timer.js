class Timer {
    constructor() {
        this.lastTime = document.timeline.currentTime;
    }
    grab() {
        this.lastTime = document.timeline.currentTime;
    }
    delta() {
        return (document.timeline.currentTime - this.lastTime) / 1000;
    }
    getCurrentTime() {
        return document.timeline.currentTime;
    }
    getLastTime() {
        return this.lastTime;
    }
}