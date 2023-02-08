//* Get elements from DOM
const canvas = document.getElementById("gameCanvas");
const codeText = document.getElementById("code");
const ErrorArea = document.getElementById("ErrorArea");
const codeDiv = document.getElementById("codeDiv");

let fullscreen = false;

let objects = [];

//* Set up the canvas
canvas.width = 600;
canvas.height = 337;
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.strokeRect(50, 35, 50, 50);

codeDiv.addEventListener("keydown", (ev) => {
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

codeText.addEventListener("keydown", (ev) => {
    if (ev.key == "Tab") {
        codeText.value += "  ";
        ev.preventDefault();
    }
})

const codeHandle = new codeRunner();

function handleCode() {
    codeHandle.setCode(codeText.value);
    codeHandle.runCode();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function evol(code) {
    ErrorArea.innerText = "";
    try {
        eval(code);
    } catch (err) {
        console.log(err);
        const element = document.createElement("p");
        element.innerText = err.message + ": line " + err.lineNumber;
        element.style.backgroundColor = "darkred";

        ErrorArea.appendChild(element);
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
        codeDiv.style.display = "none";
        document.getElementsByTagName("body")[0].style.display = "block";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        fullscreen = true;
        handleCode();
        return;
    }

    codeDiv.style.display = "";
    document.getElementsByTagName("body")[0].style.display = "flex";
    objects = [];
    fullscreen = false;
    canvas.width = 600;
    canvas.height = 337;
}