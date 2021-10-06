import data from "../data";
import log from "../log";

function getAirway(startFix, airway, endFix) {
  if (!startFix || !endFix)
    log.warn("There must be one waypoint before and after the airway.");

  var airwayList = data.ATS[airway]; // jshint unused: false

  var validList;
}

export default function (startFix, airway, endFix) {
  return getAirway(startFix, airway, endFix);
}
