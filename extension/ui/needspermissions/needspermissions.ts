// this is a fix for chrome not allowing modules
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const module = {};

export = {};

/**
 * Requests the tabs permission from the user.
 */
function requestPermission(): void {
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
