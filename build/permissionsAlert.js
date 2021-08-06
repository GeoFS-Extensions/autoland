"use strict";
chrome.runtime.sendMessage({ hasTabsPermission: true }, (response) => {
  if (!response) {
    let confrimStr =
      "The GeoFS Autoland extension will no work, because the tabs permission is not available.\n";
    confrimStr +=
      "Click OK to add the permission, and Cancel to continue without the extension";
    const addTabs = confirm(confrimStr);
    if (addTabs) {
      const url = chrome.runtime.getURL("ui/oninstall/oninstall.html");
      window.open(url, "_blank");
    }
  }
});
