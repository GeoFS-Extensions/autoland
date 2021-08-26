"use strict";
// this is a fix for chrome not allowing modules
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const module = {};
let devModeEnabled = false;
/**
 * Gets data from chrome storage.
 * @param {string} name The name of the data in chrome storage.
 * @returns {any} The data in chrome storage.
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
 * @returns The object given that was saved to storage.
 */
function writeToStorage(toWrite, name) {
  const toSave = {};
  // @ts-ignore i dont understand why ts doesnt like this code
  toSave[name] = toWrite;
  chrome.storage.sync.set(toSave);
  return toWrite;
}
/**
 * Checks if the given options are valid.
 * @param {options} options The options to check.
 * @returns {options} A valid version of the options (or the current options if they are valid).
 */
function optionsAreValid(toCheck) {
  // FMC can't be on when AP++ is off
  if (!toCheck.ap && toCheck.fmc) {
    toCheck.fmc = false;
  }
  // keyboard mapping can't be on if developer mode is off
  if (!devModeEnabled && toCheck.keyboardmapping) {
    toCheck.keyboardmapping = false;
  }
  return toCheck;
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
      data = optionsAreValid(storage.options);
    } else {
      // there are no prefs saved, set to default and save
      data = {
        ap: false,
        fmc: false,
        spoilerarming: false,
        keyboardmapping: false,
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
 * @param {scripts} type The script to add.
 * @param {number} tabId The ID of the tab to add the script to.
 */
function addScript(type, tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId, allFrames: true },
    func: (name) => {
      switch (name) {
        case "ap":
          name = "autopilot_pp";
          break;
        case "spoilerarming":
          name = "spoilers_arming";
          break;
        case "keyboardmapping":
          name = "keyboard_mapping";
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
chrome.storage.onChanged.addListener(async (changes) => {
  if (changes["devModeEnabled"]) {
    if (changes["devModeEnabled"].newValue == false) {
      options = optionsAreValid(options);
      writeToStorage(options, "options");
    }
    devModeEnabled = changes["devModeEnabled"].newValue;
    return;
  }
  const newOptions = await readOptions();
  // add and remove scripts without reloading geo
  const keys = Object.keys(newOptions);
  let reload = false;
  const toLoad = [];
  for (const key of keys) {
    if (newOptions[key] !== options[key]) {
      if (newOptions[key]) toLoad.push(key);
      else reload = true;
    }
  }
  chrome.permissions.contains({ permissions: ["tabs"] }, async (result) => {
    if (result) {
      const [tab] = await chrome.tabs.query({
        currentWindow: true,
        url: "https://www.geo-fs.com/geofs.php",
      });
      if (!tab) {
        return;
      }
      if (reload) {
        options = newOptions;
        chrome.tabs.reload(tab.id);
      } else {
        toLoad.sort();
        for (const key of toLoad) {
          addScript(key, tab.id);
        }
      }
    }
  });
});
/**
 * Adds the needed scripts listeners. Checks to make sure the extension has the tabs permission before adding the listener.
 * This is only for new tabs. Updates to tabs should be run through the chrome.storage.onChanged listener.
 */
function addScriptsListener() {
  chrome.permissions.contains({ permissions: ["tabs"] }, (result) => {
    if (result) {
      chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
        if (tab.url != "https://www.geo-fs.com/geofs.php") {
          return;
        }
        // the tab is definitely a geo tab
        const keys = Object.keys(options).sort();
        for (const key of keys) {
          if (options[key]) {
            addScript(key, tabId);
          }
        }
      });
    }
  });
}
// add listener when permissions are updated
chrome.permissions.onAdded.addListener(() => {
  addScriptsListener();
});
addScriptsListener();
chrome.runtime.onUpdateAvailable.addListener((details) => {
  writeToStorage({ shouldBeUpdated: true, new: details.version }, "update");
});
chrome.runtime.onInstalled.addListener((details) => {
  writeToStorage({ shouldBeUpdated: false }, "update");
  if (details.reason == "install") {
    writeToStorage(
      { ap: false, fmc: false, spoilerarming: false, keyboardmapping: false },
      "options"
    );
    writeToStorage(false, "devModeEnabled");
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
