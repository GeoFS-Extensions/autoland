"use strict";
const emptyButtons = () => {
  return {
    ap: undefined,
    fmc: undefined,
  };
};
// src: modified https://developer.chrome.com/docs/extensions/reference/storage/
const GetStorageSyncData = (name) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([name], (items) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(items);
    });
  });
};
const getOptions = async () => {
  let data;
  await GetStorageSyncData("options").then((val) => {
    data = val.options;
  });
  return data;
};
const setOptions = (options) => {
  chrome.storage.sync.set({ options: options }, () => {});
  return options;
};
const getButtons = () => {
  const buttons = emptyButtons();
  Object.keys(buttons).forEach((key) => {
    buttons[key] = document.querySelector(`#${key}button`);
  });
  return buttons;
};
const UpdateButtons = (buttons, options) => {
  Object.keys(buttons).forEach((key) => {
    if (options[key]) {
      buttons[key].className = "on";
      if (key == "ap") buttons.fmc.style.display = "";
    } else {
      buttons[key].className = "off";
      if (key == "ap") {
        buttons.fmc.style.display = "none";
        options = setOptions({ ap: false, fmc: false });
      }
    }
  });
};
window.onload = async () => {
  const buttons = getButtons();
  let options = await getOptions();
  if (options == undefined) {
    options = setOptions({
      ap: false,
      fmc: false,
    });
  }
  UpdateButtons(buttons, options);
  Object.keys(buttons).forEach((key) => {
    buttons[key].addEventListener("click", () => {
      options = setOptions({ ...options, [key]: !options[key] });
      UpdateButtons(buttons, options);
    });
  });
  chrome.permissions.contains(
    {
      permissions: ["tabs"],
    },
    (result) => {
      if (!result) {
        document.body.innerHTML = "";
        chrome.tabs.create({
          url: chrome.runtime.getURL(
            "ui/needspermissions/needspermissions.html"
          ),
        });
      }
    }
  );
};
