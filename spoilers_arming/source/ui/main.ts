import globalVariables from "../globalVariables";
import removeEvents from "../removeEvents";
import changeControls from "../changeControls";
import changeInstruments from "../changeInstruments";

removeEvents();
changeControls();
changeInstruments();
const spoilersArming = () => {
  geofs.aircraft.instance.animationValue.spoilersArmed =
    controls.spoilersArming; // update the animation
  if (controls.spoilersArming) {
    if (geofs.aircraft.instance.groundContact) {
      if (controls.airbrakes.position === 0 && globalVariables.enabled()) {
        controls.spoilersArming = false;
        controls.setters.setAirbrakes.set();
      }
    }
  }
};

instruments.init(geofs.aircraft.instance.setup.instruments);
if (!keyboard_mapping) {
  $(document).on({ keydown: controls.keyDown }); // reapply the keybinds
}
geofs.api.addFrameCallback(spoilersArming, "spoilersArming");
