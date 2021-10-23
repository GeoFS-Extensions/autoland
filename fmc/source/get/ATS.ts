import { data } from "../data";
import { log } from "../log";

function getAirway(startFix, airway, endFix) {
  if (!startFix || !endFix)
    log.warn("There must be one waypoint before and after the airway.");
}

export const ATS = (startFix, airway, endFix) => {
  return getAirway(startFix, airway, endFix);
};
