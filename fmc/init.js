/**
 * @license Copyright (c) 2016-2017 Harry Xue, (c) 2016-2017 Ethan Shields
 * Released under the GNU Affero General Public License, v3.0 or later
 * https://github.com/geofs-plugins/fmc-requirejs/blob/master/LICENSE.md
 */
"use strict";
// Check if game has completed loading
var timer = setInterval(function () {
  if (
    !(
      window.L &&
      window.geofs &&
      window.geofs.aircraft &&
      window.geofs.aircraft.instance &&
      window.geofs.aircraft.instance.object3d &&
      window.navData.statusCode == 1 &&
      window.autopilot_pp.ready
    )
  )
    return;
  clearInterval(timer);
  require("./build/ui/main");
  /* global __webpack_require__ */ // Added by webpack.
  window.fmc.require = __webpack_require__;
}, 250);