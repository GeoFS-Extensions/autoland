const path = require("path");

module.exports = {
  entry: "./init.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "fmc.js",
  },
};
