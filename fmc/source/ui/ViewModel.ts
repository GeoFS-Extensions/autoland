import * as ko from "knockout";
import { flight } from "../flight";
import { SID, runway, STAR } from "../get";
import { log } from "../log";
import { waypoints } from "../waypoints";
import { progress } from "../nav/progress";

/**
 * ViewModel class for knockout bindings
 */
export class ViewModel {
  // Methods
  nextPhase() {
    const phase = flight.phase();
    flight.phase(phase === this.phaseToText.length - 1 ? 0 : phase + 1);
  }

  loadRoute() {
    waypoints.toRoute(this.loadRouteText());
    this.loadRouteText(undefined);
  }

  // Instance Variables
  private readonly _opened = ko.observable<boolean>(false);
  readonly opened = ko.pureComputed<boolean>({
    read: this._opened,
    write: (boolean: boolean) => {
      this._opened(boolean);
    },
  });

  readonly modalWarning = log.modalWarning;

  /***********
   * RTE Tab *
   ***********/
  readonly departureAirport = flight.departure.airport;
  readonly arrivalAirport = flight.arrival.airport;
  readonly flightNumber = flight.number;
  readonly route = waypoints.route;
  readonly nextWaypoint = waypoints.nextWaypoint;
  readonly saveWaypoints = waypoints.saveData;
  readonly retrieveWaypoints = waypoints.loadFromSave;
  readonly addWaypoint = waypoints.addWaypoint;
  readonly activateWaypoint = waypoints.activateWaypoint;
  readonly shiftWaypoint = waypoints.shiftWaypoint;
  readonly removeWaypoint = waypoints.removeWaypoint;

  /***************
   * DEP/ARR Tab *
   ***************/
  readonly fieldElev = flight.fieldElev;
  readonly todDist = flight.todDist;
  readonly todCalc = flight.todCalc;

  // this is another part of the old infrastructure that i can't be bothered to remove yet
  // List of departure runways based on departure airport and SID
  readonly departureRwyList = ko.pureComputed(() => {
    if (this.SIDName())
      return SID(
        this.departureAirport(),
        this.departureRwyName(),
        this.SIDName()
        // @ts-ignore excuse me?
      ).availableRunways;
    else return runway(this.departureAirport(), this.SIDName(), true);
  });

  // Selected departure runway and name
  readonly departureRunway = flight.departure.runway;
  readonly departureRwyName = ko.pureComputed(() => {
    if (this.departureRunway()) return this.departureRunway().runway;
    else return undefined;
  });

  // List of SIDs based on departure airport and runway
  readonly SIDList = ko.pureComputed(() => {
    return SID(this.departureAirport(), this.departureRwyName());
  });

  // Selected SID name
  readonly SID = flight.departure.SID;
  readonly SIDName = ko.pureComputed(() => {
    if (this.SID()) return this.SID().name;
    else return undefined;
  });

  // List of arrival runways based on arrival airport
  readonly arrivalRwyList = ko.pureComputed(() => {
    return runway(this.arrivalAirport());
  });

  // Selected arrival runway and name
  readonly arrivalRunway = flight.arrival.runway;
  readonly arrivalRunwayName = ko.pureComputed(() => {
    if (this.arrivalRunway()) return this.arrivalRunway().runway;
    else return undefined;
  });

  // List of STARs based on arrival airport and runway
  // FIXME: STARs do not necessarily need a runway at first
  readonly STARs = ko.pureComputed(() => {
    return STAR(this.arrivalAirport(), this.arrivalRunwayName());
  });

  // Selected STAR name
  readonly STAR = flight.arrival.STAR;
  readonly STARName = ko.pureComputed(() => {
    if (this.STAR()) return this.STAR().name;
    else return undefined;
  });

  /************
   * VNAV Tab *
   ************/
  readonly vnavEnabled = flight.vnavEnabled;
  readonly cruiseAlt = flight.cruiseAlt;
  readonly spdControl = flight.spdControl;
  readonly phase = flight.phase;
  readonly phaseLocked = flight.phaseLocked;

  private readonly phaseToText = ["climb", "cruise", "descent"];
  readonly currentPhaseText = ko.pureComputed(() => {
    return this.phaseToText[flight.phase()];
  });

  /************
   * PROG Tab *
   ************/
  readonly progInfo = progress.info;

  /************
   * LOAD Tab *
   ************/
  readonly loadRouteText = ko.observable<string>();

  private readonly generatedRouteText = ko.observable<string>();

  readonly generateRoute = ko.pureComputed({
    read: this.generatedRouteText,
    write: (isGenerate) => {
      const generatedRoute = isGenerate ? waypoints.toRouteString() : undefined;
      this.generatedRouteText(generatedRoute);
    },
  });

  /***********
   * LOG Tab *
   ***********/
  readonly logData = log.data;
  readonly removeLogData = log.removeData;
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
