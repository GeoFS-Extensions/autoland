define(["./addKeybind", "./keyboardMapping"], function (
  addKeybind: (
    label: string,
    callback: callback,
    defaultKeybind: Keybind
  ) => void,
  keybinds: KnockoutComputed<Keybinds>
) {
  // adds all the default geofs keybinds.
  return function () {
    addKeybind(
      "Toggle Autopilot",
      () => {
        window.controls.setters.toggleAutoPilot.set();
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
      (event: KeyboardEvent) => {
        window.controls.states.left = !0;
        event.returnValue = !1;
        window.controls.keyboard.override = !0;
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
      (event: KeyboardEvent) => {
        window.controls.states.right = !0;
        event.returnValue = !1;
        window.controls.keyboard.override = !0;
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
      (event: KeyboardEvent) => {
        window.controls.states.up = !0;
        event.returnValue = !1;
        window.controls.keyboard.override = !0;
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
      (event: KeyboardEvent) => {
        window.controls.states.down = !0;
        event.returnValue = !1;
        window.controls.keyboard.override = !0;
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
      (event: KeyboardEvent) => {
        window.controls.states.rudderLeft = !0;
        event.returnValue = !1;
        window.controls.keyboard.overrideRudder = !0;
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
      (event: KeyboardEvent) => {
        window.controls.states.rudderRight = !0;
        event.returnValue = !1;
        window.controls.keyboard.overrideRudder = !0;
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
      (event: KeyboardEvent) => {
        window.controls.states.increaseThrottle = !0;
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
      (event: KeyboardEvent) => {
        window.controls.states.increaseThrottle = !0;
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
      (event: KeyboardEvent) => {
        window.controls.states.increaseThrottle = !0;
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
      (event: KeyboardEvent) => {
        window.controls.states.decreaseThrottle = !0;
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
        window.controls.setters.setBrakes.set();
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
        window.controls.setters.toggleParkingBrake.set();
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
        window.geofs.aircraft.instance.engine.on
          ? window.geofs.aircraft.instance.stopEngine()
          : window.geofs.aircraft.instance.startEngine();
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
        window.controls.setters.setGear.set();
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
        window.controls.setters.setFlapsDown.set();
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
        window.controls.setters.setFlapsUp.set();
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
        window.controls.setters.setAirbrakes.set();
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
        window.controls.setters.setOptionalAnimatedPart.set();
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
        window.controls.setters.setElevatorTrimDown.set();
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
        window.controls.setters.setElevatorTrimUp.set();
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
        window.controls.setters.setElevatorTrimNeutral.set();
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
        window.controls.recenter();
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
        window.controls.controlKeyPressed = !0;
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
      (event: KeyboardEvent) => {
        window.flight.recorder.playing &&
          (window.flight.recorder.exitPlayback(), event.preventDefault());
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
        window.flight.recorder.enterPlayback();
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
        window.audio.toggleMute();
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
        window.geofs.togglePause();
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
        window.geofs.camera.cycle();
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
        window.ui.panel.toggle(".geofs-map-list");
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
        window.ui.panel.toggle(".geofs-preference-list");
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
        window.geofs.flyToCamera();
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
        window.instruments.toggle();
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
        window.controls.setMode("mouse");
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
        window.controls.setMode("keyboard");
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
        window.controls.setMode("joystick");
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
        window.geofs.camera.animations.orbitHorizontal.active =
          !window.geofs.camera.animations.orbitHorizontal.active;
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
        window.geofs.resetFlight();
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
        window.geofs.camera.animations.orbitVertical.active =
          !window.geofs.camera.animations.orbitVertical.active;
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
        window.geofs.camera.setRotation(45);
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
        window.geofs.camera.setRotation(0);
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
        window.geofs.camera.setRotation(-45);
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
        window.geofs.camera.setRotation(90);
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
        window.geofs.camera.setToNeutral();
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
        window.geofs.camera.setRotation(-90);
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
        window.geofs.camera.setRotation(135);
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
        window.geofs.camera.setRotation(180);
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
        window.geofs.camera.setRotation(-135);
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
        window.controls.throttle = 0;
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
        window.controls.throttle = 1 / 9;
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
        window.controls.throttle = 2 / 9;
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
        window.controls.throttle = 3 / 9;
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
        window.controls.throttle = 4 / 9;
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
        window.controls.throttle = 5 / 9;
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
        window.controls.throttle = 6 / 9;
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
        window.controls.throttle = 7 / 9;
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
        window.controls.throttle = 8 / 9;
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
        window.controls.throttle = 9 / 9;
      },
      {
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        code: "Digit9",
      }
    );
  };
});
