export {};

// Run when the simulator is finished loading
const timer = setInterval(function () {
  if (
    !(
      L &&
      geofs &&
      geofs.aircraft &&
      geofs.aircraft.instance &&
      geofs.aircraft.instance.object3d &&
      window.navData.statusCode == 1 &&
      window.autopilot_pp?.ready
    )
  )
    return;
  clearInterval(timer);
  window.fmc = {
    version: "0.6.0",
    ready: false,
    require: __webpack_require__,
  };
  require("./ui/main");
}, 250);
