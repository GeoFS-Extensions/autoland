import keybinds from "../keyboardMapping";
import keyboardLayout from "../static/keyboardLayout";
import { Keybind, Keybinds } from "../../keyboard_mapping_types";

export default class ViewModel {
  private readonly keysContainer: JQuery<HTMLElement> = $(
    ".geofs-keyboard-keys-container"
  );

  constructor() {
    $('[data-toggle-panel=".geofs-preference-list"]').trigger("click"); // needs to click on the options panel before reseting.
    this.reset();

    // Add the event listeners dinamically, so that new elements will still have listeners
    this.keysContainer.on(
      "click focus",
      ".keyboard-mapping-key-detect",
      this.handleFocus
    );
    this.keysContainer.on(
      "keydown",
      ".keyboard-mapping-key-detect",
      this.handleKeyDown
    );
    this.keysContainer.on(
      "blur",
      ".keyboard-mapping-key-detect",
      this.handleBlur
    );
    // every time keybinds observable changes, change the value of the keybind input
    keybinds.subscribe(this.updateKeybindInputs);
    // initialize all the keybind inputs:
    this.updateKeybindInputs(keybinds());
  }

  /**
   * Removes all of the elements from the keys container
   */
  reset = () => {
    this.keysContainer.empty();
  };

  /**
   * Returns the string representation of a keybind
   * @param {Keybind} keybind the keybind to convert
   * @returns {string} the string representation of a keybind
   */
  stringFromKeybind = (keybind: Keybind): string => {
    let str = "";
    if (keybind.ctrlKey) str += "CTRL + ";
    if (keybind.shiftKey) str += "SHIFT + ";
    if (keybind.altKey) str += "ALT + ";
    str +=
      keybind.code.includes("Control") ||
      keybind.code.includes("Shift") ||
      keybind.code.includes("Alt")
        ? ""
        : keyboardLayout[keybind.code] || keybind.code;
    return str;
  };

  /**
   * Adds a new keybind input
   * @param {string} key The key of the keybind in the keybinds observable (used as label)
   */
  addKeybind = (key: string) => {
    this.keysContainer.append(`
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-upgraded" data-upgraded=",MaterialTextfield">
              <input class="keyboard-mapping-key-detect mdl-textfield__input" type="text" name="${key}" />
              <label class="mdl-textfield__label" for="${key}">${key}</label>
          </div>
    `);
  };

  /**
   * Add keybind inputs if necessary and update the values
   * @param {Keybinds} newKeybinds the current keybinds
   */
  updateKeybindInputs = (newKeybinds: Keybinds) => {
    for (const key of Object.keys(newKeybinds)) {
      if ($(`.keyboard-mapping-key-detect[name="${key}"]`).length == 0) {
        // If this runs, a new keybind has been added, but the input for it doesn't exist yet.
        // so, let's create it:
        if (!spoilers_arming && key === "Spoilers Arming") {
          // spoilers arming is not activated currently.
          continue;
        }
        this.addKeybind(key);
      }
      // set the value of the element to the keybind
      $(`.keyboard-mapping-key-detect[name="${key}"]`).val(
        this.stringFromKeybind(newKeybinds[key])
      );

      if (!this.stringFromKeybind(newKeybinds[key]).endsWith(" + ")) {
        $(`.keyboard-mapping-key-detect[name="${key}"]`).data(
          "originalValue",
          this.stringFromKeybind(newKeybinds[key])
        );
      }
    }
  };

  /**
   * Handles keypresses on the keybind input fields
   * @param e The fired event
   */
  handleKeyDown = (
    e: JQuery.KeyDownEvent<HTMLElement, undefined, any, any>
  ) => {
    if ($(e.target).hasClass("keyboard-mapping-key-detecting")) {
      e.preventDefault();
      e.stopPropagation();

      if (e.code !== "Escape") {
        // escape will blur the keybind input
        keybinds({
          ...keybinds(),
          [$(e.target).attr("name")]: {
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            code: e.code,
          },
        });
      }
      // only blur the keybind input if we don't wait for another key (keybinds must have one key other than ctrl, shift and alt)
      if (
        !(
          e.code.includes("Control") ||
          e.code.includes("Shift") ||
          e.code.includes("Alt")
        )
      ) {
        $(e.target).trigger("blur");
      }
    }
  };

  /**
   * Handles focus of the keybind input field
   * @param e The fired event
   */
  handleFocus = (
    e: JQuery.TriggeredEvent<HTMLElement, undefined, any, any>
  ) => {
    $(".keyboard-mapping-key-detecting", this.keysContainer).each(
      (index, element) => {
        $(element).val($(element).data("originalValue")); // put the last keybind back
        $(element).removeClass("keyboard-mapping-key-detecting");
      }
    );
    // remember the current value
    $(e.target).data("originalValue", $(e.target).val());
    // remove everything from the input:
    $(e.target).val("");
    $(e.target).addClass("keyboard-mapping-key-detecting");
  };

  /**
   * Handles the blur of the keybind input field
   * @param e The fired event
   */
  handleBlur = (e: JQuery.BlurEvent<HTMLElement, undefined, any, any>) => {
    if ($(e.target).hasClass("keyboard-mapping-key-detecting")) {
      if (
        $(e.target).val() === "" ||
        $(e.target).val().toString().endsWith(" + ")
      ) {
        // the keybind input is empty or it is not finished (no key other than ctrl, shift or alt has been pressed)
        $(e.target).val($(e.target).data("originalValue"));
      }
      $(e.target).removeClass("keyboard-mapping-key-detecting");
      e.stopPropagation();
      e.preventDefault();
    }
  };
}
