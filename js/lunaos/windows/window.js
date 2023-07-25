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
 * @type {Array<luna_window>}
 * 
 * @typedef {import("../color_themes")}
 */
let windows = [];

function reloadWindowColors() {
    for(let i = 0; i < windows.length; i++) {
        windows[i].reloadColors();
    }
}

class luna_window {
    window_storage = {};

    /**
     * @param {string} window_name
     * @param {number} starting_x
     * @param {number} starting_y
     * @param {number} starting_height
     * @param {number} starting_width
     * @param {number} min_height
     * @param {number} min_width
     * @param {Function} inside_function
     * @param {Function} exit_callback 
     */
    constructor(window_name, starting_x, starting_y, starting_height, starting_width, min_height, min_width, inside_function, exit_callback) {
        this.window_name = window_name.replaceAll(" ", "_");
        this.starting_x = starting_x;
        this.starting_y = starting_y;
        this.starting_height = starting_height;
        this.starting_width = starting_width;
        this.min_height = min_height;
        this.min_width = min_width;
        this.focused = false;
        windows.push(this);

        this.x = starting_x;
        this.y = starting_y;

        this.inside_function = inside_function;
        this.exitCallback = exit_callback;

        this.moving = false;

        this.maximized = false;

        this.#generate_window();
    }

    #generate_window() {
        const window_holder = document.createElement("div");
        window_holder.id = `${this.window_name}`;
        window_holder.style.position = "absolute";

        window_holder.style.backgroundColor = color_themes[current_theme].window_holder;
        window_holder.style.minHeight = `${this.min_height}px`;
        window_holder.style.minWidth = `${this.min_width}px`;
        window_holder.style.width = `${this.starting_width}px`;
        window_holder.style.height = `${this.starting_height}px`;
        window_holder.style.borderRadius = "5px";
        window_holder.style.left = `${this.starting_x}px`;
        window_holder.style.top = `${this.starting_y}px`;

        window_holder.onmousedown = () => {
            this.focus();
        }
        
        let title_div = document.createElement("div");
        title_div.style.width = `${Number(window_holder.style.width.replace("px", "")) - 90}px`;
        title_div.style.top = "0px";
        title_div.style.height = "25px";
        title_div.style.position = "absolute";
        title_div.style.backgroundColor = color_themes[current_theme].title_div;
        title_div.style.borderRadius = "5px";
        
        title_div.addEventListener("mousedown", (event) => {
            this.#move_window(event.offsetX, event.offsetY);
        });
        
        document.addEventListener("mouseup", () => {
            this.#stop_moving_window();
        });

        const title_text = document.createElement("pre");
        title_text.textContent = this.window_name.replaceAll("_", " ");
        title_text.style.position = "absolute";
        title_text.style.left = "10px";
        title_text.style.top = "-10px";
        title_text.style.cursor = "default";
        title_text.style.fontSize = "15px";
        title_text.style.color = color_themes[current_theme].text;
        const exit_button = document.createElement("button");
        exit_button.textContent = "X";
        exit_button.style.position = "absolute";
        exit_button.style.color = "red";
        exit_button.style.width = "25px";
        exit_button.style.left = `${Number(window_holder.style.width.replace('px', "")) - Number(exit_button.style.width.replace("px", ""))}px`;
        exit_button.style.border = "none";
        exit_button.style.background = "none";
        exit_button.style.borderRadius = "5px";
        exit_button.style.height = "25px"

        exit_button.onmouseleave = () => {
            exit_button.style.background = "none";
        }
        
        exit_button.onmouseenter = () => {
            exit_button.style.backgroundColor = "darkRed";
        }

        exit_button.onclick = () => {
            document.getElementById(this.window_name).remove();
            this.exitCallback();
        }
        
        const minimize_button = document.createElement("button");
        minimize_button.textContent = "-";
        minimize_button.style.position = "absolute";
        minimize_button.style.color = "gray";
        minimize_button.style.width = "25px";
        minimize_button.style.left = `${Number(window_holder.style.width.replace('px', "")) - Number(minimize_button.style.width.replace("px", "")) - 60}px`;
        minimize_button.style.border = "none";
        minimize_button.style.height = "25px"
        minimize_button.style.background = "none";
        minimize_button.style.borderRadius = "5px";
        
        let holder_div = document.createElement("div");
        holder_div.tabIndex = 0;
        holder_div.style.position = "absolute";
        holder_div.style.top = "25px";
        holder_div.style.left = "5px";
        holder_div.style.height = `${Number(window_holder.style.height.replace("px", "")) - 30}px`;
        holder_div.style.width = `${Number(window_holder.style.width.replace("px", "")) - 10}px`;
        holder_div.style.backgroundColor = color_themes[current_theme].holder_div;
        holder_div.id = `${this.window_name}_holder`;
        holder_div.style.overflow = "auto";

        const maximize_button = document.createElement("button");
        maximize_button.textContent = "□";
        maximize_button.style.position = "absolute";
        maximize_button.style.color = color_themes[current_theme].text;
        maximize_button.style.height = "25px"
        maximize_button.style.width = "25px";
        maximize_button.style.left = `${Number(window_holder.style.width.replace('px', "")) - Number(maximize_button.style.width.replace("px", "")) - 30}px`;
        maximize_button.style.border = "none";
        maximize_button.style.background = "none";
        maximize_button.style.borderRadius = "5px";

        minimize_button.onmouseleave = () => {
            minimize_button.style.background = "none";
        }
        
        minimize_button.onmouseenter = () => {
            minimize_button.style.backgroundColor = "#252626";
        }

        maximize_button.onmouseleave = () => {
            maximize_button.style.background = "none";
        }
        
        maximize_button.onmouseenter = () => {
            maximize_button.style.backgroundColor = "#2a282e";
        }

        maximize_button.onclick = async () => {
            this.#maximize();
            return;
        }

        minimize_button.onclick = async () => {

            this.minimize();
            return;
        }
        
        let bottom_right_resize = document.createElement("div");
        bottom_right_resize.style.width = "10px";
        bottom_right_resize.style.height = "10px";
        bottom_right_resize.style.zIndex = 2;
        bottom_right_resize.style.cursor = "nwse-resize";
        bottom_right_resize.style.position = "absolute";
        bottom_right_resize.style.left = "100%";
        bottom_right_resize.style.top = "99%";

        bottom_right_resize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "bottom_right");
        });

        let bottom_left_resize = document.createElement("div");
        bottom_left_resize.style.width = "10px";
        bottom_left_resize.style.height = "10px";
        bottom_left_resize.style.zIndex = 2;
        bottom_left_resize.style.cursor = "nesw-resize";
        bottom_left_resize.style.position = "absolute";
        bottom_left_resize.style.top = "99%";

        bottom_left_resize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "bottom_left");
        });

        let top_left_resize = document.createElement("div");
        top_left_resize.style.width = "10px";
        top_left_resize.style.height = "10px";
        top_left_resize.style.zIndex = 2;
        top_left_resize.style.cursor = "nwse-resize";
        top_left_resize.style.position = "absolute";

        top_left_resize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "top_left");
        });

        let top_right_resize = document.createElement("div");
        top_right_resize.style.width = "10px";
        top_right_resize.style.height = "10px";
        top_right_resize.style.zIndex = 2;
        top_right_resize.style.left = "99%";
        top_right_resize.style.cursor = "nesw-resize";
        top_right_resize.style.position = "absolute";

        top_right_resize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "top_right");
        });

        let left_resize = document.createElement("div");
        left_resize.style.width = "10px";
        left_resize.style.height = "98%";
        left_resize.style.top = "8px";
        left_resize.style.zIndex = 2;
        left_resize.style.cursor = "ew-resize";
        left_resize.style.position = "absolute";

        left_resize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "left");
        });

        let right_resize = document.createElement("div");
        right_resize.style.width = "10px";
        right_resize.style.height = "99%";
        right_resize.style.left = "100%";
        right_resize.style.zIndex = 2;
        right_resize.style.cursor = "ew-resize";
        right_resize.style.position = "absolute";

        right_resize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "right");
        });

        let top_resize = document.createElement("div");
        top_resize.style.width = "99%";
        top_resize.style.height = "10px";
        top_resize.style.top = "-1%"
        top_resize.style.zIndex = 2;
        top_resize.style.cursor = "ns-resize";
        top_resize.style.position = "absolute";

        top_resize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "top");
        });

        let bottom_resize = document.createElement("div");
        bottom_resize.style.width = "99%";
        bottom_resize.style.height = "10px";
        bottom_resize.style.top = "100%";
        bottom_resize.style.zIndex = 2;
        bottom_resize.style.cursor = "ns-resize";
        bottom_resize.style.position = "absolute";

        bottom_resize.addEventListener("mousedown", async (ev) => {
            ev.preventDefault();
            this.#resize(ev, "bottom");
        });
        
        window_holder.appendChild(title_div);
        this.title_div = title_div;
        this.window_holder = window_holder;
        title_div.appendChild(title_text);
        this.title_text = title_text;
        window_holder.appendChild(exit_button);
        this.exit_button = exit_button;
        window_holder.appendChild(maximize_button);
        this.maximize_button = maximize_button;
        window_holder.appendChild(minimize_button);
        this.minimize_button = minimize_button;

        window_holder.appendChild(bottom_right_resize);
        window_holder.appendChild(bottom_left_resize);
        window_holder.appendChild(top_left_resize);
        window_holder.appendChild(top_right_resize);
        window_holder.appendChild(left_resize);
        window_holder.appendChild(right_resize);
        window_holder.appendChild(top_resize);
        window_holder.appendChild(bottom_resize);

        window_holder.appendChild(holder_div);
        this.holder_div = holder_div;
        window_holder.left = "10px";

        document.body.appendChild(window_holder);

        this.focus();

        this.inside_function(this);
    }

    #move_window(offsetX, offsetY) {
        if(this.maximized) {
            let original_x = Number(this.window_holder.style.left.replace("px"))

            this.#maximize();

            let new_x = Number(this.window_holder.style.left.replace("px"));

            offsetX -= new_x + original_x;
        }

        this.moving = true;

        let offset = [offsetX, offsetY];

        document.addEventListener("mousemove", async (mouseEvent) => {
            let window_holder = document.getElementById(this.window_name);
            
            if(this.moving == false) {
                return;
            }

            mouseEvent.preventDefault();


            let mouseX = mouseEvent.x;
            let mouseY = mouseEvent.y;

            this.x = mouseX;
            this.y = mouseY;
            window_holder.style.left = `${mouseX - offset[0]}px`;
            window_holder.style.top = `${mouseY - offset[1]}px`;
        });
    }

    #stop_moving_window() {
        this.moving = false;
    }
    
    #maximize() {
        this.change_holder_div();

        if(this.maximized == true) {
            this.window_holder.style.height = `${this.starting_height}px`;
            this.window_holder.style.width = `${this.starting_width}px`;

            this.holder_div.style.height = `${Number(this.window_holder.style.height.replace("px", "")) - 30}px`;
            this.holder_div.style.width = `${Number(this.window_holder.style.width.replace("px", "")) - 10}px`;

            this.exit_button.style.left = `${Number(this.window_holder.style.width.replace('px', "")) - Number(this.exit_button.style.width.replace("px", ""))}px`;
            this.maximize_button.style.left = `${Number(this.window_holder.style.width.replace('px', "")) - Number(this.maximize_button.style.width.replace("px", "")) - 30}px`;
            this.minimize_button.style.left = `${Number(this.window_holder.style.width.replace('px', "")) - Number(this.minimize_button.style.width.replace("px", "")) - 60}px`;

            this.window_holder.style.left = `${this.x}px`;
            this.window_holder.style.top = `${this.y}px`;

            this.title_div.style.width = `${Number(this.window_holder.style.width.replace("px", "")) - 90}px`;

            this.maximized = false;
            return;
        }
    
        this.window_holder.style.left = 0;
        this.window_holder.style.top = 0;
    
        this.window_holder.style.height = `${window.innerHeight}px`;
        this.window_holder.style.width = `${window.innerWidth}px`;

        this.title_div.style.width = `${Number(this.window_holder.style.width.replace("px", "")) - 90}px`;

        this.exit_button.style.left = `${Number(this.window_holder.style.width.replace('px', "")) - Number(this.exit_button.style.width.replace("px", ""))}px`;
        this.maximize_button.style.left = `${Number(this.window_holder.style.width.replace('px', "")) - Number(this.maximize_button.style.width.replace("px", "")) - 30}px`;
        this.minimize_button.style.left = `${Number(this.window_holder.style.width.replace('px', "")) - Number(this.minimize_button.style.width.replace("px", "")) - 60}px`;

        this.holder_div.style.height = `${Number(this.window_holder.style.height.replace("px", "")) - 30}px`;
        this.holder_div.style.width = `${Number(this.window_holder.style.width.replace("px", "")) - 10}px`;

        this.maximized = true;
    }

    change_holder_div() {
        this.holder_div = document.getElementById(`${this.window_name}_holder`);
    }

    async minimize() {

        if(this.window_holder.hidden == true) {
            this.window_holder.style.opacity = 1;
            this.window_holder.hidden = false;

            return;
        }

        for(let i = 1; i > 0; i -= 0.05) {
            this.window_holder.style.opacity = i;
            await sleep(1);  
        }

        this.window_holder.hidden = true;
    }

    update() {
        return this;
    }


    /**
     * 
     * @param {MouseEvent} ev 
     * @param {"bottom_right"} position
     */
    #resize(ev, position) {
        let original_click_offset = [ev.offsetX, ev.offsetY];

        let finish_resizing = false;

        let math_functions = {
            bottom_right : {
                x : (mouseEvent) => Math.abs((mouseEvent.x + original_click_offset[0]) - (Number(this.window_holder.style.left.replace("px", "")))),
                y : (mouseEvent) => Math.abs((mouseEvent.y + original_click_offset[1]) - (Number(this.window_holder.style.top.replace("px", "")))),
                function : this.#resize_bottom_right
            },
            bottom_left : {
                x : (mouseEvent) => Math.abs((mouseEvent.x + original_click_offset[0]) - (Number(this.window_holder.style.left.replace("px", "")) + Number(this.window_holder.style.width.replace("px", "")))),
                y : (mouseEvent) => Math.abs((mouseEvent.y + original_click_offset[1]) - (Number(this.window_holder.style.top.replace("px", "")))),
                function : this.#resize_bottom_left
            },
            top_left : {
                x : (mouseEvent) => Math.abs((mouseEvent.x + original_click_offset[0]) - (Number(this.window_holder.style.left.replace("px", "")) + Number(this.window_holder.style.width.replace("px", "")))),
                y : (mouseEvent) => Math.abs((mouseEvent.y + original_click_offset[1]) - (Number(this.window_holder.style.top.replace("px", "")) + Number(this.window_holder.style.height.replace("px", "")))),
                function : this.#resize_top_left
            },
            top_right : {
                x : (mouseEvent) => Math.abs((mouseEvent.x + original_click_offset[0]) - (Number(this.window_holder.style.left.replace("px", "")))),
                y : (mouseEvent) => Math.abs((mouseEvent.y + original_click_offset[1]) - (Number(this.window_holder.style.top.replace("px", "")) + Number(this.window_holder.style.height.replace("px", "")))),
                function : this.#resize_top_right
            },
            left: {
                x : (mouseEvent) => Math.abs((mouseEvent.x + original_click_offset[0]) - (Number(this.window_holder.style.left.replace("px", "")) + Number(this.window_holder.style.width.replace("px", "")))),
                y : (mouseEvent) => 0,
                function : this.#resize_left
            },
            right: {
                x : (mouseEvent) => Math.abs((mouseEvent.x + original_click_offset[0]) - (Number(this.window_holder.style.left.replace("px", "")))),
                y : (mouseEvent) => 0,
                function : this.#resize_right
            },
            top : {
                x : (mouseEvent) => 0,
                y : (mouseEvent) => Math.abs((mouseEvent.y + original_click_offset[1]) - (Number(this.window_holder.style.top.replace("px", "")) + Number(this.window_holder.style.height.replace("px", "")))),
                function : this.#resize_top
            },

            bottom : {
                x : (mouseEvent) => 0,
                y : (mouseEvent) => Math.abs((mouseEvent.y + original_click_offset[1]) - (Number(this.window_holder.style.top.replace("px", "")))),
                function : this.#resize_bottom
            },
        }

        document.addEventListener("mouseup", () => {
            finish_resizing = true;

            document.removeEventListener
        })

        document.addEventListener("mousemove", async (mouseEvent) => {
            if(finish_resizing) return;

            let new_size_x = math_functions[position].x(mouseEvent);
            let new_size_y = math_functions[position].y(mouseEvent);

            if(new_size_x < this.min_width) new_size_x = `${this.min_width}px`;
            if(new_size_y < this.min_height) new_size_y = `${this.min_height}px`;

            math_functions[position].function(new_size_x, new_size_y, this);
        });
    }

    /**
     * 
     * @param {number} new_size_x 
     * @param {number} new_size_y 
     * @param {luna_window} window
     */
    #resize_bottom_right(new_size_x, new_size_y, window) {

        window.window_holder.style.width = `${new_size_x}px`;
        window.window_holder.style.height = `${new_size_y}px`;

        window.title_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 90}px`;

        window.exit_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.exit_button.style.width.replace("px", ""))}px`;
        window.maximize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.maximize_button.style.width.replace("px", "")) - 30}px`;
        window.minimize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.minimize_button.style.width.replace("px", "")) - 60}px`;

        window.holder_div.style.height = `${Number(window.window_holder.style.height.replace("px", "")) - 30}px`;
        window.holder_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 10}px`;
    }

        /**
     * 
     * @param {number} new_size_x 
     * @param {number} new_size_y 
     * @param {luna_window} window
     */

    #resize_bottom_left(new_size_x, new_size_y, window) {
        let right_x = Number(window.window_holder.style.left.replace("px", "")) + Number(window.window_holder.style.width.replace("px", ""));

        window.window_holder.style.width = `${new_size_x}px`;
        window.window_holder.style.height = `${new_size_y}px`;

        
        window.title_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 90}px`;
        
        window.exit_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.exit_button.style.width.replace("px", ""))}px`;
        window.maximize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.maximize_button.style.width.replace("px", "")) - 30}px`;
        window.minimize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.minimize_button.style.width.replace("px", "")) - 60}px`;
        
        window.holder_div.style.height = `${Number(window.window_holder.style.height.replace("px", "")) - 30}px`;
        window.holder_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 10}px`;

        window.window_holder.style.left = `${right_x - window.window_holder.style.width.replace("px", "")}px`;
    }

    #resize_top_left(new_size_x, new_size_y, window) {
        let right_x = Number(window.window_holder.style.left.replace("px", "")) + Number(window.window_holder.style.width.replace("px", ""));
        let bottom_y = Number(window.window_holder.style.top.replace("px", "")) + Number(window.window_holder.style.height.replace("px", ""));

        window.window_holder.style.width = `${new_size_x}px`;
        window.window_holder.style.height = `${new_size_y}px`;

        
        window.title_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 90}px`;
        
        window.exit_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.exit_button.style.width.replace("px", ""))}px`;
        window.maximize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.maximize_button.style.width.replace("px", "")) - 30}px`;
        window.minimize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.minimize_button.style.width.replace("px", "")) - 60}px`;
        
        window.holder_div.style.height = `${Number(window.window_holder.style.height.replace("px", "")) - 30}px`;
        window.holder_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 10}px`;
        
        window.window_holder.style.left = `${right_x - window.window_holder.style.width.replace("px", "")}px`;
        window.window_holder.style.top = `${bottom_y - window.window_holder.style.height.replace("px", "")}px`;
    }

    #resize_top_right(new_size_x, new_size_y, window) {
        let bottom_y = Number(window.window_holder.style.top.replace("px", "")) + Number(window.window_holder.style.height.replace("px", ""));

        window.window_holder.style.width = `${new_size_x}px`;
        window.window_holder.style.height = `${new_size_y}px`;

        
        window.title_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 90}px`;
        
        window.exit_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.exit_button.style.width.replace("px", ""))}px`;
        window.maximize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.maximize_button.style.width.replace("px", "")) - 30}px`;
        window.minimize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.minimize_button.style.width.replace("px", "")) - 60}px`;
        
        window.holder_div.style.height = `${Number(window.window_holder.style.height.replace("px", "")) - 30}px`;
        window.holder_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 10}px`;
        
        window.window_holder.style.top = `${bottom_y - window.window_holder.style.height.replace("px", "")}px`;
    }

    #resize_left(new_size_x, new_size_y, window) {
        let right_x = Number(window.window_holder.style.left.replace("px", "")) + Number(window.window_holder.style.width.replace("px", ""));

        window.window_holder.style.width = `${new_size_x}px`;
        
        window.title_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 90}px`;
        
        window.exit_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.exit_button.style.width.replace("px", ""))}px`;
        window.maximize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.maximize_button.style.width.replace("px", "")) - 30}px`;
        window.minimize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.minimize_button.style.width.replace("px", "")) - 60}px`;
        
        window.holder_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 10}px`;
        
        window.window_holder.style.left = `${right_x - window.window_holder.style.width.replace("px", "")}px`;
    }

    #resize_right(new_size_x, new_size_y, window) {
        window.window_holder.style.width = `${new_size_x}px`;
        
        window.title_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 90}px`;
        
        window.exit_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.exit_button.style.width.replace("px", ""))}px`;
        window.maximize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.maximize_button.style.width.replace("px", "")) - 30}px`;
        window.minimize_button.style.left = `${Number(window.window_holder.style.width.replace('px', "")) - Number(window.minimize_button.style.width.replace("px", "")) - 60}px`;
        
        window.holder_div.style.width = `${Number(window.window_holder.style.width.replace("px", "")) - 10}px`;

    }

    #resize_top(new_size_x, new_size_y, window) {
        let bottom_y = Number(window.window_holder.style.top.replace("px", "")) + Number(window.window_holder.style.height.replace("px", ""));

        window.window_holder.style.height = `${new_size_y}px`;

        window.holder_div.style.height = `${Number(window.window_holder.style.height.replace("px", "")) - 30}px`;

        window.window_holder.style.top = `${bottom_y - window.window_holder.style.height.replace("px", "")}px`;
    }

    #resize_bottom(new_size_x, new_size_y, window) {
        window.window_holder.style.height = `${new_size_y}px`;

        window.holder_div.style.height = `${Number(window.window_holder.style.height.replace("px", "")) - 30}px`;
    }


    focus() {
        for(let i = 0; i < windows.length; i++) {
            if(windows[i].focused) {
                windows[i].unfocus();
            }
        }

        this.window_holder.style.opacity = "100%";

        this.focused = true;

        this.window_holder.style.zIndex = "5";
    }

    unfocus() {
        this.focused = false;
        this.window_holder.style.opacity = "80%";
        this.window_holder.style.zIndex = "0";
    }

    reloadColors() {
        this.window_holder.style.backgroundColor = color_themes[current_theme].window_holder;
        this.title_div.style.backgroundColor = color_themes[current_theme].title_div;
        this.holder_div.style.backgroundColor = color_themes[current_theme].holder_div;
        this.title_text.style.color = color_themes[current_theme].text;
        this.maximize_button.style.color = color_themes[current_theme].text;
    }

    add_to_storage(name, variable) {
        this.window_storage[name] = variable;
    }
}