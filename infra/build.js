const yargs = require("yargs");
const { sync } = require("glob");
const { removeSync } = require("fs-extra");
const { chdir } = require("process");
const chalk = require("chalk");
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
  const filesToDelete = sync("extension/source/scripts/*.js*");

  filesToDelete.forEach((value) => {
    removeSync(value);
  });
}

// TODO: using console.time() and console.timeEnd() from here to the console.log says 2.1 seconds, this can be optimized
chdir(homeDir);

emptyDir();
prettierBuild();

console.log(chalk.yellow("Starting script builds..."));
apBuild(argv.debug)
  .then(() => fmcBuild(argv.debug))
  .then(() => keyboardMappingBuild(argv.debug))
  .then(() => spoilersArmingBuild(argv.debug))
  .then(() => {
    console.log(chalk.yellow("Scripts built, starting extension build..."));
    extensionBuild();
  });