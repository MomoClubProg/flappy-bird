class World {
    constructor(n) {
        this.imageLayers = [];
        this.xoffset = [];
        for (let i = 0; i < n; i++) {
            this.imageLayers.push(
                loadImage(`./assets/background/layer${i}.png`)
            );
            this.xoffset.push((i+1)*1);
        }
    }
    update() {

        this.xoffset = this.xoffset.map((off, i)=>{
            off-=i;
            if (off <= -wnx*2) {
                off = wnx*2;
            }
            return off;
        });
        console.log(this.xoffset); 
    }
    render() {
        push();
        //scale(1);
        let i=0;
        for (let img of this.imageLayers) {
            image(
                img,
                this.xoffset[i],
                0,
                3840,
                1080
            );
            i++;
        }
        i=0;
        for (let img of this.imageLayers) {
            image(
                img,
                this.xoffset[i] + 2*(wnx),
                0,
                3840,
                1080
            );
            i++;
        }
        pop();
        fill(0,0,0,80);
        rect(0,0,wnx,wny);
        fill(255);
    }
}