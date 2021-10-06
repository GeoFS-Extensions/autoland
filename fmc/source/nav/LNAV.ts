import distance from "../distance";
import flight from "../flight";
import waypoints from "../waypoints";

var timer = null;

/**
 * Controls LNAV, plane's lateral navigation, set on a timer
 */
const update = function () {
  if (waypoints.nextWaypoint() === null || !flight.arrival.airport()) {
    clearInterval(timer);
    timer = null;
    return;
  }

  var d = distance.route(waypoints.nextWaypoint() + 1);
  if (d <= distance.turn(60)) {
    waypoints.activateWaypoint(waypoints.nextWaypoint() + 1);
  }

  clearInterval(timer);
  if (d < geofs.aircraft.instance.animationValue.ktas / 60)
    timer = setInterval(update, 500);
  else timer = setInterval(update, 5000);
};

export default {
  timer: timer,
  update: update,
};
