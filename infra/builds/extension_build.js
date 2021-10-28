const { execSync } = require("child_process");
const fs = require("fs-extra");
const { sync } = require("glob");
const { join } = require("path");
const { chdir } = require("process");
const mainDir = require("../main_dir");
const chalk = require("chalk");

function tag() {
  return chalk.hex("#f7cd72")("(extension) ");
}

function singleFileAction(filename) {
  let fileContent = fs
    .readFileSync(filename, { encoding: "utf-8" })
    .split("\n");
  let toWrite = [];
  fileContent.forEach((value) => {
    value.replaceAll(/[\n\r]/g, "");
    if (!value.includes("exports")) {
      toWrite.push(value);
    }
  });
  fs.writeFileSync(filename, toWrite.join("\n"));
}

function build() {
  chdir(join(mainDir, "extension"));
  console.log(tag() + chalk.hex("#f573a3")("Removing build directory..."));
  fs.rmSync("build", { recursive: true, force: true });

  // copy all non-typescript files to the build dir
  console.log(
    tag() + chalk.hex("#b1c6fc")("Copying all non-compiled files to build...")
  );
  const nonTsFiles = sync("source/**/*", { ignore: "**/*.ts", nodir: true });
  nonTsFiles.forEach((value) => {
    // replaces first 6 characters ("source")
    const newPath = value.replaceAll(/^.{6}/g, "build");

    fs.copySync(value, newPath, { overwrite: true });
  });

  // run the typescript compiler
  try {
    console.log(
      tag() +
        chalk.hex("#d5ff80")(
          "Running the typescript compiler in a child process..."
        )
    );
    execSync("npx tsc");
  } catch (e) {
    throw new Error(
      tag() +
        chalk.hex("#ff0000")(`Compiling failed with exit code`) +
        chalk.hex("#fff200")(`${e.code}.\n\n`) +
        e.stdout.toString()
    );
  }

  // remove the module stuff that we don't need
  console.log(
    tag() + chalk.hex("#82ffda")("Removing unneeded module infrastructure...")
  );
  sync("build/**/*.js", { ignore: "scripts" }).forEach((value) => {
    singleFileAction(value);
  });
  console.log(tag() + chalk.hex("#a8ff82")("Build complete!"));
}

module.exports = build;
