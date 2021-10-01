"use strict";

define(["exports"], function (exports) {
  var FILE_PATH = window.PAGE_PATH + "fmc/compile/compiled-data/";

  exports.waypoints = [];
  exports.navaids = [];

  exports.waypoints = window.navData.waypoints;

  exports.navaids = window.navData.navaids;
});
