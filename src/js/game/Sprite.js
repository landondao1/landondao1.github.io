class Sprite {
    constructor(canvas, image, x, y, frames = {max: 1}, sprites) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        
        this.image = image;
        this.x = x;
        this.y = y;
        this.frames = {...frames, val: 0, elapsed: 0}
        this.sprites = sprites;
        this.moving = false;
    }

    hasCollided(obj) {
        return this.x + (this.image.width / this.frames.max) >= obj.x && this.x <= obj.x + obj.width && this.y <= obj.y + obj.height && this.y + this.image.height >= obj.y
    }

    willCollide(x, y, obj) {
        return this.x + x + (this.image.width / this.frames.max) >= obj.x && this.x + x <= obj.x + obj.width && this.y + y <= obj.y + obj.height && this.y + y + this.image.height >= obj.y
    }

    getFixedPositionOnCanvas(tileWidth) {
        return {x: (this.x * -1) + (this.canvas.width/2) - tileWidth, y: (this.y * -1) + (this.canvas.height/2)};
    }

    draw(animate=true, offset={x: 0, y: 0}) {
        this.context.drawImage(this.image, 
                                this.frames.val * (this.image.width / this.frames.max), 
                                0, 
                                this.image.width / this.frames.max,
                                this.image.height,
                                this.x + offset.x,
                                this.y + offset.y,
                                this.image.width / this.frames.max,
                                this.image.height);

        // Don't animate if not moving
        if (!animate) return;
        if (!this.moving) return;

        // Animate the sprite if more than 1 frame is found in the image
        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max-1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}

export default Sprite;