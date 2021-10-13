const { exec } = require("child_process");
const { join } = require("path");
const { chdir, cwd } = require("process");
const homeDir = require("../main_dir");
const { optimize } = require("requirejs");

/**
 * Builds a script.
 * @param {"autopilot_pp" | "fmc" | "keyboard_mapping" | "spoilers_arming"} scriptName The script to build.
 * @param {Record<string, unknown>} optomizerOptions The options to pass to r.js.
 */
function defaultScriptBuild(scriptName, optomizerOptions) {
  const scriptLocation = join(homeDir, scriptName);
  chdir(scriptLocation);

  exec("npx tsc", (err, stdout) => {
    if (err) {
      console.log(stdout);
      throw err;
    } else {
      console.log(cwd());
      optimize(optomizerOptions, () => {
        chdir(scriptLocation);
      });
    }
  });
}

module.exports = defaultScriptBuild;
