import {Component, React} from 'react'

import characterDownImage from "../css/images/island/character_down.png"
import characterRightImage from "../css/images/island/character_right.png"
import characterLeftImage from "../css/images/island/character_left.png"
import characterUpImage from "../css/images/island/character_up.png"
import mapImage from "../css/images/island/map.png"

import SpawnPoints from './game/SpawnPoints'
import Sprite from "./game/Sprite"
import Boundaries from './game/Boundaries'

import Firebase from "./game/Firebase"

// Comes from Tiled map width
const tileRowSize = 70;

// Comes from 12x12 with 400% zoom
// We multiply 12 * 4 to get 48
const tileHeight = 48;
const tileWidth = 48;

const moveDistance = 5;

class SocialIsland extends Component {

    constructor(props) {
        super(props);
        
        this.selectedKey = "";
        this.right = false;
        this.left = false;
        this.down = false;
        this.up = false;

    }

    componentDidMount() {
        
        // Set up the canvas to be the full height and width of the browser
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - navbarHeight - 3; // 3 is random offset. Idk why it still scrolls
        this.context = this.canvas.getContext('2d');

        // Get a random spawn point to place the character at
        const spawn = new SpawnPoints(tileRowSize, tileHeight, tileWidth).getRandomSpawnPoint();
        let spawnX = -1 * (spawn.x - (this.canvas.width/2)) - tileWidth;
        let spawnY = -1 * (spawn.y - (this.canvas.height/2));
        let movement = {x: 0, y: 0};

        // Fills the entire canvas with the same color as the water
        // For the edge case of large resolution monitors
        this.context.fillStyle = "#68E6D3";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Create the character
        const characterRightImageObject = new Image();
        const characterLeftImageObject = new Image();
        const characterDownImageObject = new Image();
        const characterUpImageObject = new Image();

        characterRightImageObject.src = characterRightImage;
        characterLeftImageObject.src = characterLeftImage;
        characterDownImageObject.src = characterDownImage;
        characterUpImageObject.src = characterUpImage;

        const characterSprites = {
            down: characterDownImageObject,
            right: characterRightImageObject,
            left: characterLeftImageObject,
            up: characterUpImageObject,
        }

        const characterX = (this.canvas.width / 2) - (characterDownImageObject.width / 4);
        const characterY = (this.canvas.height / 2) - (characterDownImageObject.height / 4);

        const character = new Sprite(this.canvas, characterDownImageObject, characterX, characterY, {max:4}, characterSprites);

        // Create the map
        const mapImageObject = new Image();
        mapImageObject.src = mapImage;

        const map = new Sprite(this.canvas, mapImageObject, spawnX, spawnY);

        // Create the map boundaries
        const boundaries = new Boundaries(this.context, tileRowSize, tileHeight, tileWidth, spawnX, spawnY).getBoundaries();
        
        // Broadcast the character's initial position to all other visitors
        const characterCoordinates = map.getFixedPositionOnCanvas(tileWidth);
        const initialData = {
            x: characterCoordinates.x,
            y: characterCoordinates.y,
            frames: character.frames,
            direction: "down",
        }
        const firebase = new Firebase(this.canvas, initialData, spawnX, spawnY, characterSprites);

        const movables = [movement, map, ...boundaries];
        
        const animate = () => {
            window.requestAnimationFrame(animate);

            // Draw images on the map
            map.draw();
            boundaries.forEach((b) => { b.draw()});
            firebase.draw(movement);
            character.draw();


            if (character.moving) {
                const characterCoordinates = map.getFixedPositionOnCanvas(tileWidth);
                firebase.setVisitorReference({
                    x: characterCoordinates.x,
                    y: characterCoordinates.y,
                    frames: character.frames,
                    direction: this.selectedKey,
                });
            }

            // Handle character movement
            let moving = true;
            character.moving = false;
            if (this.left && this.selectedKey === "left") {
                character.image = character.sprites.left;
                character.moving = true;
                for (let i = 0; i < boundaries.length; i++) {
                    if (character.willCollide(-1 * moveDistance, 0, boundaries[i])) {
                        moving = false;
                        break;
                    }
                }
                movables.forEach((m) => { if (moving) m.x += moveDistance });
            }
            if (this.right && this.selectedKey === "right") {
                character.image = character.sprites.right;
                character.moving = true;
                for (let i = 0; i < boundaries.length; i++) {
                    if (character.willCollide(moveDistance, 0, boundaries[i])) {
                        moving = false;
                        break;
                    }
                }
                movables.forEach((m) => { if (moving) m.x -= moveDistance });
            }
            if (this.up && this.selectedKey === "up") {
                character.image = character.sprites.up;
                character.moving = true;
                for (let i = 0; i < boundaries.length; i++) {
                    if (character.willCollide(0, -1 * moveDistance, boundaries[i])) {
                        moving = false;
                        break;
                    }
                }
                movables.forEach((m) => { if (moving) m.y += moveDistance });
            }
            if (this.down && this.selectedKey === "down") {
                character.image = character.sprites.down;
                character.moving = true;
                for (let i = 0; i < boundaries.length; i++) {
                    if (character.willCollide(0, moveDistance, boundaries[i])) {
                        moving = false;
                        break;
                    }
                }
                movables.forEach((m) => { if (moving) m.y -= moveDistance });
            }
        }
        animate();

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                case "W":
                case "w":
                    this.selectedKey = "up";
                    this.up = true;
                    break;
                case "ArrowLeft":
                case "A":
                case "a":
                    this.selectedKey = "left";
                    this.left = true;
                    break;
                case "ArrowDown":
                case "S":
                case "s":
                    this.selectedKey = "down";
                    this.down = true;
                    break;
                case "ArrowRight":
                case "D":
                case "d":
                    this.selectedKey = "right";
                    this.right = true;
                    break;
                default:
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowUp":
                case "W":
                case "w":
                    this.up = false;
                    break;
                case "ArrowLeft":
                case "A":
                case "a":
                    this.left = false;
                    break;
                case "ArrowDown":
                case "S":
                case "s":
                    this.down = false;
                    break;
                case "ArrowRight":
                case "D":
                case "d":
                    this.right = false;
                    break;
                default:
                    break;
            }
        });
    }

    render() {
        return (
            <canvas ref={c => this.canvas = c}/>
        );
    }
}

export default SocialIsland;
