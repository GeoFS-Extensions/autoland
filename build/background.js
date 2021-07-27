"use strict";
;
// src: modified https://developer.chrome.com/docs/extensions/reference/storage/
function getStorageData(name) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([name], (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
}
async function readState() {
    let data;
    await getStorageData('options').then(val => {
        data = val.options;
    });
    return data;
}
var options = {
    ap: false,
    fmc: false
};
(async function () {
    options = await readState();
})();
// update cache when storage changes
chrome.storage.onChanged.addListener(async () => {
    options = await readState();
    /* TODO
        we can just get the url of the active tab and see if it's geofs
        and if anything turned from false to true we just add the script, if it turns to false we can refresh */
});
chrome.tabs.onCreated.addListener((tab) => {
    if (tab.url != "https://www.geo-fs.com/geofs.php") {
        return;
    }
    // the tab is definitely a geo tab
    let keys = Object.keys(options);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (options[key]) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id, allFrames: true },
                // @ts-ignore because @types/chrome is probably not updated to manifest v3
                func: (args) => {
                    let name = args[0];
                    switch (name) {
                        case 'ap':
                            name = 'ap++';
                            break;
                    }
                    let scriptTag = document.createElement('script');
                    scriptTag.src = chrome.runtime.getURL(`${name}.js`);
                    scriptTag.type = 'module';
                    scriptTag.onload = () => { scriptTag.remove(); };
                    (document.head || document.documentElement).appendChild(scriptTag);
                },
                args: [key]
            });
        }
    }
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.needsData) {
        sendResponse({ options: options });
    }
});
