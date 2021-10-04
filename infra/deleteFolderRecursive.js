const fs = require("fs-extra");
const moveToDir = require("./moveToDir");

/**
 * Deletes a folder and all its contents.
 * This runs with the working dir `infra/`.
 * @param {string} path The path to the directory to delete.
 * @returns {string} The path of the directory that was deleted.
 * @example
 * deleteFolderRecursive("path/that/doesnt/exist"); // Error: Path "path/that/doesnt/exist" doesn't exist!
 * deleteFolderRecursive("path/that/does/exist"); // completes successfully
 */
function deleteFolderRecursive(path) {
  if (!fs.existsSync(path)) {
    throw new Error('Path "' + path + "\" doesn't exist!");
  }
  if (!fs.lstatSync(path).isDirectory()) {
    throw new Error("Path " + path + " isn't a directory!");
  }

  fs.rm(path, { recursive: true, force: true });
  return moveToDir(path);
}

module.exports = deleteFolderRecursive;
