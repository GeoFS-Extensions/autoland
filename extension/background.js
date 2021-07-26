"use strict";
;
/**
 * Gets the current user settings
 * @returns {options} The user options
 */
function readState() {
    var state;
    chrome.storage.sync.get(["options"], function (item) {
        state = item;
    });
    return state;
}
var options = readState();
/**
 * Add one of the autoland modules
 * @param {string} name The name of the js file, without the .js extension
 */
var addModule = function (name) {
    if (name == "ap") {
        name = "ap++";
    }
    var scriptTag = document.createElement('script');
    scriptTag.src = chrome.runtime.getURL(name + ".js");
    scriptTag.id = name.toUpperCase();
    scriptTag.type = "module";
    scriptTag.classList.add("autoland-extension-scripts");
    scriptTag.onload = function () { scriptTag.remove(); };
    (document.head || document.documentElement).appendChild(scriptTag);
};
// update cache when storage changes
chrome.storage.onChanged.addListener(function () {
    options = readState();
    /* TODO
        we can just get the url of the active tab and see if it's geofs
        and if anything turned from false to true we just add the script, if it turns to false we can refresh */
});
chrome.tabs.onCreated.addListener(function (tab) {
    if (tab.url != "https://www.geo-fs.com/geofs.php") {
        return;
    }
    // the tab is definitely a geo tab
    var keys = Object.keys(options);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (options[key]) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id, allFrames: true },
                // @ts-ignore the red lines are annoying me
                func: function (name) {
                    if (name == "ap") {
                        name = "ap++";
                    }
                    var scriptTag = document.createElement('script');
                    scriptTag.src = chrome.runtime.getURL(name + ".js");
                    scriptTag.id = name.toUpperCase();
                    scriptTag.type = "module";
                    scriptTag.classList.add("autoland-extension-scripts");
                    scriptTag.onload = function () { scriptTag.remove(); };
                    (document.head || document.documentElement).appendChild(scriptTag);
                },
                args: [key]
            });
        }
    }
});
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.needsData) {
        sendResponse({ options: options });
    }
});
