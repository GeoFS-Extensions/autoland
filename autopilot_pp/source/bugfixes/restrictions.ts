// Prevent aircraft from exceeding limits of altitude and speed.
function restrictionsBugfix() {
  let speedTimer, partsTimer, deleteTimer, deleteTimeout, oldMaxRPM;
  let activated = false;

  const restrictedAircraft = new Set();
  restrictedAircraft.add("4"); // KLM 737
  restrictedAircraft.add("5"); // Phenom 100
  restrictedAircraft.add("17"); // MD-11
  restrictedAircraft.add("10"); // A380

  function checkSpeedAndAltitude() {
    const values = geofs.aircraft.instance.animationValue;
    const maxLimits = geofs.aircraft.instance.setup.maxLimits;
    const maxMach = maxLimits ? maxLimits[0] : 1;
    const maxAltitude = maxLimits ? maxLimits[1] : 44444;
    if (values.mach < maxMach && values.altitude < maxAltitude) return;

    clearInterval(speedTimer);
    speedTimer = undefined;
    activated = true;

    // Hey, can't fly without wings, can you?!
    geofs.aircraft.instance.airfoils.forEach(function (airfoil) {
      if (airfoil.area) airfoil.area /= 128;
      else if (airfoil.liftFactor) airfoil.liftFactor /= 128;
    });

    // Show some evil smoke!
    // ParticuleEmitter is spelt incorrectly in GEFS, as well as using "new" for a function with
    // side effects.
    new geofs.fx.ParticuleEmitter({
      anchor: { worldPosition: [0, 0, 0] },
      duration: 30000,
      rate: 0.05,
      life: 2000,
      startScale: 1,
      endScale: 50,
      startOpacity: 100,
      endOpacity: 1,
      texture: "darkSmoke",
    });

    // Disable the thrust.
    geofs.aircraft.instance.engines.forEach(function (engine) {
      engine.thrust /= 16384;
    });

    // Display thrust as zero.
    oldMaxRPM = geofs.aircraft.instance.setup.maxRPM;
    geofs.aircraft.instance.setup.maxRPM =
      geofs.aircraft.instance.setup.minRPM + 1;

    // Let's have the parts a-flyin'!
    partsTimer = setInterval(function () {
      geofs.aircraft.instance.object3d._children.forEach(function (object) {
        const position = object._localposition;
        for (let i = 0; i < 2; i++) position[i] *= 1.01;
      });
    }, 100);

    deleteTimeout = setTimeout(function () {
      clearInterval(partsTimer);
      let i = 0;

      // Bye bye parts!!!
      const parts = geofs.aircraft.instance.object3d._children;
      deleteTimer = setInterval(function () {
        i++;

        // Hide the part of aircraft.
        if (i === parts.length) {
          // Remove the body last.
          parts[0].visible = false;
          clearInterval(deleteTimer);
        } else parts[i].visible = false;
      }, 300);
    }, 12000);
  }

  function matchesName() {
    const maxLimits = geofs.aircraft.instance.setup.maxLimits;
    return restrictedAircraft.has(geofs.aircraft.instance.id) || maxLimits;
  }

  function addRestrictions() {
    if (matchesName()) speedTimer = setInterval(checkSpeedAndAltitude, 5000);
  }

  const oldReset = geofs.aircraft.Aircraft.prototype.reset;
  geofs.aircraft.Aircraft.prototype.reset = function (bOnTheGround) {
    clearTimeout(deleteTimeout);

    clearInterval(deleteTimer);
    clearInterval(partsTimer);
    clearInterval(speedTimer);

    if (activated) {
      geofs.aircraft.instance.airfoils.forEach(function (airfoil) {
        if (airfoil.area) airfoil.area *= 128;
        else if (airfoil.liftFactor) airfoil.liftFactor *= 128;
      });

      geofs.aircraft.instance.engines.forEach(function (engine) {
        engine.thrust *= 16384;
      });

      geofs.aircraft.instance.setup.maxRPM = oldMaxRPM;
      activated = false;
    }

    addRestrictions();
    oldReset.call(this, bOnTheGround);
  };

  // Aircraft setup object might not be loaded yet.
  const setupLoadTimer = setInterval(function () {
    if (geofs.aircraft.instance.setup) {
      clearInterval(setupLoadTimer);
      addRestrictions();
    }
  }, 1000);
}

export default restrictionsBugfix;
