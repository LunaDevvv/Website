class terminal {
    lines = [];

    constructor() {

    }

    loadLine(Line) {
        this.lines.push(Line);
    }

    clearLines() {
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i].clear();
        }
    }
}