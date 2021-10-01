"use strict";

// Prevent aircraft from exceeding limits of altitude and speed.
define(function () {
  function restrictionsBugfix() {
    var speedTimer, partsTimer, deleteTimer, deleteTimeout, oldMaxRPM;
    var activated = false;

    var restrictedAircraft = new Set();
    restrictedAircraft.add("4"); // KLM 737
    restrictedAircraft.add("5"); // Phenom 100
    restrictedAircraft.add("17"); // MD-11
    restrictedAircraft.add("10"); // A380

    function checkSpeedAndAltitude() {
      var values = window.geofs.aircraft.instance.animationValue;
      var maxLimits = window.geofs.aircraft.instance.setup.maxLimits;
      var maxMach = maxLimits ? maxLimits[0] : 1;
      var maxAltitude = maxLimits ? maxLimits[1] : 44444;
      if (values.mach < maxMach && values.altitude < maxAltitude) return;

      clearInterval(speedTimer);
      speedTimer = undefined;
      activated = true;

      // Hey, can't fly without wings, can you?!
      window.geofs.aircraft.instance.airfoils.forEach(function (airfoil) {
        if (airfoil.area) airfoil.area /= 128;
        else if (airfoil.liftFactor) airfoil.liftFactor /= 128;
      });

      // Show some evil smoke!
      // ParticuleEmitter is spelt incorrectly in GEFS, as well as using "new" for a function with
      // side effects.
      new window.geofs.fx.ParticuleEmitter({
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
      window.geofs.aircraft.instance.engines.forEach(function (engine) {
        engine.thrust /= 16384;
      });

      // Display thrust as zero.
      oldMaxRPM = window.geofs.aircraft.instance.setup.maxRPM;
      window.geofs.aircraft.instance.setup.maxRPM =
        window.geofs.aircraft.instance.setup.minRPM + 1;

      // Let's have the parts a-flyin'!
      partsTimer = setInterval(function () {
        window.geofs.aircraft.instance.object3d._children.forEach(function (
          object
        ) {
          var position = object._localposition;
          for (var i = 0; i < 2; i++) position[i] *= 1.01;
        });
      }, 100);

      deleteTimeout = setTimeout(function () {
        clearInterval(partsTimer);
        var i = 0;

        // Bye bye parts!!!
        var parts = window.geofs.aircraft.instance.object3d._children;
        deleteTimer = setInterval(function () {
          ++i;

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
      var maxLimits = window.geofs.aircraft.instance.setup.maxLimits;
      return (
        restrictedAircraft.has(window.geofs.aircraft.instance.id) || maxLimits
      );
    }

    function addRestrictions() {
      if (matchesName()) speedTimer = setInterval(checkSpeedAndAltitude, 5000);
    }

    var oldReset = window.geofs.aircraft.Aircraft.prototype.reset;
    window.geofs.aircraft.Aircraft.prototype.reset = function (bOnTheGround) {
      clearTimeout(deleteTimeout);

      clearInterval(deleteTimer);
      clearInterval(partsTimer);
      clearInterval(speedTimer);

      if (activated) {
        window.geofs.aircraft.instance.airfoils.forEach(function (airfoil) {
          if (airfoil.area) airfoil.area *= 128;
          else if (airfoil.liftFactor) airfoil.liftFactor *= 128;
        });

        window.geofs.aircraft.instance.engines.forEach(function (engine) {
          engine.thrust *= 16384;
        });

        window.geofs.aircraft.instance.setup.maxRPM = oldMaxRPM;
        activated = false;
      }

      addRestrictions();
      oldReset.call(this, bOnTheGround);
    };

    // Aircraft setup object might not be loaded yet.
    var setupLoadTimer = setInterval(function () {
      if (window.geofs.aircraft.instance.setup) {
        clearInterval(setupLoadTimer);
        addRestrictions();
      }
    }, 1000);
  }

  return restrictionsBugfix;
});
