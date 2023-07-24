/**
 * @typedef {import("../color_themes")}
 * @typedef {import("../icon_themes")} icon_themes
 */

const baseDiv = document.createElement("div");
baseDiv.width= window.innerWidth;
baseDiv.style.height = "50px";
baseDiv.style.width = `${window.innerWidth - 50}px`;
baseDiv.style.background = color_themes[current_theme].base_div;
// baseDiv.style.opacity = "25%";
baseDiv.style.backdropFilter = "blur(2px)";
baseDiv.style.position = "fixed";
baseDiv.style.top = `${window.innerHeight - 65}px`;
baseDiv.style.left = `${window.innerWidth - (window.innerWidth / 10) * 9}px`;
baseDiv.style.width = `${window.innerWidth - window.innerWidth / 5}px`;
baseDiv.style.borderRadius = "20px";
baseDiv.id = "bottomBar";

document.body.appendChild(baseDiv);


let button_images = [];

async function updateIcons() {
    for(let i  = 0; i < button_images.length; i++) {
        if(icon_themes[current_icon_theme][button_images[i].image_key]) {
            button_images[i].elem.src = icon_themes[current_icon_theme][button_images[i].image_key];
        }
    }
}

function reloadBottomBarColors() {
    baseDiv.style.background = color_themes[current_theme].base_div;
}

class BottomBar {
    button_x = 10;

    onResize() {
        baseDiv.style.width = `${window.innerWidth - 50}px`;
        baseDiv.style.top = `${window.innerHeight - 65}px`;
        baseDiv.style.left = `${window.innerWidth - (window.innerWidth / 10) * 9}px`;
        baseDiv.style.width = `${window.innerWidth - window.innerWidth / 5}px`;
    }


    /**
     * 
     * @param {string} image  
     * @param {string} id
     * @param {Function} callbackFunction 
     */
    appendButton(image, id, callbackFunction) {
        const button = document.createElement("button");
        const imageElem = document.createElement("img");

        button.style.border = "none";
        button.style.background = "none";
        button.style.cursor = "pointer";
        button.style.position = "absolute";
        button.style.left = `${this.button_x}px`;
        button.style.top = `5px`;
        
        button.id = id;

        imageElem.src = image;
        
        imageElem.style.borderRadius = "30%";
        imageElem.width = 40;
        imageElem.height = 40;
        
        this.imageElem = imageElem;

        button.appendChild(imageElem);

        button.onclick = callbackFunction;

        baseDiv.appendChild(button);

        this.button_x += 55;

        button_images.push({
            elem : imageElem,
            image_key: id
        });
    }
}