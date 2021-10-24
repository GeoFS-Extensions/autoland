import * as ko from "knockout";
import gc from "../greatcircle";
import ap from "../autopilot";
import util from "../util";
import getWaypoint from "../getwaypoint";
import shouldntHaveAp from "../shouldnthaveap";

type MDLHTMLElement = HTMLElement & {
  parentNode: {
    MaterialSwitch: {
      checkDisabled: () => void;
      checkToggleState: () => void;
    };
    MaterialRadio: {
      checkDisabled: () => void;
      checkToggleState: () => void;
    };
  };
};

const apValidate = (target: ko.Observable, fn: (val: string) => number) => {
  return (val: string) => {
    const current = target();
    const newValue = fn(val);

    if (newValue !== current && !isNaN(newValue)) target(newValue);
    // change value if actual value same
    else target.notifySubscribers(newValue);
  };
};

ko.extenders.apValidate = (target, fn) => {
  const result = ko.pureComputed({
    read: target,
    write: apValidate(target, fn),
  });

  return result;
};

export class AutopilotVM {
  // Methods:
  formatVs(value: number): string {
    let str = Math.abs(value).toFixed(0);

    // Pad with zeroes.
    while (str.length < 4) str = "0" + str;
    // TODO: find a way of using "+" without triggering <input type="number"> validation.
    // maybe call toString?
    return (value < 0 ? "-" : "") + str;
  }

  /* CODE FOR VALIDATION OF INPUTS */
  validateAltitude(val: string): number {
    return parseInt(val);
  }

  validateHeading(val: string): number {
    return util.fixAngle360(parseInt(val));
  }

  validateLat(val: string): number {
    return util.clamp(parseFloat(val), -90, 90);
  }

  validateLon(val: string): number {
    return util.clamp(parseFloat(val), -180, 180);
  }

  // Only toggle autopilot for aircraft types that should have it.
  toggle = () => {
    if (!shouldntHaveAp.includes(geofs.aircraft.instance.id)) {
      ap.toggle();
    }
  };

  nextMode = () => {
    const mode = ap.currentMode();
    // Loop back around to first mode if currently on last mode.
    ap.currentMode(mode === AutopilotVM.modeToText.length - 1 ? 0 : mode + 1);
  };

  // Class variables:
  static readonly modeToText = [
    "Heading mode",
    "Lat/lon mode",
    "Waypoint mode",
  ];

  // Instance Variables:
  readonly on = ap.on;

  readonly currentMode = ap.currentMode;
  readonly currentModeText = ko.pureComputed<string>(() => {
    const index = ap.currentMode();
    return AutopilotVM.modeToText[index];
  });

  readonly altitude = ap.modes.altitude.value.extend({
    // @ts-expect-error Knockout's system allows use of extenders, which are evaluated on runtime.
    apValidate: this.validateAltitude,
  });
  readonly altitudeEnabled = ap.modes.altitude.enabled;

  readonly vs = ko.pureComputed<string>({
    read: (): string => {
      if (ap.modes.vs.enabled()) {
        return this.formatVs(ap.modes.vs.value());
      }
      return "";
    },
    write: (val: string) => {
      const target = ap.modes.vs.value;
      const current = target();
      let newValue = parseInt(val);
      if (newValue !== newValue) {
        // TODO: what is this if statement doing?
        newValue = undefined;
      }
      if (newValue !== current) target(newValue);
      // change value if actual value same
      else target.notifySubscribers(newValue);
    },
  });

  readonly heading = ko.pureComputed<string>({
    read: (): string => {
      let str = ap.modes.heading.value().toString();
      // Pad the value to 3 digits.
      while (str.length < 3) str = "0" + str;
      return str;
    },
    write: apValidate(ap.modes.heading.value, this.validateHeading),
  });
  readonly headingEnabled = ap.modes.heading.enabled;

  readonly speed = ko.pureComputed<string>({
    read: (): string => {
      const value = ap.modes.speed.value();
      return value.toFixed(ap.modes.speed.isMach() ? 2 : 0);
    },
    write: (val: string) => {
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
  readonly speedEnabled = ap.modes.speed.enabled;
  readonly speedMode = ko.pureComputed<string>({
    read: (): string => {
      return ap.modes.speed.isMach() ? "mach" : "kias";
    },
    write: (val: string) => {
      ap.modes.speed.isMach(val === "mach");
    },
  });

  // @ts-expect-error Knockout's system allows use of extenders, which are evaluated on runtime.
  readonly lat = gc.latitude.extend({ apValidate: this.validateLat });
  // @ts-expect-error Knockout's system allows use of extenders, which are evaluated on runtime.
  readonly lon = gc.longitude.extend({ apValidate: this.validateLon });

  // REVIEW: should FMC be allowed to change the displayed ICAO value?
  readonly _waypoint = ko.observable<string>();
  readonly waypoint = ko.pureComputed<string>({
    read: this._waypoint,
    write: (inputVal: string) => {
      // Waypoint names are uppercase, so make the input uppercase for consistency.
      const code = inputVal.trim().toUpperCase();

      const coord = getWaypoint(code);
      if (coord) {
        gc.latitude(coord[0]);
        gc.longitude(coord[1]);

        if (inputVal !== code) this._waypoint(code);
        // Ensure input field is changed if code is same but input value is different.
        else this._waypoint.notifySubscribers(code);
      } else {
        this._waypoint("");
        // TODO: replace with proper UI warning
        alert(
          'Code "' +
            inputVal +
            '" is an invalid or unrecognised ICAO airport code.'
        );
      }
    },
  });

  constructor() {
    // Make it so when changing to an aircraft in the array the autopilot turns off:
    const oldChange = geofs.aircraft.Aircraft.change;
    geofs.aircraft.Aircraft.change = (a, b, c, d) => {
      if (shouldntHaveAp.includes(a)) {
        ap.on(false);
      }
      return oldChange(a, b, c, d);
    };
  }
}

// Handle MDL's annoying inputs that needs updating all the time.
const updateMdlSwitch = (
  element: MDLHTMLElement,
  _notUsed,
  bindings: ko.AllBindings
) => {
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
};

const updateMdlRadio = (
  element: MDLHTMLElement,
  _notUsed,
  bindings: ko.AllBindings
) => {
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
};

// Create a custom bninding that handles this issue.
ko.bindingHandlers.mdlSwitch = { update: updateMdlSwitch };
ko.bindingHandlers.mdlRadio = { update: updateMdlRadio };

export default AutopilotVM;
