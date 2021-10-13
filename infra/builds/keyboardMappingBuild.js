const scriptBuild = require("./builds/script_build");

let keyboardMappingAppend = "var a = window.keyboard_mapping = {};";
keyboardMappingAppend += 'a.version="1.0.2";';
keyboardMappingAppend += "a.require=require;";
keyboardMappingAppend += "a.requirejs=requirejs;";
keyboardMappingAppend += "a.define=define;";
keyboardMappingAppend += "a.ready=false;";

let options = {
  baseUrl: ".",
  name: "../node_modules/requirejs/require",
  include: "init",
  mainConfigFile: "./config.js",
  out: "../extension/source/scripts/keyboard_mapping.js",
  optimize: "uglify2",
  generateSourceMaps: true
};

