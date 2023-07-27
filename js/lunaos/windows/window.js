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


/**
 * @type {Array<lunaWindow>}
 * 
 * @typedef {import("../colorThemes")}
 */
let windows = [];

function reloadWindowColors() {
    for(let i = 0; i < windows.length; i++) {
        windows[i].reloadColors();
    }
}

class lunaWindow {
    windowStorage = {};

    /**
     * @param {string} windowName
     * @param {number} startingX
     * @param {number} startingY
     * @param {number} startingHeight
     * @param {number} startingWidth
     * @param {number} minHeight
     * @param {number} minWidth
     * @param {Function} insideFunction
     * @param {Function} exitCallback 
     */
    constructor(windowName, startingX, startingY, startingHeight, startingWidth, minHeight, minWidth, insideFunction, exitCallback) {
        this.windowName = windowName.replaceAll(" ", "_");
        this.startingX = startingX;
        this.startingY = startingY;
        this.startingHeight = startingHeight;
        this.startingWidth = startingWidth;
        this.minHeight = minHeight;
        this.minWidth = minWidth;
        this.focused = false;
        windows.push(this);

        this.x = startingX;
        this.y = startingY;

        this.insideFunction = insideFunction;
        this.exitCallback = exitCallback;

        this.moving = false;

        this.maximized = false;

        this.#generateWindow();
    }

    #generateWindow() {
        const WINDOW_HOLDER = document.createElement("div");
        WINDOW_HOLDER.id = `${this.windowName}`;
        WINDOW_HOLDER.style.position = "absolute";

        WINDOW_HOLDER.style.backgroundColor = colorThemes[currentTheme].windowHolder;
        WINDOW_HOLDER.style.minHeight = `${this.minHeight}px`;
        WINDOW_HOLDER.style.minWidth = `${this.minWidth}px`;
        WINDOW_HOLDER.style.width = `${this.startingWidth}px`;
        WINDOW_HOLDER.style.height = `${this.startingHeight}px`;
        WINDOW_HOLDER.style.borderRadius = "5px";
        WINDOW_HOLDER.style.left = `${this.startingX}px`;
        WINDOW_HOLDER.style.top = `${this.startingY}px`;

        WINDOW_HOLDER.onmousedown = () => {
            this.focus();
        }
        
        let titleDiv = document.createElement("div");
        titleDiv.style.width = `${Number(WINDOW_HOLDER.style.width.replace("px", "")) - 90}px`;
        titleDiv.style.top = "0px";
        titleDiv.style.height = "25px";
        titleDiv.style.position = "absolute";
        titleDiv.style.backgroundColor = colorThemes[currentTheme].titleDiv;
        titleDiv.style.borderRadius = "5px";
        
        titleDiv.addEventListener("mousedown", (event) => {
            this.#moveWindow(event.offsetX, event.offsetY);
        });
        
        document.addEventListener("mouseup", () => {
            this.#stopMovingWindow();
        });

        const TITLE_TEXT = document.createElement("pre");
        TITLE_TEXT.textContent = this.windowName.replaceAll("_", " ");
        TITLE_TEXT.style.position = "absolute";
        TITLE_TEXT.style.left = "10px";
        TITLE_TEXT.style.top = "-10px";
        TITLE_TEXT.style.cursor = "default";
        TITLE_TEXT.style.fontSize = "15px";
        TITLE_TEXT.style.color = colorThemes[currentTheme].text;

        const EXIT_BUTTON = document.createElement("button");
        EXIT_BUTTON.textContent = "X";
        EXIT_BUTTON.style.position = "absolute";
        EXIT_BUTTON.style.color = "red";
        EXIT_BUTTON.style.width = "25px";
        EXIT_BUTTON.style.left = `${Number(WINDOW_HOLDER.style.width.replace('px', "")) - Number(EXIT_BUTTON.style.width.replace("px", ""))}px`;
        EXIT_BUTTON.style.border = "none";
        EXIT_BUTTON.style.background = "none";
        EXIT_BUTTON.style.borderRadius = "5px";
        EXIT_BUTTON.style.height = "25px"

        EXIT_BUTTON.onmouseleave = () => {
            EXIT_BUTTON.style.background = "none";
        }
        
        EXIT_BUTTON.onmouseenter = () => {
            EXIT_BUTTON.style.backgroundColor = "darkRed";
        }

        EXIT_BUTTON.onclick = () => {
            document.getElementById(this.windowName).remove();
            this.exitCallback();

            TOP_BAR.closedWindow(this);
        }
        
        const MINIMIZE_BUTTON = document.createElement("button");
        MINIMIZE_BUTTON.textContent = "-";
        MINIMIZE_BUTTON.style.position = "absolute";
        MINIMIZE_BUTTON.style.color = "gray";
        MINIMIZE_BUTTON.style.width = "25px";
        MINIMIZE_BUTTON.style.left = `${Number(WINDOW_HOLDER.style.width.replace('px', "")) - Number(MINIMIZE_BUTTON.style.width.replace("px", "")) - 60}px`;
        MINIMIZE_BUTTON.style.border = "none";
        MINIMIZE_BUTTON.style.height = "25px"
        MINIMIZE_BUTTON.style.background = "none";
        MINIMIZE_BUTTON.style.borderRadius = "5px";
        
        let holderDiv = document.createElement("div");
        holderDiv.tabIndex = 0;
        holderDiv.style.position = "absolute";
        holderDiv.style.top = "25px";
        holderDiv.style.left = "5px";
        holderDiv.style.height = `${Number(WINDOW_HOLDER.style.height.replace("px", "")) - 30}px`;
        holderDiv.style.width = `${Number(WINDOW_HOLDER.style.width.replace("px", "")) - 10}px`;
        holderDiv.style.backgroundColor = colorThemes[currentTheme].holderDiv;
        holderDiv.id = `${this.windowName}Holder`;
        holderDiv.style.overflow = "auto";

        const MAXIMIZE_BUTTON = document.createElement("button");
        MAXIMIZE_BUTTON.textContent = "□";
        MAXIMIZE_BUTTON.style.position = "absolute";
        MAXIMIZE_BUTTON.style.color = colorThemes[currentTheme].text;
        MAXIMIZE_BUTTON.style.height = "25px"
        MAXIMIZE_BUTTON.style.width = "25px";
        MAXIMIZE_BUTTON.style.left = `${Number(WINDOW_HOLDER.style.width.replace('px', "")) - Number(MAXIMIZE_BUTTON.style.width.replace("px", "")) - 30}px`;
        MAXIMIZE_BUTTON.style.border = "none";
        MAXIMIZE_BUTTON.style.background = "none";
        MAXIMIZE_BUTTON.style.borderRadius = "5px";

        MINIMIZE_BUTTON.onmouseleave = () => {
            MINIMIZE_BUTTON.style.background = "none";
        }
        
        MINIMIZE_BUTTON.onmouseenter = () => {
            MINIMIZE_BUTTON.style.backgroundColor = "#252626";
        }

        MAXIMIZE_BUTTON.onmouseleave = () => {
            MAXIMIZE_BUTTON.style.background = "none";
        }
        
        MAXIMIZE_BUTTON.onmouseenter = () => {
            MAXIMIZE_BUTTON.style.backgroundColor = "#2a282e";
        }

        MAXIMIZE_BUTTON.onclick = async () => {
            this.#maximize();
            return;
        }

        MINIMIZE_BUTTON.onclick = async () => {

            this.minimize();
            return;
        }
        
        let bottomRightResize = document.createElement("div");
        bottomRightResize.style.width = "10px";
        bottomRightResize.style.height = "10px";
        bottomRightResize.style.zIndex = 2;
        bottomRightResize.style.cursor = "nwse-resize";
        bottomRightResize.style.position = "absolute";
        bottomRightResize.style.left = "100%";
        bottomRightResize.style.top = "99%";

        bottomRightResize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "bottomRight");
        });

        let bottomLeftResize = document.createElement("div");
        bottomLeftResize.style.width = "10px";
        bottomLeftResize.style.height = "10px";
        bottomLeftResize.style.zIndex = 2;
        bottomLeftResize.style.cursor = "nesw-resize";
        bottomLeftResize.style.position = "absolute";
        bottomLeftResize.style.top = "99%";

        bottomLeftResize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "bottomLeft");
        });

        let topLeftResize = document.createElement("div");
        topLeftResize.style.width = "10px";
        topLeftResize.style.height = "10px";
        topLeftResize.style.zIndex = 2;
        topLeftResize.style.cursor = "nwse-resize";
        topLeftResize.style.position = "absolute";

        topLeftResize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "topLeft");
        });

        let topRightResize = document.createElement("div");
        topRightResize.style.width = "10px";
        topRightResize.style.height = "10px";
        topRightResize.style.zIndex = 2;
        topRightResize.style.left = "99%";
        topRightResize.style.cursor = "nesw-resize";
        topRightResize.style.position = "absolute";

        topRightResize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "topRight");
        });

        let leftResize = document.createElement("div");
        leftResize.style.width = "10px";
        leftResize.style.height = "98%";
        leftResize.style.top = "8px";
        leftResize.style.zIndex = 2;
        leftResize.style.cursor = "ew-resize";
        leftResize.style.position = "absolute";

        leftResize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "left");
        });

        let rightResize = document.createElement("div");
        rightResize.style.width = "10px";
        rightResize.style.height = "99%";
        rightResize.style.left = "100%";
        rightResize.style.zIndex = 2;
        rightResize.style.cursor = "ew-resize";
        rightResize.style.position = "absolute";

        rightResize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "right");
        });

        let topResize = document.createElement("div");
        topResize.style.width = "99%";
        topResize.style.height = "10px";
        topResize.style.top = "-1%"
        topResize.style.zIndex = 2;
        topResize.style.cursor = "ns-resize";
        topResize.style.position = "absolute";

        topResize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "top");
        });

        let bottomResize = document.createElement("div");
        bottomResize.style.width = "99%";
        bottomResize.style.height = "10px";
        bottomResize.style.top = "100%";
        bottomResize.style.zIndex = 2;
        bottomResize.style.cursor = "ns-resize";
        bottomResize.style.position = "absolute";

        bottomResize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "bottom");
        });
        
        WINDOW_HOLDER.appendChild(titleDiv);
        this.titleDiv = titleDiv;
        this.windowHolder = WINDOW_HOLDER;
        titleDiv.appendChild(TITLE_TEXT);
        this.titleText = TITLE_TEXT;
        WINDOW_HOLDER.appendChild(EXIT_BUTTON);
        this.exitButton = EXIT_BUTTON;
        WINDOW_HOLDER.appendChild(MAXIMIZE_BUTTON);
        this.maximizeButton = MAXIMIZE_BUTTON;
        WINDOW_HOLDER.appendChild(MINIMIZE_BUTTON);
        this.minimizeButton = MINIMIZE_BUTTON;

        WINDOW_HOLDER.appendChild(bottomRightResize);
        WINDOW_HOLDER.appendChild(bottomLeftResize);
        WINDOW_HOLDER.appendChild(topLeftResize);
        WINDOW_HOLDER.appendChild(topRightResize);
        WINDOW_HOLDER.appendChild(leftResize);
        WINDOW_HOLDER.appendChild(rightResize);
        WINDOW_HOLDER.appendChild(topResize);
        WINDOW_HOLDER.appendChild(bottomResize);

        WINDOW_HOLDER.appendChild(holderDiv);
        this.holderDiv = holderDiv;
        WINDOW_HOLDER.left = "10px";

        document.body.appendChild(WINDOW_HOLDER);

        this.focus();

        this.insideFunction(this);

        TOP_BAR.openedWindow(this);
    }

    #moveWindow(offsetX, offsetY) {
        if(this.maximized) {
            let originalX = Number(this.windowHolder.style.left.replace("px"))

            this.#maximize();

            let newX = Number(this.windowHolder.style.left.replace("px"));

            offsetX -= newX + originalX;
        }

        this.moving = true;

        let offset = [offsetX, offsetY];

        document.addEventListener("mousemove", async (mouseEvent) => {
            let windowHolder = document.getElementById(this.windowName);
            
            if(this.moving == false) {
                return;
            }

            mouseEvent.preventDefault();


            let mouseX = mouseEvent.x;
            let mouseY = mouseEvent.y;

            this.x = mouseX;
            this.y = mouseY;
            windowHolder.style.left = `${mouseX - offset[0]}px`;
            windowHolder.style.top = `${mouseY - offset[1]}px`;
        });
    }

    #stopMovingWindow() {
        this.moving = false;
    }
    
    #maximize() {
        this.changeHolderDiv();

        if(this.maximized == true) {
            this.windowHolder.style.height = `${this.startingHeight}px`;
            this.windowHolder.style.width = `${this.startingWidth}px`;

            this.holderDiv.style.height = `${Number(this.windowHolder.style.height.replace("px", "")) - 30}px`;
            this.holderDiv.style.width = `${Number(this.windowHolder.style.width.replace("px", "")) - 10}px`;

            this.exitButton.style.left = `${Number(this.windowHolder.style.width.replace('px', "")) - Number(this.exitButton.style.width.replace("px", ""))}px`;
            this.maximizeButton.style.left = `${Number(this.windowHolder.style.width.replace('px', "")) - Number(this.maximizeButton.style.width.replace("px", "")) - 30}px`;
            this.minimizeButton.style.left = `${Number(this.windowHolder.style.width.replace('px', "")) - Number(this.minimizeButton.style.width.replace("px", "")) - 60}px`;

            this.windowHolder.style.left = `${this.x}px`;
            this.windowHolder.style.top = `${this.y}px`;

            this.titleDiv.style.width = `${Number(this.windowHolder.style.width.replace("px", "")) - 90}px`;

            this.maximized = false;
            return;
        }
    
        this.windowHolder.style.left = 0;
        this.windowHolder.style.top = 0;
    
        this.windowHolder.style.height = `${window.innerHeight}px`;
        this.windowHolder.style.width = `${window.innerWidth}px`;

        this.titleDiv.style.width = `${Number(this.windowHolder.style.width.replace("px", "")) - 90}px`;

        this.exitButton.style.left = `${Number(this.windowHolder.style.width.replace('px', "")) - Number(this.exitButton.style.width.replace("px", ""))}px`;
        this.maximizeButton.style.left = `${Number(this.windowHolder.style.width.replace('px', "")) - Number(this.maximizeButton.style.width.replace("px", "")) - 30}px`;
        this.minimizeButton.style.left = `${Number(this.windowHolder.style.width.replace('px', "")) - Number(this.minimizeButton.style.width.replace("px", "")) - 60}px`;

        this.holderDiv.style.height = `${Number(this.windowHolder.style.height.replace("px", "")) - 30}px`;
        this.holderDiv.style.width = `${Number(this.windowHolder.style.width.replace("px", "")) - 10}px`;

        this.maximized = true;
    }

    changeHolderDiv() {
        this.holderDiv = document.getElementById(`${this.windowName}Holder`);
    }

    async minimize() {

        if(this.windowHolder.hidden == true) {
            this.windowHolder.style.opacity = 1;
            this.windowHolder.hidden = false;

            return;
        }

        for(let i = 1; i > 0; i -= 0.05) {
            this.windowHolder.style.opacity = i;
            await sleep(1);  
        }

        this.windowHolder.hidden = true;
    }

    update() {
        return this;
    }


    /**
     * 
     * @param {MouseEvent} ev 
     * @param {"bottomRight"} position
     */
    #resize(ev, position) {
        let originalClickOffset = [ev.offsetX, ev.offsetY];

        let finishResizing = false;

        let mathFunctions = {
            bottomRight : {
                x : (mouseEvent) => Math.abs((mouseEvent.x + originalClickOffset[0]) - (Number(this.windowHolder.style.left.replace("px", "")))),
                y : (mouseEvent) => Math.abs((mouseEvent.y + originalClickOffset[1]) - (Number(this.windowHolder.style.top.replace("px", "")))),
                function : this.#resizeBottomRight
            },
            bottomLeft : {
                x : (mouseEvent) => Math.abs((mouseEvent.x + originalClickOffset[0]) - (Number(this.windowHolder.style.left.replace("px", "")) + Number(this.windowHolder.style.width.replace("px", "")))),
                y : (mouseEvent) => Math.abs((mouseEvent.y + originalClickOffset[1]) - (Number(this.windowHolder.style.top.replace("px", "")))),
                function : this.#resizeBottomLeft
            },
            topLeft : {
                x : (mouseEvent) => Math.abs((mouseEvent.x + originalClickOffset[0]) - (Number(this.windowHolder.style.left.replace("px", "")) + Number(this.windowHolder.style.width.replace("px", "")))),
                y : (mouseEvent) => Math.abs((mouseEvent.y + originalClickOffset[1]) - (Number(this.windowHolder.style.top.replace("px", "")) + Number(this.windowHolder.style.height.replace("px", "")))),
                function : this.#resizeTopLeft
            },
            topRight : {
                x : (mouseEvent) => Math.abs((mouseEvent.x + originalClickOffset[0]) - (Number(this.windowHolder.style.left.replace("px", "")))),
                y : (mouseEvent) => Math.abs((mouseEvent.y + originalClickOffset[1]) - (Number(this.windowHolder.style.top.replace("px", "")) + Number(this.windowHolder.style.height.replace("px", "")))),
                function : this.#resizeTopRight
            },
            left: {
                x : (mouseEvent) => Math.abs((mouseEvent.x + originalClickOffset[0]) - (Number(this.windowHolder.style.left.replace("px", "")) + Number(this.windowHolder.style.width.replace("px", "")))),
                y : (mouseEvent) => 0,
                function : this.#resizeLeft
            },
            right: {
                x : (mouseEvent) => Math.abs((mouseEvent.x + originalClickOffset[0]) - (Number(this.windowHolder.style.left.replace("px", "")))),
                y : (mouseEvent) => 0,
                function : this.#resizeRight
            },
            top : {
                x : (mouseEvent) => 0,
                y : (mouseEvent) => Math.abs((mouseEvent.y + originalClickOffset[1]) - (Number(this.windowHolder.style.top.replace("px", "")) + Number(this.windowHolder.style.height.replace("px", "")))),
                function : this.#resizeTop
            },

            bottom : {
                x : (mouseEvent) => 0,
                y : (mouseEvent) => Math.abs((mouseEvent.y + originalClickOffset[1]) - (Number(this.windowHolder.style.top.replace("px", "")))),
                function : this.#resizeBottom
            },
        }

        document.addEventListener("mouseup", () => {
            finishResizing = true;

            document.removeEventListener
        })

        document.addEventListener("mousemove", async (mouseEvent) => {
            if(finishResizing) return;

            let newSizeX = mathFunctions[position].x(mouseEvent);
            let newSizeY = mathFunctions[position].y(mouseEvent);

            if(newSizeX < this.minWidth) newSizeX = `${this.minWidth}px`;
            if(newSizeY < this.minHeight) newSizeY = `${this.minHeight}px`;

            mathFunctions[position].function(newSizeX, newSizeY, this);
        });
    }

    /**
     * 
     * @param {number} newSizeX 
     * @param {number} newSizeY 
     * @param {lunaWindow} window
     */
    #resizeBottomRight(newSizeX, newSizeY, window) {

        window.windowHolder.style.width = `${newSizeX}px`;
        window.windowHolder.style.height = `${newSizeY}px`;

        window.titleDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 90}px`;

        window.exitButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.exitButton.style.width.replace("px", ""))}px`;
        window.maximizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.maximizeButton.style.width.replace("px", "")) - 30}px`;
        window.minimizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.minimizeButton.style.width.replace("px", "")) - 60}px`;

        window.holderDiv.style.height = `${Number(window.windowHolder.style.height.replace("px", "")) - 30}px`;
        window.holderDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 10}px`;
    }

        /**
     * 
     * @param {number} newSizeX 
     * @param {number} newSizeY 
     * @param {lunaWindow} window
     */

    #resizeBottomLeft(newSizeX, newSizeY, window) {
        let rightX = Number(window.windowHolder.style.left.replace("px", "")) + Number(window.windowHolder.style.width.replace("px", ""));

        window.windowHolder.style.width = `${newSizeX}px`;
        window.windowHolder.style.height = `${newSizeY}px`;

        
        window.titleDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 90}px`;
        
        window.exitButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.exitButton.style.width.replace("px", ""))}px`;
        window.maximizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.maximizeButton.style.width.replace("px", "")) - 30}px`;
        window.minimizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.minimizeButton.style.width.replace("px", "")) - 60}px`;
        
        window.holderDiv.style.height = `${Number(window.windowHolder.style.height.replace("px", "")) - 30}px`;
        window.holderDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 10}px`;

        window.windowHolder.style.left = `${rightX - window.windowHolder.style.width.replace("px", "")}px`;
    }

    #resizeTopLeft(newSizeX, newSizeY, window) {
        let rightX = Number(window.windowHolder.style.left.replace("px", "")) + Number(window.windowHolder.style.width.replace("px", ""));
        let bottomY = Number(window.windowHolder.style.top.replace("px", "")) + Number(window.windowHolder.style.height.replace("px", ""));

        window.windowHolder.style.width = `${newSizeX}px`;
        window.windowHolder.style.height = `${newSizeY}px`;

        
        window.titleDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 90}px`;
        
        window.exitButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.exitButton.style.width.replace("px", ""))}px`;
        window.maximizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.maximizeButton.style.width.replace("px", "")) - 30}px`;
        window.minimizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.minimizeButton.style.width.replace("px", "")) - 60}px`;
        
        window.holderDiv.style.height = `${Number(window.windowHolder.style.height.replace("px", "")) - 30}px`;
        window.holderDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 10}px`;
        
        window.windowHolder.style.left = `${rightX - window.windowHolder.style.width.replace("px", "")}px`;
        window.windowHolder.style.top = `${bottomY - window.windowHolder.style.height.replace("px", "")}px`;
    }

    #resizeTopRight(newSizeX, newSizeY, window) {
        let bottomY = Number(window.windowHolder.style.top.replace("px", "")) + Number(window.windowHolder.style.height.replace("px", ""));

        window.windowHolder.style.width = `${newSizeX}px`;
        window.windowHolder.style.height = `${newSizeY}px`;

        
        window.titleDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 90}px`;
        
        window.exitButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.exitButton.style.width.replace("px", ""))}px`;
        window.maximizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.maximizeButton.style.width.replace("px", "")) - 30}px`;
        window.minimizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.minimizeButton.style.width.replace("px", "")) - 60}px`;
        
        window.holderDiv.style.height = `${Number(window.windowHolder.style.height.replace("px", "")) - 30}px`;
        window.holderDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 10}px`;
        
        window.windowHolder.style.top = `${bottomY - window.windowHolder.style.height.replace("px", "")}px`;
    }

    #resizeLeft(newSizeX, newSizeY, window) {
        let rightX = Number(window.windowHolder.style.left.replace("px", "")) + Number(window.windowHolder.style.width.replace("px", ""));

        window.windowHolder.style.width = `${newSizeX}px`;
        
        window.titleDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 90}px`;
        
        window.exitButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.exitButton.style.width.replace("px", ""))}px`;
        window.maximizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.maximizeButton.style.width.replace("px", "")) - 30}px`;
        window.minimizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.minimizeButton.style.width.replace("px", "")) - 60}px`;
        
        window.holderDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 10}px`;
        
        window.windowHolder.style.left = `${rightX - window.windowHolder.style.width.replace("px", "")}px`;
    }

    #resizeRight(newSizeX, newSizeY, window) {
        window.windowHolder.style.width = `${newSizeX}px`;
        
        window.titleDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 90}px`;
        
        window.exitButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.exitButton.style.width.replace("px", ""))}px`;
        window.maximizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.maximizeButton.style.width.replace("px", "")) - 30}px`;
        window.minimizeButton.style.left = `${Number(window.windowHolder.style.width.replace('px', "")) - Number(window.minimizeButton.style.width.replace("px", "")) - 60}px`;
        
        window.holderDiv.style.width = `${Number(window.windowHolder.style.width.replace("px", "")) - 10}px`;

    }

    #resizeTop(newSizeX, newSizeY, window) {
        let bottomY = Number(window.windowHolder.style.top.replace("px", "")) + Number(window.windowHolder.style.height.replace("px", ""));

        window.windowHolder.style.height = `${newSizeY}px`;

        window.holderDiv.style.height = `${Number(window.windowHolder.style.height.replace("px", "")) - 30}px`;

        window.windowHolder.style.top = `${bottomY - window.windowHolder.style.height.replace("px", "")}px`;
    }

    #resizeBottom(newSizeX, newSizeY, window) {
        window.windowHolder.style.height = `${newSizeY}px`;

        window.holderDiv.style.height = `${Number(window.windowHolder.style.height.replace("px", "")) - 30}px`;
    }


    focus() {
        for(let i = 0; i < windows.length; i++) {
            if(windows[i].focused) {
                windows[i].unfocus();
            }
        }

        this.windowHolder.style.opacity = "100%";

        this.focused = true;

        this.windowHolder.style.zIndex = "5";
    }

    unfocus() {
        this.focused = false;
        this.windowHolder.style.opacity = "80%";
        this.windowHolder.style.zIndex = "0";
    }

    reloadColors() {
        this.windowHolder.style.backgroundColor = colorThemes[currentTheme].windowHolder;
        this.titleDiv.style.backgroundColor = colorThemes[currentTheme].titleDiv;
        this.holderDiv.style.backgroundColor = colorThemes[currentTheme].holderDiv;
        this.titleText.style.color = colorThemes[currentTheme].text;
        this.maximizeButton.style.color = colorThemes[currentTheme].text;
    }

    addToStorage(name, variable) {
        this.windowStorage[name] = variable;
    }
}