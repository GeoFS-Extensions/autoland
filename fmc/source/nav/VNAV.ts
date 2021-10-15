import debug from "../debug";
import distance from "../distance";
import flight from "../flight";
import utils from "../utils";
import waypoints from "../waypoints";
import vnavProfile from "../vnav-profile";

// Autopilot++ Dependencies
const apModes = window.autopilot_pp.require("build/autopilot").modes;

export default {
  timer: null,

  /**
   * Controls VNAV, plane's vertical navigation, set on a timer
   */
  update: function () {
    if (!flight.vnavEnabled()) return;

    const route = waypoints.route();

    const params = getFlightParameters();

    const next = waypoints.nextWptAltRes();
    const hasRestriction = next !== -1;

    let todDist = flight.todDist();
    const cruiseAlt = flight.cruiseAlt();
    const fieldElev = flight.fieldElev();
    const todCalc = flight.todCalc();

    const currentAlt = geofs.aircraft.instance.animationValue.altitude;
    let targetAlt, deltaAlt, nextDist, targetDist;
    if (hasRestriction) {
      targetAlt = route[next].alt();
      deltaAlt = targetAlt - currentAlt;
      nextDist = distance.route(next + 1);
      targetDist = distance.target(deltaAlt);
      debug.log(
        "targetAlt: " +
          targetAlt +
          ", deltaAlt: " +
          deltaAlt +
          ", nextDist: " +
          nextDist +
          ", targetDist: " +
          targetDist
      );
    }

    const spd = params[0];
    let vs, alt;

    /**********************
     * Flight Phase Logic *
     **********************/
    const lat1 = geofs.aircraft.instance.llaLocation[0] || null;
    const lon1 = geofs.aircraft.instance.llaLocation[1] || null;
    const lat2 = flight.arrival.coords()[0] || null;
    const lon2 = flight.arrival.coords()[1] || null;
    let flightDist: number;
    let valid = true;

    // Checks if the whole route is complete
    for (let i = 0; i < route.length; i++) {
      if (!route[i].lat() || !route[i].lon()) valid = false;
    }
    if (valid) flightDist = distance.route(route.length);
    else flightDist = utils.getDistance(lat1, lon1, lat2, lon2);

    // Invalid distance, phase resets to default = climb
    if (isNaN(flightDist)) flight.phase(0);
    // Total route dist is less than T/D distance, phase = descent
    else if (flightDist < todDist) flight.phase(2);
    // If current altitude is close to the cruise altitude, phase = cruise
    else if (Math.abs(cruiseAlt - currentAlt) <= 100) flight.phase(1);
    // If current altitude is less than cruise altitude, phase = climb
    else if (currentAlt < cruiseAlt) flight.phase(0);
    // If current altitude is greater than cruise altitude
    // This means that cruise altitude is lowered during cruise
    // Phase still is cruise, but assign V/S value
    else if (currentAlt > cruiseAlt) {
      flight.phase(1);
      vs = -1000;
    }

    // Else, resets to default phase = climb
    else flight.phase(0);

    // ==============================

    // If the aircraft is climbing
    if (flight.phase() === 0) {
      // If there is an altitude restriction somewhere on the route
      if (hasRestriction) {
        const totalDist =
          distance.target(cruiseAlt - currentAlt) +
          distance.target(targetAlt - cruiseAlt);
        debug.log("totalDist: " + totalDist);

        // Checks to see if the altitude restriction is on the climbing phase or descent phase
        if (nextDist < totalDist) {
          if (nextDist < targetDist)
            vs = utils.getClimbrate(deltaAlt, nextDist);
          else vs = params[1];
          alt = targetAlt;
        } else {
          vs = params[1];
          alt = cruiseAlt;
        }
      }

      // If there are no altitude restrictions left on the route
      else {
        vs = params[1];
        alt = cruiseAlt;
      }
    }

    // If the aircraft is on descent
    else if (flight.phase() === 2) {
      // If there is an altitude restriction somewhere on the route
      if (hasRestriction) {
        // If targetDist has been reached
        if (nextDist < targetDist) {
          vs = utils.getClimbrate(deltaAlt, nextDist);
          alt = targetAlt;
        }

        // If targetDist hasn't been reached do nothing until it has been reached
      }

      // If there are no altitude restrictions left on the route
      else {
        vs = params[1];
        if (currentAlt > 12000 + fieldElev)
          alt = 100 * Math.round((12000 + fieldElev) / 100);
      }
    }

    // Calculates Top of Descent
    if (flight.phase() === 1 && (todCalc || !todDist)) {
      if (hasRestriction) {
        todDist = distance.route(route.length) - nextDist;
        todDist += distance.target(targetAlt - cruiseAlt);
      } else {
        todDist = distance.target(fieldElev - cruiseAlt);
      }
      todDist = Math.round(todDist);
      flight.todDist(todDist);
      debug.log("TOD changed to " + todDist);
    }

    // Updates SPD, VS, and ALT in Autopilot++ if new values exist
    if (spd !== undefined) apModes.speed.value(spd);
    if (vs !== undefined) apModes.vs.value(vs);
    if (alt !== undefined) apModes.altitude.value(alt);
  },
};

/**
 * @private
 * Gets each plane's flight parameters, for VNAV
 *
 * @returns {Array} [speed, vertical speed]
 */
function getFlightParameters(): Array<any> {
  let spd, vs;
  const a = geofs.aircraft.instance.animationValue.altitude;

  // CLIMB
  if (flight.phase() === 0) {
    const profile = getVNAVProfile().climb;
    let index: number;

    for (let i = 0; i < profile.length; i++) {
      if (a > profile[i][0] && a <= profile[i][1]) {
        index = i;
        break;
      }
    }

    const belowStartAlt = index === undefined;

    if (flight.spdControl() && !belowStartAlt) {
      spd = profile[index][2];
      if (index < profile.length - 1) vs = profile[index][3];
      switchSpeedMode(spd);
    }
  }

  // DESCENT
  else if (flight.phase() === 2) {
    const profile = getVNAVProfile().descent;
    let index: number;

    for (let i = 0; i < profile.length; i++) {
      if (a > profile[i][0] && a <= profile[i][1]) {
        index = i;
        break;
      }
    }

    const belowLastAlt = index === undefined;

    // If current alt below lowest alt in profile
    // SPD and V/S will not be restricted
    if (flight.spdControl() && !belowLastAlt) {
      spd = profile[index][2];
      vs = profile[index][3];
      switchSpeedMode(spd);
    }
  }

  return [spd, vs];
}

/**
 * @private
 * Gets the climb/descent profile for VNAV
 *
 * @returns {Object} The profile needed by VNAV
 */
function getVNAVProfile(): { climb: number[][]; descent: number[][] } {
  return (
    geofs.aircraft.instance.setup.fmcVnavProfile ||
    vnavProfile[geofs.aircraft.instance.id] ||
    vnavProfile.DEFAULT
  );
}

/**
 * @private
 * Checks if the speed input is mach and switches mode
 *
 * @param {Number} spd The speed to be checked
 */
function switchSpeedMode(spd: number) {
  if (!spd) return;
  if (spd <= 10) apModes.speed.isMach(true);
  else apModes.speed.isMach(false);
}
