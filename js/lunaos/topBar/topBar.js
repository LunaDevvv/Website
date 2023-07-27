/**
 * @typedef {import("../contextMenuFunction")}
 * @typedef {import("../windows/window")}
 */

class topBar {
    constructor() {
        const MAIN_DIV = document.createElement("div");
        MAIN_DIV.style.width = "100%";
        MAIN_DIV.style.backgroundColor = colorThemes[currentTheme].baseDiv;
        MAIN_DIV.style.top = "0px";
        MAIN_DIV.style.left = "0px";
        MAIN_DIV.style.position = "absolute";
        MAIN_DIV.style.zIndex = "0";
        MAIN_DIV.style.height = "30px";

        this.MAIN_DIV = MAIN_DIV;

        const DATE = document.createElement("pre");
        
        let date = new Date();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        this.year = date.getUTCFullYear();

        this.hour = date.getHours();
        this.minute = date.getMinutes();
        this.seconds = date.getSeconds();
        
        this.timeOfDay = "AM";

        this.minuteAppend = "";

        if(this.minute < 10) this.minuteAppend = "0";

        if(this.hour > 12)  {
            this.timeOfDay = "PM";
            this.hour = this.hour - 12;
        }

        if(this.hour == 0) this.hour = 12;

        this.secondAppend = "";

        if(this.seconds < 10) this.secondAppend = "0";

        DATE.style.color = colorThemes[currentTheme].text;
        DATE.style.fontSize = "15px";

        DATE.textContent = `${this.hour}:${this.minuteAppend}${this.minute}:${this.secondAppend}${this.seconds} ${this.timeOfDay}   ${this.month}/${this.day}/${this.year}`;
        DATE.style.position = "absolute";
        DATE.style.left = "calc(100% - 200px)";
        DATE.style.top = "8px";
        DATE.style.marginTop = "0px";

        setInterval(() => {
            let date = new Date();
            this.month = date.getMonth() + 1;
            this.day = date.getDate();
            this.year = date.getUTCFullYear();
    
            this.hour = date.getHours();
            this.minute = date.getMinutes();
            this.seconds = date.getSeconds();
            
            this.timeOfDay = "AM";
    
            this.minuteAppend = "";
    
            if(this.minute < 10) this.minuteAppend = "0";
    
            if(this.hour > 12)  {
                this.timeOfDay = "PM";
                this.hour = this.hour - 12;
            }

            this.secondAppend = "";

            if(this.seconds < 10) this.secondAppend = "0";
    
            if(this.hour == 0) this.hour = 12;
    
            DATE.textContent = `${this.hour}:${this.minuteAppend}${this.minute}:${this.secondAppend}${this.seconds} ${this.timeOfDay}   ${this.month}/${this.day}/${this.year}`;
        }, 1000);

        
        
        const MENU_BUTTON = document.createElement("button");
        
        MENU_BUTTON.textContent = "🦊 Menu";
        
        MENU_BUTTON.style.height = "100%";
        MENU_BUTTON.style.left = "0";
        MENU_BUTTON.style.width = "80px";
        MENU_BUTTON.style.color = colorThemes[currentTheme].text;
        MENU_BUTTON.style.background = "none";
        MENU_BUTTON.style.border = "none";

        MENU_BUTTON.onmouseenter = (ev) => { 
            MENU_BUTTON.style.backgroundColor = colorThemes[currentTheme].menuHover; 
        }

        const MENU_HEIGHT = 40 + 20 * Object.keys(applicationTypes).length;

        MENU_BUTTON.onclick = () => {
            const MENU_DIV = createContextMenu({
                x: 0,
                y : 30,
            }, MENU_HEIGHT, 300, colorThemes[currentTheme].topMenuColor, 0, 100);

            for(let i = 0; i < Object.keys(applicationTypes).length; i++ ) {
                
                const KEY = Object.keys(applicationTypes)[i]

                const CURRENT_HOVER_OBJECT = createContextHoverItem(KEY, (CURRENT_HOVER_OBJECT) => {
                    const HOVER_MENU_HEIGHT = 40 + 20 * Object.keys(applicationTypes[KEY]).length;


                    const CURRENT_HOVER_MENU = createContextHoverMenu(i * 23, HOVER_MENU_HEIGHT, undefined, colorThemes[currentTheme].topMenuColor, 0, 100);

                    for(let j = 0; j < Object.keys(applicationTypes[KEY]).length; j++) {
                        const INSIDE_KEY = Object.keys(applicationTypes[KEY])[j];

                        const APPLICATION_BUTTONS = createContextButton(INSIDE_KEY, applicationTypes[KEY][INSIDE_KEY], 0, 100);

                        CURRENT_HOVER_MENU.appendChild(APPLICATION_BUTTONS);
                    }
                    
                    CURRENT_HOVER_OBJECT.appendChild(CURRENT_HOVER_MENU);
                }, 0, 100);
                
                MENU_DIV.appendChild(CURRENT_HOVER_OBJECT);

            }

            document.body.appendChild(MENU_DIV);
        }

        MENU_BUTTON.onmouseleave = () => {
            MENU_BUTTON.style.background = "none";
        }
        
        const BUTTON_HOLDER_DIV = document.createElement("div");
        BUTTON_HOLDER_DIV.style.overflowX = "auto";
        BUTTON_HOLDER_DIV.style.overflowY = "hidden";
        BUTTON_HOLDER_DIV.style.position = "absolute";
        BUTTON_HOLDER_DIV.style.left = "83px";
        BUTTON_HOLDER_DIV.style.top = "0px";
        BUTTON_HOLDER_DIV.style.width = "calc(100% - 290px)";
        BUTTON_HOLDER_DIV.style.height = "30px";
        BUTTON_HOLDER_DIV.style.display = "flex";
        BUTTON_HOLDER_DIV.style.flexDirection = "row";

        this.BUTTON_HOLDER_DIV = BUTTON_HOLDER_DIV;

        
        MAIN_DIV.appendChild(DATE);
        MAIN_DIV.appendChild(MENU_BUTTON);
        MAIN_DIV.appendChild(BUTTON_HOLDER_DIV);

        document.body.appendChild(MAIN_DIV);
    }

    /**
     * @param { lunaWindow } openedWindow
     */
    openedWindow(openedWindow) {
        const button = document.createElement("button");
        button.style.backgroundColor = "none";
        button.textContent = openedWindow.windowName;
        button.id = `${openedWindow.windowName}Button`;
        button.style.background = "none";
        button.style.border = "none";
        button.style.color = colorThemes[currentTheme].text;

        button.onmouseenter = () => {
            button.style.backgroundColor = colorThemes[currentTheme].topMenuColor;
        }

        button.onmouseleave = () => {
            button.style.background= "none";
        }

        button.onclick = () => {
            openedWindow.minimize();
        }

        this.BUTTON_HOLDER_DIV.appendChild(button);
    }

    /**
     * 
     * @param {lunaWindow} closedWindow 
     */
    closedWindow(closedWindow) {
        document.getElementById(`${closedWindow.windowName}Button`).remove();
    }

    /**
     * @param {string} type
     * @param {string} name 
     * @param {() => any} openFunction 
     */
    appendApplication(type, name, openFunction) {
        if(!type || !name || !openFunction) return false;

        if(!applicationTypes[type]) return false;

        applicationTypes[type][name] = openFunction;
    }
}

let applicationTypes = {
    Development : {

    },

    Games : {

    },

    Graphics : {

    },

    MultiMedia : {

    },

    Network : {

    },

    Office : {

    },

    Other : {

    },
    
    Utilites : {

    }
}