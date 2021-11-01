import addKeybind from "./addKeybind";
import keybinds from "./keyboardMapping";

// adds all the default geofs keybinds.
export default function () {
  addKeybind(
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
    "keyDown",
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
