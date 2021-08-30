// this is a fix for chrome not allowing modules
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const module = {};

export = {};

interface PopupState {
  ap: boolean;
  fmc: boolean;
  spoilerarming: boolean;
}

interface Buttons {
  ap: HTMLElement;
  fmc: HTMLElement;
  spoilerarming: HTMLElement;
}

/**
 * Gives a empty version of the buttons.
 * @returns {Buttons} A empty version of the buttons.
 */
function emptyButtons(): Buttons {
  return {
    ap: undefined,
    fmc: undefined,
    spoilerarming: undefined,
  };
}

/**
 * Gets data from chrome storage. Don't call this function, call readStorage instead.
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
 * Reads data from chrome storage.
 * @param {string} name The name of the stored data to read.
 * @returns {Promise<any>} The stored data.
 */
async function readStorage(name: string): Promise<any> {
  let data;
  await getStorageData(name).then((val) => {
    data = val[name];
  });
  return data;
}

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
 * Gets the current state of the buttons on the popup.
 * @returns {Buttons} The current state of the buttons on the popup.
 */
function getButtons(): Buttons {
  const buttons = emptyButtons();
  (Object.keys(buttons) as Array<keyof Buttons>).forEach((key) => {
    buttons[key] = document.querySelector(`#${key}button`);
  });
  return buttons;
}

/**
 * Updates buttons to the local cache of user preferences.
 * @param {Buttons} buttons The HTML elements to update.
 * @param {PopupState} options The preferences to update against.
 */
function updateButtons(buttons: Buttons, options: PopupState) {
  (Object.keys(buttons) as Array<keyof Buttons>).forEach((key) => {
    if (options[key]) {
      buttons[key].className = "on";
      if (key == "ap") buttons.fmc.style.display = "";
    } else {
      buttons[key].className = "off";
      if (key == "ap") {
        buttons.fmc.style.display = "none";
        options = writeToStorage(
          {
            ap: false,
            fmc: false,
            spoilerarming: options.spoilerarming,
          } as PopupState,
          "options"
        );
      }
    }
  });
}

/**
 * The auto-update function. If an update is available (checked by the background script), and can't be installed right now, prompt the user in the popup.
 */
async function checkForUpdate() {
  const update = await readStorage("update");

  if (!update || !update.shouldBeUpdated) {
    // we don't need to update
    return;
  }

  // we need to update
  const newVersion = update.new;

  const tag = document.createElement("p");
  tag.className = "updateNotif";
  tag.innerText = `There is a new version ${newVersion} available!`;

  const button = document.createElement("button");
  button.className = "updateNotif";
  button.innerText = "Update?";
  button.addEventListener("click", () => {
    chrome.runtime.reload();
  });

  document.body.appendChild(tag);
  document.body.appendChild(button);
}

/**
 * Checks if the extension has the needed permissions, and if not, opens the needspermissions page.
 */
function checkPermissions() {
  chrome.permissions.contains(
    {
      permissions: ["tabs"],
    },
    (result) => {
      if (!result) {
        // don't have the needed permissions, open the page to grant permissions
        document.body.innerHTML = "";
        chrome.tabs.create({
          url: chrome.runtime.getURL(
            "ui/needspermissions/needspermissions.html"
          ),
        });
      }
    }
  );
}

let buttons: Buttons, options: PopupState;

window.onload = async () => {
  buttons = getButtons();
  options = await readStorage("options");

  updateButtons(buttons, options);
  (Object.keys(buttons) as Array<keyof Buttons>).forEach((key) => {
    buttons[key].addEventListener("click", () => {
      options = writeToStorage({ ...options, [key]: !options[key] }, "options");
      updateButtons(buttons, options);
    });
  });

  // Check if we have the needed permissions
  checkPermissions();

  // Check if we need to update
  checkForUpdate();
};
