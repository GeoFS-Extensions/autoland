"use strict";
// this is a fix for chrome not allowing modules
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const module = {};
/**
 * Gives a empty version of the buttons.
 * @returns {Buttons} A empty version of the buttons.
 */
function emptyButtons() {
  return {
    ap: undefined,
    fmc: undefined,
  };
}
/**
 * Gets data from chrome storage. Don't call this function, call readStorage instead.
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
 * Reads data from chrome storage.
 * @param {string} name The name of the stored data to read.
 * @returns {Promise<any>} The stored data.
 */
async function readStorage(name) {
  let data;
  await getStorageData(name).then((val) => {
    data = val[name];
  });
  return data;
}
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
 * Gets the current state of the buttons on the popup.
 * @returns {Buttons} The current state of the buttons on the popup.
 */
function getButtons() {
  const buttons = emptyButtons();
  Object.keys(buttons).forEach((key) => {
    buttons[key] = document.querySelector(`#${key}button`);
  });
  return buttons;
}
/**
 * Updates buttons to the local cache of user preferences.
 * @param {Buttons} buttons The HTML elements to update.
 * @param {PopupState} options The preferences to update against.
 */
function updateButtons(buttons, options) {
  Object.keys(buttons).forEach((key) => {
    if (options[key]) {
      buttons[key].className = "on";
      if (key == "ap") buttons.fmc.style.display = "";
    } else {
      buttons[key].className = "off";
      if (key == "ap") {
        buttons.fmc.style.display = "none";
        options = writeToStorage({ ap: false, fmc: false }, "options");
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
let buttons, options;
window.onload = async () => {
  buttons = getButtons();
  options = await readStorage("options");
  if (options == undefined) {
    options = writeToStorage(
      {
        ap: false,
        fmc: false,
      },
      "options"
    );
  }
  updateButtons(buttons, options);
  Object.keys(buttons).forEach((key) => {
    buttons[key].addEventListener("click", () => {
      options = writeToStorage({ ...options, [key]: !options[key] }, "options");
      updateButtons(buttons, options);
    });
  });
  // TODO: make a checkPermissions() function to simplify this
  // Check if we have the needed permissions
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
  checkForUpdate();
};
module.exports = {};
