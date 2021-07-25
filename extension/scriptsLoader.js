"use strict";
/**
 * Add one of the autoland modules
 * @param {string} name The name of the js file, without the .js extension
 */
function addAutolandModule(name) {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL("scripts/" + name + ".js");
    s.id = name.toUpperCase();
    s.type = "module"; // most important line
    s.classList.add("autoland-extension-scripts");
    s.onload = function () { s.remove(); };
    (document.head || document.documentElement).appendChild(s);
}
addAutolandModule('ap++');
