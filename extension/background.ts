/** @internal */
export = {};

/**
 * User selected options. Used as a dropoff variable.
 */
interface options {
  ap: boolean;
  fmc: boolean;
}

/**
 * Gets data from chrome storage.
 * @param {string} name name of the data in chrome storage
 * @returns {options} data in chrome storage
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
 * @param {any} toWrite a JSON object containing the data to save
 * @param {string} name the name to save the object to
 * @returns {any} the object given that was saved to storage
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
 * Checks if the given options are valid
 * @param {options} options the options to check
 * @returns {boolean} whether the options are valid (true) or not (false)
 */
function optionsAreValid(options: options): boolean {
  if (!options.ap && options.fmc) {
    return false;
  }
  return true;
}

/**
 * Reads valid user selected options from memory. If there are no saved options, returns a default and saves the default.
 * @returns {Promise<options>} a promise that resolves to user options
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
 * @param {"ap" | "fmc"} type The script to add.
 * @param {number} tabId The ID of the tab to add the script to.
 */
function addScript(type: "ap" | "fmc", tabId: number) {
  chrome.scripting.executeScript({
    target: { tabId: tabId, allFrames: true },
    func: (name: string): void => {
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

        const keys = Object.keys(options) as Array<keyof options>;
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

      const keys = Object.keys(options) as Array<keyof options>;
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

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
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
