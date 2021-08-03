/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: 0*/

const fs = require("fs-extra");
const path = require("path");
const series = require("async").series;
const exec = require("child_process").exec;

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

fs.copySync("extension/", "build");
console.log("extension copied to build!");

series([() => exec("npx tsc")]);

setTimeout(function deleteTsFiles(
  startPath = "./build",
  filter = ".ts",
  notRecursing = true
) {
  if (notRecursing) {
    console.log(".ts files compiled!");
  }

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      deleteTsFiles(filename, filter, false); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      fs.unlinkSync(filename);
    }
  }

  if (notRecursing) {
    console.log(".ts files deleted!");
  }
},
10000);
