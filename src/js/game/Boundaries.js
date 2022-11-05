import Tile from "./Tile.js"
import boundaryData from "./data/boundaries.js"

class Boundaries {
    constructor(context, tileRowSize, tileHeight, tileWidth, spawnOffsetX, spawnOffsetY) {

        this.boundaries = [];
        let i = 0;
        for (let b = 0; b < boundaryData.length; b += tileRowSize) {
            let row = boundaryData.slice(b, b + tileRowSize);
            for (let j = 0; j < row.length; j++) {
                if (row[j] === 1025) {
                    this.boundaries.push(new Tile(context, (j * tileHeight) + spawnOffsetX, (i * tileWidth) + spawnOffsetY, tileHeight, tileWidth))
                }
            }
            i++;
        }
    }

    getBoundaries() {
        return this.boundaries;
    }

}

export default Boundaries;