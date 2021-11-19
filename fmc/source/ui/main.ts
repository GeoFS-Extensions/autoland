import * as ko from "knockout";
import { ViewModel } from "./ViewModel";
import { positioningFMC } from "./position";
import { log } from "../log";
import { polyline } from "../polyline";
import { waypoints } from "../waypoints";
import { progress } from "../nav/progress";
import { E } from "./elements";
import "../redefine";

// If UI is properly placed, load FMC
positioningFMC.then(loadFMC);

// FMC actions init function
function loadFMC() {
  const modal = E.modal,
    container = E.container,
    btn = E.btn;

  // Applies knockout bindings
  const vm = new ViewModel();
  ko.applyBindings(vm, $(modal)[0]);
  ko.applyBindings(vm, $(btn.fmcBtn)[1]);
  ko.applyBindings(vm, $(container.uiBottomProgInfo)[0]);

  // Inits waypoint field
  // HACK: opens nav tab to make sure map imagery loads
  new Promise<void>((resolve) => {
    ui.panel.toggle(".geofs-map-list");
    ui.createMap();
    const timer = setInterval(function () {
      if (!ui?.mapInstance?.apiMap?.map) return;
      clearInterval(timer);
      resolve();
    }, 250);
  }).then(function () {
    polyline.path.addTo(ui?.mapInstance?.apiMap?.map);
    waypoints.addWaypoint();
  });

  /* ---- UI actions binding ---- */

  // Modal actions: close on button click
  $(modal).keydown(function (event) {
    // Sets escape button to close FMC
    if ((event.which === 27 || event.keyCode === 27) && $(this).is(":visible"))
      $(modal).removeClass("opened");
  });

  // IDEA Move to knockout?
  // Modal tab contents: toggle
  $(container.tabBar).on("click", "a", function (event) {
    event.preventDefault();
    const c = "is-active";
    const $this = $(this);
    const $that = $(container.tabBar).find("." + c);
    const interactive = $this.attr("interactive");

    // Interactive actions button
    $(btn.interactive).removeClass(c);
    if (interactive) $(interactive).addClass(c);

    $(container.modalContent).find($that.attr("to")).removeClass(c);
    $(container.modalContent).find($this.attr("to")).addClass(c);
    $that.removeClass(c);
    $this.addClass(c);
  });

  /* ---- All Initializations ---- */

  // Initializes all timers
  progress.update();
  log.update();
  log.speed();
  window.fmc.ready = true;
}
