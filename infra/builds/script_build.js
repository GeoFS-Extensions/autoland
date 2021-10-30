const { join } = require("path");
const { chdir } = require("process");
const homeDir = require("../main_dir");
const webpack = require("webpack");
const chalk = require("chalk");

/**
 * Generates the script tag.
 * @param {string} script The script name
 * @returns a colored header to include before messages.
 */
function scriptTag(script) {
  return chalk.hex("#55e09d")(`(${script}) `);
}

/**
 * Builds a script.
 * @param {string} script The script name.
 * @param {boolean} debug Whether the script should be built for debugging.
 * @returns {Promise<void>} a promise that will be resolved when the script is built.
 */
async function build(script, debug) {
  // change dirs to the script dir
  const scriptLocation = join(homeDir, script);
  chdir(scriptLocation);

  // optimize the file
  console.log(scriptTag(script) + chalk.hex("#d5ff80")("Starting to build..."));
  const compiler = webpack({
    entry: join(homeDir, `${script}/init.js`),
    mode: debug ? "development" : "production",
    output: {
      path: join(homeDir, "extension/source/scripts"),
      filename: `${script}.js`,
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
    optimization: {
      moduleIds: "named",
      mangleExports: false,
      concatenateModules: false,
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
          console.log(
            scriptTag(script) + chalk.hex("#a1f086")("Script built!")
          );
          resolve();
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = build;
