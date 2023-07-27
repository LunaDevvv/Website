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


let currentTheme = "dark_mode";

if(localStorage.getItem("currentTheme")) {
    currentTheme = localStorage.getItem("currentTheme");
} else {
    localStorage.setItem("currentTheme", currentTheme);
}

let colorThemes = {
    dark_mode: {
        text: "white",
        windowHolder: "rgba(0, 0, 0, 1)",
        titleDiv: "#373837",
        holderDiv: "black",
        contextDiv: "darkSlateGray",
        contextMenuButton: "gray",
        baseDiv: "rgba(9, 95, 97, 0.5)",
        settingsButtons: "#424040",
        selectedSettingsButton: "#292828",
        fileExplorerSearchBar: "#3d3736",
        fileExplorerUnselectedButton: "#3d3736",
        fileExplorerSelectedButton : "#575352"
    },
    light_mode: {
        text: "black",
        windowHolder: "#b8bab9",
        titleDiv: "#bdbdbd",
        holderDiv: "#8f8f8f",
        contextDiv: "#a29fb5",
        contextMenuButton: "#998eed",
        baseDiv: "rgba(122, 122, 122, 0.5)",
        settingsButtons: "#d1d1d1",
        selectedSettingsButton: "#adaaaa",
        fileExplorerSearchBar: "#9c9c9c",
        fileExplorerUnselectedButton: "#9c9c9c",
        fileExplorerSelectedButton : "#757373"
    }
}