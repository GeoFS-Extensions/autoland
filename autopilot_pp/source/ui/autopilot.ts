import * as ko from "knockout";
import gc from "../greatcircle";
import ap from "../autopilot";
import util from "../util";
import getWaypoint from "../getwaypoint";
import shouldntHaveAp from "../shouldntHaveAp";

/* CODE FOR VALIDATION OF INPUTS */
function validateAltitude(val: string) {
  return parseInt(val);
}

function validateHeading(val: string) {
  return util.fixAngle360(parseInt(val));
}

function validateLat(val: string) {
  return util.clamp(parseFloat(val), -90, 90);
}

function validateLon(val: string) {
  return util.clamp(parseFloat(val), -180, 180);
}

function apValidate(target, fn) {
  return function (val) {
    const current = target();
    const newValue = fn(val);

    if (newValue !== current && !isNaN(newValue)) target(newValue);
    // change value if actual value same
    else target.notifySubscribers(newValue);
  };
}

ko.extenders.apValidate = function (target, fn) {
  const result = ko.pureComputed({
    read: target,
    write: apValidate(target, fn),
  });

  return result;
};

const modeToText = ["Heading mode", "Lat/lon mode", "Waypoint mode"];

function AutopilotVM() {
  this.on = ap.on;
  this.currentMode = ap.currentMode;
  this.currentModeText = ko.pureComputed<string>(function () {
    const index = ap.currentMode();
    return modeToText[index];
  });

  this.altitude = ap.modes.altitude.value.extend({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore This is necessary for the build process to function
    apValidate: validateAltitude,
  });
  this.altitudeEnabled = ap.modes.altitude.enabled;

  function formatVs(value: number) {
    let str = Math.abs(value).toFixed(0);

    // Pad with zeroes.
    while (str.length < 4) str = "0" + str;

    // TODO: find a way of using "+" without triggering <input type="number"> validation.
    // maybe call toString?
    return (value < 0 ? "-" : "") + str;
  }

  this.vs = ko.pureComputed<string>({
    read: function () {
      if (ap.modes.vs.enabled()) return formatVs(ap.modes.vs.value());
      // Will be replaced by "-----" as this is the placeholder.
      return "";
    },
    write: function (val) {
      const target = ap.modes.vs.value;
      const current = target();
      let newValue = parseInt(val);
      if (newValue !== newValue) newValue = undefined;

      if (newValue !== current) target(newValue);
      // change value if actual value same
      else target.notifySubscribers(newValue);
    },
  });

  this.heading = ko.pureComputed<string>({
    read: function () {
      let str = ap.modes.heading.value().toString();
      // Pad the value to 3 digits.
      while (str.length < 3) str = "0" + str;
      return str;
    },
    write: apValidate(ap.modes.heading.value, validateHeading),
  });

  this.headingEnabled = ap.modes.heading.enabled;

  this.speed = ko.pureComputed<string>({
    read: function () {
      const value = ap.modes.speed.value();
      return value.toFixed(ap.modes.speed.isMach() ? 2 : 0);
    },
    write: function (val) {
      const target = ap.modes.speed.value;
      const current = target();
      const newValue = ap.modes.speed.isMach()
        ? Math.round(Number(val) * 100) / 100
        : parseInt(val);

      if (newValue !== current && !isNaN(newValue)) target(newValue);
      // Ensure input field is changed if rounded value is same but input value different.
      else target.notifySubscribers(newValue);
    },
  });

  this.speedEnabled = ap.modes.speed.enabled;
  this.speedMode = ko.pureComputed<string>({
    read: function () {
      return ap.modes.speed.isMach() ? "mach" : "kias";
    },
    write: function (val) {
      ap.modes.speed.isMach(val === "mach");
    },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.lat = gc.latitude.extend({ apValidate: validateLat });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.lon = gc.longitude.extend({ apValidate: validateLon });

  // REVIEW: should FMC be allowed to change the displayed ICAO value?
  const _waypoint = ko.observable<string>();
  this.waypoint = ko.pureComputed<string>({
    read: _waypoint,
    write: function (inputVal) {
      // Wapoint names are uppercase, so make the input uppercase for consistency.
      const code = inputVal.trim().toUpperCase();

      const coord = getWaypoint(code);
      if (coord) {
        gc.latitude(coord[0]);
        gc.longitude(coord[1]);

        if (inputVal !== code) _waypoint(code);
        // Ensure input field is changed if code is same but input value is different.
        else _waypoint.notifySubscribers(code);
      } else {
        _waypoint("");
        // TODO: replace with proper UI warning
        alert(
          'Code "' +
            inputVal +
            '" is an invalid or unrecognised ICAO airport code.'
        );
      }
    },
  });

  // Only toggle autopilot for
  this.toggle = () => {
    if (!shouldntHaveAp.includes(geofs.aircraft.instance.id)) {
      ap.toggle();
    }
  };

  // Make it so when changing to an aircraft in the array the autopilot turns off:
  const oldChange = geofs.aircraft.Aircraft.change;
  geofs.aircraft.Aircraft.change = (a, b, c, d) => {
    if (shouldntHaveAp.includes(a)) {
      ap.on(false);
    }
    return oldChange(a, b, c, d);
  };

  this.nextMode = function () {
    const mode = ap.currentMode();
    // Loop back around to first mode if currently on last mode.
    ap.currentMode(mode === modeToText.length - 1 ? 0 : mode + 1);
  };
}

// Handle MDL's annoying inputs that needs updating all the time.
function updateMdlSwitch(element, _notUsed, bindings) {
  // Call these so the update is triggered when these bindings change.
  const isChecked = bindings.get("checked");
  const isEnabled = bindings.get("enable");
  if (isChecked) isChecked();
  if (isEnabled) isEnabled();

  // This has to be done after the bindings call as MaterialSwitch isn't
  // present yet when GeoFS is loaded.
  const materialSwitch = element.parentNode.MaterialSwitch;
  if (!materialSwitch) return;

  materialSwitch.checkDisabled();
  materialSwitch.checkToggleState();
}

function updateMdlRadio(element, _notUsed, bindings) {
  // jshint unused:false

  // Call these so the update is triggered when these bindings change.
  const isChecked = bindings.get("checked");
  const isEnabled = bindings.get("enable");
  if (isChecked) isChecked();
  if (isEnabled) isEnabled();

  // This has to be done after the bindings call as MaterialRadio isn't
  // present yet when GeoFS is loaded.
  const materialRadio = element.parentNode.MaterialRadio;
  if (!materialRadio) return;

  materialRadio.checkDisabled();
  materialRadio.checkToggleState();
}

// Create a custom bninding that handles this issue.
ko.bindingHandlers.mdlSwitch = { update: updateMdlSwitch };
ko.bindingHandlers.mdlRadio = { update: updateMdlRadio };

export default AutopilotVM;
