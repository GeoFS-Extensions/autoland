export {};

// Run when the simulator is finished loading
const timer = setInterval(function () {
  if (
    !(
      geofs &&
      geofs.aircraft &&
      geofs.aircraft.instance &&
      geofs.aircraft.instance.object3d &&
      window.keyboard_mapping?.ready
    )
  )
    return;
  clearInterval(timer);
  window.spoilers_arming = {
    version: "1.1.2",
    require: __webpack_require__,
  };
  require("./ui/main");
}, 250);
