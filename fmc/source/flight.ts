import * as ko from "knockout";
import get from "./get";
import lnav from "./nav/LNAV";
import vnav from "./nav/VNAV";

// Autopilot++ Dependencies
const icao = window.navData.airports;

// Top Of Descent distance
const todDist = ko.observable<number>();

// If VNAV is enabled
const _vnavEnabled = ko.observable<boolean>(false);
const vnavEnabled = ko.pureComputed<boolean>({
  read: _vnavEnabled,
  write: function (boolean) {
    const set = _vnavEnabled;

    if (!cruiseAlt()) set(false);
    else if (boolean) {
      vnav.timer = setInterval(function () {
        vnav.update();
      }, 5000);
      set(true);
    } else {
      clearInterval(vnav.timer);
      vnav.timer = null;
      set(false);
    }
  },
});

// Speed control
const spdControl = ko.observable<boolean>(true);

/**
 * departure object: airport, coords, runway, and SID
 */
const _departureAirport = ko.observable<string>();
const _departureCoords = ko.observable<number[]>([]);
const _selectedDepartureRwy = ko.observable();
const _selectedSID = ko.observable();

// List of runways and SIDs
const _departureRwys = ko.pureComputed(function () {
  const depArpt = departure.airport();
  const depSID = departure.SID() ? departure.SID().name : undefined;

  return get.runway(depArpt, depSID, true);
});
const _SIDs = ko.pureComputed(function () {
  const depArpt = departure.airport();
  const depRwy = departure.runway() ? departure.runway().runway : undefined;
  const depSID = departure.SID() ? departure.SID().name : undefined;

  return get.SID(depArpt, depRwy, depSID);
});

const departure = {
  // Departure airport name
  airport: ko.pureComputed({
    read: _departureAirport,
    write: function (airport) {
      const oldAirport = _departureAirport();
      const coords = icao[airport];

      if (airport !== oldAirport) departure.runway(undefined);

      if (!coords) {
        _departureAirport(undefined);
        _departureCoords([]);
      } else {
        _departureAirport(airport);
        _departureCoords(coords);
      }

      lnav.update();
    },
  }),

  // Departure airport coordinates
  coords: ko.pureComputed(function () {
    return _departureCoords();
  }),

  // Departure runway data
  runway: ko.pureComputed({
    read: _selectedDepartureRwy,
    write: function (index) {
      const rwyData = _departureRwys()[index];

      if (rwyData) _selectedDepartureRwy(rwyData);
      else {
        _selectedDepartureRwy(undefined);
        departure.SID(undefined);
      }
    },
  }),

  // SID data
  SID: ko.pureComputed({
    read: _selectedSID,
    write: function (index) {
      const SIDData = _SIDs()[index];
      _selectedSID(SIDData);
    },
  }),
};

/**
 * arrival object: airport, coords, runway, and SID
 */
const _arrivalAirport = ko.observable<string>();
const _arrivalCoords = ko.observable<number[]>([]);
const _selectedArrivalRwy = ko.observable();
const _selectedSTAR = ko.observable();

// List of runways and STARs
const _arrivalRwys = ko.pureComputed(function () {
  return get.runway(arrival.airport());
});
const _STARs = ko.pureComputed(function () {
  return get.SID(
    arrival.airport(),
    arrival.runway() ? arrival.runway().runway : false
  );
});

const arrival = {
  // Arrival airport name
  airport: ko.pureComputed({
    read: _arrivalAirport,
    write: function (airport) {
      const oldAirport = _arrivalAirport();
      const coords = icao[airport];

      if (airport !== oldAirport) arrival.runway(undefined);

      if (!coords) {
        _arrivalAirport(undefined);
        _arrivalCoords([]);
      } else {
        _arrivalAirport(airport);
        _arrivalCoords(coords);
      }
      lnav.update();
    },
  }),

  // Arrival airport coordinates
  coords: ko.pureComputed(function () {
    return _arrivalCoords();
  }),

  // Arrival runway data
  runway: ko.pureComputed({
    read: _selectedArrivalRwy,
    write: function (index) {
      const rwyData = _arrivalRwys()[index];

      if (rwyData) _selectedArrivalRwy(rwyData);
      else {
        _selectedArrivalRwy(undefined);
        arrival.STAR(undefined);
      }
    },
  }),

  // STAR data
  STAR: ko.pureComputed({
    read: _selectedSTAR,
    write: function (index) {
      const STARData = _STARs()[index];
      _selectedSTAR(STARData);
    },
  }),
};

// Flight Number
const flightNumber = ko.observable<string>();

// Cruise altitude
const _cruiseAlt = ko.observable<number>();
const cruiseAlt = ko.pureComputed<number>({
  read: _cruiseAlt,
  write: function (val) {
    const set = _cruiseAlt;

    if (!val) {
      set(undefined);
      vnavEnabled(false);
    } else set(+val);
  },
});

// Flight phase
const _phase = ko.observable<number>(0);
const phase = ko.pureComputed<number>({
  read: _phase,
  write: function (index) {
    if (phaseLocked() || index > 3) return;
    _phase(index);
  },
});

const _phaseLocked = ko.observable<boolean>(false);

const phaseLocked = ko.pureComputed<boolean>({
  read: _phaseLocked,
  write: function (boolean) {
    _phaseLocked(boolean);
  },
});

// Automatic TOD calculation
const todCalc = ko.observable<boolean>(false);

// Arrival Airport field altitude
const fieldElev = ko.observable<number>();

export default {
  todDist,
  vnavEnabled,
  spdControl,
  departure,
  arrival,
  number: flightNumber,
  cruiseAlt,
  phase,
  phaseLocked,
  todCalc,
  fieldElev,
};
