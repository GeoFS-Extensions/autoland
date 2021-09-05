(function () {
  const scriptTag = document.createElement("script");
  scriptTag.src = chrome.runtime.getURL(
    "scripts/autopilot_pp_infra/dom_communicator.js"
  );
  scriptTag.onload = function () {
    scriptTag.remove();
  };
  (document.head || document.documentElement).appendChild(scriptTag);
})();

document.addEventListener("readyForDataLinks", () => {
  document.dispatchEvent(
    new CustomEvent("dataLinkMessageEvent", {
      detail: {
        airports: chrome.runtime.getURL("data/airports.json"),
        waypoints: chrome.runtime.getURL("data/waypoints.json"),
        navaids: chrome.runtime.getURL("data/navaids.json"),
      },
    })
  );
});
