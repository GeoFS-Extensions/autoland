import * as ko from "knockout";
import speedConversions from "../speedConversions";
import util from "../util";

const altitude = {
  enabled: ko.observable(false),
  value: ko.observable(0),
};

const vs = {
  enabled: ko.observable(false),
  value: ko.observable(0),
};

const heading = {
  enabled: ko.observable(false),
  value: ko.observable(360),
};

const speed = {
  enabled: ko.observable(false),
  isMach: ko.observable(false),
  value: ko.observable(0),
  toMach: toMach,
  toKias: toKias,
};

function toMach(kias: number) {
  const altitude = util.ft2mtrs(geofs.aircraft.instance.animationValue.altitude);
  return speedConversions.casToMach(kias, altitude);
}

function toKias(mach: number) {
  const altitude = util.ft2mtrs(geofs.aircraft.instance.animationValue.altitude);
  return speedConversions.machToCas(mach, altitude);
}

// Convert value between KIAS and Mach when mode switched.
speed.isMach.subscribe(function (isMach: boolean) {
  const value = speed.value();
  speed.value(isMach ? toMach(value) : toKias(value));
});

const modes = {
  altitude,
  vs,
  heading,
  speed,
};

export default modes;
