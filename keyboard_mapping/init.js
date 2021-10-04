"use strict";

(function () {
  if (!window.Promise) throw new Error("Browser is outdated.");

  // Check if game has completed loading
  var timer = setInterval(function () {
    if (
      !(
        geofs &&
        geofs.aircraft &&
        geofs.aircraft.instance &&
        geofs.aircraft.instance.object3d &&
        !!localStorage.getItem("settings")
      )
    ) {
      return;
    }

    clearInterval(timer);
    require(["./build/ui/main"]);
  }, 250);
})();
