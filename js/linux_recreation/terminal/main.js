// Loading the line class.
const LINE_CLASS_SCRIPT = document.createElement("script");
LINE_CLASS_SCRIPT.src = "./js/linux_recreation/terminal/classes/line.js";
LINE_CLASS_SCRIPT.onload = () => console.log("[LOG]: Line class loaded!");
document.body.appendChild(LINE_CLASS_SCRIPT);


// Required for terminal class.
const TERMINAL_DIV = document.createElement("div");
TERMINAL_DIV.style.height = "100vh";
TERMINAL_DIV.style.width = "100vw";
TERMINAL_DIV.style.overflowY = "hide";
TERMINAL_DIV.id = "terminal";
document.body.appendChild(TERMINAL_DIV);

// Creating the terminal, after loading the script.
const TERMINAL_CLASS_SCRIPT = document.createElement("script");
TERMINAL_CLASS_SCRIPT.src = "./js/linux_recreation/terminal/classes/terminal.js";
TERMINAL_CLASS_SCRIPT.onload = () => {
    const TERMINAL = new terminal(TERMINAL_DIV);
    console.log("[LOG]: Terminal Script loaded!");

    handleTerminal(TERMINAL);
}

document.body.appendChild(TERMINAL_CLASS_SCRIPT);

/**
    * @param {terminal} TERMINAL
    *
    * Handles line events.
*/
async function handleTerminal(TERMINAL) {
    new Line("[  OK  ] Finished Loading Terminal", TERMINAL);
    new Line("[  OK  ] Finished Loading Commands", TERMINAL);
    const TERMINAL_MODULES_LINE = new Line("[  ..  ] Loading Terminal Modules", TERMINAL);
    const INPUT_SCRIPT = document.createElement("script");
    INPUT_SCRIPT.src = "./js/linux_recreation/terminal/handle_input.js";
    INPUT_SCRIPT.onload = () => {
        TERMINAL_MODULES_LINE.line.innerText = "[  OK  ] Finished Loading Terminal Modules";

        TERMINAL.takeInput({
            passwordPrompt: false,
            prompt: "Username: ",
            finishFunction: (outputData) => {
                TERMINAL.takeInput({
                    passwordPrompt: true,
                    prompt: `[LOGIN] Password for ${outputData}: `,
                    finishFunction: (data) => {
                        console.log(`Username: ${outputData}\nPassword: ${data}`)
                    }
                })
            }
        })
    }
    document.body.appendChild(INPUT_SCRIPT);
}
