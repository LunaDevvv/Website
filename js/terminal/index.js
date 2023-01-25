const terminalDiv = document.getElementById("terminal");

let textArray = `
Developed by ShiroDev. Commands are case Sensitive. No touch screen compatibility.
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
    _[ [ \\  /_/
Welcome to my websites terminal!`.split("\n");

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
    new Line(`Type {} for help with commands`, "", 20, "pre", false, help);

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
        new Line("ShiroDev.dev ~ ", "", 25, undefined, true);
        waiting = true;
        waiting = false;
        typing = true;
    }


    if (!ev) return;
    if (!(ev.keyCode >= 48 && ev.keyCode <= 57 || ev.keyCode == 96) && !(ev.keyCode >= 65 && ev.keyCode <= 90) && !(ev.keyCode >= 97 && ev.keyCode <= 122) && ev.keyCode != 32 && ev.keyCode != "13" && ev.keyCode != 8) return;
    document.getElementById("ShiroDev.dev ~ ").innerText = document.getElementById("ShiroDev.dev ~ ").innerText.replace("▭", "");
    if (ev.key === "Backspace") {
        if (document.getElementById("ShiroDev.dev ~ ").textContent == "ShiroDev.dev ~ ") return document.getElementById("ShiroDev.dev ~ ").textContent = document.getElementById("ShiroDev.dev ~ ").textContent += "▭";
        document.getElementById("ShiroDev.dev ~ ").textContent = document.getElementById("ShiroDev.dev ~ ").textContent.slice(0, -1);
        return document.getElementById("ShiroDev.dev ~ ").textContent = document.getElementById("ShiroDev.dev ~ ").textContent += "▭";
    }

    if (ev.key == "Enter") {
        typing = false;
        let text = document.getElementById("ShiroDev.dev ~ ").textContent.replace("ShiroDev.dev ~ ", "");
        document.getElementById("ShiroDev.dev ~ ").id = "";
        return parseInput(text);
    }

    if (ev.shiftKey) {
        document.getElementById("ShiroDev.dev ~ ").textContent += ev.key.toUpperCase() + "▭";
        return;
    }

    document.getElementById("ShiroDev.dev ~ ").textContent += ev.key += "▭";
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
            new Line("inspiration : Shows the websites that inspired me to make this", "color : yellow;", 10);
            new Line("mespyr : Opens a new tab with mespyr.github.io searched", "color : pink", 10);
            new Line("fkcodes : Opens a new tab with fkcodes.com seached", "color : brown", 15);
            new Line("sudo : Makes more commands available (Warning : Commands are in development)", "color : gray", 15);
            await sleep(1200);

            waiting = false;
            return takeInput();

        case "header":
            showHeader();
            waiting = false;
            return;

        case "home":
            return window.location.href = "/";

        case "mespyr":
            window.open("https://mespyr.github.io", "_blank");
            waiting = false;
            return takeInput();

        case "fkcodes":
            window.open("https://fkcodes.com/", "_blank");

            waiting = false;
            return takeInput();

        case "inspiration":
            new Line("This website was inspired by : ", "color : blue;", 20);
            new Line("mespyr.github.io (A friends website)", "color : red", 20);
            new Line("fkcodes.com (youtubers website)", "color : orange", 20);

            await sleep(1000);
            waiting = false;
            return takeInput();

        case "sudo":
            new Line("You thought", "color : red", 20);

            await sleep(600);

            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');

            waiting = false;
            return takeInput();

        default:
            let timedText = `Command not found : ${text}`;
            new Line("Command not found : " + text, "color : red", 20);

            await sleep(timedText.length * 22);

            waiting = false;
            return takeInput();
    }
}