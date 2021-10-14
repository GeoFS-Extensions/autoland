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
  out: "../extension/source/scripts/autopilot_pp.js",
  optimize: "none",
  generateSourceMaps: false,
};

/**
 * Appends the infrastructure to the script file.
 * @param {string} file The string of the file to append to.
 */
function appendToFile(file) {
  let autopilotAppend = "var a = window.autopilot_pp = {};";
  autopilotAppend += 'a.version="0.12.0";';
  autopilotAppend += "a.require=require;";
  autopilotAppend += "a.requirejs=requirejs;";
  autopilotAppend += "a.define=define;";
  autopilotAppend += "a.ready=false;";

  appendFileSync(file, autopilotAppend);
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
  const scriptLocation = join(homeDir, "autopilot_pp");
  chdir(scriptLocation);

  // run the typescript compiler in a child process
  try {
    execSync("npx tsc");
  } catch (e) {
    throw new Error("Compiling ap++ failed.\n\n" + e.stdout.toString());
  }

  // optimize the requirejs file
  (async function () {
    await optimize(options, () => {
      appendToFile(options.out);
    });
  })();
}

module.exports = build;
