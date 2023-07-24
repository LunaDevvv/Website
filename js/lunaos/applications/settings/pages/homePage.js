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