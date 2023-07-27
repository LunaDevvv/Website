function lerp(A, B, T) {
    return A + (B - A) * T;
}

function getIntersection(A, B, C, D) {
    const T_TOP = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const U_TOP = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const BOTTOM = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (BOTTOM != 0) {
        const T = T_TOP / BOTTOM;
        const U = U_TOP / BOTTOM;

        if (T >= 0 && T <= 1 && U >= 0 && U <= 1) {
            return {
                x: lerp(A.x, B.x, T),
                y: lerp(A.y, B.y, T),
                offset: T,
            };
        }
    }

    return null;
}

function polysIntersect(poly1, poly2) {
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            const TOUCH = getIntersection(
                poly1[i],
                poly1[(i + 1) % poly1.length],
                poly2[j],
                poly2[(j + 1) % poly2.length]
            );

            if (TOUCH) {
                return true;
            }
        }
    }

    return false;
}

class Visualizer {
    static drawNetwork(ctx, network) {
        const MARGIN = 50;
        const LEFT = MARGIN;
        const TOP = MARGIN;
        const WIDTH = ctx.canvas.width - MARGIN * 2;
        const HEIGHT = ctx.canvas.height - MARGIN * 2;

        const LEVEL_HEIGHT = HEIGHT / network.levels.length;

        for (let i = network.levels.length - 1; i >= 0; i--) {
            const LEVEL_TOP =
                TOP +
                lerp(
                    HEIGHT - LEVEL_HEIGHT,
                    0,
                    network.levels.length == 1
                        ? 0.5
                        : i / (network.levels.length - 1)
                );

            ctx.setLineDash([7, 3]);
            Visualizer.drawLevel(
                ctx,
                network.levels[i],
                LEFT,
                LEVEL_TOP,
                WIDTH,
                LEVEL_HEIGHT,
                i == network.levels.length - 1 ? ["🠉", "🠈", "🠊", ""] : []
            );
        }
    }

    static drawLevel(ctx, level, left, top, width, height, outputLabels) {
        const RIGHT = left + width;
        const BOTTOM = top + height;

        const { inputs: INPUTS, outputs: OUTPUTS, weights: WEIGHTS, biases: BIASES } = level;

        for (let i = 0; i < INPUTS.length; i++) {
            for (let j = 0; j < OUTPUTS.length; j++) {
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNodeX(INPUTS, i, left, RIGHT),
                    BOTTOM
                );
                ctx.lineTo(Visualizer.#getNodeX(OUTPUTS, j, left, RIGHT), top);
                ctx.lineWidth = 2;
                ctx.strokeStyle = getRGBA(WEIGHTS[i][j]);
                ctx.stroke();
            }
        }

        const NODE_RADIUS = 18;
        for (let i = 0; i < INPUTS.length; i++) {
            const X = Visualizer.#getNodeX(INPUTS, i, left, RIGHT);
            ctx.beginPath();
            ctx.arc(X, BOTTOM, NODE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(X, BOTTOM, NODE_RADIUS * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = getRGBA(INPUTS[i]);
            ctx.fill();
        }

        for (let i = 0; i < OUTPUTS.length; i++) {
            const X = Visualizer.#getNodeX(OUTPUTS, i, left, RIGHT);
            ctx.beginPath();
            ctx.arc(X, top, NODE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(X, top, NODE_RADIUS * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = getRGBA(OUTPUTS[i]);
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.arc(X, top, NODE_RADIUS * 0.8, 0, Math.PI * 2);
            ctx.strokeStyle = getRGBA(BIASES[i]);
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]);

            if (outputLabels[i]) {
                ctx.beginPath();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "black";
                ctx.strokeStyle = "white";
                ctx.font = NODE_RADIUS * 1.5 + "px Arial";
                ctx.fillText(outputLabels[i], X, top + NODE_RADIUS * 0.1);
                ctx.lineWidth = 0.5;
                ctx.strokeText(outputLabels[i], X, top + NODE_RADIUS * 0.1);
            }
        }
    }

    static #getNodeX(nodes, index, left, right) {
        return lerp(
            left,
            right,
            nodes.length == 1 ? 0.5 : index / (nodes.length - 1)
        );
    }
}

function getRGBA(value) {
    const ALPHA = Math.abs(value);
    const R = value < 0 ? 0 : 255;
    const G = R;
    const B = value > 0 ? 0 : 255;
    return "rgba(" + R + "," + G + "," + B + "," + ALPHA + ")";
}
