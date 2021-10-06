import E from "./elements";
import button from "../html/button.html";
import externalDist from "../html/externaldist.html";
import modal from "../html/modal.html";
import tabContents from "../html/tab-contents/main";
import mainCSS from "../style/main";

export default new Promise<void>(function (resolve) {
  // Main FMC stylesheet
  $("<style>").addClass("fmc-stylesheet").text(mainCSS).appendTo("head");

  // Inits Modal dialog
  $(modal).appendTo("body");

  // Inits tab contents
  $(tabContents).appendTo(E.container.modalContent);

  // FMC toggle button
  $(button).insertAfter(
    'button.geofs-f-standard-ui[data-toggle-panel=".geofs-map-list"]'
  );

  // External Distance indicator
  $(externalDist).appendTo(".geofs-ui-bottom");

  resolve();
});
