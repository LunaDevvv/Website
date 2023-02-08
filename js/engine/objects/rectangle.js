class Rectangle {
    constructor(x, y, width, height, color, gravity, collision) {
        if (typeof (x || y || width || height) != "number") {
            return;
        }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = "rectangle";
        if (!collision) this.collision = false;
        this.collision = collision;
        this.gravity = gravity;

        this.colliding = false;

        this.id = Math.floor(Math.random() * 150000);

        this.draw();

        objects.push(this);
    }

    draw() {
        ctx.fillStyle = this.color;

        // if (this.colliding == true) this.color = "red";
        ctx.beginPath();
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checks() {
        let collided = false;
        if (this.gravity && this.y <= canvas.height - this.height) {
            this.y += 2;
        }

        if (this.y == canvas.height - this.height) {
            this.y = canvas.height - this.height;
        }

        for (let i = 0; i < objects.length; i++) {
            let box2 = objects[i];
            if (box2.id === this.id || box2.type !== "rectangle" || !box2.collision || !this.collision) continue;

            if (this.x + this.width >= box2.x
                && this.x <= box2.x + box2.width
                && this.y + this.height >= box2.y
                && this.y <= box2.y + box2.height) {
                this.colliding = true;
                collided = true;
            }
        }

        if (this.colliding) this.collision();

        this.draw()
    }
}