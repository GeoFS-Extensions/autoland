import * as ko from "knockout";
import { debug } from "./debug";
import { waypoint } from "./get";
import { flight } from "./flight";
import { log } from "./log";
// import { polyline } from './polyline';
import { utils } from "./utils";
import { lnav } from "./nav/LNAV";
import { progress } from "./nav/progress";

// Autopilot++ Dependencies
const autopilot = window.autopilot_pp.require("./build/autopilot.js").default,
  gc = window.autopilot_pp.require("./build/greatcircle.js").default,
  icao = window.navData.airports;

const route = ko.observableArray<Waypoint>();
const nextWaypoint = ko.observable<number>(null);

/**
 * Waypoint object to distinguish between each route item
 */
class Waypoint {
  // Waypoint name
  private readonly _wpt = ko.observable<string>();
  private isValid: boolean;
  readonly wpt = ko.pureComputed<string>({
    read: this._wpt,
    write: (val: string) => {
      this._wpt(val);

      const coords = waypoint(val, getIndex(this));
      this.isValid = Boolean(coords && coords[0] && coords[1]);

      this.lat(this.isValid ? coords[0] : this.lat());
      this.lon(this.isValid ? coords[1] : this.lon());
      this.info(this.isValid ? coords[2] : undefined);

      // if (!isValid) self.marker(val);
      // else self.marker(val);
    },
  });

  // Latitude
  private readonly _lat = ko.observable<number>();

  readonly lat = ko.pureComputed<number, Waypoint>({
    read: this._lat,
    write: (val: number) => {
      val = formatCoords(val.toString());
      this._lat(!isNaN(val) ? val : undefined);
      this.valid(Boolean(this.isValid));
      // this.marker(this.wpt(), L.latLng(val, this.lon()));
    },
  });

  // Longitude
  private readonly _lon = ko.observable<number>();
  readonly lon = ko.pureComputed<number, Waypoint>({
    read: this._lon,
    write: (val: number) => {
      val = formatCoords(val.toString());
      this._lon(!isNaN(val) ? val : undefined);
      this.valid(Boolean(this.isValid));
      // this.marker(this.wpt(), L.latLng(this.lat(), val));    }
    },
  });

  // Restriction altitude
  readonly alt = ko.observable();

  // Is waypoint valid
  readonly valid = ko.observable<boolean>(false);

  // Waypoint info
  readonly info = ko.observable();

  // Distance from previous waypoint
  readonly distFromPrev = ko.pureComputed(() => {
    return getInfoFromPrev(this)[0];
  });

  // Bearing from previous waypoint
  readonly brngFromPrev = ko.pureComputed(() => {
    return getInfoFromPrev(this)[1];
  });
  /*
  var markerSettings = {
  	map: ui.map,
  	icon: {
  		url: PAGE_PATH + 'images/waypoint.png',
  		scaledSize: new google.maps.Size(24, 24),
  		anchor: new google.maps.Point(12, 12),
  		zIndex: 1000
  	}
  };

  var markerIcon =  L.icon({
  	iconUrl: PAGE_PATH + 'images/waypoint.png',
  	iconSize: [24, 24],
  	iconAnchor: [12, 12],
  });

  // Waypoint marker
  var _marker = ko.observable();
  self.marker = ko.pureComputed({
  	read: _marker,
  	write: function (wptName, coords) {
  		var markerOption = {
  			icon: markerIcon,
  			title: wptName
  		};
  
  		if (coords && !isNaN(coords.lat) && !isNaN(coords.lng)) {
  			_marker(L.marker(coords, markerOption).addTo(ui.mapInstance));
  			var index = getIndex(self);
  
  			// If path at this index exists, amend it
  			if (polyline.path.getLatLngs()[index])
  				polyline.setAt(index, coords);
  			else polyline.insertAt(index, coords);
  		}
  	}
  });
  */
}

// Makes llaLocation an observable for automatic data updates
const llaLocation = ko.observable<number[]>();
setInterval(() => {
  llaLocation(geofs.aircraft.instance.llaLocation);
}, 1000);

/**
 * Computes heading and bearing information from previous waypoint to current
 *
 * @param {Waypoint} self Current `Waypoint` object
 * @returns {Number[]} [distance, bearing]
 *
 * @private
 */
function getInfoFromPrev(self: Waypoint): number[] {
  let distance: number, bearing: number;
  const index = getIndex(self);

  // Calculates info from current location
  // if waypoint is at the start of the list or
  // if current waypoint is activated
  if (index === 0 || index === nextWaypoint()) {
    const pos = llaLocation() || [];

    distance = utils.getDistance(pos[0], pos[1], self.lat(), self.lon());
    bearing = utils.getBearing(pos[0], pos[1], self.lat(), self.lon());
  }

  // Else, calculates info from preceeding waypoint
  else if (index) {
    const prev = route()[index - 1];

    distance = utils.getDistance(
      prev.lat(),
      prev.lon(),
      self.lat(),
      self.lon()
    );
    bearing = utils.getBearing(prev.lat(), prev.lon(), self.lat(), self.lon());
  }

  return [Math.round(distance * 10) / 10 || null, Math.round(bearing) || null];
}

/**
 * Finds what index a Waypoint is in the route array
 *
 * @param {Waypoint} self Current `Waypoint` object
 * @returns {Number} Index
 */
function getIndex(self: Waypoint): number {
  let index: number;
  for (index = 0; index < route().length; index++) {
    if (self === route()[index]) {
      break;
    }
  }
  return index;
}

/**
 * Defines method to move elements in the route array
 *
 * @param {Number} index1 The start index
 * @param {Number} index2 The end/target index
 *
 * @private
 */
function move(index1: number, index2: number) {
  const tempRoute = route();

  if (index2 >= tempRoute.length) {
    let k = index2 - tempRoute.length;
    while (k-- + 1) {
      tempRoute.push(undefined);
    }
  }
  tempRoute.splice(index2, 0, tempRoute.splice(index1, 1)[0]);

  // Sets tempRoute as the new route
  route(tempRoute);

  // Moves map path
  // var cur = polyline.path.getLatLngs()[index1];
  // polyline.deleteAt(index1);
  // polyline.insertAt(index2, cur);
}

/**
 * Turns the waypoints into an array
 *
 * @returns {string[]} The array of waypoint names
 */
function makeFixesArray(): string[] {
  const result: string[] = [];

  const departureVal = flight.departure.airport();
  if (departureVal) result.push(departureVal);

  route().forEach((rte) => {
    result.push(rte.wpt());
  });

  const arrivalVal = flight.arrival.airport();
  if (arrivalVal) result.push(arrivalVal);

  return result;
}

/**
 * Joins the fixes array into a string
 *
 * @returns {String} All waypoints, each seperated by a space
 */
function toFixesString(): string {
  return makeFixesArray().join(" ");
}

/**
 * Makes a sharable route
 *
 * @returns {String} A sharable route with airports and waypoints,
 * 					using `JSON.stringify` method
 */
function toRouteString(): string {
  const normalizedRoute: (number | string | boolean)[][] = [];

  for (let i = 0; i < route().length; i++) {
    normalizedRoute.push([
      route()[i].wpt(),
      route()[i].lat(),
      route()[i].lon(),
      route()[i].alt(),
      route()[i].valid(),
      route()[i].info(),
    ]);
  }

  return JSON.stringify([
    flight.departure.airport() || "",
    flight.arrival.airport() || "",
    flight.number() || "",
    normalizedRoute,
  ]);
}

/**
 * Turns the coordinate entered from minutes-seconds format to decimal format
 *
 * @param {String} a Coordinate in minutes-seconds format
 * @returns {Number} Coordinate in decimal format
 */
function formatCoords(a: string): number {
  a = String(a);

  if (a.indexOf(" ") > -1) {
    const array = a.split(" ");
    const d = Number(array[0]);
    const m = Number(array[1]) / 60;
    let coords;
    if (d < 0) coords = d - m;
    else coords = d + m;
    return +coords.toFixed(6);
  } else return a === "" ? NaN : Number(a);
}

/**
 * Turns a normal waypoints input or shared waypoints string into waypoints
 *
 * @param {String} s Input of waypoints or a shared/generated route
 */
function toRoute(s: string) {
  if (!s) {
    log.warn("Please enter waypoints separated by spaces or a generated route");
    return;
  }

  s = s.trim(); // Removes leading or trailing whitespace for more accurate loading

  // If it is a generated route
  if (s.indexOf('["') === 0) {
    loadFromSave(s);
    return;
  }

  let isWaypoints = true;
  let a: number,
    b: number,
    str: string[] = [];

  str = s.toUpperCase().split(" ");

  // Check if inputs are valid
  for (let i = 0; i < str.length; i++)
    if (str[i].length > 5 || str[i].length < 1 || !/^\w+$/.test(str[i]))
      isWaypoints = false;

  // If the first or last is departure or arrival airport
  const departure = !!icao[str[0]];
  const arrival = !!icao[str[str.length - 1]];

  // If input is invalid, exit function call
  if (!isWaypoints) {
    log.warn("Invalid Waypoints Input");
    return;
  }

  // Removes all waypoint
  removeWaypoint(true);

  // Departure airport input/clear
  if (departure) {
    const wpt = str[0];
    flight.departure.airport(wpt);
    a = 1;
  } else {
    a = 0;
    flight.departure.airport(undefined);
  }

  // Arrival airport input/clear
  if (arrival) {
    const wpt = str[str.length - 1];
    flight.arrival.airport(wpt);
    b = 1;
  } else {
    b = 0;
    flight.arrival.airport(undefined);
  }

  // Adds all waypoints into waypoint input area
  for (let q = a; q < str.length - b; q++) {
    addWaypoint();
    route()[q - a].wpt(str[q]);
  }
}

/**
 * Adds 1 waypoint input field to end of waypoints list
 */
function addWaypoint() {
  route.push(new Waypoint());
  if (typeof componentHandler === "object") componentHandler.upgradeDom();
  debug.stopPropagation();
}

/**
 * Removes a waypoint
 *
 * @param {Number} n The index of which will be removed
 * @param {Object} [data] Passed in by knockout
 * @param {Object} [event] Passed in by knockout
 */
function removeWaypoint(
  n: number | boolean,
  data?: Record<string, any>,
  event?: KeyboardEvent
) {
  const isRemoveAll = (event && event.shiftKey) || typeof n === "boolean";
  if (isRemoveAll) {
    // route().forEach(function(e) {
    // 	e.marker().remove();
    // });
    route.removeAll();
    // polyline.path.setLatLngs([]);
  } else {
    // route()[n].marker().remove();
    // polyline.removeAt(n);
    if (typeof n === "number") {
      route.splice(n, 1);
    }
  }

  if (nextWaypoint() === n || isRemoveAll) {
    activateWaypoint(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore I'm not sure what's causing this error (only when compiling).
  } else if (nextWaypoint() === Number(n) + 1) activateWaypoint(n);
  else if (nextWaypoint() > n) nextWaypoint(nextWaypoint() - 1);
}

/**
 * Activates a waypoint or deactivates if the waypoint is already activated
 *
 * @param {Number | false} n The index (starts with 0) to be activated or deactivated
 *		{Boolean} If false, deactivates all waypoints
 */
function activateWaypoint(n: number | false) {
  if (n !== false && nextWaypoint() !== n) {
    if (n < route().length) {
      nextWaypoint(n);
      const rte = route()[nextWaypoint()];

      // FIXME once waypoint mode is fixed, convert to waypoint mode
      gc.latitude(rte.lat());
      gc.longitude(rte.lon());
      autopilot.currentMode(1); // Switches to Lat/Lon mode
      debug.log(
        "Waypoint # " + Number(Number(n) + 1) + " activated | index: " + n
      );
    } else {
      // FIXME once waypoint mode is fixed, convert to waypoint mode
      if (flight.arrival.coords()[1]) {
        gc.latitude(flight.arrival.coords()[1]);
        gc.longitude(flight.arrival.coords()[2]);
      }
      nextWaypoint(null);
    }
  } else {
    nextWaypoint(null);
    gc.latitude(undefined);
    gc.longitude(undefined);
    autopilot.currentMode(0);
  }

  lnav.update();
  progress.update();
}

/**
 * Prints waypoint info to info section above each waypoint
 * Applies to ROUTE [and LEGS] TODO
 * Record in route array
 *
 * @param {Number} index The index of the element
 * @param {String} info
 */
function printWaypointInfo(index: number, info: string) {
  if (!info) info = "";
  route()[index].info(info);
}

/**
 * Gets the next waypoint that has an altitude restriction
 *
 * @returns {Number} The index of the waypoint if eligible,
 * 		   -1 if not eligible
 */
function getNextWaypointWithAltRestriction(): number {
  if (nextWaypoint() === null) return -1;

  for (let i = nextWaypoint(); i < route().length; i++) {
    if (route()[i] && route()[i].alt()) return i;
  }

  return -1;
}

/**
 * Saves the waypoints data into localStorage
 */
function saveData() {
  if (route().length < 1 || !route()[0].wpt()) {
    log.warn("There is no route to save");
  } else {
    localStorage.removeItem("fmcWaypoints");
    localStorage.setItem("fmcWaypoints", toRouteString());
  }
}

/**
 * Retrieves the saved data and adds to the waypoint list
 *
 * @param {String} arg The generated route
 */
function loadFromSave(arg?: string) {
  /**
   * The argument passed in [optional] or the localStorage is a
   * 3D array in String format. arr is the array after JSON.parse
   *
   * @param {String} arg Parses into {Array} arr
   *
   * 			{String} arr[0] Departure input,
   *  		{String} arr[1] Arrival Input,
   *  		{String} arr[2] Flight Number,
   *  		{Array} arr[3] 2D array, the route
   */

  arg = arg || localStorage.getItem("fmcWaypoints");
  const arr = JSON.parse(arg);
  localStorage.removeItem("fmcWaypoints");

  if (arr) {
    // Clears all
    removeWaypoint(true);

    const rte = arr[3];

    // JSON.stringify turns undefined into null; this loop turns it back
    // TODO: can this be optimized?
    for (let i = 0; i < rte.length; i++) {
      for (let j = 0; j < rte[i].length; j++) {
        if (rte[i][j] === null) rte[i][j] = undefined;
      }
    }

    flight.departure.airport(arr[0]);
    flight.arrival.airport(arr[1]);
    flight.number(arr[2]);

    for (let i = 0; i < rte.length; i++) {
      addWaypoint();

      // Puts in the waypoint
      if (rte[i][0]) route()[i].wpt(rte[i][0]);

      // If the waypoint is not eligible or a manual input
      if (!rte[i][4] || !route()[i].lat()) {
        route()[i].lat(rte[i][1]); // Puts in the lat.
        route()[i].lon(rte[i][2]); // Puts in the lon.
      }

      route()[i].alt(rte[i][3]); // Restriction altitude

      if (!route()[i].info()) route()[i].info(rte[i][5]); // Waypoint info
    }
    // Auto-saves the data once again
    saveData();
  } else
    log.warn("There is no saved route or the browser's cache was cleared.");
}

/**
 * Shifts a waypoint up or down one step
 *
 * @param {Number} oldIndex Index of this waypoint
 * @param {Number} value Direction (+/-) and quantity moved
 */
function shiftWaypoint(oldIndex: number, value: number) {
  debug.log(`Waypoint #${oldIndex + 1} (index=${oldIndex}) shifted ${value}`);

  const newIndex = oldIndex + value;

  // Makes sure waypoints at the end of the route stays unchanged
  if (
    (value < 0 && newIndex >= 0) ||
    (value > 0 && newIndex <= route().length - 1)
  ) {
    move(oldIndex, newIndex);

    if (nextWaypoint() === newIndex) {
      activateWaypoint(oldIndex);
    } else if (nextWaypoint() === oldIndex) {
      activateWaypoint(newIndex);
    }
  }
}

export const waypoints = {
  route,
  nextWaypoint,
  makeFixesArray,
  toFixesString,
  toRouteString,
  formatCoords,
  toRoute,
  addWaypoint,
  removeWaypoint,
  activateWaypoint,
  printWaypointInfo,
  saveData,
  loadFromSave,
  shiftWaypoint,
  nextWptAltRes: getNextWaypointWithAltRestriction,
  getCoords: waypoint,
};
