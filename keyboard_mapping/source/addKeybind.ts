import keyDown from "./keyDown";
import keyUp from "./keyUp";
import keybinds from "./keyboardMapping";
import KeybindSet from "./static/keybindSet";
import { callback, Keybind } from "../keyboard_mapping_types";

const addedKeybindsLabels = [];

window.keyboard_mapping.ready = true;

const currentlyPressedKeybinds = new KeybindSet();

/**
 * Add a new keybind.
 * @param {"keyDown" | "keyUp"} type the type of the keybind
 * @param {string} label The name of the keybind.
 * @param {callback} callback The function to execute when the keybind is pressed.
 * @param {Keybind} defaultKeybind The default keybind.
 */
function addKeybind(
  type: "keyUp",
  label: string,
  callback: callback,
  defaultKeybind?: Keybind
): void;
function addKeybind(
  type: "keyDown",
  label: string,
  callback: callback,
  defaultKeybind: Keybind
): void;
function addKeybind(
  type: "keyDown" | "keyUp",
  label: string,
  callback: callback,
  defaultKeybind: Keybind
): void {
  if (
    label !== "" &&
    addedKeybindsLabels.includes(label) &&
    type === "keyDown"
  ) {
    // we already have this keybind in keyDown.
    // notify all subscribers for them to update, and return.
    keybinds.notifySubscribers();
    return;
  }
  // Add the keybind
  if (label !== "" && type === "keyDown") {
    if (!Object.keys(keybinds()).includes(label)) {
      keybinds({ ...keybinds(), [label]: defaultKeybind });
    } else {
      // we will not override the keybind, but it does exist.
      // notify all subscribers for them to update, and add it to keyDown.
      keybinds.notifySubscribers();
    }
    addedKeybindsLabels.push(label);
  }
  if (type === "keyDown") {
    const oldKeyDown = keyDown();
    keyDown((event) => {
      // Detect if the keybind is pressed:
      const keybind = keybinds()[label] || defaultKeybind; // get the active keybind for it (might be different than the default)

      // Add the pressed keybin to the set of pressed keybinds.
      currentlyPressedKeybinds.add({
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        code: event.code,
      });
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
  } else {
    const oldKeyUp = keyUp();
    keyUp((event, releasedKeybinds) => {
      // Remove all the keybinds that are no longer pressed:
      releasedKeybinds =
        releasedKeybinds ||
        currentlyPressedKeybinds.filter((item) => {
          if (event.code.includes("Alt")) {
            return item.altKey === false;
          } else if (event.code.includes("Control")) {
            return item.ctrlKey === false;
          } else if (event.code.includes("Shift")) {
            return item.shiftKey === false;
          } else {
            return item.code !== event.code;
          }
        });
      const keybind = keybinds()[label] || defaultKeybind; // If the label exists it will be the keyup of it. otherwise it will be a standalone keyup.
      if (releasedKeybinds.has(keybind)) {
        // The keybind was released.
        callback(event);
      } else {
        oldKeyUp(event, releasedKeybinds);
      }
    });
  }
}

export default addKeybind;
