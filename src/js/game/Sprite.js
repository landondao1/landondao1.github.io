class Sprite {
    constructor(context, image, x, y, frames = {max: 1}, sprites) {
        this.context = context;
        this.image = image;
        this.x = x;
        this.y = y;
        this.frames = {...frames, val: 0, elapsed: 0}
        this.sprites = sprites;
        this.moving = false;

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
    }

    hasCollided(obj) {
        return this.x + this.width >= obj.x && this.x <= obj.x + obj.width && this.y <= obj.y + obj.height && this.y + this.height >= obj.y
    }

    willCollide(x, y, obj) {
        return this.x + x + this.width >= obj.x && this.x + x <= obj.x + obj.width && this.y + y <= obj.y + obj.height && this.y + y + this.height >= obj.y
    }

    draw() {
        // console.info(this.image);
        this.context.drawImage(this.image, 
                                this.frames.val * this.width, 
                                0, 
                                this.image.width / this.frames.max,
                                this.image.height,
                                this.x,
                                this.y,
                                this.image.width / this.frames.max,
                                this.image.height);

        // Don't animate if not moving
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