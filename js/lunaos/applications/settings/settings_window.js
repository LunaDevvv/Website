/**
 * @typedef {import("../../windows/window")}
 * 
 * @param {luna_window} window 
 */
async function settings_function(window) {
    await load_pages();

    systemPage(window);
}


async function load_pages() {
    const home_page = document.createElement("script");
    home_page.src = "./js/lunaos/applications/settings/pages/homePage.js";

    const personalization_page = document.createElement("script");
    personalization_page.src = "./js/lunaos/applications/settings/pages/personalization.js";

    document.head.appendChild(home_page);
    document.head.appendChild(personalization_page);

    while(typeof personalizationPage == "undefined") {
        await sleep(5);
    }
}

/**
 * 
 * @param {luna_window} window 
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
    systemButton.style.backgroundColor = color_themes[current_theme].settingsButtons
    systemButton.style.color = color_themes[current_theme].text;
    systemButton.style.border = "none";

    systemButton.onclick = () => {
        systemPage(window);
    }

    systemButton.onmouseenter = () => {
        systemButton.style.backgroundColor = color_themes[current_theme].selectedSettingsButton
    }

    systemButton.onmouseleave = () => {
        systemButton.style.backgroundColor = color_themes[current_theme].settingsButtons
    }

    let personalizationButton = document.createElement("button");
    personalizationButton.textContent = "Personalization";
    personalizationButton.style.position = "static";
    personalizationButton.style.background = "none";
    personalizationButton.style.borderRadius = "5px";
    personalizationButton.style.width = "99%";
    personalizationButton.style.fontSize = "15px";
    personalizationButton.style.backgroundColor = color_themes[current_theme].settingsButtons
    personalizationButton.style.color = color_themes[current_theme].text;
    personalizationButton.style.border = "none";
    personalizationButton.style.marginTop = "5px";

    personalizationButton.onclick = () => {
        personalizationPage(window);
    }

    personalizationButton.onmouseenter = () => {
        personalizationButton.style.backgroundColor = color_themes[current_theme].selectedSettingsButton
    }

    personalizationButton.onmouseleave = () => {
        personalizationButton.style.backgroundColor = color_themes[current_theme].settingsButtons
    }

    sideDiv.appendChild(systemButton);
    sideDiv.appendChild(personalizationButton);

    return sideDiv
}