class Line {
    /**
     * 
     * @param {string} text 
     * @param {terminal} terminal 
     * @param {object} data 
     * 
     * @param {string} data.css
     * @param {number} data.speed
     * @param {string} data.elementType
     * @param {Array<element>} data.elements
     * @param {boolean} data.isPrompt
     * 
     * @typedef { Object } element
     * 
     * @returns {undefined}
     */
    constructor(text, terminal, data) {
        if(typeof text !== "string") return;
        
        this.text = text;
        this.css = data.css;
        this.speed = data.speed;

        this.elementType = data.elementType ? data.elementType : "pre";
        this.elements = data.elements;
        this.isPrompt = data.isPrompt;
        this.terminal = terminal;

        this.terminal.loadLine(this);

        this.showText();
    }

    async showText() {
        let lineElement = document.createElement(this.elementType);
        this.element = lineElement;  
        this.element.id = this.text;

        if(this.css) {
            this.css = this.css.replace("color: white;", "");
            this.css = this.css.replace("color: black;", "");
        }

        this.css = `color: ${color_themes[current_theme].text}; ${this.css ? this.css : ""}`;

        this.element.style = this.css;

        this.terminal.terminalDiv.appendChild(this.element);

        let elementIndex = 0;

        for(let i = 0; i <= this.text.length; i++) {
            if(i >= this.text.length && this.isPrompt) {
                this.element.innerHTML += "▭";
            }


            if(this.text[i] === "{" && this.text[i + 1] === "}") {
                i += 1;
                if(this.elements[elementIndex].element == undefined) {
                    this.element.innerHTML += "{" + this.text[i];

                    await sleep(this.speed ? this.speed : 20);
                    continue;
                }

                const text = this.elements[elementIndex].element.innerText;
                this.elements[elementIndex].element.innerHTML = this.elements[elementIndex].element.innerHTML.replace(text, "");

                this.element.innerHTML += this.elements[elementIndex].element.innerHTML;

                let id = this.elements[elementIndex].id;
                if(id) {
                    document.getElementById(id).innerText = "";
                    for(let j = 0; j < text.length; j++) {
                        try {
                            document.getElementById(id).innerText += text[j];

                            await sleep(this.speed ? this.speed : 50);
                        } catch(err) { 
                            console.log(err) 
                        }
                    }
                }

                elementIndex++;

                await sleep(this.speed ? this.speed : 20);

                continue;
            }

            if(this.text[i] == undefined) return;

            this.element.innerHTML += this.text[i];
            await sleep(this.speed ? this.speed : 50);
        }
    }

    async clear() {
        this.element.remove();
    }

    /**
     * 
     * @param {string} text 
     * @param {boolean} clearElements 
     */
    async editText(text, clearElements) {
        this.text += text;
        this.clear();

        if(clearElements) {
            this.elements = [];
            this.text.replaceAll("{}", "");
        }

        this.showText();
    }
}

//TODO : Implement later on
function mobileDevice() {

}