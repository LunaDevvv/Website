/**
 * 
 * @typedef {import("../classes/terminal")} terminal
 * 
 * @param {terminal} Terminal 
 */

async function clear_command(Terminal, CLEAR_SLEEP_TIME) {
    Terminal.lines = [];

    while(Terminal.terminalDiv.firstChild) {
        Terminal.terminalDiv.removeChild(Terminal.terminalDiv.firstChild);

        await sleep(CLEAR_SLEEP_TIME);
    }
}