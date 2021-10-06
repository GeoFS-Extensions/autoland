const prettierBuild = require("./builds/prettier_build");
prettierBuild();

const scriptBuild = require("./builds/script_build");
scriptBuild("keyboard_mapping");
scriptBuild("fmc");
