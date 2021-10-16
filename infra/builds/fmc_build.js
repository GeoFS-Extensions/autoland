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
  out: "../extension/source/scripts/fmc.js",
  optimize: "none",
  generateSourceMaps: false,
};

/**
 * Appends the infrastructure to the script file.
 * @param {string} file The string of the file to append to.
 */
function appendToFile(file) {
  let fmcAppend = "\nvar a = window.fmc = {};";
  fmcAppend += 'a.version="0.6.0";';
  fmcAppend += "a.require=require;";
  fmcAppend += "a.requirejs=requirejs;";
  fmcAppend += "a.define=define;";

  appendFileSync(file, fmcAppend);
}

/**
 * Builds fmc.
 * @param {boolean} debug Whether the script should be built for debugging.
 */
function build(debug) {
  // if we want to build the script for debugging
  if (!debug) {
    console.log("(fmc) Debug set to false, applying uglify configs...");
    options.optimize = "uglify2";
    options.generateSourceMaps = true;
  }

  // change dirs to the script dir
  const scriptLocation = join(homeDir, "fmc");
  chdir(scriptLocation);

  // run the typescript compiler in a child process
  try {
    console.log("(fmc) Running the typescript compiler in a child process...");
    execSync("npx tsc");
  } catch (e) {
    throw new Error(
      `(fmc) Compiling failed with exit code ${e.code}.\n\n` +
        e.stdout.toString()
    );
  }

  // optimize the requirejs file
  (async function () {
    console.log("(fmc) Starting script optimizer...");
    await optimize(options, () => {
      console.log("(fmc) Script optimized, appending to it...");
      appendToFile(options.out);
    });
  })();
  console.log("(fmc) Script built!");
}

module.exports = build;