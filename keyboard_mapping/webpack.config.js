const path = require("path");

module.exports = {
  entry: "./init.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "keyboard_mapping.js",
  },
};
