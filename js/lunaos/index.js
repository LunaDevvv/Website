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
 * @typedef {import("./windows/window")} lunaWindow
 */

let desktop = document.getElementById("desktop");

/**
 * @typedef {import("./fileSystem/fileSystem")}
 */
let osFileSystem = new fileSystem();

const DEFAULT_STARTING_X = 100;
const DEFAULT_STARTING_Y = 100;
const DEFAULT_STARTING_HEIGHT = 1000;
const DEFAULT_STARTING_WIDTH = 1200;
const DEFAULT_MIN_HEIGHT = 300;
const DEFAULT_MIN_WIDTH = 300;

desktop.style.height = `${window.innerHeight}px`;
document.body.style.backgroundImage = "url(\"/photos/LunaOS/backgrounds/desktop.jpg\")";
document.body.style.backgroundSize = "100% 100%";

desktop.style.position = "static";

desktop.clientLeft = "0px";
desktop.style.zIndex = "0";
desktop.style.padding = "none";
desktop.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;

desktop.addEventListener("contextmenu", contextMenuFunction);

document.addEventListener("mousedown", async (ev) => {
    let contextmenu = document.getElementById("desktopContextMenu");
    if(!contextmenu) return;

    await sleep(100);

    contextmenu.remove();
})


/**
 * @type {lunaWindow}
 */
let commandWindow = undefined;

/**
 * @type {lunaWindow}
 */
let settingsWindow = undefined;

/**
 * @type {lunaWindow}
 */
let fileExplorerWindow = undefined;

/**
 * @type {lunaWindow}
 */
let webBrowserWindow = undefined;

const BOTTOM_BAR = new BottomBar();
const TOP_BAR = new topBar();

window.addEventListener("resize", (ev) => {
    BOTTOM_BAR.onResize();
})

TOP_BAR.appendApplication("Utilites", "Settings", () => {
    document.getElementById("settings").click();
});

TOP_BAR.appendApplication("Utilites", "Terminal", () => {
    document.getElementById("terminal").click();
});

TOP_BAR.appendApplication("Utilites", "File Explorer", () => {
    document.getElementById("fileExplorer").click();
});


BOTTOM_BAR.appendButton(iconThemes[currentIconTheme].settings, "settings", async () => {
    document.body.style.cursor = "wait";
    if(typeof settingsFunction == "undefined") {
        const SETTINGS_COMMAND_CLASS = document.createElement("script");
        SETTINGS_COMMAND_CLASS.src = "./js/lunaos/applications/settings/settingsWindow.js";

        document.head.appendChild(SETTINGS_COMMAND_CLASS);

        while(typeof settingsFunction == "undefined") {
            await sleep(5);
        }
    }
    document.body.style.cursor = "default";

    if(settingsWindow != undefined) {
        settingsWindow = settingsWindow.update();
        settingsWindow.minimize();
        return;
    }

    const STARTING_X = 100;
    const STARTING_Y = 100;
    const STARTING_HEIGHT = 800;
    const STARTING_WIDTH = 800;
    const MIN_HEIGHT = 500;
    const MIN_WIDTH = 500;

    settingsWindow = new lunaWindow("Settings", STARTING_X, STARTING_Y, STARTING_HEIGHT, STARTING_WIDTH, MIN_WIDTH, MIN_HEIGHT, settingsFunction, async() => {
        settingsWindow = undefined;
    })

});

BOTTOM_BAR.appendButton(iconThemes[currentIconTheme].terminal, "terminal", async () => {
    document.body.style.cursor = "wait";

    if(typeof consoleFunction == "undefined") {
        const COMMAND_WINDOW_CLASS = document.createElement("script");
        COMMAND_WINDOW_CLASS.src = "./js/lunaos/applications/commandWindow/commandWindow.js";

        document.head.appendChild(COMMAND_WINDOW_CLASS);

        while(typeof importScripts == "undefined") {
            await sleep(5);
        }

        await importScripts();
    
        while(typeof terminal == "undefined" || typeof Line == "undefined") {
            await sleep(5);
        }
    }

    document.body.style.cursor = "default";
    if(commandWindow != undefined) {
        commandWindow = commandWindow.update();
        commandWindow.minimize();
        
        return;   
    }


    commandWindow = new lunaWindow("Command Prompt", DEFAULT_STARTING_X, DEFAULT_STARTING_Y, DEFAULT_STARTING_HEIGHT, DEFAULT_STARTING_WIDTH, DEFAULT_MIN_HEIGHT, DEFAULT_MIN_WIDTH, consoleFunction, async () => {
        commandWindow = undefined;
    });
    
});

BOTTOM_BAR.appendButton(iconThemes[currentIconTheme].fileExplorer, "fileExplorer", async() => {
    document.body.style.cursor = "wait";

    if(typeof fileExplorerFunction == "undefined") {
        const FILE_EXPLORER_CLASS = document.createElement("script");
        FILE_EXPLORER_CLASS.src = "./js/lunaos/applications/fileExplorer/fileExplorer.js";

        document.head.appendChild(FILE_EXPLORER_CLASS);

        while(typeof fileExplorerFunction == "undefined") {
            await sleep(5);
        }
    }

    document.body.style.cursor = "default";
    if(fileExplorerWindow != undefined) {
        fileExplorerWindow = fileExplorerWindow.update();
        fileExplorerWindow.minimize();
        
        return;   
    }

    fileExplorerWindow = new lunaWindow("File Explorer", DEFAULT_STARTING_X, DEFAULT_STARTING_Y, DEFAULT_STARTING_HEIGHT, DEFAULT_STARTING_WIDTH, DEFAULT_MIN_HEIGHT, DEFAULT_MIN_WIDTH, fileExplorerFunction, async () => {
        fileExplorerWindow = undefined;
    });
});

BOTTOM_BAR.appendButton(iconThemes[currentIconTheme].fileExplorer, "webBrowser", async() => {
    document.body.style.cursor = "wait";

    if(typeof webBrowserFunction == "undefined") {
        const WEB_BROWSER_CLASS = document.createElement("script");
        WEB_BROWSER_CLASS.src = "./js/lunaos/applications/webBrowser/webBrowser.js";

        document.head.appendChild(WEB_BROWSER_CLASS);

        while(typeof webBrowserFunction == "undefined") {
            await sleep(5);
        }
    }

    document.body.style.cursor = "default";

    if(webBrowserWindow != undefined) {
        webBrowserWindow = webBrowserWindow.update();
        webBrowserWindow.minimize();
        
        return;   
    }

    webBrowserWindow = new lunaWindow("Web Browser (Warning : Does not work, Dont log into anything)", DEFAULT_STARTING_X, DEFAULT_STARTING_Y, DEFAULT_STARTING_HEIGHT, DEFAULT_STARTING_WIDTH, DEFAULT_MIN_HEIGHT, DEFAULT_MIN_WIDTH, webBrowserFunction, async () => {
        webBrowserWindow = undefined;
    });
});

function minimizeWindow(currentWindow) {
    currentWindow = currentWindow.update();
    currentWindow.minimize();
    return;   
}

function updateColors() {
    reloadWindowColors();
    reloadBottomBarColors();
    if(commandWindow) {
        commandWindow.windowStorage.terminal.updateLineColors();
    }
}