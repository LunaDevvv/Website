

let users = localStorage.getItem("users");
if(!users) users = { "root": "" };

function init() {
    const MAIN_TERMINAL_SCRIPT = document.createElement("script");
    MAIN_TERMINAL_SCRIPT.src = "./js/linux_recreation/terminal/main.js";
    MAIN_TERMINAL_SCRIPT.onload = () => console.log("[LOG]: Terminal Created!");
    document.body.appendChild(MAIN_TERMINAL_SCRIPT);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
