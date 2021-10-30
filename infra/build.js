const yargs = require("yargs");
const { sync } = require("glob");
const { removeSync } = require("fs-extra");
const { chdir } = require("process");
const chalk = require("chalk");
const homeDir = require("./main_dir");
const prettierBuild = require("./builds/prettier_build");
const extensionBuild = require("./builds/extension_build");
const scriptBuild = require("./builds/script_build");

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

chdir(homeDir);

emptyDir();
prettierBuild();

console.log(chalk.yellow("Starting script builds..."));

Promise.all([
  scriptBuild("autopilot_pp", argv.debug),
  scriptBuild("fmc", argv.debug),
  scriptBuild("spoilers_arming", argv.debug),
  scriptBuild("keyboard_mapping", argv.debug),
])
  .then(() => {
    console.log(chalk.yellow("Scripts built, starting extension build..."));
    extensionBuild();
  })
  .catch((err) => {
    console.log(err);
  });
