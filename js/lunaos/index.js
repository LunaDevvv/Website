/**
 * @typedef {import("./bottomBar/bottomBar")}
 * @typedef {import("./windows/window")} luna_window
 */

let desktop = document.getElementById("desktop");

desktop.style.height = `${window.innerHeight}px`;
document.body.style.backgroundImage = "url(\"../../photos/LunaOS/backgrounds/desktop.jpg\")";
document.body.style.backgroundSize = "100% 100%";

desktop.style.position = "static";

desktop.clientLeft = "0px";
desktop.style.zIndex = "0";

desktop.style.padding = "none";
desktop.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;

desktop.addEventListener("contextmenu", (ev) => {
    ev.preventDefault();

    const context_div = document.createElement("div");

    context_div.style.width = "100px";
    context_div.style.height = "150px";
    context_div.style.backgroundColor = "darkSlateGray";
    context_div.style.position = "absolute";
    context_div.style.zIndex = "100";
    context_div.id = "desktopContextMenu";

    context_div.style.borderRadius = "5px";
    context_div.style.opacity = "80%";
    context_div.style.filter = "10px";
    
    context_div.style.left = `${ev.x}px`;
    context_div.style.top = `${ev.y}px`;

    let settings_button = document.createElement("button");

    settings_button.textContent = "settings";
    settings_button.style.width = "100%";
    settings_button.style.fontSize = "15px";
    settings_button.style.background = "none";
    settings_button.style.border = "none";
    settings_button.style.color = "white";

    settings_button.onclick = () => {
        document.getElementById("settings").click();

        context_div.remove();
    }

    settings_button.onmouseenter = () => {
        settings_button.style.borderRadius = "5px";
        settings_button.style.backgroundSize = "100% 40px";
        settings_button.style.backgroundColor = "gray";
    }

    settings_button.onmouseleave = () => {
        settings_button.style.background = "none";   
    }


    let terminal_button = document.createElement("button");

    terminal_button.textContent = "terminal";
    terminal_button.style.paddingTop = "3px";
    terminal_button.style.width = "100%";
    terminal_button.style.fontSize = "15px";
    terminal_button.style.background = "none";
    terminal_button.style.border = "none";
    terminal_button.style.color = "white";

    terminal_button.onclick = () => {
        document.getElementById("terminal").click();

        context_div.remove();
    }

    terminal_button.onmouseenter = () => {
        terminal_button.style.borderRadius = "5px";
        terminal_button.style.backgroundSize = "100% 40px";
        terminal_button.style.backgroundColor = "gray";
    }

    terminal_button.onmouseleave = () => {
        terminal_button.style.background = "none";   
    }

    context_div.appendChild(settings_button);
    context_div.appendChild(terminal_button);
    document.body.appendChild(context_div);
});

desktop.addEventListener("mousedown", (ev) => {
    let contextmenu = document.getElementById("desktopContextMenu");
    if(!contextmenu) return;

    contextmenu.remove();
})


let command_window = undefined;
let settings_window = undefined;

let bottomBar = new BottomBar();

window.addEventListener("resize", (ev) => {
    bottomBar.onResize();
})


bottomBar.appendButton("../../photos/LunaOS/bottomBar/settingsButton.png", "settings", async () => {
    document.body.style.cursor = "wait";
    if(typeof settings_function == "undefined") {
        const settings_command_class = document.createElement("script");
        settings_command_class.src = "./js/lunaos/applications/settings/settings_window.js";

        document.head.appendChild(settings_command_class);

        while(typeof settings_function == "undefined") {
            await sleep(5);
        }
    }
    document.body.style.cursor = "default";

    if(settings_window != undefined) {
        console.log(settings_window);
        settings_window = settings_window.update();
        settings_window.minimize();
        return;
    }

    const STARTING_X = 100;
    const STARTING_Y = 100;
    const STARTING_HEIGHT = 800;
    const STARTING_WIDTH = 800;
    const MIN_HEIGHT = 500;
    const MIN_WIDTH = 500;

    settings_window = new luna_window("Settings", STARTING_X, STARTING_Y, STARTING_HEIGHT, STARTING_WIDTH, MIN_WIDTH, MIN_HEIGHT, settings_function, async() => {
        settings_window = undefined;
    })

});

bottomBar.appendButton("../../photos/LunaOS/bottomBar/terminal.png", "terminal", async () => {
    document.body.style.cursor = "wait";

    if(typeof console_function == "undefined") {
        const clear_command_class = document.createElement("script");
        clear_command_class.src = "./js/lunaos/applications/command_window/command_window.js";

        document.head.appendChild(clear_command_class);

        while(typeof import_scripts == "undefined") {
            await sleep(5);
        }

        await import_scripts();
    
        while(typeof terminal == "undefined" || typeof Line == "undefined") {
            await sleep(5);
        }
    }

    document.body.style.cursor = "default";
    if(command_window != undefined) {
        command_window = command_window.update();
        command_window.minimize();

        // command_window.window_holder.style.top = command_window.y + "px";
        // command_window.window_holder.style.left = command_window.x + "px";
        return;   
    }

    const STARTING_X = 100;
    const STARTING_Y = 100;
    const STARTING_HEIGHT = 1000;
    const STARTING_WIDTH = 1200;
    const MIN_HEIGHT = 300;
    const MIN_WIDTH = 300;


    command_window = new luna_window("Command Prompt", STARTING_X, STARTING_Y, STARTING_HEIGHT, STARTING_WIDTH, MIN_HEIGHT, MIN_WIDTH, console_function, async () => {
        command_window = undefined;
    });
    
});