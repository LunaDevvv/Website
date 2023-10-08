class terminalInstance {
    constructor(passwordPrompt, takingInput, currentDir, promptText, TERMINAL) {
        this.passwordPrompt = passwordPrompt;
        this.takingInput = takingInput;
        this.currentDir = "~/";
        this.promptText = "";
        if(TERMINAL) {
            this.TERMINAL = TERMINAL;
        } else {
            this.TERMINAL = new terminal();
        }

        this.currentLine = undefined;
        this.editPos = 0;
        this.currentText = `${this.currentDir}`;

        document.addEventListener("keydown", triggerInput);
    }

    setTakingInput(bool) {
        this.takingInput = true;
    }

    /**
        * @param {KeyboardEvent} ev
    */
    async #triggerInput(ev) {
        if(this.takingInput = false) return;

        let lineText

        this.#handleInput(ev);
    }

    /**
        * @param {KeyboardEvent} key
    */
    async #handleInput(key) {

    }

}
