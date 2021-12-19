export {};

// Run when the simulator is finished loading
const timer = setInterval(function () {
  if (
    !(
      geofs &&
      geofs.canvas &&
      geofs.aircraft &&
      geofs.aircraft.instance &&
      geofs.aircraft.instance.object3d &&
      window.navData.statusCode === 1 &&
      window.keyboard_mapping?.ready
    )
  )
    return;
  clearInterval(timer);
  window.autopilot_pp = {
    version: "0.12.0",
    ready: false,
    require: __webpack_require__,
  };
  require("./ui/main");
}, 250);
