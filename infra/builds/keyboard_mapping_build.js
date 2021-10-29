const { join } = require("path");
const { chdir } = require("process");
const homeDir = require("../main_dir");
const webpack = require("webpack");
const chalk = require("chalk");

function scriptTag() {
  return chalk.hex("#55e09d")("(keyboard_mapping) ");
}

/**
 * Builds keyboard mapping.
 * @param {boolean} debug Whether the script should be built for debugging.
 */
async function build(debug) {
  // change dirs to the script dir
  chdir(join(homeDir, "keyboard_mapping"));

  // optimize the file
  console.log(scriptTag() + chalk.hex("#d5ff80")("Starting to build..."));
  const compiler = webpack({
    entry: join(homeDir, "keyboard_mapping/init.js"),
    mode: !debug ? "production" : "development",
    output: {
      path: join(homeDir, "extension/source/scripts"),
      filename: "keyboard_mapping.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
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
        }

        compiler.close((closeErr) => {
          if (closeErr) {
            reject(closeErr);
          }
          console.log(scriptTag() + chalk.hex("#a1f086")("Script built!"));
          resolve();
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = build;
