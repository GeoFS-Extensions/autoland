import util from "./util";

const icaos = window.navData.airports;
const waypoints = window.navData.waypoints;
const navaids = window.navData.navaids;

function getClosestPoint(list: number[][]): number[] {
  // Duplicate waypoints, calculate closest waypoint to aircraft using the "Spherical Earth
  // projected to a plane" methdo described here:
  // https://en.wikipedia.org/wiki/Geographical_distance#Spherical_Earth_projected_to_a_plane
  let closestDistance = Infinity;

  // If the list only contains one element, it will be returned without calling the callback.
  return list.reduce(function (closestPoint, point) {
    // Current location of the aircraft.
    const acLat: number = geofs.aircraft.instance.llaLocation[0];
    const acLon: number = geofs.aircraft.instance.llaLocation[1];

    const deltaLat = util.deg2rad(acLat - point[0]);
    const deltaLon = util.deg2rad(acLon - point[1]);
    const meanLat = 0.5 * util.deg2rad(acLat + point[0]);

    // We don't need to square root the result or multiply the radius as we are just comparing
    // values to one another.
    const x = deltaLat;
    const y = deltaLon * Math.cos(meanLat);
    const relativeDistance = x * x + y * y;

    // Check if this point is closer or further away than the previous one.
    if (relativeDistance < closestDistance) {
      closestDistance = relativeDistance;
      return point;
    }

    // The current point is further away than the closest point so far.
    return closestPoint;
  });
}

function getWaypoint(code: string): number[] {
  if (icaos[code]) return icaos[code];

  if (navaids[code]) return navaids[code];

  if (waypoints[code]) return getClosestPoint(waypoints[code]);

  return null;
}

export default getWaypoint;
