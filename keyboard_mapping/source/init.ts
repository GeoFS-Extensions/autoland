"use strict";

(function () {
  if (!window.Promise) throw new Error("Browser is outdated.");

  // Check if game has completed loading
  var timer = setInterval(function () {
    if (
      !(
        window.geofs &&
        window.geofs.aircraft &&
        window.geofs.aircraft.instance &&
        window.geofs.aircraft.instance.object3d &&
        !!localStorage.getItem("settings")
      )
    ) {
      return;
    }

    clearInterval(timer);
    require(["ui/main"]);
  }, 250);
})();
