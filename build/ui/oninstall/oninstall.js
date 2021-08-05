"use strict";
/* eslint @typescript-eslint/no-unused-vars: 0 */
/**
 * Requests the tabs permission from the user.
 */
function requestPermission() {
  chrome.permissions.contains(
    {
      permissions: ["tabs"],
    },
    function (result) {
      if (result) {
        alert("You already have the tabs permission enabled!");
      } else {
        chrome.permissions.request({
          permissions: ["tabs"],
        });
      }
    }
  );
}
window.onload = function () {
  const button = document.getElementById("permissionRequestButton");
  button.addEventListener("click", function () {
    requestPermission();
  });
};
