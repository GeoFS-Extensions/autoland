"use strict";
import * as ko from "knockout";
import ap from "../autopilot";
import apDisconnectSound from "./apdisconnectsound";
import AutopilotVM from "./autopilot";
import enableKcas from "../enablekcas";
import papiBugfix from "../bugfixes/papi";
import restrictionsBugfix from "../bugfixes/restrictions";
import uihtml from "./ui.html";
import uicss from "./ui.css";

// Create the user interface for users to interact with Autopilot++.
// TODO: add current mode indicator

function stopImmediatePropagation(event: Event) {
  event.stopImmediatePropagation();
}

// Apply CSS for Autopilot++ to the document.
$("<style>").text(uicss).appendTo("head");

// Replace CSS class to avoid nasty override issues with GEFS styling.
const $ap = $(".geofs-autopilot")
  .removeClass("geofs-autopilot")
  .prop("id", "Qantas94Heavy-ap")
  .on("keydown", stopImmediatePropagation)
  .html(uihtml);

// Set ` key for autopilot disconnect, like the red sidestick button.
if (window.keyboard_mapping) {
  const addKeybind = window.keyboard_mapping.require(
    "./build/addKeybind.js"
  ).default;
  addKeybind(
    "",
    () => {
      controls.autopilot.turnOff();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Backquote",
    }
  );
} else {
  document.addEventListener("keydown", function (e) {
    // Use KeyboardEvent.code if supported, otherwise use KeyboardEvent.which.
    if ("code" in e) {
      if (e.code === "Backquote") controls.autopilot.turnOff();
    } else if (e.which === 192) controls.autopilot.turnOff();
  });
}

// Play autopilot disconnect sound when autopilot is turned off.
ap.on.subscribe(function (newValue) {
  if (!newValue && geofs.preferences.sound) apDisconnectSound.play();
});

papiBugfix();
restrictionsBugfix();
enableKcas();

const viewModel = new AutopilotVM();
ko.applyBindings(viewModel, $ap[0]);

// when AP++ is injected, a content script is injected with it that fetches the json and adds it to the global context

// GEFS's use of the Material Design Lite library requires that components dynamically added
// are 'upgraded' manually.
/* global componentHandler */
componentHandler.upgradeElements($ap[0]);
export default viewModel;
