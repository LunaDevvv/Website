/**
 * 
 * @typedef {import("../classes/terminal")} terminal
 * 
 * @param {terminal} Terminal 
 */

async function developer_command(Terminal) {
    new Line("[LunaDev]:", Terminal, {
        speed : 20
    });

    new Line("Hello, I'm LunaDev! (Used to be ShiroDev)", Terminal, {
        speed : 15
    });

    new Line("I'm currently in highschool, and have been programming since 2019.", Terminal, {
        speed : 15
    });

    new Line("I currently have worked alot of small projects, but some large ones.", Terminal, {
        speed : 15
    });

    new Line("Most of the time if you see me anywhere, it will be doing backend, since I have problems making frontend stuff.", Terminal, {
        speed : 15
    });
}