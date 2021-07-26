"use strict";
var ap = false;
var fmc = false;
var buttons;
var options;
function flipBool(toFlip) {
    if (toFlip == "ap") {
        ap = !ap;
        if (ap && fmc) {
            flipBool("fmc");
        }
    }
    else {
        fmc = !fmc;
    }
}
function askBackgroundScriptForOptions() {
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({
            needsData: true
        }, function (resp) {
            resolve(resp.options);
        });
    });
}
function writeStateToMemory(state) {
    chrome.storage.sync.set({ options: state }, function () { });
    return state;
}
function getCurrentButtonState() {
    return {
        ap: document.getElementById("apbutton"),
        fmc: document.getElementById("fmcbutton")
    };
}
function getCurrentPopupState() {
    return {
        ap: ap,
        fmc: fmc
    };
}
function hideOrShowFMCButton(show, button) {
    if (show) {
        button.style.display = "";
    }
    else {
        button.style.display = "none";
    }
}
function updateButtons(buttons, bools) {
    if (bools.ap) {
        buttons.ap.className = "running";
        hideOrShowFMCButton(true, buttons.fmc);
    }
    else {
        buttons.ap.className = "button";
        hideOrShowFMCButton(false, buttons.fmc);
    }
    if (bools.fmc) {
        buttons.fmc.className = "running";
    }
    else {
        buttons.fmc.className = "button";
    }
    return getCurrentButtonState();
}
window.onload = function () {
    askBackgroundScriptForOptions().then(function (param) {
        console.log(param);
        options = param;
    });
    buttons = getCurrentButtonState();
    console.log(options);
    console.log(buttons);
    updateButtons(buttons, options);
    buttons.ap.addEventListener("click", function () {
        flipBool("ap");
        options = getCurrentPopupState();
        updateButtons(buttons, options);
        writeStateToMemory(options);
    });
    buttons.fmc.addEventListener("click", function () {
        flipBool("fmc");
        options = getCurrentPopupState();
        updateButtons(buttons, options);
        writeStateToMemory(options);
    });
};
