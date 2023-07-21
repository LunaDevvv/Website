let body = document.getElementById("body");

body.style.backgroundImage = "url(\"../../photos/LunaOS/backgrounds/base.png\")";

body.style.backgroundSize = "100% 100%";

let bottomBar = new BottomBar();

window.addEventListener("resize", (ev) => {
    bottomBar.onResize();
})

let windows = {}


bottomBar.appendButton("../../photos/LunaOS/bottomBar/startButton.png", async () => {
    console.log("button pressed!");
});

bottomBar.appendButton("../../photos/LunaOS/bottomBar/terminal.png", async () => {
    let current_window = document.getElementById("command_line");
    
    if(current_window != undefined) {
        current_window.hidden = !current_window.hidden;

        current_window.style.top = windows.command_window.y + "px";
        current_window.style.left = windows.command_window.x + "px";
        return;   
    }

    const STARTING_X = 1000;
    const STARTING_Y = 100;
    const STARTING_HEIGHT = 400;
    const STARTING_WIDTH = 600;
    const MIN_HEIGHT = 300;
    const MIN_WIDTH = 300;

    function inside_function() {
        console.log("Working!");
    }

    /*
        The way I did this definitely seems overkill, but its so that I have everything setup from the beginning.
    */

    let command_window = new luna_window("command line", STARTING_X, STARTING_Y, STARTING_HEIGHT, STARTING_WIDTH, MIN_HEIGHT, MIN_WIDTH, inside_function, () => {
        command_window = undefined;
    });

    windows["command_window"] = command_window;
});