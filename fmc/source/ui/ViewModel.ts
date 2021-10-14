/* eslint-disable @typescript-eslint/no-this-alias */ /* I'll fix this later */
import * as ko from "knockout";
import flight from "../flight";
import get from "../get";
import log from "../log";
import waypoints from "../waypoints";
import progress from "../nav/progress";

/**
 * ViewModel function for knockout bindings
 */
function ViewModel() {
  const self = this;

  /*************************
   * General Modal Actions *
   *************************/
  const _opened = ko.observable(false);
  // @ts-ignore
  self.opened = ko.pureComputed({
    read: _opened,
    write: function (boolean, _vm) {
      _opened(boolean);
    },
  });

  //self.modalWarning = ko.observable();
  self.modalWarning = log.modalWarning;

  /***********
   * RTE Tab *
   ***********/
  self.departureAirport = flight.departure.airport;
  self.arrivalAirport = flight.arrival.airport;
  self.flightNumber = flight.number;
  self.route = waypoints.route;
  self.nextWaypoint = waypoints.nextWaypoint;
  self.saveWaypoints = waypoints.saveData;
  self.retrieveWaypoints = waypoints.loadFromSave;
  self.addWaypoint = waypoints.addWaypoint;
  self.activateWaypoint = waypoints.activateWaypoint;
  self.shiftWaypoint = waypoints.shiftWaypoint;
  self.removeWaypoint = waypoints.removeWaypoint;

  /***************
   * DEP/ARR Tab *
   ***************/
  self.fieldElev = flight.fieldElev;
  self.todDist = flight.todDist;
  self.todCalc = flight.todCalc;

  // List of departure runways based on departure airport and SID
  self.departureRwyList = ko.pureComputed(function () {
    if (self.SIDName())
      return get.SID(
        self.departureAirport(),
        self.departureRwyName(),
        self.SIDName()
        // @ts-ignore excuse me?
      ).availableRunways;
    else return get.runway(self.departureAirport(), self.SIDName(), true);
  });

  // Selected departure runway and name
  self.departureRunway = flight.departure.runway;
  self.departureRwyName = ko.pureComputed(function () {
    if (self.departureRunway()) return self.departureRunway().runway;
    else return undefined;
  });

  // List of SIDs based on departure airport and runway
  self.SIDList = ko.pureComputed(function () {
    return get.SID(self.departureAirport(), self.departureRwyName());
  });

  // Selected SID name
  self.SID = flight.departure.SID;
  self.SIDName = ko.pureComputed(function () {
    if (self.SID()) return self.SID().name;
    else return undefined;
  });

  // List of arrival runways based on arrival airport
  self.arrivalRwyList = ko.pureComputed(function () {
    return get.runway(self.arrivalAirport());
  });

  // Selected arrival runway and name
  self.arrivalRunway = flight.arrival.runway;
  self.arrivalRunwayName = ko.pureComputed(function () {
    if (self.arrivalRunway()) return self.arrivalRunway().runway;
    else return undefined;
  });

  // List of STARs based on arrival airport and runway
  // FIXME: STARs do not necessarily need a runway at first
  self.STARs = ko.pureComputed(function () {
    return get.STAR(self.arrivalAirport(), self.arrivalRunwayName());
  });

  // Selected STAR name
  self.STAR = flight.arrival.STAR;
  self.STARName = ko.pureComputed(function () {
    if (self.STAR()) return self.STAR().name;
    else return undefined;
  });

  /************
   * VNAV Tab *
   ************/
  self.vnavEnabled = flight.vnavEnabled;
  self.cruiseAlt = flight.cruiseAlt;
  self.spdControl = flight.spdControl;
  self.phase = flight.phase;
  self.phaseLocked = flight.phaseLocked;

  const phaseToText = ["climb", "cruise", "descent"];
  self.currentPhaseText = ko.pureComputed(function () {
    return phaseToText[flight.phase()];
  });

  self.nextPhase = function () {
    const phase = flight.phase();

    flight.phase(phase === phaseToText.length - 1 ? 0 : phase + 1);
  };

  /************
   * PROG Tab *
   ************/
  self.progInfo = progress.info;

  // LOAD tab
  self.loadRouteText = ko.observable();
  self.loadRoute = function () {
    waypoints.toRoute(self.loadRouteText());
    self.loadRouteText(undefined);
  };

  const generatedRouteText = ko.observable();
  // @ts-ignore
  self.generateRoute = ko.pureComputed({
    read: generatedRouteText,
    write: function (isGenerate, _vm) {
      const generatedRoute = isGenerate ? waypoints.toRouteString() : undefined;
      generatedRouteText(generatedRoute);
    },
  });

  /***********
   * LOG Tab *
   ***********/
  self.logData = log.data;
  self.removeLogData = log.removeData;
}

/**
 * Handles CSS of MDL switch buttons
 */
ko.bindingHandlers.mdlSwitch = {
  update: function (element, _unused, bindings) {
    // Listens for 'checked' binding
    const isChecked = bindings.get("checked");
    if (isChecked) isChecked();

    // Listens for 'disable' binding
    bindings.get("disable");

    const materialSwitch = element.parentNode.MaterialSwitch;
    if (!materialSwitch) return;

    materialSwitch.checkDisabled();
    materialSwitch.checkToggleState();
  },
};

/**
 * Handles CSS of MDL textfields
 */
ko.bindingHandlers.mdlTextfield = {
  update: function (element, _unused, bindings) {
    // Listens for 'value' binding
    const hasValue = bindings.get("value");
    if (hasValue) hasValue();

    const materialTextfield = element.parentNode.MaterialTextfield;
    if (!materialTextfield) return;

    materialTextfield.checkDirty();
    materialTextfield.checkDisabled();
    materialTextfield.checkFocus();
    materialTextfield.checkValidity();
  },
};

export default ViewModel;
