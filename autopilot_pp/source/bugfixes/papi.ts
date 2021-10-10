import util from "../util";

function papiBugfix() {
  // Make the angles used for PAPI more strict.  Assumes a 3 degree glideslope.
  const papiValues = [3.5, 19 / 6, 17 / 6, 2.5];
  const aircraft = geofs.aircraft.instance;

  function setPapi() {
    const collResult = geofs.getGroundAltitude(
      this.location[0],
      this.location[1]
    );
    this.location[2] = collResult.location[2];
    const relativeAicraftLla = [
      aircraft.llaLocation[0],
      aircraft.llaLocation[1],
      this.location[2],
    ];

    const distance = geofs.utils.llaDistanceInMeters(
      relativeAicraftLla,
      this.location,
      this.location
    );

    const height = aircraft.llaLocation[2] - this.location[2];
    const path = util.rad2deg(Math.atan2(height, distance));

    const lights = this.lights;
    papiValues.forEach(function (slope, i) {
      const belowAngle = path < slope;
      lights[i].red.setVisibility(belowAngle);
      lights[i].white.setVisibility(!belowAngle);
    });
  }

  geofs.fx.papi.prototype.refresh = function () {
    this.papiInterval = setInterval(() => {
      setPapi.call(this);
    }, 1000);
  };

  // Make sure PAPI refresh function is updated if already loaded.
  Object.keys(geofs.fx.litRunways).forEach(function (id) {
    const runway = geofs.fx.litRunways[id];

    runway.papis.forEach(function (papi) {
      // Stop old PAPI update function.
      clearInterval(papi.papiInterval);

      // Start new PAPI refresh function.
      papi.refresh();
    });
  });
}

export default papiBugfix;
