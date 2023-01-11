// Creating the Car class
class Car {
    constructor(x, y, width, height, controlBool, useBrain) {
        // Unchanging variabled
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Changing variabled
        this.speed = 0;
        this.acceleration = 0;
        this.maxSpeed = 6;
        this.friction = 0.5;
        this.angle = 0;
        this.damaged = false;

        // Checking if we should be watching this car
        this.bestCar = false;

        // Checking if the player is controlling or the brain is being used.
        if (controlBool || useBrain) {
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 6, 4]);
        }

        // Checking if useBrain is true
        if (useBrain == true) {
            this.useBrain = true;
        }

        // Creating controls.
        this.controls = new Controls(controlBool);
        if (!controlBool && !useBrain) {
            this.maxSpeed = 4;
        }
    }

    // Update function
    update(roadBorders, traffic) {
        // Checking if the car is damaged
        if (!this.damaged) {
            // If it isn't damaged move the car.
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders, traffic);
        }

        // Updating the sensor
        if (this.sensor) {
            this.sensor.update(roadBorders, traffic);

            // Getting offsets
            const offsets = this.sensor.readings.map((s) =>
                s == null ? 0 : 1 - s.offset
            );
            const outputs = NeuralNetwork.feedForward(offsets, this.brain);

            // Checking if useBrain is true
            if (this.useBrain) {
                this.controls.forward = outputs[0];
                this.controls.left = outputs[1];
                this.controls.right = outputs[2];
                this.controls.reverse = outputs[3];
            }
        }
    }

    draw(ctx, color, drawSensor = false) {
        // Changing car color if it is damaged
        if (this.damaged) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = color;
        }

        // Start drawing the car
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);

        // Move to all polygon corners
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }

        // Fill the polygon
        ctx.fill;

        // If it has a sensor and is told to draw them, draw the sensor.
        if (this.sensor && drawSensor) {
            this.sensor.draw(ctx);
        }
    }

    // Moving the car
    #move() {
        // Move the car based off of the controls.
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }

        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;

            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }

            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    // Checking damage
    #assessDamage(roadBorders, traffic) {
        // Going through checking the roadboarders
        for (var i = 0; i < roadBorders.length; i++) {
            // Checking if the polygons intersect with the border
            if (polysIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }

        // Checking if the polygons intersect with traffic
        for (var i = 0; i < traffic.length; i++) {
            if (polysIntersect(this.polygon, traffic[i].polygon)) {
                console.log("Intercept");
                return true;
            }
        }

        return false;
    }

    // Creating a polygon
    #createPolygon() {
        // Creating an array for the points
        const points = [];

        // Some wierd math
        const radius = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);

        // Adding all of the points.
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * radius,
            y: this.y - Math.cos(this.angle + alpha) * radius,
        });

        points.push({
            x: this.x - Math.sin(this.angle - alpha) * radius,
            y: this.y - Math.cos(this.angle - alpha) * radius,
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * radius,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * radius,
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * radius,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * radius,
        });

        return points;
    }
}
