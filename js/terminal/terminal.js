class terminal {
    lines = [];

    constructor() {

    }

    //* Load a line.
    loadLine(Line) {
        this.lines.push(Line);
    }

    //* Clear the lines 1-by-1 until all of them are gone
    async clearLines() {
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i].clear();
            await sleep(5);
        }

        //* Reset the lines array so that the old non-existant lines are gone.
        this.lines = [];

        return;
    }
}