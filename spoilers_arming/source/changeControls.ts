import globalVariables from "./globalVariables";

export default () => {
  // add the spoilers arming to the controls
  controls.spoilersArming = false;
  controls.setters.spoilersArming = {
    label: "Spoiler Arming",
    set: function () {
      if (globalVariables.enabled()) {
        if (!geofs.aircraft.instance.groundContact) {
          controls.spoilersArming = !controls.spoilersArming;
        } else {
          controls.spoilersArming = false;
        }
      }
    },
    unset: function () {
      // this is here only for typescript
    },
  };

  // add the keybind for the spoilers arming
  if (window.keyboard_mapping) {
    const addKeybind = window.keyboard_mapping.require("build/addKeybind").default;
    addKeybind(
      "Spoilers Arming",
      () => {
        if (typeof globalVariables.enabled !== "undefined") {
          globalVariables.enabled(true);
          controls.setters.spoilersArming.set();
        }
      },
      {
        ctrlKey: false,
        shiftKey: true,
        altKey: false,
        code: window.keyboard_mapping.require("build/keyboardMapping").default()[
          "Airbrake toggle (on/off)"
        ].code,
      }
    );
    // Add an event handling the pressing of the airbrakes toggle key
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (
        e.code ==
          window.keyboard_mapping.require("build/keyboardMapping").default()[
            "Spoilers Arming"
          ].code &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.shiftKey
      ) {
        // spoilers will be activated.
        globalVariables.enabled(false);
        controls.spoilersArming = false;
      }
    });
  } else {
    const keydownTrigger = controls.keyDown;
    controls.keyDown = function (event) {
      if (typeof globalVariables.enabled !== "undefined") {
        if (
          event.which ===
          geofs.preferences.keyboard.keys["Airbrake toggle (on/off)"].keycode
        ) {
          if (event.shiftKey) {
            globalVariables.enabled(true);
            controls.setters.spoilersArming.set();
          } else {
            globalVariables.enabled(false);
            controls.spoilersArming = false;
            controls.setters.setAirbrakes.set();
          }
        } else {
          keydownTrigger(event);
        }
      } else {
        keydownTrigger(event);
      }
    };
  }
};
