const { chdir, cwd } = require("process");
const homedir = require("./homeDir");

/**
 * Changes working directories relative to repo base.
 * @param {string} path Path to navigate to relative to repo base.
 * @returns {string} The now current working directory.
 * @example
 * moveToDir(); // Error: Path "undefined" is not valid.
 * moveToDir("path/that/doesnt/exist"); // Error: Path "path/that/doesnt/exist" is not valid.
 * moveToDir("path/that/does/exist"); // returns: "C:\Users\test\repo\path\that\does\exist"
 */
function moveToDir(path) {
  try {
    chdir(homedir + "/" + path);
    return cwd();
  } catch (err) {
    throw new Error('Path "' + path + '" is not valid.');
  }
}

module.exports = moveToDir;
