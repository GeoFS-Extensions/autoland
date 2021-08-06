interface PopupState {
  ap: boolean;
  fmc: boolean;
}

interface Buttons {
  ap: HTMLElement;
  fmc: HTMLElement;
}

const emptyButtons = (): Buttons => {
  return {
    ap: undefined,
    fmc: undefined,
  };
};

const GetStorageSyncData = (name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([name], (items) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(items);
    });
  });
};

const getOptions = async (name: string): Promise<any> => {
  let data;
  await GetStorageSyncData(name).then((val) => {
    data = val[name];
  });
  return data;
};

const setOptions = (toWrite: any, name: string): any => {
  let toSave;
  if (name == "options") {
    toSave = { options: toWrite };
  } else {
    toSave = { update: toWrite };
  }
  chrome.storage.sync.set(toSave, () => {});
  return toWrite;
};

const getButtons = (): Buttons => {
  const buttons = emptyButtons();
  (Object.keys(buttons) as Array<keyof Buttons>).forEach((key) => {
    buttons[key] = document.querySelector(`#${key}button`);
  });
  return buttons;
};

const UpdateButtons = (buttons: Buttons, options: PopupState) => {
  (Object.keys(buttons) as Array<keyof Buttons>).forEach((key) => {
    if (options[key]) {
      buttons[key].className = "on";
      if (key == "ap") buttons.fmc.style.display = "";
    } else {
      buttons[key].className = "off";
      if (key == "ap") {
        buttons.fmc.style.display = "none";
        options = setOptions({ ap: false, fmc: false }, "options");
      }
    }
  });
};

const CheckForUpdate = async () => {
  const update = await getOptions("update");

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
};

let buttons, options;

window.onload = async () => {
  buttons = getButtons();
  options = await getOptions("options");
  if (options == undefined) {
    options = setOptions(
      {
        ap: false,
        fmc: false,
      },
      "options"
    );
  }
  console.log(buttons);
  console.log(options);
  UpdateButtons(buttons, options);
  (Object.keys(buttons) as Array<keyof Buttons>).forEach((key) => {
    buttons[key].addEventListener("click", () => {
      options = setOptions({ ...options, [key]: !options[key] }, "options");
      UpdateButtons(buttons, options);
    });
  });

  // CheckPermissions();
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
  CheckForUpdate();
};
