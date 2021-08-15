// this is a fix for chrome not allowing modules
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const module = {};

export = {};

interface options {
  ap: boolean;
  fmc: boolean;
}

type scripts = keyof options;

/**
 * Gets data from chrome storage.
 * @param {string} name The name of the data in chrome storage.
 * @returns {options} The data in chrome storage.
 */
function getStorageData(name: string): Promise<any> {
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
function writeToStorage(toWrite: any, name: string): any {
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
function optionsAreValid(options: options): boolean {
  if (!options.ap && options.fmc) {
    return false;
  }
  return true;
}

/**
 * Reads valid user selected options from memory. If there are no saved options, returns a default and saves the default.
 * @returns {Promise<options>} A promise that resolves to user options.
 */
async function readOptions(): Promise<options> {
  let data: options;
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
  return data as options;
}

let options: options;
(async () => {
  options = await readOptions();
})();

/**
 * Executes a script in the DOM context of a tab.
 * @param {scripts} type The script to add.
 * @param {number} tabId The ID of the tab to add the script to.
 */
function addScript(type: scripts, tabId: number) {
  chrome.scripting.executeScript({
    target: { tabId: tabId, allFrames: true },
    func: (name: string): void => {
      switch (name) {
        case "ap":
          name = "autopilot_pp";
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
  const newOptions = await readOptions();

  // add and remove scripts without reloading geo
  const keys = Object.keys(newOptions) as Array<scripts>;
  let reload = false;
  const toLoad: Array<scripts> = [];
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
 * This is only for new tabs. Updates to tabs will be run through the chrome.storage.onChanged listener
 */
function addScriptsListener() {
  chrome.permissions.contains({ permissions: ["tabs"] }, (result) => {
    if (result) {
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tab.url != "https://www.geo-fs.com/geofs.php") {
          return;
        }
        // the tab is definitely a geo tab

        const keys = Object.keys(options) as Array<scripts>;
        keys.sort();
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
  if (details.reason == "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("ui/oninstall/oninstall.html"),
    });
  }

  if (details.reason == "update") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("changelog/changelog.html"),
    });
    writeToStorage({ shouldBeUpdated: false }, "update");
  }
});
