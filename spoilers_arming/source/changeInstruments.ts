define(["globalVariables"], function (globalVariables) {
  return () => {
    window.instruments.definitions.spoilersArming = {
      overlay: {
        url: "https://raw.githubusercontent.com/GeoFS-Autoland/spoilers-arming/main/images/spoilersArm.png",
        alignment: { x: "right", y: "bottom" },
        size: { x: 100, y: 21 },
        position: { x: 20, y: 195 },
        anchor: { x: 100, y: 0 },
        rescale: true,
        rescalePosition: true,
        animations: [
          {
            type: "show",
            value: "spoilersArmed",
          },
        ],
      },
    };

    var oldInit = window.instruments.init;
    window.instruments.init = function (instrumentList) {
      const aircraftWithBadlyImplementedSpoilers = [
        "2871",
        "2865",
        "2870",
        "2769",
        "2772",
      ];
      if (
        typeof instrumentList.spoilers !== "undefined" ||
        aircraftWithBadlyImplementedSpoilers.includes(
          window.geofs.aircraft.instance.aircraftRecord.id
        )
      ) {
        globalVariables.enabled(true);
        instrumentList.spoilersArming = instrumentList.spoilers;
      } else {
        globalVariables.enabled(undefined);
      }

      oldInit(instrumentList);
    };
  };
});
