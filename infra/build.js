const yargs = require("yargs");
const { sync } = require("glob");
const { removeSync, pathExistsSync } = require("fs-extra");
const { chdir } = require("process");
const homeDir = require("./main_dir");
const prettierBuild = require("./builds/prettier_build");
const keyboardMappingBuild = require("./builds/keyboard_mapping_build");
const spoilersArmingBuild = require("./builds/spoiler_arming_build");
const fmcBuild = require("./builds/fmc_build");
const apBuild = require("./builds/ap_build");
const extensionBuild = require("./builds/extension_build");
const { join } = require("path");

const argv = yargs.option("debug", {
  description: "Build scripts in debug mode",
  type: "boolean",
  default: false,
}).argv;

function emptyDir() {
  const filesToDelete = sync("extension/**/scripts/*.js*");

  filesToDelete.forEach((value) => {
    removeSync(value);
  });
}

chdir(homeDir);

emptyDir();
prettierBuild();

apBuild(argv.debug);
fmcBuild(argv.debug);
keyboardMappingBuild(argv.debug);
spoilersArmingBuild(argv.debug);

const timer = setInterval(() => {
  if (
    pathExistsSync(join(homeDir, "extension/source/scripts/spoilers_arming.js"))
  ) {
    clearInterval(timer);
    extensionBuild();
  }
}, 500);
