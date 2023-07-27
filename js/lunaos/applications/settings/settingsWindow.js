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
 * @typedef {import("../../windows/window")}
 * 
 * @param {lunaWindow} window 
 */
async function settingsFunction(window) {
    await loadPages();

    systemPage(window);
}


async function loadPages() {
    const HOME_PAGE = document.createElement("script");
    HOME_PAGE.src = "./js/lunaos/applications/settings/pages/homePage.js";

    const PERSONALIZATION_PAGE = document.createElement("script");
    PERSONALIZATION_PAGE.src = "./js/lunaos/applications/settings/pages/personalization.js";

    document.head.appendChild(HOME_PAGE);
    document.head.appendChild(PERSONALIZATION_PAGE);

    while(typeof systemPage == "undefined") {
        await sleep(5);
    }
}

/**
 * 
 * @param {lunaWindow} window 
 * @returns {HTMLDivElement}
 */
function makeSideDiv(window) {
    let sideDiv = document.createElement("div");
    sideDiv.style.position = "absolute";
    sideDiv.style.width = "15%";
    sideDiv.style.height = "100%";
    sideDiv.style.left = "0px";

    let systemButton = document.createElement("button");
    systemButton.textContent = "System";
    systemButton.style.position = "static";
    systemButton.style.background = "none";
    systemButton.style.borderRadius = "5px";
    systemButton.style.width = "99%";
    systemButton.style.fontSize = "15px";
    systemButton.style.backgroundColor = colorThemes[currentTheme].settingsButtons
    systemButton.style.color = colorThemes[currentTheme].text;
    systemButton.style.border = "none";

    systemButton.onclick = () => {
        systemPage(window);
    }

    systemButton.onmouseenter = () => {
        systemButton.style.backgroundColor = colorThemes[currentTheme].selectedSettingsButton
    }

    systemButton.onmouseleave = () => {
        systemButton.style.backgroundColor = colorThemes[currentTheme].settingsButtons
    }

    let personalizationButton = document.createElement("button");
    personalizationButton.textContent = "Personalization";
    personalizationButton.style.position = "static";
    personalizationButton.style.background = "none";
    personalizationButton.style.borderRadius = "5px";
    personalizationButton.style.width = "99%";
    personalizationButton.style.fontSize = "15px";
    personalizationButton.style.backgroundColor = colorThemes[currentTheme].settingsButtons
    personalizationButton.style.color = colorThemes[currentTheme].text;
    personalizationButton.style.border = "none";
    personalizationButton.style.marginTop = "5px";

    personalizationButton.onclick = () => {
        personalizationPage(window);
    }

    personalizationButton.onmouseenter = () => {
        personalizationButton.style.backgroundColor = colorThemes[currentTheme].selectedSettingsButton
    }

    personalizationButton.onmouseleave = () => {
        personalizationButton.style.backgroundColor = colorThemes[currentTheme].settingsButtons
    }

    sideDiv.appendChild(systemButton);
    sideDiv.appendChild(personalizationButton);

    return sideDiv
}