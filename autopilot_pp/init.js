"use strict";

var timer = setInterval(function () {
  if (
    !(
      window.geofs &&
      window.geofs.canvas &&
      window.geofs.aircraft &&
      window.geofs.aircraft.instance &&
      window.geofs.aircraft.instance.object3d &&
      window.navData.statusCode === 1 &&
      window.keyboard_mapping?.ready
    )
  )
    return;
  clearInterval(timer);
  window.autopilot_pp = {};
  window.autopilot_pp.version = "0.12.0";
  window.autopilot_pp.ready = false;
  require("./source/ui/main");
  window.autopilot_pp.require = __webpack_require__;
}, 250);
