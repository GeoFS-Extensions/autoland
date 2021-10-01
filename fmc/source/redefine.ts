"use strict";

define(["debug", "log"], function (debug, log) {
  // Adds a confirm window to prevent accidental reset
  window.geofs.resetFlight = function () {
    if (window.confirm("Reset Flight?")) {
      if (window.geofs.lastFlightCoordinates) {
        window.geofs.flyTo(window.geofs.lastFlightCoordinates, true);
        log.update("Flight reset");
      }
    }
  };

  // Tracks pause event to log
  window.geofs.togglePause = function () {
    if (!window.geofs.pause) {
      log.update("Flight paused");
      window.geofs.doPause();
    } else {
      window.geofs.undoPause();
      log.update("Flight resumed");
    }
  };

  // Tracks gear up/down event to log
  window.controls.setters.setGear.set = function () {
    if (
      !window.geofs.aircraft.instance.groundContact ||
      window.geofs.debug.on
    ) {
      if (window.controls.gear.target === 0) {
        window.controls.gear.target = 1;
        log.update("Gear up");
      } else {
        window.controls.gear.target = 0;
        log.update("Gear down");
      }

      window.controls.setPartAnimationDelta(window.controls.gear);
    }
  };

  // Tracks flaps up event to log
  window.controls.setters.setFlapsUp.set = function () {
    if (window.controls.flaps.target > 0) {
      window.controls.flaps.target--;

      if (window.geofs.aircraft.instance.setup.flapsPositions) {
        window.controls.flaps.positionTarget =
          window.geofs.aircraft.instance.setup.flapsPositions[
            window.controls.flaps.target
          ];
        log.update("Flaps raised to " + window.controls.flaps.positionTarget);
      } else log.update("Flaps raised to " + window.controls.flaps.target);

      window.controls.setPartAnimationDelta(window.controls.flaps);
    }
  };

  // Tracks flaps down event to log
  window.controls.setters.setFlapsDown.set = function () {
    if (
      window.controls.flaps.target <
      window.geofs.aircraft.instance.setup.flapsSteps
    ) {
      window.controls.flaps.target++;

      if (window.geofs.aircraft.instance.setup.flapsPositions) {
        window.controls.flaps.positionTarget =
          window.geofs.aircraft.instance.setup.flapsPositions[
            window.controls.flaps.target
          ];
        log.update("Flaps lowered to " + window.controls.flaps.positionTarget);
      } else log.update("Flaps lowered to " + window.controls.flaps.target);

      window.controls.setPartAnimationDelta(window.controls.flaps);
    }
  };
});
