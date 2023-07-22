let body = document.getElementById("body");

body.style.backgroundImage = "url(\"../../photos/LunaOS/backgrounds/desktop.jpg\")";

body.style.backgroundSize = "100% 100%";

let command_window = undefined;

let bottomBar = new BottomBar();

window.addEventListener("resize", (ev) => {
    bottomBar.onResize();
})

let windows = {};

bottomBar.appendButton("../../photos/LunaOS/bottomBar/settingsButton.png", async () => {
    console.log("button pressed!");
});

bottomBar.appendButton("../../photos/LunaOS/bottomBar/terminal.png", async () => {

    if(command_window != undefined) {
        command_window = command_window.update();
        command_window.minimize();

        command_window.window_holder.style.top = windows.command_window.y + "px";
        command_window.window_holder.style.left = windows.command_window.x + "px";
        return;   
    }

    const STARTING_X = 1000;
    const STARTING_Y = 100;
    const STARTING_HEIGHT = 1000;
    const STARTING_WIDTH = 1200;
    const MIN_HEIGHT = 300;
    const MIN_WIDTH = 300;

    command_window = new luna_window("Command Prompt", STARTING_X, STARTING_Y, STARTING_HEIGHT, STARTING_WIDTH, MIN_HEIGHT, MIN_WIDTH, console_function, () => {
        command_window = undefined;
    });

});