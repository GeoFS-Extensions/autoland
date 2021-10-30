"use strict";
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
  window.keyboard_mapping = {};
  window.keyboard_mapping.version = "1.0.2";
  window.keyboard_mapping.ready = false;

  require("./source/ui/main");
  window.keyboard_mapping.require = __webpack_require__;
}, 250);
