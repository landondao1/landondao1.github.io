import spawnPointData from "./data/spawnpoints.js"
import Tile from "./Tile.js"

class SpawnPoint {

    constructor(dataRowSize, tileHeight, tileWidth) {
        this.spawnPoints = [];

        let i = 0;
        for (let s = 0; s < spawnPointData.length; s += dataRowSize) {
            let row = spawnPointData.slice(s, s + dataRowSize);
            for (let j = 0; j < row.length; j++) {
                if (row[j] === 1025) {
                    this.spawnPoints.push(new Tile(this.context, (j * tileHeight), (i * tileWidth), tileHeight, tileWidth))
                }
            }
            i++;
        }
    }

    getRandomSpawnPoint() {
        return this.spawnPoints[Math.floor(Math.random()*this.spawnPoints.length)];
    }
}

export default SpawnPoint;