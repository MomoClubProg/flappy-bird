class World {
    constructor(n) {
        this.imageLayers = [];
        this.xoffset=0;
        for (let i = 0; i < n; i++) {
            this.imageLayers.push(
                loadImage(`../assets/background/layer${i}.png`)
            );
        }
    }
    update() {

    }
    render() {
        for (let image of this.imageLayers) {
            image(
                image,
                this.xoffset,
                0,
                wnx+this.xoffset,
                wny
            );
        }
    }
}