function console_function(command_window) {
    console.log("Running!");
    let replacement_window = document.createElement("iframe");
    
    replacement_window.id = command_window.holder_div.id;
    
    replacement_window.style.width = command_window.holder_div.style.width;
    replacement_window.style.height = command_window.holder_div.style.height;
    replacement_window.style.top = command_window.holder_div.style.top;
    replacement_window.style.left = command_window.holder_div.style.left;
    replacement_window.style.position = command_window.holder_div.style.position;
    
    replacement_window.src = "./terminal.html"
    replacement_window.title = "Command Window";

    replacement_window.style.border = "none";

    replacement_window.style.backgroundColor = command_window.holder_div.style.backgroundColor;
    
    let holder_div = document.getElementById(command_window.holder_div.id.trim());

    holder_div.outerHTML = replacement_window.outerHTML;

    command_window.change_holder_div(holder_div);
}