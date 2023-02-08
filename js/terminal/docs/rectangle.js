function rectangle(text) {


    const args = text.split(" ");

    switch (args[2]) {
        case "x":
            new Line(`Argument : x`, "color : orange", 10);
            new Line(`X position to draw the rectangle`, "color : blue", 10);
            break;

        case "y":
            new Line(`Argument : y`, "color : orange", 10);
            new Line(`Y position to draw the rectangle`, "color : blue", 10);
            break;

        default:
            new Line(`Creates a rectangle, automatically dealing with gravity and collision if told to.`, "color : green", 10);
            new Line(`Arguments : x : number, y : number, width : number, height : number, color : string, collision : bool, gravity : bool`, "color : orange", 5);
            break;
    }
}