let body = document.getElementById("body");

body.style.backgroundImage = "url(\"../../photos/LunaOS/backgrounds/desktop.jpg\")";

body.style.backgroundSize = "100% 100%";

let command_window = undefined;

let bottomBar = new BottomBar();

window.addEventListener("resize", (ev) => {
    bottomBar.onResize();
})


bottomBar.appendButton("../../photos/LunaOS/bottomBar/settingsButton.png", async () => {
    console.log("button pressed!");
});

bottomBar.appendButton("../../photos/LunaOS/bottomBar/terminal.png", async () => {
    document.body.style.cursor = "wait";
    if(typeof terminal == "undefined") {
        const clear_command_class = document.createElement("script");
        clear_command_class.src = "./js/lunaos/applications/command_window/command_window.js";
        clear_command_class.id = "command_window_function";

        document.head.appendChild(clear_command_class);

        while(typeof import_scripts == "undefined") {
            await sleep(5);
        }

        await import_scripts();
    
        while(typeof terminal == "undefined" || typeof Line == "undefined") {
            await sleep(5);
        }
    }

    if(command_window != undefined) {
        command_window = command_window.update();
        command_window.minimize();

        command_window.window_holder.style.top = command_window.y + "px";
        command_window.window_holder.style.left = command_window.x + "px";
        return;   
    }

    const STARTING_X = 1000;
    const STARTING_Y = 100;
    const STARTING_HEIGHT = 1000;
    const STARTING_WIDTH = 1200;
    const MIN_HEIGHT = 300;
    const MIN_WIDTH = 300;

    document.body.style.cursor = "default";

    command_window = new luna_window("Command Prompt", STARTING_X, STARTING_Y, STARTING_HEIGHT, STARTING_WIDTH, MIN_HEIGHT, MIN_WIDTH, console_function, async () => {
        command_window = undefined;
    });
    
});