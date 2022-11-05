class Tile {
    constructor(context, x, y, height, width) {
        this.context = context;
        this.x = x;
        this.y = y;

        this.height = height;
        this.width = width;
    }

    draw() {
        this.context.fillStyle = "rgb(255, 0, 0, 0)";
        // this.context.fillStyle = "red";
        this.context.fillRect(this.x, this.y, this.height, this.width);
    }
}

export default Tile;