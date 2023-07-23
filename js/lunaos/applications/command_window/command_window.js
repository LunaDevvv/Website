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
 * @typedef {import("../../windows/window")} luna_window
 * @typedef {import("./classes/terminal")} terminal
 * @typedef {import("./classes/Line")} Line
 * @typedef {import("../../utils/utils")}
 * @param {luna_window} command_window 
*/
async function console_function(command_window) {
    let Terminal = new terminal(command_window.holder_div);
    
    await showHeader(Terminal);

    takeInput(undefined, Terminal);

    let div = document.getElementById(command_window.window_name + "_holder");

    div.addEventListener("keydown", async (ev) => {
        await takeInput(ev, Terminal);
    })
}

/**
 * 
 * @param {terminal} Terminal 
 */
async function showHeader(Terminal) {
    const WelcomeElement = document.createElement("pre");
    WelcomeElement.innerHTML = `<span id="WelcomeText" style="color : red;">Welcome to my websites terminal!</span>`;


    for(let i = 0; i < textArray.length; i++) {
        if(i == 0) {
            new Line(textArray[i - 1],
                Terminal,
                {
                    css : `font-family: monospace; line-height:3px; color: blue;`,
                    speed : 10,
                    elements : [{ element : WelcomeElement, id : "WelcomeText" }]
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

async function takeInput(ev, Terminal) {
    if(Terminal.waiting != false) {
        return Terminal;
    }

    
    if(!Terminal.typing) {
        Terminal.waiting = true;
        new Line(`LS .${Terminal.current_path} ~ `, Terminal, {
            speed : 5,
            isPrompt : true
        });
        
        await sleep(1000);
        
        Terminal.waiting = false;
        Terminal.typing = true;
    }

    if(!ev) return Terminal;
    
    let character = (/[A-Za-z0-9`~!@#$%^&*()\[\];',./{}:"<>\-\=? ]{1}/.test(ev.key) && ev.key.length == 1);

    let prompt_element = document.getElementById(`LS .${Terminal.current_path} ~ `);

    prompt_element.textContent = prompt_element.textContent.replace("▭", "");

    if(character) {
        prompt_element.textContent += ev.key;
    } else {
        switch(ev.key) {
            case "Backspace": {
                if(prompt_element.textContent == `LS .${Terminal.current_path} ~ `) break;

                prompt_element.textContent = prompt_element.textContent.slice(0, -1); 
                break;
            }

            case "Enter": {
                Terminal.typing = false;
                Terminal.waiting = true;
                
                let text = prompt_element.textContent.replace(`LS .${Terminal.current_path} ~ `, "").replace("▭", "");

                // prompt_element.textContent = prompt_element.textContent.replace("▭", "");

                prompt_element.id = "";

                Terminal = await parseInput(text, Terminal);

                return Terminal;
            }
        }
    }

    prompt_element.textContent += "▭";

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
            help_command(Terminal);
            break;
        }

        case "clear" : {
            let CLEAR_SLEEP_TIME = 10;

            await clear_command(Terminal, CLEAR_SLEEP_TIME);

            break;
        }

        case "header" : {
            await header_command(Terminal);

            break;
        }

        case "developer" : {
            await developer_command(Terminal);
            break;
        }

        case "github" : {
            await github_command(Terminal);
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

async function import_scripts() {
    const line_class = document.createElement("script");
    line_class.src = "./js/lunaos/applications/command_window/classes/Line.js";

    const terminal_class = document.createElement("script");
    terminal_class.src = "./js/lunaos/applications/command_window/classes/terminal.js";

    const clear_command_class = document.createElement("script");
    clear_command_class.src = "./js/lunaos/applications/command_window/commands/clear.js";

    const help_command_class = document.createElement("script");
    help_command_class.src = "./js/lunaos/applications/command_window/commands/help.js";

    const header_command_class = document.createElement("script");
    header_command_class.src = "./js/lunaos/applications/command_window/commands/header.js";

    const developers_command_class = document.createElement("script");
    developers_command_class.src = "./js/lunaos/applications/command_window/commands/developers.js";

    const github_command_class = document.createElement("script");
    github_command_class.src = "./js/lunaos/applications/command_window/commands/github.js";


    document.head.appendChild(line_class);
    document.head.appendChild(terminal_class);
    document.head.appendChild(clear_command_class);
    document.head.appendChild(help_command_class);
    document.head.appendChild(developers_command_class);
    document.head.appendChild(header_command_class);
    document.head.appendChild(github_command_class);

    while(typeof github_command == "undefined") {
        await sleep(5);
    }

    return true;
}