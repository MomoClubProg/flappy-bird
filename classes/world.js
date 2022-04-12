class World {
    constructor(n) {
        this.imageLayers = [];
        this.xoffset = 0;
        for (let i = 0; i < n; i++) {
            this.imageLayers.push(
                loadImage(`./assets/background/layer${i}.png`)
            );
        }
    }
    update() {
        this.xoffset-=0.5;
    }
    render() {
        push();
        scale(1)
        for (let img of this.imageLayers) {
            image(
                img,
                this.xoffset,
                0,
                3840+this.xoffset,
                1080
            );
        }
        pop();
    }
}