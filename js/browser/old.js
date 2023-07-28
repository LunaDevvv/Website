editSrcAttributes();
editHrefAttributes();
updateHrefs();

document.body.firstChild.remove();

document.body.appendChild(dummyElement);

function updateHrefs() {
    for(let i = 0; i < dummyElement.getElementsByTagName("a").length; i++) {
        let thisElem = dummyElement.getElementsByTagName("a")[i];

        if(thisElem.href.includes(window.location.hostname)) {
            thisElem.href = thisElem.href.replace(window.location.protocol + "//" + window.location.hostname, baseWebpage);
        }  
        thisElem.onclick =  async (ev) => {
            ev.preventDefault();

            const iframe = document.createElement("iframe");
            iframe.src = `https://corsproxy.shirodev.dev/?${thisElem.href}`;

            iframe.hidden = true;
            document.body.appendChild(iframe);

            await sleep(500);


            console.log(iframe.contentWindow.document.body);


            console.log(text);

            dummyElement.innerHTML = iframe.contentWindow.document.body.innerHTML;
            updateHrefs();
            return false;
        };
    }
}