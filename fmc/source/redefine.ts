import { log } from "./log";

// Adds a confirm window to prevent accidental reset
const oldReset = geofs.resetFlight;
geofs.resetFlight = function () {
  if (confirm("Reset Flight?")) {
    oldReset();
    log.update("Flight reset");
  }
};

// Tracks pause event to log
const oldPause = geofs.togglePause;
geofs.togglePause = function () {
  if (!geofs.pause) {
    log.update("Flight paused");
  } else {
    log.update("Flight resumed");
  }
  oldPause();
};

// Tracks gear up/down event to log
const oldSetGear = controls.setters.setGear.set;
controls.setters.setGear.set = function () {
  if (controls.gear.target === 0) {
    log.update("Gear up");
  } else {
    log.update("Gear down");
  }
  oldSetGear();
};

// Tracks flaps up event to log
const oldFlapsUp = controls.setters.setFlapsUp.set;
controls.setters.setFlapsUp.set = function () {
  oldFlapsUp();
  if (geofs.aircraft.instance.setup.flapsPositions) {
    log.update("Flaps raised to " + controls.flaps.positionTarget);
  } else log.update("Flaps raised to " + controls.flaps.target);
};

// Tracks flaps down event to log
const oldFlapsDown = controls.setters.setFlapsDown.set;
controls.setters.setFlapsDown.set = function () {
  if (geofs.aircraft.instance.setup.flapsPositions) {
    log.update("Flaps lowered to " + controls.flaps.positionTarget);
  } else log.update("Flaps lowered to " + controls.flaps.target);
};

// Tracks airbrakes toggle to log
const oldAirbrakes = controls.setters.setAirbrakes.set;
controls.setters.setAirbrakes.set = function () {
  oldAirbrakes();
  log.update(
    controls.airbrakes.target == 1
      ? "Activated airbrakes"
      : "Deactivated airbrakes"
  );
};
