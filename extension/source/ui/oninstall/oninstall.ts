export default {};

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
  document.getElementById("tutorial").style.display = "none";
  const button = document.getElementById("permissionRequestButton");
  button.addEventListener("click", function () {
    requestPermission();
    document.getElementById("tutorial").style.display = "";
    document.getElementById("permissionRequest").style.display = "none";
  });
};
