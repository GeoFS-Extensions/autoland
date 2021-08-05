interface options {
  ap: boolean;
  fmc: boolean;
}

// src: modified https://developer.chrome.com/docs/extensions/reference/storage/
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

async function readState(): Promise<options> {
  let data;
  await getStorageData("options").then((val) => {
    data = val.options;
  });
  return data as options;
}

let options: options = {
  ap: false,
  fmc: false,
};
(async () => {
  options = await readState();
})();

const addScript = (type: string, tabId: number) => {
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
};

// update cache when storage changes
chrome.storage.onChanged.addListener(async () => {
  const newOptions = await readState();
  let tabId;
  const keys = Object.keys(options) as Array<keyof options>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (options[key] !== newOptions[key]) {
      // TODO: make sure this is a geo tab before adding scripts
      if (newOptions[key]) {
        addScript(key, tabId);
      } else {
        // reload
      }
    }
  }
  options = newOptions;
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

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.needsData) {
    sendResponse({ options: options });
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("ui/oninstall/oninstall.html"),
    });
  }
});
