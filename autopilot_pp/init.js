"use strict";
function checkKeyboardMapping() {
  var _a = window.keyboard_mapping;
  return _a === null || _a === void 0 ? false : _a.ready;
}

function load() {
  require("./build/ui/main");
  /* global __webpack_require__ */ // Added by webpack.
  window.autopilot_pp.require = __webpack_require__;
}

var timer = setInterval(function () {
  if (
    !(
      window.geofs &&
      window.geofs.canvas &&
      window.geofs.aircraft &&
      window.geofs.aircraft.instance &&
      window.geofs.aircraft.instance.object3d &&
      window.navData.statusCode === 1 &&
      checkKeyboardMapping()
    )
  )
    return;
  clearInterval(timer);
  load();
}, 250);
