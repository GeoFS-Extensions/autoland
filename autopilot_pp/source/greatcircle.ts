import * as ko from "knockout";
import util from "./util";

const lat = ko.observable();
const lon = ko.observable();

const atan2 = Math.atan2;
const sin = Math.sin;
const cos = Math.cos;

function getHeading() {
  const coords = geofs.aircraft.instance.llaLocation;
  const lat1 = util.deg2rad(coords[0]);
  const lon1 = util.deg2rad(coords[1]);
  const lat2 = util.deg2rad(lat());
  const lon2 = util.deg2rad(lon());

  if (!isFinite(lat2) || !isFinite(lon2)) return;

  const heading = util.rad2deg(
    atan2(
      sin(lon2 - lon1) * cos(lat2),
      cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(lon2 - lon1)
    )
  );

  return util.fixAngle360(heading);
}

const gc = {
  latitude: lat,
  longitude: lon,
  getHeading,
};

export default gc;
