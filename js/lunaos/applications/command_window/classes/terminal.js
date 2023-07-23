class terminal {
    lines = [];
    current_path = "";

    /**
     * 
     * @param {HTMLDivElement} div
     * @param {string} path 
     */
    constructor(div, path = "/") {
        this.terminalDiv = div;
        this.waiting = false;
        this.typing = false;
        this.current_path = path
    }

    /**
     * 
     * @param {Line} line 
     */
    async loadLine(line) {
        this.lines.push(line);
    }

    async clearLines() {
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i].clear();
            await sleep(5);
        }

        this.lines = [];

        return;
    }
}