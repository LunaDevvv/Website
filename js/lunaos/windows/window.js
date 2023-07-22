class luna_window {
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
        
        window_holder.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        window_holder.style.minHeight = `${this.min_height}px`;
        window_holder.style.minWidth = `${this.min_width}px`;
        window_holder.style.width = `${this.starting_width}px`;
        window_holder.style.height = `${this.starting_height}px`;
        window_holder.style.borderRadius = "5px";
        window_holder.style.left = `${this.starting_x}px`;
        window_holder.style.top = `${this.starting_y}px`;
        window_holder.style.backdropFilter = "blur(20px)"
        
        let title_div = document.createElement("div");
        title_div.style.height = "20px";
        title_div.style.width = `${Number(window_holder.style.width.replace("px", "")) - 65}px`;
        title_div.style.top = "0px";
        title_div.style.position = "absolute";
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
        title_text.style.color = "white";
        const exit_button = document.createElement("button");
        exit_button.textContent = "X";
        exit_button.style.position = "absolute";
        exit_button.style.color = "red";
        exit_button.style.width = "25px";
        exit_button.style.left = `${Number(window_holder.style.width.replace('px', "")) - Number(exit_button.style.width.replace("px", ""))}px`;
        exit_button.style.border = "none";
        exit_button.style.background = "none";

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
        minimize_button.style.background = "none";
        
        let holder_div = document.createElement("div");
        holder_div.style.position = "absolute";
        holder_div.style.top = "25px";
        holder_div.style.left = "5px";
        holder_div.style.height = `${Number(window_holder.style.height.replace("px", "")) - 30}px`;
        holder_div.style.width = `${Number(window_holder.style.width.replace("px", "")) - 10}px`;
        holder_div.style.backgroundColor = "black";
        holder_div.id = `${this.window_name}_holder`;

        const maximize_button = document.createElement("button");
        maximize_button.textContent = "□";
        maximize_button.style.position = "absolute";
        maximize_button.style.color = "white";
        maximize_button.style.width = "25px";
        maximize_button.style.left = `${Number(window_holder.style.width.replace('px', "")) - Number(maximize_button.style.width.replace("px", "")) - 30}px`;
        maximize_button.style.border = "none";
        maximize_button.style.background = "none";

        maximize_button.onclick = () => {
            this.#maximize();
            return;
        }

        minimize_button.onclick = async () => {

            this.minimize();
            return;
        }
        
        
        
        
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

        window_holder.appendChild(holder_div);
        this.holder_div = holder_div;
        window_holder.left = "10px";

        document.body.appendChild(window_holder);

        this.inside_function(this);
    }

    #move_window(offsetX, offsetY) {
        if(this.maximized) {
            this.#maximize();
            offsetX = 0;
            offsetY = 0;
        }

        this.moving = true;

        let offset = [offsetX, offsetY];

        document.addEventListener("mousemove", (mouseEvent) => {
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

            this.title_div.style.width = `${Number(this.window_holder.style.width.replace("px", "")) - 65}px`;

            this.maximized = false;
            return;
        }
    
        this.window_holder.style.left = 0;
        this.window_holder.style.top = 0;
    
        this.window_holder.style.height = `${window.innerHeight}px`;
        this.window_holder.style.width = `${window.innerWidth}px`;

        this.title_div.style.width = `${Number(this.window_holder.style.width.replace("px", "")) - 65}px`;

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
            console.log(i);
            this.window_holder.style.opacity = i;
            await sleep(1);  
        }

        this.window_holder.hidden = true;
    }

    update() {
        return this;
    }
}