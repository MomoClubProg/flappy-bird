class Bird {
    constructor(x, y) {
        this.vy = 0;
        this.ay = 0;
        this.x = x;
        this.y = y;
    }
    render() {
        ellipse(this.x, this.y, 10, 10);
    }
    update() {
        this.vy -= this.ay
        this.vy = this.vy + 0.1;
        this.y = this.y + this.vy;
        this.ay *= 0;
    }
    jump() {
        this.ay = 3;
    }
}