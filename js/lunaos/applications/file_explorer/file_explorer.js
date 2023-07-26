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
 * 
 * @param {luna_window} explorer_window 
 */
async function file_explorer_function(explorer_window) {
    explorer_window.add_to_storage("current_path", "~/");
    explorer_window.add_to_storage("path_buttons", []);
    explorer_window.add_to_storage("last_path_array", ["~/"]);

    let pathBar = document.createElement("input");
    pathBar.value = explorer_window.window_storage["current_path"];
    pathBar.style.width = "85%";
    pathBar.style.marginTop = "2px";
    pathBar.style.borderRadius = "5%";
    pathBar.style.height = "20px";
    pathBar.style.border = "none";
    pathBar.style.backgroundColor = color_themes[current_theme].file_explorer_search_bar;
    pathBar.style.color = color_themes[current_theme].text;
    pathBar.style.position = "absolute";
    pathBar.style.left = "14.6%";

    pathBar.onchange = valueChange;
    let backIndex = 0;
    
    const file_holder = document.createElement("div");
    file_holder.style.position = "absolute";
    file_holder.style.top = "20px";
    file_holder.style.width = "100%";

    function valueChange() {
        explorer_window.window_storage["current_path"] = pathBar.value;

        if(typeof explorer_window.window_holder["path_buttons"] == "undefined") {
            explorer_window.window_holder["path_buttons"] = [];
        }

        while(file_holder.firstChild) {
            file_holder.lastChild.remove();
        }


        for(const [key, value] of Object.entries(osFileSystem.files[pathBar.value].getFiles())) {
            let button = document.createElement("button");

            button.onclick = () => {
                for(let i = 0; i < file_holder.children.length; i++) {
                    let edit_button = file_holder.children[i];
                    
                    edit_button.style.backgroundColor = color_themes[current_theme].file_explorer_unselected_button;
                }

                button.style.backgroundColor = color_themes[current_theme].file_explorer_selected_button;
            }
            if(typeof osFileSystem.files[pathBar.value].getFile(key) == "undefined") continue;


            if(typeof osFileSystem.files[pathBar.value].getFile(key) == "string") {
                let input = document.createElement("input");
                input.style.width = "100%";
                input.style.height = "100%";
                input.type = "text";
                input.style.border = "none";
                input.style.background = "none";
                input.readOnly = "readonly";
                input.style.cursor = "default";

                
                input.onkeydown = (ev) => {
                    if(ev.key == "F2") {
                        input.readOnly = "";
                        input.style.cursor = "text";
                    }
                }
                
                input.onchange = (ev) => {   
                    input.readOnly = "readOnly";
                    input.style.cursor = "default";
                    
                    let path = pathBar.value + "/" + input.value.replace("📁 ", "")

                    let old_path = pathBar.value + "/" + old_text

                    if(pathBar.value.endsWith("/")) path = pathBar.value + input.value.replace("📁 ", "")
                    if(pathBar.value.endsWith("/")) old_path = pathBar.value + old_text.replace("📁 ", "")

                    let result = osFileSystem.editFolderPath(old_path, path);

                    if(result == false) input.value = `📁 ${osFileSystem.files[pathBar.value].getFile(key)}`;
                    else {
                        old_text = pathBar.value + "/" + input.value.replace("📁 ", "");
                    }
                }

                input.value = `📁 ${osFileSystem.files[pathBar.value].getFile(key)}`;
                let old_text = input.value.replace("📁 ", "");

                button.appendChild(input);

                button.ondblclick = () => {
                    explorer_window.window_storage["last_path_array"] = [];
                    backIndex = -1;

                    if(pathBar.value == "~/") pathBar.value += input.value.replace("📁 ", "");
                    else pathBar.value += `/${input.value.replace("📁 ", "")}`;

                    valueChange();
                }

            } else {
                let input = document.createElement("input");
                input.style.width = "100%";
                input.style.height = "100%";
                input.type = "text";
                input.style.border = "none";
                input.style.background = "none";
                input.readOnly = "readonly";
                input.style.cursor = "default";

                input.onkeydown = (ev) => {
                    if(ev.key == "F2") {
                        input.readOnly = "";
                        input.style.cursor = "text";
                    }
                }

                input.onchange = (ev) => {
                    let text = input.value.replace("📄", "");

                    input.readOnly = "readOnly";
                    input.style.cursor = "default";

                    osFileSystem.files[pathBar.value].editFileName(osFileSystem.files[pathBar.value].editFileName(key, input.value.replace("📄", "")));

                    valueChange();
                }

                input.value = `📄${osFileSystem.files[pathBar.value].getFile(key).getName()}`;

                button.appendChild(input);

                button.ondblclick = () => {
                    osFileSystem.files[pathBar.value].getFile(key).open();
                }
            }

            button.style.marginTop = "5px"
            button.style.width = "100%";
            button.style.height = "25px";
            button.style.color = color_themes[current_theme].text;
            button.style.backgroundColor = color_themes[current_theme].file_explorer_unselected_button;
            button.style.borderRadius = "10px";


            explorer_window.window_storage["path_buttons"].push(button);

            file_holder.appendChild(button);
        }
    }

    let backButton = document.createElement("button");
    backButton.style.background = "none";
    backButton.style.border = "none";
    backButton.style.left = "0px";
    backButton.style.top = "0px";
    backButton.style.position = "absolute";
    
    let back_icon = document.createElement("img");
    back_icon.src = "/photos/LunaOS/icons/back_button.png";
    back_icon.width = "20";
    back_icon.height = "20";
    back_icon.style.borderRadius = "50%";

    backButton.appendChild(back_icon);


    backButton.onclick = () => {
        let path = explorer_window.window_storage["current_path"];

        if(typeof explorer_window.window_storage["last_path_array"] == "undefined") explorer_window.window.window_storage["last_path_array"] = [];

        explorer_window.window_storage["last_path_array"].push(path);
        backIndex += 1;
        let split_path = path.split("/");

        split_path.splice(split_path.length - 1);

        if(split_path == ["~"]) path = "~/";
        else path = split_path.join("/");

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

    let forward_icon = document.createElement("img");
    forward_icon.src = "/photos/LunaOS/icons/forward_button.png";
    forward_icon.width = "20";
    forward_icon.height = "20";
    forward_icon.style.borderRadius = "50%";

    forwardButton.appendChild(forward_icon);

    forwardButton.onclick = () => {
        if(backIndex < 0) return;

        
        if(backIndex - 1 >= 0) {
            backIndex -= 1
        }

        explorer_window.window_storage["current_path"] = explorer_window.window_storage["last_path_array"][backIndex];
        pathBar.value = explorer_window.window_storage["current_path"];

        valueChange();
    }

    let homeButton = document.createElement("button");
    homeButton.style.background = "none";
    homeButton.style.border = "none";
    homeButton.style.left = "20px";
    homeButton.style.top = "0px";
    homeButton.style.position = "absolute";

    let home_icon = document.createElement("img");
    home_icon.src = "/photos/LunaOS/icons/home_button.png";
    home_icon.width = "20";
    home_icon.height = "20";
    home_icon.style.borderRadius = "50%";

    homeButton.appendChild(home_icon);

    homeButton.onclick = () => {
        if(typeof explorer_window.window_storage["last_path_array"] == "undefined") explorer_window.window.window_storage["last_path_array"] = [];

        explorer_window.window_storage["last_path_array"].push(pathBar.value);
        backIndex += 1;

        explorer_window.window_storage["current_path"] = "~/";
        pathBar.value = "~/";

        valueChange();
    }


    let new_file_button = document.createElement("button");
    new_file_button.style.background = 'none';
    new_file_button.style.border = 'none';
    new_file_button.style.position = 'absolute';
    new_file_button.style.left = "95px";
    new_file_button.style.top = "1px";
    new_file_button.style.width = "20px";
    new_file_button.style.height = "20px";
    new_file_button.style.backgroundColor = "#F44336";
    new_file_button.style.borderRadius = "50%";

    let new_file_icon = document.createElement("img");
    new_file_icon.src = "/photos/LunaOS/icons/file-plus.svg";
    new_file_icon.width = "15";
    new_file_icon.height = "15";
    new_file_icon.style.left = "3px";
    new_file_icon.style.top = "3px";
    new_file_icon.style.position = "absolute";

    new_file_button.appendChild(new_file_icon);

    new_file_button.onclick = () => {
        let current_dir = pathBar.value;
        let file_dir = "new_file";

        let i = 1;

        if(typeof osFileSystem.files[current_dir].getFile(`${file_dir}.txt`) == "undefined") {
            osFileSystem.files[current_dir].appendFile(`${file_dir}.txt`, new file(``, `${file_dir}.txt`, undefined, true));

            return valueChange();
        }
        while(typeof osFileSystem.files[current_dir].getFile(`${file_dir}${i}.txt`) != "undefined") {
            i++;
        }

        osFileSystem.files[current_dir].appendFile(`${file_dir}${i}.txt`, new file(``, `${file_dir}${i}.txt`, undefined, true));
        return valueChange();
    }

    let new_folder_button = document.createElement("button");
    new_folder_button.style.background = 'none';
    new_folder_button.style.border = 'none';
    new_folder_button.style.position = 'absolute';
    new_folder_button.style.left = "70px";
    new_folder_button.style.top = "1px";
    new_folder_button.style.width = "20px";
    new_folder_button.style.height = "20px";
    new_folder_button.style.backgroundColor = "#F44336";
    new_folder_button.style.borderRadius = "50%";

    let new_folder_icon = document.createElement("img");
    new_folder_icon.src = "/photos/LunaOS/icons/folder-plus.svg";
    new_folder_icon.width = "15";
    new_folder_icon.height = "15";
    new_folder_icon.style.left = "3px";
    new_folder_icon.style.top = "3px";
    new_folder_icon.style.position = "absolute";

    new_folder_button.appendChild(new_folder_icon);

    new_folder_button.onclick = () => {
        let current_dir = pathBar.value;
        let file_dir = "new_folder";

        if(!current_dir.endsWith("/")) current_dir = `${current_dir}/`;

        let i = 1;

        if(typeof osFileSystem.files[`${current_dir}${file_dir}`] == "undefined") {
            osFileSystem.createFolder(current_dir, `${file_dir}`);

            return valueChange();
        }
        while(typeof osFileSystem.files[`${current_dir}${file_dir}${i}`] != "undefined") {
            i++;
        }

        osFileSystem.createFolder(pathBar.value, `${file_dir}${i}`);

        return valueChange();
    }

    explorer_window.holder_div.appendChild(pathBar);
    explorer_window.holder_div.appendChild(backButton);
    explorer_window.holder_div.appendChild(homeButton);
    explorer_window.holder_div.appendChild(forwardButton);
    explorer_window.holder_div.appendChild(new_file_button);
    explorer_window.holder_div.appendChild(new_folder_button);
    explorer_window.holder_div.appendChild(file_holder);

    valueChange();
}