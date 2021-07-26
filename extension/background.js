"use strict";
var options = getCurrentOptions();
function getCurrentOptions() {
    chrome.storage.sync.get("options", function (items) {
        if (items.options) {
            options = items.options;
        }
        else {
            options = {
                ap: false,
                fmc: false
            };
        }
    });
    return;
}
// update cache when storage changes
chrome.storage.onChanged.addListener(function () {
    options = getCurrentOptions();
});
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.needsData) {
        sendResponse({ options: options });
    }
});
