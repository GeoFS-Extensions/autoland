const { execSync } = require("child_process");
const fs = require("fs-extra");
const { sync } = require("glob");
const { join } = require("path");
const { chdir } = require("process");
const mainDir = require("../main_dir");

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

function build() {
  chdir(join(mainDir, "extension"));
  fs.rmSync("build", { recursive: true, force: true });

  // copy all non-typescript files to the build dir
  const nonTsFiles = sync("source/**/*", { ignore: "**/*.ts", nodir: true });
  nonTsFiles.forEach((value) => {
    // replaces first 6 characters ("source")
    const newPath = value.replaceAll(/^.{6}/g, "build");

    fs.copySync(value, newPath, { overwrite: true });
  });

  // run the typescript compiler
  try {
    execSync("npx tsc");
  } catch (e) {
    throw new Error("Compiling extension failed.\n\n" + e.stdout.toString());
  }

  // remove the module stuff that we don't need
  sync("build/**/*.js", { ignore: "scripts" }).forEach((value) => {
    singleFileAction(value);
  });
}

module.exports = build;
