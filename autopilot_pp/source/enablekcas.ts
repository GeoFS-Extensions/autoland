import speedConversions from "./speedConversions";
import util from "./util";

/** @private */
function setKcas() {
  const animationValue = geofs.aircraft.instance.animationValue;
  animationValue.kcas = speedConversions.tasToCas(
    animationValue.ktas,
    util.ft2mtrs(animationValue.altitude)
  );
}

function enableKcas() {
  // Convert KTAS to KCAS.
  // Ensure "kcas" property is set before changing it.
  const timer = setInterval(function () {
    if (
      geofs &&
      geofs.aircraft.instance &&
      geofs.aircraft.instance.animationValue
    ) {
      setKcas();

      ["airspeed", "airspeedJet", "airspeedSupersonic"].forEach(function (
        prop
      ) {
        // Set it for any aircraft that load in the future.
        instruments.definitions[prop].overlay.overlays[0].animations[0].value =
          "kcas";
        if (instruments.list && instruments.list[prop]) {
          // Set it for the currently loaded aircraft.
          instruments.list[
            prop
          ].overlay.children[0].definition.animations[0].value = "kcas";
        }
      });

      clearInterval(timer);
      setInterval(setKcas, 16);
    }
  }, 16);
}

export default enableKcas;
