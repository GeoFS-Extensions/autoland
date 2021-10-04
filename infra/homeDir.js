const { join } = require("path");

function getHomeDir() {
  return join(__dirname, "..");
}

/**
 * The parent directory, where the entire repo resides.
 */
let homedir = getHomeDir();

module.exports = homedir;
