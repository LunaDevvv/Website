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
        this.files = {
            "~/" : new folder("~/", "~/", false)
        };
        this.init();    
    }
    
    async init() {

        let lunaOS_pass = generate_id_pass();
        this.createFolder("~/", "lunaOS", true, lunaOS_pass);
        
        // Home files
        this.files["~/lunaOS"].appendFile("index.js", new file(await this.getFile("/js/lunaos/index.js"), "lunaOS.js", undefined, false), lunaOS_pass);
        this.files["~/lunaOS"].appendFile("color_themes.js", new file(await this.getFile("/js/lunaos/color_themes.js"), "color_themes.js",undefined, false), lunaOS_pass);
        this.files["~/lunaOS"].appendFile("icon_themes.js", new file(await this.getFile("/js/lunaos/icon_themes.js"), "icon_themes.js", undefined, false), lunaOS_pass);
        this.files["~/lunaOS"].appendFile("menu_function.js", new file(await this.getFile("/js/lunaos/context_menu_function.js"), "context_menu_function.js", undefined, false), lunaOS_pass);
        this.files["~/lunaOS"].appendFile("index.html", new file(await this.getFile("index.html"), "index.html", undefined, false), lunaOS_pass);

        this.files["~/lunaOS"].appendFile("readme.txt", new file(await this.getFile("/js/lunaos/readme.txt"), "readme.txt", undefined, false), lunaOS_pass);

        // CSS
        this.createFolder("~/lunaOS/", "css", true, lunaOS_pass);
        this.files["~/lunaOS/css"].appendFile("main.css", new file(await this.getFile("/css/lunaos/main.css"), "main.css", undefined, false), lunaOS_pass);


        // Window dir files
        this.createFolder("~/lunaOS/", "windows", true, lunaOS_pass);
        this.files["~/lunaOS/windows"].appendFile("window.js", new file(await this.getFile("/js/lunaos/windows/window.js"), "window.js", undefined, false), lunaOS_pass);

        // Utils dir Files
        this.createFolder("~/lunaOS/", "utils", true, lunaOS_pass);

        this.files["~/lunaOS/utils"].appendFile("utils.js", new file(await this.getFile("/js/lunaos/utils/utils.js"), "utils.js", undefined, false), lunaOS_pass);
        
        // Bottom Bar files
        this.createFolder("~/lunaOS/", "bottomBar", true, lunaOS_pass);
        this.files["~/lunaOS/bottomBar"].appendFile("bottomBar.js", new file(await this.getFile("/js/lunaos/bottomBar/bottomBar.js"), "bottomBar.js", undefined, false), lunaOS_pass);
        
        // File system files
        this.createFolder("~/lunaOS/", "fileSystem", true, lunaOS_pass);
        this.files["~/lunaOS/fileSystem"].appendFile("fileSystem.js", new file(await this.getFile("/js/lunaos/fileSystem/fileSystem.js"), "fileSystem.js", undefined, false), lunaOS_pass);

        //Application files
        this.createFolder("~/lunaOS/", "applications", true, lunaOS_pass);
        // Command Line
        this.createFolder("~/lunaOS/applications/", "command_window", true, lunaOS_pass);
        this.files["~/lunaOS/applications/command_window"].appendFile("command_window.js", new file(await this.getFile("/js/lunaos/applications/command_window/command_window.js"), "command_window.js", undefined, false), lunaOS_pass);

        this.createFolder("~/lunaOS/applications/command_window/", "classes", true, lunaOS_pass);
        this.files["~/lunaOS/applications/command_window/classes"].appendFile("Line.js", new file(await this.getFile("/js/lunaos/applications/command_window/classes/Line.js"), "Line.js", undefined, false));
        this.files["~/lunaOS/applications/command_window/classes"].appendFile("Terminal.js",new file(await this.getFile("/js/lunaos/applications/command_window/classes/Terminal.js"), "Terminal.js", undefined, false), lunaOS_pass);

        this.createFolder("~/lunaOS/applications/command_window/", "commands", true, lunaOS_pass);
        this.files["~/lunaOS/applications/command_window/commands"].appendFile("clear.js", new file(await this.getFile("/js/lunaos/applications/command_window/commands/clear.js"), "clear.js", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/applications/command_window/commands"].appendFile("developers.js", new file(await this.getFile("/js/lunaos/applications/command_window/commands/developers.js"), "developers.js", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/applications/command_window/commands"].appendFile("github.js", new file(await this.getFile("/js/lunaos/applications/command_window/commands/github.js"), "github.js", false, undefined), lunaOS_pass);
        this.files["~/lunaOS/applications/command_window/commands"].appendFile("header.js", new file(await this.getFile("/js/lunaos/applications/command_window/commands/header.js"), "header.js", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/applications/command_window/commands"].appendFile("help.js", new file(await this.getFile("/js/lunaos/applications/command_window/commands/help.js"), "help.js", undefined, false), lunaOS_pass);

        //File Explorer
        this.createFolder("~/lunaOS/applications/", "file_explorer", true, lunaOS_pass);
        this.files["~/lunaOS/applications/file_explorer"].appendFile("file_explorer.js", new file(await this.getFile("/js/lunaos/applications/file_explorer/file_explorer.js"), "file_explorer.js", undefined, false), lunaOS_pass);

        // Settings
        this.createFolder("~/lunaOS/applications/", "settings", true, lunaOS_pass);
        this.files["~/lunaOS/applications/settings"].appendFile("settings_window.js", new file(await this.getFile("/js/lunaos/applications/settings/settings_window.js"), "settings_window.js", undefined, false), lunaOS_pass);

        this.createFolder("~/lunaOS/applications/settings/", "pages", true, lunaOS_pass);
        this.files["~/lunaOS/applications/settings/pages"].appendFile("homePage.js", new file(await this.getFile("/js/lunaos/applications/settings/pages/homePage.js"), "homePage.js", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/applications/settings/pages"].appendFile("personalization.js", new file(await this.getFile("/js/lunaos/applications/settings/pages/personalization.js"), "personalization.js", undefined, false), lunaOS_pass);

        // Photos
        this.createFolder("~/lunaOS/", "photos", true, lunaOS_pass);

        // Backgrounds
        this.createFolder("~/lunaOS/photos/", "backgrounds", true, lunaOS_pass);
        this.files["~/lunaOS/photos/backgrounds"].appendFile("anime.png", new file("/photos/lunaos/backgrounds/anime.png", "anime.png", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/backgrounds"].appendFile("desktop.png", new file("/photos/lunaos/backgrounds/desktop.jpg", "desktop.jpg", undefined, false), lunaOS_pass);

        //Bottom Bar
        this.createFolder("~/lunaOS/photos/", "bottomBar", true, lunaOS_pass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("file_explorer.svg",new file("/photos/lunaos/bottomBar/file_explorer.svg", "file_explorer.svg", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("settings.svg",new file("/photos/lunaos/bottomBar/settings.svg", "settings.svg", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("settingsButton.png",new file("/photos/lunaos/bottomBar/settingsButton.png", "settingsButton.png", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("settingsButtonAnime.png",new file("/photos/lunaos/bottomBar/settingsButtonAnime.png", "settingsButtonAnime.png", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("terminal.png",new file("/photos/lunaos/bottomBar/terminal.png", "terminal.png", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("terminal.svg",new file("/photos/lunaos/bottomBar/terminal.svg", "terminal.svg", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("terminalAnime.png",new file("/photos/lunaos/bottomBar/terminalAnime.png", "terminalAnime.png", undefined, false), lunaOS_pass);
        
        //Icons
        this.createFolder("~/lunaOS/photos/", "icons", true, lunaOS_pass);
        this.files["~/lunaOS/photos/icons"].appendFile("file.svg", new file("/photos/lunaos/icons/file.svg", "file.svg", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/icons"].appendFile("folder.svg", new file("/photos/lunaos/icons/folder.svg", "folder.svg", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/icons"].appendFile("file-minus.svg", new file("/photos/lunaos/icons/file-minus.svg", "file-minus.svg", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/icons"].appendFile("file-plus.svg", new file("/photos/lunaos/icons/file-plus.svg", "file-plus.svg", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/icons"].appendFile("folder-minus.svg", new file("/photos/lunaos/icons/folder-minus.svg", "folder-minus.svg", undefined, false), lunaOS_pass);
        this.files["~/lunaOS/photos/icons"].appendFile("folder-plus.svg", new file("/photos/lunaos/icons/folder-plus.svg", "folder-plus.svg", undefined, false), lunaOS_pass);
    }

    /**
     * 
     * @param {string} path 
     * @param {string} name 
     * @param {boolean} readonly
     */
    async createFolder(path, name, readonly, id_pass) {
        path += `${name}`;

        if(this.files[path]) return false;

        path = path.split("/");

        path[0] = `${path[0]}/`

        let current_path = path[0];

        let last_path = current_path;

        if(!this.files[current_path]) {
            this.files[current_path] = new folder(current_path, path, readonly, id_pass);
        }

        for(let i = 1; i < path.length; i++) {

            if(i == 1) {
                current_path = `${current_path}${path[i]}`;
            } else {
                current_path = `${current_path}/${path[i]}`;
            }
            this.files[last_path].appendFolder(path[i], id_pass);;

            
            if(!this.files[current_path]) {
                this.files[current_path] = new folder(current_path, path, readonly, id_pass);
            }

            last_path = current_path;
        }

        return true;
    }

    /**
     * 
     * @param {string} path 
     * @param {string} id_pass 
     */
    editFolderPath(path, new_path, id_pass) {

        let matching_id = this.files[path].checkId(id_pass);

        if(!matching_id) return false;

        this.files[new_path] = this.files[path];

        let name = new_path.split("/")[new_path.split("/").length - 1];
        let last_folder_name = path.split("/")[path.split("/").length - 1]

        let last_folder = path.split("/").slice(0, -1).join("/");

        if(path.split("/").slice(0, -1).join("/").length == 1) {
            last_folder = "~/"
        }

        this.files[last_folder].deleteFile(last_folder_name, id_pass);

        this.files[last_folder].appendFile(name, name, id_pass);

        this.files[path] = undefined;

        this.files[new_path].edit_name(name, id_pass);
    }

    /**
     * 
     * @param {string} url 
     * @returns {string}
     */
    async getFile(url) {
        let data = await (await fetch(url)).text();

        return data;
    }
}

class file {
    #text
    #name
    #save_enabled
    #openFunction
    #fileExtension

    /**
     * 
     * @param {string} text 
     * @param {string} name 
     * @param {function} openFunction 
     * @param {boolean} save_enabled 
     */
    constructor(text, name, openFunction, save_enabled = true) {
        this.#text = text;
        this.#name = name;
        this.#save_enabled = save_enabled;
        this.#openFunction = openFunction;

        
        this.#fileExtension = this.#name.split(".")[this.#name.split(".").length - 1];
        
        if(!this.#openFunction) {
            this.#openFunction = open_with_applications[this.#fileExtension].default;
        }
        this.window = undefined;
    }


    /**
     * 
     * @returns {void}
     */
    open() {
        if(this.window) {
            this.window.minimize();
            return;
        }

        this.window = new luna_window(this.#name, 100, 100, 500, 500, 300, 300, (open_window) => {
            this.#openFunction(open_window, this.#text, this.#name, this)
        }, () => {
            this.window = undefined;
        });
    }

    /**
     * 
     * @param {string} text 
     * @returns {boolean}
     */
    editText(text) {
        if(!this.#save_enabled) return false;

        this.#text = text;
        return true;
    }

    /**
     * 
     * @param {string} name 
     * @returns {boolean}
     */
    editName(name) {
        if(!this.#save_enabled) return false;
        this.#name = name;

        return true;
    }

    /**
     * 
     * @returns {string}
     */
    getName() {
        return this.#name;
    }

    getText() {
        return this.#text;
    }
}

class folder {
    #name
    #readonly
    #files
    #id_pass
    
    /**
     * 
     * @param {string} path 
     * @param {string} name 
     * @param {boolean} readonly 
     * @param {string} id_pass 
     */
    constructor(path, name, readonly, id_pass) {
        this.path = path;
        this.#name = name;
        this.#readonly = readonly;
        this.#id_pass = undefined;

        this.#id_pass = id_pass;
        this.#files = {};
    }

    getName() {
        return this.#name;
    }

    /**
     * 
     * @param {string} name 
     * @param {string} id_pass 
     * @returns {boolean}
     */
    edit_name(name, id_pass) {
        if(this.#readonly && this.#id_pass != id_pass) return false;
        
        this.#name = name;
        return true;
    }

    /**
     * 
     * @returns {Object}
     */
    getFiles() {
        return this.#files;
    }

    /**
     * 
     * @param {string} file_key 
     * @param {string} id_pass 
     */
    deleteFile(file_key, id_pass) {
        if(this.#readonly && this.#id_pass != id_pass) return false;
        this.#files[file_key] = undefined;
    }

    /**
     * 
     * @param {boolean} read_only 
     * @param {string} id_pass 
     * @returns {boolean}
     */
    setReadonly(read_only, id_pass) {
        if(this.#readonly == true && this.#id_pass != id_pass) return false;
        
        this.#readonly = read_only;
        return true;
    }

    /**
     * 
     * @param {string} file_name 
     * @returns {file}
     */
    getFile(file_name) {
        return this.#files[file_name];
    }

    /**
     * 
     * @param {string} file_name 
     * @param {file} file 
     * @param {string} id_pass 
     * @returns {boolean}
     */
    appendFile(file_name, file, id_pass) {
        if(this.#readonly && this.#id_pass != id_pass) return false;

        this.#files[file_name] = file;

        return true;
    }

    /**
     * 
     * @param {string} folder_name 
     * @param {string} folder 
     * @param {string} id_pass 
     * @returns 
     */
    appendFolder(folder_name, id_pass) {
        if(this.#readonly && this.#id_pass != id_pass) return false;
        
        this.#files[folder_name] = folder_name;
        return true;
    }

    /**
     * 
     * @param {string} id 
     * @returns { boolean }
     */
    checkId(id) {
        if(!this.#readonly) return true;

        if(this.#id_pass == id) return true;

        return false;
    }

    /**
     * 
     * @param {string} old_file_name 
     * @param {string} file_name 
     * @param {string} id_pass 
    */
    async editFileName(old_file_name, file_name, id_pass) {
        if(this.#readonly && this.#id_pass != id_pass) return false;

        if(typeof this.#files[old_file_name] == "undefined" || typeof this.#files[old_file_name] == "string") return false;

        this.#files[old_file_name].editName(file_name);

        this.#files[file_name] = this.#files[old_file_name];
        delete this.#files[old_file_name]
        return true;
    }
}

/**
 * @returns {string}
 */
function generate_id_pass() {
    let id_pass_chars = "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    let id_pass = "";

    for(let i = 0; i < 20; i++) {
        id_pass += id_pass_chars[randomIntMinMax(0, id_pass_chars.length)];
    }


    return id_pass;
}

/**
 * @param {luna_window} this_window 
 * @param {string} text 
 * @param {string} name 
 * @param {file} file_class
 */
async function openText(this_window, text, name, file_class, id_pass) {
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

            console.log(file_class);

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

let open_with_applications = {
    txt : {
        default : openText,
        options : {}
    },
    html: {
        default : openText,
        options : {}
    }, 
    css: {
        default : openText,
        options : {}
    },
    js : {
        default : openText,
        options : {}
    },
    png : {
        default : openImage,
        options : {}
    },
    svg : {
        default : openImage,
        options : {}
    },
    jpg : {
        default : openImage,
        options : {}
    },
    avif : {
        default : openImage,
        options : {}
    },
    apng : {
        default : openImage,
        options : {}
    },
    gif : {
        default : openImage,
        options : {}
    },
    jpeg : {
        default : openImage,
        options : {}
    },
    webp : {
        default : openImage,
        options : {}
    }
}