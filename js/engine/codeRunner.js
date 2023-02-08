class codeRunner {
    constructor() {

    }

    setCode(code) {
        this.code = code;
        console.log(code);
    }

    runCode() {
        evol(this.code);
    }
}