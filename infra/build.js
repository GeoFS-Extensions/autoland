const yargs = require("yargs");
const { sync } = require("glob");
const { removeSync, pathExistsSync } = require("fs-extra");
const { chdir } = require("process");
const chalk = require("chalk");
const { join } = require("path");
const homeDir = require("./main_dir");
const prettierBuild = require("./builds/prettier_build");
const keyboardMappingBuild = require("./builds/keyboard_mapping_build");
const spoilersArmingBuild = require("./builds/spoiler_arming_build");
const fmcBuild = require("./builds/fmc_build");
const apBuild = require("./builds/ap_build");
const extensionBuild = require("./builds/extension_build");

const argv = yargs.option("debug", {
  description: "Build scripts in debug mode",
  type: "boolean",
  default: false,
}).argv;

if (argv.debug) {
  console.log(
    chalk.yellow("Read flags as debug: true, building scripts in debug mode...")
  );
} else {
  console.log(
    chalk.yellow(
      "Read flags as debug: false, building scripts in default mode..."
    )
  );
}

function emptyDir() {
  const filesToDelete = sync("extension/**/scripts/*.js*");

  filesToDelete.forEach((value) => {
    removeSync(value);
  });
}

chdir(homeDir);

emptyDir();
prettierBuild();

console.log(chalk.yellow("Starting script builds..."));
apBuild(argv.debug);
fmcBuild(argv.debug);
keyboardMappingBuild(argv.debug);
spoilersArmingBuild(argv.debug);

const timer = setInterval(() => {
  if (
    pathExistsSync(join(homeDir, "extension/source/scripts/spoilers_arming.js"))
  ) {
    clearInterval(timer);
    console.log(chalk.yellow("Scripts built, starting extension build..."));
    extensionBuild();
  }
}, 500);
