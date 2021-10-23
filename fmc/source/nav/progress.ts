import * as ko from "knockout";
import { distance } from "../distance";
import { flight } from "../flight";
import { utils } from "../utils";
import { waypoints } from "../waypoints";

let timer: number = null;

// Progress information
const info = {
  flightETE: ko.observable("--:--"),
  flightETA: ko.observable("--:--"),
  todETE: ko.observable("--:--"),
  todETA: ko.observable("--:--"),
  flightDist: ko.observable("--"),
  todDist: ko.observable("--"),
  nextDist: ko.observable("--"),
  nextETE: ko.observable("--:--"),
};

/**
 * Updates the plane's progress during flying, set on a timer
 */
const update = function () {
  const route = waypoints.route();
  const nextWaypoint = waypoints.nextWaypoint();
  const lat1: number = geofs.aircraft.instance.llaLocation[0];
  const lon1: number = geofs.aircraft.instance.llaLocation[1];
  const lat2 = flight.arrival.coords()[0];
  const lon2 = flight.arrival.coords()[1];
  const times: number[][] = [[], [], [], [], []]; // flightETE, flightETA, todETE, todETA, nextETE
  const nextDist =
    nextWaypoint === null ? 0 : route[nextWaypoint].distFromPrev();
  let flightDist: number;
  let valid = true;

  // Checks if the whole route is complete
  for (let i = 0; i < route.length; i++) {
    if (!route[i].lat() || !route[i].lon()) valid = false;
  }
  if (valid) flightDist = distance.route(route.length);
  else flightDist = utils.getDistance(lat1, lon1, lat2, lon2);

  // Calculates the time for the next waypoint
  times[4] = utils.getETE(nextDist, false);

  // Calculates times if aircraft is flying and has an arrival airport
  if (!geofs.aircraft.instance.groundContact && flight.arrival.airport()) {
    times[0] = utils.getETE(flightDist, true);
    times[1] = utils.getETA(times[0][0], times[0][1]);
    if (flightDist - flight.todDist() > 0) {
      times[2] = utils.getETE(flightDist - flight.todDist(), false);
      times[3] = utils.getETA(times[2][0], times[2][1]);
    }
  }

  print(flightDist, nextDist, times);

  if (timer === null) {
    timer = setInterval(update, 5000);
  }
};

/**
 * Prints plane's progress to the UI
 *
 * @param {Number} flightDist The total flight distance
 * @param {Number} nextDist The distance to the next waypoint
 * @param {Array} times An array of the time: [hours, minutes]
 */
const print = function (
  flightDist: number,
  nextDist: number,
  times: number[][]
) {
  const formattedTimes: string[] = [];
  for (let i = 0; i < times.length; i++) {
    formattedTimes.push(utils.formatTime(times[i]));
  }

  // Formats flightDist
  if (flightDist < 10) {
    flightDist = Math.round(flightDist * 10) / 10;
  } else flightDist = Math.round(flightDist);

  // If T/D is entered and T/D has not been passed
  let todDist: number;
  if (flight.todDist() && flight.todDist() < flightDist)
    todDist = flightDist - flight.todDist();

  // Formats nextDist
  if (nextDist < 10) {
    nextDist = Math.round(10 * nextDist) / 10;
  } else nextDist = Math.round(nextDist);

  // If times and distances are not defined, print default
  const DEFAULT_DIST = "--";

  info.flightETE(formattedTimes[0]);
  info.flightETA(formattedTimes[1]);
  info.todETE(formattedTimes[2]);
  info.todETA(formattedTimes[3]);
  info.flightDist(
    (!isNaN(flightDist) && flightDist.toString()) || DEFAULT_DIST
  );
  info.todDist(
    (typeof todDist !== "undefined" && todDist.toString()) || DEFAULT_DIST
  );
  info.nextDist(
    (typeof nextDist !== "undefined" && nextDist.toString()) || DEFAULT_DIST
  );
  info.nextETE(formattedTimes[4]);
};

export const progress = {
  info,
  update,
  print,
};
