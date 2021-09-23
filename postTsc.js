/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: 0*/

const fs = require("fs-extra");
const path = require("path");

function singleFileAction(filename) {
  let fileContent = fs
    .readFileSync(filename, { encoding: "utf-8" })
    .split("\n");
  let toWrite = [];
  fileContent.forEach((value) => {
    value.replaceAll(/\r/g, "");
    if (!value.includes("module.exports = {};")) {
      toWrite.push(value);
    }
  });
  fs.writeFileSync(filename, toWrite.join("\n"));
}

function getJsFiles(startPath = "./build", filter = ".js", currentArray = []) {
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      currentArray = getJsFiles(filename, filter, currentArray); //recurse
    } else if (filename.includes(filter) && !filename.includes(".json")) {
      currentArray.push(filename);
    }
  }

  return currentArray;
}

getJsFiles().forEach((value) => {
  singleFileAction(value);
});
