import * as ko from "knockout";
import speedConversions from "../speedConversions";
import util from "../util";

var altitude = {
  enabled: ko.observable(false),
  value: ko.observable(0),
};

var vs = {
  enabled: ko.observable(false),
  value: ko.observable(0),
};

var heading = {
  enabled: ko.observable(false),
  value: ko.observable(360),
};

var speed = {
  enabled: ko.observable(false),
  isMach: ko.observable(false),
  value: ko.observable(0),
  toMach: toMach,
  toKias: toKias,
};

function toMach(kias: number) {
  var altitude = util.ft2mtrs(geofs.aircraft.instance.animationValue.altitude);
  return speedConversions.casToMach(kias, altitude);
}

function toKias(mach: number) {
  var altitude = util.ft2mtrs(geofs.aircraft.instance.animationValue.altitude);
  return speedConversions.machToCas(mach, altitude);
}

// Convert value between KIAS and Mach when mode switched.
speed.isMach.subscribe(function (isMach: boolean) {
  var value = speed.value();
  speed.value(isMach ? toMach(value) : toKias(value));
});

var modes = {
  altitude: altitude,
  vs: vs,
  heading: heading,
  speed: speed,
};

export default modes;
