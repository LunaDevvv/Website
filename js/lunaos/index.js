/**
LunaOS - Web Desktop platform

BSD 2-Clause License

Copyright (c) 2023, LunaDevvv

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

* @author LunaDevvv <LunaDevvv@proton.me>
* @license Simplified BSD License
*/


/**
 * @typedef {import("./bottomBar/bottomBar")}
 * @typedef {import("./windows/window")} luna_window
 */

let desktop = document.getElementById("desktop");

/**
 * @typedef {import("./fileSystem/fileSystem")}
 */
let osFileSystem = new fileSystem();


desktop.style.height = `${window.innerHeight}px`;
document.body.style.backgroundImage = "url(\"/photos/LunaOS/backgrounds/desktop.jpg\")";
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

/**
 * @type {luna_window}
 */
let file_explorer_window = undefined;

let bottomBar = new BottomBar();

window.addEventListener("resize", (ev) => {
    bottomBar.onResize();
})


bottomBar.appendButton(icon_themes[current_icon_theme].settings, "settings", async () => {
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

bottomBar.appendButton(icon_themes[current_icon_theme].terminal, "terminal", async () => {
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

bottomBar.appendButton(icon_themes[current_icon_theme].file_explorer, "file_explorer", async() => {
    document.body.style.cursor = "wait";

    if(typeof file_explorer_function == "undefined") {
        const file_explorer_class = document.createElement("script");
        file_explorer_class.src = "./js/lunaos/applications/file_explorer/file_explorer.js";

        document.head.appendChild(file_explorer_class);

        while(typeof file_explorer_function == "undefined") {
            await sleep(5);
        }
    }

    document.body.style.cursor = "default";
    if(file_explorer_window != undefined) {
        file_explorer_window = file_explorer_window.update();
        file_explorer_window.minimize();
        
        return;   
    }

    const STARTING_X = 100;
    const STARTING_Y = 100;
    const STARTING_HEIGHT = 1000;
    const STARTING_WIDTH = 1200;
    const MIN_HEIGHT = 300;
    const MIN_WIDTH = 1200;

    file_explorer_window = new luna_window("File Explorer", STARTING_X, STARTING_Y, STARTING_HEIGHT, STARTING_WIDTH, MIN_HEIGHT, MIN_WIDTH, file_explorer_function, async () => {
        file_explorer_window = undefined;
    });
})

function updateColors() {
    reloadWindowColors();
    reloadBottomBarColors();
    if(command_window) {
        command_window.window_storage.terminal.updateLineColors();
    }
}