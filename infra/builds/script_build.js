const { exec } = require("child_process");
const { join } = require("path");
const { chdir, cwd } = require("process");
const homeDir = require("../main_dir");
const { optimize } = require("requirejs");

/**
 * Builds a script.
 * @param {"autopilot_pp" | "fmc" | "keyboard_mapping" | "spoilers_arming"} scriptName The script to build.
 * @param {Record<string, unknown>} optimizerOptions The options to pass to r.js.
 */
function defaultScriptBuild(scriptName, optimizerOptions) {
  const scriptLocation = join(homeDir, scriptName);
  chdir(scriptLocation);

  exec("npx tsc", (err, stdout) => {
    if (err) {
      console.log(stdout);
      throw err;
    } else {
      console.log(cwd());
      optimize(optimizerOptions, () => {
        chdir(scriptLocation);
      });
    }
  });
}

module.exports = defaultScriptBuild;
