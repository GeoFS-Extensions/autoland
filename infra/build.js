// fmc appending
let fmcAppend = "var a = window.fmc = {};";
fmcAppend += 'a.version="0.6.0";';
fmcAppend += "a.require=require;";
fmcAppend += "a.requirejs=requirejs;";
fmcAppend += "a.define=define;";

// spoilers arming appending
let spoilerArmingAppend = "var a = window.spoilers_arming = {};";
spoilerArmingAppend += 'a.version="1.1.2";';
spoilerArmingAppend += "a.require=require;";
spoilerArmingAppend += "a.requirejs=requirejs;";
spoilerArmingAppend += "a.define=define;";

// ap++ appending
let autopilotAppend = "var a = window.autopilot_pp = {};";
autopilotAppend += 'a.version="0.12.0";';
autopilotAppend += "a.require=require;";
autopilotAppend += "a.requirejs=requirejs;";
autopilotAppend += "a.define=define;";
autopilotAppend += "a.ready=false;";

const prettierBuild = require("./builds/prettier_build");
const keyboardMappingBuild = require("./builds/keyboard_mapping_build");
const { chdir } = require("process");
const homeDir = require("./main_dir");

chdir(homeDir);

prettierBuild();

keyboardMappingBuild();
