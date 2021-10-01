define(["knockout"], function (ko: KnockoutStatic) {
  // geofs uses deprecated code, so here's a fix:
  const whichToCode = {
    66: "KeyB",
    37: "ArrowLeft",
    39: "ArrowRight",
    32: "Space",
    109: "NumpadSubtract",
    35: "End",
    46: "Delete",
    36: "Home",
    69: "KeyE",
    71: "KeyG",
    107: "NumpadAdd",
    221: "BracketRight",
    88: "KeyX",
    186: "Semicolon",
    34: "PageDown",
    33: "PageUp",
    38: "ArrowUp",
    40: "ArrowDown",
    219: "BracketLeft",
    188: "Comma",
    190: "Period",
    65: "KeyA",
  };

  const _keybinds = ko.observable<Keybinds>({});
  // load the keybinds from local storage
  if (
    !localStorage.getItem("keyboard_mapping_keybinds") ||
    localStorage.getItem("keyboard_mapping_keybinds") == "undefined"
  ) {
    const tmp: { [key: string]: { label: string; keycode: number } } = {
      ...JSON.parse(localStorage.getItem("settings")).keyboard.keys,
    };
    // modify _keybinds for it to be in the correct type:
    for (const label of Object.keys(tmp)) {
      _keybinds({
        ..._keybinds(),
        [label]: {
          altKey: false,
          shiftKey: false,
          ctrlKey: false,
          code: whichToCode[tmp[label].keycode],
        },
      });
    }
    // add the keybinds to the local storage:
    localStorage.setItem(
      "keyboard_mapping_keybinds",
      JSON.stringify(_keybinds)
    );
  } else {
    _keybinds(JSON.parse(localStorage.getItem("keyboard_mapping_keybinds")));
  }
  // @ts-ignore knockout is weird
  const keybinds: KnockoutComputed<Keybinds> = ko.pureComputed({
    read: _keybinds,
    write: (keybinds: Keybinds) => {
      _keybinds(keybinds);
      localStorage.setItem(
        "keyboard_mapping_keybinds",
        JSON.stringify(keybinds)
      );
    },
  });

  return keybinds;
});
