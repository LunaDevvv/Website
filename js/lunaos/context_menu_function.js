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

function context_menu_function(ev) {
    ev.preventDefault();

    const context_div = document.createElement("div");

    context_div.style.width = "100px";
    context_div.style.height = "150px";
    context_div.style.backgroundColor = color_themes[current_theme].context_div;
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
    settings_button.style.color = color_themes[current_theme].text;

    settings_button.onclick = () => {
        document.getElementById("settings").click();

        context_div.remove();
    }

    settings_button.onmouseenter = () => {
        settings_button.style.borderRadius = "5px";
        settings_button.style.backgroundSize = "100% 40px";
        settings_button.style.backgroundColor = color_themes[current_theme].context_menu_button;
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
    terminal_button.style.color = color_themes[current_theme].text;

    terminal_button.onclick = () => {
        document.getElementById("terminal").click();

        context_div.remove();
    }

    terminal_button.onmouseenter = () => {
        terminal_button.style.borderRadius = "5px";
        terminal_button.style.backgroundSize = "100% 40px";
        terminal_button.style.backgroundColor = color_themes[current_theme].context_menu_button;
    }

    terminal_button.onmouseleave = () => {
        terminal_button.style.background = "none";   
    }

    const theme_div = document.createElement("div");
    theme_div.textContent = "theme";
    theme_div.style.paddingTop = "3px";
    theme_div.style.width = "100%";
    theme_div.style.height = "20px";
    theme_div.style.fontSize = "15px";
    theme_div.style.textAlign = "center";
    theme_div.style.background = "none";
    theme_div.style.border = "none";
    theme_div.style.color = color_themes[current_theme].text;

    theme_div.onmouseenter = () => {
        theme_div.style.backgroundColor = color_themes[current_theme].context_menu_button;
        const theme_holder = document.createElement("div");
        theme_holder.style.position = "absolute";
        theme_holder.style.left = "100%";
        theme_holder.style.top = "40px";
        theme_holder.style.height = "50px";
        theme_holder.style.width = "100px";
        theme_holder.style.backgroundColor = color_themes[current_theme].context_div;

        const dark_mode_button = document.createElement("button");
        dark_mode_button.textContent = "Dark mode";
        dark_mode_button.style.paddingTop = "3px";
        dark_mode_button.style.width = "100%";
        dark_mode_button.style.fontSize = "15px";
        dark_mode_button.style.background = "none";
        dark_mode_button.style.border = "none";
        dark_mode_button.style.color = color_themes[current_theme].text;

        dark_mode_button.onmouseenter = () => {
            dark_mode_button.style.borderRadius = "5px";
            dark_mode_button.style.backgroundSize = "100% 40px";
            dark_mode_button.style.backgroundColor = color_themes[current_theme].context_menu_button;
        }
    
        dark_mode_button.onmouseleave = () => {
            dark_mode_button.style.background = "none";   
        }
    
        dark_mode_button.onclick = () => {
            current_theme = "dark_mode";
            updateColors();
        }

        const light_mode_button = document.createElement("button");
        light_mode_button.textContent = "Light mode";
        light_mode_button.style.paddingTop = "3px";
        light_mode_button.style.width = "100%";
        light_mode_button.style.fontSize = "15px";
        light_mode_button.style.background = "none";
        light_mode_button.style.border = "none";
        light_mode_button.style.color = color_themes[current_theme].text;

        light_mode_button.onmouseenter = () => {
            light_mode_button.style.borderRadius = "5px";
            light_mode_button.style.backgroundSize = "100% 40px";
            light_mode_button.style.backgroundColor = color_themes[current_theme].context_menu_button;
        }
    
        light_mode_button.onmouseleave = () => {
            light_mode_button.style.background = "none";   
        }
    
        light_mode_button.onclick = () => {
            current_theme = "light_mode";
            updateColors();
        }
        
        theme_div.appendChild(theme_holder);

        theme_holder.appendChild(dark_mode_button);
        theme_holder.appendChild(light_mode_button);
    }

    theme_div.onmouseleave = () => {
        theme_div.lastChild.remove();
        theme_div.style.background = "none";
    }

    const icon_theme_div = document.createElement("div");
    icon_theme_div.textContent = "Icon theme";
    icon_theme_div.style.paddingTop = "3px";
    icon_theme_div.style.width = "100%";
    icon_theme_div.style.height = "20px";
    icon_theme_div.style.fontSize = "15px";
    icon_theme_div.style.textAlign = "center";
    icon_theme_div.style.background = "none";
    icon_theme_div.style.border = "none";
    icon_theme_div.style.color = color_themes[current_theme].text;

    icon_theme_div.onmouseenter = () => {
        icon_theme_div.style.backgroundColor = color_themes[current_theme].context_menu_button;
        const icon_theme_holder = document.createElement("div");
        icon_theme_holder.style.position = "absolute";
        icon_theme_holder.style.left = "100%";
        icon_theme_holder.style.top = "60px";
        icon_theme_holder.style.height = "50px";
        icon_theme_holder.style.width = "100px";
        icon_theme_holder.style.backgroundColor = color_themes[current_theme].context_div;

        const dark_mode_button = document.createElement("button");
        dark_mode_button.textContent = "Dark mode";
        dark_mode_button.style.paddingTop = "3px";
        dark_mode_button.style.width = "100%";
        dark_mode_button.style.fontSize = "15px";
        dark_mode_button.style.background = "none";
        dark_mode_button.style.border = "none";
        dark_mode_button.style.color = color_themes[current_theme].text;

        dark_mode_button.onmouseenter = () => {
            dark_mode_button.style.borderRadius = "5px";
            dark_mode_button.style.backgroundSize = "100% 40px";
            dark_mode_button.style.backgroundColor = color_themes[current_theme].context_menu_button;
        }
    
        dark_mode_button.onmouseleave = () => {
            dark_mode_button.style.background = "none";   
        }
    
        dark_mode_button.onclick = () => {
            current_icon_theme = "dark_mode";
            updateIcons();
        }

        const anime_icon_button = document.createElement("button");
        anime_icon_button.textContent = "Anime";
        anime_icon_button.style.paddingTop = "3px";
        anime_icon_button.style.width = "100%";
        anime_icon_button.style.fontSize = "15px";
        anime_icon_button.style.background = "none";
        anime_icon_button.style.border = "none";
        anime_icon_button.style.color = color_themes[current_theme].text;

        anime_icon_button.onmouseenter = () => {
            anime_icon_button.style.borderRadius = "5px";
            anime_icon_button.style.backgroundSize = "100% 40px";
            anime_icon_button.style.backgroundColor = color_themes[current_theme].context_menu_button;
        }
    
        anime_icon_button.onmouseleave = () => {
            anime_icon_button.style.background = "none";   
        }
    
        anime_icon_button.onclick = () => {
            current_icon_theme = "anime";
            updateIcons();
        }
        
        icon_theme_div.appendChild(icon_theme_holder);

        icon_theme_holder.appendChild(dark_mode_button);
        icon_theme_holder.appendChild(anime_icon_button);
    }

    icon_theme_div.onmouseleave = () => {
        icon_theme_div.lastChild.remove();
        icon_theme_div.style.background = "none";
    }

    context_div.appendChild(settings_button);
    context_div.appendChild(terminal_button);
    context_div.appendChild(theme_div);
    context_div.appendChild(icon_theme_div);
    document.body.appendChild(context_div);
}