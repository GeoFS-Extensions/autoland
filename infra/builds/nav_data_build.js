const { join } = require("path");
const chalk = require("chalk");
const homeDir = require("../main_dir");
const { sync } = require("glob");
const { removeSync, createWriteStream, createFileSync } = require("fs-extra");
const { get } = require("https");
const { readFileSync } = require("fs");
const download = require("download");

async function downloadFile(url, path) {
  return new Promise((resolve, reject) => {
    try {
      get(url, (res) => {
        if (res.statusCode == 200) {
          createFileSync(path);
          const file = createWriteStream(path);
          res.pipe(file);
          const interval = setInterval(() => {
            if (readFileSync(path, "utf-8").length > 0) {
              clearInterval(interval);
              resolve();
            }
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function build() {
  console.log(chalk.yellow("Attempting nav data build..."));

  const dataFolderPath = join(homeDir, "data");
  // delete everything in the data folder
  sync(dataFolderPath + "/**/*").forEach((value) => {
    removeSync(value);
  });
  // download airports.csv files from ourairports
  downloadFile(
    "https://ourairports.com/data/airports.csv",
    join(dataFolderPath, "airports.csv")
  )
    .then(() => {
      downloadFile(
        "https://ourairports.com/data/navaids.csv",
        join(dataFolderPath, "navaids.csv")
      );
    })
    .then(() => {
      console.log("test");
    });
}

module.exports = build;
