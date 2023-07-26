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


let current_icon_theme = "default";

if(localStorage.getItem("current_icon_theme")) {
    current_icon_theme = localStorage.getItem("current_icon_theme");
} else {
    localStorage.setItem("current_icon_theme", current_icon_theme);
}

let icon_themes = {
    default: {
        settings : "/photos/LunaOS/bottomBar/settings.svg",
        terminal : "/photos/LunaOS/bottomBar/terminal.svg",
        file_explorer : "/photos/LunaOS/bottomBar/file_explorer.svg"
    },

    anime : { 
        settings : "/photos/LunaOS/bottomBar/settingsButtonAnime.png",
        terminal: "/photos/LunaOS/bottomBar/terminalAnime.png",
        file_explorer : "/photos/LunaOS/bottomBar/file_explorer.svg"
    },

    old_default: {
        settings : "/photos/LunaOS/bottomBar/settingsButton.png",
        terminal : "/photos/LunaOS/bottomBar/terminal.png",
        file_explorer : "/photos/LunaOS/bottomBar/file_explorer.svg"
    }
}