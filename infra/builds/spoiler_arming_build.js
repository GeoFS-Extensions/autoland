const { execSync } = require("child_process");
const { join } = require("path");
const { chdir } = require("process");
const homeDir = require("../main_dir");
const { optimize } = require("requirejs");
const { appendFileSync } = require("fs-extra");

let options = {
  baseUrl: ".",
  name: "../node_modules/requirejs/require",
  include: "init",
  mainConfigFile: "./config.js",
  out: "../extension/source/scripts/spoilers_arming.js",
  optimize: "none",
  generateSourceMaps: false,
};

/**
 * Appends the infrastructure to the script file.
 * @param {string} file The string of the file to append to.
 */
function appendToFile(file) {
  let spoilerArmingAppend = "\nvar a = window.spoilers_arming = {};";
  spoilerArmingAppend += 'a.version="1.1.2";';
  spoilerArmingAppend += "a.require=require;";
  spoilerArmingAppend += "a.requirejs=requirejs;";
  spoilerArmingAppend += "a.define=define;";

  appendFileSync(file, spoilerArmingAppend);
}

/**
 * Builds spoilers arming.
 * @param {boolean} debug Whether the script should be built for debugging.
 */
function build(debug) {
  // if we want to build the script for debugging
  if (!debug) {
    options.optimize = "uglify2";
    options.generateSourceMaps = true;
  }

  // change dirs to the script dir
  const scriptLocation = join(homeDir, "spoilers_arming");
  chdir(scriptLocation);

  // run the typescript compiler in a child process
  execSync("npx tsc");

  // optimize the requirejs file
  (async function () {
    await optimize(options, () => {
      appendToFile(options.out);
    });
  })();
}

module.exports = build;
