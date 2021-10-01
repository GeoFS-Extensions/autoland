define([
  "globalVariables",
  "removeEvents",
  "changeControls",
  "changeInstruments",
], function (
  globalVariables: { [key: string]: ko.Observable },
  removeEvents: () => void,
  changeControls: () => void,
  changeInstruments: () => void
) {
  removeEvents();
  changeControls();
  changeInstruments();
  const spoilersArming = () => {
    window.geofs.aircraft.instance.animationValue.spoilersArmed =
      window.controls.spoilersArming; // update the animation
    if (window.controls.spoilersArming) {
      if (window.geofs.aircraft.instance.groundContact) {
        if (
          window.controls.airbrakes.position === 0 &&
          globalVariables.enabled()
        ) {
          window.controls.spoilersArming = false;
          window.controls.setters.setAirbrakes.set();
        }
      }
    }
  };

  window.instruments.init(window.geofs.aircraft.instance.setup.instruments);
  if (!window.keyboard_mapping) {
    // @ts-ignore idk why this doesn't work
    $(document).on("keydown", window.controls.keyDown); // reapply the keybinds
  }
  window.geofs.api.addFrameCallback(spoilersArming, "spoilersArming");
});
