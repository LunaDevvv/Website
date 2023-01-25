class Line {
    text = "";

    constructor(text, css, speed, type = "pre", ...elements) {
        text = text;

        if (typeof text !== "string") return;

        this.text = text;
        this.css = css;
        this.speed = speed;
        this.type = type;
        this.elements = elements;

        Terminal.loadLine(this);

        this.showText();
    }

    async showText() {
        let textp = document.createElement(this.type);
        this.element = textp;
        textp.id = this.text;
        textp.style = this.css;
        terminalDiv.appendChild(textp);

        let elementNumber = 0;
        for (let i = 0; i < this.text.length; i++) {
            if (this.text[i] === "{" && this.text[i + 1] === "}") {
                textp.innerHTML += this.elements[elementNumber].innerHTML;
                i += 2;
                elementNumber++;
                sleep(this.speed ? this.speed : 50)
            }
            textp.innerHTML += this.text[i];
            await sleep(this.speed ? this.speed : 50);
        }
    }

    clear() {
        this.element.remove();
    }
}