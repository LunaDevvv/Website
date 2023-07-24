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
 * @typedef {import("../../../windows/window")}
 * @typedef {import("../../../color_themes")}
 * @param {luna_window} window 
 */
async function systemPage(window) {
    while(window.holder_div.firstChild) {
        window.holder_div.firstChild.remove();
    }

    let mainDiv = document.createElement("div");
    mainDiv.style.position = "absolute";
    mainDiv.style.left = "15%";
    mainDiv.style.width = "85%";
    mainDiv.style.height = "100%";

    let sideDiv = await makeSideDiv(window);
    
    let systemTitle = document.createElement("h1");
    systemTitle.textContent = "LunaOS";
    systemTitle.style.color = color_themes[current_theme].text;
    systemTitle.style.textAlign = "center";
    
    let systemVersion = document.createElement("h2");
    systemVersion.textContent = "Version: v0.3.5";
    systemVersion.style.color = color_themes[current_theme].text;
    systemVersion.style.textAlign = "center";
    
    mainDiv.appendChild(systemTitle);
    mainDiv.appendChild(systemVersion);
    
    window.holder_div.appendChild(mainDiv);
    window.holder_div.appendChild(sideDiv);
}