/**
 * 
 * @typedef {import("../classes/terminal")} terminal
 * @typedef {import("../../../windows/window")} luna_window
 * 
 * @typedef {luna_window} github_window
 * 
 * @param {terminal} Terminal 
 */

async function github_command(Terminal) {
    new Line("Making new tab for github (github doesn't allow iframes)", Terminal, {
        speed : 15
    });

    await sleep(1200);

    window.open("https://github.com/lunadevvv/", "_blank");
}