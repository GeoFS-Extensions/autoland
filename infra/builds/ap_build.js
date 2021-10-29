const { execSync } = require("child_process");
const { join } = require("path");
const { chdir } = require("process");
const homeDir = require("../main_dir");
const webpack = require('webpack');
const chalk = require("chalk");

function scriptTag() {
  return chalk.hex("#55e09d")("(autopilot_pp) ");
}

/**
 * Builds autopilot++.
 * @param {boolean} debug Whether the script should be built for debugging.
 * @returns {Promise<void>}
 */
async function build(debug) {
  // if we want to build the script for debugging
  if (!debug) {
    console.log(
      scriptTag() +
        chalk.hex("#f573a3")("Debug set to false, applying uglify configs...")
    );
  }

  // change dirs to the script dir
  const scriptLocation = join(homeDir, "autopilot_pp");
  chdir(scriptLocation);

  // run the typescript compiler in a child process
  try {
    console.log(
      scriptTag() +
        chalk.hex("#b1c6fc")(
          "Running the typescript compiler in a child process..."
        )
    );
    execSync("npx tsc");
  } catch (e) {
    throw new Error(
      scriptTag() +
        chalk.hex("#ff0000")(`Compiling failed with exit code `) +
        chalk.hex("#fff200")(`${e.code}.\n\n`) +
        e.stdout.toString()
    );
  }

  // optimize the requirejs file
  console.log(
    scriptTag() + chalk.hex("#d5ff80")("Starting script optimizer...")
  );
  const compiler = webpack({
    entry: join(homeDir, "autopilot_pp/init.js"),
    mode: !debug ? "production" : "development",
    output: {
      path: join(homeDir, "extension/source/scripts"),
      filename: "autopilot_pp.js",
    },
  });

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
    
          if (stats.hasErrors()) {
            reject(info.errors);
          }
        
          if (stats.hasWarnings()) {
            console.warn(info.warnings);
          }
    
          if (!(stats.hasWarnings() || stats.hasErrors())) {
            console.log(stats.toString({colors: true}));
          }
        }
        
        compiler.close(closeErr => {
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

module.exports = build;
