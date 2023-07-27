//* Get elements from DOM
const CANVAS = document.getElementById("gameCanvas");
const CODE_TEXT = document.getElementById("code");
const ERROR_AREA = document.getElementById("ErrorArea");
const CODE_DIV = document.getElementById("codeDiv");

let fullscreen = false;

let objects = [];

//* Set up the canvas
CANVAS.width = 600;
CANVAS.height = 337;
const CTX = CANVAS.getContext('2d');

CTX.beginPath();
CTX.strokeRect(50, 35, 50, 50);

CODE_DIV.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey && ev.key == "s") {
        ev.preventDefault();

        handleCode();
    }
});

document.addEventListener("keydown", (ev) => {
    if (ev.key == "F6") {
        ev.preventDefault();
        setFullscreen();
    }
})

CODE_TEXT.addEventListener("keydown", (ev) => {
    if (ev.key == "Tab") {
        CODE_TEXT.value += "  ";
        ev.preventDefault();
    }
})

const CODE_HANDLE = new codeRunner();

function handleCode() {
    CODE_HANDLE.setCode(CODE_TEXT.value);
    CODE_HANDLE.runCode();
}

function clearCanvas() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

function evol(code) {
    ERROR_AREA.innerText = "";
    try {
        eval(code);
    } catch (err) {
        console.log(err);
        const ELEMENT = document.createElement("p");
        ELEMENT.innerText = err.message + ": line " + err.lineNumber;
        ELEMENT.style.backgroundColor = "darkred";

        ERROR_AREA.appendChild(ELEMENT);
    }
}

requestAnimationFrame(main);

function main() {
    clearCanvas();
    for (let i = 0; i < objects.length; i++) {
        objects[i].checks();
    }

    requestAnimationFrame(main);
}

function setFullscreen() {
    if (!fullscreen) {
        CODE_DIV.style.display = "none";
        document.getElementsByTagName("body")[0].style.display = "block";
        CANVAS.width = window.innerWidth;
        CANVAS.height = window.innerHeight;
        fullscreen = true;
        handleCode();
        return;
    }

    CODE_DIV.style.display = "";
    document.getElementsByTagName("body")[0].style.display = "flex";
    objects = [];
    fullscreen = false;
    CANVAS.width = 600;
    CANVAS.height = 337;
}