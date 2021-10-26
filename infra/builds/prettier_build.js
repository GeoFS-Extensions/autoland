const { sync } = require("glob");
const { join } = require("path");
const { readFileSync, writeFileSync } = require("fs-extra");
const mainDir = require("../main_dir");

/**
 * Generates a pattern to be used in the the global .prettierignore file based on a local prettier ignore pattern and its location.
 * @param {string} localIgnorePattern Pattern from the .prettierignore file. Should be one line with no linebreak characters.
 * @param {string} patternLocation Location of the .prettierignore file. Include the file name (.prettierignore).
 * @returns {string} The pattern to append to the global .prettierignore file.
 */
function generateGlobalIgnorePattern(localIgnorePattern, patternLocation) {
  return patternLocation.replace(".prettierignore", "") + localIgnorePattern;
}

/**
 * Builds the global .prettierignore file from smaller, local .prettierignore files.
 * Exists because prettier doesn't recognize .prettierignore files that aren't at its start working dir.
 */
function buildPrettierIgnoreFile() {
  const filesToCompile = sync("**/.prettierignore", {
    ignore: [".prettierignore", "**/node_modules"],
  });
  const toWrite = (function () {
    let toReturn = [];
    filesToCompile.forEach((value) => {
      let contents = readFileSync(value, { encoding: "utf-8" }).split("\n");
      contents.forEach((singleFileContent) => {
        singleFileContent.replaceAll(/[\n\r]/g, "");
        toReturn.push(generateGlobalIgnorePattern(singleFileContent, value));
      });
    });
    return toReturn;
  })();

  writeFileSync(join(mainDir, ".prettierignore"), toWrite.join("\n"));
}

module.exports = buildPrettierIgnoreFile;
