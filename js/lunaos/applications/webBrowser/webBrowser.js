/**
 * @typedef {import("../../windows/window")}
 * @param {lunaWindow} browserWindow 
 */
async function webBrowserFunction(browserWindow) {
    let webpageObject = document.createElement("iframe");

    webpageObject.src=`https://${window.location.hostname}/webBrowser.html?url=https://github.com/LunaDevvv`;

    webpageObject.style = "height : 100%; width: 100%";

    browserWindow.holderDiv.appendChild(webpageObject);
}