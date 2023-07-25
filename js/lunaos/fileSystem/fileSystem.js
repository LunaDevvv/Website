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
 * @typedef {import("../windows/window")}
 */

class fileSystem {

    constructor() {
        this.files = {};

        this.init();

        
        
    }
    
    async init() {
        this.createFolder("~/", "lunaOS");
        
        // Home files
        this.files["~/lunaOS"]["lunaOS.js"] = new file(await this.getFile("/js/lunaos/index.js"), "lunaOS.js", openText, false);
        this.files["~/lunaOS"]["color_themes.js"] = new file(await this.getFile("/js/lunaos/color_themes.js"), "color_themes.js", openText, false);
        this.files["~/lunaOS"]["icon_themes.js"] = new file(await this.getFile("/js/lunaos/icon_themes.js"), "icon_themes.js", openText, false);
        this.files["~/lunaOS"]["context_menu_function.js"] = new file(await this.getFile("/js/lunaos/context_menu_function.js"), "context_menu_function.js", openText, false);
        this.files["~/lunaOS"]["index.html"] = new file(await this.getFile("index.html"), "index.html", openText, false);

        this.files["~/lunaOS"]["readme.txt"] = new file(await this.getFile("/js/lunaos/readme.txt"), "readme.txt", openText, false);

        // CSS
        this.createFolder("~/lunaOS/", "css");
        this.files["~/lunaOS/css"]["main.css"] = new file(await this.getFile("/css/lunaos/main.css"), "main.css", openText, false);


        // Window dir files
        this.createFolder("~/lunaOS/", "windows");
        this.files["~/lunaOS/windows"]["context_menu_function.js"] = new file(await this.getFile("/js/lunaos/windows/window.js"), "window.js", openText, false);

        // Utils dir Files
        this.createFolder("~/lunaOS/", "utils");
        this.files["~/lunaOS/utils"]["utils.js"] = new file(await this.getFile("/js/lunaos/utils/utils.js"), "utils.js", openText, false);
        
        // Bottom Bar files
        this.createFolder("~/lunaOS/", "bottomBar");
        this.files["~/lunaOS/bottomBar"]["bottomBar.js"] = new file(await this.getFile("/js/lunaos/bottomBar/bottomBar.js"), "bottomBar.js", openText, false);
        
        // File system files
        this.createFolder("~/lunaOS/", "fileSystem");
        this.files["~/lunaOS/fileSystem"]["fileSystem.js"] = new file(await this.getFile("/js/lunaos/fileSystem/fileSystem.js"), "fileSystem.js", openText, false);

        //Application files
        this.createFolder("~/lunaOS/", "applications");
        // Command Line
        this.createFolder("~/lunaOS/applications/", "command_window");
        this.files["~/lunaOS/applications/command_window"]["command_window.js"] = new file(await this.getFile("/js/lunaos/applications/command_window/command_window.js"), "command_window.js", openText, false);

        this.createFolder("~/lunaOS/applications/command_window/", "classes");
        this.files["~/lunaOS/applications/command_window/classes"]["Line.js"] = new file(await this.getFile("/js/lunaos/applications/command_window/classes/Line.js"), "Line.js", openText, false);
        this.files["~/lunaOS/applications/command_window/classes"]["Terminal.js"] = new file(await this.getFile("/js/lunaos/applications/command_window/classes/Terminal.js"), "Terminal.js", openText, false);

        this.createFolder("~/lunaOS/applications/command_window/", "commands");
        this.files["~/lunaOS/applications/command_window/commands"]["clear.js"] = new file(await this.getFile("/js/lunaos/applications/command_window/commands/clear.js"), "clear.js", openText, false);
        this.files["~/lunaOS/applications/command_window/commands"]["developers.js"] = new file(await this.getFile("/js/lunaos/applications/command_window/commands/developers.js"), "developers.js", openText, false);
        this.files["~/lunaOS/applications/command_window/commands"]["github.js"] = new file(await this.getFile("/js/lunaos/applications/command_window/commands/github.js"), "github.js", false), openText;
        this.files["~/lunaOS/applications/command_window/commands"]["header.js"] = new file(await this.getFile("/js/lunaos/applications/command_window/commands/header.js"), "header.js", openText, false);
        this.files["~/lunaOS/applications/command_window/commands"]["help.js"] = new file(await this.getFile("/js/lunaos/applications/command_window/commands/help.js"), "help.js", openText, false);

        //File Explorer
        this.createFolder("~/lunaOS/applications/", "file_explorer");
        this.files["~/lunaOS/applications/file_explorer"]["file_explorer.js"] = new file(await this.getFile("/js/lunaos/applications/file_explorer/file_explorer.js"), "file_explorer.js", openText, false);

        // Settings
        this.createFolder("~/lunaOS/applications/", "settings");
        this.files["~/lunaOS/applications/settings"]["settings_window.js"] = new file(await this.getFile("/js/lunaos/applications/settings/settings_window.js"), "settings_window.js", openText, false);

        this.createFolder("~/lunaOS/applications/settings/", "pages");
        this.files["~/lunaOS/applications/settings/pages"]["homePage.js"] = new file(await this.getFile("/js/lunaos/applications/settings/pages/homePage.js"), "homePage.js", openText, false);
        this.files["~/lunaOS/applications/settings/pages"]["personalization.js"] = new file(await this.getFile("/js/lunaos/applications/settings/pages/personalization.js"), "personalization.js", openText, false);

        // Photos
        this.createFolder("~/lunaOS/", "photos");

        // Backgrounds
        this.createFolder("~/lunaOS/photos/", "backgrounds");
        this.files["~/lunaOS/photos/backgrounds"]["anime.png"] = new file("/photos/lunaos/backgrounds/anime.png", "anime.png", openImage, false);
        this.files["~/lunaOS/photos/backgrounds"]["anime.png"] = new file("/photos/lunaos/backgrounds/desktop.jpg", "desktop.jpg", openImage, false);

        //Bottom Bar
        this.createFolder("~/lunaOS/photos/", "bottomBar");
        this.files["~/lunaOS/photos/bottomBar"]["file_explorer.svg"] = new file("/photos/lunaos/bottomBar/file_explorer.svg", "file_explorer.svg", openImage, false);
        this.files["~/lunaOS/photos/bottomBar"]["settings.svg"] = new file("/photos/lunaos/bottomBar/settings.svg", "settings.svg", openImage, false);
        this.files["~/lunaOS/photos/bottomBar"]["settingsButton.png"] = new file("/photos/lunaos/bottomBar/settingsButton.png", "settingsButton.png", openImage, false);
        this.files["~/lunaOS/photos/bottomBar"]["settingsButtonAnime.png"] = new file("/photos/lunaos/bottomBar/settingsButtonAnime.png", "settingsButtonAnime.png", openImage, false);
        this.files["~/lunaOS/photos/bottomBar"]["terminal.png"] = new file("/photos/lunaos/bottomBar/terminal.png", "terminal.png", openImage, false);
        this.files["~/lunaOS/photos/bottomBar"]["terminal.svg"] = new file("/photos/lunaos/bottomBar/terminal.svg", "terminal.svg", openImage, false);
        this.files["~/lunaOS/photos/bottomBar"]["terminalAnime.png"] = new file("/photos/lunaos/bottomBar/terminalAnime.png", "terminalAnime.png", openImage, false);
        
        //Icons
        this.createFolder("~/lunaOS/photos/", "icons");
        this.files["~/lunaOS/photos/icons"]["file-minus.svg"] = new file("/photos/lunaos/icons/file-minus.svg", "file-minus.svg", openImage, false);
        this.files["~/lunaOS/photos/icons"]["file-plus.svg"] = new file("/photos/lunaos/icons/file-plus.svg", "file-plus.svg", openImage, false);
        this.files["~/lunaOS/photos/icons"]["file.svg"] = new file("/photos/lunaos/icons/file.svg", "file.svg", openImage, false);
        this.files["~/lunaOS/photos/icons"]["folder-minus.svg"] = new file("/photos/lunaos/icons/folder-minus.svg", "folder-minus.svg", openImage, false);
        this.files["~/lunaOS/photos/icons"]["folder-plus.svg"] = new file("/photos/lunaos/icons/folder-plus.svg", "folder-plus.svg", openImage, false);
        this.files["~/lunaOS/photos/icons"]["folder.svg"] = new file("/photos/lunaos/icons/folder.svg", "folder.svg", openImage, false);
    }

    /**
     * 
     * @param {string} path 
     * @param {string} name 
     */
    async createFolder(path, name) {
        path += `${name}`;

        path = path.split("/");

        path[0] = `${path[0]}/`

        let current_path = path[0];

        let last_path = current_path;

        if(!this.files[`${current_path}`]) {
            this.files[`${current_path}`] = {};
        }

        for(let i = 1; i < path.length; i++) {

            if(i == 1) {
                current_path = `${current_path}${path[i]}`;
            } else {
                current_path = `${current_path}/${path[i]}`;
            }
            this.files[last_path][path[i]] = `${path[i]}`;

            
            if(!this.files[current_path]) {
                this.files[current_path] = {};
            }

            
            last_path = current_path;
        }
    }


    async getFile(url) {
        let data = await (await fetch(url)).text();

        return data;
    }
}


class file {
    constructor(text, name, openFunction, save_enabled = true) {
        this.text = text;
        this.name = name;
        this.save_enabled = save_enabled;
        this.openFunction = openFunction

        this.window = undefined;
    }


    open() {
        if(this.window) {
            this.window.minimize();
            return;
        }

        this.window = new luna_window(this.name, 100, 100, 500, 500, 300, 300, (open_window) => {
            this.openFunction(open_window, this.text, this.name)
        }, () => {
            this.window = undefined;
        });
    }

    editText(text) {
        if(!this.save_enabled) return;

        this.text = text;
    }
}

/**
 * @param {luna_window} this_window 
 * @param {string} text 
 * @param {string} name 
 * @param {file} file_class
 */
async function openText(this_window, text, name, file_class) {
    let text_box = document.createElement("textarea");
    text_box.style.height = "98%";
    text_box.style.width = "99%";
    text_box.style.color = color_themes[current_theme].text;
    text_box.style.background = "none";
    text_box.style.border = "none";
    text_box.textContent = text;
    text_box.id = `${name}_text_editor`;
    text_box.autocomplete = "off";
    text_box.autocapitalize = "off";
    text_box.spellcheck = "false";
    text_box.style.resize = "none";
    text_box.style.whiteSpace = "nowrap";
    text_box.style.overflow = "auto";

    this_window.holder_div.appendChild(text_box);

    text_box.addEventListener("keydown", (ev) => {
        if(ev.key == "s" && ev.ctrlKey) {
            ev.preventDefault();

            file_class.editText(text_box.value);
        }
    })
}

/**
 * @param {luna_window} this_window 
 * @param {string} text 
 * @param {string} name 
 * @param {file} file_class
 */
async function openImage(this_window, image, name, file_class) {
    let image_box = document.createElement("img");
    image_box.style.height = "98%";
    image_box.style.width = "99%";
    image_box.style.background = "none";
    image_box.style.border = "none";
    image_box.alt = name;
    image_box.id = `${name}_image_viewer`;
    image_box.style.overflow = "auto";
    image_box.src = image;
    image_box.style.objectFit = "fill";

    this_window.holder_div.style.backgroundColor = "#4c4d4c";


    this_window.holder_div.appendChild(image_box);
}