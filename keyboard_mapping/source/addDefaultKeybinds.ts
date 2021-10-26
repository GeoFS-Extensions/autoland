import addKeybind from "./addKeybind";
import keybinds from "./keyboardMapping";

// adds all the default geofs keybinds.
export default function () {
  addKeybind(
    "Toggle Autopilot",
    () => {
      controls.setters.toggleAutoPilot.set();
    },
    keybinds()["Toggle Autopilot"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyA",
    }
  );
  addKeybind(
    "Bank left",
    (event) => {
      controls.states.left = !0;
      event.returnValue = !1;
      controls.keyboard.override = !0;
    },
    keybinds()["Bank left"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "ArrowLeft",
    }
  );
  addKeybind(
    "Bank right",
    (event) => {
      controls.states.right = !0;
      event.returnValue = !1;
      controls.keyboard.override = !0;
    },
    keybinds()["Bank right"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "ArrowRight",
    }
  );
  addKeybind(
    "Pitch down",
    (event) => {
      controls.states.up = !0;
      event.returnValue = !1;
      controls.keyboard.override = !0;
    },
    keybinds()["Pitch down"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "ArrowUp",
    }
  );
  addKeybind(
    "Pitch up",
    (event) => {
      controls.states.down = !0;
      event.returnValue = !1;
      controls.keyboard.override = !0;
    },
    keybinds()["Pitch up"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "ArrowDown",
    }
  );
  addKeybind(
    "Steer left",
    (event) => {
      controls.states.rudderLeft = !0;
      event.returnValue = !1;
      controls.keyboard.overrideRudder = !0;
    },
    keybinds()["Steer left"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Comma",
    }
  );
  addKeybind(
    "Steer right",
    (event) => {
      controls.states.rudderRight = !0;
      event.returnValue = !1;
      controls.keyboard.overrideRudder = !0;
    },
    keybinds()["Steer right"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Period",
    }
  );
  addKeybind(
    "Increase throttle",
    (event) => {
      controls.states.increaseThrottle = !0;
      event.returnValue = !1;
    },
    keybinds()["Increase throttle"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "NumpadAdd",
    }
  );
  addKeybind(
    `${/* Increase throttle*/ ""}`,
    (event) => {
      controls.states.increaseThrottle = !0;
      event.returnValue = !1;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "PageUp",
    }
  );
  addKeybind(
    "Decrease throttle",
    (event) => {
      controls.states.increaseThrottle = !0;
      event.returnValue = !1;
    },
    keybinds()["Decrease throttle"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "NumpadSubtract",
    }
  );
  addKeybind(
    `${/* Decrease throttle*/ ""}`,
    (event) => {
      controls.states.decreaseThrottle = !0;
      event.returnValue = !1;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "PageDown",
    }
  );
  addKeybind(
    "Brakes",
    () => {
      controls.setters.setBrakes.set();
    },
    keybinds()["Brakes"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Space",
    }
  );
  addKeybind(
    "Parking brake",
    () => {
      controls.setters.toggleParkingBrake.set();
    },
    keybinds()["Parking brake"] || {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Semicolon",
    }
  );
  addKeybind(
    "Engine switch (on/off)",
    () => {
      geofs.aircraft.instance.engine.on
        ? geofs.aircraft.instance.stopEngine()
        : geofs.aircraft.instance.startEngine();
    },
    keybinds()["Engine switch (on/off)"] || {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: "KeyE",
    }
  );
  addKeybind(
    "Gear toggle (up/down)",
    () => {
      controls.setters.setGear.set();
    },
    keybinds()["Gear toggle (up/down)"] || {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: "KeyG",
    }
  );
  addKeybind(
    "Lower flaps",
    () => {
      controls.setters.setFlapsDown.set();
    },
    keybinds()["Lower flaps"] || {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: "BracketLeft",
    }
  );
  addKeybind(
    "Raise flaps",
    () => {
      controls.setters.setFlapsUp.set();
    },
    keybinds()["Raise flaps"] || {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: "BracketRight",
    }
  );
  addKeybind(
    "Airbrake toggle (on/off)",
    () => {
      controls.setters.setAirbrakes.set();
    },
    keybinds()["Airbrake toggle (on/off)"] || {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: "KeyB",
    }
  );
  addKeybind(
    "Optional Animated Part toggle (on/off)",
    () => {
      controls.setters.setOptionalAnimatedPart.set();
    },
    keybinds()["Optional Animated Part toggle (on/off)"] || {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: "KeyX",
    }
  );
  addKeybind(
    "Elevator trim down",
    () => {
      controls.setters.setElevatorTrimDown.set();
    },
    keybinds()["Elevator trim down"] || {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: "End",
    }
  );
  addKeybind(
    "Elevator trim up",
    () => {
      controls.setters.setElevatorTrimUp.set();
    },
    keybinds()["Elevator trim up"] || {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: "Home",
    }
  );
  addKeybind(
    "Elevator trim neutral",
    () => {
      controls.setters.setElevatorTrimNeutral.set();
    },
    keybinds()["Elevator trim neutral"] || {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      code: "Delete",
    }
  );
  // Nameless Keybinds:
  addKeybind(
    "",
    () => {
      controls.recenter();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Enter",
    }
  );
  addKeybind(
    "",
    () => {
      controls.controlKeyPressed = !0;
    },
    {
      ctrlKey: true,
      shiftKey: false,
      altKey: false,
      code: "",
    }
  );
  addKeybind(
    "",
    (event) => {
      flight.recorder.playing &&
        (flight.recorder.exitPlayback(), event.preventDefault());
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Escape",
    }
  );
  addKeybind(
    "",
    () => {
      flight.recorder.enterPlayback();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyV",
    }
  );
  addKeybind(
    "",
    () => {
      audio.toggleMute();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyS",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.togglePause();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyP",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.cycle();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyC",
    }
  );
  addKeybind(
    "",
    () => {
      ui.panel.toggle(".geofs-map-list");
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyN",
    }
  );
  addKeybind(
    "",
    () => {
      ui.panel.toggle(".geofs-preference-list");
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyO",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.flyToCamera();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Tab",
    }
  );
  addKeybind(
    "",
    () => {
      instruments.toggle();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyH",
    }
  );
  addKeybind(
    "",
    () => {
      controls.setMode("mouse");
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyM",
    }
  );
  addKeybind(
    "",
    () => {
      controls.setMode("keyboard");
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyK",
    }
  );
  addKeybind(
    "",
    () => {
      controls.setMode("joystick");
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyJ",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.animations.orbitHorizontal.active =
        !geofs.camera.animations.orbitHorizontal.active;
    },
    {
      ctrlKey: true,
      shiftKey: false,
      altKey: false,
      code: "KeyQ",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.resetFlight();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "KeyR",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.animations.orbitVertical.active =
        !geofs.camera.animations.orbitVertical.active;
    },
    {
      ctrlKey: true,
      shiftKey: false,
      altKey: false,
      code: "KeyW",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.setRotation(45);
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Numpad1",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.setRotation(0);
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Numpad2",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.setRotation(-45);
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Numpad3",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.setRotation(90);
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Numpad4",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.setToNeutral();
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Numpad5",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.setRotation(-90);
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Numpad6",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.setRotation(135);
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Numpad7",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.setRotation(180);
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Numpad8",
    }
  );
  addKeybind(
    "",
    () => {
      geofs.camera.setRotation(-135);
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Numpad9",
    }
  );
  // Throttle shortcuts:
  addKeybind(
    "",
    () => {
      controls.throttle = 0;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit0",
    }
  );
  addKeybind(
    "",
    () => {
      controls.throttle = 1 / 9;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit1",
    }
  );
  addKeybind(
    "",
    () => {
      controls.throttle = 2 / 9;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit2",
    }
  );
  addKeybind(
    "",
    () => {
      controls.throttle = 3 / 9;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit3",
    }
  );
  addKeybind(
    "",
    () => {
      controls.throttle = 4 / 9;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit4",
    }
  );
  addKeybind(
    "",
    () => {
      controls.throttle = 5 / 9;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit5",
    }
  );
  addKeybind(
    "",
    () => {
      controls.throttle = 6 / 9;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit6",
    }
  );
  addKeybind(
    "",
    () => {
      controls.throttle = 7 / 9;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit7",
    }
  );
  addKeybind(
    "",
    () => {
      controls.throttle = 8 / 9;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit8",
    }
  );
  addKeybind(
    "",
    () => {
      controls.throttle = 9 / 9;
    },
    {
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      code: "Digit9",
    }
  );
}
