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
async function personalizationPage(window) {
    while(window.holder_div.firstChild) {
        window.holder_div.firstChild.remove();
    }

    let divider = document.createElement("hr");

    let mainDiv = document.createElement("div");
    mainDiv.style.position = "absolute";
    mainDiv.style.left = "15%";
    mainDiv.style.width = "85%";
    mainDiv.style.height = "100%";

    let sideDiv = await makeSideDiv(window);
    
    let systemTitle = document.createElement("h1");
    systemTitle.textContent = "Personalization";
    systemTitle.style.color = color_themes[current_theme].text;
    systemTitle.style.textAlign = "center";

    let themeText = document.createElement("h3");
    themeText.textContent = "Theme : "
    themeText.style.color = color_themes[current_theme].text;

    let themeSelector = document.createElement("select");
    themeSelector.style.position = "absolute";
    themeSelector.style.left = "calc(100% - 205px)";
    themeSelector.style.top = "90px";
    themeSelector.style.width = "200px";

    let current_theme_option = document.createElement("option");

    current_theme_option.value = current_theme;

    current_theme_option.textContent = current_theme.replace("_", " ");

    themeSelector.appendChild(current_theme_option);

    for(const [key, value] of Object.entries(color_themes)) {

        if(key == current_theme) continue;
        let option = document.createElement("option");

        option.value = key;

        option.textContent = key.replace("_", " ");

        themeSelector.appendChild(option);
    }

    themeSelector.onchange = async (ev) => {
        current_theme = themeSelector.selectedOptions[0].value;
        updateColors();

        sideDiv.children[1].click();
    }

    let iconThemeText = document.createElement("h3");
    iconThemeText.textContent = "Icon Theme : "
    iconThemeText.style.color = color_themes[current_theme].text;

    let iconThemeSelector = document.createElement("select");
    iconThemeSelector.style.position = "absolute";
    iconThemeSelector.style.left = "calc(100% - 205px)";
    iconThemeSelector.style.top = "120px";
    iconThemeSelector.style.width = "200px";

    let current_icon_theme_option = document.createElement("option");

    current_icon_theme_option.value = current_icon_theme;

    current_icon_theme_option.textContent = current_icon_theme.replace("_", " ");

    iconThemeSelector.appendChild(current_icon_theme_option);

    for(const [key, value] of Object.entries(icon_themes)) {
        console.log(key);

        if(key == current_icon_theme) continue;
        let option = document.createElement("option");

        option.value = key;

        option.textContent = key.replace("_", " ");

        iconThemeSelector.appendChild(option);
    }

    iconThemeSelector.onchange = async (ev) => {
        current_icon_theme = iconThemeSelector.selectedOptions[0].value;
        updateIcons();

        sideDiv.children[1].click();
    }
    
    mainDiv.appendChild(systemTitle);
    mainDiv.appendChild(themeText);
    mainDiv.appendChild(themeSelector);
    mainDiv.appendChild(divider);
    mainDiv.appendChild(iconThemeText);
    mainDiv.appendChild(iconThemeSelector);
    mainDiv.appendChild(divider);

    window.holder_div.appendChild(mainDiv);
    window.holder_div.appendChild(sideDiv);
}