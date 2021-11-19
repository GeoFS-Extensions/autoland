import { data } from "../data";
import { utils } from "../utils";

const icao = window.navData.airports;

/**
 * Gets coordinates for ICAO Airports, Waypoints, or Navaids
 *
 * @param {ko.ObservableArray} route the route to calculate with
 * @param {String} fix The name of the fix
 * @param {Number} index Index of the route
 * @returns {Array} The coordinates array
 */
export const waypoint = (
  route: ko.ObservableArray,
  fix: string,
  index: number
): [number, number] => {
  const coords = icao[fix];
  if (coords) return coords;

  const navaid = data.navaids[fix];
  if (navaid) return navaid;

  const list = data.waypoints[fix];
  if (list) {
    let closestDist = Infinity,
      closestIndex = 0;

    for (let i = 0; i < list.length; i++) {
      // Sets current coords to the previous waypoint in the list if applicable
      // Else, current coords set to current position
      const curLat = geofs.aircraft.instance.llaLocation[0];
      const curLon = geofs.aircraft.instance.llaLocation[1];
      const lat = index === 0 ? curLat : route()[index - 1].lat();
      const lon = index === 0 ? curLon : route()[index - 1].lon();

      const relativeDist = utils.getDistance(list[i][0], list[i][1], lat, lon);

      if (relativeDist < closestDist) {
        closestDist = relativeDist;
        closestIndex = i;
      }
    }

    return list[closestIndex];
  }

  return undefined;
};
