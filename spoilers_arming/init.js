"use strict";
(function () {
  // Check if game has completed loading
  var timer = setInterval(function () {
    var _a;
    if (
      !((window.geofs &&
        window.geofs.aircraft &&
        window.geofs.aircraft.instance &&
        window.geofs.aircraft.instance.object3d &&
        // transpiled version of window.keyboard_mapping?.ready
        (_a = window.keyboard_mapping) === null) ||
      _a === void 0
        ? void 0
        : _a.ready)
    )
      return;
    clearInterval(timer);
    require(["./build/ui/main"]);
  }, 250);
})();