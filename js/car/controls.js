class Controls {
    // Creating a constructor with the variables for movement.
    constructor(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        // Checking the type for whether or not it needs the keep track of the keyboard
        switch (type) {
            case true:
                this.#addKeyboardListeners();
                break;
            case false:
                this.forward = true;
                break;
        }
    }

    // Adding the keyboard listener for when we press a a key.
    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        };

        // If a key is pressed, change key things.
        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        };
    }
}
