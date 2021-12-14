let sync, removeSync;
function emptyDir() {
  const filesToDelete = sync("extension/source/scripts/*.js*");

  filesToDelete.forEach((value) => {
    removeSync(value);
  });
}

(async () => {
  const yargs = require("yargs");
  sync = require("glob").sync;
  removeSync = require("fs-extra").removeSync;
  const { chdir } = require("process");
  const chalk = (await import("chalk")).default;
  const homeDir = require("./main_dir.js");
  const prettierBuild = require("./builds/prettier_build.js");
  const extensionBuild = require("./builds/extension_build.js");
  const scriptBuild = require("./builds/script_build.js");

  const argv = yargs.option("debug", {
    description: "Build scripts in debug mode",
    type: "boolean",
    default: false,
  }).argv;

  if (argv.debug) {
    console.log(
      chalk.yellow(
        "Read flags as debug: true, building scripts in debug mode..."
      )
    );
  } else {
    console.log(
      chalk.yellow(
        "Read flags as debug: false, building scripts in default mode..."
      )
    );
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
})();
