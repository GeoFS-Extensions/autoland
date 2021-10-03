const { sync } = require("glob");
const { readFileSync, writeFileSync } = require("fs-extra");

/**
 * 
 * @param {string} localIgnorePattern Pattern from the .prettierignore file. Should be one line with no linebreak characters.
 * @param {string} patternLocation Location of the .prettierignore file. Include the file name (.prettierignore).
 */
function generateGlobalIgnorePattern(localIgnorePattern, patternLocation) {

}

/**
 * Builds the global .prettierignore file from smaller, local .prettierignore files.
 * Exists because prettier doesn't recognize .prettierignore files that aren't at its start working dir. 
 */
function buildPrettierIgnoreFile() {
  const filesToCompile = sync("**/.prettierignore", {
    ignore: [".prettierignore", "**/node_modules"],
  });
  let toWrite = "";

  filesToCompile.forEach((value) => {
    const contents = readFileSync(value, { encoding: "utf-8" });

    toWrite += contents + "\n";
  });

  writeFileSync(".prettierignore", toWrite.slice(0, -1));
};

module.exports = buildPrettierIgnoreFile;