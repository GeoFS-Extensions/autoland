const { join } = require("path");

/**
 * Gets the repo's home directory.
 * @returns {string} The parent directory, where the entire repo resides.
 */
function getHomeDir() {
  // __dirname is the location of this file, not the current working directory!
  // ./ is an alias for `process.cwd()`, which is for the current working directory.
  return join(__dirname, "..");
}

/**
 * The parent directory, where the entire repo resides.
 */
exports.mainDir = getHomeDir();

/**
 * Build a path on top of the repo home directory.
 * @param {string} path A path to join with the repo home directory.
 * @returns The path built on top of the home directory.
 */
exports.buildOnHomeDir = function (path) {
  return join(getHomeDir(), path);
};
