const { execSync } = require("child_process");
const { join } = require("path");
const { chdir, cwd } = require("process");
const homeDir = require("../main_dir");
const { optimize } = require("requirejs");
const { appendFileSync, readFileSync } = require("fs-extra");

let options = {
  baseUrl: ".",
  name: "../node_modules/requirejs/require",
  include: "init",
  mainConfigFile: "./config.js",
  out: "../extension/source/scripts/keyboard_mapping.js",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Appends the infrastructure to the script file.
 * @param {string} file The string of the file to append to.
 */
function appendToFile(file) {
  let keyboardMappingAppend = "\nvar a = window.keyboard_mapping = {};";
  keyboardMappingAppend += 'a.version="1.0.2";';
  keyboardMappingAppend += "a.require=require;";
  keyboardMappingAppend += "a.requirejs=requirejs;";
  keyboardMappingAppend += "a.define=define;";
  keyboardMappingAppend += "a.ready=false;";

  appendFileSync(file, keyboardMappingAppend);
}

/**
 * Builds keyboard mapping.
 * @param {boolean} debug Whether the script should be built for debugging.
 */
function build(debug) {
  // if we want to build the script for debugging
  if (!debug) {
    options.optimize = "uglify2";
    options.generateSourceMaps = true;
  }

  // change dirs to the script dir
  const scriptLocation = join(homeDir, "keyboard_mapping");
  chdir(scriptLocation);

  // run the typescript compiler in a child process
  execSync("npx tsc");

  // optimize the requirejs file
  (async function () {
    await optimize(options);

    // the optimize function returns before uglifyjs is done, so if we uglify, wait for uglifyjs to finish
    if (!debug) {
      while (true) {
        if (readFileSync(options.out, "utf-8").split("\n").length < 1000) {
          break;
        }
        console.log(readFileSync(options.out, "utf-8").split("\n").length);
        await sleep(50);
      }
    }
  })();

  // append to the optimized file
  appendToFile(options.out);
}

module.exports = build;
