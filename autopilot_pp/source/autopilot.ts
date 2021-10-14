import * as ko from "knockout";
import apModes from "./autopilot/modes";
import pidControls from "./autopilot/pidControls";
import gc from "./greatcircle";
import util from "./util";

const _on = ko.observable(false);
const on = ko.pureComputed({
  read: _on,
  write: function (newValue) {
    // Check if autopilot is enabled for the current aircraft or not.
    if (geofs.aircraft.instance.setup.autopilot && newValue) _on(true);
    else _on(false);
  },
});

// The type of navigation mode currently set for the autopilot.
const currentMode = ko.observable(0);

// Initialise the autopilot when it is turned on and off.
on.subscribe(function (newValue) {
  // Needed for compatibility with GEFS code.
  controls.autopilot.on = newValue;

  // Toggle the autopilot indicator provided by GEFS.
  ui.hud.autopilotIndicator(newValue);

  if (!newValue) {
    // Disable all modes as autopilot is no longer enabled.
    Object.keys(apModes).forEach(function (prop) {
      apModes[prop].enabled(false);
    });
  }
});

/**
 * Toggle the autopilot on and off.
 */
function toggle() {
  ap.on(!ap.on());
}

// Reset the PID values of the respective modes to avoid control issues.
// TODO: reset PID controllers on aircraft change/reset
apModes.heading.enabled.subscribe(function (newValue) {
  if (newValue) pidControls.roll.init(controls.roll);
});

apModes.altitude.enabled.subscribe(function (newValue) {
  if (newValue) {
    pidControls.climb.init(geofs.aircraft.instance.animationValue.atilt);
    // We don't want to set pitch outside the range for zero elevator trim.
    pidControls.pitch.init(util.clamp(controls.pitch, -1, 1));

    // TODO: handle elevator trim better.
    controls.elevatorTrim = controls.rawPitch;
    controls.rawPitch = 0;
  }
});

apModes.heading.enabled.subscribe(function (newValue) {
  if (newValue) pidControls.throttle.init(controls.throttle);
});

let lastGcHeadingUpdate = 0;

/**
 * Function called by the window.geofs.tick callback.
 *
 * @param {Number} dt - Time in seconds since the last frame.
 */
function update(dt) {
  const values = geofs.aircraft.instance.animationValue;

  // Calculate relative speed of aircraft as correction factor (TAS, not CAS).
  const speedRatio = util.clamp(values.ktas / 100, 0.5, 5);

  // Disable the autopilot when the plane is touching the ground and upon encountering abnormal flight conditions.
  if (
    geofs.aircraft.instance.groundContact ||
    ui.hud.stallAlarmOn ||
    Math.abs(values.aroll) > 45 ||
    values.atilt > 20 ||
    values.atilt < -35
  ) {
    ap.on(false);
    return;
  }

  function updateHeading() {
    // Update the heading for the GC mode, as heading towards a destination will change inflight.
    if (
      ap.currentMode() !== 0 &&
      performance.now() - lastGcHeadingUpdate > 1000
    ) {
      const headingToDest = gc.getHeading();
      if (isFinite(headingToDest))
        apModes.heading.value(Math.round(headingToDest));
      lastGcHeadingUpdate = performance.now();
    }

    // Calculate difference in target/current headings, bound to between +/-180 degrees.
    const deltaHeading = util.fixAngle(
      apModes.heading.value() - values.heading
    );

    // The maximum bank angle is double standard rate turn (6 degrees per second) or the bank
    // angle limit, whichever is less.
    const maxBankAngle = Math.min(
      util.rad2deg(Math.atan(0.0027467328927254283 * values.ktas)),
      ap.maxBankAngle
    );

    // Target bank angle is equal to the heading offset (i.e. 10 degree heading offset commands a
    // 10 degree bank), up to the maximum bank angle.
    const targetBankAngle = util.clamp(
      deltaHeading,
      -maxBankAngle,
      maxBankAngle
    );

    // Coordinated roll rate varies directly with true airspeed.
    // http://www.flightlab.net/Flightlab.net/Download_Course_Notes_files/9_RollingDynamics.pdf
    // NOTE: The current bank angle ("aroll") is negated as GEFS takes right wing up as positive.
    const result = pidControls.roll.compute(-values.aroll, dt, targetBankAngle);
    controls.roll = util.exponentialSmoothing(
      "apRoll",
      result / speedRatio,
      0.9
    );

    // Set rudder deflection to half the aileron deflection (arbitrary value).
    controls.yaw = util.exponentialSmoothing("apYaw", controls.roll / 2, 0.1);

    // HACK: A380 ailerons suck
    if (geofs.aircraft.instance.name === "a380") controls.roll *= 3.5;

    // TODO: add an aileron deflection and/or roll rate limiter
  }

  function updateAltitude() {
    const deltaAltitude = apModes.altitude.value() - values.altitude;
    const maxClimbRate = util.clamp(
      speedRatio * ap.commonClimbRate,
      0,
      ap.maxClimbRate
    );
    const maxDescentRate = util.clamp(
      speedRatio * ap.commonDescentRate,
      ap.maxDescentRate,
      0
    );
    const vsValue = apModes.vs.value();

    // Check if vertical speed should be under manual control or not.
    // V/S should be under manual control if user did not explicitly disable V/S mode (by
    // clearing the input field) and vertical speed is in the same direction as altitude.
    const manualVsControl =
      vsValue !== undefined &&
      (vsValue === 0 ||
        (vsValue < 0 ? deltaAltitude < -200 : deltaAltitude > 200));

    // If vs.enabled() is true but contains value, then the V/S mode was automatically disabled.
    // If vs.enabled() is false and is undefined, user explicitly disabled manual V/S selection.
    if (apModes.vs.enabled()) {
      // Turn off manual vertical speed (as it is in opposite direction to altitude change).
      if (!manualVsControl) apModes.vs.enabled(false);
    } else if (manualVsControl) {
      // This handles the case where vertical speed was previously under manual control, but the
      // assigned altitude was reached.  Now the vertical speed should revert back to manual
      // provided that it is in the same direction to the altitude change.
      apModes.vs.enabled(true);
    }

    let targetClimbRate;
    if (manualVsControl) targetClimbRate = vsValue;
    // Automatically calculate vertical speed.
    else
      targetClimbRate = util.clamp(
        deltaAltitude * 2.5,
        maxDescentRate,
        maxClimbRate
      );

    // Set climb angle to match target climb rate.
    let targetTilt = pidControls.climb.compute(
      values.climbrate,
      dt,
      targetClimbRate
    );
    targetTilt = util.clamp(targetTilt, ap.minPitchAngle, ap.maxPitchAngle);

    // TODO: add an elevator deflection rate limiter
    const result = pidControls.pitch.compute(-values.atilt, dt, targetTilt);
    controls.rawPitch = util.exponentialSmoothing(
      "apPitch",
      result / speedRatio,
      0.9
    );

    geofs.debug.watch("targetClimbrate", targetClimbRate);
    geofs.debug.watch("aTargetTilt", targetTilt);
  }

  function updateThrottle() {
    let speed = apModes.speed.value();

    // Convert speed input value to KIAS if corrently in Mach mode.
    if (apModes.speed.isMach()) speed = apModes.speed.toKias(speed);

    const result = pidControls.throttle.compute(values.kcas, dt, speed);
    controls.throttle = util.clamp(
      util.exponentialSmoothing("apThrottle", result, 0.9),
      0,
      1
    );
    geofs.debug.watch("throttle", controls.throttle);
  }

  // Run updates for modes if they are enabled.
  if (apModes.heading.enabled()) updateHeading();
  if (apModes.altitude.enabled()) updateAltitude();
  if (apModes.speed.enabled()) updateThrottle();
}

const ap = {
  on,
  toggle,
  update,
  modes: apModes,
  currentMode,
  maxBankAngle: 25,
  minPitchAngle: -10,
  maxPitchAngle: 10,
  commonClimbRate: 500,
  commonDescentRate: -750,
  maxClimbRate: 3000,
  maxDescentRate: -4000,
};

// Properties needed for compatibility with GEFS.

controls.autopilot = {
  ...controls.autopilot,
  on: false,
  toggle: toggle,
  turnOff: function () {
    ap.on(false);
  },
  update: update,
};

autopilot_pp.ready = true;
export default ap;
