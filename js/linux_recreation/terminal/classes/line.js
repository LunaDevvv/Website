class Line {
    /**
        * @param {string} TEXT
        * @param {terminal} TERMINAL
    */
    constructor(TEXT, TERMINAL) {
        if(typeof TEXT !== "string") throw new Error("[ERROR]: TEXT field must be a string");

        this.text = TEXT;
        this.TERMINAL = TERMINAL;

        this.createLine();
    }

    createLine() {
        let thisLine = document.createElement("p");
        thisLine.innerText = this.text;
        this.line = thisLine;
        this.line.style.fontFamily = "\"Lucida Console\", \"Courier New\", monospace";
        this.line.style.fontSize = "12px";
        this.line.style.margin = "0";
        this.TERMINAL.loadLine(this);
    }
}
