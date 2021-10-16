const { execSync } = require("child_process");
const { join } = require("path");
const { chdir } = require("process");
const homeDir = require("../main_dir");
const { optimize } = require("requirejs");
const { appendFileSync, pathExistsSync } = require("fs-extra");
const chalk = require("chalk");

let options = {
  baseUrl: ".",
  name: "../node_modules/requirejs/require",
  include: "init",
  mainConfigFile: "./config.js",
  out: "../extension/source/scripts/autopilot_pp.js",
  optimize: "none",
  generateSourceMaps: false,
};

function scriptTag() {
  return chalk.hex("#55e09d")("(autopilot_pp) ");
}

/**
 * Appends the infrastructure to the script file.
 * @param {string} file The string of the file to append to.
 */
function appendToFile(file) {
  let autopilotAppend = "\nvar a = window.autopilot_pp = {};";
  autopilotAppend += 'a.version="0.12.0";';
  autopilotAppend += "a.require=require;";
  autopilotAppend += "a.requirejs=requirejs;";
  autopilotAppend += "a.define=define;";
  autopilotAppend += "a.ready=false;";

  appendFileSync(file, autopilotAppend);
}

/**
 * Builds autopilot.
 * @param {boolean} debug Whether the script should be built for debugging.
 */
function build(debug) {
  // if we want to build the script for debugging
  if (!debug) {
    console.log(
      scriptTag() +
        chalk.hex("#f573a3")("Debug set to false, applying uglify configs...")
    );
    options.optimize = "uglify2";
    options.generateSourceMaps = true;
  }

  // change dirs to the script dir
  const scriptLocation = join(homeDir, "autopilot_pp");
  chdir(scriptLocation);

  // run the typescript compiler in a child process
  try {
    console.log(
      scriptTag() +
        chalk.hex("#b1c6fc")(
          "Running the typescript compiler in a child process..."
        )
    );
    execSync("npx tsc");
  } catch (e) {
    throw new Error(
      scriptTag() +
        chalk.hex("#ff0000")(`Compiling failed with exit code`) +
        chalk.hex("#fff200")(`${e.code}.\n\n`) +
        e.stdout.toString()
    );
  }

  // optimize the requirejs file
  (async function () {
    console.log(
      scriptTag() + chalk.hex("#d5ff80")("Starting script optimizer...")
    );
    await optimize(options, () => {
      // wait for the optimization to actually be done
      const interval = setInterval(() => {
        if (
          !pathExistsSync(
            join(homeDir, "extension/source/scripts/autopilot_pp.js")
          )
        ) return;
        clearInterval(interval);
        console.log(
          scriptTag() +
            chalk.hex("#d5ff80")("Script optimized, appending to it...")
        );
        appendToFile(options.out);
        console.log(scriptTag() + chalk.hex("#a1f086")("Script built!"));
      }, 500);
    });
  })();
}

module.exports = build;
