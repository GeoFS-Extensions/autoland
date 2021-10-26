/*!
 * @license Copyright (c) Karl Cheng 2013-17
 * Licensed under the GNU General Public Licence, version 3 or later.
 * See the LICENSE.md file for details.
 */
"use strict";
// Make sure code is run after GEFS is ready.
(function () {
  function checkKeyboardMapping() {
    var _a = window.keyboard_mapping;
    return _a === null || _a === void 0 ? false : _a.ready;
  }

  function load() {
    require(["./build/ui/main"]);
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
})();
