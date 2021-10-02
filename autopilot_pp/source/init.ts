/*!
 * @license Copyright (c) Karl Cheng 2013-17
 * Licensed under the GNU General Public Licence, version 3 or later.
 * See the LICENSE.md file for details.
 */
"use strict";

// Make sure code is run after GEFS is ready.
(function () {
  function load() {
    require(["ui/main"]);
  }

  // Check if window.geofs.init has already been called.
  if (
    window.window.geofs &&
    window.geofs.canvas &&
    window.navData.statusCode == 1 &&
    window?.keyboard_mapping?.ready
  ) {
    load();
    return;
  }

  var timer = setInterval(function () {
    if (
      !window.window.geofs ||
      !window.geofs.init ||
      window.navData.statusCode != 1 ||
      !window?.keyboard_mapping?.ready
    )
      return;
    clearInterval(timer);

    // The original window.geofs.init function might have already run between two checks.
    if (window.geofs.canvas) load();
    else {
      var oldInit = window.geofs.init;

      window.geofs.init = function () {
        oldInit();
        load();
      };
    }
  }, 16);
})();
