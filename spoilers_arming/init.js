"use strict";
(function () {
  // Check if game has completed loading
  var timer = setInterval(function () {
    var _a;
    if (
      !(
        window.geofs &&
        window.geofs.aircraft &&
        window.geofs.aircraft.instance &&
        window.geofs.aircraft.instance.object3d &&
        ((_a =
          window === null || window === void 0
            ? void 0
            : window.keyboard_mapping) === null || _a === void 0
          ? void 0
          : _a.ready)
      )
    )
      return;
    clearInterval(timer);

    /* global require */ // because for some reason eslint was thinking require is undefined.
    require(["./build/ui/main"]);
  }, 250);
})();
