"use strict";
document.getElementById("devModeSwitch").addEventListener("change", () => {
  // @ts-ignore .checked does exist on this, its just not on the HTMLElement type
  if (document.getElementById("devModeSwitch").checked) {
    chrome.storage.sync.set({ devModeEnabled: true });
  } else {
    chrome.storage.sync.set({ devModeEnabled: false });
  }
});
