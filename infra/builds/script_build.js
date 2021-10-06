const { exec } = require("child_process");
const { readJSONSync } = require("fs-extra");
const { join } = require("path");
const { chdir } = require("process");
const homeDir = require("../main_dir");
const requirejs = require("requirejs");

/**
 * Buinds a script.
 * @param {"autopilot_pp" | "fmc" | "keyboard_mapping" | "spoilers_arming"} scriptName The script to build.
 */
function defaultScriptBuild(scriptName) {
  const scriptLocation = join(homeDir, scriptName);
  chdir(scriptLocation);
  exec("npx tsc", (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    console.log(stdout);
    console.log(stderr);
  });
  const optomizerOptions = readJSONSync("build.json");
  requirejs.optimize(optomizerOptions);
}

module.exports = defaultScriptBuild;
