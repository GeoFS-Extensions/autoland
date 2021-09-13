interface dataLinkMessageEvent extends Event {
  detail: {
    airports: string;
    waypoints: string;
    navaids: string;
  };
}

document.addEventListener(
  "dataLinkMessageEvent",
  function (event: dataLinkMessageEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const links = event.detail;

    (function () {
      // airport database
      fetch(links.airports)
        .then((resp) => resp.json())
        .then((json) => (window.navData.airports = json));

      // waypoint database
      fetch(links.waypoints)
        .then((resp) => resp.json())
        .then((json) => (window.navData.waypoints = json));

      // navaids database
      fetch(links.navaids)
        .then((resp) => resp.json())
        .then((json) => (window.navData.navaids = json));

      window.navData.statusCode = 1;
    })();
  }
);

window.navData = {
  statusCode: 0,
  airports: {},
  navaids: {},
  waypoints: {},
};

document.dispatchEvent(new CustomEvent("readyForDataLinks", {}));
