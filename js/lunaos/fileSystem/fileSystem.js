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

        let lunaOSPass = generateIdPass();
        this.createFolder("~/", "lunaOS", true, lunaOSPass);
        
        // Home files
        this.files["~/lunaOS"].appendFile("index.js", new file(await this.getFile("/js/lunaos/index.js"), "lunaOS.js", undefined, false), lunaOSPass);
        this.files["~/lunaOS"].appendFile("colorThemes.js", new file(await this.getFile("/js/lunaos/colorThemes.js"), "colorThemes.js",undefined, false), lunaOSPass);
        this.files["~/lunaOS"].appendFile("iconThemes.js", new file(await this.getFile("/js/lunaos/iconThemes.js"), "iconThemes.js", undefined, false), lunaOSPass);
        this.files["~/lunaOS"].appendFile("contextMenuFunction.js", new file(await this.getFile("/js/lunaos/contextMenuFunction.js"), "contextMenuFunction.js", undefined, false), lunaOSPass);
        this.files["~/lunaOS"].appendFile("index.html", new file(await this.getFile("index.html"), "index.html", undefined, false), lunaOSPass);

        this.files["~/lunaOS"].appendFile("readme.txt", new file(await this.getFile("/js/lunaos/readme.txt"), "readme.txt", undefined, false), lunaOSPass);

        // CSS
        this.createFolder("~/lunaOS/", "css", true, lunaOSPass);
        this.files["~/lunaOS/css"].appendFile("main.css", new file(await this.getFile("/css/lunaos/main.css"), "main.css", undefined, false), lunaOSPass);


        // Window dir files
        this.createFolder("~/lunaOS/", "windows", true, lunaOSPass);
        this.files["~/lunaOS/windows"].appendFile("window.js", new file(await this.getFile("/js/lunaos/windows/window.js"), "window.js", undefined, false), lunaOSPass);

        // Utils dir Files
        this.createFolder("~/lunaOS/", "utils", true, lunaOSPass);

        this.files["~/lunaOS/utils"].appendFile("utils.js", new file(await this.getFile("/js/lunaos/utils/utils.js"), "utils.js", undefined, false), lunaOSPass);
        
        // Bottom Bar files
        this.createFolder("~/lunaOS/", "bottomBar", true, lunaOSPass);
        this.files["~/lunaOS/bottomBar"].appendFile("bottomBar.js", new file(await this.getFile("/js/lunaos/bottomBar/bottomBar.js"), "bottomBar.js", undefined, false), lunaOSPass);
        
        // File system files
        this.createFolder("~/lunaOS/", "fileSystem", true, lunaOSPass);
        this.files["~/lunaOS/fileSystem"].appendFile("fileSystem.js", new file(await this.getFile("/js/lunaos/fileSystem/fileSystem.js"), "fileSystem.js", undefined, false), lunaOSPass);

        //Application files
        this.createFolder("~/lunaOS/", "applications", true, lunaOSPass);
        // Command Line
        this.createFolder("~/lunaOS/applications/", "commandWindow", true, lunaOSPass);
        this.files["~/lunaOS/applications/commandWindow"].appendFile("commandWindow.js", new file(await this.getFile("/js/lunaos/applications/commandWindow/commandWindow.js"), "commandWindow.js", undefined, false), lunaOSPass);

        this.createFolder("~/lunaOS/applications/commandWindow/", "classes", true, lunaOSPass);
        this.files["~/lunaOS/applications/commandWindow/classes"].appendFile("Line.js", new file(await this.getFile("/js/lunaos/applications/commandWindow/classes/Line.js"), "Line.js", undefined, false));
        this.files["~/lunaOS/applications/commandWindow/classes"].appendFile("Terminal.js",new file(await this.getFile("/js/lunaos/applications/commandWindow/classes/Terminal.js"), "Terminal.js", undefined, false), lunaOSPass);

        this.createFolder("~/lunaOS/applications/commandWindow/", "commands", true, lunaOSPass);
        this.files["~/lunaOS/applications/commandWindow/commands"].appendFile("clear.js", new file(await this.getFile("/js/lunaos/applications/commandWindow/commands/clear.js"), "clear.js", undefined, false), lunaOSPass);
        this.files["~/lunaOS/applications/commandWindow/commands"].appendFile("developers.js", new file(await this.getFile("/js/lunaos/applications/commandWindow/commands/developers.js"), "developers.js", undefined, false), lunaOSPass);
        this.files["~/lunaOS/applications/commandWindow/commands"].appendFile("github.js", new file(await this.getFile("/js/lunaos/applications/commandWindow/commands/github.js"), "github.js", false, undefined), lunaOSPass);
        this.files["~/lunaOS/applications/commandWindow/commands"].appendFile("header.js", new file(await this.getFile("/js/lunaos/applications/commandWindow/commands/header.js"), "header.js", undefined, false), lunaOSPass);
        this.files["~/lunaOS/applications/commandWindow/commands"].appendFile("help.js", new file(await this.getFile("/js/lunaos/applications/commandWindow/commands/help.js"), "help.js", undefined, false), lunaOSPass);

        //File Explorer
        this.createFolder("~/lunaOS/applications/", "fileExplorer", true, lunaOSPass);
        this.files["~/lunaOS/applications/fileExplorer"].appendFile("fileExplorer.js", new file(await this.getFile("/js/lunaos/applications/fileExplorer/fileExplorer.js"), "fileExplorer.js", undefined, false), lunaOSPass);

        // Settings
        this.createFolder("~/lunaOS/applications/", "settings", true, lunaOSPass);
        this.files["~/lunaOS/applications/settings"].appendFile("settingsWindow.js", new file(await this.getFile("/js/lunaos/applications/settings/settingsWindow.js"), "settingsWindow.js", undefined, false), lunaOSPass);

        this.createFolder("~/lunaOS/applications/settings/", "pages", true, lunaOSPass);
        this.files["~/lunaOS/applications/settings/pages"].appendFile("homePage.js", new file(await this.getFile("/js/lunaos/applications/settings/pages/homePage.js"), "homePage.js", undefined, false), lunaOSPass);
        this.files["~/lunaOS/applications/settings/pages"].appendFile("personalization.js", new file(await this.getFile("/js/lunaos/applications/settings/pages/personalization.js"), "personalization.js", undefined, false), lunaOSPass);

        // Photos
        this.createFolder("~/lunaOS/", "photos", true, lunaOSPass);

        // Backgrounds
        this.createFolder("~/lunaOS/photos/", "backgrounds", true, lunaOSPass);
        this.files["~/lunaOS/photos/backgrounds"].appendFile("anime.png", new file("/photos/lunaos/backgrounds/anime.png", "anime.png", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/backgrounds"].appendFile("desktop.png", new file("/photos/lunaos/backgrounds/desktop.jpg", "desktop.jpg", undefined, false), lunaOSPass);

        //Bottom Bar
        this.createFolder("~/lunaOS/photos/", "bottomBar", true, lunaOSPass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("fileExplorer.svg",new file("/photos/lunaos/bottomBar/fileExplorer.svg", "fileExplorer.svg", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("settings.svg",new file("/photos/lunaos/bottomBar/settings.svg", "settings.svg", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("settingsButton.png",new file("/photos/lunaos/bottomBar/settingsButton.png", "settingsButton.png", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("settingsButtonAnime.png",new file("/photos/lunaos/bottomBar/settingsButtonAnime.png", "settingsButtonAnime.png", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("terminal.png",new file("/photos/lunaos/bottomBar/terminal.png", "terminal.png", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("terminal.svg",new file("/photos/lunaos/bottomBar/terminal.svg", "terminal.svg", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/bottomBar"].appendFile("terminalAnime.png",new file("/photos/lunaos/bottomBar/terminalAnime.png", "terminalAnime.png", undefined, false), lunaOSPass);
        
        //Icons
        this.createFolder("~/lunaOS/photos/", "icons", true, lunaOSPass);
        this.files["~/lunaOS/photos/icons"].appendFile("file.svg", new file("/photos/lunaos/icons/file.svg", "file.svg", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/icons"].appendFile("folder.svg", new file("/photos/lunaos/icons/folder.svg", "folder.svg", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/icons"].appendFile("file-minus.svg", new file("/photos/lunaos/icons/file-minus.svg", "file-minus.svg", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/icons"].appendFile("file-plus.svg", new file("/photos/lunaos/icons/file-plus.svg", "file-plus.svg", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/icons"].appendFile("folder-minus.svg", new file("/photos/lunaos/icons/folder-minus.svg", "folder-minus.svg", undefined, false), lunaOSPass);
        this.files["~/lunaOS/photos/icons"].appendFile("folder-plus.svg", new file("/photos/lunaos/icons/folder-plus.svg", "folder-plus.svg", undefined, false), lunaOSPass);
    }

    /**
     * 
     * @param {string} path 
     * @param {string} name 
     * @param {boolean} readonly
     */
    async createFolder(path, name, readonly, idPass) {
        path += `${name}`;

        if(this.files[path]) return false;

        path = path.split("/");

        path[0] = `${path[0]}/`

        let currentPath = path[0];

        let lastPath = currentPath;

        if(!this.files[currentPath]) {
            this.files[currentPath] = new folder(currentPath, path[0], readonly, idPass);
        }

        for(let i = 1; i < path.length; i++) {

            if(i == 1) {
                currentPath = `${currentPath}${path[i]}`;
            } else {
                currentPath = `${currentPath}/${path[i]}`;
            }
            this.files[lastPath].appendFolder(path[i], idPass);;

            
            if(!this.files[currentPath]) {
                this.files[currentPath] = new folder(currentPath, path[i], readonly, idPass);
            }

            lastPath = currentPath;
        }

        return true;
    }

    /**
     * 
     * @param {string} path 
     * @param {string} idPass 
     */
    editFolderPath(path, newPath, idPass) {

        let matchingId = this.files[path].checkId(idPass);

        if(!matchingId) return false;

        this.files[newPath] = this.files[path];

        let name = newPath.split("/")[newPath.split("/").length - 1];
        let lastFolderName = path.split("/")[path.split("/").length - 1]

        let lastFolder = path.split("/").slice(0, -1).join("/");

        if(path.split("/").slice(0, -1).join("/").length == 1) {
            lastFolder = "~/"
        }

        this.files[lastFolder].deleteFile(lastFolderName, idPass);

        this.files[lastFolder].appendFile(name, name, idPass);

        this.files[path] = undefined;

        this.files[newPath].editName(name, idPass);
    }


    /**
     * 
     * 
     */
    deleteFolderPath(path, idPass) {
        let matchingId = this.files[path].checkId(idPass);
        if(!matchingId) return false;

        let lastFolder = path.split("/").slice(0, -1).join("/");

        if(path.split("/").slice(0, -1).join("/").length == 1) {
            lastFolder = "~/"
        }

        console.log(this.files[path].getName());
        this.files[lastFolder].deleteFile(this.files[path].getName(), idPass);

        this.files[path] = undefined;
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
    #saveEnabled
    #openFunction
    #fileExtension

    /**
     * 
     * @param {string} text 
     * @param {string} name 
     * @param {function} openFunction 
     * @param {boolean} saveEnabled 
     */
    constructor(text, name, openFunction, saveEnabled = true) {
        this.#text = text;
        this.#name = name;
        this.#saveEnabled = saveEnabled;
        this.#openFunction = openFunction;

        
        this.#fileExtension = this.#name.split(".")[this.#name.split(".").length - 1];
        
        if(!this.#openFunction) {
            this.#openFunction = openWithApplications[this.#fileExtension].default;
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

        this.window = new lunaWindow(this.#name, 100, 100, 500, 500, 300, 300, (openWindow) => {
            this.#openFunction(openWindow, this.#text, this.#name, this)
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
        if(!this.#saveEnabled) return false;

        this.#text = text;
        return true;
    }

    /**
     * 
     * @param {string} name 
     * @returns {boolean}
     */
    editName(name) {
        if(!this.#saveEnabled) return false;
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
    #idPass
    
    /**
     * 
     * @param {string} path 
     * @param {string} name 
     * @param {boolean} readonly 
     * @param {string} idPass 
     */
    constructor(path, name, readonly, idPass) {
        this.path = path;
        this.#name = name;
        this.#readonly = readonly;
        this.#idPass = undefined;

        this.#idPass = idPass;
        this.#files = {};
    }

    getName() {
        return this.#name;
    }

    /**
     * 
     * @param {string} name 
     * @param {string} idPass 
     * @returns {boolean}
     */
    editName(name, idPass) {
        if(this.#readonly && this.#idPass != idPass) return false;
        
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
     * @param {string} fileKey 
     * @param {string} idPass 
     */
    deleteFile(fileKey, idPass) {
        if(this.#readonly && this.#idPass != idPass) return false;
        this.#files[fileKey] = undefined;
    }

    /**
     * 
     * @param {boolean} readOnly 
     * @param {string} idPass 
     * @returns {boolean}
     */
    setReadonly(readOnly, idPass) {
        if(this.#readonly == true && this.#idPass != idPass) return false;
        
        this.#readonly = readOnly;
        return true;
    }

    /**
     * 
     * @param {string} fileName 
     * @returns {file}
     */
    getFile(fileName) {
        return this.#files[fileName];
    }

    /**
     * 
     * @param {string} fileName 
     * @param {file} file 
     * @param {string} idPass 
     * @returns {boolean}
     */
    appendFile(fileName, file, idPass) {
        if(this.#readonly && this.#idPass != idPass) return false;

        this.#files[fileName] = file;

        return true;
    }

    /**
     * 
     * @param {string} folderName 
     * @param {string} folder 
     * @param {string} idPass 
     * @returns 
     */
    appendFolder(folderName, idPass) {
        if(this.#readonly && this.#idPass != idPass) return false;
        
        this.#files[folderName] = folderName;
        return true;
    }

    /**
     * 
     * @param {string} id 
     * @returns { boolean }
     */
    checkId(id) {
        if(!this.#readonly) return true;

        if(this.#idPass == id) return true;

        return false;
    }

    /**
     * 
     * @param {string} oldFileName 
     * @param {string} fileName 
     * @param {string} idPass 
    */
    async editFileName(oldFileName, fileName, idPass) {
        if(this.#readonly && this.#idPass != idPass) return false;

        if(typeof this.#files[oldFileName] == "undefined" || typeof this.#files[oldFileName] == "string") return false;

        this.#files[oldFileName].editName(fileName);

        this.#files[fileName] = this.#files[oldFileName];
        delete this.#files[oldFileName]
        return true;
    }
}

/**
 * @returns {string}
 */
function generateIdPass() {
    let idPassChars = "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    let idPass = "";

    for(let i = 0; i < 20; i++) {
        idPass += idPassChars[randomIntMinMax(0, idPassChars.length)];
    }


    return idPass;
}

/**
 * @param {lunaWindow} thisWindow 
 * @param {string} text 
 * @param {string} name 
 * @param {file} fileClass
 */
async function openText(thisWindow, text, name, fileClass, idPass) {
    let textBox = document.createElement("textarea");
    textBox.style.height = "98%";
    textBox.style.width = "99%";
    textBox.style.color = colorThemes[currentTheme].text;
    textBox.style.background = "none";
    textBox.style.border = "none";
    textBox.textContent = text;
    textBox.id = `${name}TextEditor`;
    textBox.autocomplete = "off";
    textBox.autocapitalize = "off";
    textBox.spellcheck = "false";
    textBox.style.resize = "none";
    textBox.style.whiteSpace = "nowrap";
    textBox.style.overflow = "auto";

    thisWindow.holderDiv.appendChild(textBox);

    textBox.addEventListener("keydown", (ev) => {
        if(ev.key == "s" && ev.ctrlKey) {
            ev.preventDefault();

            console.log(fileClass);

            fileClass.editText(textBox.value);
        }
    })
}

/**
 * @param {lunaWindow} thisWindow 
 * @param {string} text 
 * @param {string} name 
 * @param {file} fileClass
 */
async function openImage(thisWindow, image, name, fileClass) {
    let imageBox = document.createElement("img");
    imageBox.style.height = "98%";
    imageBox.style.width = "99%";
    imageBox.style.background = "none";
    imageBox.style.border = "none";
    imageBox.alt = name;
    imageBox.id = `${name}ImageViewer`;
    imageBox.style.overflow = "auto";
    imageBox.src = image;
    imageBox.style.objectFit = "fill";

    thisWindow.holderDiv.style.backgroundColor = "#4c4d4c";

    thisWindow.holderDiv.appendChild(imageBox);
}

let openWithApplications = {
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