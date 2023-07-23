//* Getting the div to hold the terminal.
const terminalDiv = document.getElementById("terminal");

//* Creating the header.
let textArray = `
{}
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

//* Create a terminal instance.
const Terminal = new terminal();
let waiting = true;

//* Create the header.
async function showHeader() {
    waiting = true;
    typing = false;

    //* Slowly show the header
    for (let i = 0; i < textArray.length; i++) {
        if (i == 0) {
            new Line(
                "Developed by ShiroDev. Commands are case Sensitive. Touch screen compatability added!",
                `font-family: monospace; line-height:3px; color : Orange;`,
                10,
                undefined,
                undefined
            );
            continue;
        }

        if (i == textArray.length - 1) {
            new Line(
                textArray[i - 1],
                `font-family: monospace; line-height:3px; color : blue;`,
                10,
                undefined,
                undefined
            );
            continue;
        }

        new Line(
            textArray[i - 1],
            `font-family: monospace; line-height:3px; color : blue;`,
            10
        );
        await sleep(50);
    }

    //* Create the different color 'help' text.
    let help = document.createElement("pre");
    help.innerHTML = `<span style="color : blue;", id="helpText">'help'</span>`;
    await sleep(10);

    //* Show the text as a line
    new Line(`Type {} for help with commands `, "", 20, "pre", false, {
        element: help,
        id: "helpText",
    });
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(1000);
    waiting = false;

    //* If they are on a mobile device, replace the custom text handler with input box.
    if (mobileDevice()) {
        const area = document.createElement("input");
        area.innerHTML = '<input type="text" id="mobilePrompt"></input>';

        let line = new Line("ShiroDev.dev ~  {}", "", 10, undefined, false, {
            element: area,
        });

        await sleep(1000);

        //* When enter is pressed, delete old line and create a new one, while parsing the command.
        document
            .getElementById("mobilePrompt")
            .addEventListener("keypress", (ev) => {
                if (ev.key === "Enter") {
                    parseInput(document.getElementById("mobilePrompt").value, 500);
                    line.editText(document.getElementById("mobilePrompt").value, true);
                }
            });
        document.getElementById("mobilePrompt").focus();

        return;
    }
    waiting = false;

    //* Custom input handler
    takeInput();
}

//* Check if the user is on a mobile device.
function mobileDevice() {
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
    ) {
        return true;
    }
    return false;
}

let typing = false;

//* If they are on a mobile device, disable the listener.
if (!mobileDevice()) {
    document.addEventListener("keydown", (ev) => {
        if (waiting) return;
        takeInput(ev);
    });
}

//* Taking input
async function takeInput(ev) {
    //* If they are on a mobile device, create a text box to type in.
    if (mobileDevice()) {
        const area = document.createElement("input");
        area.innerHTML =
            '<input type="text" id="mobilePrompt" style="background-color : black;"></input>';

        let line = new Line("ShiroDev.dev ~  {}", "", 10, undefined, false, {
            element: area,
        });

        await sleep(1000);

        document
            .getElementById("mobilePrompt")
            .addEventListener("keypress", (ev) => {
                if (ev.key === "Enter") {
                    parseInput(document.getElementById("mobilePrompt").value, 500);
                    line.editText(document.getElementById("mobilePrompt").value, true);
                }
            });
        document.getElementById("mobilePrompt").focus();

        return;
    }

    //* if they are being impatient, do nothing (Not needed for mobile devices since they can't set this function off).

    if (waiting != false) {
        return;
    }

    //* If the user doesn't have a prompt to type in, show them one
    if (!typing) {
        waiting = true;
        new Line("ShiroDev.dev ~ ", "", 25, undefined, true);
        window.scrollTo(0, document.body.scrollHeight);
        await sleep(1000);
        waiting = false;
        typing = true;
    }

    //* Check for the event, and only allow a-z, 0-9, enter, or backspace through.
    if (!ev) return;
    if (
        !((ev.keyCode >= 48 && ev.keyCode <= 57) || ev.keyCode == 96) &&
        !(ev.keyCode >= 65 && ev.keyCode <= 90) &&
        !(ev.keyCode >= 97 && ev.keyCode <= 122) &&
        ev.keyCode != 32 &&
        ev.keyCode != "13" &&
        ev.keyCode != 8
    )
        return;
    document.getElementById("ShiroDev.dev ~ ").innerText = document
        .getElementById("ShiroDev.dev ~ ")
        .innerText.replace("▭", "");

    //* Get rid of a character if they typed backspace.
    if (ev.key === "Backspace") {
        if (
            document.getElementById("ShiroDev.dev ~ ").textContent ==
            "ShiroDev.dev ~ "
        )
            return (document.getElementById("ShiroDev.dev ~ ").textContent =
                document.getElementById("ShiroDev.dev ~ ").textContent +=
                "▭");
        document.getElementById("ShiroDev.dev ~ ").textContent = document
            .getElementById("ShiroDev.dev ~ ")
            .textContent.slice(0, -1);
        return (document.getElementById("ShiroDev.dev ~ ").textContent =
            document.getElementById("ShiroDev.dev ~ ").textContent +=
            "▭");
    }

    //* Parse the command if enter is pressed.
    if (ev.key == "Enter") {
        typing = false;
        let text = document
            .getElementById("ShiroDev.dev ~ ")
            .textContent.replace("ShiroDev.dev ~ ", "");
        document.getElementById("ShiroDev.dev ~ ").id = "";
        return parseInput(text);
    }

    //* Update the text content.
    document.getElementById("ShiroDev.dev ~ ").textContent += ev.key += "▭";
    document.getElementById("ShiroDev.dev ~ ").focus();
    return;
}

//* Promise to make sure we can pause the process for a second or more.
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//* Parse the commands
async function parseInput(text, sleeptime) {
    //* If sleeptime is given, sleep for that amount of time (Needed for the mobile support to look nice)
    if (sleeptime) await sleep(sleeptime);
    waiting = true;

    //* Switch-case for the commands.
    switch (text.split(" ")[0]) {
        //* Clear the terminal line-by-line
        case "clear":
            await Terminal.clearLines();
            waiting = false;
            return takeInput();

        //* Give info on all of the current commands.
        case "help":
            new Line("Current commands : ", undefined, 20);
            new Line("whoami : Tells you information on me!", `color: pink`, 20);
            new Line("clear : Clears the terminal", `color : green`, 20);
            new Line("help : Sends info on current commands", `color : orange`, 20);
            new Line("header : Shows the header", "color : red", 20);
            new Line(
                "inspiration : Shows the websites that inspired me to make this",
                "color : yellow;",
                10
            );
            new Line(
                "mespyr : Opens a new tab with mespyr.github.io searched",
                "color : pink",
                10
            );
            new Line(
                "fkcodes : Opens a new tab with fkcodes.com seached",
                "color : brown",
                15
            );
            new Line(
                "sudo : Makes more commands available (Warning : Commands are in development)",
                "color : gray",
                15
            );
            new Line(
                "updates : Shows the updates to this terminal",
                "color : darkgray;",
                25
            );
            new Line(
                "github : Sends you to this websites github page",
                "color : darkblue;",
                25
            );

            new Line(
                "Terminal: Sends you to the original terminal esc page. Currently the terminal you are using.",
                "color : pink",
                25
            )
            window.scrollTo(0, document.body.scrollHeight);
            await sleep(1200);

            waiting = false;
            return takeInput();

        //* Show the header.
        case "header":
            showHeader();
            return;

        //* Redirect to mespyr's website
        case "mespyr":
            new Line("Opening page...", "color : orange;", 10);

            await sleep(100);
            window.open("https://mespyr.github.io", "_blank");
            waiting = false;
            return takeInput();

        //* Redirect to fkcodes website
        case "fkcodes":
            new Line("Opening page...", "color : orange;", 10);

            await sleep(100);
            window.open("https://fkcodes.com/", "_blank");

            waiting = false;
            return takeInput();

        //* Let people know who I "borrowed" the idea from.
        case "inspiration":
            new Line("This terminal was inspired by : ", "color : blue;", 20);
            new Line("mespyr.github.io (A friends website)", "color : red", 20);
            new Line("fkcodes.com (youtubers website)", "color : orange", 20);
            new Line("The website was not inspired by anything, I just thought this would be cool", "color: pink", 20);

            await sleep(1000);
            waiting = false;
            return takeInput();

        //* Sudo command
        case "sudo":
            new Line("You thought", "color : red", 20);

            await sleep(600);

            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");

            waiting = false;
            return takeInput();

        //* Redirect them to my github.
        case "repo":
            new Line("Opening page...", "color : orange;", 10);

            await sleep(100);
            window.open("https://github.com/shirodevv/website", "_blank");
            waiting = false;
            return takeInput();

        //* Open my github.
        case "github":
            new Line("Opening page...", "color : orange;", 10);
            window.open("https://github.com/shirodevv/", "_blank");
            waiting = false;
            return takeInput();

        //* Give update information
        case "updates":
            new Line("1/26/23 : ", "color : orange", 10);
            new Line(
                "Made clear look better, Added touchscreen support, QOF changes.",
                "color : red",
                10
            );
            new Line(
                "1/25/23 : Made base terminal look, functionality, commands.",
                "color : green",
                10
            );

            window.scrollTo(0, document.body.scrollHeight);

            await sleep(1000);
            waiting = false;
            return takeInput();

        case "whoami":
            new Line("Hello, I'm LunaDev (Used to be ShiroDev)!", "color : pink", 10);
            new Line(
                "I'm currently in highschool, and I have been programming for 4 ~ 5 years.",
                "color : brown;",
                10
            );
            new Line(
                "I have worked on alot of smaller projects, but not many large ones.",
                "color : gray;",
                10
            );
            new Line();
            new Line(
                "I work on more of the backend side of things, since I don't like making the main UI's",
                "color : pink",
                10
            );
            new Line(
                "I have a youtube channel, but I don't post to it too often.",
                "color : brown;",
                10
            );
            new Line(
                "In my free time, I play the guitar / piano, and I like drawing a bit",
                "color : gray",
                10
            );
            new Line(
                "Currently I am working on a fake OS website (Probably what you are using right now), for my portfolio",
                "color : darkSlateGray",
                10
            )
            waiting = false;
            return takeInput();

        case "docs":
            const args = text.split(" ");
            if (!args[1]) {
                new Line("Missing Args : info_item", "color : red", 10);
                new Line(
                    'Run "docs args" to get a list of options',
                    "color : blue",
                    10
                );
                waiting = false;
                return takeInput();
            }

            switch (args[1]) {
                case "rectangle":
                    rectangle(text);
                    break;

                case "args":
                    new Line(
                        "rectangle : Rectangle command in ShiroEngine",
                        "color : red",
                        10
                    );
                    break;

                default:
                    new Line("Error : Item Not found", "color : red", 10);
                    new Line(
                        'Run "docs args" to get a list of options',
                        "color : blue",
                        10
                    );
                    break;
            }

            waiting = false;
            return takeInput();


        
        case "terminal":
            window.location.href = "./terminal.html";
            waiting = false;
            return takeInput();
            

        case "osInfo":
            new Line("OS Version : 0.1.3", "", 10);
            new Line("OS Name : LunaOS", "", 10);
            new Line("Warnings:", "", 10);
            new Line("You currently cannot resize windows.", "", 10);
            
            waiting = false;
            return takeInput();

        //* Tell them that the comand isn't found
        default:
            let timedText = `Command not found : ${text}`;
            new Line("Command not found : " + text, "color : red", 20);

            await sleep(timedText.length * 22);

            waiting = false;
            return takeInput();
    }
}
