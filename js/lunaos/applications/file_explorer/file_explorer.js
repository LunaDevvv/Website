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
    function valueChange() {
        explorer_window.window_storage["current_path"] = pathBar.value;

        if(typeof explorer_window.window_holder["path_buttons"] == "undefined") {
            explorer_window.window_holder["path_buttons"] = [];
        }

        while(file_holder.firstChild) {
            file_holder.lastChild.remove();
        }


        for(const [key, value] of Object.entries(osFileSystem.files[pathBar.value])) {
            let button = document.createElement("button");

            if(typeof osFileSystem.files[pathBar.value][key] == "string") {
                button.textContent = `📁 ${osFileSystem.files[pathBar.value][key]}`;

                button.onclick = () => {
                    explorer_window.window_storage["last_path_array"] = [];
                    backIndex = -1;

                    if(pathBar.value == "~/") pathBar.value += button.textContent.replace("📁 ", "");
                    else pathBar.value += `/${button.textContent.replace("📁 ", "")}`;

                    valueChange();
                }
            } else {
                button.textContent = `📄${osFileSystem.files[pathBar.value][key].name}`;

                button.onclick = () => {
                    osFileSystem.files[pathBar.value][key].open();
                }
            }

            button.style.marginTop = "5px"
            button.style.width = "100%";
            button.style.height = "25px";
            button.style.color = color_themes[current_theme].text;
            button.style.backgroundColor = color_themes[current_theme].file_explorer_search_bar;
            button.style.borderRadius = "10px";


            explorer_window.window_storage["path_buttons"].push(button);

            file_holder.appendChild(button);
        }
    }

    let backButton = document.createElement("button");
    backButton.textContent = "<";
    backButton.style.background = "none";
    backButton.style.height = "20px";
    backButton.style.width = "20px";
    backButton.style.left = "0px";
    backButton.style.top = "0px";
    backButton.style.color = color_themes[current_theme].text;
    backButton.style.borderRadius = "50%";
    backButton.style.borderColor = color_themes[current_theme].text;

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
    forwardButton.textContent = ">";
    forwardButton.style.background = "none";
    forwardButton.style.height = "20px";
    forwardButton.style.width = "20px";
    forwardButton.style.left = "40px";
    forwardButton.style.top = "0px";
    forwardButton.style.color = color_themes[current_theme].text;
    forwardButton.style.borderRadius = "50%";
    forwardButton.style.borderColor = color_themes[current_theme].text;

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
    homeButton.textContent = "⌂";
    homeButton.style.background = "none";
    homeButton.style.height = "20px";
    homeButton.style.width = "20px";
    homeButton.style.left = "30px";
    homeButton.style.top = "0px";
    homeButton.style.color = color_themes[current_theme].text;
    homeButton.style.borderRadius = "50%";
    homeButton.style.borderColor = color_themes[current_theme].text;

    homeButton.onclick = () => {
        if(typeof explorer_window.window_storage["last_path_array"] == "undefined") explorer_window.window.window_storage["last_path_array"] = [];

        explorer_window.window_storage["last_path_array"].push(pathBar.value);
        backIndex += 1;

        explorer_window.window_storage["current_path"] = "~/";
        pathBar.value = "~/";

        valueChange();
    }

    explorer_window.holder_div.appendChild(pathBar);
    explorer_window.holder_div.appendChild(backButton);
    explorer_window.holder_div.appendChild(homeButton);
    explorer_window.holder_div.appendChild(forwardButton);
    explorer_window.holder_div.appendChild(file_holder);

    valueChange();
}