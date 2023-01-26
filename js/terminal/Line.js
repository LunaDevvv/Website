class Line {
    text = "";
    elementBackup;
    constructor(text, css, speed, type = "pre", prompt = false, ...elements) {
        //* Constructor mainly just sets variables
        text = text;

        if (typeof text !== "string") return;

        this.text = text;
        this.css = css;
        this.speed = speed;
        this.type = type;
        this.elements = elements;
        this.elementBackup = elements;
        this.prompt = prompt;

        Terminal.loadLine(this);

        this.showText();
    }

    async showText() {
        //* Creating the text element, and if they are on a mobile device remove the {} from the ID
        let textp = document.createElement(this.type);
        this.element = textp;
        if (mobileDevice()) textp.id = this.text.replace(" {}", "");
        else textp.id = this.text;
        textp.style = this.css;
        terminalDiv.appendChild(textp);

        //* Scroll to the bottom of the page
        //! I dont know why, but this just decides to not work sometimes.
        window.scrollTo(0, document.body.scrollHeight);

        //* Go through the text, and only show 1 character at a specified time interval.
        let elementNumber = 0;
        for (let i = 0; i <= this.text.length; i++) {
            if (!this.elements) {
                this.elements = this.elementBackup;
                console.log(this.elementBackup);
            }
            if (i >= this.text.length && this.prompt) {
                textp.innerHTML += "▭";
                continue;
            }
            else if (i == this.text.length) return;
            //* if {} is detected, replace it with one of the elements given.
            if (this.text[i] === "{" && this.text[i + 1] === "}") {
                if (this.elements[elementNumber] == undefined) {
                    console.log("missing element");
                    i += 1;
                    sleep(this.speed ? this.speed : 50);
                    continue;
                }

                const text = this.elements[elementNumber].element.innerText;
                this.elements[elementNumber].innerHTML = this.elements[elementNumber].element.innerHTML.replace(text, "");
                textp.innerHTML += this.elements[elementNumber].element.innerHTML;

                let id = this.elements[elementNumber].id;
                document.getElementById(id).innerText = "";
                if (id) {
                    for (let j = 0; j < text.length; j++) {
                        try {
                            document.getElementById(id).innerText += text[j];
                            await sleep(this.speed ? this.speed : 50);
                        } catch (err) { console.error(err) }
                    }
                }


                i += 1;
                elementNumber++;
                await sleep(this.speed ? this.speed : 50);
                continue;
            }
            if (this.text[i] === undefined) return;
            textp.innerHTML += this.text[i];
            await sleep(this.speed ? this.speed : 50);
        }
    }

    //* Clear the lines content.
    clear() {
        this.element.remove();
    }


    //! Only adds text currently.
    //* Adds text to the end of the string
    //TODO Update to be fully editing.
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