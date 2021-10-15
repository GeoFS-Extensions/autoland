import * as ko from "knockout";
import utils from "./utils";

let mainTimer: number = null;
let speedTimer: number = null;

const data = ko.observableArray<(string | number)[]>();

/**
 * Updates plane's flight log, set on a timer
 *
 * @param {String} [other] Updates the log with other as extra info
 */
const update = function (other?: string) {
  if (!geofs.pause && !(flight.recorder.playing || flight.recorder.paused)) {
    const spd = Math.round(geofs.aircraft.instance.animationValue.ktas);
    const hdg = Math.round(geofs.aircraft.instance.animationValue.heading360);
    const alt = Math.round(geofs.aircraft.instance.animationValue.altitude);
    const fps = +geofs.debug.fps;
    const lat =
      Math.round(10000 * geofs.aircraft.instance.llaLocation[0]) / 10000;
    const lon =
      Math.round(10000 * geofs.aircraft.instance.llaLocation[1]) / 10000;
    const date = new Date();
    const h = date.getUTCHours();
    const m = date.getUTCMinutes();
    const time = utils.formatTime(utils.timeCheck(h, m));
    other = other || "--";

    const dataArray = [time, spd, hdg, alt, lat, lon, fps, other];
    data.push(dataArray);
  }
  if (mainTimer !== null) {
    clearInterval(mainTimer);
  }
  if (geofs.aircraft.instance.animationValue.altitude > 18000) {
    mainTimer = setInterval(update, 120000);
  } else mainTimer = setInterval(update, 30000);
};

/**
 * Checks for overspeed under 10000 feet AGL for log, set on a timer
 */
const speed = function () {
  const kcas: number = geofs.aircraft.instance.animationValue.kcas;
  const altitude: number =
    geofs.aircraft.instance.animationValue.altitude +
    geofs.groundElevation * METERS_TO_FEET;
  if (kcas > 255 && altitude < 10000) {
    update("Overspeed");
  }
  if (speedTimer !== null) {
    clearInterval(speedTimer);
  }
  if (altitude < 10000) speedTimer = setInterval(speed, 15000);
  else speedTimer = setInterval(speed, 30000);
};

/**
 * Clears the log
 */
const removeData = function () {
  data.removeAll();
};

// things used in in ui/ViewModel#28
const modalWarning: ko.Observable<string> = ko.observable(undefined);

const warn = ko.pureComputed<string>({
  // Prints modal warning, disappears after 5 seconds
  read: modalWarning,
  write: function (warningText) {
    modalWarning(warningText);
    setTimeout(function () {
      modalWarning(undefined);
    }, 5000);
  },
});

export default {
  data,
  update,
  speed,
  removeData,
  modalWarning,
  warn,
};
