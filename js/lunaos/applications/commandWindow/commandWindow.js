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


let textArray = `
No longer an embedded webpage!

▄█       ███    █▄  ███▄▄▄▄      ▄████████       ▄██████▄     ▄████████ 
███       ███    ███ ███▀▀▀██▄   ███    ███      ███    ███   ███    ███ 
███       ███    ███ ███   ███   ███    ███      ███    ███   ███    █▀  
███       ███    ███ ███   ███   ███    ███      ███    ███   ███        
███       ███    ███ ███   ███ ▀███████████      ███    ███ ▀███████████ 
███       ███    ███ ███   ███   ███    ███      ███    ███          ███ 
███▌    ▄ ███    ███ ███   ███   ███    ███      ███    ███    ▄█    ███ 
█████▄▄██ ████████▀   ▀█   █▀    ███    █▀        ▀██████▀   ▄████████▀  
▀                                                                        
                                          
   /\\   /\\
  //\\\\_//\\\\     ____
  \\_     _/    /   /
   / * * \\    /^^^]
   \\_\\O/_/    [   ]
    /   \\_    [   /
    \\     \\_  /  /
     [ [ /  \\/ _/
    _[ [ \\  /_/

If this runs slow, refocus this window~
Run osInfo for information on the OS~
{} `.split("\n");

/**
 * @typedef {import("../../windows/window")} lunaWindow
 * @typedef {import("./classes/terminal")} terminal
 * @typedef {import("./classes/Line")} Line
 * @typedef {import("../../utils/utils")}
 * @param {lunaWindow} commandWindow 
*/
async function consoleFunction(commandWindow) {
    let Terminal = new terminal(commandWindow.holderDiv);

    commandWindow.addToStorage("terminal", Terminal);
    
    await showHeader(Terminal);

    takeInput(undefined, Terminal);

    let div = document.getElementById(commandWindow.windowName + "Holder");

    div.addEventListener("keydown", async (ev) => {
        await takeInput(ev, Terminal);
    })
}

/**
 * 
 * @param {terminal} Terminal 
 */
async function showHeader(Terminal) {
    const WELCOME_ELEMENT = document.createElement("pre");
    WELCOME_ELEMENT.innerHTML = `<span id="WelcomeText" style="color : red;">Welcome to my websites terminal!</span>`;


    for(let i = 0; i < textArray.length; i++) {
        if(i == 0) {
            new Line(textArray[i - 1],
                Terminal,
                {
                    css : `font-family: monospace; line-height:3px; color: blue;`,
                    speed : 10,
                    elements : [{ element : WELCOME_ELEMENT, id : "WelcomeText" }]
                }
            );
            continue;
        }

        new Line(
            textArray[i - 1],
            Terminal,
            {
                css: `font-family: monospace; line-height: 3px; color: blue;`,
                speed : 10
            }
        )

        await sleep(50);
    }

    let help = document.createElement("pre");

    help.innerHTML = `<span style="color : blue;" id="helpText">'help'</span>`;
    await sleep(10);

    new Line(`Type {} for help with commmands.`, Terminal, {
        speed : 20,
        elements : [{element: help, id:  "helpText"}]
    });
}

/**
 * 
 * @param {KeyboardEvent} ev
 * @param { terminal } Terminal
 * 
 * @return { terminal }
 */

/**
 * @type {Line}
 */
let promptLine = undefined

async function takeInput(ev, Terminal) {
    if(Terminal.waiting != false) {
        return Terminal;
    }

    
    if(!Terminal.typing) {
        Terminal.waiting = true;
        promptLine = new Line(`LS .${Terminal.currentPath} ~ `, Terminal, {
            speed : 5,
            isPrompt : true
        });
        
        await sleep(1000);
        
        Terminal.waiting = false;
        Terminal.typing = true;
    }

    if(!ev) return Terminal;
    
    let character = (/[A-Za-z0-9`~!@#$%^&*()\[\];',./{}:"<>\-\=? ]{1}/.test(ev.key) && ev.key.length == 1);

    let promptElement = document.getElementById(`LS .${Terminal.currentPath} ~ `);

    promptElement.textContent = promptElement.textContent.replace("▭", "");

    if(character) {
        promptElement.textContent += ev.key;
    } else {
        switch(ev.key) {
            case "Backspace": {
                if(promptElement.textContent == `LS .${Terminal.currentPath} ~ `) break;

                promptElement.textContent = promptElement.textContent.slice(0, -1); 
                break;
            }

            case "Enter": {
                Terminal.typing = false;
                Terminal.waiting = true;
                
                let text = promptElement.textContent.replace(`LS .${Terminal.currentPath} ~ `, "").replace("▭", "");

                promptLine.isPrompt = false;

                promptElement.id = "";

                promptLine.editText(`${text}`);

                Terminal = await parseInput(text, Terminal);

                return Terminal;
            }
        }
    }

    promptElement.textContent += "▭";

    return Terminal;
}

/**
 * 
 * @param {string} text 
 * @param {terminal} Terminal
 * 
 * @returns {terminal}
 */
async function parseInput(text, Terminal) {
    switch(text.split(" ")[0]) {
        case "help" : {
            helpCommand(Terminal);
            break;
        }

        case "clear" : {
            const CLEAR_SLEEP_TIME = 10;

            await clearCommand(Terminal, CLEAR_SLEEP_TIME);

            break;
        }

        case "header" : {
            await headerCommand(Terminal);

            break;
        }

        case "developer" : {
            await developerCommand(Terminal);
            break;
        }

        case "github" : {
            await githubCommand(Terminal);
            break;
        }

        default : {
            const WAIT_TIME = 22;
            let notFoundText = `Command not found : ${text}`;

            new Line(notFoundText, Terminal, {
                css: "color : red;",
                speed : 20
            });

            await sleep(notFoundText * WAIT_TIME);
        }
    }

    Terminal.waiting = false;
    Terminal.typing = false;

    Terminal = await takeInput(undefined, Terminal);
    return Terminal;
}

async function importScripts() {
    const LINE_CLASS = document.createElement("script");
    LINE_CLASS.src = "./js/lunaos/applications/commandWindow/classes/Line.js";

    const TERMINAL_CLASS = document.createElement("script");
    TERMINAL_CLASS.src = "./js/lunaos/applications/commandWindow/classes/terminal.js";

    const CLEAR_COMMAND_CLASS = document.createElement("script");
    CLEAR_COMMAND_CLASS.src = "./js/lunaos/applications/commandWindow/commands/clear.js";

    const HELP_COMMAND_CLASS = document.createElement("script");
    HELP_COMMAND_CLASS.src = "./js/lunaos/applications/commandWindow/commands/help.js";

    const HEADER_COMMAND_CLASS = document.createElement("script");
    HEADER_COMMAND_CLASS.src = "./js/lunaos/applications/commandWindow/commands/header.js";

    const DEVELOPERS_COMMAND_CLASS = document.createElement("script");
    DEVELOPERS_COMMAND_CLASS.src = "./js/lunaos/applications/commandWindow/commands/developers.js";

    const GITHUB_COMMAND_CLASS = document.createElement("script");
    GITHUB_COMMAND_CLASS.src = "./js/lunaos/applications/commandWindow/commands/github.js";


    document.head.appendChild(LINE_CLASS);
    document.head.appendChild(TERMINAL_CLASS);
    document.head.appendChild(CLEAR_COMMAND_CLASS);
    document.head.appendChild(HELP_COMMAND_CLASS);
    document.head.appendChild(DEVELOPERS_COMMAND_CLASS);
    document.head.appendChild(HEADER_COMMAND_CLASS);
    document.head.appendChild(GITHUB_COMMAND_CLASS);

    while(typeof githubCommand == "undefined") {
        await sleep(5);
    }

    return true;
}