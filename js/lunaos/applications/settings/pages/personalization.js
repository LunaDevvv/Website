/**
 * @typedef {import("../../../windows/window")}
 * @typedef {import("../../../color_themes")}
 * @param {luna_window} window 
 */
async function personalizationPage(window) {
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

    let divider = document.createElement("hr");
    
    mainDiv.appendChild(systemTitle);
    mainDiv.appendChild(themeText);
    mainDiv.appendChild(themeSelector);
    mainDiv.appendChild(divider);

    window.holder_div.appendChild(mainDiv);
    window.holder_div.appendChild(sideDiv);
}