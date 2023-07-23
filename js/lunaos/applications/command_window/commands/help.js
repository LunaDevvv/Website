/**
 * 
 * @typedef {import("../classes/terminal")} terminal
 * 
 * @param {terminal} Terminal 
 */

function help_command(Terminal) {
    new Line("Current Commands : ", Terminal, {
        speed : 20
    });

    new Line("help : sends information on the commands", Terminal, { 
        speed : 10
    });

    new Line("clear: clears the console", Terminal, { 
        speed : 10
    });

    new Line("header : shows the header when from when you open.", Terminal, {
        speed : 10
    })
    
    new Line("developer : Sends info on me, LunaDev, the only developer", Terminal, {
        speed : 10
    })
}