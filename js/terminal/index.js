const terminalDiv = document.getElementById("terminal");

let textArray = `
Developed by ShiroDev.
  /$$$$$$  /$$       /$$                     /$$$$$$$                      
 /$$__  $$| $$      |__/                    | $$__  $$                     
| $$  \\__/| $$$$$$$  /$$  /$$$$$$   /$$$$$$ | $$  \\ $$  /$$$$$$  /$$    /$$
|  $$$$$$ | $$__  $$| $$ /$$__  $$ /$$__  $$| $$  | $$ /$$__  $$|  $$  /$$/
 \\____  $$| $$  \\ $$| $$| $$  \\__/| $$  \\ $$| $$  | $$| $$$$$$$$ \\  $$/$$/ 
 /$$  \\ $$| $$  | $$| $$| $$      | $$  | $$| $$  | $$| $$_____/  \\  $$$/  
|  $$$$$$/| $$  | $$| $$| $$      |  $$$$$$/| $$$$$$$/|  $$$$$$$   \\  $/   
 \\______/ |__/  |__/|__/|__/       \\______/ |_______/  \\_______/    \\_/ 
 
   /\\   /\\
  //\\\\_//\\\\     ____
  \\_     _/    /   /
   / * * \\    /^^^]
   \\_\\O/_/    [   ]
    /   \\_    [   /
    \\     \\_  /  /
     [ [ /  \\/ _/
    _[ [ \\  /_/`.split("\n");

console.log("Run Terminal.clearLines() to clear terminal.\n Run showHeader to make a new header appear");
console.log("Key for creating a line : ");
console.log(`new Line("text", "css", mstime = 20, /* html tag type */ "pre" /*extra elements*/);`)

const Terminal = new terminal();
let waiting = true;

async function showHeader() {
    console.log('in development');

    new Line("ShiroDev-Console ~ In development", `font-size: xx-large; color : red;`, 25);

    for (let i = 0; i < textArray.length; i++) {
        new Line(textArray[i], `font-family: monospace; line-height:3px; color : blue;`, 10);
    }

    let help = document.createElement("pre");
    help.innerHTML = "<span style=\"color : blue;\">'help'</span>";
    new Line(`Type {} for help with commands`, "", 20, "pre", help);

    await sleep(1000);
    waiting = false;
}

let typing = false;

document.addEventListener("keydown", (ev) => {
    takeInput(ev);
})

async function takeInput(ev) {
    if (waiting != false) {
        return;
    }
    if (!typing) {
        console.log("hello?");
        new Line("Hello ~ ", "", 25, undefined);
        waiting = true;
        await sleep(225);
        waiting = false;
        typing = true;
    }

    if (ev.key == "shift") return;

    if (ev.shiftKey) {
        document.getElementById("Hello ~ ").textContent += ev.key.toUpperCase();
    }

    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}