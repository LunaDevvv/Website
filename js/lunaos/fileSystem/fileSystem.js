class fileSystem {

    constructor() {
        this.files = {};

        this.init();

        
        
    }
    
    async init() {
        this.createFolder("~/", "lunaOS");
        
        console.log(await this.getFile("/js/lunaos/index.js"));
    }

    /**
     * 
     * @param {string} path 
     * @param {string} name 
     */
    async createFolder(path, name) {
        path += `${name}`;

        path = path.split("/");

        let current_path = path[0];

        if(!this.files[current_path]) {
            this.files[current_path] = {};
        }

        for(let i = 1; i < path.length; i++) {
            current_path = `${current_path}/${path[i]}`;

            if(!this.files[current_path]) {
                this.files[current_path] = {};
            }
            console.log(current_path);
        }
    }


    async getFile(url) {
        let data = await (await fetch(url)).text();

        return data;
    }
}