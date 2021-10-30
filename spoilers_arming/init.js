"use strict";
// Check if game has completed loading
var timer = setInterval(function () {
  if (
    !(
      window.geofs &&
      window.geofs.aircraft &&
      window.geofs.aircraft.instance &&
      window.geofs.aircraft.instance.object3d &&
      window.keyboard_mapping?.ready
    )
  )
    return;
  clearInterval(timer);
  window.spoilers_arming = {};
  window.spoilers_arming.version = "1.1.2";
  require("./source/ui/main");
  window.spoilers_arming.require = __webpack_require__;
}, 250);
