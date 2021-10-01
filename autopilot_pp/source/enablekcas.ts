"use strict";

define(["speedconversions", "util"], function (speedConversions, util) {
  /** @private */
  function setKcas() {
    var animationValue = window.geofs.aircraft.instance.animationValue;
    animationValue.kcas = speedConversions.tasToCas(
      animationValue.ktas,
      util.ft2mtrs(animationValue.altitude)
    );
  }

  function enableKcas() {
    // Convert KTAS to KCAS.
    // Ensure "kcas" property is set before changing it.
    var timer = setInterval(function () {
      if (
        window.window.geofs &&
        window.geofs.aircraft.instance &&
        window.geofs.aircraft.instance.animationValue
      ) {
        setKcas();

        ["airspeed", "airspeedJet", "airspeedSupersonic"].forEach(function (
          prop
        ) {
          // Set it for any aircraft that load in the future.
          window.instruments.definitions[
            prop
          ].overlay.overlays[0].animations[0].value = "kcas";
          if (window.instruments.list && window.instruments.list[prop]) {
            // Set it for the currently loaded aircraft.
            window.instruments.list[
              prop
            ].overlay.children[0].definition.animations[0].value = "kcas";
          }
        });

        clearInterval(timer);
        setInterval(setKcas, 16);
      }
    }, 16);
  }

  return enableKcas;
});
