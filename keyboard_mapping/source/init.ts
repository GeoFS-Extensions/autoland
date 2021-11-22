export {};

// Run when the simulator is finished loading
const timer = setInterval(function () {
  if (
    !(
      geofs &&
      geofs.aircraft &&
      geofs.aircraft.instance &&
      geofs.aircraft.instance.object3d &&
      !!localStorage.getItem("settings")
    )
  ) {
    return;
  }

  clearInterval(timer);
  window.keyboard_mapping = {
    version: "1.0.2",
    ready: false,
    require: __webpack_require__,
  };
  require("./ui/main");
}, 250);
