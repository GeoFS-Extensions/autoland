import keyDown from "./keyDown";
import keybinds from "./keyboardMapping";
import { callback, Keybind } from "../keyboard_mapping_types";

const addedKeybindsLabels = [];

window.keyboard_mapping.ready = true;

/**
 * Add a new keybind.
 * @param {string} label The name of the keybind.
 * @param {callback} callback The function to execute when the keybind is pressed.
 * @param {Keybind} defaultKeybind The default keybind.
 */
export default function (
  label: string,
  callback: callback,
  defaultKeybind: Keybind
) {
  if (label !== "" && addedKeybindsLabels.includes(label)) {
    // we already have this keybind.
    // notify all subscribers for them to update, and return.
    keybinds.notifySubscribers();
    return;
  }
  // Add the keybind
  if (label !== "") {
    keybinds({ ...keybinds(), [label]: defaultKeybind });
    addedKeybindsLabels.push(label);
  }

  const oldKeyDown = keyDown();
  keyDown((event) => {
    // Detect if the keybind is pressed:
    const keybind = keybinds()[label] || defaultKeybind; // get the active keybind for it (might be different than the default)

    if (keybind.code === "" || event.code === keybind.code) {
      if (
        event.altKey === keybind.altKey &&
        event.ctrlKey === keybind.ctrlKey &&
        event.shiftKey === keybind.shiftKey
      ) {
        callback(event);
        // geofs uses a special variable to detect if the control key is pressed (for some reason).
        // we need to call oldKeyDown even if the control key is pressed and that variable is set (addDefaultKeybind:306)
        if (
          keybind.code === "" &&
          event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          oldKeyDown(event);
        }
      } else {
        oldKeyDown(event);
      }
    } else {
      oldKeyDown(event);
    }
  });
}
