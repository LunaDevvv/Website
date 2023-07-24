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

desktop.addEventListener("contextmenu", context_menu_function);

document.addEventListener("mousedown", async (ev) => {
    let contextmenu = document.getElementById("desktopContextMenu");
    if(!contextmenu) return;

    await sleep(100);

    contextmenu.remove();
})


/**
 * @type {luna_window}
 */
let command_window = undefined;
/**
 * @type {luna_window}
 */
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

function updateColors() {
    reloadWindowColors();
    reloadBottomBarColors();
    if(command_window) {
        command_window.window_storage.terminal.updateLineColors();
    }
}