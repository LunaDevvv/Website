class terminal {
    /**
     * @type {Array<Line>}
     */
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

    async updateLineColors() {
        for(let i = 0 ; i < this.lines.length; i++) {
            this.lines[i].editText("");

            await sleep(10);
        }

        return;
    }

    async clearLines() {
        let CLEAR_SLEEP_TIME = 10;
        while(this.terminalDiv.firstChild) {
            this.terminalDiv.removeChild(this.terminalDiv.firstChild);
    
            await sleep(CLEAR_SLEEP_TIME);
        }
    }
}