const terminalDiv = document.getElementById("terminal");

let textArray = `
Developed by ShiroDev. Commands are case Sensitive.
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

console.log('in development');
console.log("Run Terminal.clearLines() to clear terminal.\n Run showHeader to make a new header appear");
console.log("Key for creating a line : ");
console.log(`new Line("text", "css", mstime = 20, /* html tag type */ "pre" /*extra elements*/);`)

const Terminal = new terminal();
let waiting = true;

async function showHeader() {

    new Line("ShiroDev-Console ~ In development", `font-size: xx-large; color : red;`, 25);

    for (let i = 0; i < textArray.length; i++) {
        new Line(textArray[i], `font-family: monospace; line-height:3px; color : blue;`, 10);
    }

    let help = document.createElement("pre");
    help.innerHTML = "<span style=\"color : blue;\">'help'</span>";
    new Line(`Type {} for help with commands`, "", 20, "pre", help);

    await sleep(1000);
    waiting = false;
    takeInput();

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
        new Line("Hello ~ ", "", 25, undefined);
        waiting = true;
        await sleep(225);
        document.getElementById("Hello ~ ").innerText = document.getElementById("Hello ~ ").innerText += "▭";
        waiting = false;
        typing = true;
    }


    if (!ev) return;
    if (!(ev.keyCode >= 48 && ev.keyCode <= 57 || ev.keyCode == 96) && !(ev.keyCode >= 65 && ev.keyCode <= 90) && !(ev.keyCode >= 97 && ev.keyCode <= 122) && ev.keyCode != 32 && ev.keyCode != "13" && ev.keyCode != 8) return;
    document.getElementById("Hello ~ ").innerText = document.getElementById("Hello ~ ").innerText.replace("▭", "");
    if (ev.key === "Backspace") {
        if (document.getElementById("Hello ~ ").textContent == "Hello ~ ") return document.getElementById("Hello ~ ").textContent = document.getElementById("Hello ~ ").textContent += "▭";
        document.getElementById("Hello ~ ").textContent = document.getElementById("Hello ~ ").textContent.slice(0, -1);
        return document.getElementById("Hello ~ ").textContent = document.getElementById("Hello ~ ").textContent += "▭";
    }

    if (ev.key == "Enter") {
        typing = false;
        let text = document.getElementById("Hello ~ ").textContent.replace("Hello ~ ", "");
        document.getElementById("Hello ~ ").id = "";
        return parseInput(text);
    }

    if (ev.shiftKey) {
        document.getElementById("Hello ~ ").textContent += ev.key.toUpperCase() + "▭";
        return;
    }

    document.getElementById("Hello ~ ").textContent += ev.key += "▭";
    return;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function parseInput(text) {
    waiting = true;

    switch (text) {
        case "clear":
            Terminal.clearLines();
            waiting = false;
            return takeInput();

        case "help":
            new Line("Current commands : ", undefined, 20);
            new Line("clear : Clears the terminal", `color : green`, 20);
            new Line("help : Sends info on current commands", `color : orange`, 20);
            new Line("header : Shows the header", "color : red", 20);
            new Line("home : Return to the home page", "color : white", 20);
            await sleep(1200);

            waiting = false;
            return takeInput();

        case "header":
            showHeader();
            waiting = false;
            return;

        case "home":
            return window.location.href = "/";

        default:
            let timedText = `Command not found : ${text}`;
            new Line("Command not found : " + text, "color : red", 20);

            await sleep(timedText.length * 22);

            waiting = false;
            return takeInput();
    }
}