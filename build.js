/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: 0*/

const fs = require("fs-extra");

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function (file) {
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(path);
  }
}

deleteFolderRecursive("build");
console.log("build folder deleted!");

fs.copySync("source", "build");
fs.unlinkSync("build/tsconfig.json");
console.log("source copied to build!");
