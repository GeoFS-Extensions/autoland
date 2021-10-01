define(["globalVariables"], function (globalVariables) {
  return () => {
    // add the spoilers arming to the controls
    window.controls.spoilersArming = false;
    window.controls.setters.spoilersArming = {
      label: "Spoiler Arming",
      set: function () {
        if (globalVariables.enabled()) {
          if (!window.geofs.aircraft.instance.groundContact) {
            window.controls.spoilersArming = !window.controls.spoilersArming;
          } else {
            window.controls.spoilersArming = false;
          }
        }
      },
      unset: function () {
        // this is here only for typescript
      },
    };

    // add the keybind for the spoilers arming
    if (window.keyboard_mapping) {
      const addKeybind = window.keyboard_mapping.require("addKeybind");
      addKeybind(
        "Spoilers Arming",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (event: KeyboardEvent) => {
          if (typeof globalVariables.enabled !== "undefined") {
            globalVariables.enabled(true);
            window.controls.setters.spoilersArming.set();
          }
        },
        {
          ctrlKey: false,
          shiftKey: true,
          altKey: false,
          code: window.keyboard_mapping.require("keyboardMapping")()[
            "Airbrake toggle (on/off)"
          ].code,
        }
      );
      // Add an event handling the pressing of the airbrakes toggle key
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (
          e.code ==
            window.keyboard_mapping.require("keyboardMapping")()[
              "Spoilers Arming"
            ].code &&
          !e.ctrlKey &&
          !e.altKey &&
          !e.shiftKey
        ) {
          // spoilers will be activated.
          globalVariables.enabled(false);
          window.controls.spoilersArming = false;
        }
      });
    } else {
      var keydownTrigger = window.controls.keyDown;
      window.controls.keyDown = function (event) {
        if (typeof globalVariables.enabled !== "undefined") {
          if (
            event.which ===
            window.geofs.preferences.keyboard.keys["Airbrake toggle (on/off)"]
              .keycode
          ) {
            if (event.shiftKey) {
              globalVariables.enabled(true);
              window.controls.setters.spoilersArming.set();
            } else {
              globalVariables.enabled(false);
              window.controls.spoilersArming = false;
              window.controls.setters.setAirbrakes.set();
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
});
