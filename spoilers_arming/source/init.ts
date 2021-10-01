"use strict";

(function () {
  // Check if game has completed loading
  var timer = setInterval(function () {
    if (
      !(
        window.geofs &&
        window.geofs.aircraft &&
        window.geofs.aircraft.instance &&
        window.geofs.aircraft.instance.object3d &&
        window?.keyboard_mapping?.ready
      )
    )
      return;

    clearInterval(timer);

    require(["ui/main"]);
  }, 250);
})();
