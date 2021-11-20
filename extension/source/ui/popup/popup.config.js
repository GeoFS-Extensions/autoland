/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const { join } = require("path");
/**
 * @param {boolean} devMode Whether to build in dev mode.
 * @returns {import("webpack").Configuration} A webpack config to use when building.
 */
module.exports = function (devMode) {
  return {
    mode: devMode ? "development" : "production",
    entry: join(__dirname, "popup.ts"),
    output: {
      path: __dirname,
      filename: "popup.js",
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
  };
};
