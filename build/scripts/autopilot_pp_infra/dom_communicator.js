"use strict";
/* eslint-env jquery */
document.addEventListener("dataLinkMessageEvent", function (event) {
  const links = event.detail;
  const timerNum = setInterval(() => {
    if (typeof fetch === "function") {
      clearInterval(timerNum);
      // airport database
      fetch(links.airports)
        .then((resp) => resp.json())
        .then((json) => (window.navData.airports = json));
      // waypoint database
      fetch(links.waypoints)
        .then((resp) => resp.json())
        .then((json) => (window.navData.waypoints = json));
    }
  }, 150);
  window.navData.statusCode = 1;
});
window.navData = {
  statusCode: 0,
  airports: {},
  waypoints: {},
};
document.dispatchEvent(new CustomEvent("readyForDataLinks", {}));
