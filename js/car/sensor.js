class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 200;
        this.raySpread = Math.PI / 3;

        this.rays = [];
        this.readings = [];
    }

    update(roadBorders, traffic) {
        this.#castRays();
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.#getReadings(this.rays[i], roadBorders, traffic)
            );
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.rayCount; i++) {
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }

        this.rays = [];
    }

    #castRays() {
        for (let i = 0; i < this.rayCount; i++) {
            const RAY_ANGLE =
                lerp(
                    this.raySpread / 2,
                    -this.raySpread / 2,
                    i / (this.rayCount - 1)
                ) + this.car.angle;

            const START = { x: this.car.x, y: this.car.y };
            const END = {
                x: this.car.x - Math.sin(RAY_ANGLE) * this.rayLength,
                y: this.car.y - Math.cos(RAY_ANGLE) * this.rayLength,
            };

            this.rays.push([START, END]);
        }
    }

    #getReadings(ray, roadBorders, traffic) {
        let touches = [];

        for (let i = 0; i < roadBorders.length; i++) {
            const TOUCH = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );

            if (TOUCH) {
                touches.push(TOUCH);
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            const POLY = traffic[i].polygon;

            for (let j = 0; j < POLY.length; j++) {
                const VALUE = getIntersection(
                    ray[0],
                    ray[1],
                    POLY[j],
                    POLY[(j + 1) % POLY.length]
                );

                if (VALUE) {
                    touches.push(VALUE);
                }
            }
        }

        if (touches.length == 0) {
            return null;
        } else {
            const OFFSETS = touches.map((e) => e.offset);

            const MIN_OFFSET = Math.min(...OFFSETS);
            return touches.find((e) => e.offset == MIN_OFFSET);
        }
    }
}
