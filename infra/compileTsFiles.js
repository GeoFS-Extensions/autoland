const { exec } = require("child_process");
const moveToDir = require("./moveToDir");

/**
 * Compiles .ts files in the specified directory.
 * @param {string} path Path to the folder where the ts files to be compiled should be. Must be relative to the repo base.
 * @returns {Promise<void>}
 * @example
 * // create the build directory based off the source directory
 * compileFiles("extension/build");
 * // delete the ts files in that directory
 */
function compileFiles(path) {
  return new Promise((resolve, reject) => {
    try {
      let stdout;
      moveToDir(path);
      exec("npx tsc", (error, out) => {
        stdout = out;
        if (error) throw new Error(error);
      });
      resolve(stdout);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = compileFiles;
