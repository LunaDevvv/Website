const urlParams = new URLSearchParams(window.location.search);

let webpage = urlParams.get("url");

if(!webpage.startsWith("https://") && !webpage.startsWith("http://") && !webpage.startsWith("wss://")) {
    webpage = "https://" + webpage;
}


let mainFrame = document.createElement("iframe");

document.body.style.height = "100%";
document.body.appendChild(mainFrame);
document.body.style.margin = "0";
document.body.style.padding = "0";


mainFrame.src = "https://corsproxy.shirodev.dev/?" + webpage;
mainFrame.style.width = "99.4%";
mainFrame.style.height = "98.4vh";
mainFrame.style.position = "static";
mainFrame.style.left = "0px";
mainFrame.style.top = "0px";


updateHrefs();

async function updateHrefs() {
    await sleep(5000);
    console.log(mainFrame.contentWindow.document.body);
    let elements = mainFrame.contentWindow.document.querySelectorAll("a");

   for(let i = 0; i < elements.length; i++) {
        elements[i].onclick = (e) => {
            e.preventDefault();

            return false;
        }
   } 
}