export default {};

interface HtmlSwitch extends HTMLElement {
  checked: boolean;
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

document.getElementById("devModeSwitch").addEventListener("change", () => {
  if ((document.getElementById("devModeSwitch") as HtmlSwitch).checked) {
    chrome.storage.sync.set({ devModeEnabled: true });
  } else {
    chrome.storage.sync.set({ devModeEnabled: false });
  }
});

window.onload = async () => {
  const devModeEnabled: boolean = await readStorage("devModeEnabled");
  if (devModeEnabled) {
    (document.getElementById("devModeSwitch") as HtmlSwitch).checked = true;
  }
};
