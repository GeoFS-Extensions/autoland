"use strict";
(function () {
  "use strict";
  requirejs.config({
    urlArgs: "_=" + Date.now(),
    paths: {
      knockout: "../node_modules/knockout/build/output/knockout-latest",
      text: "../node_modules/text/text",
      minify: "../node_modules/minify/minify",
    },
  });
})();
