import debug from "./debug";

// Earth's radius in nautical miles, used to calculate Great Circle Distance
const EARTH_RADIUS_NM = 3440.06;

// Feet / Nautical Miles conversion
const FEET_TO_NM = 1 / 6076;
const NM_TO_FEET = 6076;

/**
 * Turns degrees to radians
 *
 * @param {Number} d The degree to be converted
 * @returns {Number} Radians of the degree
 */
function toRadians(d: number): number {
  return (d * Math.PI) / 180;
}

/**
 * Converts radians to degrees
 *
 * @param {Number} r The radian to be converted
 * @returns {Number} Degree of the radian
 */
function toDegrees(r: number): number {
  return (r * 180) / Math.PI;
}

/**
 * Computes the ground speed of the aircraft
 *
 * @returns {Number} The ground speed of the aircraft
 */
function getGroundSpeed(): number {
  const tas = geofs.aircraft.instance.animationValue.ktas;
  const vs = 60 * geofs.aircraft.instance.animationValue.climbrate * FEET_TO_NM;
  debug.log("tas: " + tas + ", vs: " + vs);
  return Math.sqrt(tas * tas - vs * vs);
}

/**
 * Computes the distance between two sets of coordinates
 *
 * @param {Number} lat1 Latitude of first coordinate
 * @param {Number} lon1 Longetude of first coordinate
 * @param {Number} lat2 Latitude of second coordinate
 * @param {Number} lon2 Longetude of second coordinate
 * @returns {Number} The distance computed, in nautical miles
 */
function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dlat = toRadians(lat2 - lat1);
  const dlon = toRadians(lon2 - lon1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_NM * c;
}

/**
 * Computes the bearing between two sets of coordinates
 *
 * @param {Number} lat1 Latitude of first coordinate
 * @param {Number} lon1 Longetude of first coordinate
 * @param {Number} lat2 Latitude of second coordinate
 * @param {Number} lon2 Longetude of second coordinate
 * @returns {Number} The bearing computed, in 360 format
 */
function getBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);
  lon1 = toRadians(lon1);
  lon2 = toRadians(lon2);
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  const brng = toDegrees(Math.atan2(y, x));
  return brng <= 0 ? brng + 360 : brng;
}

/**
 * Computes the climb rate with an altitude restriction
 *
 * @param {Number} deltaAlt The altitude difference
 * @param {Number} nextDist The distance to the restriction point
 * @returns {Number} The climb rate necessary to attain the restriction
 */
function getClimbrate(deltaAlt: number, nextDist: number): number {
  const gs = getGroundSpeed();
  const vs =
    100 *
    Math.round(
      (gs * (deltaAlt / (nextDist * NM_TO_FEET)) * NM_TO_FEET) / 60 / 100
    );
  return vs;
}

/**
 * Helper method, formats the time
 *
 * @param {Array} time An array of the time: [hours, minutes]
 * @returns {String} Formatted time: "hours : minutes"
 */
function formatTime(time: number[]): string {
  if (isNaN(time[0]) || isNaN(time[1])) return "--:--";
  time[1] = Number(checkZeros(time[1]));
  return time[0] + ":" + time[1];
}

/**
 * Helper method to make sure that a time is eligible
 *
 * @param {Number} h The hours
 * @param {Number} m The minutes
 * @returns {Array} Array of eligible time, [h, m]
 */
function timeCheck(h: number, m: number): number[] {
  if (m >= 60) {
    m -= 60;
    h++;
  }
  if (h >= 24) h -= 24;
  return [h, m];
}

/**
 * Gets "Estimated Time En-Route"
 *
 * @param {Number} d The distance to the destination
 * @param {Boolean} a Is the aircraft in arrival
 * @returns {Array} The time after <code>timeCheck(h, m)</code>
 */
function getETE(d: number, a: boolean): number[] {
  const hours = d / geofs.aircraft.instance.animationValue.ktas;
  const h = parseInt(hours.toString());
  let m = Math.round(60 * (hours - h));
  if (a)
    m += Math.round(geofs.aircraft.instance.animationValue.altitude / 4000);
  return timeCheck(h, m);
}

/**
 * Gets "Estimated Time of Arrival"
 *
 * @param {Number} hours Hours
 * @param {Number} minutes Minutes
 * @returns {Array} The timer after <code>timeCheck(hours, minutes)</code>
 */
function getETA(hours: number, minutes: number): number[] {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  h += hours;
  m += Number(minutes);
  return timeCheck(h, m);
}

/**
 * Helper method, format zeros
 *
 * @param {Number} i The number to be checked
 * @returns {String} The original number with 0's added
 *
 * @private
 */
function checkZeros(i: number): string {
  let toReturn: string;
  if (i < 10) toReturn = "0" + i;
  else toReturn = i.toString();

  return toReturn;
}

export default {
  EARTH_RADIUS_NM,
  FEET_TO_NM,
  NM_TO_FEET,
  toRadians,
  toDegrees,
  getGroundSpeed,
  getDistance,
  getBearing,
  getClimbrate,
  formatTime,
  timeCheck,
  getETE,
  getETA,
};
