import { sync } from "glob";

/**
 * Gets all files matching a glob and runs a function against them. Globs evaluate from the current working directory.
 * @param {string} glob The glob to use when checking the the files.
 * @param {(value: string) => void} runForFunction The code to run against a file name as `value`.
 */
function getAllFilesWithGlob(glob, runForFunction) {
  const filesThatMatch = sync(glob);

  filesThatMatch.forEach((value) => runForFunction(value));
}

module.exports = getAllFilesWithGlob;
