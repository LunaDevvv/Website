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
 * @typedef {import("../../index")}
 */

/**
 * @typedef {import("../../contextMenuFunction")}
 */

/**
 * 
 * @param {lunaWindow} explorerWindow 
 */
async function fileExplorerFunction(explorerWindow) {
    explorerWindow.addToStorage("currentPath", "~/");
    explorerWindow.addToStorage("pathButtons", []);
    explorerWindow.addToStorage("lastPathArray", ["~/"]);

    explorerWindow.holderDiv.style.overflowX = "hidden";

    let pathBar = document.createElement("input");
    pathBar.value = explorerWindow.windowStorage["currentPath"];
    pathBar.style.width = "100%";
    pathBar.style.marginTop = "2px";
    pathBar.style.borderRadius = "5%";
    pathBar.style.height = "20px";
    pathBar.style.border = "none";
    pathBar.style.backgroundColor = colorThemes[currentTheme].fileExplorerSearchBar;
    pathBar.style.color = colorThemes[currentTheme].text;
    pathBar.style.position = "absolute";
    pathBar.style.left = "120px";

    pathBar.onchange = valueChange;
    let backIndex = 0;
    
    const FILE_HOLDER = document.createElement("div");
    FILE_HOLDER.style.position = "absolute";
    FILE_HOLDER.style.top = "30px";
    FILE_HOLDER.style.width = "100%";
    FILE_HOLDER.style.height = "calc(100% - 30px)"

    function valueChange() {
        explorerWindow.windowStorage["currentPath"] = pathBar.value;

        if(typeof explorerWindow.windowHolder["pathButtons"] == "undefined") {
            explorerWindow.windowHolder["pathButtons"] = [];
        }

        while(FILE_HOLDER.firstChild) {
            FILE_HOLDER.lastChild.remove();
        }


        for(const [KEY, VALUE] of Object.entries(osFileSystem.files[pathBar.value].getFiles())) {
            let button = document.createElement("button");

            button.onclick = () => {
                for(let i = 0; i < FILE_HOLDER.children.length; i++) {
                    let editButton = FILE_HOLDER.children[i];
                    
                    editButton.style.backgroundColor = colorThemes[currentTheme].fileExplorerUnselectedButton;
                }

                button.style.backgroundColor = colorThemes[currentTheme].fileExplorerSelectedButton;
            }
            if(typeof osFileSystem.files[pathBar.value].getFile(KEY) == "undefined") continue;

            if(typeof osFileSystem.files[pathBar.value].getFile(KEY) == "string") {
                let text = document.createElement("p");
                text.textContent = "📁";
                text.style.top = "-13px";
                text.style.left = "0px";
                text.style.position = "relative"
                text.style.marginBottom = "0";

                let input = document.createElement("input");
                input.style.width = "100%";
                input.style.height = "100%";
                input.type = "text";
                input.style.position = "relative";
                input.style.top = "-30px";
                input.style.left = "20px";
                input.style.border = "none";
                input.style.background = "none";
                input.readOnly = "readonly";
                input.style.cursor = "default";
                input.style.zIndex = "1";
                input.style.marginBottom = "0";

                button.style.marginTop = "-5px"

                button.style.textAlign = "left";
                button.appendChild(text);

                button.oncontextmenu = (ev) => {
                    ev.preventDefault();
                    const CONTEXT_DIV = createContextMenu(ev, 40);


                    const DELETE_FOLDER_BUTTON = createContextButton("Delete", () => {
                        let folderPath = "";

                        if(pathBar.value == "~/") folderPath = pathBar.value + input.value;
                        else folderPath = pathBar.value + `/${input.value}`;

                        console.log(folderPath);

                        console.log(osFileSystem.files[folderPath]);
                        osFileSystem.deleteFolderPath(folderPath);

                        valueChange();
                    });

                    const RENAME_FOLDER_BUTTON = createContextButton("Rename", () => {
                        input.readOnly = "";
                        input.style.cursor = "text";
                    });

                    CONTEXT_DIV.appendChild(DELETE_FOLDER_BUTTON);
                    CONTEXT_DIV.appendChild(RENAME_FOLDER_BUTTON);

                    document.body.appendChild(CONTEXT_DIV);
                }

                
                input.onkeydown = (ev) => {
                    if(ev.key == "F2") {
                        input.readOnly = "";
                        input.style.cursor = "text";
                    }
                }
                
                input.onchange = (ev) => {   
                    input.readOnly = "readOnly";
                    input.style.cursor = "default";

                    let path = pathBar.value + "/" + input.value;

                    let oldPath = pathBar.value + "/" + oldText

                    if(pathBar.value.endsWith("/")) path = pathBar.value + input.value;
                    if(pathBar.value.endsWith("/")) oldPath = pathBar.value + oldText;

                    let result = osFileSystem.editFolderPath(oldPath, path);

                    if(result == false) input.value = `${osFileSystem.files[pathBar.value].getFile(KEY)}`;
                    else {
                        oldText = pathBar.value + "/" + input.value;
                    }
                }

                input.value = `${osFileSystem.files[pathBar.value].getFile(KEY)}`;
                let oldText = input.value;

                button.appendChild(input);

                button.ondblclick = () => {
                    explorerWindow.windowStorage["lastPathArray"] = [];
                    backIndex = -1;

                    if(pathBar.value == "~/") pathBar.value += input.value;
                    else pathBar.value += `/${input.value}`;

                    valueChange();
                }

            } else {
                let text = document.createElement("p");
                text.textContent = "📄";
                text.style.top = "-13px";
                text.style.left = "0px";
                text.style.position = "relative"
                text.style.marginBottom = "0";

                let input = document.createElement("input");
                input.style.width = "100%";
                input.style.height = "100%";
                input.type = "text";
                input.style.border = "none";
                input.style.background = "none";
                input.readOnly = "readonly";
                input.style.cursor = "default";
                input.style.position = "relative";
                input.style.top = "-30px";
                input.style.left = "20px";
                input.style.zIndex = "1";

                button.style.marginTop = "-5px"

                button.style.textAlign = "left";
                button.appendChild(text);

                input.onkeydown = (ev) => {
                    if(ev.key == "F2") {
                        input.readOnly = "";
                        input.style.cursor = "text";
                    }
                }

                input.onchange = (ev) => {
                    input.readOnly = "readOnly";
                    input.style.cursor = "default";

                    osFileSystem.files[pathBar.value].editFileName(osFileSystem.files[pathBar.value].editFileName(KEY, input.value));

                    valueChange();
                }

                input.value = `${osFileSystem.files[pathBar.value].getFile(KEY).getName()}`;

                console.log(input.value);

                button.appendChild(input);

                button.ondblclick = () => {
                    osFileSystem.files[pathBar.value].getFile(KEY).open();
                }
            }

            button.style.width = "100%";
            button.style.height = "25px";
            button.style.color = colorThemes[currentTheme].text;
            button.style.backgroundColor = colorThemes[currentTheme].fileExplorerUnselectedButton;
            button.style.borderRadius = "10px";


            explorerWindow.windowStorage["pathButtons"].push(button);

            FILE_HOLDER.appendChild(button);
        }
    }

    let backButton = document.createElement("button");
    backButton.style.background = "none";
    backButton.style.border = "none";
    backButton.style.left = "0px";
    backButton.style.top = "0px";
    backButton.style.position = "absolute";
    
    let backIcon = document.createElement("img");
    backIcon.src = "/photos/LunaOS/icons/backButton.png";
    backIcon.width = "20";
    backIcon.height = "20";
    backIcon.style.borderRadius = "50%";

    backButton.appendChild(backIcon);


    backButton.onclick = () => {
        let path = explorerWindow.windowStorage["currentPath"];

        if(typeof explorerWindow.windowStorage["lastPathArray"] == "undefined") explorerWindow.window.windowStorage["lastPathArray"] = [];

        explorerWindow.windowStorage["lastPathArray"].push(path);
        backIndex += 1;
        let splitPath = path.split("/");

        splitPath.splice(splitPath.length - 1);

        if(splitPath == ["~"]) path = "~/";
        else path = splitPath.join("/");

        if(path == "~") {
            path = "~/"
        }


        pathBar.value = path;

        valueChange();
    }

    let forwardButton = document.createElement("button");
    forwardButton.style.background = "none";
    forwardButton.style.border = "none";
    forwardButton.style.left = "40px";
    forwardButton.style.position = "absolute";
    forwardButton.style.top = "0px";

    let forwardIcon = document.createElement("img");
    forwardIcon.src = "/photos/LunaOS/icons/forwardButton.png";
    forwardIcon.width = "20";
    forwardIcon.height = "20";
    forwardIcon.style.borderRadius = "50%";

    forwardButton.appendChild(forwardIcon);

    forwardButton.onclick = () => {
        if(backIndex < 0) return;

        
        if(backIndex - 1 >= 0) {
            backIndex -= 1
        }

        explorerWindow.windowStorage["currentPath"] = explorerWindow.windowStorage["lastPathArray"][backIndex];
        pathBar.value = explorerWindow.windowStorage["currentPath"];

        valueChange();
    }

    let homeButton = document.createElement("button");
    homeButton.style.background = "none";
    homeButton.style.border = "none";
    homeButton.style.left = "20px";
    homeButton.style.top = "0px";
    homeButton.style.position = "absolute";

    let homeIcon = document.createElement("img");
    homeIcon.src = "/photos/LunaOS/icons/homeButton.png";
    homeIcon.width = "20";
    homeIcon.height = "20";
    homeIcon.style.borderRadius = "50%";

    homeButton.appendChild(homeIcon);

    homeButton.onclick = () => {
        if(typeof explorerWindow.windowStorage["lastPathArray"] == "undefined") explorerWindow.window.windowStorage["lastPathArray"] = [];

        explorerWindow.windowStorage["lastPathArray"].push(pathBar.value);
        backIndex += 1;

        explorerWindow.windowStorage["currentPath"] = "~/";
        pathBar.value = "~/";

        valueChange();
    }


    let newFileButton = document.createElement("button");
    newFileButton.style.background = 'none';
    newFileButton.style.border = 'none';
    newFileButton.style.position = 'absolute';
    newFileButton.style.left = "95px";
    newFileButton.style.top = "1px";
    newFileButton.style.width = "20px";
    newFileButton.style.height = "20px";
    newFileButton.style.backgroundColor = "#F44336";
    newFileButton.style.borderRadius = "50%";

    let newFileIcon = document.createElement("img");
    newFileIcon.src = "/photos/LunaOS/icons/file-plus.svg";
    newFileIcon.width = "15";
    newFileIcon.height = "15";
    newFileIcon.style.left = "3px";
    newFileIcon.style.top = "3px";
    newFileIcon.style.position = "absolute";

    newFileButton.appendChild(newFileIcon);

    newFileButton.onclick = () => {
        let currentDir = pathBar.value;
        let fileDir = "newFile";

        let i = 1;

        if(typeof osFileSystem.files[currentDir].getFile(`${fileDir}.txt`) == "undefined") {
            osFileSystem.files[currentDir].appendFile(`${fileDir}.txt`, new file(``, `${fileDir}.txt`, undefined, true));

            return valueChange();
        }
        while(typeof osFileSystem.files[currentDir].getFile(`${fileDir}${i}.txt`) != "undefined") {
            i++;
        }

        osFileSystem.files[currentDir].appendFile(`${fileDir}${i}.txt`, new file(``, `${fileDir}${i}.txt`, undefined, true));
        return valueChange();
    }

    let newFolderButton = document.createElement("button");
    newFolderButton.style.background = 'none';
    newFolderButton.style.border = 'none';
    newFolderButton.style.position = 'absolute';
    newFolderButton.style.left = "70px";
    newFolderButton.style.top = "1px";
    newFolderButton.style.width = "20px";
    newFolderButton.style.height = "20px";
    newFolderButton.style.backgroundColor = "#F44336";
    newFolderButton.style.borderRadius = "50%";

    let newFolderIcon = document.createElement("img");
    newFolderIcon.src = "/photos/LunaOS/icons/folder-plus.svg";
    newFolderIcon.width = "15";
    newFolderIcon.height = "15";
    newFolderIcon.style.left = "3px";
    newFolderIcon.style.top = "3px";
    newFolderIcon.style.position = "absolute";

    newFolderButton.appendChild(newFolderIcon);

    newFolderButton.onclick = () => {
        let currentDir = pathBar.value;
        let fileDir = "newFolder";

        if(!currentDir.endsWith("/")) currentDir = `${currentDir}/`;

        let i = 1;

        if(typeof osFileSystem.files[`${currentDir}${fileDir}`] == "undefined") {
            osFileSystem.createFolder(currentDir, `${fileDir}`);

            return valueChange();
        }
        while(typeof osFileSystem.files[`${currentDir}${fileDir}${i}`] != "undefined") {
            i++;
        }

        osFileSystem.createFolder(pathBar.value, `${fileDir}${i}`);

        return valueChange();
    }

    explorerWindow.holderDiv.appendChild(pathBar);
    explorerWindow.holderDiv.appendChild(backButton);
    explorerWindow.holderDiv.appendChild(homeButton);
    explorerWindow.holderDiv.appendChild(forwardButton);
    explorerWindow.holderDiv.appendChild(newFileButton);
    explorerWindow.holderDiv.appendChild(newFolderButton);
    explorerWindow.holderDiv.appendChild(FILE_HOLDER);

    FILE_HOLDER.oncontextmenu = (ev) => {
        console.log(ev.target);
        if(ev.target !== FILE_HOLDER) return;

        ev.preventDefault();


        const CONTEXT_DIV = createContextMenu(ev, 100, undefined);

        const NEW_FILE_CONTEXT_BUTTON = createContextButton("New File", () => {
            newFileButton.click();
        });

        const NEW_FOLDER_CONTEXT_BUTTON = createContextButton("New Folder", () => {
            newFolderButton.click();
        });

        const BACK_CONTEXT_BUTTON = createContextButton("back", () => {
            backButton.click();
    
            contextDiv.remove();
        });

        const HOME_CONTEXT_BUTTON = createContextButton("home", () => {
            homeButton.click();
        });

        const FORWARD_CONTEXT_BUTTON = createContextButton("forward", () => {
            forwardButton.click();
        })

        CONTEXT_DIV.appendChild(NEW_FILE_CONTEXT_BUTTON);
        CONTEXT_DIV.appendChild(NEW_FOLDER_CONTEXT_BUTTON);
        CONTEXT_DIV.appendChild(BACK_CONTEXT_BUTTON);
        CONTEXT_DIV.appendChild(HOME_CONTEXT_BUTTON);
        CONTEXT_DIV.appendChild(FORWARD_CONTEXT_BUTTON);

        document.body.appendChild(CONTEXT_DIV);
    }

    valueChange();
}