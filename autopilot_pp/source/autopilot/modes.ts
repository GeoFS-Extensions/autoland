import * as ko from "knockout";
import speedConversions from "../speedConversions";
import util from "../util";

const altitude = {
  enabled: ko.observable<boolean>(false),
  value: ko.observable<number>(0),
};

const vs = {
  enabled: ko.observable<boolean>(false),
  value: ko.observable<number>(0),
};

const heading = {
  enabled: ko.observable<boolean>(false),
  value: ko.observable<number>(360),
};

const speed = {
  enabled: ko.observable<boolean>(false),
  isMach: ko.observable<boolean>(false),
  value: ko.observable<number>(0),
  toMach: toMach,
  toKias: toKias,
};

function toMach(kias: number): number {
  const altitude = util.ft2mtrs(
    geofs.aircraft.instance.animationValue.altitude
  );
  return speedConversions.casToMach(kias, altitude);
}

function toKias(mach: number): number {
  const altitude = util.ft2mtrs(
    geofs.aircraft.instance.animationValue.altitude
  );
  return speedConversions.machToCas(mach, altitude);
}

// Convert value between KIAS and Mach when mode switched.
speed.isMach.subscribe((isMach: boolean) => {
  const value = speed.value();
  speed.value(isMach ? toMach(value) : toKias(value));
});

export default {
  altitude,
  vs,
  heading,
  speed,
};
