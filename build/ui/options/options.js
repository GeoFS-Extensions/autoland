"use strict";
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
document.getElementById("devModeSwitch").addEventListener("change", () => {
  // @ts-ignore .checked does exist on this, its just not on the HTMLElement type
  if (document.getElementById("devModeSwitch").checked) {
    chrome.storage.sync.set({ devModeEnabled: true });
  } else {
    chrome.storage.sync.set({ devModeEnabled: false });
  }
});
window.onload = async () => {
  const devModeEnabled = await readStorage("devModeEnabled");
  if (devModeEnabled) {
    // @ts-ignore .checked does exist on this, its just not on the HTMLElement type
    document.getElementById("devModeSwitch").checked = true;
  }
};
