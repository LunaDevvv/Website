class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const INFINITY = 1000000;
        this.top = -INFINITY;
        this.bottom = INFINITY;

        const TOP_LEFT = { x: this.left, y: this.top };
        const TOP_RIGHT = { x: this.right, y: this.top };
        const BOTTOM_LEFT = { x: this.left, y: this.bottom };
        const BOTTOM_RIGHT = { x: this.right, y: this.bottom };
        this.borders = [
            [TOP_LEFT, BOTTOM_LEFT],
            [TOP_RIGHT, BOTTOM_RIGHT],
        ];
    }

    getLaneCenter(laneIndex) {
        const LANE_WIDTH = this.width / this.laneCount;
        return this.left + LANE_WIDTH / 2 + laneIndex * LANE_WIDTH;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 1; i <= this.laneCount - 1; i++) {
            const X = lerp(this.left, this.right, i / this.laneCount);

            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(X, this.top);
            ctx.lineTo(X, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach((border) => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);

            ctx.stroke();
        });
    }
}
