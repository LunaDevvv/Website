let body = document.getElementById("body");

body.style.backgroundImage = "url(\"../../photos/LunaOS/backgrounds/base.png\")";

body.style.backgroundSize = "100% 100%";


let bottomBar = new BottomBar();


window.addEventListener("resize", (ev) => {
    bottomBar.onResize();
})


bottomBar.appendButton("../../photos/LunaOS/bottomBar/startButton.png", async () => {
    console.log("button pressed!");
});

bottomBar.appendButton("../../photos/LunaOS/bottomBar/terminal.png", async () => {
    console.log("button pressed!");
});