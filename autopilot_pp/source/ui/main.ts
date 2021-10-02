"use strict";

// Create the user interface for users to interact with Autopilot++.
// TODO: add current mode indicator
define([
  "knockout",
  "autopilot",
  "ui/apdisconnectsound",
  "ui/autopilot",
  "enablekcas",
  "bugfixes/papi",
  "bugfixes/restrictions",
  "text!ui/ui.html",
  "text!ui/ui.css",
], function (
  ko,
  ap,
  apDisconnectSound,
  AutopilotVM,
  enableKcas,
  papiBugfix,
  restrictionsBugfix,
  uihtml,
  uicss
) {
  function stopImmediatePropagation(event) {
    event.stopImmediatePropagation();
  }

  // Apply CSS for Autopilot++ to the document.
  $("<style>").text(uicss).appendTo("head");

  // Replace CSS class to avoid nasty override issues with GEFS styling.
  var $ap = $(".geofs-autopilot")
    .removeClass("geofs-autopilot")
    .prop("id", "Qantas94Heavy-ap")
    .keydown(stopImmediatePropagation)
    .html(uihtml);

  // Set ` key for autopilot disconnect, like the red sidestick button.
  if (window.keyboard_mapping) {
    const addKeybind = window.keyboard_mapping.require("addKeybind");
    addKeybind(
      "",
      () => {
        window.controls.autopilot.turnOff();
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
        if (e.code === "Backquote") window.controls.autopilot.turnOff();
      } else if (e.which === 192) window.controls.autopilot.turnOff();
    });
  }

  // Play autopilot disconnect sound when autopilot is turned off.
  ap.on.subscribe(function (newValue) {
    if (!newValue && window.geofs.preferences.sound) apDisconnectSound.play();
  });

  papiBugfix();
  restrictionsBugfix();
  enableKcas();

  var viewModel = new AutopilotVM();
  ko.applyBindings(viewModel, $ap[0]);

  // when AP++ is injected, a content script is injected with it that fetches the json and adds it to the global context

  // GEFS's use of the Material Design Lite library requires that components dynamically added
  // are 'upgraded' manually.
  /* global componentHandler */
  window.componentHandler.upgradeElements($ap[0]);
  return viewModel;
});
