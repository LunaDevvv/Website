class terminal {
    lines = [];

    /**
        * @param {HTMLDivElement} TERMINAL_DIV
        *
    */
    constructor(TERMINAL_DIV) {
        if(!TERMINAL_DIV) throw new TypeError("[ERROR]: Terminal Div undefined!");

        this.terminal_div = TERMINAL_DIV;
        this.currentDir = "~/";
        this.takingInput = false;
        this.currentInput = "";
        this.currentLine = undefined;
        this.currentPos = 0;
        this.currentUser = "";
        this.inputData = {
            passwordPrompt: false,
            currentPrompt: undefined
        }

        this.prependText = "";

        document.body.addEventListener("keydown", (ev) => {
            this.handleInput(ev);
        });
    }

    /**
        * @param {object} data
        *
        * @param {string | undefined} data.currentPrompt
        * @param {boolean | undefined} data.passwordPrompt
        * @param {function} data.finishFunction
    */
    takeInput(data) {
        this.inputData = {};
        this.prependText = "";
        this.currentLine = undefined;
        this.currentInput = "";
        this.takingInput = true;
        this.inputData.currentPrompt = data.prompt;
        this.inputData.passwordPrompt = data.passwordPrompt;
        this.inputData.finishFunction = data.finishFunction;
        this.handleInput(undefined);
    }

    /**
        * @param {object} data
        *
        * Tells weather or not to disable visibility of current prompt.
        * (WARNING: OVERRIDES ALL OTHER OPTIONS)
        * @param {boolean | undefined} data.passwordPrompt;
        *
        * Tells the console to use a prepended string
        * (WARNING: OVERRIDES DIR TEXT)
        * @param {string | undefined} data.inputPrompt
    */

    /**
        * @param {KeyboardEvent} ev
    */
    async handleInput(ev) {
        if(!this.takingInput) return;

        if(!this.currentLine) {
            let prependText = "";

            if(this.passwordPrompt && this.currentUser !== "" && !this.inputData.currentPrompt) prependText = `[PROMPT] password for ${this.currentUser}: `;
            else if(this.inputData.currentPrompt) prependText = this.inputData.currentPrompt;
            else prependText = this.currentDir;

            this.prependText = prependText;

            this.currentLine = new Line(`${prependText}`, this);
        }

        if(ev == undefined) return;

        let key = ev.key;

        if(key.length == 1) {
            this.currentInput += key;
            if(this.inputData.passwordPrompt == false) {
                this.currentLine.line.innerText = `${this.prependText}${this.currentInput}`;
            }
        }

        if(key == "Backspace") {
            this.currentInput = this.currentInput.substring(0, this.currentInput.length - 1);
            if(this.inputData.passwordPrompt == false) {
                this.currentLine.line.innerText = `${this.prependText}${this.currentInput}`;
            }
        }

        if(key == "Enter") {
            this.takingInput = false;
            this.inputData.finishFunction(this.currentInput);
        }
    }

    /**
        * @param {Line} line
    */
    loadLine(line) {
        this.terminal_div.appendChild(line.line);

        this.lines.push(line.line);
    }

    clearLines() {
        this.lines = [];
        this.terminal_div.innerText = "";
    }
}
