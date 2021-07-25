interface options {
    ap: boolean
    fmc: boolean
}

/**
 * Add one of the autoland modules
 * @param {"ap++" | "fmc"} name The name of the js file, without the .js extension
 */
function addModule(name: "ap++" | "fmc") {
    let s = document.createElement('script');
    s.src = chrome.runtime.getURL(`${name}.js`);
    s.id = name.toUpperCase();
    s.type = "module"; // most important line
    s.classList.add("autoland-extension-scripts");
    s.onload = () => {s.remove()};
    (document.head || document.documentElement).appendChild(s);
}

/**
 * Turn options into commands to run scripts
 * @param {options} options The options to convert to commands
 */
function runScripts(options: options) {
    if (options.ap) {
        addModule("ap++")
        
        if (options.fmc) {
            addModule("fmc")
        }
    }
}

chrome.runtime.sendMessage({
    name: "geoContentScript",
    needsData: true
}, (resp) => {
    runScripts(resp.options)
})