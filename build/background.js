"use strict";
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
function writeOptions(options) {
  chrome.storage.sync.set({ options: options }, () => {});
  return options;
}
function optionsAreValid(options) {
  if (!options.ap && options.fmc) {
    return false;
  }
  return true;
}
async function readState() {
  let data;
  await getStorageData("options").then((storage) => {
    if (storage.options) {
      // there are prefs saved, test them
      data = storage.options;
      if (!optionsAreValid(data)) {
        // options aren't valid, set to default and save
        data = {
          ap: false,
          fmc: false,
        };
        writeOptions(data);
      } else {
        // options are valid, keep current options
      }
    } else {
      // there are no prefs saved, set to default and save
      data = {
        ap: false,
        fmc: false,
      };
      writeOptions(data);
    }
  });
  return data;
}
let options;
(async () => {
  options = await readState();
})();
const addScript = (type, tabId) => {
  chrome.scripting.executeScript({
    target: { tabId: tabId, allFrames: true },
    func: (name) => {
      switch (name) {
        case "ap":
          name = "ap++";
          break;
      }
      const scriptTag = document.createElement("script");
      scriptTag.src = chrome.runtime.getURL(`scripts/${name}.js`);
      scriptTag.type = "module";
      scriptTag.onload = () => {
        scriptTag.remove();
      };
      (document.head || document.documentElement).appendChild(scriptTag);
    },
    args: [type],
  });
};
// update cache when storage changes
chrome.storage.onChanged.addListener(async () => {
  options = await readState();
  // TODO: add and remove scripts without reloading geo
});
// add listener when permissions are updated
chrome.permissions.onAdded.addListener(() => {
  console.log("hi");
  chrome.permissions.contains({ permissions: ["tabs"] }, (result) => {
    if (result) {
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tab.url != "https://www.geo-fs.com/geofs.php") {
          return;
        }
        // the tab is definitely a geo tab
        const keys = Object.keys(options);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (options[key]) {
            addScript(key, tabId);
          }
        }
      });
    }
  });
});
chrome.permissions.contains({ permissions: ["tabs"] }, (result) => {
  if (result) {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (tab.url != "https://www.geo-fs.com/geofs.php") {
        return;
      }
      // the tab is definitely a geo tab
      const keys = Object.keys(options);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (options[key]) {
          addScript(key, tabId);
        }
      }
    });
  }
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.needsData) {
    sendResponse({ options: options });
  }
  if (msg.hasTabsPermission) {
    chrome.permissions.contains({ permissions: ["tabs"] }, (result) => {
      sendResponse(result);
    });
    return true;
  }
});
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("ui/oninstall/oninstall.html"),
    });
  }
});
