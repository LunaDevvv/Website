

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
        
        window_holder.style.backgroundColor = "darkSlateGray";
        window_holder.style.minHeight = this.min_height;
        window_holder.style.minWidth = this.min_width;
        window_holder.style.width = this.starting_width;
        window_holder.style.height = this.starting_height;
        window_holder.style.borderRadius = "5px";
        window_holder.style.left = this.starting_x;
        window_holder.style.top = this.starting_y;
        
        let title_div = document.createElement("div");
        title_div.style.height = "20px";
        title_div.style.width = window_holder.style.width;
        title_div.style.top = "0px";
        title_div.style.position = "absolute";
        title_div.addEventListener("mousedown", () => {
            this.#move_window();
        });
        
        document.addEventListener("mouseup", () => {
            this.#stop_moving_window();
        });

        const title_text = document.createElement("pre");
        title_text.textContent = this.window_name.replaceAll("_", " ");
        title_text.style.position = "absolute";
        title_text.style.left = "10px";
        title_text.style.top = "-10px";

        const exit_button = document.createElement("button");
        exit_button.textContent = "X";
        exit_button.style.position = "absolute";
        exit_button.style.color = "red";
        exit_button.style.width = "25px";
        exit_button.style.left = `${Number(title_div.style.width.replace('px', "")) - Number(exit_button.style.width.replace("px", ""))}px`;

        exit_button.onclick = () => {
            document.getElementById(this.window_name).remove();
            this.exitCallback();
        }

        
        
        const minimize_button = document.createElement("button");
        minimize_button.textContent = "-";
        minimize_button.style.position = "absolute";
        minimize_button.style.color = "gray";
        minimize_button.style.width = "25px";
        minimize_button.style.left = `${Number(title_div.style.width.replace('px', "")) - Number(minimize_button.style.width.replace("px", "")) - 60}px`;
        
        let holder_div = document.createElement("div");
        holder_div.style.position = "absolute";
        holder_div.style.top = "25px";
        holder_div.style.left = "5px";
        holder_div.style.height = `${Number(window_holder.style.height.replace("px", "")) - 30}px`;
        holder_div.style.width = `${Number(window_holder.style.width.replace("px", "")) - 10}px`;
        holder_div.style.backgroundColor = "white";

        const maximize_button = document.createElement("button");
        maximize_button.textContent = "□";
        maximize_button.style.position = "absolute";
        maximize_button.style.color = "white";
        maximize_button.style.width = "25px";
        maximize_button.style.left = `${Number(title_div.style.width.replace('px', "")) - Number(maximize_button.style.width.replace("px", "")) - 30}px`;

        maximize_button.onclick = () => {
            this.#maximize(window_holder, holder_div, title_div, minimize_button, maximize_button, exit_button);
            return;
        }

        minimize_button.onclick = async () => {

            while(Number(window_holder.style.top.replace("px", "")) < window.innerHeight) {
                let height = Number(window_holder.style.top.replace("px", "")) + 10;

                console.log(height);

                await sleep(1);

                window_holder.style.top = `${height}px`;
            }

            window_holder.hidden = true;
            return;
        }
        
        
        
        
        window_holder.appendChild(title_div);
        title_div.appendChild(title_text);
        title_div.appendChild(exit_button);
        title_div.appendChild(maximize_button);
        title_div.appendChild(minimize_button);


        window_holder.appendChild(holder_div);
        window_holder.left = "10px";

        document.body.appendChild(window_holder);
        this.inside_function();
    }

    #move_window() {
        this.moving = true;

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

            let offset = [0, 0];

            offset[0] =  mouseX - Number(window_holder.style.left.replace("px", ""));

            // console.log(offset[0]);
            window_holder.style.left = `${mouseX}px`;
            window_holder.style.top = `${mouseY}px`;
        });
    }

    #stop_moving_window() {
        this.moving = false;
    }
    
    #maximize(current_window, internal_window, title_div, minimize_button, maximize_button, exit_button) {
        if(this.maximized == true) {
            current_window.style.height = `${this.starting_height}px`;
            current_window.style.width = `${this.starting_width}px`;

            title_div.style.width = current_window.style.width;

            internal_window.style.height = `${Number(current_window.style.height.replace("px", "")) - 30}px`;
            internal_window.style.width = `${Number(current_window.style.width.replace("px", "")) - 10}px`;

            exit_button.style.left = `${Number(title_div.style.width.replace('px', "")) - Number(exit_button.style.width.replace("px", ""))}px`;
            maximize_button.style.left = `${Number(title_div.style.width.replace('px', "")) - Number(maximize_button.style.width.replace("px", "")) - 30}px`;
            minimize_button.style.left = `${Number(title_div.style.width.replace('px', "")) - Number(minimize_button.style.width.replace("px", "")) - 60}px`;

            current_window.style.left = `${this.x}px`;
            current_window.style.top = `${this.y}px`;

            this.maximized = false;
            return
        }
    
        current_window.style.left = 0;
        current_window.style.top = 0;
    
        current_window.style.height = window.innerHeight;
        current_window.style.width = window.innerWidth;

        title_div.style.width = current_window.style.width;

        exit_button.style.left = `${Number(title_div.style.width.replace('px', "")) - Number(exit_button.style.width.replace("px", ""))}px`;
        maximize_button.style.left = `${Number(title_div.style.width.replace('px', "")) - Number(maximize_button.style.width.replace("px", "")) - 30}px`;
        minimize_button.style.left = `${Number(title_div.style.width.replace('px', "")) - Number(minimize_button.style.width.replace("px", "")) - 60}px`;

        internal_window.style.height = `${Number(current_window.style.height.replace("px", "")) - 30}px`;
        internal_window.style.width = `${Number(current_window.style.width.replace("px", "")) - 10}px`;

        this.maximized = true;
        return console.log("In development!");
    }
}