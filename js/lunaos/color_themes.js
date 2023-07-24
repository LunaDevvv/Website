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


let current_theme = "dark_mode";

let color_themes = {
    dark_mode: {
        text: "white",
        window_holder: "rgba(0, 0, 0, 1)",
        title_div: "#373837",
        holder_div: "black",
        context_div: "darkSlateGray",
        context_menu_button: "gray",
        base_div: "rgba(9, 95, 97, 0.5)",
        settingsButtons: "#424040",
        selectedSettingsButton: "#292828"
    },
    light_mode: {
        text: "black",
        window_holder: "#b8bab9",
        title_div: "#bdbdbd",
        holder_div: "#8f8f8f",
        context_div: "#a29fb5",
        context_menu_button: "#998eed",
        base_div: "rgba(122, 122, 122, 0.5)",
        settingsButtons: "#d1d1d1",
        selectedSettingsButton: "#adaaaa"
    }
}