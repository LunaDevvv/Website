const baseDiv = document.createElement("div");
baseDiv.width= window.innerWidth;
baseDiv.style.height = "50px";
baseDiv.style.width = `${window.innerWidth - 50}px`;
baseDiv.style.background = "rgba(9, 95, 97, 0.5)";
// baseDiv.style.opacity = "25%";
baseDiv.style.backdropFilter = "blur(2px)";
baseDiv.style.position = "fixed";
baseDiv.style.top = `${window.innerHeight - 65}px`;
baseDiv.style.left = `${window.innerWidth - (window.innerWidth / 10) * 9}px`;
baseDiv.style.width = `${window.innerWidth - window.innerWidth / 5}px`;
baseDiv.style.borderRadius = "20px";
baseDiv.id = "bottomBar";

document.body.appendChild(baseDiv);

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
     * @param {Function} callbackFunction 
     */
    appendButton(image, callbackFunction) {
        const button = document.createElement("button");
        const imageElem = document.createElement("img");

        button.style.border = "none";
        button.style.background = "none";
        button.style.cursor = "pointer";
        button.style.position = "absolute";
        button.style.left = `${this.button_x}px`;
        button.style.top = `5px`;

        imageElem.src = image;
        
        imageElem.style.borderRadius = "30%";
        imageElem.width = 40;
        imageElem.height = 40;

        button.appendChild(imageElem);

        button.onclick = callbackFunction;

        baseDiv.appendChild(button);

        this.button_x += 55;
    }
}