class Line {
    text = "";

    constructor(text, css, speed, type = "pre", prompt = false, ...elements) {
        text = text;

        if (typeof text !== "string") return;

        this.text = text;
        this.css = css;
        this.speed = speed;
        this.type = type;
        this.elements = elements;
        this.prompt = prompt;

        Terminal.loadLine(this);

        this.showText();
    }

    async showText() {

        let textp = document.createElement(this.type);
        this.element = textp;
        if (mobileDevice()) textp.id = this.text.replace(" {}", "");
        else textp.id = this.text;
        textp.style = this.css;
        terminalDiv.appendChild(textp);

        let elementNumber = 0;
        for (let i = 0; i <= this.text.length; i++) {

            if (i >= this.text.length && this.prompt) {
                textp.innerHTML += "▭";
                continue;
            }
            else if (i == this.text.length) return;

            if (this.text[i] === "{" && this.text[i + 1] === "}") {
                if (!this.elements[elementNumber]) {
                    i += 1;
                    sleep(this.speed ? this.speed : 50);
                    continue;
                }
                textp.innerHTML += this.elements[elementNumber].innerHTML;
                i += 2;
                elementNumber++;
                sleep(this.speed ? this.speed : 50);
            }
            if (this.text[i] === undefined) return;
            textp.innerHTML += this.text[i];
            await sleep(this.speed ? this.speed : 50);
        }
    }

    clear() {
        this.element.remove();
    }

    editText(text, clearElements) {
        this.text += text;

        this.clear();
        if (clearElements) {
            this.elements = [];
            this.text = this.text.replaceAll("{} ", "");
        }
        this.showText();

    }
}