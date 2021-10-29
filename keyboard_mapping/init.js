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
  /* global require */ // because for some reason eslint was thinking require is undefined.
  require("./build/ui/main");
  /* global __webpack_require__ */ // Added by webpack.
  window.keyboard_mapping.require = __webpack_require__;
}, 250);
