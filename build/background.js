"use strict";
// this is a fix for chrome not allowing modules
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const module = {};
/**
 * Gets data from chrome storage.
 * @param {string} name The name of the data in chrome storage.
 * @returns {options} The data in chrome storage.
 */
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
/**
 * Saves something to chrome storage.
 * @param {any} toWrite A JSON object containing the data to save.
 * @param {string} name The name to save the object to.
 * @returns {any} The object given that was saved to storage.
 */
function writeToStorage(toWrite, name) {
  let toSave;
  if (name == "options") {
    toSave = { options: toWrite };
  } else {
    toSave = { update: toWrite };
  }
  chrome.storage.sync.set(toSave, () => {});
  return toWrite;
}
/**
 * Checks if the given options are valid.
 * @param {options} options The options to check.
 * @returns {boolean} Whether the options are valid (true) or not (false).
 */
function optionsAreValid(options) {
  if (!options.ap && options.fmc) {
    return false;
  }
  return true;
}
/**
 * Reads valid user selected options from memory. If there are no saved options, returns a default and saves the default.
 * @returns {Promise<options>} A promise that resolves to user options.
 */
async function readOptions() {
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
        writeToStorage(data, "options");
      } else {
        // options are valid, keep current options
      }
    } else {
      // there are no prefs saved, set to default and save
      data = {
        ap: false,
        fmc: false,
      };
      writeToStorage(data, "options");
    }
  });
  return data;
}
let options;
(async () => {
  options = await readOptions();
})();
/**
 * Executes a script in the DOM context of a tab.
 * @param {"ap" | "fmc"} type The script to add.
 * @param {number} tabId The ID of the tab to add the script to.
 */
function addScript(type, tabId) {
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
}
// update cache when storage changes
chrome.storage.onChanged.addListener(async () => {
  options = await readOptions();
  // TODO: add and remove scripts without reloading geo (beta 3.1)
});
// add listener when permissions are updated
chrome.permissions.onAdded.addListener(() => {
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
chrome.runtime.onUpdateAvailable.addListener((details) => {
  writeToStorage({ shouldBeUpdated: true, new: details.version }, "update");
});
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("ui/oninstall/oninstall.html"),
    });
  }
  if (details.reason == "update") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("changelog/changelog.html"),
    });
  }
});
module.exports = {};
