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
 * @typedef {import("../../../colorThemes")}
 * @param {lunaWindow} window 
 */
async function personalizationPage(window) {
    while(window.holderDiv.firstChild) {
        window.holderDiv.firstChild.remove();
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
    systemTitle.style.color = colorThemes[currentTheme].text;
    systemTitle.style.textAlign = "center";

    let themeText = document.createElement("h3");
    themeText.textContent = "Theme : "
    themeText.style.color = colorThemes[currentTheme].text;

    let themeSelector = document.createElement("select");
    themeSelector.style.position = "absolute";
    themeSelector.style.left = "calc(100% - 205px)";
    themeSelector.style.top = "90px";
    themeSelector.style.width = "200px";

    let currentThemeOption = document.createElement("option");

    currentThemeOption.value = currentTheme;

    currentThemeOption.textContent = currentTheme.replace("_", " ");

    themeSelector.appendChild(currentThemeOption);

    for(const [KEY, VALUE] of Object.entries(colorThemes)) {

        if(KEY == currentTheme) continue;
        let option = document.createElement("option");

        option.value = KEY;

        option.textContent = KEY.replace("_", " ");

        themeSelector.appendChild(option);
    }

    themeSelector.onchange = async (ev) => {
        currentTheme = themeSelector.selectedOptions[0].value;
        localStorage.setItem("currentTheme", themeSelector.selectedOptions[0].value);
        updateColors();

        sideDiv.children[1].click();
    }

    let iconThemeText = document.createElement("h3");
    iconThemeText.textContent = "Icon Theme : "
    iconThemeText.style.color = colorThemes[currentTheme].text;

    let iconThemeSelector = document.createElement("select");
    iconThemeSelector.style.position = "absolute";
    iconThemeSelector.style.left = "calc(100% - 205px)";
    iconThemeSelector.style.top = "120px";
    iconThemeSelector.style.width = "200px";

    let currentIconThemeOption = document.createElement("option");

    currentIconThemeOption.value = currentIconTheme;

    currentIconThemeOption.textContent = currentIconTheme.replace("_", " ");

    iconThemeSelector.appendChild(currentIconThemeOption);

    for(const [KEY, VALUE] of Object.entries(iconThemes)) {
        if(KEY == currentIconTheme) continue;
        let option = document.createElement("option");

        option.value = KEY;

        option.textContent = KEY.replace("_", " ");

        iconThemeSelector.appendChild(option);
    }

    iconThemeSelector.onchange = async (ev) => {
        updateIcons(iconThemeSelector.selectedOptions[0].value);
        sideDiv.children[1].click();
    }
    
    mainDiv.appendChild(systemTitle);
    mainDiv.appendChild(themeText);
    mainDiv.appendChild(themeSelector);
    mainDiv.appendChild(divider);
    mainDiv.appendChild(iconThemeText);
    mainDiv.appendChild(iconThemeSelector);
    mainDiv.appendChild(divider);

    window.holderDiv.appendChild(mainDiv);
    window.holderDiv.appendChild(sideDiv);
}