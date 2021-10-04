const { join } = require("path");
const { buildOnHomeDir } = require("../main_dir");

/**
 * Buinds a script.
 * @param {"autopilot_pp" | "fmc" | "keyboard_mapping" | "spoilers_arming"} scriptName The script to build.
 */
function defaultScriptBuild(scriptName) {
  const scriptLocation = buildOnHomeDir(scriptName);
  console.log(scriptLocation);
}

module.exports = defaultScriptBuild();
defaultScriptBuild("autopilot_pp");