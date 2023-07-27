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
 * @typedef {import("./windows/window")}
 * @typedef {import("./bottomBar/bottomBar")}
 * @typedef {import("./index")}
 * 
 * @param {Event} ev 
 */

function contextMenuFunction(ev) {
    ev.preventDefault();

    const CONTEXT_DIV = createContextMenu(ev);

    let settingsButton = createContextButton("settings", () => {
        document.getElementById("settings").click();

        CONTEXT_DIV.remove();
    })

    let terminalButton = createContextButton("terminal", () => {
        document.getElementById("terminal").click();

        CONTEXT_DIV.remove();
    });

    const THEME_DIV = createContextHoverItem("Theme", (themeDiv) => {
        let themeHolder = createContextHoverMenu(40);

        const DARK_MODE_BUTTON = createContextButton("Dark Mode", () => {
            currentTheme = "dark_mode";
            localStorage.setItem("currentTheme", currentTheme);

            updateColors();
        })

        const LIGHT_MODE_BUTTON = createContextButton("Light Mode", () => {
            currentTheme = "light_mode";
            localStorage.setItem("currentTheme", currentTheme);
            updateColors();
        })
        
        themeHolder.appendChild(LIGHT_MODE_BUTTON);
        themeHolder.appendChild(DARK_MODE_BUTTON);
        themeDiv.appendChild(themeHolder);
    });

    const ICON_THEME_DIV = createContextHoverItem("Icon theme", (iconThemeDiv) => {
        const ICON_THEME_HOLDER = createContextHoverMenu(60, 65, 160);

        const DEFAULT_ICONS_BUTTON = createContextButton("Default Icons", () => {
            updateIcons("default");
        });

        const OLD_DEFAULTS_ICONS_BUTTON = createContextButton("Old Default Icons", () => {
            updateIcons("oldDefault")
        });

        const ANIME_ICONS_BUTTON = createContextButton("Anime Icons", () => {
            updateIcons("anime");
        });

        ICON_THEME_HOLDER.appendChild(DEFAULT_ICONS_BUTTON);
        ICON_THEME_HOLDER.appendChild(OLD_DEFAULTS_ICONS_BUTTON);
        ICON_THEME_HOLDER.appendChild(ANIME_ICONS_BUTTON);

        iconThemeDiv.appendChild(ICON_THEME_HOLDER);
    });


    CONTEXT_DIV.appendChild(settingsButton);
    CONTEXT_DIV.appendChild(terminalButton);
    CONTEXT_DIV.appendChild(THEME_DIV);
    CONTEXT_DIV.appendChild(ICON_THEME_DIV);
    document.body.appendChild(CONTEXT_DIV);
}

/**
 * @param {MouseEvent} ev
 * @returns { HTMLDivElement } 
 */
function createContextMenu(ev, height = 150, width = 100) {
    const CONTEXT_DIV = document.createElement("div");

    CONTEXT_DIV.style.width = `${width}px`;
    CONTEXT_DIV.style.height = `${height}px`;
    CONTEXT_DIV.style.backgroundColor = colorThemes[currentTheme].contextDiv;
    CONTEXT_DIV.style.position = "absolute";
    CONTEXT_DIV.style.zIndex = "100";
    CONTEXT_DIV.id = "desktopContextMenu";

    CONTEXT_DIV.style.borderRadius = "5px";
    CONTEXT_DIV.style.opacity = "80%";
    CONTEXT_DIV.style.filter = "10px";
    
    CONTEXT_DIV.style.left = `${ev.x}px`;
    CONTEXT_DIV.style.top = `${ev.y}px`;


    return CONTEXT_DIV;
}

/**
 * 
 * @param {string} name 
 * @param {(mouseEvent : MouseEvent) => any} onClickFunction 
 * @returns { HTMLButtonElement }
 */
function createContextButton(name, onClickFunction) {
    let contextButton = document.createElement("button");

    contextButton.textContent = name;
    contextButton.style.width = "100%";
    contextButton.style.fontSize = "15px";
    contextButton.style.background = "none";
    contextButton.style.border = "none";
    contextButton.style.color = colorThemes[currentTheme].text;

    contextButton.onclick = onClickFunction

    contextButton.onmouseenter = () => {
        contextButton.style.borderRadius = "5px";
        contextButton.style.backgroundSize = "100% 40px";
        contextButton.style.backgroundColor = colorThemes[currentTheme].contextMenuButton;
    }

    contextButton.onmouseleave = () => {
        contextButton.style.background = "none";   
    }

    return contextButton;
}

/**
 * 
 * @param {string} name 
 * @param {(createdDiv : HTMLDivElement,mouseEvent : MouseEvent) => any} onMouseEnter
 * @returns { HTMLDivElement }
 */
function createContextHoverItem(name, onMouseEnter) {
    const CONTEXT_DIV = document.createElement("div");
    CONTEXT_DIV.textContent = name;
    CONTEXT_DIV.style.paddingTop = "3px";
    CONTEXT_DIV.style.width = "100%";
    CONTEXT_DIV.style.height = "20px";
    CONTEXT_DIV.style.fontSize = "15px";
    CONTEXT_DIV.style.textAlign = "center";
    CONTEXT_DIV.style.background = "none";
    CONTEXT_DIV.style.border = "none";
    CONTEXT_DIV.style.color = colorThemes[currentTheme].text;
    
    CONTEXT_DIV.onmouseenter = (ev) => {
        CONTEXT_DIV.style.backgroundColor = colorThemes[currentTheme].contextMenuButton;
        onMouseEnter(CONTEXT_DIV, ev);
    };

    CONTEXT_DIV.onmouseleave = () => {
        if(CONTEXT_DIV.lastChild) {
            CONTEXT_DIV.lastChild.remove();
        }
        CONTEXT_DIV.style.background = "none";
    }
    return CONTEXT_DIV;
}

/**
 * 
 * @param {string} name 
 * @param {number} top 
 * @param {number} height 
 * @param {number} width
 * 
 * @returns 
 */
function createContextHoverMenu(top, height=50, width=100) {
    const CONTEXT_HOVER_MENU = document.createElement("div");
    CONTEXT_HOVER_MENU.style.position = "absolute";
    CONTEXT_HOVER_MENU.style.left = "100%";
    CONTEXT_HOVER_MENU.style.top = `${top}px`;
    CONTEXT_HOVER_MENU.style.height = `${height}px`;
    CONTEXT_HOVER_MENU.style.width = `${width}px`;
    CONTEXT_HOVER_MENU.style.backgroundColor = colorThemes[currentTheme].contextDiv;
    CONTEXT_HOVER_MENU.style.borderTopRightRadius = "5px";
    CONTEXT_HOVER_MENU.style.borderBottomRightRadius = "5px";

    return CONTEXT_HOVER_MENU;
}