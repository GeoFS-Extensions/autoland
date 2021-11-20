const fs = require("fs-extra");
const webpack = require("webpack");
const { sync } = require("glob");
const { join, resolve } = require("path");
const { chdir, cwd } = require("process");
const mainDir = require("../main_dir");
const chalk = require("chalk");

function tag() {
  return chalk.hex("#f7cd72")("(extension) ");
}

/**
 * @param {string} value The path to the **.ts** file to compile.
 * @param {boolean} devMode Whether to build in dev mode.
 * The file must have a corresponding .config.js file.
 * The .config.js file should export a function that returns a webpack config.
 */
function compileSingleScript(value, devMode) {
  const configFilePath = resolve(value.replace(/..$/g, "config.js"));
  /** @type {(devMode: boolean) => import("webpack").Configuration} */
  const configFunction = require(configFilePath);

  const compiler = webpack(configFunction(devMode));

  return new Promise((resolve, reject) => {
    try {
      compiler.run((err, stats) => {
        if (err || stats.hasErrors) {
          if (err) {
            reject(err.stack || err);
            if (err.details) {
              reject(err.details);
            }
            return;
          }

          const info = stats.toJson();

          if (stats.hasWarnings()) {
            console.warn(info.warnings);
          }

          if (stats.hasErrors()) {
            reject(info.errors);
          }
        }

        compiler.close((closeErr) => {
          if (closeErr) {
            reject(closeErr);
          }
          resolve();
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

function build(devMode) {
  chdir(join(mainDir, "extension"));
  console.log(tag() + chalk.hex("#f573a3")("Removing build directory..."));
  fs.rmSync("build", { recursive: true, force: true });

  // copy everything from source to build
  console.log(tag() + chalk.hex("#f573a3")("Copying to build directory..."));
  fs.copySync(join(cwd(), "source"), join(cwd(), "build"));

  // find the ts files
  console.log(tag() + chalk.hex("#91eba9")("Finding ts files..."));
  const tsFiles = sync("build/**/*.ts").filter((value) =>
    fs.existsSync(value.replace(/..$/g, "config.js"))
  );
  console.log(
    tag() +
      chalk.hex("#91eba9")(
        `Found ${tsFiles.length} files to be compiled, starting compilation...`
      )
  );

  // return a promise that runs the webpack compiler, then deletes the ts files, then resolves
  return Promise.all(
    tsFiles.map((value) => {
      return new Promise((resolve, reject) => {
        compileSingleScript(value, devMode)
          .then(() => {
            // delete the ts and .config.js files
            sync(join(value + "/../*.{ts,config.js}")).forEach((value) => {
              fs.removeSync(value);
            });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    })
  ).then(() => {
    // delete remaining .ts files
    sync(
      join(__dirname + "../../../" + "extension/build/" + "**/*.ts")
    ).forEach((value) => {
      fs.removeSync(value);
    });
  });
}

module.exports = build;
