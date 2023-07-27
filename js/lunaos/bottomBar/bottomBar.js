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
 * @typedef {import("../colorThemes")}
 * @typedef {import("../iconThemes")} iconThemes
 */

const BASE_DIV = document.createElement("div");
BASE_DIV.width= window.innerWidth;
BASE_DIV.style.height = "60px";
BASE_DIV.style.width = `${window.innerWidth - 50}px`;
BASE_DIV.style.background = colorThemes[currentTheme].baseDiv;
// baseDiv.style.opacity = "25%";
BASE_DIV.style.backdropFilter = "blur(2px)";
BASE_DIV.style.position = "fixed";
BASE_DIV.style.top = `${window.innerHeight - 65}px`;
BASE_DIV.style.left = `${window.innerWidth - (window.innerWidth / 10) * 9}px`;
BASE_DIV.style.width = `${window.innerWidth - window.innerWidth / 5}px`;
BASE_DIV.style.borderRadius = "20px";
BASE_DIV.id = "bottomBar";

document.body.appendChild(BASE_DIV);


let buttonImages = [];

async function updateCurrentIcons() {
    for(let i  = 0; i < buttonImages.length; i++) {
        if(iconThemes[currentIconTheme][buttonImages[i].imageKey]) {
            buttonImages[i].elem.src = iconThemes[currentIconTheme][buttonImages[i].imageKey];
            buttonImages[i].elem.style.fill = colorThemes[currentTheme].text;
        }
    }
}

function reloadBottomBarColors() {
    BASE_DIV.style.background = colorThemes[currentTheme].baseDiv;
}

class BottomBar {
    buttonX = 10;

    onResize() {
        BASE_DIV.style.width = `${window.innerWidth - 50}px`;
        BASE_DIV.style.top = `${window.innerHeight - 65}px`;
        BASE_DIV.style.left = `${window.innerWidth - (window.innerWidth / 10) * 9}px`;
        BASE_DIV.style.width = `${window.innerWidth - window.innerWidth / 5}px`;
    }


    /**
     * 
     * @param {string} image  
     * @param {string} id
     * @param {Function} callbackFunction 
     */
    appendButton(image, id, callbackFunction) {
        const BUTTON = document.createElement("button");
        const IMAGE_ELEM = document.createElement("img");

        if(image.endsWith(".svg")) {
            IMAGE_ELEM.onload = "SVGInject(this)";
        }

        // button.style.border = "none";
        BUTTON.style.backgroundColor = "rgba(0, 0, 0, 0)";
        BUTTON.style.cursor = "pointer";
        BUTTON.style.position = "absolute";
        BUTTON.style.left = `${this.buttonX}px`;
        BUTTON.style.top = `5px`;
        BUTTON.style.borderRadius = "50%";
        BUTTON.style.borderColor = colorThemes[currentTheme].text;
        
        BUTTON.id = id;
        
        IMAGE_ELEM.src = image;
        
        IMAGE_ELEM.style.borderRadius = "30%";
        IMAGE_ELEM.width = 40;
        IMAGE_ELEM.height = 40;

        this.imageElem = IMAGE_ELEM;

        BUTTON.appendChild(IMAGE_ELEM);

        BUTTON.onclick = callbackFunction;

        BASE_DIV.appendChild(BUTTON);

        this.buttonX += 65;

        buttonImages.push({
            elem : IMAGE_ELEM,
            imageKey: id
        });
    }
}